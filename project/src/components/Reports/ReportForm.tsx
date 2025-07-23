import React, { useState } from 'react';
import { MapPin, Send, Camera, Mic, AlertTriangle } from 'lucide-react';
import { Emergency } from '../../types/emergency';

interface ReportFormProps {
  onSubmitReport: (report: Partial<Emergency>) => void;
  userLocation?: { lat: number; lng: number } | null;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSubmitReport, userLocation }) => {
  const [formData, setFormData] = useState({
    type: 'flooding' as Emergency['type'],
    title: '',
    description: '',
    severity: 'medium' as Emergency['severity']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emergencyTypes = [
    { value: 'flooding', label: 'Waterlogging/Flooding', emoji: '💧' },
    { value: 'power_outage', label: 'Power Outage', emoji: '⚡' },
    { value: 'air_quality', label: 'Air Quality Issue', emoji: '🌬️' },
    { value: 'violence', label: 'Safety/Security', emoji: '🚨' },
    { value: 'fire', label: 'Fire Emergency', emoji: '🔥' },
    { value: 'medical', label: 'Medical Emergency', emoji: '🏥' },
    { value: 'traffic', label: 'Traffic Issue', emoji: '🚗' },
    { value: 'weather', label: 'Weather Emergency', emoji: '⛈️' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const report: Partial<Emergency> = {
      ...formData,
      latitude: userLocation?.lat || 40.7128 + (Math.random() - 0.5) * 0.01,
      longitude: userLocation?.lng || -74.0060 + (Math.random() - 0.5) * 0.01,
      reportedAt: new Date(),
      reportedBy: 'You',
      aiConfidence: Math.floor(Math.random() * 20) + 80,
      affectedRadius: Math.floor(Math.random() * 1500) + 500,
      upvotes: 1,
      downvotes: 0,
      verifiedByAuthority: false,
      status: 'investigating'
    };

    onSubmitReport(report);
    
    // Reset form
    setFormData({
      type: 'flooding',
      title: '',
      description: '',
      severity: 'medium'
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-bold text-gray-900">Report Emergency</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Emergency Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {emergencyTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.value as Emergency['type'] })}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  formData.type === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{type.emoji}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Brief description of the emergency..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide more details about the situation, location landmarks, severity..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Severity Level
          </label>
          <div className="flex space-x-2">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, severity: level.value as Emergency['severity'] })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.severity === level.value
                    ? level.color + ' ring-2 ring-offset-2 ring-blue-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>
              {userLocation 
                ? `Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                : 'Location will be auto-detected'
              }
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Add photo"
            >
              <Camera className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Add voice note"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Processing with AI...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Emergency Report</span>
            </>
          )}
        </button>
        
        {isSubmitting && (
          <div className="text-xs text-gray-600 text-center">
            🤖 AI is analyzing your report for classification and threat assessment...
          </div>
        )}
      </form>
    </div>
  );
};

export default ReportForm;