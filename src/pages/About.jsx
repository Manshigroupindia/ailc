import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  Award,
  Users,
  FileText,
  Landmark,
  HeartHandshake,
  BookOpen,
  ChevronRight,
  Gavel,
  CheckCircle2,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export const About = () => {
  const { openModal } = useModal();

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

  const objectives = [
    {
      id: 'A',
      title: 'Defense of the Victimised & Oppressed',
      description: 'To facilitate legal help at all levels in defence of victimised and oppressed people of India beginning right from the investigation stage.',
      icon: ShieldCheck,
    },
    {
      id: 'B',
      title: 'Countering Hate & Provocative Speech',
      description: 'To provide legal aid in prosecution against persons or organisations making hateful, provocative or violent statements, publications or broadcasts.',
      icon: Gavel,
    },
    {
      id: 'C',
      title: 'Redressal for False Prosecution',
      description: 'To render legal help to persons who become victims of false prosecution and to assist them in seeking justice and compensation after acquittal or discharge.',
      icon: Scale,
    },
    {
      id: 'D',
      title: 'Constitutional & Legislative Advocacy',
      description: 'To suggest and prepare legislation supporting constitutional values, democratic principles and social democracy across India.',
      icon: Landmark,
    },
    {
      id: 'E',
      title: 'Legal Fraternity Empowerment & Bar-Bench Harmony',
      description: 'To strengthen discipline, professionalism and empowerment of the legal fraternity while promoting healthy relations between the Bar and the Bench.',
      icon: HeartHandshake,
    },
  ];

  const whyAilcFeatures = [
    {
      title: 'Pan India Organization',
      desc: 'Active state chapters across all 28 states and Union Territories in India.',
      icon: Building2,
    },
    {
      title: 'Pro-Bono Legal Aid',
      desc: 'Dedicated defense counsel network supporting underprivileged litigants.',
      icon: HeartHandshake,
    },
    {
      title: 'Justice for All',
      desc: 'Unwavering commitment to equality before law and constitutional remedies.',
      icon: Scale,
    },
    {
      title: 'Constitutional Values',
      desc: 'Safeguarding democratic principles, judicial independence, and civil rights.',
      icon: Landmark,
    },
    {
      title: 'Professional Excellence',
      desc: 'Continuous legal education, workshops, and skills enhancement for advocates.',
      icon: Award,
    },
    {
      title: 'Social Responsibility',
      desc: 'Empowering victimized communities through systemic legal advocacy.',
      icon: Users,
    },
  ];

  const stats = [
    { label: 'Established', value: '2020' },
    { label: 'Pan India Presence', value: '28+ States' },
    { label: 'National Leadership', value: '100+ Committee Members' },
    { label: 'Legal Initiatives', value: '500+ Cases' },
    { label: 'Growing Membership', value: '50,000+ Advocates' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* =========================================================
          1. HERO BANNER
         ========================================================= */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-25"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000d25] via-[#000d25]/90 to-[#000d25]/75" />
        </div>

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">About Us</span>
          </nav>

          <span className="inline-block px-3 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            ABOUT ALL INDIA LAWYERS COUNCIL
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            About Us
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            Learn about the vision, mission and journey of the All India Lawyers Council.
          </p>
        </div>
      </section>

      {/* =========================================================
          2. ABOUT AILC (Two-Column Layout)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-surface-variant group"
            >
              <img
                src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80&w=1200"
                alt="Supreme Court Pillars and Scales of Justice"
                className="w-full h-[420px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d25]/90 via-[#000d25]/30 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest mb-1">
                  ESTABLISHED 2020 • DELHI
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  Pan-India Legal Fraternity Organization
                </h3>
              </div>
            </motion.div>

            {/* Right Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="font-label-lg text-secondary tracking-widest uppercase block font-semibold text-xs">
                INSTITUTIONAL OVERVIEW
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight">
                About All India Lawyers Council
              </h2>

              <div className="space-y-4 text-on-surface-variant text-sm sm:text-base leading-relaxed">
                <div className="p-6 bg-surface-container-low rounded-2xl border border-surface-variant shadow-sm space-y-3">
                  <p>
                    <strong className="text-primary font-bold">AILC</strong> is an autonomous, self-help and <strong className="text-secondary font-semibold">Pan India Organisation of lawyers</strong>. It has been registered in the year <strong className="text-primary font-bold">2020</strong> as an NGO under the nomenclature of <span className="italic font-medium text-primary">"All India Practising Lawyers Council"</span> in Delhi.
                  </p>
                </div>

                <div className="p-6 bg-[#000d25] text-white rounded-2xl border border-white/10 shadow-lg space-y-3">
                  <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block">
                    DISTINGUISHED PATRONAGE
                  </span>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    The <strong className="text-white">retired Judges</strong>, <strong className="text-[#ffe08d]">former Bureaucrats</strong>, <strong className="text-white">ex Police Officers</strong>, <strong className="text-[#ffe08d]">prominent Intellectuals</strong>, <strong className="text-white">Academicians</strong> and noted <strong className="text-white">Social & Political Activists</strong> across India actively subscribe to and patronize the organization.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleMemberModal}
                  className="bg-[#000d25] text-white hover:bg-opacity-90 font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  BECOME A MEMBER <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/leadership"
                  className="border border-[#000d25] text-[#000d25] hover:bg-surface-container font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                >
                  VIEW LEADERSHIP
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR OBJECTIVES
         ========================================================= */}
      <section className="py-16 md:py-24 bg-[#f8f9fb]">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              STATUTORY FOUNDATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Our Objectives
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-3 leading-relaxed">
              Core charter commitments guiding the All India Lawyers Council across all judicial forums in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, index) => {
              const IconComp = obj.icon;
              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-surface-variant hover:border-[#000d25]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-display font-bold text-xs text-secondary">
                        {obj.id}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-primary mb-3 leading-snug">
                      {obj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. OUR VISION
         ========================================================= */}
      <section className="py-16 md:py-24 bg-[#000d25] text-white relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block">
                OUR VISION
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
                To Build a Resilient, Egalitarian & Constitutionally Empowered Legal Ecosystem
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-body">
                The All India Lawyers Council envisions a nation where legal aid is an uncompromised constitutional right, advocates practice without intimidation, and every citizen—regardless of socioeconomic standing—receives swift, fair, and impartial justice.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#ffe08d] mb-2" />
                  <h4 className="font-bold text-sm text-white mb-1">Judicial Independence</h4>
                  <p className="text-xs text-white/70">Safeguarding Bar & Bench integrity across all states.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#ffe08d] mb-2" />
                  <h4 className="font-bold text-sm text-white mb-1">Equal Justice Access</h4>
                  <p className="text-xs text-white/70">Pro-bono legal aid for victimized and oppressed citizens.</p>
                </div>
              </div>
            </motion.div>

            {/* Vision Illustration Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#ffe08d] text-[#000d25] flex items-center justify-center mb-6">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Constitutional Supremacy & Rule of Law
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic mb-6">
                "Justice in the Republic of India must remain accessible to the weakest citizen, protected by an independent Bar and an enlightened Judiciary."
              </p>
              <div className="border-t border-white/15 pt-4 text-xs text-[#ffe08d] font-semibold uppercase tracking-wider">
                AILC National Assembly Charter
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. OUR MISSION
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              ACTION PLAN
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-3 leading-relaxed">
              Structured operational missions implemented across district courts, High Courts, and the Supreme Court of India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#f8f9fb] p-8 rounded-2xl border border-surface-variant shadow-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Pre-Trial Defense</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Deploying immediate legal counsel at the investigation stage to protect citizens against arbitrary detention and procedural violations.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#f8f9fb] p-8 rounded-2xl border border-surface-variant shadow-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Legislative Research</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Formulating draft legislation and statutory amendments supporting secularism, democratic rights, and social justice.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#f8f9fb] p-8 rounded-2xl border border-surface-variant shadow-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Advocate Protection</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Providing comprehensive welfare, security, and institutional defense for practicing lawyers across all State Bar Councils.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. WHY AILC (Six Premium Feature Cards)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-[#f8f9fb]">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              ORGANIZATIONAL DISTINCTIVENESS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Why All India Lawyers Council
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-3 leading-relaxed">
              Key pillars that make AILC the premier institutional council for advocates in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAilcFeatures.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-[#000d25] flex items-center justify-center mb-5 font-bold">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          7. STATISTICS (Animated Counters)
         ========================================================= */}
      <section className="py-16 md:py-20 bg-[#000d25] text-white">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#ffe08d] mb-1">
                  {st.value}
                </h3>
                <p className="text-xs text-white/70 font-medium uppercase tracking-wider">
                  {st.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. CALL TO ACTION
         ========================================================= */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#000d25] text-white p-10 sm:p-16 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block">
                NATIONAL MEMBERSHIP DRIVE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
                Join the All India Lawyers Council
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
                Stand with over 50,000+ legal practitioners defending constitutional rights, judicial independence, and justice for all citizens across India.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={handleMemberModal}
                  className="bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  BECOME A MEMBER
                </button>
                <Link
                  to="/contact"
                  className="border border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
