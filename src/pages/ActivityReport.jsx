import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  MapPin,
  Calendar,
  X,
  ImageIcon
} from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const ActivityReport = () => {
  const { activityReports } = useCmsData();
  const [activeTab, setActiveTab] = useState('Malegaon');
  const [lightboxImage, setLightboxImage] = useState(null);

  const tabs = [
    'Malegaon',
    'Adharpur',
    'Jharkhand',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Rajasthan',
    'Haryana',
    'Manipur',
  ];

  const commonGalleryImages = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754365/a1_xgwi9j.jpg',
      caption: 'AILC Fact Finding Mission Record #1',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754364/a2_fd2ety.jpg',
      caption: 'AILC Fact Finding Mission Record #2',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754363/a3_lbzlkd.jpg',
      caption: 'AILC Fact Finding Mission Record #3',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754362/a4_s5giku.jpg',
      caption: 'AILC Fact Finding Mission Record #4',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754360/a5_zpitbg.jpg',
      caption: 'AILC Fact Finding Mission Record #5',
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754359/a6_xl9pq7.jpg',
      caption: 'AILC Fact Finding Mission Record #6',
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754358/a7_him2m8.jpg',
      caption: 'AILC Fact Finding Mission Record #7',
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754357/a8_rvcivw.jpg',
      caption: 'AILC Fact Finding Mission Record #8',
    },
    {
      id: 9,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754355/a9_p1jna6.jpg',
      caption: 'AILC Fact Finding Mission Record #9',
    },
    {
      id: 10,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754320/a10_hszfvy.jpg',
      caption: 'AILC Fact Finding Mission Record #10',
    },
    {
      id: 11,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754320/a11_vtqgkp.jpg',
      caption: 'AILC Fact Finding Mission Record #11',
    },
    {
      id: 12,
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785754320/a12_m7z5do.jpg',
      caption: 'AILC Fact Finding Mission Record #12',
    },
  ];

  const renderCommonSection = () => (
    <div className="space-y-12 pt-12 border-t border-surface-variant font-body">
      {/* 1. COMMON REPORT */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant space-y-6">
        <div className="pb-4 border-b border-surface-variant">
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block mb-1">
            STATUTORY MISSION DELEGATION REPORT
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            {activityReports?.commonReportTitle || 'Central Secretariat Manipur Mission Report'}
          </h3>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            {activityReports?.commonReportText ||
              'The Central Secretariat of the AILC conducted an independent Pan-India fact-finding mission examining ground realities, displaced families, and constitutional rights.'}
          </p>
        </div>

        {/* AILC FORMATION IN MANIPUR */}
        <div className="p-6 sm:p-8 bg-[#000d25] text-white rounded-2xl border border-white/10 space-y-6 shadow-lg">
          <div>
            <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block mb-1">
              STATE CHAPTER RATIFICATION
            </span>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
              AILC HAS FORMED COMMITTEE IN MANIPUR AS SEVENTEENTH STATE
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            AILC has formed state committee in seventeenth state of India. Manipur is the second state of North East region after the state of Assam where state committee (ad-hoc) is formed.
          </p>

          <div className="pt-2">
            <h5 className="font-bold text-sm text-[#ffe08d] uppercase tracking-wider mb-3">Committee Members:</h5>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/10 text-[#ffe08d] text-xs uppercase font-bold tracking-wider">
                    <th className="p-3">#</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-xs sm:text-sm text-white/90">
                  {[
                    { name: 'Adv. Juno Rahman', role: 'President' },
                    { name: 'Adv. Julekha Khan', role: 'Vice President' },
                    { name: 'Adv. Baqee Khan', role: 'Vice President' },
                    { name: 'Adv. Mohammad Ajmal Hussain', role: 'General Secretary' },
                    { name: 'Adv. Shamila Rehman', role: 'State Secretary' },
                    { name: 'Adv. Roshan Ara Gulishtan', role: 'State Secretary' },
                    { name: 'Adv. Shahidur Rehman', role: 'State Secretary' },
                    { name: 'Adv. Basei Roja Shahni', role: 'State Treasurer' },
                  ].map((m, idx) => (
                    <tr key={idx} className="hover:bg-white/10 transition-colors">
                      <td className="p-3 font-bold text-[#ffe08d]">{idx + 1}</td>
                      <td className="p-3 font-semibold">{m.name}</td>
                      <td className="p-3 text-[#ffe08d]">{m.role || 'Member'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMMON GALLERY */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-surface-variant">
          <div>
            <h3 className="font-display text-2xl font-bold text-primary">Gallery</h3>
            <p className="text-xs text-outline">Photographic Records</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonGalleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setLightboxImage(img)}
              className="rounded-2xl overflow-hidden border border-surface-variant shadow-sm cursor-pointer relative group bg-[#000d25] h-52"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d25] via-transparent to-transparent opacity-80 flex items-end p-3">
                <span className="text-[11px] text-white font-medium truncate">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VISITS OF AILC */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant space-y-6">
        <div className="pb-4 border-b border-surface-variant">
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block mb-1">
            FACT FINDING & LEGAL HELP MISSIONS
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            {activityReports?.visitsTitle || 'VISITS OF AILC'}
          </h3>
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          {activityReports?.visitsText ||
            'The Teams & delegations of AILC have visited several spots of violence to collect the information on actual facts with the purpose to provide legal help in investigation & prosecution.'}
        </p>
      </div>
    </div>
  );

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
            <span className="text-[#ffe08d] font-semibold">Activity Reports</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            FACT FINDING & LEGAL MISSIONS
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Activity Reports
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Fact Finding Missions, Delegation Visits, Legal Interventions and State Activities conducted by All India Lawyers Council (AILC).
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
        {/* TOP NAVIGATION TABS */}
        <div className="sticky top-20 z-30 bg-[#f8f9fb]/90 backdrop-blur-md pt-2 pb-6 mb-8">
          <div className="flex items-center lg:justify-center overflow-x-auto gap-2 p-2 bg-white rounded-2xl border border-surface-variant shadow-sm no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#000d25] to-[#002256] text-white shadow-md'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffe08d]' : 'text-outline'}`} />
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE TAB CONTENT */}
        <div className="space-y-12">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant space-y-6 font-body">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-variant">
                <div>
                  <span className="text-secondary font-semibold text-xs uppercase tracking-widest block mb-1">
                    REGIONAL LOCATION REPORT
                  </span>
                  <h2 className="font-display text-3xl font-bold text-primary">
                    {activeTab} Activity Proceedings
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-full text-xs font-bold text-primary">
                  <Calendar className="w-3.5 h-3.5 text-secondary" /> AILC Official Report
                </div>
              </div>

              <div className="space-y-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-variant">
                  <h4 className="font-bold text-primary text-base mb-2">Location Activity Overview</h4>
                  <p>
                    {activityReports?.locations?.[activeTab] || `Activity details and proceedings for ${activeTab}.`}
                  </p>
                </div>
              </div>
            </div>
            {renderCommonSection()}
          </motion.div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-[#000d25]/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#000d25] text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <img src={lightboxImage.url} alt={lightboxImage.caption} className="w-full max-h-[75vh] object-contain bg-black" />
                <div className="p-6 bg-[#000d25] text-white">
                  <p className="text-sm font-semibold">{lightboxImage.caption}</p>
                  <p className="text-xs text-[#ffe08d] mt-1">AILC Official Activity Record</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityReport;
