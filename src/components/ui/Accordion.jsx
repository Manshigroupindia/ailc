import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-surface-variant">
      <button
        type="button"
        className="w-full p-6 flex items-center justify-between font-label-lg text-primary text-left transition-colors hover:bg-surface-container-low"
        onClick={onToggle}
      >
        <span>{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-secondary flex-shrink-0 ml-4" />
        ) : (
          <Plus className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-on-surface-variant text-body-md border-t border-surface-container-low pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ items }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};
