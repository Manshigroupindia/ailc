import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Scale, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const NationalConference2023 = () => {
  const { conference, seo } = useCmsData();

  useEffect(() => {
    document.title = seo?.siteTitle || 'National Conference 26th November 2023 | All India Lawyers Council';
  }, [seo]);

  const mainSpeakers = [
    { name: 'S. Balan', title: 'Senior Counsel', court: 'Bangalore' },
    { name: 'Dr. Adv. Pawan Kumar Arya', title: 'Senior Counsel', court: 'Punjab & Haryana High Court' },
    { name: 'Xavier Felix', title: 'Senior Counsel', court: 'Madras High Court' },
    { name: 'S.M. Ashraf', title: 'Senior Counsel', court: 'Patna High Court' },
    { name: 'Gautam Chaudhury', title: 'Senior Counsel', court: 'Gauhati High Court' },
    { name: 'Juno Rahman', title: 'Senior Counsel', court: 'Manipur High Court' },
    { name: 'M.A. Shakeel', title: 'Senior Counsel', court: 'Telangana High Court' },
    { name: 'Sohel Al Dayani', title: 'Senior Counsel', court: 'Telangana High Court' },
    { name: 'Adish C. Aggarwala', title: 'President', court: 'Supreme Court Bar Association' },
    { name: 'Hafiz Rashid Ahmad Chaudhury', title: 'Senior Counsel', court: 'Gauhati High Court' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* HERO SECTION */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">National Conference 2023</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            {conference?.badge || 'NATIONAL CONFERENCE • NEW DELHI • 26 NOVEMBER 2023'}
          </span>

          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {conference?.title || 'National Conference on 26th November 2023'}
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-semibold text-[#ffe08d]">
            {conference?.subtitle || 'All India Practising Lawyers Council (AILC)'}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 space-y-16">
        {/* INTRODUCTION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant space-y-6 font-body"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-surface-variant">
            <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                CONFERENCE PROCEEDINGS & SUMMARY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Executive Overview
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <p className="p-6 bg-surface-container-low rounded-2xl border border-surface-variant text-primary font-medium">
              AILC held a successful National Conference at {conference?.venue || 'India International Centre, New Delhi'}, presided over by <strong>{conference?.presidedBy || 'Hon’ble Justice Mr. Abhay M. Thipsay'}</strong> and anchored by <strong>{conference?.anchoredBy || 'Adv. Lakshmi Raja'}</strong>.
            </p>

            <p className="p-6 bg-surface-container-low rounded-2xl border border-surface-variant text-primary font-medium">
              {conference?.summaryText || 'Prominent advocates and senior counsels from various states deliberated upon and presented critical analysis and comparative studies of legal frameworks.'}
            </p>
          </div>
        </motion.div>

        {/* MAIN SPEAKERS TABLE */}
        <div className="space-y-8 font-body">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-label-lg text-secondary tracking-widest uppercase block font-semibold text-xs">
              DISTINGUISHED LEGAL FACULTY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Main Speakers
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-surface-variant bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#000d25] text-white text-xs uppercase font-bold tracking-wider">
                  <th className="p-4 sm:p-5">#</th>
                  <th className="p-4 sm:p-5">Name</th>
                  <th className="p-4 sm:p-5">Designation / Title</th>
                  <th className="p-4 sm:p-5">Court / Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant text-xs sm:text-sm text-on-surface-variant font-medium">
                {mainSpeakers.map((speaker, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-secondary">{idx + 1}</td>
                    <td className="p-4 sm:p-5 font-bold text-primary">{speaker.name}</td>
                    <td className="p-4 sm:p-5 text-outline">{speaker.title}</td>
                    <td className="p-4 sm:p-5 font-semibold text-[#000d25]">{speaker.court}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-surface-variant shadow-sm text-center max-w-3xl mx-auto space-y-6 font-body">
          <p className="text-sm sm:text-base text-primary font-medium leading-relaxed">
            "AILC continues to organize national conferences and legal deliberations to strengthen constitutional values, legal awareness and professional collaboration among advocates across India."
          </p>

          <div>
            <Link
              to="/activity-report"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#000d25] text-white hover:bg-opacity-90 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#ffe08d]" /> BACK TO EVENTS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalConference2023;
