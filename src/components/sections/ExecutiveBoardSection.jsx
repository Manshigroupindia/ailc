import React from 'react';
import { motion } from 'framer-motion';
import { executiveBoardData } from '@/data/mockData';
import { Button } from '../ui/Button';
import { useModal } from '@/context/ModalContext';

export const ExecutiveBoardSection = () => {
  const { openModal } = useModal();

  const handleProfileClick = (leader) => {
    openModal({
      title: `${leader.name} - Executive Profile`,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={leader.image} alt={leader.name} className="w-24 h-24 rounded-full object-cover border-2 border-secondary" />
            <div>
              <span className="text-secondary font-semibold text-xs uppercase tracking-wider">{leader.role}</span>
              <h3 className="font-headline-sm text-primary text-xl">{leader.name}</h3>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant leading-relaxed">{leader.bio}</p>
          <div className="bg-surface-container p-4 rounded-lg space-y-2 text-sm">
            <p className="font-semibold text-primary">Key Responsibilities:</p>
            <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
              <li>Formulating national bar association policies and advocate welfare schemes.</li>
              <li>Presiding over the Supreme Court Chapter and state chapter liaisons.</li>
              <li>Representing AILC at international legal summits and Commonwealth legal meets.</li>
            </ul>
          </div>
        </div>
      ),
    });
  };

  return (
    <section className="py-xl bg-white overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-4 block">
              National Leadership
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              Executive Board
            </h2>
          </div>
          <button
            onClick={() => {
              const bearersElem = document.getElementById('office-bearers');
              if (bearersElem) bearersElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-button text-button text-primary border-b-2 border-primary pb-1 self-start md:self-auto hover:text-secondary hover:border-secondary transition-colors"
          >
            VIEW ALL LEADERSHIP
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          {executiveBoardData.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative bg-surface-container rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-premium"
            >
              <div className="lg:w-2/5 aspect-square lg:aspect-auto overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>

              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-secondary font-label-lg tracking-widest uppercase mb-2">
                  {leader.role}
                </span>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">
                  {leader.name}
                </h3>
                <p className="text-on-surface-variant text-body-md mb-8">{leader.bio}</p>
                <Button
                  variant="primary"
                  className="w-fit"
                  onClick={() => handleProfileClick(leader)}
                >
                  VIEW PROFILE
                </Button>
              </div>

              {idx === 0 && (
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-16 h-1 bg-secondary-fixed" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
