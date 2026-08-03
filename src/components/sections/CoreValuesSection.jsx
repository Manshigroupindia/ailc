import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Users, BookOpen, GraduationCap, HeartHandshake } from 'lucide-react';
import { coreValuesData } from '@/data/mockData';

const iconMap = {
  Scale: Scale,
  ShieldCheck: ShieldCheck,
  Users: Users,
  BookOpen: BookOpen,
  GraduationCap: GraduationCap,
  HeartHandshake: HeartHandshake,
};

export const CoreValuesSection = () => {
  return (
    <section className="py-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Core Values
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Foundational principles that guide every action and decision within the All India Lawyers Council.
        </p>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {coreValuesData.map((val, idx) => {
          const IconComp = iconMap[val.icon] || Scale;
          return (
            <motion.div
              key={val.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white p-10 rounded-xl shadow-premium hover:shadow-xl transition-all border border-transparent hover:border-secondary-fixed/30"
            >
              <IconComp className="w-12 h-12 text-secondary mb-6" />
              <h3 className="font-headline-sm text-headline-sm mb-4 text-primary">{val.title}</h3>
              <p className="text-on-surface-variant text-body-md">{val.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
