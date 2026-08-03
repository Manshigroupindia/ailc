import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import { Globe, Save, CheckCircle2, Loader2, Upload, Search } from 'lucide-react';

export const AdminSeo = () => {
  const { seo, updateSeoSettings } = useCmsData();

  const [formData, setFormData] = useState(seo);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOgUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, ogImageUrl: url }));
      setSuccessMsg('Social Preview Image uploaded to Cloudinary!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(`Cloudinary Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSeoSettings(formData);
      setSuccessMsg('SEO & Meta settings saved live to Firestore!');
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
            <Globe className="w-6 h-6 text-[#ffe08d]" />
            SEO & Metadata Configuration
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Optimize search engine visibility, meta descriptions, and social media sharing previews.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Google Search Result Preview Simulation */}
      <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffe08d] flex items-center gap-1.5 mb-2">
          <Search className="w-3.5 h-3.5" /> Google Search Preview
        </span>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-xs text-emerald-400 block font-mono">https://ailcindia.org</span>
          <h4 className="text-sm font-bold text-blue-400 hover:underline cursor-pointer">
            {formData.siteTitle || 'All India Lawyers Council (AILC)'}
          </h4>
          <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
            {formData.metaDescription || 'Official website of All India Lawyers Council.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
            Global Search Meta Tags
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Website Title Tag</label>
            <input
              type="text"
              name="siteTitle"
              value={formData.siteTitle || ''}
              onChange={handleChange}
              placeholder="All India Lawyers Council (AILC) | Official National Secretariat"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Meta Description</label>
            <textarea
              rows={3}
              name="metaDescription"
              value={formData.metaDescription || ''}
              onChange={handleChange}
              placeholder="Autonomous Pan-India organization of advocate professionals..."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
            ></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Keywords (Comma Separated)</label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords || ''}
              onChange={handleChange}
              placeholder="All India Lawyers Council, AILC, Indian Advocates, Legal Aid"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>
        </div>

        {/* Social Sharing Image (Open Graph) */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
            Social Share Image (Open Graph)
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-48 h-28 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden">
              {formData.ogImageUrl ? (
                <img src={formData.ogImageUrl} alt="OG Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-white/30">No OG Image</span>
              )}
            </div>

            <div className="space-y-3 flex-1 w-full">
              <label className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/15 w-fit">
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#ffe08d]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-[#ffe08d]" />
                    <span>Upload Social Preview Image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleOgUpload} className="hidden" />
              </label>
              <input
                type="text"
                name="ogImageUrl"
                value={formData.ogImageUrl || ''}
                onChange={handleChange}
                placeholder="Cloudinary secure_url..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-4 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#000d25]" />
              <span>Saving SEO Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save SEO Settings Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminSeo;
