import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronDown, Scale } from 'lucide-react';
import { mobileNavSchema } from '@/data/navigationData';

export const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [aboutExpanded, setAboutExpanded] = useState(true);

  // Body Scroll Lock while menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNav = (path) => {
    onClose();
    if (path) {
      navigate(path);
    }
  };

  const navSchema = mobileNavSchema;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000d25]/80 backdrop-blur-md z-50 md:hidden"
          />

          {/* Full Screen / High Drawer Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed inset-x-0 bottom-0 top-12 bg-white rounded-t-3xl z-50 md:hidden flex flex-col overflow-hidden shadow-2xl border-t border-surface-variant font-body"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-variant bg-[#000d25] text-white flex-shrink-0">
              <div className="flex items-center gap-2 font-display text-base font-bold">
                <div className="w-7 h-7 rounded-md bg-[#ffe08d] text-[#000d25] flex items-center justify-center font-bold text-xs">
                  <Scale className="w-4 h-4" />
                </div>
                All India Lawyers Council
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Items Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-32">
              {navSchema.map((sec, idx) => (
                <div key={idx}>
                  <h4 className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-3 px-1">
                    {sec.title}
                  </h4>
                  <div className="space-y-1 bg-surface-container-low p-2 rounded-2xl border border-surface-variant">
                    {sec.items.map((item, itemIdx) => {
                      const IconComp = item.icon || Scale;
                      const isActive = location.pathname === item.path;

                      if (item.hasChildren || item.hasDropdown) {
                        return (
                          <div key={itemIdx} className="rounded-xl overflow-hidden bg-white border border-surface-variant">
                            <div className="flex items-center justify-between p-3.5">
                              <button
                                onClick={() => handleNav(item.path)}
                                className={`flex items-center gap-3 text-sm font-bold flex-1 text-left ${
                                  isActive ? 'text-secondary' : 'text-primary hover:text-secondary'
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#000d25] text-[#ffe08d] flex items-center justify-center">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span>{item.label || item.name}</span>
                              </button>
                              <button
                                onClick={() => setAboutExpanded(!aboutExpanded)}
                                className="p-2 text-outline hover:text-primary rounded-lg"
                                aria-label="Toggle submenu"
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform ${aboutExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>

                            {/* Sub-items */}
                            <AnimatePresence>
                              {aboutExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-surface-container-low border-t border-surface-variant px-3 py-2 space-y-1"
                                >
                                  {item.children.map((child, childIdx) => {
                                    const ChildIcon = child.icon || Scale;
                                    const isChildActive = location.pathname === child.path;
                                    return (
                                      <button
                                        key={childIdx}
                                        onClick={() => handleNav(child.path)}
                                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                                          isChildActive
                                            ? 'bg-white text-secondary font-bold shadow-sm'
                                            : 'text-on-surface-variant hover:bg-white hover:text-primary'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <ChildIcon className="w-3.5 h-3.5 text-secondary" />
                                          <span>{child.label || child.name}</span>
                                        </div>
                                        <span className="text-outline text-[11px]">→</span>
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={itemIdx}
                          onClick={() => handleNav(item.path)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm transition-all active:scale-[0.98] ${
                            isActive
                              ? 'bg-white text-secondary font-bold shadow-sm border border-secondary/20'
                              : 'hover:bg-white font-medium text-primary'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <span>{item.label || item.name}</span>
                          </div>
                          <span className="text-outline text-xs">→</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;
