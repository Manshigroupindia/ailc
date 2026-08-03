import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Flag,
  Scale,
  Award,
  ShieldCheck,
  CheckCircle2,
  Quote,
  ChevronDown,
  X,
  Gavel,
  Landmark,
  UserCheck
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export const LaunchingSession = () => {
  const { openModal } = useModal();
  const [activeTimelineStep, setActiveTimelineStep] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleMemberModal = () => {
    openModal({
      title: 'AILC Membership Application',
      content: (
        <div className="space-y-4">
          <p className="text-body-md text-on-surface-variant">
            Eligible for all practicing lawyers enrolled in any State Bar Council across India. Verification process takes 7-10 working days.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-primary">FULL NAME</label>
              <input
                type="text"
                placeholder="Adv. Ramesh Kumar"
                className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary text-on-surface text-base md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-primary">BAR COUNCIL ENROLLMENT NO.</label>
              <input
                type="text"
                placeholder="D/1234/2015"
                className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary text-on-surface text-base md:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-primary">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="ramesh@example.com"
                className="w-full border border-outline-variant rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary text-on-surface text-base md:text-sm"
              />
            </div>
          </div>
          <button className="w-full bg-[#000d25] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider mt-4">
            SUBMIT APPLICATION (₹1500/yr)
          </button>
        </div>
      ),
    });
  };

  const keyHighlights = [
    { label: 'Venue', value: 'India International Centre, New Delhi', icon: MapPin },
    { label: 'Date', value: '8 February 2020', icon: Calendar },
    { label: 'Participants', value: '100+ Advocates', icon: Users },
    { label: 'Representation', value: '15 Indian States', icon: Flag },
    { label: 'Formation', value: 'All India Lawyers Council', icon: Scale },
    { label: 'Outcome', value: 'Election of Central Committee', icon: Award },
  ];

  const visionPillars = [
    { title: 'Empowering Lawyers', desc: 'To strengthen the statutory role and institutional protection of practising lawyers.' },
    { title: 'Pre-Trial Legal Defense', desc: 'To assist victimised citizens beginning right from the initial investigation stage.' },
    { title: 'Timely Investigation', desc: 'To ensure transparent, unbiased, and swift police investigations.' },
    { title: 'Evidentiary Prosecution', desc: 'To strengthen criminal prosecution with credible, admissible legal evidence.' },
    { title: 'Nationwide Network', desc: 'To create a synchronized legal aid network spanning all High Courts and District Courts.' },
    { title: 'Access to Remote Justice', desc: 'To improve legal representation and judicial access in remote and rural regions.' },
    { title: 'Pro-Bono Aid', desc: 'To collectively provide legal defense for poor, vulnerable, and marginalized communities.' },
  ];

  const keySpeakers = [
    {
      name: 'Justice Ravindra Singh',
      designation: 'Senior Advocate, Supreme Court of India',
      court: 'Retired Judge, Allahabad High Court',
      icon: Scale,
    },
    {
      name: 'Mr. Sanjay Hegde',
      designation: 'Senior Advocate',
      court: 'Supreme Court of India',
      icon: Gavel,
    },
    {
      name: 'Adv. Sharfuddin Ahmad',
      designation: 'Senior Advocate',
      court: 'Allahabad High Court',
      icon: ShieldCheck,
    },
    {
      name: 'Adv. P.K. Ibrahim',
      designation: 'Practicing Legal Counsel',
      court: 'Kerala High Court',
      icon: Award,
    },
    {
      name: 'Mr. Mohammad Yahya',
      designation: 'State Legal Representative',
      court: 'Tamil Nadu',
      icon: Landmark,
    },
  ];

  const timelineSteps = [
    {
      step: '01',
      title: 'Convention Begins',
      summary: 'Inaugural assembly of over 100 practicing advocates at India International Centre, New Delhi.',
      details: 'Delegates from 15 states convened to discuss systemic challenges facing legal practice, advocate safety, and the defense of constitutional rights across India.',
    },
    {
      step: '02',
      title: 'Formation of AILC',
      summary: 'Unanimous resolution declaring the formal inception of the All India Lawyers Council.',
      details: 'The convention passed a historical resolution establishing AILC as an autonomous, self-help pan-India organization of lawyers dedicated to justice and the Rule of Law.',
    },
    {
      step: '03',
      title: 'Election of Central Committee',
      summary: 'Nomination and democratic election of the inaugural Central Governing Committee.',
      details: 'Representatives from across 15 states voted to elect the core leadership body responsible for founding charters and national representation.',
    },
    {
      step: '04',
      title: 'Discussion on Rule of Law',
      summary: 'Keynote lectures delivered by retired Supreme/High Court judges and Senior Advocates.',
      details: 'Eminent jurists addressed pre-trial rights, countering hate speech legally, and upholding judicial independence against legislative interference.',
    },
    {
      step: '05',
      title: 'National Legal Network Resolution',
      summary: 'Adoption of a nationwide legal defense network protocol.',
      details: 'Established state coordination desks ensuring seamless legal aid transition from magistrate courts to the Supreme Court of India.',
    },
    {
      step: '06',
      title: 'Delegation of Powers',
      summary: 'Assignment of state chapter responsibilities and executive authority.',
      details: 'Empowered state convenors to form district legal committees and supervise pro-bono aid units in their respective jurisdictions.',
    },
    {
      step: '07',
      title: 'Election of National Office Bearers',
      summary: 'Final ratification of President, General Secretary, and Vice Presidents for the 2020–23 Term.',
      details: 'The convention concluded with the formal oath of office taken by elected national office bearers before the assembly.',
    },
  ];

  const majorResolutions = [
    { title: 'Rule of Law', desc: 'Unwavering commitment to constitutional supremacy and procedural due process.' },
    { title: 'Protection of Democracy', desc: 'Defending parliamentary federalism, freedom of speech, and civil liberties.' },
    { title: 'Strengthening Investigation', desc: 'Demanding forensic accuracy and accountability in police investigation.' },
    { title: 'Legal Assistance', desc: 'Free pro-bono defense for victimized, falsely prosecuted, and poor litigants.' },
    { title: 'Empowering Lawyers', desc: 'Institutional protection, welfare schemes, and safety for practicing advocates.' },
    { title: 'National Network', desc: 'Seamless inter-state legal coordination for cross-border litigation.' },
    { title: 'Justice for Vulnerable Communities', desc: 'Targeted legal interventions for marginalized social groups across India.' },
  ];

  const galleryImages = [
    {
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755644/12_glji0y.jpg',
      caption: 'AILC Launching Session Assembly at IIC, New Delhi (8 Feb 2020)',
    },
    {
      url: 'https://res.cloudinary.com/kklzirk7/image/upload/v1785755644/13_k3r1y9.jpg',
      caption: 'Founding Convention Delegation & Keynote Assembly',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* =========================================================
          1. HERO SECTION
         ========================================================= */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-25"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/kklzirk7/image/upload/v1785755644/12_glji0y.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000d25] via-[#000d25]/90 to-[#000d25]/75" />
        </div>

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Launching Session</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            HISTORICAL FOUNDING CONVENTION
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Launching Session
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            The historic beginning of the All India Lawyers Council (AILC).
          </p>
        </div>
      </section>

      {/* =========================================================
          2. LAUNCHING SESSION OVERVIEW (Two-Column Layout)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-surface-variant group"
            >
              <img
                src="https://res.cloudinary.com/kklzirk7/image/upload/v1785755644/13_k3r1y9.jpg"
                alt="Launching Session India International Centre"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d25]/90 via-[#000d25]/30 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest mb-1">
                  INDIA INTERNATIONAL CENTRE • NEW DELHI
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Founding Convention Assembly
                </h3>
              </div>
            </motion.div>

            {/* Right Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="font-label-lg text-secondary tracking-widest uppercase block font-semibold text-xs">
                FOUNDING DECLARATION
              </span>

              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight mb-2">
                  Launching Session of AILC
                </h2>
                <p className="text-secondary font-bold text-sm tracking-wider uppercase">
                  New Delhi • 8 February 2020
                </p>
              </div>

              <div className="space-y-4 font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
                <p className="p-5 bg-surface-container-low rounded-2xl border border-surface-variant">
                  <strong className="text-primary font-bold">New Delhi, 8th February 2020:</strong> At the invitation of like-minded practising lawyers, a convention was called and the <strong className="text-primary font-bold">All India Lawyers Council (AILC)</strong> was formed during its launching programme held at the prestigious <span className="italic font-medium text-primary">India International Centre, New Delhi</span>.
                </p>

                <p className="p-5 bg-surface-container-low rounded-2xl border border-surface-variant">
                  Around <strong className="text-primary font-bold">one hundred advocates from fifteen states</strong> across India actively participated in this historic one-day convention.
                </p>

                <p className="p-5 bg-[#000d25] text-white rounded-2xl border border-white/10 shadow-lg">
                  The session resulted in the unanimous election of the inaugural <strong className="text-[#ffe08d]">Central Committee</strong> and the formulation of the Council's statutory aims, objectives, and charter of rights.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. KEY HIGHLIGHTS
         ========================================================= */}
      <section className="py-16 md:py-20 bg-[#f8f9fb]">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              EVENT AT A GLANCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Key Highlights
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {keyHighlights.map((hl, idx) => {
              const IconComp = hl.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl border border-surface-variant shadow-sm text-center flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-outline uppercase tracking-wider block mb-1">
                      {hl.label}
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-primary leading-tight">
                      {hl.value}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. VISION BEHIND THE LAUNCH
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              FOUNDATIONAL CHARTER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Vision Behind the Launch
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-3 leading-relaxed">
              Strategic objectives formulated during the inaugural assembly in New Delhi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionPillars.map((pil, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#f8f9fb] p-8 rounded-2xl border border-surface-variant shadow-sm hover:border-[#000d25]/40 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-display text-lg font-bold text-primary">
                  {pil.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {pil.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. KEY SPEAKERS (Clean Icon Cards without Photos)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-[#000d25] text-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block mb-2">
              CONVENTION PATRONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Key Speakers
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
              Eminent jurists and senior advocates who addressed the founding convention at IIC, New Delhi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {keySpeakers.map((spk, idx) => {
              const IconComponent = spk.icon || UserCheck;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4 hover:border-[#ffe08d]/50 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ffe08d] text-[#000d25] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">
                        {spk.name}
                      </h4>
                      <p className="text-xs text-[#ffe08d] font-semibold">
                        {spk.designation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <span className="font-medium">{spk.court}</span>
                    <span className="text-[#ffe08d] font-semibold text-[11px] uppercase tracking-wider">AILC 2020</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. CONFERENCE PROCEEDINGS (Interactive Timeline)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              SESSION CHRONOLOGY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Conference Proceedings
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-3 leading-relaxed">
              Step-by-step assembly proceedings recorded on 8th February 2020.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {timelineSteps.map((stp, idx) => {
              const isExpanded = activeTimelineStep === idx;
              return (
                <motion.div
                  key={idx}
                  className="bg-[#f8f9fb] border border-surface-variant rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setActiveTimelineStep(isExpanded ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] font-display font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {stp.step}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base sm:text-lg text-primary">
                          {stp.title}
                        </h4>
                        <p className="text-xs text-outline line-clamp-1">
                          {stp.summary}
                        </p>
                      </div>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-outline transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-variant/60"
                      >
                        <p className="p-4 bg-white rounded-xl border border-surface-variant">
                          {stp.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          7. MAJOR RESOLUTIONS
         ========================================================= */}
      <section className="py-16 md:py-24 bg-[#f8f9fb]">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              ASSEMBLY RATIFICATIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Major Resolutions Passed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorResolutions.map((res, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-surface-variant shadow-sm hover:border-[#000d25]/40 transition-all space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center font-bold text-xs mb-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-display text-base font-bold text-primary">
                  {res.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {res.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. PHOTO GALLERY (Masonry Grid & Lightbox)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              HISTORICAL ARCHIVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Photo Gallery
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-3 leading-relaxed">
              Photographic records from the Launching Program at India International Centre, New Delhi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(img)}
                className="rounded-3xl overflow-hidden border border-surface-variant shadow-md cursor-pointer relative group bg-[#000d25] h-72"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000d25] via-transparent to-transparent opacity-90 flex flex-col justify-end p-6">
                  <span className="text-xs text-white font-medium">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 bg-[#000d25]/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
              >
                <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#000d25] text-white flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.caption}
                    className="w-full max-h-[75vh] object-contain bg-black"
                  />
                  <div className="p-6 bg-[#000d25] text-white">
                    <p className="text-sm font-semibold">{selectedImage.caption}</p>
                    <p className="text-xs text-[#ffe08d] mt-1">AILC Launching Program • 8 Feb 2020</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================
          9. QUOTE SECTION
         ========================================================= */}
      <section className="py-16 md:py-20 bg-[#000d25] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Quote className="w-12 h-12 text-[#ffe08d]/30 mx-auto mb-4" />
          <blockquote className="font-display text-xl sm:text-2xl font-bold text-white italic mb-4 leading-relaxed">
            "The formation of AILC marked the beginning of a collective effort to strengthen justice, democracy and the legal fraternity across India."
          </blockquote>
          <cite className="text-xs text-[#ffe08d] font-semibold uppercase tracking-widest block not-italic">
            — AILC Launching Convention Declaration (8 Feb 2020)
          </cite>
        </div>
      </section>

      {/* =========================================================
          10. CALL TO ACTION
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#000d25] text-white p-10 sm:p-16 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block">
                BECOME A PART OF OUR HISTORY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
                Join the All India Lawyers Council
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
                Connect with thousands of practicing advocates across 28 states upholding constitutional values and statutory excellence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={handleMemberModal}
                  className="bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  BECOME A MEMBER
                </button>
                <Link
                  to="/leadership"
                  className="border border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  ORGANIZATION STRUCTURE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaunchingSession;
