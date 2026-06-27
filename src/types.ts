export interface UserProfile {
  id: string;
  name: string;
  mobile: string;
  role: 'CITIZEN' | 'OFFICER' | 'SUPERVISOR' | 'ADMIN';
  rewardPoints: number;
  resolvedCount: number;
  avatar?: string;
}

export interface OfficerProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  badgeNumber: string;
  assignedZone: string;
}

export interface AIAnalysisResult {
  detectedIssue: string;
  detectedCategory: string;
  severityScore: number;
  confidenceScore: number;
  summary: string;
  predictedDepartment: string;
  isDuplicate: boolean;
  isFakeImage: boolean;
  isSpam: boolean;
}

export interface TimelineEvent {
  status: string;
  timestamp: string;
  note?: string;
  actor: string;
}

export interface ComplaintComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  isOfficer: boolean;
}

export interface ComplaintRecord {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  videos: string[];
  voiceNoteUrl?: string;
  latitude: number;
  longitude: number;
  address: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'SUBMITTED' | 'VERIFIED' | 'ACCEPTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  citizenName: string;
  citizenMobile: string;
  isAnonymous: boolean;
  assignedOfficer?: string;
  assignedTeam?: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  expectedResolutionHours: number;
  aiAnalysis: AIAnalysisResult;
  timeline: TimelineEvent[];
  votes: number;
  comments: ComplaintComment[];
  workPhotosBefore: string[];
  workPhotosAfter: string[];
  officerNotes?: string;
  rejectionReason?: string;
  rating?: number;
  feedbackText?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  group: 'Sanitation' | 'Water' | 'Roads' | 'Lighting' | 'Trees' | 'Pollution' | 'Others';
  icon: string; // Bootstrap icon class
  colorClass: string;
  bgClass: string;
  department: string;
  description: string;
  aiTags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type?: 'VERIFIED' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'REWARD';
}
