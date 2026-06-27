import React, { useState, useEffect } from 'react';
import { UserProfile, ComplaintRecord, CategoryItem, NotificationItem } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroBanner } from './components/HeroBanner.tsx';
import { DashboardCards } from './components/DashboardCards.tsx';
import { PostComplaintForm } from './components/PostComplaintForm.tsx';
import { CategorySelectionScreen } from './components/CategorySelectionScreen.tsx';
import { MyComplaintsScreen } from './components/MyComplaintsScreen.tsx';
import { NearbyComplaintsScreen } from './components/NearbyComplaintsScreen.tsx';
import { LeaderboardScreen } from './components/LeaderboardScreen.tsx';
import { OfficerPortal } from './components/OfficerPortal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { LoginPage } from './components/LoginPage.tsx';

// Initial Mock Complaints
const INITIAL_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'CMP-8941',
    title: 'Massive Garbage Dump Overflowing onto Relief Road',
    description: 'Foul odor and uncollected domestic garbage blocking pedestrian footway for 3 days.',
    category: 'Cleanliness Target Unit (Dirty Spot)',
    images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80'],
    videos: [],
    latitude: 23.0225,
    longitude: 72.5714,
    address: 'Relief Road, Sector 3, Opposite Municipal Market',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    citizenName: 'John Doe',
    citizenMobile: '9876543210',
    isAnonymous: false,
    department: 'Solid Waste Management',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    expectedResolutionHours: 24,
    assignedOfficer: 'Rajesh Sharma (Health Officer)',
    aiAnalysis: {
      detectedIssue: 'Overflowing domestic solid waste',
      detectedCategory: 'Garbage Dump',
      severityScore: 88,
      confidenceScore: 97,
      summary: 'AI detected high volume refuse accumulation obstructing public walkway.',
      predictedDepartment: 'Solid Waste Management',
      isDuplicate: false,
      isFakeImage: false,
      isSpam: false
    },
    timeline: [
      { status: 'SUBMITTED', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), actor: 'John Doe' },
      { status: 'VERIFIED', timestamp: new Date(Date.now() - 86400000 * 1.9).toISOString(), note: 'Gemini Confidence 97%', actor: 'AI Engine' },
      { status: 'ACCEPTED', timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), actor: 'Rajesh Sharma' },
      { status: 'IN_PROGRESS', timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), note: 'Sanitation vehicle dispatched', actor: 'Fleet Dispatcher' }
    ],
    votes: 14,
    comments: [
      { id: 'c1', author: 'Priya Mehta', text: 'Stench is unbearable near school bus stop!', timestamp: new Date(Date.now()-3600000*5).toISOString(), isOfficer: false },
      { id: 'c2', author: 'Rajesh Sharma', text: 'Dispatched dumper vehicle MH-12-8941. Clearing within 4 hours.', timestamp: new Date(Date.now()-3600000*2).toISOString(), isOfficer: true }
    ],
    workPhotosBefore: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600'],
    workPhotosAfter: []
  },
  {
    id: 'CMP-8102',
    title: 'Severe Water Pipe Burst & Road Flooding',
    description: 'Main potable water supply pipe ruptured causing clean water wastage and slippery road.',
    category: 'Water Leakage / Drainage Overflow',
    images: ['https://images.unsplash.com/photo-1542013936693-859e53936423?w=600&auto=format&fit=crop&q=80'],
    videos: [],
    latitude: 23.0330,
    longitude: 72.5850,
    address: 'CG Road, Near Swastik Crossroad',
    priority: 'CRITICAL',
    status: 'ACCEPTED',
    citizenName: 'Rahul Sharma',
    citizenMobile: '9811122334',
    isAnonymous: false,
    department: 'Water Supply & Sewerage',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    expectedResolutionHours: 12,
    assignedOfficer: 'Er. S. K. Kulkarni',
    aiAnalysis: {
      detectedIssue: 'Ruptured municipal water main',
      detectedCategory: 'Water Leakage',
      severityScore: 94,
      confidenceScore: 98,
      summary: 'AI detected active water pressure discharge onto bituminous roadway.',
      predictedDepartment: 'Water Supply & Sewerage',
      isDuplicate: false,
      isFakeImage: false,
      isSpam: false
    },
    timeline: [
      { status: 'SUBMITTED', timestamp: new Date(Date.now() - 86400000).toISOString(), actor: 'Rahul Sharma' },
      { status: 'VERIFIED', timestamp: new Date(Date.now() - 86300000).toISOString(), note: 'Urgent water loss alert', actor: 'AI Engine' },
      { status: 'ACCEPTED', timestamp: new Date(Date.now() - 70000000).toISOString(), actor: 'Er. S. K. Kulkarni' }
    ],
    votes: 28,
    comments: [],
    workPhotosBefore: ['https://images.unsplash.com/photo-1542013936693-859e53936423?w=600'],
    workPhotosAfter: []
  },
  {
    id: 'CMP-7429',
    title: 'Dangerous Deep Pothole on Flyover Ramp',
    description: 'Two wheelers skidding at night due to unlit deep pothole.',
    category: 'Road Damage / Potholes',
    images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80'],
    videos: [],
    latitude: 23.0450,
    longitude: 72.5900,
    address: 'Shivranjani Flyover Descent',
    priority: 'HIGH',
    status: 'COMPLETED',
    citizenName: 'Anonymous',
    citizenMobile: '9988776655',
    isAnonymous: true,
    department: 'Roads & Bridges Department',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    expectedResolutionHours: 48,
    assignedOfficer: 'Er. A. B. Deshmukh',
    aiAnalysis: {
      detectedIssue: 'Asphalt surface cavity',
      detectedCategory: 'Pothole',
      severityScore: 82,
      confidenceScore: 95,
      summary: 'AI detected structural erosion on elevated carriageway.',
      predictedDepartment: 'Roads & Bridges Department',
      isDuplicate: false,
      isFakeImage: false,
      isSpam: false
    },
    timeline: [
      { status: 'SUBMITTED', timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), actor: 'Anonymous' },
      { status: 'COMPLETED', timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), note: 'Cold mix patch applied', actor: 'Er. A. B. Deshmukh' }
    ],
    votes: 9,
    comments: [],
    workPhotosBefore: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600'],
    workPhotosAfter: ['https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600']
  }
];

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string>('');
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(INITIAL_COMPLAINTS);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-initial-1',
      title: '⚡ AI Route Verified',
      description: 'Complaint #CMP-8941 auto-classified as "Garbage Dump" (96% conf) & assigned to Sanitation Dept.',
      time: '15 minutes ago',
      type: 'ACCEPTED'
    },
    {
      id: 'notif-initial-2',
      title: '🎉 Reward Points Credited',
      description: 'You earned +50 Civic Points for verifying pothole repair near SG Highway.',
      time: '1 hour ago',
      type: 'COMPLETED'
    }
  ]);
  const [activeOtps, setActiveOtps] = useState<Record<string, string>>({});
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check URL params for portal direct access
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('portal');
    if (p === 'officer') {
      setIsGuest(true);
      setCurrentTab('officer-portal');
    } else if (p === 'admin') {
      setIsGuest(true);
      setCurrentTab('admin-panel');
    }
  }, []);

  const handleLoginSuccess = (loggedUser: UserProfile, jwt: string) => {
    setUser(loggedUser);
    setToken(jwt);
    if (loggedUser.role === 'OFFICER' || loggedUser.role === 'SUPERVISOR') {
      setCurrentTab('officer-portal');
    } else if (loggedUser.role === 'ADMIN') {
      setCurrentTab('admin-panel');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleTabChange = (tab: string) => {
    if (isGuest && !user && (tab === 'post' || tab === 'my-complaints' || tab === 'profile')) {
      alert("Please login with your mobile number to file or track complaints.");
      setIsGuest(false);
      return;
    }
    setCurrentTab(tab);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setIsGuest(false);
    handleTabChange('dashboard');
  };

  const handleNewComplaintSubmitted = (newCmp: ComplaintRecord) => {
    setComplaints(prev => [newCmp, ...prev]);
    handleTabChange('my-complaints');
  };

  const handleCategorySelectedFromGrid = (cat: CategoryItem) => {
    handleTabChange('post');
  };

  const handleVoteComplaint = (cmpId: string) => {
    if (isGuest && !user) {
      alert("Please login with your mobile number to upvote community complaints.");
      setIsGuest(false);
      return;
    }
    if (upvotedIds.includes(cmpId)) return;

    setUpvotedIds(prev => [...prev, cmpId]);

    setComplaints(prev => prev.map(c => {
      if (c.id === cmpId) {
        const nextVotes = c.votes + 1;
        const isRapid = nextVotes >= 16;
        let updatedTimeline = [...c.timeline];
        let nextPriority = c.priority;

        if (isRapid && c.priority !== 'CRITICAL') {
          nextPriority = 'CRITICAL';
          updatedTimeline.push({
            status: c.status,
            timestamp: new Date().toISOString(),
            note: `🚨 RAPID FLEET DISPATCH TRIGGERED: Complaint reached ${nextVotes} upvotes! Priority upgraded to Critical & rapid response crew emergency-dispatched.`,
            actor: 'System Auto-Scale'
          });

          // Send notification
          const newNotif: NotificationItem = {
            id: `notif-rapid-${Date.now()}`,
            title: '🚨 Rapid Fleet Dispatched!',
            description: `Grievance #${cmpId} has reached ${nextVotes} upvotes! Rapid response fleet is being emergency-dispatched now.`,
            time: 'Just now',
            type: 'IN_PROGRESS'
          };
          setNotifications(n => [newNotif, ...n]);
        }

        return {
          ...c,
          votes: nextVotes,
          priority: nextPriority,
          timeline: updatedTimeline
        };
      }
      return c;
    }));
  };

  const handleGenerateOtp = (cmpId: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtps(prev => ({ ...prev, [cmpId]: code }));

    // Async notify backend to store and broadcast the simulated OTP SMS
    fetch(`/api/complaints/${cmpId}/otp/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp: code })
    }).catch(err => console.error("Error syncing complaint resolution OTP to server:", err));

    // Send notification with code to citizen
    const newNotif: NotificationItem = {
      id: `notif-otp-${Date.now()}`,
      title: '🔑 Verification OTP Generated',
      description: `Use code [ ${code} ] to authorize completion of complaint #${cmpId}. Share this ONLY if work is fully completed.`,
      time: 'Just now',
      type: 'ACCEPTED'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Append to timeline log so user sees it in their portal
    setComplaints(prev => prev.map(c => {
      if (c.id === cmpId) {
        return {
          ...c,
          timeline: [
            ...c.timeline,
            {
              status: c.status,
              timestamp: new Date().toISOString(),
              note: `🔑 OTP [ ${code} ] sent to citizen's registered mobile number to verify work completion.`,
              actor: 'System Gateway'
            }
          ]
        };
      }
      return c;
    }));

    return code;
  };

  const handleOfficerStatusUpdate = (cmpId: string, newStatus: string, note?: string, afterPhoto?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === cmpId) {
        const updatedTimeline = [...c.timeline, {
          status: newStatus as any,
          timestamp: new Date().toISOString(),
          note,
          actor: user ? user.name : 'Officer'
        }];
        const afterList = afterPhoto ? [afterPhoto, ...(c.workPhotosAfter || [])] : c.workPhotosAfter;
        return {
          ...c,
          status: newStatus as any,
          timeline: updatedTimeline,
          workPhotosAfter: afterList,
          rejectionReason: newStatus === 'REJECTED' ? note : c.rejectionReason
        };
      }
      return c;
    }));

    // Dynamic notification when officer accepts or modifies complaint status
    let title = '';
    let description = '';

    if (newStatus === 'ACCEPTED') {
      title = '✓ Complaint Accepted';
      description = `Your grievance #${cmpId} has been officially accepted by field officer and scheduled for resolution.`;
    } else if (newStatus === 'IN_PROGRESS') {
      title = '🚀 Resolution In Progress';
      description = `Field team has initiated remediation on-site for grievance #${cmpId}.`;
    } else if (newStatus === 'COMPLETED') {
      title = '🎉 Resolved & Closed';
      description = `Grievance #${cmpId} was marked as COMPLETED by the Field officer. Thank you for reporting!`;
    } else if (newStatus === 'REJECTED') {
      title = '✗ Grievance Rejected / Re-routed';
      description = `Complaint #${cmpId} updated. Status: Rejected. Reason: ${note || 'Re-routing'}`;
    }

    if (title) {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title,
        description,
        time: 'Just now',
        type: newStatus as any
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  if (!user && !isGuest) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGuestExplore={() => {
          setIsGuest(true);
          setCurrentTab('dashboard');
        }}
        onSelectOfficer={() => {
          setIsGuest(true);
          setCurrentTab('officer-portal');
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        user={user}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenLogin={() => setIsGuest(false)}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        notifications={notifications}
      />

      {/* Main Container Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {currentTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <HeroBanner
              user={user}
              onPostClick={() => handleTabChange('post')}
              onExploreNearby={() => handleTabChange('nearby')}
            />
            <DashboardCards
              user={user}
              complaints={complaints}
              onNavigate={handleTabChange}
            />
          </div>
        )}

        {currentTab === 'post' && (
          <PostComplaintForm
            user={user}
            onSuccessSubmit={handleNewComplaintSubmitted}
            onCancel={() => handleTabChange('dashboard')}
          />
        )}

        {currentTab === 'categories' && (
          <CategorySelectionScreen
            onSelectCategory={handleCategorySelectedFromGrid}
          />
        )}

        {currentTab === 'my-complaints' && (
          <MyComplaintsScreen
            complaints={complaints}
            onTrackDetail={() => {}}
            user={user}
          />
        )}

        {currentTab === 'nearby' && (
          <NearbyComplaintsScreen
            complaints={complaints}
            onVoteComplaint={handleVoteComplaint}
            upvotedIds={upvotedIds}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardScreen
            user={user}
          />
        )}

        {currentTab === 'officer-portal' && (
          <OfficerPortal
            user={user}
            complaints={complaints}
            onLoginOfficer={(offUser) => setUser(offUser)}
            onUpdateComplaintStatus={handleOfficerStatusUpdate}
            onGenerateOtp={handleGenerateOtp}
            activeOtps={activeOtps}
          />
        )}

        {currentTab === 'admin-panel' && (
          <AdminPortal
            user={user}
            complaints={complaints}
            onLoginAdmin={(admUser) => setUser(admUser)}
          />
        )}

        {currentTab === 'profile' && user && (
          <div className="max-w-2xl mx-auto card-box-vibrant dark:bg-slate-800 dark:border-slate-700 p-8 text-center animate-fadeIn">
            <img src={user.avatar} className="w-24 h-24 rounded-full mx-auto mb-4 bg-blue-100 shadow-md border" alt="Profile" />
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">{user.role} PORTAL ACCOUNT</span>
            <h2 className="text-2xl font-bold font-heading mt-3 dark:text-white">{user.name}</h2>
            <p className="text-sm text-slate-500 font-mono mt-1">+91 {user.mobile}</p>
            {user.department && <p className="text-xs text-emerald-500 font-bold mt-1">🏢 {user.department}</p>}

            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200">
                <div className="text-2xl font-extrabold text-amber-600 font-heading">{user.rewardPoints}</div>
                <div className="text-xs text-slate-500 mt-1">Civic Hero Points</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200">
                <div className="text-2xl font-extrabold text-emerald-600 font-heading">{user.resolvedCount}</div>
                <div className="text-xs text-slate-500 mt-1">Resolved Complaints</div>
              </div>
            </div>

            <button onClick={() => handleTabChange('dashboard')} className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md">
              Back to Home Dashboard
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 transition-colors duration-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <strong className="text-slate-800 dark:text-slate-200 font-heading">CivicHero AI v2.0 Enterprise</strong>
            <span>• Swachh Bharat Hyperlocal Engine</span>
          </div>
          <div className="flex gap-4">
            {(!user || user.role === 'CITIZEN') && (
              <button onClick={() => handleTabChange('categories')} className="hover:underline">33 Categories</button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
