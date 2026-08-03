import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, MapPin, ShieldAlert, Scale } from 'lucide-react';

export const ActivityPreviewSection = () => {
  const cards = [
    {
      id: 'report-1',
      location: 'Malegaon',
      icon: MapPin,
      badge: 'Fact-Finding Mission',
      description:
        'Fact finding mission conducted after the November 2021 communal violence. The delegation studied ground realities and submitted recommendations for justice.',
      link: '/activity-report',
    },
    {
      id: 'report-2',
      location: 'Adharpur',
      icon: ShieldAlert,
      badge: 'Legal Investigation',
      description:
        'Investigation into the communal violence in Samastipur, Bihar documenting victim testimonies and legal recommendations.',
      link: '/activity-report',
    },
    {
      id: 'report-3',
      location: 'Jharkhand',
      icon: Scale,
      badge: 'Field Visit & Pro-Bono Aid',
      description:
        'AILC fact-finding visits covering mob lynching, police action and legal aid provided to affected families.',
      link: '/activity-report',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f8f9fb] text-[#000d25] relative font-body">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#000d25]/5 border border-[#000d25]/15 rounded-full text-[11px] font-semibold text-[#000d25] tracking-widest uppercase">
            <FileText className="w-3.5 h-3.5 text-secondary" />
            HUMAN RIGHTS & LEGAL AID
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#000d25] tracking-tight">
            Recent Activity Reports
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-body">
            Explore our latest fact-finding missions, legal interventions and field visits across India.
          </p>
        </div>

        {/* 3 Equal Height Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card, index) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-surface-variant shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold shadow-md">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-[#ffe08d]/20 border border-[#ffe08d]/50 text-[#000d25] font-semibold text-[10px] uppercase tracking-wider rounded-full">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-2xl text-[#000d25] group-hover:text-secondary transition-colors">
                      {card.location}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Professional CTA Button */}
                <div className="pt-8 mt-4 border-t border-surface-variant">
                  <Link
                    to={card.link}
                    className="w-full py-3 px-5 bg-[#000d25] hover:bg-[#001944] text-white font-semibold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 group-hover:bg-[#ffe08d] group-hover:text-[#000d25]"
                  >
                    <span>View Full Report</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivityPreviewSection;
