import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { term2023Data, term2020Data } from '@/data/leadershipData';
import { Directory } from '@/components/ui/Directory';

export const OrganizationStructureSection = () => {
  return (
    <section id="leadership" className="py-xl bg-[#f8f9fb]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold">
            ORGANIZATION STRUCTURE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary">
            Leadership & Directory
          </h2>
        </div>

        {/* =========================================================
            SECTION 1: 2ND NATIONAL CONVENTION (TERM 2023–2026)
           ========================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-surface-variant mb-16">
          {/* Section 1 Header */}
          <div className="border-b border-surface-variant pb-6 mb-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-[#000d25] text-white text-xs font-semibold rounded-full tracking-widest uppercase mb-3">
              TERM : 2023–2026
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
              2ND NATIONAL CONVENTION CENTRAL OFFICE BEARERS
            </h3>
          </div>

          {/* NATIONAL PRESIDENT */}
          <div className="mb-14">
            <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-6 text-center">
              NATIONAL PRESIDENT
            </h4>
            <motion.div
              whileHover={{ y: -6 }}
              className="max-w-2xl mx-auto bg-[#000d25] text-white p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border border-white/10"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#ffe08d] flex-shrink-0">
                <img
                  src={term2023Data.president.image}
                  alt={term2023Data.president.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-wider block mb-1">
                  {term2023Data.president.designation}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {term2023Data.president.name}
                </h3>
                <p className="text-xs text-white/80 italic mb-3">
                  ({term2023Data.president.subtitle})
                </p>
                <div className="inline-flex items-center gap-1 text-xs text-white/60">
                  <MapPin className="w-3.5 h-3.5 text-[#ffe08d]" />
                  <span>{term2023Data.president.location}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* NATIONAL VICE PRESIDENTS */}
          <div className="mb-14">
            <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-6 text-center">
              NATIONAL VICE PRESIDENTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {term2023Data.vicePresidents.map((vp, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-surface-variant mb-4">
                    <img src={vp.image} alt={vp.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="font-display text-base font-bold text-primary mb-1">{vp.name}</h5>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">
                    {vp.designation}
                  </p>
                  <span className="text-xs text-outline flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {vp.location}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SECRETARY GENERAL & TREASURER ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {/* SECRETARY GENERAL */}
            <div>
              <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-4 text-center">
                NATIONAL SECRETARY GENERAL
              </h4>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-4">
                  <img
                    src={term2023Data.secretaryGeneral.image}
                    alt={term2023Data.secretaryGeneral.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-display text-lg font-bold text-primary mb-1">
                  {term2023Data.secretaryGeneral.name}
                </h5>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {term2023Data.secretaryGeneral.designation}
                </p>
                <span className="text-xs text-outline flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {term2023Data.secretaryGeneral.location}
                </span>
              </motion.div>
            </div>

            {/* TREASURER */}
            <div>
              <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-4 text-center">
                NATIONAL TREASURER
              </h4>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-4">
                  <img
                    src={term2023Data.treasurer.image}
                    alt={term2023Data.treasurer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-display text-lg font-bold text-primary mb-1">
                  {term2023Data.treasurer.name}
                </h5>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {term2023Data.treasurer.designation}
                </p>
                <span className="text-xs text-outline flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {term2023Data.treasurer.location}
                </span>
              </motion.div>
            </div>
          </div>

          {/* NATIONAL SECRETARIES */}
          <div className="mb-14">
            <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-6 text-center">
              NATIONAL SECRETARIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {term2023Data.secretaries.map((sec, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-surface-variant mb-4">
                    <img src={sec.image} alt={sec.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="font-display text-base font-bold text-primary mb-1">{sec.name}</h5>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">
                    {sec.designation}
                  </p>
                  <span className="text-xs text-outline flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {sec.location}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CENTRAL COMMITTEE (2023-26) DIRECTORY */}
          <Directory
            title="CENTRAL COMMITTEE (2023–2026)"
            subtitle="Searchable directory of Central Committee members. 4 cards per row with pagination."
            data={term2023Data.centralCommittee}
            designationOptions={["Central Committee Member"]}
            stateOptions={[
              "Delhi",
              "Kerala",
              "West Bengal",
              "Punjab",
              "Maharashtra",
              "Karnataka",
              "Bihar",
              "Uttar Pradesh",
              "Tamil Nadu",
              "Assam",
              "Gujarat",
              "Telangana",
              "Uttarakhand",
              "Jharkhand"
            ]}
          />

          {/* OFFICE BEARERS (2023-26) DIRECTORY */}
          <Directory
            title="OFFICE BEARERS (2023–2026)"
            subtitle="Directory of office bearers holding administrative posts across various state bar councils."
            data={term2023Data.officeBearers}
            designationOptions={["Joint Secretary", "Executive Member"]}
            stateOptions={[
              "Punjab",
              "Uttar Pradesh",
              "Kerala",
              "Rajasthan",
              "Tamil Nadu",
              "Odisha",
              "Madhya Pradesh",
              "West Bengal",
              "Delhi",
              "Telangana",
              "Haryana",
              "Bihar"
            ]}
          />
        </div>

        {/* Subtle Section Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-outline-variant" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f8f9fb] px-6 text-xs font-bold text-outline uppercase tracking-widest">
              PAST TERM ARCHIVE
            </span>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: 1ST NATIONAL CONVENTION (TERM 2020–2023)
           ========================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-surface-variant">
          {/* Section 2 Header */}
          <div className="border-b border-surface-variant pb-6 mb-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-surface-container-high text-primary text-xs font-semibold rounded-full tracking-widest uppercase mb-3">
              TERM : 2020–2023
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
              1ST NATIONAL CONVENTION (TERM 2020–23)
            </h3>
          </div>

          {/* NATIONAL PRESIDENT */}
          <div className="mb-14">
            <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-6 text-center">
              NATIONAL PRESIDENT
            </h4>
            <motion.div
              whileHover={{ y: -6 }}
              className="max-w-2xl mx-auto bg-[#000d25] text-white p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border border-white/10"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#ffe08d] flex-shrink-0">
                <img
                  src={term2020Data.president.image}
                  alt={term2020Data.president.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-wider block mb-1">
                  {term2020Data.president.designation}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {term2020Data.president.name}
                </h3>
                <p className="text-xs text-white/80 italic mb-3">
                  ({term2020Data.president.subtitle})
                </p>
                <div className="inline-flex items-center gap-1 text-xs text-white/60">
                  <MapPin className="w-3.5 h-3.5 text-[#ffe08d]" />
                  <span>{term2020Data.president.location}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* NATIONAL VICE PRESIDENTS */}
          <div className="mb-14">
            <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-6 text-center">
              NATIONAL VICE PRESIDENTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {term2020Data.vicePresidents.map((vp, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-surface-variant mb-4">
                    <img src={vp.image} alt={vp.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="font-display text-base font-bold text-primary mb-1">{vp.name}</h5>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">
                    {vp.designation}
                  </p>
                  <span className="text-xs text-outline flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {vp.location}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SECRETARY GENERAL & TREASURER ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {/* SECRETARY GENERAL */}
            <div>
              <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-4 text-center">
                NATIONAL SECRETARY GENERAL
              </h4>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-4">
                  <img
                    src={term2020Data.secretaryGeneral.image}
                    alt={term2020Data.secretaryGeneral.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-display text-lg font-bold text-primary mb-1">
                  {term2020Data.secretaryGeneral.name}
                </h5>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {term2020Data.secretaryGeneral.designation}
                </p>
                <span className="text-xs text-outline flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {term2020Data.secretaryGeneral.location}
                </span>
              </motion.div>
            </div>

            {/* TREASURER */}
            <div>
              <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-4 text-center">
                NATIONAL TREASURER
              </h4>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-4">
                  <img
                    src={term2020Data.treasurer.image}
                    alt={term2020Data.treasurer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-display text-lg font-bold text-primary mb-1">
                  {term2020Data.treasurer.name}
                </h5>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {term2020Data.treasurer.designation}
                </p>
                <span className="text-xs text-outline flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {term2020Data.treasurer.location}
                </span>
              </motion.div>
            </div>
          </div>

          {/* NATIONAL SECRETARIES */}
          <div className="mb-14">
            <h4 className="font-display text-xs font-bold text-secondary tracking-widest uppercase mb-6 text-center">
              NATIONAL SECRETARIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {term2020Data.secretaries.map((sec, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-[#f8f9fb] rounded-2xl p-6 text-center border border-surface-variant shadow-sm"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-surface-variant mb-4">
                    <img src={sec.image} alt={sec.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="font-display text-base font-bold text-primary mb-1">{sec.name}</h5>
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">
                    {sec.designation}
                  </p>
                  <span className="text-xs text-outline flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {sec.location}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CENTRAL COMMITTEE (2020-23) DIRECTORY */}
          <Directory
            title="CENTRAL COMMITTEE (2020–2023)"
            subtitle="Searchable directory of Central Committee members (2020-23 term) with A-Z alphabet filter."
            data={term2020Data.centralCommittee}
            showAlphabetFilter={true}
            designationOptions={["Central Committee Member"]}
          />
        </div>
      </div>
    </section>
  );
};
