import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, ArrowRight, FileText, Sparkles, Filter, X } from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';
import { buildSearchIndex, searchDocuments } from '@/services/searchService';

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(rawQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const cmsData = useCmsData();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchInput(rawQuery);
  }, [rawQuery]);

  useEffect(() => {
    document.title = rawQuery
      ? `Search Results for "${rawQuery}" | All India Lawyers Council`
      : 'Search Portal | All India Lawyers Council';
  }, [rawQuery]);

  // Build index dynamically from CMS context
  const searchIndex = useMemo(() => buildSearchIndex(cmsData), [cmsData]);

  // Perform search matching
  const allResults = useMemo(() => {
    return searchDocuments(searchIndex, rawQuery);
  }, [searchIndex, rawQuery]);

  // Filter by category
  const categories = useMemo(() => {
    const set = new Set(['All']);
    allResults.forEach((r) => r.category && set.add(r.category));
    return Array.from(set);
  }, [allResults]);

  const filteredResults = useMemo(() => {
    if (selectedCategory === 'All') return allResults;
    return allResults.filter((r) => r.category === selectedCategory);
  }, [allResults, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  // Helper to highlight matching text in snippet
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-[#ffe08d] text-[#000d25] font-bold px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const samplePopularSearches = ['Patrons', 'Manipur Mission', 'National Conference', 'Advocate Protection', 'Rules', 'Privacy Policy'];

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-body">
      {/* HERO / SEARCH BAR BANNER */}
      <section className="bg-[#000d25] text-white py-12 sm:py-16 relative overflow-hidden border-b border-white/10">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-3xl space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Global Search</span>
          </nav>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Search Results
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-secondary absolute left-4" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search across all pages, services, blogs, policies..."
                className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white text-primary text-sm font-medium shadow-lg outline-none focus:ring-2 focus:ring-[#ffe08d]"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-24 text-outline hover:text-primary p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                SEARCH
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* MAIN RESULTS CONTAINER */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-16 space-y-8">
        {/* Results Metadata Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-variant">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary">
              {rawQuery ? (
                <>
                  Results for <span className="text-secondary italic">"{rawQuery}"</span>
                </>
              ) : (
                'Enter a keyword to search'
              )}
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Found {allResults.length} matching document{allResults.length === 1 ? '' : 's'} across the portal.
            </p>
          </div>

          {/* Category Filter Chips */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
              <Filter className="w-4 h-4 text-outline flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#000d25] text-white shadow-sm'
                      : 'bg-white text-on-surface-variant hover:bg-surface-container border border-surface-variant'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RESULTS GRID / LIST */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResults.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-surface-variant shadow-sm hover:shadow-lg hover:border-[#000d25]/30 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-secondary tracking-widest uppercase border border-surface-variant">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-outline">{item.path}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-primary group-hover:text-secondary transition-colors">
                    {highlightText(item.title, rawQuery)}
                  </h3>

                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {highlightText(item.description, rawQuery)}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-variant/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-outline">All India Lawyers Council</span>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 bg-[#000d25] text-white hover:bg-secondary hover:text-[#000d25] font-semibold text-xs px-4 py-2 rounded-full transition-all group-hover:shadow-md"
                  >
                    Open Page <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* NO RESULTS FOUND STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 sm:p-14 rounded-3xl border border-surface-variant text-center max-w-2xl mx-auto space-y-6 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container text-secondary flex items-center justify-center mx-auto font-bold">
              <Search className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-primary mb-2">
                No matching content found.
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                We couldn't find any results matching <strong className="text-primary font-bold">"{rawQuery}"</strong>. Try checking spelling or using more general keywords.
              </p>
            </div>

            <div className="pt-4 border-t border-surface-variant space-y-3">
              <span className="text-xs font-bold text-outline uppercase tracking-wider block">
                Try searching for:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {samplePopularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchInput(tag);
                      setSearchParams({ q: tag });
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface-container-low hover:bg-[#000d25] hover:text-white border border-surface-variant transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#ffe08d]" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
