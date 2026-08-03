import { useState, useMemo } from 'react';

export const useSearchFilter = (data, searchKeys = [], initialFilters = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Check search match
      const matchesSearch = searchKeys.length === 0 || searchKeys.some((key) => {
        const val = item[key];
        return val && val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Check filter matches
      const matchesFilters = Object.entries(filters).every(([filterKey, filterValue]) => {
        if (!filterValue || filterValue === 'All' || filterValue === 'All States' || filterValue === 'All Designations') {
          return true;
        }
        return item[filterKey]?.toString().toLowerCase() === filterValue.toString().toLowerCase();
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchKeys, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters(initialFilters);
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    resetFilters,
    filteredData,
  };
};
