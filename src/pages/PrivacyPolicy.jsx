import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Cookie,
  Database,
  Eye,
  Server,
  CreditCard,
  UserCheck,
  AlertCircle,
  Link as LinkIcon,
  RefreshCw,
  Mail,
  ChevronRight,
  MapPin,
  Phone
} from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const PrivacyPolicy = () => {
  const { contact } = useCmsData();

  useEffect(() => {
    document.title = 'Privacy Policy | All India Lawyers Council (AILC)';
  }, []);

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3">
          <p>
            Welcome to the official portal of the <strong>All India Lawyers Council (AILC)</strong>, managed and operated in technical partnership with <strong>Manshi Group of Services</strong>. We respect your privacy and are committed to protecting all personal and institutional data submitted through our digital portal.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (<strong>https://ailcindia.org</strong>) or register for membership, fact-finding delegations, national conferences, or legal aid inquiries.
          </p>
        </div>
      ),
    },
    {
      id: 'information-collected',
      title: '2. Information We Collect',
      icon: Database,
      content: (
        <div className="space-y-4">
          <p>
            We collect information that identifies, relates to, or describes you ("Personal Information"). This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Full Name & Contact Details:</strong> Email address, phone number, and postal address.</li>
            <li><strong>Bar Council Enrollment Credentials:</strong> State Bar Council enrollment numbers, High Court or District Bar practice details, and identity documents.</li>
            <li><strong>Technical Device Identifiers:</strong> IP addresses, browser types, operating systems, and device identifiers collected automatically upon visiting our portal.</li>
            <li><strong>Correspondence & Support Inquiries:</strong> Communications submitted via our Secretariat contact forms or email helpdesks.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: '3. Cookies & Tracking Technologies',
      icon: Cookie,
      content: (
        <div className="space-y-3">
          <p>
            Our website uses session cookies, functional cookies, and security tokens to enhance your user experience, remember your preferences, and maintain secure session states.
          </p>
          <p>
            You can choose to disable cookies in your web browser settings; however, certain portal features like live search, member dashboard state, or interactive forms may experience restricted functionality.
          </p>
        </div>
      ),
    },
    {
      id: 'analytics',
      title: '4. Analytics & Performance Tracking',
      icon: Eye,
      content: (
        <div className="space-y-3">
          <p>
            We utilize privacy-respecting analytics tools to evaluate portal visitor counts, page load times, geographical region summaries, and navigation patterns.
          </p>
          <p>
            All analytics data is collected in aggregate, anonymized form and is exclusively used to optimize website performance and legal resource accessibility.
          </p>
        </div>
      ),
    },
    {
      id: 'use-of-info',
      title: '5. How We Use Information',
      icon: Server,
      content: (
        <div className="space-y-3">
          <p>We process your personal information for the following legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Verifying advocate eligibility for AILC membership and bar representation.</li>
            <li>Coordinating national advocate welfare programs and emergency legal aid delegations.</li>
            <li>Sending official bulletins, conference invitations, and statutory notifications.</li>
            <li>Maintaining portal cybersecurity, preventing fraudulent access, and satisfying legal reporting duties under Indian law.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'data-security',
      title: '6. Data Security Practices',
      icon: Lock,
      content: (
        <div className="space-y-3">
          <p>
            We deploy multi-layered physical, administrative, and technological security controls including 256-bit SSL encryption, restricted access policies, and automated vulnerability monitoring to safeguard your data against unauthorized access, loss, or disclosure.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party',
      title: '7. Third-Party Infrastructure Services',
      icon: Server,
      content: (
        <div className="space-y-4">
          <p>Our digital portal integrates with industry-standard third-party providers:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 rounded-2xl bg-surface-container border border-surface-variant space-y-1">
              <strong className="text-primary font-bold block text-sm">Google Services</strong>
              <p className="text-on-surface-variant">Used for Google Fonts typography and embedded Google Maps for Secretariat direction guidance.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container border border-surface-variant space-y-1">
              <strong className="text-primary font-bold block text-sm">Cloudinary CDN</strong>
              <p className="text-on-surface-variant">High-performance media delivery for historical photo archives and patron portraits.</p>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container border border-surface-variant space-y-1">
              <strong className="text-primary font-bold block text-sm">Firebase Datastore</strong>
              <p className="text-on-surface-variant">Encrypted Realtime Firestore database for dynamic CMS synchronization and settings storage.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'payment-security',
      title: '8. Payment Security',
      icon: CreditCard,
      content: (
        <div className="space-y-3">
          <p>
            All membership contributions or donor transactions are processed exclusively through RBI-approved, PCI-DSS compliant Indian payment gateways (e.g., Razorpay/UPI/Bank Transfer).
          </p>
          <p>
            AILC does not store or process raw debit/credit card numbers or net banking credentials on its servers.
          </p>
        </div>
      ),
    },
    {
      id: 'user-rights',
      title: '9. User Rights & Data Control',
      icon: UserCheck,
      content: (
        <div className="space-y-3">
          <p>Under applicable Indian data privacy regulations, users hold the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Request access to or a copy of their personal profile data held by AILC.</li>
            <li>Request rectification of incorrect Bar Council enrollment records or contact details.</li>
            <li>Request deletion of non-statutory personal data when membership is concluded.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'children-privacy',
      title: '10. Children\'s Privacy',
      icon: AlertCircle,
      content: (
        <div className="space-y-3">
          <p>
            Our portal and membership services are directed exclusively at adult legal practitioners, academicians, and citizens. We do not knowingly collect personal information from minors under the age of 18.
          </p>
        </div>
      ),
    },
    {
      id: 'external-links',
      title: '11. External Website Links',
      icon: LinkIcon,
      content: (
        <div className="space-y-3">
          <p>
            This website contains links to statutory legal bodies (e.g., Bar Council of India, Supreme Court of India, Supreme Court Bar Association). AILC is not responsible for the privacy practices or content of third-party external websites.
          </p>
        </div>
      ),
    },
    {
      id: 'policy-updates',
      title: '12. Policy Updates & Modifications',
      icon: RefreshCw,
      content: (
        <div className="space-y-3">
          <p>
            AILC reserves the right to amend or update this Privacy Policy at any time. Any changes will be posted immediately on this page with an updated revision date.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-body">
      {/* HERO SECTION */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Privacy Policy</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase">
            LEGAL COMPLIANCE & GOVERNANCE
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Our commitment to protecting the personal data, credentials, and digital privacy of advocates and portal visitors.
          </p>

          <div className="text-xs text-[#ffe08d] font-semibold pt-2">
            Effective Date: January 1, 2024 | Revision 2.4
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white p-6 rounded-3xl border border-surface-variant shadow-sm sticky top-28 space-y-3">
              <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider pb-2 border-b border-surface-variant">
                Policy Contents
              </h3>
              <nav className="space-y-1 text-xs">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block py-1.5 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors font-medium"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Sections List */}
          <div className="lg:col-span-3 space-y-8">
            {sections.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <motion.div
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white p-8 sm:p-10 rounded-3xl border border-surface-variant shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-3.5 pb-4 border-b border-surface-variant">
                    <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold flex-shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-primary">
                      {sec.title}
                    </h2>
                  </div>

                  <div className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-body">
                    {sec.content}
                  </div>
                </motion.div>
              );
            })}

            {/* Contact Box */}
            <div className="bg-[#000d25] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#ffe08d]" />
                <h3 className="font-display text-xl font-bold text-white">
                  Privacy Contact & Grievance Officer
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy, please contact our Legal Secretariat Privacy Desk:
              </p>
              <div className="space-y-2 text-xs text-[#ffe08d] font-semibold pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <span>{contact?.address || 'A-15, HAZRAT NIZAMUDDIN WEST, NEW DELHI'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white" />
                  <span>{contact?.email || 'allindiapractisinglawyers@gmail.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-white" />
                  <span>{contact?.phone || '011-46068472'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
