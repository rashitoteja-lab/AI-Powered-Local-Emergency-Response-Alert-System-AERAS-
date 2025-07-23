/**
 * AERAS - AI-Powered Emergency Response System
 * Main Application Component
 * 
 * This is the root component that orchestrates the entire emergency response
 * application, managing state, routing, and real-time updates.
 */

import React, { useState, useEffect } from 'react';
import { Emergency, EmergencyStats, AlertNotification } from './types/emergency';
import { generateMockEmergencies, generateMockStats, generateMockAlerts } from './utils/mockData';
import EmergencyMap from './components/Map/EmergencyMap';
import StatsCard from './components/Dashboard/StatsCard';
import EmergencyList from './components/Dashboard/EmergencyList';
import AlertsPanel from './components/Alerts/AlertsPanel';
import ReportForm from './components/Reports/ReportForm';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Brain,
  Zap,
  Shield,
  Bell,
  Plus,
  Map,
  BarChart3,
  Settings
} from 'lucide-react';

function App() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [stats, setStats] = useState<EmergencyStats>(generateMockStats());
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'report'>('dashboard');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Initialize with mock data
    setEmergencies(generateMockEmergencies());
    setAlerts(generateMockAlerts());

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default to NYC if geolocation fails
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      setEmergencies(prev => {
        const updated = [...prev];
        // Randomly update some emergencies
        const randomIndex = Math.floor(Math.random() * updated.length);
        if (updated[randomIndex]) {
          updated[randomIndex] = {
            ...updated[randomIndex],
            upvotes: updated[randomIndex].upvotes + Math.floor(Math.random() * 3),
            aiConfidence: Math.min(100, updated[randomIndex].aiConfidence + Math.floor(Math.random() * 5))
          };
        }
        return updated;
      });

      // Occasionally add new alerts
      if (Math.random() > 0.7) {
        const newAlert: AlertNotification = {
          id: `alert-${Date.now()}`,
          emergencyId: `emergency-${Math.floor(Math.random() * 50)}`,
          title: 'New Emergency Detected',
          message: 'AI has detected a potential emergency in your area.',
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          timestamp: new Date(),
          read: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencySelect = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
    setActiveTab('map');
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const handleSubmitReport = (report: Partial<Emergency>) => {
    const newEmergency: Emergency = {
      id: `emergency-${Date.now()}`,
      type: report.type!,
      title: report.title!,
      description: report.description!,
      latitude: report.latitude!,
      longitude: report.longitude!,
      severity: report.severity!,
      status: 'investigating',
      reportedAt: new Date(),
      reportedBy: 'You',
      aiConfidence: report.aiConfidence || 85,
      affectedRadius: report.affectedRadius || 800,
      upvotes: 1,
      downvotes: 0,
      verifiedByAuthority: false
    };

    setEmergencies(prev => [newEmergency, ...prev]);
    setSelectedEmergency(newEmergency);
    setActiveTab('map');

    // Add success alert
    const successAlert: AlertNotification = {
      id: `alert-success-${Date.now()}`,
      emergencyId: newEmergency.id,
      title: 'Report Submitted Successfully',
      message: 'Your emergency report has been processed and is now visible to the community.',
      severity: 'medium',
      timestamp: new Date(),
      read: false
    };
    setAlerts(prev => [successAlert, ...prev]);

    // Update stats
    setStats(prev => ({
      ...prev,
      totalActive: prev.totalActive + 1
    }));
  };

  const activeEmergencies = emergencies.filter(e => e.status === 'active');
  const unreadAlerts = alerts.filter(alert => !alert.read);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AERAS</h1>
                <p className="text-xs text-gray-600">AI Emergency Response System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live Monitoring</span>
              </div>
              
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadAlerts.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'map', label: 'Live Map', icon: Map },
              { id: 'report', label: 'Report Emergency', icon: Plus }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatsCard
                title="Active Emergencies"
                value={stats.totalActive}
                change="+3 from yesterday"
                changeType="negative"
                icon={Activity}
                color="red"
              />
              <StatsCard
                title="Resolved Today"
                value={stats.totalResolved}
                change="+12 from yesterday"
                changeType="positive"
                icon={CheckCircle}
                color="green"
              />
              <StatsCard
                title="Critical Alerts"
                value={stats.criticalAlerts}
                change="2 new this hour"
                changeType="negative"
                icon={AlertTriangle}
                color="yellow"
              />
              <StatsCard
                title="Avg Response Time"
                value={`${stats.averageResponseTime}min`}
                change="-2min improvement"
                changeType="positive"
                icon={Clock}
                color="blue"
              />
              <StatsCard
                title="AI Accuracy"
                value={`${stats.aiAccuracy}%`}
                change="+1.2% this month"
                changeType="positive"
                icon={Brain}
                color="purple"
              />
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Emergencies</h3>
                  <EmergencyList
                    emergencies={activeEmergencies}
                    onEmergencySelect={handleEmergencySelect}
                    selectedEmergencyId={selectedEmergency?.id}
                  />
                </div>
              </div>
              
              <div>
                <AlertsPanel
                  alerts={alerts}
                  onDismissAlert={handleDismissAlert}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden">
              <EmergencyMap
                emergencies={emergencies}
                onEmergencySelect={handleEmergencySelect}
                selectedEmergency={selectedEmergency}
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Map Filters</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Active Emergencies</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Critical Only</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Resolved (Last 24h)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Verified Reports</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-3">Nearby Emergencies</h3>
                <EmergencyList
                  emergencies={emergencies.slice(0, 5)}
                  onEmergencySelect={handleEmergencySelect}
                  selectedEmergencyId={selectedEmergency?.id}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto">
            <ReportForm
              onSubmitReport={handleSubmitReport}
              userLocation={userLocation}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;