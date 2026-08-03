import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Scale, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/context/ModalContext';
import { useCmsData } from '@/context/CmsContext';
import { SearchModal } from '@/components/ui/SearchModal';
import { primaryNavigation } from '@/data/navigationData';

export const Navbar = ({ onOpenMenu }) => {
  const location = useLocation();
  const { openModal } = useModal();
  const { branding } = useCmsData();
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const desktopLinks = primaryNavigation;

  return (
    <>
      <nav className="bg-white sticky top-0 z-40 shadow-sm border-b border-surface-variant font-body">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-16 md:h-20">
          {/* Brand Logo & Website Name */}
          <Link to="/" className="flex items-center gap-2.5 font-display text-primary">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt={branding.organizationTitle || "AILC"} className="h-9 w-auto object-contain" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#000d25] flex items-center justify-center text-[#ffe08d] flex-shrink-0">
                <Scale className="w-5 h-5" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs sm:text-sm md:text-lg text-[#000d25] tracking-tight uppercase">
                {branding?.organizationTitle || "ALL INDIA LAWYERS COUNCIL"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {desktopLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.children && link.children.some(child => location.pathname === child.path));

              if (link.hasDropdown || link.hasChildren) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 text-xs font-semibold py-2 transition-colors ${
                        isActive ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180 text-primary' : 'text-outline'}`} />
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {aboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full bg-white rounded-xl shadow-xl border border-surface-variant py-2 w-52 z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.path}
                              className="block px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={
                    isActive
                      ? 'text-primary font-bold border-b-2 border-primary pb-1 text-xs font-semibold'
                      : 'text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold'
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions (Search Icon Only) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors active:scale-95"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Mobile Search Icon ONLY */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors active:scale-95"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
