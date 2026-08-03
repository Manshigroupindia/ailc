import React from 'react';
import { AboutSection } from '@/components/sections/AboutSection';
import { CoreValuesSection } from '@/components/sections/CoreValuesSection';

export const AboutPage = () => {
  return (
    <div className="pt-8 min-h-screen">
      <div className="bg-primary text-white py-16 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <span className="font-label-lg text-secondary-fixed uppercase tracking-widest block mb-2">Institutional Profile</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg">About AILC</h1>
        </div>
      </div>
      <AboutSection />
      <CoreValuesSection />
    </div>
  );
};
