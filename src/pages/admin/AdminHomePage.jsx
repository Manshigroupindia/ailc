import React, { useState, useEffect } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import {
  Home,
  ChevronDown,
  Save,
  CheckCircle2,
  Loader2,
  Upload,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  ImageIcon,
  Sparkles,
  Layers,
  HelpCircle,
  PhoneCall,
  Calendar,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';

export const AdminHomePage = () => {
  const { homePage, updateHomePageData } = useCmsData();

  const [formData, setFormData] = useState(homePage || {});
  const [openSection, setOpenSection] = useState('hero'); // 'hero', 'intro', 'org', 'legal', 'media', 'benefits', 'event', 'faq', 'contact'
  const [isUploading, setIsUploading] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (homePage) {
      setFormData(homePage);
    }
  }, [homePage]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const url = await uploadToCloudinary(file);
      handleChange(field, url);
      setSuccessMsg('Image uploaded to Cloudinary successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(`Cloudinary Upload Error: ${err.message}`);
    } finally {
      setIsUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleRemoveImage = (field) => {
    handleChange(field, '');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateHomePageData(formData);
      setSuccessMsg('Home Page changes saved live to Firestore!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSection = (sectionKey) => {
    setOpenSection(openSection === sectionKey ? null : sectionKey);
  };

  // Helper component for Image Management
  const ImageUploaderCard = ({ label, field, currentUrl }) => (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-white/80 block">{label}</label>
        {currentUrl && <span className="text-[10px] text-emerald-400 font-mono">Cloudinary Active</span>}
      </div>

      {currentUrl ? (
        <div className="relative w-full h-36 rounded-lg overflow-hidden border border-white/15 bg-black/40 group">
          <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <label className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold cursor-pointer">
              <span>Replace</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, field)}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => handleRemoveImage(field)}
              className="p-2 bg-red-500/30 hover:bg-red-500/50 text-red-300 rounded-lg text-xs font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <label className="w-full h-28 border-2 border-dashed border-white/20 hover:border-[#ffe08d]/60 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all bg-white/5">
          {isUploading[field] ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#ffe08d]" />
          ) : (
            <>
              <Upload className="w-5 h-5 text-white/60 mb-1" />
              <span className="text-xs font-semibold text-white/80">Upload to Cloudinary</span>
              <span className="text-[10px] text-white/40">PNG, JPG, WEBP</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, field)}
            className="hidden"
          />
        </label>
      )}
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-body pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <Home className="w-6 h-6 text-[#ffe08d]" />
            Home Page Editor
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Section-based Elementor CMS editor. Click any section below to update live text, cards, and Cloudinary images.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save All Sections Live</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 9 COLLAPSIBLE SECTION CARDS */}
      <div className="space-y-4">
        {/* ===================================================
            SECTION 1: HERO SECTION
           =================================================== */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <button
            onClick={() => toggleSection('hero')}
            className="w-full p-5 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#ffe08d]" />
              <span className="font-display font-bold text-sm text-white">1. Hero Section</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openSection === 'hero' ? 'rotate-180 text-[#ffe08d]' : ''}`} />
          </button>

          {openSection === 'hero' && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Main Heading</label>
                  <input
                    type="text"
                    value={formData.heroMainHeading || ''}
                    onChange={(e) => handleChange('heroMainHeading', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Highlight Text / Badge</label>
                  <input
                    type="text"
                    value={formData.heroHighlightText || ''}
                    onChange={(e) => handleChange('heroHighlightText', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Sub Heading</label>
                <input
                  type="text"
                  value={formData.heroSubHeading || ''}
                  onChange={(e) => handleChange('heroSubHeading', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Hero Description</label>
                <textarea
                  rows={3}
                  value={formData.heroDescription || ''}
                  onChange={(e) => handleChange('heroDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Primary Button Text</label>
                  <input
                    type="text"
                    value={formData.heroPrimaryBtnText || ''}
                    onChange={(e) => handleChange('heroPrimaryBtnText', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Primary Button Link</label>
                  <input
                    type="text"
                    value={formData.heroPrimaryBtnLink || ''}
                    onChange={(e) => handleChange('heroPrimaryBtnLink', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Secondary Button Text</label>
                  <input
                    type="text"
                    value={formData.heroSecondaryBtnText || ''}
                    onChange={(e) => handleChange('heroSecondaryBtnText', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Secondary Button Link</label>
                  <input
                    type="text"
                    value={formData.heroSecondaryBtnLink || ''}
                    onChange={(e) => handleChange('heroSecondaryBtnLink', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <ImageUploaderCard label="Hero Background Image" field="heroBgImage" currentUrl={formData.heroBgImage} />
                <ImageUploaderCard label="Hero Main Banner Image" field="heroMainImage" currentUrl={formData.heroMainImage} />
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            SECTION 2: INTRODUCTION
           =================================================== */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <button
            onClick={() => toggleSection('intro')}
            className="w-full p-5 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#ffe08d]" />
              <span className="font-display font-bold text-sm text-white">2. Introduction & About Brief</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openSection === 'intro' ? 'rotate-180 text-[#ffe08d]' : ''}`} />
          </button>

          {openSection === 'intro' && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Section Title</label>
                  <input
                    type="text"
                    value={formData.introTitle || ''}
                    onChange={(e) => handleChange('introTitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Section Subtitle</label>
                  <input
                    type="text"
                    value={formData.introSubtitle || ''}
                    onChange={(e) => handleChange('introSubtitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Full Description</label>
                <textarea
                  rows={4}
                  value={formData.introDescription || ''}
                  onChange={(e) => handleChange('introDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.introCtaText || ''}
                    onChange={(e) => handleChange('introCtaText', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">CTA Button Link</label>
                  <input
                    type="text"
                    value={formData.introCtaLink || ''}
                    onChange={(e) => handleChange('introCtaLink', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <ImageUploaderCard label="Introduction Section Image" field="introImage" currentUrl={formData.introImage} />
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            SECTION 3: ORGANIZATION STRUCTURE
           =================================================== */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <button
            onClick={() => toggleSection('org')}
            className="w-full p-5 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#ffe08d]" />
              <span className="font-display font-bold text-sm text-white">3. Organization Structure</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openSection === 'org' ? 'rotate-180 text-[#ffe08d]' : ''}`} />
          </button>

          {openSection === 'org' && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Structure Title</label>
                  <input
                    type="text"
                    value={formData.orgTitle || ''}
                    onChange={(e) => handleChange('orgTitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Subtitle</label>
                  <input
                    type="text"
                    value={formData.orgSubtitle || ''}
                    onChange={(e) => handleChange('orgSubtitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Structure Description</label>
                <textarea
                  rows={3}
                  value={formData.orgDescription || ''}
                  onChange={(e) => handleChange('orgDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>

              <ImageUploaderCard label="Organization Hierarchy Chart Image" field="orgChartImage" currentUrl={formData.orgChartImage} />
            </div>
          )}
        </div>

        {/* ===================================================
            SECTION 4: LEGAL ACTIVITIES
           =================================================== */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <button
            onClick={() => toggleSection('legal')}
            className="w-full p-5 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#ffe08d]" />
              <span className="font-display font-bold text-sm text-white">4. Legal Activities & Fact-Finding</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openSection === 'legal' ? 'rotate-180 text-[#ffe08d]' : ''}`} />
          </button>

          {openSection === 'legal' && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Section Title</label>
                <input
                  type="text"
                  value={formData.legalTitle || ''}
                  onChange={(e) => handleChange('legalTitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Section Description</label>
                <textarea
                  rows={2}
                  value={formData.legalDescription || ''}
                  onChange={(e) => handleChange('legalDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            SECTION 7: SAVE THE DATE
           =================================================== */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <button
            onClick={() => toggleSection('event')}
            className="w-full p-5 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#ffe08d]" />
              <span className="font-display font-bold text-sm text-white">7. Save the Date (Events Section)</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openSection === 'event' ? 'rotate-180 text-[#ffe08d]' : ''}`} />
          </button>

          {openSection === 'event' && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Event Title</label>
                  <input
                    type="text"
                    value={formData.eventTitle || ''}
                    onChange={(e) => handleChange('eventTitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Event Subtitle / Badge</label>
                  <input
                    type="text"
                    value={formData.eventSubtitle || ''}
                    onChange={(e) => handleChange('eventSubtitle', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Event Description</label>
                <textarea
                  rows={2}
                  value={formData.eventDescription || ''}
                  onChange={(e) => handleChange('eventDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Event Date</label>
                  <input
                    type="text"
                    value={formData.eventDate || ''}
                    onChange={(e) => handleChange('eventDate', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Event Time</label>
                  <input
                    type="text"
                    value={formData.eventTime || ''}
                    onChange={(e) => handleChange('eventTime', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Event Venue</label>
                  <input
                    type="text"
                    value={formData.eventVenue || ''}
                    onChange={(e) => handleChange('eventVenue', e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <ImageUploaderCard label="Event Banner Image" field="eventBannerImage" currentUrl={formData.eventBannerImage} />
            </div>
          )}
        </div>

        {/* ===================================================
            SECTION 8: FAQ
           =================================================== */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <button
            onClick={() => toggleSection('faq')}
            className="w-full p-5 text-left flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-[#ffe08d]" />
              <span className="font-display font-bold text-sm text-white">8. Frequently Asked Questions (FAQ)</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${openSection === 'faq' ? 'rotate-180 text-[#ffe08d]' : ''}`} />
          </button>

          {openSection === 'faq' && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">FAQ Section Title</label>
                <input
                  type="text"
                  value={formData.faqTitle || ''}
                  onChange={(e) => handleChange('faqTitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">FAQ Section Description</label>
                <textarea
                  rows={2}
                  value={formData.faqDescription || ''}
                  onChange={(e) => handleChange('faqDescription', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
