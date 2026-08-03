import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import { Award, Plus, Trash2, Edit2, Save, CheckCircle2, Loader2, Upload, UserCheck } from 'lucide-react';

export const AdminPatrons = () => {
  const { patrons, updatePatronsData } = useCmsData();

  const [items, setItems] = useState(patrons || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', description: '', photoUrl: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, photoUrl: url }));
      setSuccessMsg('Patron photo uploaded to Cloudinary!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(`Cloudinary Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    setIsSaving(true);
    let updatedList = [];
    if (editingId) {
      updatedList = items.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      updatedList = [newItem, ...items];
    }

    setItems(updatedList);
    await updatePatronsData(updatedList);
    setFormData({ name: '', role: '', description: '', photoUrl: '' });
    setEditingId(null);
    setIsSaving(false);
    setSuccessMsg('Patron details saved to Firestore!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEdit = (patron) => {
    setEditingId(patron.id);
    setFormData({ name: patron.name, role: patron.role, description: patron.description, photoUrl: patron.photoUrl || '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patron entry?')) return;
    const updatedList = items.filter((p) => p.id !== id);
    setItems(updatedList);
    await updatePatronsData(updatedList);
    setSuccessMsg('Patron removed.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <Award className="w-6 h-6 text-[#ffe08d]" />
            Distinguished Patrons Manager
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Manage Council Patrons, former judges, legal mentors, and senior leaders.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add / Edit Form */}
      <form onSubmit={handleAddOrUpdate} className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4" /> {editingId ? 'Edit Patron Profile' : 'Add New Patron Profile'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Full Name & Title *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Hon’ble Justice A. K. Ganguly (Retd.)"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Role / Judicial Designation *</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Former Judge, Supreme Court of India"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-white/70 block">Patron Description / Profile Summary</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Distinguished Patron guiding constitutional advocacy and judicial integrity."
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <label className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/15">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#ffe08d]" />
                <span>Uploading Photo...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-[#ffe08d]" />
                <span>Upload Portrait to Cloudinary</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
          {formData.photoUrl && <span className="text-xs text-emerald-400 font-mono">Photo attached</span>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{editingId ? 'Update Patron Entry' : 'Save Patron Entry'}</span>
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', role: '', description: '', photoUrl: '' });
              }}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Existing Patrons List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
          Current Patrons Directory ({items.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#000d25] border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base text-white">{item.name}</h4>
                <p className="text-xs text-[#ffe08d] font-semibold">{item.role}</p>
                {item.description && <p className="text-xs text-white/70 mt-2 leading-relaxed">{item.description}</p>}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPatrons;
