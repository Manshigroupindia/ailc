import React from 'react';
import { NewsAndPublicationsSection } from '@/components/sections/NewsAndPublicationsSection';

export const ResourcesPage = () => {
  return (
    <div className="pt-8 min-h-screen">
      <div className="bg-primary text-white py-16 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <span className="font-label-lg text-secondary-fixed uppercase tracking-widest block mb-2">Legal Knowledge Bank</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg">Resources & Publications</h1>
        </div>
      </div>
      <NewsAndPublicationsSection />
    </div>
  );
};
