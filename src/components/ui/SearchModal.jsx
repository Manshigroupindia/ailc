import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, History, ArrowRight, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCmsData } from '@/context/CmsContext';
import { buildSearchIndex, searchDocuments } from '@/services/searchService';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const cmsData = useCmsData();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ailc_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load recent searches:', e);
    }
  }, [isOpen]);

  // Focus input automatically when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute live search suggestions dynamically
  const searchIndex = React.useMemo(() => buildSearchIndex(cmsData), [cmsData]);
  const suggestions = React.useMemo(() => {
    if (!query.trim()) return [];
    return searchDocuments(searchIndex, query).slice(0, 6);
  }, [searchIndex, query]);

  const saveRecentSearch = (searchTerm) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('ailc_recent_searches', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save recent search:', e);
    }
  };

  const handleSearchSubmit = (searchTerm = query) => {
    if (!searchTerm.trim()) return;
    saveRecentSearch(searchTerm);
    onClose();
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('ailc_recent_searches');
    } catch (e) {
      console.warn('Failed to clear recent searches:', e);
    }
  };

  const popularTags = ['Patrons', 'Activity Report', 'National Conference', 'Rules & Regulations', 'Launching Session', 'Privacy Policy'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#000d25]/80 backdrop-blur-md font-body">
        {/* Backdrop Click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Search Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-surface-variant overflow-hidden z-10"
        >
          {/* Header Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit();
            }}
            className="relative flex items-center p-4 sm:p-5 border-b border-surface-variant bg-surface-container-low"
          >
            <Search className="w-5 h-5 text-secondary absolute left-5 sm:left-6" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across all pages, patrons, activities, rules..."
              className="w-full pl-10 pr-12 text-sm sm:text-base font-medium text-primary placeholder:text-outline bg-transparent outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-14 text-outline hover:text-primary p-1 rounded-full hover:bg-surface-container"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 text-outline hover:text-primary p-1 rounded-full hover:bg-surface-container text-xs font-semibold uppercase tracking-wider"
            >
              <span className="hidden sm:inline text-[10px] bg-surface-container px-2 py-1 rounded-md border border-surface-variant">ESC</span>
              <X className="w-5 h-5 sm:hidden" />
            </button>
          </form>

          {/* Suggestions Dropdown & Quick Links */}
          <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Live Search Matches */}
            {query.trim() !== '' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-outline tracking-wider uppercase">
                  <span>Matched Results ({suggestions.length})</span>
                  {suggestions.length > 0 && (
                    <button
                      onClick={() => handleSearchSubmit()}
                      className="text-secondary hover:underline flex items-center gap-1 font-semibold"
                    >
                      View All Results <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {suggestions.length > 0 ? (
                  <div className="space-y-2">
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onClose();
                          navigate(item.path);
                        }}
                        className="p-3.5 rounded-2xl border border-surface-variant hover:border-[#000d25]/30 hover:bg-surface-container-low transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold flex-shrink-0 text-xs">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                                {item.title}
                              </h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-secondary font-semibold uppercase border border-surface-variant">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-2 text-outline">
                    <p className="text-sm font-medium">No direct matches for "{query}".</p>
                    <button
                      onClick={() => handleSearchSubmit()}
                      className="text-xs text-secondary font-bold uppercase tracking-wider hover:underline"
                    >
                      Press Enter to search full database
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Popular Topics / Tags */}
            {query.trim() === '' && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-outline tracking-wider uppercase block">
                  Popular Topics
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearchSubmit(tag)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface-container hover:bg-[#000d25] hover:text-white text-on-surface-variant border border-surface-variant transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#ffe08d]" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.trim() === '' && (
              <div className="space-y-3 pt-4 border-t border-surface-variant">
                <div className="flex items-center justify-between text-xs font-bold text-outline tracking-wider uppercase">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-secondary" />
                    Recent Searches
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[11px] text-outline hover:text-error transition-colors"
                  >
                    Clear History
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearchSubmit(s)}
                      className="px-3 py-1 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-medium text-primary border border-surface-variant flex items-center gap-1.5"
                    >
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#000d25] text-white flex items-center justify-between text-[11px] text-white/70 border-t border-white/10">
            <span>Press <strong className="text-[#ffe08d]">Enter</strong> to search</span>
            <span>All India Lawyers Council Portal</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
