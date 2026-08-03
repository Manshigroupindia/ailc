import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Map, Users, Scale } from 'lucide-react';
import { heroData } from '@/data/mockData';
import { useModal } from '@/context/ModalContext';
import { useCmsData } from '@/context/CmsContext';

const iconMap = {
  Landmark: Landmark,
  Map: Map,
  Users: Users,
  Scale: Scale,
};

export const HeroSection = () => {
  const { homePage } = useCmsData();
  const { openModal } = useModal();

  const established = homePage?.heroHighlightText || heroData.established;
  const title = homePage?.heroMainHeading || heroData.title;
  const subtitle = homePage?.heroSubHeading || homePage?.heroDescription || heroData.subtitle;
  const bgImage = homePage?.heroBgImage || heroData.bgImage;
  const primaryBtnText = homePage?.heroPrimaryBtnText || 'Become a Member';
  const secondaryBtnText = homePage?.heroSecondaryBtnText || 'Learn More';

  const stats = heroData.stats;

  const handleMemberClick = () => {
    openModal({
      title: 'AILC Membership Application',
      content: (
        <div className="space-y-4">
          <p>Join over 50,000+ legal practitioners across India. Membership grants national accreditation, access to law journals, and advocate welfare schemes.</p>
          <div className="bg-surface-container p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-primary">Eligibility Requirements:</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Enrolled with any State Bar Council in India</li>
              <li>Active practice in High Court, District Court, or Tribunals</li>
              <li>Clean professional record</li>
            </ul>
          </div>
        </div>
      ),
    });
  };

  const handleLearnMore = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center pt-8 md:pt-16 pb-16 md:pb-20 overflow-hidden bg-[#000d25]">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d25] via-[#000d25]/85 to-[#000d25]/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-xl items-center py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/20 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] mb-4 md:mb-6 tracking-widest uppercase">
            {established}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.15] tracking-tight">
            {title}
          </h1>
          <p className="font-body text-sm sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <button
              onClick={handleMemberClick}
              className="bg-[#ffe08d] text-[#241a00] hover:bg-[#ebd07b] font-semibold rounded-full px-8 py-3.5 text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95 text-center"
            >
              {primaryBtnText}
            </button>
            <button
              onClick={handleLearnMore}
              className="border border-white/40 text-white hover:bg-white/10 font-semibold rounded-full px-8 py-3.5 text-xs sm:text-sm tracking-wide transition-all active:scale-95 text-center"
            >
              {secondaryBtnText}
            </button>
          </div>
        </motion.div>

        {/* 4 Glassmorphic Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:gap-6 mt-4 lg:mt-0"
        >
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Scale;
            return (
              <motion.div
                key={stat.id}
                whileHover={{ y: -4 }}
                className="bg-white/10 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-white/15 shadow-xl transition-all"
              >
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffe08d] mb-2 sm:mb-4" />
                <h3 className="font-display text-2xl sm:text-4xl text-white font-bold mb-0.5">
                  {stat.value}
                </h3>
                <p className="font-body text-[11px] sm:text-sm text-white/70">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
