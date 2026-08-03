import React from 'react';
import { faqData } from '@/data/mockData';
import { Accordion } from '../ui/Accordion';

export const FAQSection = () => {
  return (
    <div>
      <h2 className="font-headline-md text-headline-md text-primary mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion items={faqData} />
    </div>
  );
};
