import React from 'react';
import { AlertNotification } from '../../types/emergency';
import { Bell, X, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  alerts: AlertNotification[];
  onDismissAlert: (alertId: string) => void;
  onMarkAsRead: (alertId: string) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  onDismissAlert,
  onMarkAsRead
}) => {
  const getSeverityIcon = (severity: AlertNotification['severity']) => {
    const icons = {
      low: Info,
      medium: AlertCircle,
      high: AlertTriangle,
      critical: AlertTriangle
    };
    return icons[severity];
  };

  const getSeverityColor = (severity: AlertNotification['severity']) => {
    const colors = {
      low: 'text-blue-600 bg-blue-50 border-blue-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      high: 'text-orange-600 bg-orange-50 border-orange-200',
      critical: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[severity];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Live Alerts</h3>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            {alerts.filter(alert => !alert.read).length} new
          </span>
        </div>
      </div>
      
      <div className="p-4 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No alerts at this time</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const SeverityIcon = getSeverityIcon(alert.severity);
              
              return (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-3 transition-all duration-200 ${
                    alert.read ? 'bg-gray-50 border-gray-200' : getSeverityColor(alert.severity)
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <SeverityIcon className={`w-5 h-5 mt-0.5 ${
                        alert.read ? 'text-gray-400' : 
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'high' ? 'text-orange-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                      
                      <div className="flex-1">
                        <h4 className={`font-semibold text-sm ${
                          alert.read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {alert.title}
                        </h4>
                        <p className={`text-xs mt-1 ${
                          alert.read ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      {!alert.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(alert.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                          title="Mark as read"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDismissAlert(alert.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                        title="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;