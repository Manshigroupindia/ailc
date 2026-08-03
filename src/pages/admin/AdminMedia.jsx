import React, { useState, useEffect } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import { Image as ImageIcon, Upload, Trash2, Save, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

export const AdminMedia = () => {
  const { mediaList, updateMediaCollection } = useCmsData();

  const [items, setItems] = useState(mediaList || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (mediaList) setItems(mediaList);
  }, [mediaList]);

  // Handle Multiple File Cloudinary Uploads
  const handleMultipleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    setSuccessMsg('');
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push({
          id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
          url: url,
          category: 'Events',
          createdAt: new Date().toISOString(),
        });
      }

      const newItems = [...uploadedUrls, ...items];
      setItems(newItems);
      await updateMediaCollection(newItems);
      setSuccessMsg(`Successfully uploaded ${uploadedUrls.length} photo(s) to Cloudinary!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(`Upload Failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo from the media gallery?')) return;
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    await updateMediaCollection(newItems);
    setSuccessMsg('Photo deleted from gallery.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateMediaCollection(items);
      setSuccessMsg('Media Gallery collection updated live in Firestore!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-[#ffe08d]" />
            Media Gallery Manager
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Upload high-resolution photography directly to Cloudinary. Saves secure URLs to Firestore.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="py-3 px-5 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#000d25]" />
                <span>Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload Photos</span>
              </>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMultipleUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-md flex flex-col"
          >
            <div className="aspect-square w-full bg-black/40 overflow-hidden relative">
              <img
                src={item.url}
                alt="AILC Media"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 text-[11px] text-white/60 truncate font-mono border-t border-white/10">
              {item.url.split('/').pop()}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !isUploading && (
        <div className="p-12 text-center border-2 border-dashed border-white/10 rounded-3xl space-y-3">
          <ImageIcon className="w-12 h-12 text-white/20 mx-auto" />
          <h4 className="font-display font-bold text-white text-base">No Photos Uploaded Yet</h4>
          <p className="text-xs text-white/50 max-w-sm mx-auto">
            Click the "Upload Photos" button above to add images directly to Cloudinary.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
