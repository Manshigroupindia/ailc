import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { OrganizationStructureSection } from '@/components/sections/OrganizationStructureSection';
import { LegalActivitiesSection } from '@/components/sections/LegalActivitiesSection';
import { LatestVideosSection } from '@/components/sections/LatestVideosSection';
import { ActivityPreviewSection } from '@/components/sections/ActivityPreviewSection';
import { MembershipSection } from '@/components/sections/MembershipSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { FAQAndTestimonialsSection } from '@/components/sections/FAQAndTestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <OrganizationStructureSection />
      <LegalActivitiesSection />
      <LatestVideosSection />
      <ActivityPreviewSection />
      <MembershipSection />
      <EventsSection />
      <FAQAndTestimonialsSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
