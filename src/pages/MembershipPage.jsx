import React from 'react';
import { MembershipSection } from '@/components/sections/MembershipSection';
import { FAQSection } from '@/components/sections/FAQSection';

export const MembershipPage = () => {
  return (
    <div className="pt-8 min-h-screen">
      <div className="bg-primary text-white py-16 text-center">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <span className="font-label-lg text-secondary-fixed uppercase tracking-widest block mb-2">Advocate Fraternity</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg">Become a Member</h1>
        </div>
      </div>
      <MembershipSection />
      <div className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};
