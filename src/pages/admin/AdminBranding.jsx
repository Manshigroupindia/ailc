import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import { Scale, Upload, Save, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

export const AdminBranding = () => {
  const { branding, updateBrandingSettings } = useCmsData();

  const [formData, setFormData] = useState(branding);
  const [uploadingField, setUploadingField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const secureUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, [fieldName]: secureUrl }));
      setSuccessMsg(`${fieldName} uploaded to Cloudinary successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(`Cloudinary Upload Error: ${err.message}`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateBrandingSettings(formData);
      setSuccessMsg('Branding settings saved live to Firestore!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const logoFields = [
    { key: 'logoUrl', label: 'Primary Brand Logo', desc: 'Main logo shown in Navbar' },
    { key: 'darkLogoUrl', label: 'Dark Variant Logo', desc: 'Logo used on light backgrounds' },
    { key: 'lightLogoUrl', label: 'Light Variant Logo', desc: 'Logo used on dark hero banners' },
    { key: 'faviconUrl', label: 'Favicon Icon', desc: 'Browser tab icon (.png or .ico)' },
    { key: 'footerLogoUrl', label: 'Footer Logo', desc: 'Logo displayed at bottom footer' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <Scale className="w-6 h-6 text-[#ffe08d]" />
            Logo & Branding Management
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Every image uploaded here is securely hosted on Cloudinary and updates Navbar, Footer, and Favicon instantly.
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
        {/* Organization Name Field */}
        <div className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider">
            Organization Identity
          </h3>
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Official Organization Title</label>
            <input
              type="text"
              name="organizationTitle"
              value={formData.organizationTitle || ''}
              onChange={handleTextChange}
              placeholder="ALL INDIA LAWYERS COUNCIL"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>
        </div>

        {/* Upload Logo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {logoFields.map((field) => (
            <div key={field.key} className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <h4 className="font-display font-bold text-sm text-white">{field.label}</h4>
                <p className="text-[11px] text-white/50">{field.desc}</p>
              </div>

              {/* Preview Thumbnail */}
              <div className="h-28 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-3 relative overflow-hidden">
                {formData[field.key] ? (
                  <img
                    src={formData[field.key]}
                    alt={field.label}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-white/30 text-xs space-y-1">
                    <ImageIcon className="w-6 h-6 mx-auto opacity-50" />
                    <span>No image uploaded</span>
                  </div>
                )}
              </div>

              {/* Direct Upload Button to Cloudinary */}
              <div className="flex items-center gap-3">
                <label className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/15">
                  {uploadingField === field.key ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#ffe08d]" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-[#ffe08d]" />
                      <span>Upload Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, field.key)}
                    className="hidden"
                    disabled={uploadingField !== null}
                  />
                </label>
              </div>

              {/* Manual URL input fallback */}
              <input
                type="text"
                name={field.key}
                value={formData[field.key] || ''}
                onChange={handleTextChange}
                placeholder="Cloudinary secure_url..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white/70 outline-none focus:border-[#ffe08d]"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-4 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#000d25]" />
              <span>Saving Branding...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Branding Settings Live</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminBranding;
