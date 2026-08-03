import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { Building2, Save, CheckCircle2, Loader2, Calendar } from 'lucide-react';

export const AdminConference = () => {
  const { conference, updateConferenceData } = useCmsData();

  const [formData, setFormData] = useState(conference);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateConferenceData(formData);
      setSuccessMsg('National Conference 2023 details saved live to Firestore!');
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
            <Building2 className="w-6 h-6 text-[#ffe08d]" />
            National Conference 2023 Manager
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Edit conference titles, presiding dignitaries, anchors, and event details.
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
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Hero & Header Details
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Conference Main Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="National Conference on 26th November 2023"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle || ''}
                onChange={handleChange}
                placeholder="All India Practising Lawyers Council (AILC)"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Header Badge Tag</label>
              <input
                type="text"
                name="badge"
                value={formData.badge || ''}
                onChange={handleChange}
                placeholder="National Conference • New Delhi • 26 November 2023"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
            Presiding Dignitaries & Anchors
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Venue Location</label>
            <input
              type="text"
              name="venue"
              value={formData.venue || ''}
              onChange={handleChange}
              placeholder="India International Centre, New Delhi"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Presided By</label>
              <input
                type="text"
                name="presidedBy"
                value={formData.presidedBy || ''}
                onChange={handleChange}
                placeholder="Hon’ble Justice Mr. Abhay M. Thipsay"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/70 block">Anchored By</label>
              <input
                type="text"
                name="anchoredBy"
                value={formData.anchoredBy || ''}
                onChange={handleChange}
                placeholder="Adv. Lakshmi Raja (Chennai High Court)"
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
              <span>Saving Conference Data...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Conference Details Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminConference;
