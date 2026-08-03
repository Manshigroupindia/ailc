import React from 'react';
import { EventsSection } from '@/components/sections/EventsSection';
import { LegalActivitiesSection } from '@/components/sections/LegalActivitiesSection';

export const EventsPage = () => {
  return (
    <div className="pt-8 min-h-screen">
      <div className="bg-primary text-white py-16 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <span className="font-label-lg text-secondary-fixed uppercase tracking-widest block mb-2">Conferences & Seminars</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg">Events & Initiatives</h1>
        </div>
      </div>
      <EventsSection />
      <LegalActivitiesSection />
    </div>
  );
};
