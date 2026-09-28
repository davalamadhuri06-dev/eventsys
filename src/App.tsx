import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoGuideModal } from './components/common/DemoGuideModal';
import { LandingPage } from './components/landing/LandingPage';
import { EventDiscovery } from './components/discovery/EventDiscovery';
import { TeamBuilder } from './components/teams/TeamBuilder';
import { CollaborationRoom } from './components/collaboration/CollaborationRoom';
import { LiveEventMode } from './components/live/LiveEventMode';
import { Leaderboard } from './components/gamification/Leaderboard';
import { EventPassport } from './components/passport/EventPassport';
import { OrganizerDashboard } from './components/organizer/OrganizerDashboard';
import { EventCreationWizard } from './components/create/EventCreationWizard';
import { UserProfile } from './components/profile/UserProfile';
import { EventDetailsModal } from './components/events/EventDetailsModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { FeedbackModal } from './components/feedback/FeedbackModal';

const AppContent: React.FC = () => {
  const {
    activeTab,
    activeEventForDetails,
    setActiveEventForDetails,
    activeCertificate,
    setActiveCertificate,
    activeFeedbackEvent,
    setActiveFeedbackEvent,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Viewport Routing */}
      <main className="flex-1">
        {activeTab === 'home' && <LandingPage />}
        {activeTab === 'explore' && <EventDiscovery />}
        {activeTab === 'my-events' && <UserProfile />}
        {activeTab === 'teams' && <TeamBuilder />}
        {activeTab === 'collab' && <CollaborationRoom />}
        {activeTab === 'live' && <LiveEventMode />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'passport' && <EventPassport />}
        {activeTab === 'organizer' && <OrganizerDashboard />}
        {activeTab === 'create-event' && <EventCreationWizard />}
        {activeTab === 'profile' && <UserProfile />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <DemoGuideModal />

      {activeEventForDetails && (
        <EventDetailsModal
          event={activeEventForDetails}
          onClose={() => setActiveEventForDetails(null)}
        />
      )}

      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {activeFeedbackEvent && (
        <FeedbackModal
          event={activeFeedbackEvent}
          onClose={() => setActiveFeedbackEvent(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
