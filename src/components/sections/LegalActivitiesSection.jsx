import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { legalActivitiesData } from '@/data/mockData';
import { useModal } from '@/context/ModalContext';

export const LegalActivitiesSection = () => {
  const [activeTab, setActiveTab] = useState('Featured');
  const { openModal } = useModal();

  const tabs = ['Featured', 'Conferences', 'Seminars', 'Training', 'Legal Aid'];

  const filteredActivities = legalActivitiesData.filter((item) => {
    if (activeTab === 'Featured') return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  const handleImageClick = (act) => {
    openModal({
      title: act.title,
      content: (
        <div className="space-y-4 font-body">
          <img src={act.image} alt={act.title} className="w-full h-64 object-cover rounded-2xl shadow-md" />
          <div className="flex items-center justify-between text-xs text-outline">
            <span className="text-secondary font-bold uppercase">{act.category}</span>
          </div>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            High-resolution moment captured during the All India Lawyers Council national program. Members from 28 state chapters participated in legal reform initiatives.
          </p>
        </div>
      ),
    });
  };

  return (
    <section id="activities" className="py-xl bg-white font-body">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        {/* Section Tag & Heading */}
        <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold">
          LEGAL ACTIVITIES
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-8">
          Moments & Initiatives
        </h2>

        {/* Tabs Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-[#000d25] text-white shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 6 Image Cards Grid (2-column on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-12">
          {filteredActivities.map((act) => (
            <motion.div
              key={act.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleImageClick(act)}
              className="rounded-2xl overflow-hidden shadow-sm border border-surface-variant group cursor-pointer aspect-[4/3] bg-[#000d25]"
            >
              <img
                src={act.image}
                alt={act.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery Button - Redirects to /media */}
        <Link
          to="/media"
          className="inline-block bg-[#000d25] text-white hover:bg-opacity-90 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          VIEW FULL GALLERY
        </Link>
      </div>
    </section>
  );
};

export default LegalActivitiesSection;
