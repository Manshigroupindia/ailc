import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { BarChart3, MapPin, Save, CheckCircle2, Loader2, FileText } from 'lucide-react';

export const AdminActivityReports = () => {
  const { activityReports, updateActivityReportsData } = useCmsData();

  const [formData, setFormData] = useState(activityReports);
  const [activeTab, setActiveTab] = useState('Malegaon');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const locations = [
    'Malegaon',
    'Adharpur',
    'Jharkhand',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Rajasthan',
    'Haryana',
    'Manipur',
  ];

  const handleLocationTextChange = (text) => {
    setFormData((prev) => ({
      ...prev,
      locations: {
        ...prev.locations,
        [activeTab]: text,
      },
    }));
  };

  const handleCommonChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateActivityReportsData(formData);
      setSuccessMsg('Activity Reports saved live to Firestore!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-[#ffe08d]" />
            Activity Reports Manager
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Section-based editor for Pan-India location reports and common fact-finding assembly reports.
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
        {/* Section 1: Common Report */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" /> Section 1: Common Assembly & Fact-Finding Report
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Common Report Title</label>
            <input
              type="text"
              name="commonReportTitle"
              value={formData.commonReportTitle || ''}
              onChange={handleCommonChange}
              placeholder="Common Manipur Mission & Fact-Finding Report"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Report Content Summary</label>
            <textarea
              rows={4}
              name="commonReportText"
              value={formData.commonReportText || ''}
              onChange={handleCommonChange}
              placeholder="Full report details..."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
            ></textarea>
          </div>
        </div>

        {/* Section 2: Location Specific Reports */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Section 2: Regional Location Reports
          </h3>

          {/* Location Horizontal Scroll Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveTab(loc)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === loc
                    ? 'bg-[#ffe08d] text-[#000d25] shadow-md'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Active Tab Editor */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-white/70 block">
              Activity Report for {activeTab}
            </label>
            <textarea
              rows={5}
              value={formData.locations?.[activeTab] || ''}
              onChange={(e) => handleLocationTextChange(e.target.value)}
              placeholder={`Enter activity details and proceedings for ${activeTab}...`}
              className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none font-body leading-relaxed"
            ></textarea>
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
              <span>Saving Reports...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Activity Reports Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminActivityReports;
