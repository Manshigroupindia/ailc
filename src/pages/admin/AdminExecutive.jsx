import React, { useState } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import { Users, Plus, Trash2, Edit2, Save, CheckCircle2, Loader2, Upload, UserCheck, ArrowUp, ArrowDown } from 'lucide-react';

export const AdminExecutive = () => {
  const { executiveCommittee, updateExecutiveCommittee } = useCmsData();

  const [items, setItems] = useState(executiveCommittee || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', state: '', photoUrl: '', description: '' });
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
      setSuccessMsg('Executive photo uploaded to Cloudinary!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(`Cloudinary Upload Error: ${err.message}`);
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
      updatedList = items.map((m) => (m.id === editingId ? { ...formData, id: editingId } : m));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      updatedList = [...items, newItem];
    }

    setItems(updatedList);
    await updateExecutiveCommittee(updatedList);
    setFormData({ name: '', role: '', state: '', photoUrl: '', description: '' });
    setEditingId(null);
    setIsSaving(false);
    setSuccessMsg('Executive Committee details saved live to Firestore!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      state: member.state || '',
      photoUrl: member.photoUrl || '',
      description: member.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove member from Executive Committee?')) return;
    const updatedList = items.filter((m) => m.id !== id);
    setItems(updatedList);
    await updateExecutiveCommittee(updatedList);
    setSuccessMsg('Member removed.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const moveMember = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setItems(updated);
    await updateExecutiveCommittee(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-[#ffe08d]" />
            Executive Committee Manager
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Manage National Office Bearers, State Representatives, and Committee Members.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add / Edit Member Form */}
      <form onSubmit={handleAddOrUpdate} className="bg-[#000d25] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold text-sm text-[#ffe08d] uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4" /> {editingId ? 'Edit Committee Member' : 'Add New Committee Member'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Full Name & Title *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Adv. Sharfuddin Ahmad"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">Designation / Office Role *</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Secretary General"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-white/70 block">State / Region Unit</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="Delhi / Pan-India"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-white/70 block">Member Profile Brief</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Senior advocate practicing in Supreme Court of India."
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
          ></textarea>
        </div>

        {/* Photo Upload Button */}
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
                <span>Upload Member Portrait</span>
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
            <span>{editingId ? 'Update Member Profile' : 'Add Committee Member'}</span>
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', role: '', state: '', photoUrl: '', description: '' });
              }}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Existing Committee Members List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
          Executive Committee Directory ({items.length})
        </h3>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#000d25] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 overflow-hidden flex-shrink-0">
                  {item.photoUrl ? (
                    <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">No Pic</div>
                  )}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                  <span className="text-xs text-[#ffe08d] font-semibold block">{item.role}</span>
                  {item.state && <span className="text-[11px] text-white/50">{item.state}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => moveMember(idx, -1)}
                  disabled={idx === 0}
                  className="p-2 bg-white/5 hover:bg-white/15 text-white rounded-lg text-xs disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveMember(idx, 1)}
                  disabled={idx === items.length - 1}
                  className="p-2 bg-white/5 hover:bg-white/15 text-white rounded-lg text-xs disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
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

export default AdminExecutive;
