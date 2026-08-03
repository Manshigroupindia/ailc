import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ModalProvider } from '@/context/ModalContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { CmsProvider } from '@/context/CmsContext';

import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MobileMenuDrawer } from '@/components/layout/MobileMenuDrawer';
import { Modal } from '@/components/ui/Modal';
import { announcementData } from '@/data/mockData';

// Public Pages
import { HomePage } from '@/pages/HomePage';
import { About } from '@/pages/About';
import { Pledge } from '@/pages/Pledge';
import { LaunchingSession } from '@/pages/LaunchingSession';
import { KeyNoteAddress } from '@/pages/KeyNoteAddress';
import { RulesRegulation } from '@/pages/RulesRegulation';
import { ActivityReport } from '@/pages/ActivityReport';
import { Media } from '@/pages/Media';
import { Patrons } from '@/pages/Patrons';
import { AILCConvention } from '@/pages/AILCConvention';
import { AILCBooklet } from '@/pages/AILCBooklet';
import { NationalConference2023 } from '@/pages/NationalConference2023';
import { Contact } from '@/pages/Contact';
import { LeadershipPage } from '@/pages/LeadershipPage';
import { MembershipPage } from '@/pages/MembershipPage';
import { EventsPage } from '@/pages/EventsPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { SearchResults } from '@/pages/SearchResults';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Copyright } from '@/pages/Copyright';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Admin CMS Components & Pages
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminMessages } from '@/pages/admin/AdminMessages';
import { AdminPeople } from '@/pages/admin/AdminPeople';
import { AdminContact } from '@/pages/admin/AdminContact';
import { AdminBranding } from '@/pages/admin/AdminBranding';
import { AdminSeo } from '@/pages/admin/AdminSeo';
import { AdminMedia } from '@/pages/admin/AdminMedia';
import { AdminPatrons } from '@/pages/admin/AdminPatrons';
import { AdminExecutive } from '@/pages/admin/AdminExecutive';
import { AdminActivityReports } from '@/pages/admin/AdminActivityReports';
import { AdminConference } from '@/pages/admin/AdminConference';
import { AdminNavigation } from '@/pages/admin/AdminNavigation';
import { AdminPagesContent } from '@/pages/admin/AdminPagesContent';
import { AdminHomePage } from '@/pages/admin/AdminHomePage';

// ScrollToTop component to reset window scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Public Layout Wrapper containing Header, Footer, and Floating Navigation
const PublicLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-body text-on-surface bg-background antialiased selection:bg-secondary-fixed selection:text-[#000d25] pb-20 md:pb-0">
      <AnnouncementBar notices={announcementData.notices} />
      <Navbar onOpenMenu={() => setIsMobileMenuOpen(true)} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/pledge" element={<Pledge />} />
          <Route path="/pledge" element={<Pledge />} />
          <Route path="/about/launching-session" element={<LaunchingSession />} />
          <Route path="/about/key-note-address" element={<KeyNoteAddress />} />
          <Route path="/rules-regulation" element={<RulesRegulation />} />
          <Route path="/activity-report" element={<ActivityReport />} />
          <Route path="/media" element={<Media />} />
          <Route path="/patrons" element={<Patrons />} />
          <Route path="/ailc-convention" element={<AILCConvention />} />
          <Route path="/ailc" element={<AILCBooklet />} />
          <Route path="/national-conference-2023" element={<NationalConference2023 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
      <Modal />
      <MobileBottomNav onOpenMenu={() => setIsMobileMenuOpen(true)} />
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AdminAuthProvider>
      <CmsProvider>
        <ModalProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Admin Auth Route */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Enterprise Admin CMS Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/messages" element={<AdminMessages />} />
                  <Route path="/admin/people" element={<AdminPeople />} />
                  <Route path="/admin/pages/home" element={<AdminHomePage />} />
                  <Route path="/admin/contact" element={<AdminContact />} />
                  <Route path="/admin/branding" element={<AdminBranding />} />
                  <Route path="/admin/seo" element={<AdminSeo />} />
                  <Route path="/admin/media" element={<AdminMedia />} />
                  <Route path="/admin/patrons" element={<AdminPatrons />} />
                  <Route path="/admin/executive" element={<AdminExecutive />} />
                  <Route path="/admin/activity-reports" element={<AdminActivityReports />} />
                  <Route path="/admin/conference" element={<AdminConference />} />
                  <Route path="/admin/navigation" element={<AdminNavigation />} />
                  <Route path="/admin/pages" element={<AdminPagesContent />} />
                </Route>
              </Route>

              {/* Public Website Routes */}
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </CmsProvider>
    </AdminAuthProvider>
  );
}
