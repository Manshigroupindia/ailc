import React from 'react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';
import { Mail } from 'lucide-react';
import { ContactSection } from '@/components/sections/ContactSection';

export const Contact = () => {
  return (
    <PagePlaceholder
      title="Contact Secretariat"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Contact Us', path: '/contact' },
      ]}
      description="Connect with the Central Office Bearers and National Administrative Headquarters of All India Lawyers Council."
      icon={Mail}
      categoryTag="HEADQUARTERS CONTACT"
    >
      <ContactSection />
    </PagePlaceholder>
  );
};

export default Contact;
