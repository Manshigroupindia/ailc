import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Scale, ChevronDown, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCmsData } from '@/context/CmsContext';
import { SearchModal } from '@/components/ui/SearchModal';
import { primaryNavigation } from '@/data/navigationData';

export const Navbar = ({ onOpenMenu }) => {
  const location = useLocation();
  const { branding } = useCmsData();
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const desktopLinks = primaryNavigation;

  return (
    <>
      <nav className="bg-white sticky top-0 z-40 shadow-sm border-b border-surface-variant font-body backdrop-blur-md bg-white/95">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          {/* Brand Logo & Organization Title - Compact Two-Line Stacked Format */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none shrink-0 py-2 mr-4 xl:mr-8">
            {branding?.logoUrl ? (
              <img
                src={branding.logoUrl}
                alt={branding.organizationTitle || "AILC"}
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#000d25] flex items-center justify-center text-[#ffe08d] shadow-sm flex-shrink-0 group-hover:bg-secondary group-hover:text-[#000d25] transition-colors">
                <Scale className="w-5 h-5" />
              </div>
            )}
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-display font-bold text-xs sm:text-sm md:text-base text-[#000d25] tracking-tight uppercase">
                ALL INDIA LAWYERS
              </span>
              <span className="font-display font-bold text-xs sm:text-sm md:text-base text-[#000d25] tracking-tight uppercase">
                COUNCIL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Uniform Professional Sizing & Clean Spacing */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2.5 h-full">
            {desktopLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.children && link.children.some((child) => location.pathname === child.path));

              if (link.hasDropdown || link.hasChildren) {
                return (
                  <div
                    key={link.name}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`relative inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                        isActive
                          ? 'text-[#000d25] bg-[#000d25]/10 font-bold'
                          : 'text-[#000d25]/75 hover:text-[#000d25] hover:bg-[#000d25]/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          aboutDropdownOpen ? 'rotate-180 text-secondary' : 'text-outline'
                        }`}
                      />
                    </Link>

                    {/* Smooth Dropdown Menu */}
                    <AnimatePresence>
                      {aboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute left-0 top-[75%] bg-white rounded-2xl shadow-2xl border border-surface-variant py-2 w-56 z-50 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.path}
                              className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-[#000d25] transition-colors"
                            >
                              <span>{child.name}</span>
                              <span className="text-[10px] text-outline">→</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div key={link.name} className="flex items-center h-full">
                  <Link
                    to={link.path}
                    className={`relative inline-flex items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-[#000d25] bg-[#000d25]/10 font-bold'
                        : 'text-[#000d25]/75 hover:text-[#000d25] hover:bg-[#000d25]/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Desktop Search Button - Vertically Centered */}
          <div className="hidden lg:flex items-center h-full">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#000d25] hover:bg-surface-container rounded-full transition-all active:scale-95 border border-transparent hover:border-surface-variant"
              aria-label="Search website"
              title="Search website"
            >
              <Search className="w-5 h-5 text-[#000d25]" />
            </button>
          </div>

          {/* Mobile Actions - Untouched */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#000d25] hover:bg-surface-container rounded-full transition-colors active:scale-95"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#000d25]" />
            </button>
            {onOpenMenu && (
              <button
                onClick={onOpenMenu}
                className="p-2 text-[#000d25] hover:bg-surface-container rounded-lg transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
