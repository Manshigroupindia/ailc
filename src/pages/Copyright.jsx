import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Copyright as CopyrightIcon,
  Shield,
  FileCode,
  Image,
  Video,
  Award,
  AlertTriangle,
  FileCheck,
  Scale,
  Mail,
  ChevronRight,
  MapPin,
  Phone
} from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const Copyright = () => {
  const { contact } = useCmsData();

  useEffect(() => {
    document.title = 'Copyright & Intellectual Property | All India Lawyers Council';
  }, []);

  const copyrightSections = [
    {
      id: 'ownership',
      title: '1. Ownership of Content',
      icon: CopyrightIcon,
      content: (
        <div className="space-y-4">
          <p>
            All material and intellectual property contained on this website—including but not limited to legal resolutions, fact-finding reports, committee constitutions, conference proceedings, press releases, website design, text layout, audio-visual broadcasts, and underlying source code—are the sole property of the <strong>All India Lawyers Council (AILC)</strong> and <strong>Manshi Group of Services</strong>.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 font-sans text-xs">
            <div className="p-3 bg-surface-container rounded-xl border border-surface-variant flex items-center gap-2">
              <FileCode className="w-4 h-4 text-secondary" />
              <span>Source Code & Scripts</span>
            </div>
            <div className="p-3 bg-surface-container rounded-xl border border-surface-variant flex items-center gap-2">
              <Image className="w-4 h-4 text-secondary" />
              <span>Logos & Photography</span>
            </div>
            <div className="p-3 bg-surface-container rounded-xl border border-surface-variant flex items-center gap-2">
              <Video className="w-4 h-4 text-secondary" />
              <span>Conferences & Videos</span>
            </div>
            <div className="p-3 bg-surface-container rounded-xl border border-surface-variant flex items-center gap-2">
              <Award className="w-4 h-4 text-secondary" />
              <span>Legal Reports & Charters</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trademarks',
      title: '2. Trademarks & Insignia Protection',
      icon: Shield,
      content: (
        <div className="space-y-3">
          <p>
            The names "All India Lawyers Council", "All India Practising Lawyers Council", "AILC", the official Council emblem, scale insignia, and associate branding logos belong exclusively to AILC registered under NGO nomenclature in Delhi since 2020.
          </p>
          <p>
            Unauthorized usage of the AILC name or logo on letterheads, legal filings, public banners, social media pages, or publications without written authorization from the Central Secretariat is strictly prohibited under Indian Trademark and Intellectual Property laws.
          </p>
        </div>
      ),
    },
    {
      id: 'restricted-use',
      title: '3. Restricted Use & Fair Dealing',
      icon: FileCheck,
      content: (
        <div className="space-y-3">
          <p>
            Permission is granted to download, view, or print single copies of published AILC fact-finding reports, advocate protection guides, or public conference announcements strictly for non-commercial, academic, or pro-bono legal reference purposes, provided that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The content remains unmodified and unaltered.</li>
            <li>Proper attribution and copyright notice ("Source: All India Lawyers Council") is conspicuously displayed.</li>
            <li>No commercial charge or gain is derived from its redistribution.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'prohibited-activities',
      title: '4. Prohibited Intellectual Activities',
      icon: AlertTriangle,
      content: (
        <div className="space-y-3">
          <p>You may not perform any of the following actions without express written consent:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Republishing, framing, mirroring, or scraping AILC portal databases or member registries.</li>
            <li>Decompiling, reverse engineering, or extracting source code modules.</li>
            <li>Selling, licensing, or commercializing AILC publication archives or patron directories.</li>
            <li>Using automated web spiders or bots to harvest data from the portal.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'dmca-reporting',
      title: '5. Copyright Infringement Complaints & DMCA',
      icon: Scale,
      content: (
        <div className="space-y-3">
          <p>
            AILC respects the intellectual property rights of others. If you believe that any material or photograph hosted on our website infringes upon your copyright, please submit a formal written notice to our Secretariat Copyright Officer including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the specific URL or image location on our portal.</li>
            <li>Your full name, advocate enrollment number (if applicable), phone, and email address.</li>
            <li>A statement certifying good faith belief that the disputed use is unauthorized.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'licensing',
      title: '6. Licensing & Permission Inquiries',
      icon: Mail,
      content: (
        <div className="space-y-3">
          <p>
            For media syndication, educational republication, research permissions, or commercial licensing inquiries, please contact our Secretariat Editorial Desk at <strong>allindiapractisinglawyers@gmail.com</strong>.
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
            <span className="text-[#ffe08d] font-semibold">Copyright Policy</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase">
            INTELLECTUAL PROPERTY & BRAND RIGHTS
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Copyright & IP Policy
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Legal ownership, trademark protection, permissible use, and copyright enforcement protocols.
          </p>

          <div className="text-xs text-[#ffe08d] font-semibold pt-2">
            Copyright © 2020–2024 All India Lawyers Council. All Rights Reserved.
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
                {copyrightSections.map((s) => (
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
            {copyrightSections.map((sec, idx) => {
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

            {/* Technical Partner & Licensing Box */}
            <div className="bg-[#000d25] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Scale className="w-6 h-6 text-[#ffe08d]" />
                <h3 className="font-display text-xl font-bold text-white">
                  Technical Architecture & Design Ownership
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                The digital platform, user interface design system, and technical portal architecture were engineered by <strong>Manshi Group of Services</strong> for the All India Lawyers Council.
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

export default Copyright;
