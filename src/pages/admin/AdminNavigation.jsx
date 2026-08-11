import React, { useState, useEffect } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { Layout, Save, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';

export const AdminNavigation = () => {
  const { navigation, updateNavigationData } = useCmsData();

  const [formData, setFormData] = useState({
    footerDescription: '',
    copyrightNotice: 'Copyright © 2023–2024 All India Lawyers Council. All Rights Reserved.',
    designerText: 'Design by Manshi Group of Services',
    designerUrl: 'https://manshigroup.in',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (navigation) {
      setFormData({
        footerDescription: navigation.footerDescription || '',
        copyrightNotice: navigation.copyrightNotice?.includes('|')
          ? navigation.copyrightNotice.split('|')[0].trim()
          : (navigation.copyrightNotice || 'Copyright © 2023–2024 All India Lawyers Council. All Rights Reserved.'),
        designerText: navigation.designerText || 'Design by Manshi Group of Services',
        designerUrl: navigation.designerUrl || 'https://manshigroup.in',
      });
    }
  }, [navigation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateNavigationData(formData);
      setSuccessMsg('Navbar & Footer configuration saved to Firestore!');
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
            <Layout className="w-6 h-6 text-[#ffe08d]" />
            Navbar & Footer CMS Editor
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Manage institutional footer text, copyright notices, and designed-by credits.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
            Footer Institutional Description
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">About Paragraph (Displayed in Footer)</label>
            <textarea
              rows={4}
              name="footerDescription"
              value={formData.footerDescription || ''}
              onChange={handleChange}
              placeholder="The Retired Judges, Former Bureaucrats..."
              className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
            Copyright & Attribution Bar
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Copyright Notice</label>
            <input
              type="text"
              name="copyrightNotice"
              value={formData.copyrightNotice || ''}
              onChange={handleChange}
              placeholder="Copyright © 2023–2024 All India Lawyers Council. All Rights Reserved."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Designer / Credit Text</label>
              <input
                type="text"
                name="designerText"
                value={formData.designerText || ''}
                onChange={handleChange}
                placeholder="Design by Manshi Group of Services"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block flex items-center gap-1.5">
                Designer Redirect Link (URL) <ExternalLink className="w-3 h-3 text-[#ffe08d]" />
              </label>
              <input
                type="url"
                name="designerUrl"
                value={formData.designerUrl || ''}
                onChange={handleChange}
                placeholder="https://manshigroup.in"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
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
              <span>Saving Footer Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Navigation & Footer Settings Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminNavigation;
