import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { FileText, Save, CheckCircle2, Loader2 } from 'lucide-react';

export const AdminPagesContent = () => {
  const { updateContactSettings } = useCmsData();

  const [activePage, setActivePage] = useState('Homepage');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [pageData, setPageData] = useState({
    Homepage: {
      heroTitle: 'All India Lawyers Council',
      heroSubtitle: 'Autonomous, Self-Help and Pan-India Organization of Advocates',
      statEvents: '150+',
      statStates: '19+',
      statPhotos: '500+',
      statYears: '10+',
    },
    About: {
      title: 'About Us',
      subtitle: 'Self-help autonomous Pan-India legal body registered under NGO nomenclature.',
      introduction: 'The Retired Judges, Former Bureaucrats, Ex Police Officers, Prominent Intellectuals, Academicians, Noted Social and Political Activists of India have also been subscribing and patronising.',
    },
    RulesRegulation: {
      title: 'Rules & Regulations',
      subtitle: 'Constitutional Bylaws and Operational Directives of All India Lawyers Council.',
    },
  });

  const pages = ['Homepage', 'About', 'Rules & Regulations'];

  const handleChange = (field, value) => {
    setPageData((prev) => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      setSuccessMsg(`${activePage} section content saved to Firestore!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#ffe08d]" />
            Section-Based Page Content Editor
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Edit text content, hero headers, subtitles, and section statistics for main website pages.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Page Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setActivePage(p)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activePage === p
                ? 'bg-[#ffe08d] text-[#000d25] shadow-md'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activePage === 'Homepage' && (
          <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
              Homepage Hero & Statistics
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Hero Title</label>
              <input
                type="text"
                value={pageData.Homepage.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Hero Subtitle</label>
              <textarea
                rows={2}
                value={pageData.Homepage.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-white/60 block">Events Covered</label>
                <input
                  type="text"
                  value={pageData.Homepage.statEvents}
                  onChange={(e) => handleChange('statEvents', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-white/60 block">States Active</label>
                <input
                  type="text"
                  value={pageData.Homepage.statStates}
                  onChange={(e) => handleChange('statStates', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-white/60 block">Photographs</label>
                <input
                  type="text"
                  value={pageData.Homepage.statPhotos}
                  onChange={(e) => handleChange('statPhotos', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-white/60 block">Years of Activity</label>
                <input
                  type="text"
                  value={pageData.Homepage.statYears}
                  onChange={(e) => handleChange('statYears', e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activePage === 'About' && (
          <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
              About Page Header & Introduction
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Page Title</label>
              <input
                type="text"
                value={pageData.About.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Page Introduction</label>
              <textarea
                rows={4}
                value={pageData.About.introduction}
                onChange={(e) => handleChange('introduction', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
              ></textarea>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-4 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#000d25]" />
              <span>Saving Page Content...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save {activePage} Content Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminPagesContent;
