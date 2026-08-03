import React from 'react';
import { FAQSection } from './FAQSection';
import { TestimonialsSection } from './TestimonialsSection';

export const FAQAndTestimonialsSection = () => {
  return (
    <section id="faq" className="py-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-xl">
        <FAQSection />
        <TestimonialsSection />
      </div>
    </section>
  );
};
