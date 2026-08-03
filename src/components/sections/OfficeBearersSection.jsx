import React from 'react';
import { motion } from 'framer-motion';
import { officeBearersData } from '@/data/mockData';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import { SearchBar } from '../ui/SearchBar';
import { FilterDropdown } from '../ui/FilterDropdown';
import { ProfileCard } from '../ui/ProfileCard';
import { Button } from '../ui/Button';
import { useModal } from '@/context/ModalContext';

export const OfficeBearersSection = () => {
  const { openModal } = useModal();
  const {
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    filteredData,
  } = useSearchFilter(officeBearersData, ['name', 'designation', 'state'], {
    state: 'All States',
    designation: 'All Designations',
  });

  const stateOptions = ['All States', 'Delhi', 'Kerala', 'Maharashtra', 'Uttar Pradesh', 'Karnataka'];
  const designationOptions = ['All Designations', 'General Secretary', 'National Treasurer', 'Joint Secretary', 'Executive Member'];

  const handleProfileModal = (profile) => {
    openModal({
      title: `${profile.name} - ${profile.designation}`,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={profile.image} alt={profile.name} className="w-20 h-20 rounded-full object-cover border-2 border-secondary" />
            <div>
              <span className="text-secondary font-semibold text-xs uppercase tracking-wider">{profile.designation}</span>
              <h3 className="font-headline-sm text-primary text-xl">{profile.name}</h3>
              <p className="text-xs text-outline">State Chapter: {profile.state}</p>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant">
            Key Office Bearer for AILC {profile.state} region, driving advocate welfare programs, continuous legal education workshops, and state government legislative coordination.
          </p>
        </div>
      ),
    });
  };

  return (
    <section id="office-bearers" className="py-xl bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
            National Office Bearers
          </h2>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-premium flex flex-wrap gap-4 items-center justify-center max-w-4xl mx-auto">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name..."
            />
            <FilterDropdown
              value={filters.state}
              onChange={(val) => handleFilterChange('state', val)}
              options={stateOptions}
            />
            <FilterDropdown
              value={filters.designation}
              onChange={(val) => handleFilterChange('designation', val)}
              options={designationOptions}
            />
            <Button variant="primary">FILTER</Button>
          </div>
        </div>

        {/* Directory Grid */}
        {filteredData.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter"
          >
            {filteredData.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onKnowMore={handleProfileModal}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-outline font-body-md">No office bearers found matching your search query.</p>
          </div>
        )}
      </div>
    </section>
  );
};
