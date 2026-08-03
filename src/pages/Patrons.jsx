import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Award } from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const Patrons = () => {
  const { patrons: cmsPatrons, seo } = useCmsData();

  useEffect(() => {
    document.title = seo?.siteTitle || 'Patrons | All India Lawyers Council';
  }, [seo]);

  const defaultPatronsList = [
    {
      id: 'patron-1',
      name: 'HON’BLE JUSTICE MR AK GANGULY',
      designation: 'FORMER JUDGE, SUPREME COURT OF INDIA',
      photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755130/Untitled-design-52_fn4tmu.png',
    },
    {
      id: 'patron-2',
      name: 'Sharfuddin Ahmad Jangpura',
      designation: 'SECRETARY GENERAL / PATRON',
      photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755135/Untitled-design-57_lob7vb.png',
    },
    {
      id: 'patron-3',
      name: 'DR PA INAMDAR',
      designation: 'CHANCELLOR, DR PA INAMDAAR UNIVERSITY, PUNE',
      photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755126/Untitled-design-54_pfnegf.png',
    },
    {
      id: 'patron-4',
      name: 'MOHAMMAD WAZIR ANSARI',
      designation: 'FORMER DGP, CHATTISGARH',
      photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755079/Untitled-design-53-1_sp9cnt.png',
    },
    {
      id: 'patron-5',
      name: 'SM MUSHRIF',
      designation: 'EX IGP MAHARASHTRA, PUNE',
      photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755128/Untitled-design-55_t7jke4.png',
    },
    {
      id: 'patron-6',
      name: 'KAMAL FAROQUI',
      designation: 'FORMER CHAIRMAN DELHI MINORITIES COMMISSION',
      photoUrl: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755129/Untitled-design-56_dh5hyn.png',
    },
  ];

  // Prioritize defaultPatronsList for the exact requested 6 profiles
  const patronsList = defaultPatronsList;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* HERO SECTION */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Patrons</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            HONORARY ADVISORY BOARD
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Patrons
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            The Patrons of the All India Lawyers Council are distinguished personalities from the judiciary, law enforcement, academia, public administration, and public life who guide the organization through their experience, wisdom, and commitment to justice and constitutional values.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 space-y-16">
        {/* INTRODUCTION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant space-y-6 font-body"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-surface-variant">
            <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                CONSTITUTIONAL PROVISIONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Patrons Framework & Roles
              </h2>
            </div>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-variant space-y-2">
              <p className="text-primary font-medium">
                <strong className="text-secondary font-bold mr-1">(i)</strong>
                Patrons may be nominated permanently by the Central Committee of the Council exploring and seeking the overall promotion from respected personalities who have earned recognition in their respective fields, on the recommendation of the Secretary General of the Council.
              </p>
            </div>

            <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-variant space-y-2">
              <p className="text-primary font-medium">
                <strong className="text-secondary font-bold mr-1">(ii)</strong>
                Patrons shall be selected from among former judges, retired police officers, bureaucrats, renowned intellectuals, social activists, and political leaders. They may be invited to guide the Council, advise on important national issues, supervise organizational activities, assist in elections, and participate in delegations or commissions constituted by the Council. Meetings of Patrons may be convened by the Central Secretariat whenever required. Their recommendations shall be placed before the Central Committee for consideration and implementation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* OUR PATRONS GRID */}
        <div className="space-y-8 font-body">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-label-lg text-secondary tracking-widest uppercase block font-semibold text-xs">
              DISTINGUISHED GUIDANCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Our Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {patronsList.map((patron, index) => (
              <motion.div
                key={patron.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-3xl border border-surface-variant shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-5 group"
              >
                {/* Large Circular Portrait */}
                <div className="relative w-36 h-36 rounded-full p-1.5 bg-gradient-to-tr from-[#000d25] via-[#002256] to-[#ffe08d] shadow-md">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border-2 border-white">
                    <img
                      src={patron.photoUrl || patron.imageUrl || patron.image}
                      alt={patron.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Name & Designation */}
                <div className="space-y-2 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#000d25] group-hover:text-secondary transition-colors">
                      {patron.name}
                    </h3>
                  </div>

                  <div className="w-12 h-0.5 bg-[#ffe08d] mx-auto my-3 group-hover:w-20 transition-all duration-300" />

                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-on-surface-variant leading-relaxed uppercase tracking-wide">
                      {patron.designation || patron.role}
                    </p>
                    {patron.description && (
                      <p className="text-xs text-outline mt-2 leading-relaxed font-normal">
                        {patron.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patrons;
