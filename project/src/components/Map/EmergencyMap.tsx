import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import { Emergency } from '../../types/emergency';
import { AlertTriangle, Zap, Wind, Shield, Flame, Heart, Car, Cloud } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface EmergencyMapProps {
  emergencies: Emergency[];
  onEmergencySelect: (emergency: Emergency) => void;
  selectedEmergency?: Emergency | null;
}

const getEmergencyIcon = (emergency: Emergency) => {
  const icons = {
    flooding: '💧',
    power_outage: '⚡',
    air_quality: '🌬️',
    violence: '🚨',
    fire: '🔥',
    medical: '🏥',
    traffic: '🚗',
    weather: '⛈️'
  };

  const colors = {
    low: '#22C55E',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#DC2626'
  };

  return new DivIcon({
    html: `
      <div style="
        background: ${colors[emergency.severity]};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 16px;
      ">
        ${icons[emergency.type]}
      </div>
    `,
    className: 'custom-emergency-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const getSeverityColor = (severity: Emergency['severity']) => {
  const colors = {
    low: '#22C55E',
    medium: '#F59E0B',
    high: '#EF4444',
    critical: '#DC2626'
  };
  return colors[severity];
};

export const EmergencyMap: React.FC<EmergencyMapProps> = ({
  emergencies,
  onEmergencySelect,
  selectedEmergency
}) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (selectedEmergency && mapRef.current) {
      mapRef.current.setView([selectedEmergency.latitude, selectedEmergency.longitude], 15);
    }
  }, [selectedEmergency]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[40.7128, -74.0060]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {emergencies.map((emergency) => (
          <React.Fragment key={emergency.id}>
            <Marker
              position={[emergency.latitude, emergency.longitude]}
              icon={getEmergencyIcon(emergency)}
              eventHandlers={{
                click: () => onEmergencySelect(emergency)
              }}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <h3 className="font-semibold text-sm mb-1">{emergency.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{emergency.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded-full text-white font-medium
                      ${emergency.severity === 'critical' ? 'bg-red-600' :
                        emergency.severity === 'high' ? 'bg-orange-500' :
                        emergency.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                      {emergency.severity.toUpperCase()}
                    </span>
                    <span className="text-gray-500">
                      AI: {emergency.aiConfidence}%
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Affected radius circle */}
            <CircleMarker
              center={[emergency.latitude, emergency.longitude]}
              radius={Math.max(5, Math.min(20, emergency.affectedRadius / 100))}
              color={getSeverityColor(emergency.severity)}
              fillColor={getSeverityColor(emergency.severity)}
              fillOpacity={0.1}
              opacity={0.3}
              weight={1}
            />
          </React.Fragment>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Emergency Types</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <span>💧</span><span>Flooding</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>⚡</span><span>Power</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🌬️</span><span>Air Quality</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🚨</span><span>Safety</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🔥</span><span>Fire</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🏥</span><span>Medical</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🚗</span><span>Traffic</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>⛈️</span><span>Weather</span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t">
          <h5 className="font-semibold text-xs mb-1">Severity</h5>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Med</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-xs">Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyMap;