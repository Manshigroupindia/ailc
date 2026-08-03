import React from 'react';

export const FilterDropdown = ({ value, onChange, options = [] }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-6 py-3 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary font-label-lg bg-white text-on-surface cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
