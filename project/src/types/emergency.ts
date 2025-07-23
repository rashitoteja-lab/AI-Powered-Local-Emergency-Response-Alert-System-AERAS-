/**
 * AERAS Emergency Response System - Type Definitions
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the emergency response application.
 */

export interface Emergency {
  id: string;
  type: 'flooding' | 'power_outage' | 'air_quality' | 'violence' | 'fire' | 'medical' | 'traffic' | 'weather';
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating';
  reportedAt: Date;
  reportedBy: string;
  aiConfidence: number;
  affectedRadius: number; // in meters
  upvotes: number;
  downvotes: number;
  verifiedByAuthority: boolean;
}

/**
 * Statistical data for the emergency response dashboard
 */
export interface EmergencyStats {
  totalActive: number;
  totalResolved: number;
  criticalAlerts: number;
  averageResponseTime: number;
  aiAccuracy: number;
}

/**
 * Alert notification structure for real-time updates
 */
export interface AlertNotification {
  id: string;
  emergencyId: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
}