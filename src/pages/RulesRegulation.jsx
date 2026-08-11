import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Search,
  BookOpen,
  Scale,
  ShieldCheck,
  Award,
  Users,
  Building2,
  DollarSign,
  Briefcase,
  Vote,
  AlertTriangle,
  FileText,
  ChevronDown,
  Download,
  Printer,
  Share2,
  Check,
  Copy,
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export const RulesRegulation = () => {
  const { openModal } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Track scroll progress for reading indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            SUBMIT APPLICATION
          </button>
        </div>
      ),
    });
  };

  const introCards = [
    { key: 'A', title: 'Name of the Council', desc: 'Registered in 2020 as "All India Practising Lawyers Council" (AILC) in Delhi.', sectionId: 'central-council' },
    { key: 'B', title: 'Membership Defined', desc: 'Open to advocates enrolled under the Advocates Act, 1961 with State Bar Councils.', sectionId: 'register-members' },
    { key: 'C', title: 'Admission & Qualification', desc: 'Formal application accompanied by Bar Council enrollment credentials.', sectionId: 'register-members' },
    { key: 'D', title: 'Membership Subscription', desc: 'Annual membership subscription and statutory administrative contributions.', sectionId: 'source-income' },
    { key: 'E', title: 'Appeal & Re-admission', desc: 'Appellate jurisdiction vested in the Central Governing Committee.', sectionId: 'appeal' },
    { key: 'F', title: 'Rights & Privileges', desc: 'Voting rights, legal protection, welfare coverage, and convention participation.', sectionId: 'powers-duties' },
  ];

  const rulesData = [
    {
      id: 'central-council',
      number: '01',
      title: 'CENTRAL COUNCIL (GENERAL BODY)',
      icon: Users,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. The <strong>Central Council</strong> shall be the supreme governing body of the All India Lawyers Council (AILC), comprising all registered and verified members in good standing across all 28 State Chapters and Union Territories.
          </p>
          <p>
            2. The General Body shall assemble at least once every calendar year for the <strong>Annual National Convention</strong> to review financial audits, ratify constitutional amendments, and elect national office bearers.
          </p>
          <p>
            3. Special or Extraordinary meetings of the Central Council may be summoned by the National President or upon a written requisition signed by at least one-fifth of the total active membership.
          </p>
        </div>
      )
    },
    {
      id: 'central-committee',
      number: '02',
      title: 'CENTRAL COMMITTEE',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. The executive administration of the Council shall be vested in the <strong>Central Committee</strong>, consisting of elected National Office Bearers and State Convenors.
          </p>
          <p>
            2. The Central Committee shall meet at least once every quarter (4 times a year) to execute policy decisions, manage council assets, and supervise state bar chapter operations.
          </p>
          <p>
            3. The tenure of the Central Committee shall be <strong>three (3) years</strong> from the date of formal election and oath of office.
          </p>
        </div>
      )
    },
    {
      id: 'structure-council',
      number: '03',
      title: 'STRUCTURE OF THE COUNCIL',
      icon: Building2,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>The Council operates under a three-tier federal structure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>National Level:</strong> Central Council & Central Governing Executive Committee (New Delhi Headquarters).</li>
            <li><strong>State Level:</strong> State Chapters established across all 28 States and Union Territories.</li>
            <li><strong>District & Bar Level:</strong> District Units functioning within High Court Bar Associations and Subordinate Courts.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'powers-duties',
      number: '04',
      title: 'POWERS AND DUTIES OF OFFICE BEARERS',
      icon: Award,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-bold text-primary text-base">A. National President</h4>
            <p>Shall preside over all meetings of the Central Council and Central Committee, exercise casting vote in case of tie, and represent AILC before statutory authorities.</p>
          </div>
          <div className="space-y-3 pt-2 border-t border-surface-variant">
            <h4 className="font-bold text-primary text-base">B. General Secretary</h4>
            <p>Shall manage day-to-day administrative affairs, maintain meeting records, execute correspondence, and convene official conventions under the President’s guidance.</p>
          </div>
          <div className="space-y-3 pt-2 border-t border-surface-variant">
            <h4 className="font-bold text-primary text-base">C. National Treasurer</h4>
            <p>Shall maintain audited account books, receive membership subscriptions, operate council bank accounts jointly with General Secretary/President, and present financial reports.</p>
          </div>
        </div>
      )
    },
    {
      id: 'quorum-meetings',
      number: '05',
      title: 'QUORUM FOR THE MEETINGS',
      icon: Check,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. The quorum for the <strong>Central Council (General Body)</strong> meeting shall be <strong>one-third (1/3rd)</strong> of the total registered membership.
          </p>
          <p>
            2. The quorum for the <strong>Central Committee</strong> meeting shall be <strong>half (50%)</strong> of its total elected executive strength.
          </p>
          <p>
            3. If a meeting is adjourned for lack of quorum, the adjourned meeting shall be reconvened after 30 minutes, where no quorum requirement shall apply.
          </p>
        </div>
      )
    },
    {
      id: 'financial-year',
      number: '06',
      title: 'FINANCIAL YEAR',
      icon: CalendarIcon,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            The official Financial Year of the All India Lawyers Council shall commence on <strong>1st April</strong> of each calendar year and conclude on <strong>31st March</strong> of the succeeding year.
          </p>
        </div>
      )
    },
    {
      id: 'source-income',
      number: '07',
      title: 'SOURCE OF INCOME',
      icon: DollarSign,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>The funds and finances of the Council shall be derived from:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Voluntary advocate contributions and statutory organizational support.</li>
            <li>Voluntary donations from legal patrons and advocates.</li>
            <li>Publication revenues, convention delegate registrations, and legal awareness grants.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'register-members',
      number: '08',
      title: 'REGISTER OF MEMBERS',
      icon: BookOpen,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. The Secretariat shall maintain an updated <strong>National Register of Members</strong> containing the full name, Bar Council Enrollment Number, State Bar affiliation, address, and membership status of every advocate.
          </p>
          <p>
            2. Any advocate enrolled with a recognized State Bar Council under the Advocates Act, 1961 is eligible for registration.
          </p>
        </div>
      )
    },
    {
      id: 'bank-account',
      number: '09',
      title: 'BANK ACCOUNT',
      icon: Briefcase,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. All financial transactions of AILC shall be operated through a Scheduled Nationalized Bank account registered in the name of <strong>"All India Practising Lawyers Council"</strong>.
          </p>
          <p>
            2. Cheques and electronic fund transfers shall be operated jointly by the <strong>National Treasurer</strong> along with either the <strong>National President</strong> or <strong>General Secretary</strong>.
          </p>
        </div>
      )
    },
    {
      id: 'election',
      number: '10',
      title: 'ELECTION',
      icon: Vote,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. Elections for National Office Bearers shall be conducted every <strong>three (3) years</strong> by a secret ballot or consensus vote during the National Convention.
          </p>
          <p>
            2. An independent Chief Election Officer appointed by the Central Committee shall oversee nominations, voting, and declaration of election results.
          </p>
        </div>
      )
    },
    {
      id: 'discipline',
      number: '11',
      title: 'DISCIPLINE',
      icon: AlertTriangle,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            1. Any member found acting against constitutional principles, engaging in professional misconduct, or violating Council regulations shall be subject to disciplinary proceedings by the Disciplinary Committee.
          </p>
          <p>
            2. Sanctions may include formal reprimand, suspension, or termination of AILC membership after serving a 14-day show-cause notice.
          </p>
        </div>
      )
    },
    {
      id: 'resignation',
      number: '12',
      title: 'RESIGNATION',
      icon: FileText,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            Any member or office bearer may resign from their position by tendering a written resignation letter addressed to the General Secretary or National President, subject to formal acceptance by the Central Committee.
          </p>
        </div>
      )
    },
    {
      id: 'appeal',
      number: '13',
      title: 'APPEAL',
      icon: Scale,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            Any member aggrieved by a decision of the Disciplinary Committee or State Chapter may file an appeal before the <strong>Central Governing Committee</strong> within 30 days of the decision order. The ruling of the Central Governing Committee shall be final.
          </p>
        </div>
      )
    },
    {
      id: 'sbc-election',
      number: '14',
      title: 'SBC ELECTION',
      icon: Vote,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            AILC shall support and endorse qualified, ethical candidates contesting in <strong>State Bar Council (SBC) Elections</strong> to ensure advocate protection and judicial integrity across all states.
          </p>
        </div>
      )
    },
    {
      id: 'rules-amendments',
      number: '15',
      title: 'RULES & CONSTITUTIONAL AMENDMENTS',
      icon: BookOpen,
      content: (
        <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          <p>
            No addition, alteration, or amendment to these Rules & Regulations shall be made except by a <strong>two-thirds (2/3rd) majority vote</strong> of members present and voting at a convened meeting of the Central Council.
          </p>
        </div>
      )
    },
  ];

  // Filter rules based on search
  const filteredRules = rulesData.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.number.includes(searchQuery)
  );

  const toggleAccordion = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all = {};
    rulesData.forEach(r => { all[r.id] = true; });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpandedSections(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  function CalendarIcon(props) {
    return (
      <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] relative">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ffe08d] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* =========================================================
          1. HERO SECTION
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

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Rules & Regulations</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            STATUTORY CONSTITUTIONAL FRAMEWORK
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Rules & Regulations
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Official Constitution, Structure and Governance Framework of the All India Lawyers Council.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
        {/* =========================================================
            2. INTRODUCTION CARDS
           ========================================================= */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-label-lg text-secondary tracking-widest uppercase mb-2 block font-semibold text-xs">
              GOVERNANCE OVERVIEW
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Constitutional Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {introCards.map((card) => (
              <motion.div
                key={card.key}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-surface-variant shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#000d25] text-[#ffe08d] font-display font-bold text-xs flex items-center justify-center">
                      {card.key}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>

                <button
                  onClick={() => scrollToSection(card.sectionId)}
                  className="text-xs font-bold text-secondary hover:text-primary inline-flex items-center gap-1.5 pt-2 border-t border-surface-variant transition-colors"
                >
                  Read Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================================
            3. SEARCH BAR & CONTROLS
           ========================================================= */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rules, committees, elections..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-surface-variant rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary transition-all text-primary"
            />
          </div>

          {/* Expand / Collapse All Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-primary rounded-xl text-xs font-semibold border border-surface-variant inline-flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-primary rounded-xl text-xs font-semibold border border-surface-variant inline-flex items-center gap-1.5 transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" /> Collapse All
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Quick Nav Chips */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar">
          {rulesData.map((rule) => (
            <button
              key={rule.id}
              onClick={() => scrollToSection(rule.id)}
              className="px-3.5 py-2 bg-white rounded-xl text-xs font-semibold text-primary border border-surface-variant flex-shrink-0 hover:bg-surface-container transition-colors shadow-sm"
            >
              {rule.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* =========================================================
              4. STICKY QUICK NAVIGATION (Desktop Sidebar)
             ========================================================= */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white p-5 rounded-2xl shadow-sm border border-surface-variant space-y-2 max-h-[calc(100vh-140px)] overflow-y-auto">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-widest block mb-2 px-2">
                QUICK NAVIGATION
              </span>
              {rulesData.map((rule) => (
                <button
                  key={rule.id}
                  onClick={() => scrollToSection(rule.id)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{rule.title}</span>
                  <span className="text-[10px] text-outline ml-1">{rule.number}</span>
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================
              5 & 6. MAIN ACCORDION RULE SECTIONS
             ========================================================= */}
          <div className="lg:col-span-3 space-y-4">
            {filteredRules.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-surface-variant space-y-2">
                <BookOpen className="w-12 h-12 text-outline mx-auto mb-2" />
                <h4 className="font-display font-bold text-lg text-primary">No rules match your search</h4>
                <p className="text-xs text-outline">Try searching for keywords like "committee", "membership", or "election".</p>
              </div>
            ) : (
              filteredRules.map((rule) => {
                const isExpanded = !!expandedSections[rule.id];
                const IconComponent = rule.icon;
                return (
                  <motion.div
                    id={rule.id}
                    key={rule.id}
                    className="bg-white rounded-2xl border border-surface-variant shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleAccordion(rule.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] font-display font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0">
                          {rule.number}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-base sm:text-lg text-primary">
                            {rule.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-outline hidden sm:inline-block">
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-outline transition-transform ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 pt-2 border-t border-surface-variant bg-surface-container-low"
                        >
                          <div className="p-6 bg-white rounded-xl border border-surface-variant shadow-inner">
                            {rule.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* =========================================================
            9. DOWNLOAD & SHARE SECTION
           ========================================================= */}
        <div className="mt-16 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-surface-variant text-center max-w-4xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center mx-auto shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-primary">
              Official Rules & Regulations
            </h3>
            <p className="text-xs sm:text-sm text-outline mt-1">
              Download or print the complete statutory constitution document of AILC.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => alert("Downloading official AILC Rules & Regulations PDF...")}
              className="px-6 py-3 bg-[#000d25] text-white hover:bg-opacity-90 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>

            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-surface-container-low text-primary hover:bg-surface-container rounded-full text-xs font-semibold uppercase tracking-wider border border-surface-variant inline-flex items-center gap-2 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>

            <button
              onClick={handleCopyLink}
              className="px-6 py-3 bg-surface-container-low text-primary hover:bg-surface-container rounded-full text-xs font-semibold uppercase tracking-wider border border-surface-variant inline-flex items-center gap-2 transition-all active:scale-95"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copiedLink ? 'Copied Link' : 'Share'}
            </button>
          </div>
        </div>

        {/* =========================================================
            10. CALL TO ACTION
           ========================================================= */}
        <div className="mt-16 bg-[#000d25] text-white p-10 sm:p-14 rounded-3xl shadow-2xl border border-white/10 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block">
              ADVOCATE ENROLLMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Need Membership?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
              Enroll with the All India Lawyers Council to enjoy full voting rights, legal aid representation, and advocate welfare privileges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
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
    </div>
  );
};

export default RulesRegulation;
