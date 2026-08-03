import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { MemberCard } from './MemberCard';

export const Directory = ({
  title,
  subtitle,
  data = [],
  designationOptions = [],
  stateOptions = [],
  showAlphabetFilter = false,
  pageSize = 8,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search match
      const matchesSearch =
        searchTerm === '' ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.state && item.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.address && item.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.post && item.post.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.occupation && item.occupation.toLowerCase().includes(searchTerm.toLowerCase()));

      // Designation match
      const matchesDesignation =
        selectedDesignation === 'All Designations' ||
        (item.designation && item.designation.toLowerCase() === selectedDesignation.toLowerCase());

      // State match
      const matchesState =
        selectedState === 'All States' ||
        (item.state && item.state.toLowerCase() === selectedState.toLowerCase());

      // Alphabet match
      const nameClean = item.name.replace(/^Adv\.\s*/i, '').replace(/^Hon'ble\s*/i, '').trim();
      const matchesLetter =
        selectedLetter === 'All' ||
        nameClean.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesDesignation && matchesState && matchesLetter;
    });
  }, [data, searchTerm, selectedDesignation, selectedState, selectedLetter]);

  const visibleItems = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + pageSize);
  };

  return (
    <div className="bg-surface-container-low p-4 sm:p-8 rounded-2xl border border-surface-variant my-6 md:my-8 overflow-hidden">
      {title && (
        <div className="mb-6">
          <h3 className="font-display font-bold text-lg sm:text-xl text-primary">{title}</h3>
          {subtitle && <p className="text-xs text-outline mt-1 leading-relaxed">{subtitle}</p>}
        </div>
      )}

      {/* Filter Bar: Stacks vertically on mobile (<640px), flex-row on tablet & desktop */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl shadow-sm border border-surface-variant flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center mb-6">
        <div className="w-full sm:flex-1 min-w-0 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(pageSize);
            }}
            placeholder="Search directory by name, state or post..."
            className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-lg text-sm sm:text-xs outline-none focus:ring-2 focus:ring-primary text-on-surface"
          />
        </div>

        {designationOptions.length > 0 && (
          <select
            value={selectedDesignation}
            onChange={(e) => {
              setSelectedDesignation(e.target.value);
              setVisibleCount(pageSize);
            }}
            className="w-full sm:w-auto px-4 py-3 bg-surface-container-low rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary font-medium text-on-surface cursor-pointer"
          >
            <option value="All Designations">All Designations</option>
            {designationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {stateOptions.length > 0 && (
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setVisibleCount(pageSize);
            }}
            className="w-full sm:w-auto px-4 py-3 bg-surface-container-low rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary font-medium text-on-surface cursor-pointer"
          >
            <option value="All States">All States</option>
            {stateOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Alphabet Filter Strip (Optional) */}
      {showAlphabetFilter && (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-6 max-w-full overflow-x-auto py-1">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                setSelectedLetter(letter);
                setVisibleCount(pageSize);
              }}
              className={`w-7 h-7 rounded-full text-[11px] font-semibold transition-all flex-shrink-0 ${
                selectedLetter === letter
                  ? 'bg-[#000d25] text-white shadow'
                  : 'bg-white text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* Responsive Grid: 4 cols desktop (lg:grid-cols-4), 2 cols tablet (md:grid-cols-2), 1 col mobile */}
      {visibleItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleItems.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-xl border border-surface-variant">
          <p className="text-xs text-outline font-medium">No members found matching the selected filter criteria.</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="w-full sm:w-auto bg-[#000d25] text-white hover:bg-opacity-90 font-semibold text-xs px-8 py-3.5 rounded-full transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wider shadow-md"
          >
            LOAD MORE <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
