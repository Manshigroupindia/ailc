import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Quote, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SubmissionSuccessModal = ({ isOpen, onClose, quote }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleHome = () => {
    onClose();
    navigate('/');
  };

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
          className="relative bg-white rounded-3xl shadow-2xl border border-surface-variant max-w-lg w-full p-6 sm:p-8 text-center z-10 overflow-hidden font-body space-y-6"
        >
          {/* Top Decorative Background Glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#ffe08d]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Checkmark Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-[#000d25] text-[#ffe08d] flex items-center justify-center mx-auto shadow-xl border-4 border-[#ffe08d]/30"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>

          {/* Heading & Message */}
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-primary">
              Thank You!
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Thank you for contacting All India Lawyers Council (AILC). Your message has been successfully received by our team. We appreciate your interest and will get back to you as soon as possible.
            </p>
          </div>

          {/* Random Constitution / Dr. B. R. Ambedkar Quote Card */}
          {quote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-[#f8f9fb] border border-surface-variant text-left relative overflow-hidden space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                <Quote className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Constitutional Thought</span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-primary leading-relaxed">
                "{quote.quote}"
              </p>
              <div className="text-right border-t border-surface-variant/60 pt-2">
                <span className="font-display font-bold text-xs text-primary block">
                  — {quote.author}
                </span>
                <span className="text-[10px] text-outline block">
                  {quote.role}
                </span>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleHome}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#000d25] text-white hover:bg-secondary hover:text-[#000d25] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 text-[#ffe08d]" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-surface-container hover:bg-surface-variant text-primary font-bold text-xs uppercase tracking-wider transition-all border border-surface-variant"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
