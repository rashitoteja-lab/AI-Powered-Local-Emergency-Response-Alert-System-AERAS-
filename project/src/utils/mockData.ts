import { Emergency, EmergencyStats, AlertNotification } from '../types/emergency';

export const generateMockEmergencies = (): Emergency[] => {
  const emergencyTypes = [
    { type: 'flooding' as const, titles: ['Waterlogging on Main Street', 'Severe Flooding in Downtown', 'Road Flooding Alert'] },
    { type: 'power_outage' as const, titles: ['Power Outage in Sector 5', 'Electricity Disruption', 'Grid Failure Reported'] },
    { type: 'air_quality' as const, titles: ['Poor Air Quality Alert', 'Smog Advisory', 'Pollution Spike Detected'] },
    { type: 'violence' as const, titles: ['Security Incident Reported', 'Safety Concern in Area', 'Disturbance Alert'] },
    { type: 'fire' as const, titles: ['Fire Emergency', 'Smoke Detected', 'Fire Hazard Alert'] },
    { type: 'medical' as const, titles: ['Medical Emergency', 'Health Crisis', 'Medical Assistance Needed'] },
    { type: 'traffic' as const, titles: ['Major Traffic Jam', 'Road Accident', 'Traffic Disruption'] },
    { type: 'weather' as const, titles: ['Severe Weather Alert', 'Storm Warning', 'Weather Emergency'] }
  ];

  const severities: Emergency['severity'][] = ['low', 'medium', 'high', 'critical'];
  const statuses: Emergency['status'][] = ['active', 'resolved', 'investigating'];
  const reporterNames = ['Community Member', 'Local Resident', 'Emergency Responder', 'Authority Official'];

  // Generate emergencies around major cities (mock coordinates)
  const locations = [
    { lat: 40.7128, lng: -74.0060, city: 'New York' },
    { lat: 34.0522, lng: -118.2437, city: 'Los Angeles' },
    { lat: 41.8781, lng: -87.6298, city: 'Chicago' },
    { lat: 29.7604, lng: -95.3698, city: 'Houston' },
    { lat: 39.2904, lng: -76.6122, city: 'Baltimore' },
    { lat: 25.7617, lng: -80.1918, city: 'Miami' }
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const emergencyType = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)];
    const title = emergencyType.titles[Math.floor(Math.random() * emergencyType.titles.length)];
    
    return {
      id: `emergency-${i + 1}`,
      type: emergencyType.type,
      title,
      description: `${title} - Community reported incident requiring immediate attention. AI classification confidence: ${Math.floor(Math.random() * 30) + 70}%`,
      latitude: location.lat + (Math.random() - 0.5) * 0.1,
      longitude: location.lng + (Math.random() - 0.5) * 0.1,
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      reportedAt: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
      reportedBy: reporterNames[Math.floor(Math.random() * reporterNames.length)],
      aiConfidence: Math.floor(Math.random() * 30) + 70,
      affectedRadius: Math.floor(Math.random() * 2000) + 500,
      upvotes: Math.floor(Math.random() * 50),
      downvotes: Math.floor(Math.random() * 10),
      verifiedByAuthority: Math.random() > 0.6
    };
  });
};

export const generateMockStats = (): EmergencyStats => ({
  totalActive: 23,
  totalResolved: 156,
  criticalAlerts: 4,
  averageResponseTime: 12.5,
  aiAccuracy: 94.2
});

export const generateMockAlerts = (): AlertNotification[] => [
  {
    id: 'alert-1',
    emergencyId: 'emergency-1',
    title: 'Critical Flooding Alert',
    message: 'Severe waterlogging detected in downtown area. Avoid Main Street.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 300000),
    read: false
  },
  {
    id: 'alert-2',
    emergencyId: 'emergency-2',
    title: 'Power Outage Update',
    message: 'Power has been restored to Sector 5. All systems operational.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 900000),
    read: false
  },
  {
    id: 'alert-3',
    emergencyId: 'emergency-3',
    title: 'Air Quality Advisory',
    message: 'Poor air quality detected. Recommended to stay indoors.',
    severity: 'high',
    timestamp: new Date(Date.now() - 1200000),
    read: true
  }
];