import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Download,
  Maximize2,
  ExternalLink,
  Share2,
  Printer,
  FileText,
  Globe,
  CheckCircle2,
  Smartphone,
  Sparkles,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  Check
} from 'lucide-react';

export const AILCBooklet = () => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const viewerRef = useRef(null);

  const googleDrivePreviewUrl = "https://drive.google.com/file/d/1eRLscnqrRDs0NvAFKywmf3FeHmOaR4GM/preview";
  const googleDriveViewUrl = "https://drive.google.com/file/d/1eRLscnqrRDs0NvAFKywmf3FeHmOaR4GM/view";
  const googleDriveDownloadUrl = "https://drive.google.com/uc?export=download&id=1eRLscnqrRDs0NvAFKywmf3FeHmOaR4GM";

  useEffect(() => {
    document.title = "AILC Official Booklet | Manshi Group India";
  }, []);

  const scrollToViewer = () => {
    viewerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFullscreen = () => {
    if (viewerRef.current) {
      if (!document.fullscreenElement) {
        viewerRef.current.requestFullscreen?.().catch((err) => {
          console.warn('Fullscreen error:', err);
        });
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'AILC Official Booklet',
      text: 'Explore the official All India Lawyers Council (AILC) booklet online.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        console.warn('Clipboard write failed:', e);
      }
    }
  };

  const handlePrint = () => {
    window.open(googleDriveViewUrl, '_blank');
  };

  const bookletInfo = [
    { label: 'Booklet Name', value: 'AILC Official Booklet', icon: BookOpen },
    { label: 'Format', value: 'PDF Document', icon: FileText },
    { label: 'Language', value: 'English', icon: Globe },
    { label: 'Availability', value: 'Online & Download', icon: CheckCircle2 },
    { label: 'Accessibility', value: 'Mobile Friendly', icon: Smartphone },
  ];

  const features = [
    {
      title: 'Official Information',
      desc: 'Complete authentic records, bar council guidelines, and organizational objectives of AILC.',
      icon: CheckCircle2,
    },
    {
      title: 'Easy Online Reading',
      desc: 'Embedded responsive PDF reader supporting zoom, page navigation, and crisp typography.',
      icon: BookOpen,
    },
    {
      title: 'Mobile Friendly',
      desc: 'Optimized touch navigation and layout for flawless viewing across smartphones and tablets.',
      icon: Smartphone,
    },
    {
      title: 'Instant Download',
      desc: 'Direct high-speed PDF download to save a copy offline on your personal device.',
      icon: Download,
    },
    {
      title: 'Updated Resource',
      desc: 'The latest verified booklet release featuring central secretariat resolutions and state chapters.',
      icon: Sparkles,
    },
    {
      title: 'Professional Documentation',
      desc: 'Curated by senior legal counsels, legal scholars, and executive bar council leaders.',
      icon: FileText,
    },
  ];

  const faqs = [
    {
      q: 'How can I download the booklet?',
      a: 'You can click the "Download PDF" button located in the Hero section or above/below the PDF viewer. The file will download directly to your device.',
    },
    {
      q: 'Can I read it on mobile?',
      a: 'Yes, the embedded PDF viewer and website page are 100% responsive. You can read, zoom, and scroll smoothly on iOS and Android devices.',
    },
    {
      q: 'Is registration required to view the booklet?',
      a: 'No registration or login is required. The AILC booklet is publicly available for all advocates, legal scholars, and citizens.',
    },
    {
      q: 'Can I share this booklet with colleagues?',
      a: 'Yes! You can use the "Share" button above the viewer or copy the website link to share it via WhatsApp, Email, or Social Media.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-body text-on-surface">
      {/* HERO SECTION */}
      <section className="bg-[#000d25] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffe08d]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl space-y-6">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-2">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">AILC Booklet</span>
          </nav>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-xs font-semibold text-[#ffe08d] tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#ffe08d]" />
            OFFICIAL PUBLICATION ARCHIVE
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            AILC Official Booklet
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Explore the official AILC booklet online. Read important information, initiatives, objectives and other official details directly from your browser.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={scrollToViewer}
              className="bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-yellow-500/20 active:scale-95 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              READ ONLINE
            </button>
            <a
              href={googleDriveDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#ffe08d]" />
              DOWNLOAD PDF
            </a>
          </div>
        </div>
      </section>

      {/* BOOKLET METADATA INFO CARDS */}
      <section className="py-12 bg-white border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {bookletInfo.map((info, idx) => {
              const IconComp = info.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#f8f9fb] border border-surface-variant flex items-center gap-3.5 hover:border-[#000d25]/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">
                      {info.label}
                    </span>
                    <strong className="font-display text-sm font-bold text-primary block leading-snug">
                      {info.value}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACTION BAR & PDF VIEWER CONTAINER */}
      <section ref={viewerRef} className="py-16 md:py-24 max-w-container-max mx-auto px-4 md:px-margin-desktop space-y-6">
        {/* Action Controls Bar Top */}
        <div className="bg-[#000d25] text-white p-4 sm:p-5 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffe08d] text-[#000d25] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-white">
                AILC Official Document Reader
              </h3>
              <span className="text-[11px] text-white/60">Interactive Google Drive PDF Stream</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFullscreen}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10"
              title="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#ffe08d]" />
              <span className="hidden sm:inline">Read Fullscreen</span>
            </button>
            <a
              href={googleDriveDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#ffe08d] text-[#000d25] hover:bg-[#ebd07b] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <a
              href={googleDriveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10"
              title="Open in Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#ffe08d]" />
              <span className="hidden md:inline">Open in New Tab</span>
            </a>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10"
              title="Share Booklet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-[#ffe08d]" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all border border-white/10"
              title="Print PDF"
            >
              <Printer className="w-4 h-4 text-[#ffe08d]" />
            </button>
          </div>
        </div>

        {/* PDF IFRAME VIEWER CARD */}
        <div className="relative w-full rounded-3xl bg-white shadow-2xl border border-surface-variant overflow-hidden min-h-[600px] lg:min-h-[900px]">
          {iframeLoading && (
            <div className="absolute inset-0 z-10 bg-surface-container-low flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#000d25] text-[#ffe08d] flex items-center justify-center animate-bounce">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-display text-lg font-bold text-primary">Loading AILC Booklet...</h4>
                <p className="text-xs text-on-surface-variant max-w-sm">
                  Establishing secure document stream with Google Drive Servers.
                </p>
              </div>
            </div>
          )}

          {iframeError ? (
            <div className="p-12 text-center space-y-6 max-w-md mx-auto my-16">
              <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-primary">Unable to Stream Viewer</h4>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                  The embedded Google Drive viewer didn't load in your browser settings. You can download the booklet directly or view it on Google Drive.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <a
                  href={googleDriveDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#000d25] text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4 text-[#ffe08d]" />
                  Download PDF
                </a>
                <button
                  onClick={() => {
                    setIframeError(false);
                    setIframeLoading(true);
                  }}
                  className="bg-surface-container text-primary font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 border border-surface-variant"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={googleDrivePreviewUrl}
              title="AILC Official Booklet PDF Viewer"
              className="w-full h-[600px] sm:h-[750px] lg:h-[900px] border-0 rounded-3xl"
              onLoad={() => setIframeLoading(false)}
              onError={() => {
                setIframeLoading(false);
                setIframeError(true);
              }}
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
            />
          )}
        </div>
      </section>

      {/* WHY READ THE AILC BOOKLET - FEATURES SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase block">
              RESOURCE HIGHLIGHTS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Why Read the AILC Booklet?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Essential reading for practicing advocates, bar council representatives, legal scholars, and citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-8 rounded-3xl bg-[#f8f9fb] border border-surface-variant hover:border-[#000d25]/30 hover:shadow-lg transition-all space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary">
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

      {/* FAQ ACCORDION SECTION */}
      <section className="py-16 md:py-24 max-w-container-max mx-auto px-4 md:px-margin-desktop space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-secondary tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-surface-variant overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left font-display font-bold text-base sm:text-lg text-primary flex items-center justify-between gap-4 hover:text-secondary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-outline flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-secondary' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-variant/50 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AILCBooklet;
