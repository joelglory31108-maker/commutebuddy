export type PageTab = 'landing' | 'find-ride' | 'safety' | 'wait-time' | 'about';

export type CommuteMode = 'Shared Auto' | 'Walk Group' | 'E-Rickshaw';

export interface RideMatch {
  id: string;
  creatorName: string;
  collegeIdBadge: string;
  avatarColor: string;
  startLocation: string;
  destination: string;
  departureTime: string;
  mode: CommuteMode;
  spotsFilled: number;
  totalSpots: number;
  fareEstimate: string;
  notes: string;
  tags: string[];
  joined?: boolean;
}

export interface CheckInRecord {
  id: string;
  timestamp: string;
  location: string;
  contactName: string;
  contactNumber: string;
  status: 'Delivered' | 'Sent';
  note?: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface TransitStopWaitTime {
  id: string;
  stopName: string;
  landmark: string;
  avgWaitMinutes: number;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  primaryMode: 'Shared Auto' | 'Campus Shuttle' | 'E-Rickshaw' | 'Bus';
  lastUpdated: string;
  reportsCount: number;
  recentTip: string;
}
