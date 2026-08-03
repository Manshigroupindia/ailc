import React, { useState, useEffect } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { PhoneCall, MapPin, Mail, Globe, Save, CheckCircle2, Loader2, Share2 } from 'lucide-react';

export const AdminContact = () => {
  const { contact, updateContactSettings } = useCmsData();

  const [formData, setFormData] = useState(contact);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setFormData(contact);
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    try {
      await updateContactSettings(formData);
      setSuccessMsg('Contact and Social links saved live to Firestore!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <PhoneCall className="w-6 h-6 text-[#ffe08d]" />
            Contact & Social Media Settings
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Single source of truth. Updates here reflect everywhere on Navbar, Footer, and Contact Us page.
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
        {/* Secretariat Communication Details */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4" /> Secretariat Communication Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Official Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="011-46068472"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Alternative Phone</label>
              <input
                type="text"
                name="altPhone"
                value={formData.altPhone || ''}
                onChange={handleChange}
                placeholder="+91 9810XXXXXX"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Official Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="allindiapractisinglawyers@gmail.com"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">WhatsApp Support Number</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || ''}
                onChange={handleChange}
                placeholder="+91 9810XXXXXX"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ffe08d]" /> National Secretariat Office Address
            </label>
            <textarea
              rows={3}
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="A-15, (BACK SIDE, GROUND FLOOR), HAZRAT NIZAMUDDIN WEST, NEW DELHI"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
            ></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Google Maps Location Link</label>
            <input
              type="text"
              name="googleMapsUrl"
              value={formData.googleMapsUrl || ''}
              onChange={handleChange}
              placeholder="https://www.google.com/maps/..."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>
        </div>

        {/* Social Media Channels */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Official Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Facebook Page URL</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook || ''}
                onChange={handleChange}
                placeholder="https://www.facebook.com/..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Instagram Profile URL</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram || ''}
                onChange={handleChange}
                placeholder="https://www.instagram.com/..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">X (Twitter) Profile URL</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">YouTube Channel URL</label>
              <input
                type="text"
                name="youtube"
                value={formData.youtube || ''}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-4 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#000d25]" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Contact Settings Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminContact;
