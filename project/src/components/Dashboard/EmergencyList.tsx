import React from 'react';
import { Emergency } from '../../types/emergency';
import { Clock, MapPin, TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EmergencyListProps {
  emergencies: Emergency[];
  onEmergencySelect: (emergency: Emergency) => void;
  selectedEmergencyId?: string;
}

export const EmergencyList: React.FC<EmergencyListProps> = ({
  emergencies,
  onEmergencySelect,
  selectedEmergencyId
}) => {
  const getSeverityColor = (severity: Emergency['severity']) => {
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[severity];
  };

  const getStatusColor = (status: Emergency['status']) => {
    const colors = {
      active: 'bg-red-100 text-red-700',
      investigating: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return colors[status];
  };

  const getEmergencyEmoji = (type: Emergency['type']) => {
    const emojis = {
      flooding: '💧',
      power_outage: '⚡',
      air_quality: '🌬️',
      violence: '🚨',
      fire: '🔥',
      medical: '🏥',
      traffic: '🚗',
      weather: '⛈️'
    };
    return emojis[type];
  };

  return (
    <div className="space-y-3">
      {emergencies.slice(0, 10).map((emergency) => (
        <div
          key={emergency.id}
          onClick={() => onEmergencySelect(emergency)}
          className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
            selectedEmergencyId === emergency.id 
              ? 'ring-2 ring-blue-500 bg-blue-50' 
              : 'hover:bg-gray-50'
          } ${
            emergency.severity === 'critical' ? 'border-l-red-500' :
            emergency.severity === 'high' ? 'border-l-orange-500' :
            emergency.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{getEmergencyEmoji(emergency.type)}</span>
                <h3 className="font-semibold text-gray-900 text-sm">{emergency.title}</h3>
                {emergency.verifiedByAuthority && (
                  <Shield className="w-4 h-4 text-blue-600" title="Verified by Authority" />
                )}
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{emergency.description}</p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{emergency.affectedRadius}m radius</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDistanceToNow(emergency.reportedAt, { addSuffix: true })}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(emergency.severity)}`}>
                    {emergency.severity.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(emergency.status)}`}>
                    {emergency.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span>{emergency.upvotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="w-3 h-3 text-red-600" />
                    <span>{emergency.downvotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-blue-600" />
                    <span>{emergency.aiConfidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyList;