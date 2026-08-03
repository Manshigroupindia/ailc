import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Calendar,
  MapPin,
  UserCheck,
  Share2,
  Copy,
  Check,
  Quote,
  Phone,
  Mail,
  Scale,
  Landmark,
  ShieldCheck,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export const KeyNoteAddress = () => {
  const { openModal } = useModal();
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Key Note Address by Adv. Sharfuddin Ahmad at AILC Launching Session 2020");

    let shareUrl = '';
    if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'email') shareUrl = `mailto:?subject=AILC%20Key%20Note%20Address&body=${text}%20${url}`;

    if (shareUrl) window.open(shareUrl, '_blank');
  };

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
              backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000d25] via-[#000d25]/90 to-[#000d25]/75" />
        </div>

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#ffe08d] font-semibold">Key Note Address</span>
          </nav>

          <span className="inline-block px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-4">
            FOUNDING CONVENTION OATH & ADDRESS
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Key Note Address
          </h1>

          <p className="font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Launching Session • 8 February 2020
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-12">
        {/* =========================================================
            2. EVENT INFORMATION CARD
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-surface-variant"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-surface-variant">
            <div className="w-10 h-10 rounded-xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-widest block">
                OFFICIAL RECORD
              </span>
              <h3 className="font-display font-bold text-lg text-primary">
                AILC Launching Session Convention
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-outline block font-medium">DATE</span>
                <span className="font-bold text-primary">8 February 2020</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-outline block font-medium">VENUE</span>
                <span className="font-bold text-primary">India International Centre, New Delhi</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-outline block font-medium">SPEAKER</span>
                <span className="font-bold text-primary">Adv. Sharfuddin Ahmad</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            3. KEY NOTE ADDRESS (Main Complete Speech Content)
           ========================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 sm:p-14 rounded-3xl shadow-xl border border-surface-variant leading-relaxed text-on-surface space-y-8"
        >
          {/* Section 1: Opening & Purpose */}
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-surface-container-low text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-surface-variant mb-2">
              I. Inaugural Declaration & Collective Action
            </div>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              Respected delegates, legal luminaries, Senior Advocates, and fellow members of the legal fraternity assembled here at the India International Centre, New Delhi on this historic day of 8th February 2020.
            </p>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              We have convened this national convention to respond to an urgent, undeniable imperative facing the legal profession and democratic institutions across our country. The All India Lawyers Council (AILC) is being formally constituted today as an autonomous, self-help, non-political pan-India organization of practising lawyers.
            </p>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Our presence here—representing over fifteen states of the Indian Republic—signifies our shared resolve that advocates must not remain passive bystanders when constitutional values, human dignity, procedural justice, and the rule of law are challenged.
            </p>
          </div>

          {/* Section 2: Defending Victims & Pre-Trial Legal Aid */}
          <div className="space-y-4 pt-6 border-t border-surface-variant">
            <div className="inline-block px-3 py-1 bg-surface-container-low text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-surface-variant mb-2">
              II. Defense of Victims & Pre-Trial Legal Defense
            </div>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              The primary mandate of the All India Lawyers Council is to facilitate effective legal aid at all levels in defense of victimized, oppressed, and falsely accused citizens beginning right from the investigation stage.
            </p>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Too often in our judicial process, the critical window between initial police investigation and formal chargesheet determines the fate of innocent citizens. By establishing a nationwide network of defense counsel, AILC aims to ensure that no citizen is deprived of competent legal representation during interrogation, arrest, and remand proceedings.
            </p>

            {/* Callout Quote */}
            <div className="bg-[#000d25] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg my-6">
              <Quote className="w-8 h-8 text-[#ffe08d] mb-2 opacity-80" />
              <p className="font-display text-lg sm:text-xl font-bold text-[#ffe08d] italic leading-snug">
                "Legal representation is not a post-conviction privilege; it is a fundamental pre-trial right guaranteed under Article 22 of the Constitution of India."
              </p>
            </div>
          </div>

          {/* Section 3: Countering Hate Speech & False Prosecution */}
          <div className="space-y-4 pt-6 border-t border-surface-variant">
            <div className="inline-block px-3 py-1 bg-surface-container-low text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-surface-variant mb-2">
              III. Countering Hate Speech & Redressal for False Prosecution
            </div>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Secondly, AILC is committed to providing legal aid in prosecution against individuals or organizations making hateful, provocative, or violent statements, publications, or broadcasts that threaten social harmony and public peace.
            </p>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Furthermore, we shall render systemic legal assistance to persons who become victims of false prosecution, assisting them not only in securing acquittal or discharge, but also in actively seeking judicial compensation and accountability for malicious prosecution.
            </p>
          </div>

          {/* Section 4: Bar-Bench Relations & Advocate Welfare */}
          <div className="space-y-4 pt-6 border-t border-surface-variant">
            <div className="inline-block px-3 py-1 bg-surface-container-low text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-surface-variant mb-2">
              IV. Bar & Bench Relations, Legislative Advocacy & Advocate Protection
            </div>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Our vision encompasses suggesting and drafting progressive legislation that reinforces democratic values, social democracy, and constitutional guarantees.
            </p>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Equally vital is the internal discipline, empowerment, and welfare of the legal fraternity. We resolve to foster healthy, transparent relations between the Bar and the Bench while resolutely defending lawyers against harassment, physical threats, and institutional overreach.
            </p>
          </div>
        </motion.article>

        {/* =========================================================
            4. SPEAKER INFORMATION (Clean Card - No Photo)
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-surface-variant"
        >
          <span className="text-secondary font-semibold text-xs uppercase tracking-widest block mb-4">
            SPEAKER INFORMATION
          </span>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#000d25] text-[#ffe08d] flex items-center justify-center font-display font-bold text-xl flex-shrink-0 shadow-md">
                SA
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-primary">
                  Adv. Sharfuddin Ahmad
                </h3>
                <p className="text-xs text-secondary font-semibold">
                  Senior Practicing Advocate • Allahabad High Court
                </p>
                <p className="text-xs text-outline mt-0.5">
                  General Secretary / Founding Delegate, AILC
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs border-t sm:border-t-0 sm:border-l border-surface-variant pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium">8935033183</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium">Sharfuddinahmad786@gmail.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            5. SHARE SECTION
           ========================================================= */}
        <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm mb-4">
            <Share2 className="w-4 h-4" /> Share this Keynote Address
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 bg-white border border-surface-variant hover:bg-surface-container rounded-xl text-xs font-semibold text-primary transition-all inline-flex items-center gap-2 shadow-sm"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Copied Link!' : 'Copy Link'}
            </button>

            <button
              onClick={() => handleShare('whatsapp')}
              className="px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              WhatsApp
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="px-4 py-2.5 bg-[#1877F2] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              Facebook
            </button>

            <button
              onClick={() => handleShare('linkedin')}
              className="px-4 py-2.5 bg-[#0A66C2] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              LinkedIn
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="px-4 py-2.5 bg-[#000000] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              X (Twitter)
            </button>

            <button
              onClick={() => handleShare('email')}
              className="px-4 py-2.5 bg-gray-700 text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              Email
            </button>
          </div>
        </div>

        {/* =========================================================
            6. CALL TO ACTION
           ========================================================= */}
        <div className="bg-[#000d25] text-white p-10 sm:p-14 rounded-3xl shadow-2xl border border-white/10 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <span className="text-[#ffe08d] font-semibold text-xs uppercase tracking-widest block">
              DISCOVER AILC CHARTER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Explore AILC
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
              Join thousands of practicing lawyers across India in upholding the rule of law, protecting advocate welfare, and guaranteeing constitutional justice.
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

export default KeyNoteAddress;
