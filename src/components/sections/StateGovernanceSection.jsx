import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Network, Globe } from 'lucide-react';
import { stateGovernanceData } from '@/data/mockData';
import { Button } from '../ui/Button';
import { useModal } from '@/context/ModalContext';

export const StateGovernanceSection = () => {
  const { title, description, features, statesList } = stateGovernanceData;
  const { openModal } = useModal();

  const handleExploreMap = () => {
    openModal({
      title: 'AILC State Committee Network',
      content: (
        <div className="space-y-6">
          <p className="text-body-md text-on-surface-variant">
            Select a state chapter below to view local leadership, head offices, and upcoming regional conferences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statesList.map((st) => (
              <div key={st.name} className="p-4 bg-surface-container rounded-xl border border-surface-variant hover:border-primary transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-headline-sm text-primary font-bold">{st.name}</h4>
                  <span className="text-xs bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-semibold">
                    {st.members} Bearers
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">Capital: {st.capital}</p>
                <p className="text-xs text-outline mt-1">President: {st.president}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  };

  return (
    <section id="state-governance" className="py-xl bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        {/* Left Side Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">{title}</h2>
          <p className="text-body-lg opacity-80 mb-12">{description}</p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed/20 flex items-center justify-center flex-shrink-0">
                <Flag className="w-6 h-6 text-secondary-fixed" />
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm">{features[0].title}</h4>
                <p className="text-body-md opacity-70">{features[0].description}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed/20 flex items-center justify-center flex-shrink-0">
                <Network className="w-6 h-6 text-secondary-fixed" />
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm">{features[1].title}</h4>
                <p className="text-body-md opacity-70">{features[1].description}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Map Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-primary-container rounded-2xl overflow-hidden shadow-2xl p-8 border border-white/10 min-h-[450px] flex items-center justify-center"
        >
          <div className="relative z-10 text-center p-8 lg:p-12 glass-effect border border-white/5 rounded-xl max-w-md">
            <Globe className="w-14 h-14 text-secondary-fixed mx-auto mb-6" />
            <h3 className="font-headline-md text-headline-md mb-4 text-white">
              Interactive Network Map
            </h3>
            <p className="font-body-md opacity-80 mb-8 text-white/90">
              Click on a state to view local committee members, regional news, and upcoming events in that territory.
            </p>
            <Button variant="secondary" size="md" onClick={handleExploreMap}>
              EXPLORE MAP
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
