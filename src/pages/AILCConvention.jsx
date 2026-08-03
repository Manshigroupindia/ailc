import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Scale,
  Download,
  Maximize2,
  FileText,
  Users,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { useCmsData } from '@/context/CmsContext';

export const AILCConvention = () => {
  const { convention } = useCmsData();
  const viewerRef = useRef(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Dynamic CMS fields with fallback defaults
  const pageTitle = convention?.pageTitle || "AILC Convention";
  const subtitle = convention?.subtitle || "Official Convention Documents, Constitution & Organizational Guidelines of All India Practising Lawyers Council.";
  const introductionTitle = convention?.introductionTitle || "About the Convention";
  const introductionText1 = convention?.introductionText1 || "The AILC Convention serves as the constitutional and organizational framework of the All India Practising Lawyers Council. It contains the objectives, structure, membership guidelines, rules, powers of committees, constitutional provisions and operational framework of the organization.";
  const introductionText2 = convention?.introductionText2 || "The Convention document represents the guiding principles of AILC and acts as the official reference for all members across India.";
  const pdfUrl = convention?.pdfUrl || "https://drive.google.com/file/d/1eRLscnqrRDs0NvAFKywmf3FeHmOaR4GM/preview";
  const downloadUrl = convention?.downloadUrl || "https://drive.google.com/uc?export=download&id=1eRLscnqrRDs0NvAFKywmf3FeHmOaR4GM";
  const seoTitle = convention?.seoTitle || "AILC Convention | All India Practising Lawyers Council";
  const seoDescription = convention?.seoDescription || "Read and download the official AILC Convention document of the All India Practising Lawyers Council.";

  useEffect(() => {
    document.title = seoTitle;
  }, [seoTitle]);

  const scrollToViewer = () => {
    viewerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFullscreen = () => {
    if (viewerRef.current) {
      if (!document.fullscreenElement) {
        viewerRef.current.requestFullscreen?.().catch((e) => console.warn(e));
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  const featureCards = convention?.featureCards || [
    {
      title: "Official Constitution",
      description: "Contains the constitutional framework and legal foundation of AILC.",
      icon: Scale,
    },
    {
      title: "Membership Guidelines",
      description: "Explains member rights, responsibilities and eligibility criteria.",
      icon: Users,
    },
    {
      title: "Committee Structure",
      description: "Provides detailed information regarding organizational hierarchy and committees.",
      icon: Building2,
    },
    {
      title: "Rules & Regulations",
      description: "Defines the operational procedures and governing principles of the Council.",
      icon: ShieldCheck,
    },
  ];

  const highlights = [
    "Official Constitutional Document",
    "Organizational Structure",
    "Membership Framework",
    "Rules & Regulations",
    "National Level Organization",
    "Approved Governing Principles",
  ];

  const relatedPages = [
    {
      title: "Rules & Regulations",
      path: "/rules-regulation",
      desc: "Governance procedures, membership bylaws, and council codes.",
      icon: ShieldCheck,
    },
    {
      title: "Launching Session",
      path: "/about/launching-session",
      desc: "Inaugural assembly held at India International Centre, New Delhi.",
      icon: Calendar,
    },
    {
      title: "National Conference 2023",
      path: "/national-conference-2023",
      desc: "National assembly presided over by Hon'ble Justice Abhay M. Thipsay.",
      icon: Layers,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-body text-on-surface">
      {/* HERO BANNER SECTION */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        {/* Animated Particles & Glow Effects */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-[#ffe08d]/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop relative z-10 text-center space-y-6">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">AILC Convention</span>
          </nav>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-xs font-semibold text-[#ffe08d] tracking-widest uppercase"
          >
            <Scale className="w-4 h-4 text-[#ffe08d]" />
            CONSTITUTIONAL CHARTER & GOVERNANCE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            {pageTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={scrollToViewer}
              className="bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-yellow-500/20 active:scale-95 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              VIEW CONVENTION
            </button>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#ffe08d]" />
              DOWNLOAD PDF
            </a>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="py-16 md:py-20 bg-white border-b border-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#f8f9fb] p-8 sm:p-12 rounded-3xl border border-surface-variant shadow-sm space-y-6 max-w-4xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center mx-auto shadow-md">
              <Scale className="w-7 h-7" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              {introductionTitle}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed font-body">
              <p>{introductionText1}</p>
              <p>{introductionText2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF PREVIEW SECTION */}
      <section ref={viewerRef} className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-margin-desktop space-y-6">
        {/* PDF Header & Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#000d25] text-white p-6 rounded-3xl shadow-xl border border-white/10">
          <div>
            <span className="text-[10px] font-bold text-[#ffe08d] uppercase tracking-widest block mb-1">
              OFFICIAL EMBEDDED VIEWER
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              AILC Convention Document
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Read the official convention document directly from the website or download a copy for offline reference.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFullscreen}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-2 border border-white/10"
            >
              <Maximize2 className="w-4 h-4 text-[#ffe08d]" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Embedded Iframe PDF Container */}
        <div className="relative w-full rounded-xl bg-white shadow-2xl border border-surface-variant overflow-hidden">
          {iframeLoading && (
            <div className="absolute inset-0 z-10 bg-surface-container-low flex flex-col items-center justify-center p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#000d25] text-[#ffe08d] flex items-center justify-center animate-bounce">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-primary">Loading AILC Convention Document...</p>
            </div>
          )}

          <iframe
            src={pdfUrl}
            title="AILC Convention Document PDF Viewer"
            className="w-full h-[500px] sm:h-[600px] md:h-[900px] border-0 rounded-xl"
            onLoad={() => setIframeLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
          />
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-b border-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase block">
              KEY PILLARS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
              Convention Framework & Governance
            </h2>
            <p className="text-sm text-on-surface-variant">
              The four foundational pillars defined inside the official AILC Convention charter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, idx) => {
              const IconComp = card.icon || Scale;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-[#f8f9fb] border border-surface-variant hover:border-[#000d25]/30 hover:shadow-lg transition-all space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-primary">
                    {card.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK INFORMATION HIGHLIGHTS BOX */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 sm:p-12 rounded-3xl border border-surface-variant shadow-md space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-primary">
                Convention Highlights
              </h3>
              <p className="text-xs text-on-surface-variant">Core objectives ratified across all 28 state chapters.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#f8f9fb] border border-surface-variant flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-xs font-semibold text-primary">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#000d25] text-white p-8 sm:p-14 rounded-3xl shadow-2xl border border-white/10 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#ffe08d] text-[#000d25] flex items-center justify-center mx-auto shadow-lg">
            <Download className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
              Need an Offline Copy?
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto leading-relaxed">
              Download the official AILC Convention PDF for reference and future use.
            </p>
          </div>

          <div>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] font-bold px-8 py-4 rounded-full text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download Official PDF
            </a>
          </div>
        </motion.div>
      </section>

      {/* RELATED PAGES */}
      <section className="py-16 md:py-24 bg-white border-t border-surface-variant">
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase block">
              EXPLORE MORE
            </span>
            <h3 className="font-display text-3xl font-bold text-primary">
              Related Documents & Conventions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPages.map((page, idx) => {
              const IconComp = page.icon;
              return (
                <Link
                  key={idx}
                  to={page.path}
                  className="p-6 sm:p-8 rounded-3xl bg-[#f8f9fb] border border-surface-variant hover:border-[#000d25]/40 hover:shadow-lg transition-all space-y-4 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-display text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {page.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {page.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-surface-variant flex items-center text-xs font-bold text-secondary group-hover:translate-x-1 transition-transform">
                    <span>View</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AILCConvention;
