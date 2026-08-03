import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const SubmissionErrorModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#000d25]/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-surface-variant max-w-md w-full p-6 sm:p-8 text-center z-10 overflow-hidden font-body space-y-6"
        >
          {/* Animated Error Icon */}
          <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="w-8 h-8" />
          </div>

          {/* Heading & Message */}
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-primary">
              Submission Failed
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {errorMessage || "Something went wrong while sending your message. Please try again after a few moments."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#000d25] text-white hover:bg-secondary hover:text-[#000d25] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-[#ffe08d]" />
              <span>Try Again</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
