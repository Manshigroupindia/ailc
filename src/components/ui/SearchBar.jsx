import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search by name...' }) => {
  return (
    <div className="flex-1 min-w-[200px] relative">
      <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface bg-white placeholder:text-outline"
      />
    </div>
  );
};
