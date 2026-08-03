import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { aboutData } from '@/data/mockData';
import { useModal } from '@/context/ModalContext';
import { useCmsData } from '@/context/CmsContext';

export const AboutSection = () => {
  const { homePage } = useCmsData();
  const { tagline, title, paragraphs, mission, vision, presidentMessage } = aboutData;
  const { openModal } = useModal();

  const displayTagline = homePage?.introSubtitle || tagline;
  const displayTitle = homePage?.introTitle || title;
  const displayDesc = homePage?.introDescription || paragraphs[0];

  const handleFullMessage = () => {
    openModal({
      title: "President's Address to the Legal Fraternity",
      content: (
        <div className="space-y-4 leading-relaxed font-body">
          <div className="flex items-center gap-4">
            <img
              src={presidentMessage.image}
              alt={presidentMessage.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-secondary"
            />
            <div>
              <span className="text-secondary font-semibold text-xs uppercase tracking-wider">{presidentMessage.title}</span>
              <h3 className="font-headline-sm text-primary text-xl">{presidentMessage.name}</h3>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant italic">"{presidentMessage.quote1}"</p>
          <p className="text-body-md text-on-surface-variant">{presidentMessage.quote2}</p>
        </div>
      ),
    });
  };

  return (
    <section id="about" className="py-xl bg-[#f8f9fb] font-body">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
        {/* Left Side: Introduction & Mission/Vision */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
            {displayTagline}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-primary">
            {displayTitle}
          </h2>

          <div className="space-y-6 text-on-surface-variant font-body-md leading-relaxed">
            <p>{displayDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="bg-white p-6 rounded-xl border border-surface-variant shadow-sm">
                <h4 className="font-headline-sm text-lg text-primary mb-2 font-semibold">Our Mission</h4>
                <p className="text-sm opacity-80 leading-relaxed">{mission}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-surface-variant shadow-sm">
                <h4 className="font-headline-sm text-lg text-primary mb-2 font-semibold">Our Vision</h4>
                <p className="text-sm opacity-80 leading-relaxed">{vision}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: President's Message Dark Navy Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#000d25] text-white rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <img
                src={presidentMessage.image}
                alt={presidentMessage.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#ffe08d]"
              />
              <div>
                <span className="text-[#ffe08d] font-semibold text-xs tracking-wider uppercase block">
                  {presidentMessage.tag}
                </span>
                <h3 className="font-display text-xl font-bold text-white">{presidentMessage.name}</h3>
                <p className="text-xs text-white/60">{presidentMessage.title}</p>
              </div>
            </div>
            <Quote className="w-12 h-12 text-white/20 flex-shrink-0" />
          </div>

          {/* Quotes Body */}
          <div className="space-y-4 text-white/90 text-sm leading-relaxed mb-8 italic">
            <p>"{presidentMessage.quote1}"</p>
            <p>"{presidentMessage.quote2}"</p>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <button
              onClick={handleFullMessage}
              className="text-[#ffe08d] hover:underline text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              FULL MESSAGE →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
