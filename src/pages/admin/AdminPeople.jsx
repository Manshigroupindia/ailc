import React, { useState, useMemo } from 'react';
import { useCmsData } from '@/context/CmsContext';
import { uploadToCloudinary } from '@/services/cloudinary';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  X,
  Loader2,
  Eye,
  AlertTriangle,
  Sparkles,
  MapPin,
  Tag,
  Layers,
  Info
} from 'lucide-react';

const PAGE_LOCATIONS = [
  'Home Hero',
  'About Page',
  'Patrons Page',
  'National Conference',
  'Executive Committee',
  'Leadership Page',
  'Activity Report',
  'Footer / Credits'
];

const CATEGORIES = ['Patrons', 'Committee', 'Speakers', 'Leadership', 'State Members', 'Other'];

export const AdminPeople = () => {
  const { people, updatePeopleCollection } = useCmsData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [personToDelete, setPersonToDelete] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    description: '',
    state: 'National',
    category: 'Committee',
    photoUrl: '',
    usedIn: [],
    displayOrder: 1,
    active: true,
    globalSync: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Search and Filter Logic
  const filteredPeople = useMemo(() => {
    return (people || []).filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.usedIn?.some((page) => page.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [people, searchQuery, selectedCategory]);

  const handleOpenAddModal = () => {
    setEditingPerson(null);
    setFormData({
      id: `p-${Date.now()}`,
      name: '',
      designation: '',
      description: '',
      state: 'Delhi / National',
      category: 'Committee',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      usedIn: ['Executive Committee'],
      displayOrder: (people?.length || 0) + 1,
      active: true,
      globalSync: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (person) => {
    setEditingPerson(person);
    setFormData({
      ...person,
      globalSync: true,
      usedIn: person.usedIn || [],
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, photoUrl: url }));
      setSuccessMsg('Profile photo uploaded to Cloudinary!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert(`Cloudinary Upload Error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleUsedIn = (location) => {
    setFormData((prev) => {
      const current = prev.usedIn || [];
      const updated = current.includes(location)
        ? current.filter((loc) => loc !== location)
        : [...current, location];
      return { ...prev, usedIn: updated };
    });
  };

  const handleSavePerson = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a full name');
      return;
    }

    setIsSaving(true);
    try {
      let updatedList = [...(people || [])];

      if (editingPerson) {
        updatedList = updatedList.map((p) =>
          p.id === editingPerson.id
            ? { ...formData, updatedAt: new Date().toISOString() }
            : p
        );
      } else {
        updatedList.push({
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      await updatePeopleCollection(updatedList);
      setSuccessMsg(
        editingPerson
          ? `Updated profile for "${formData.name}" across all website usages!`
          : `Added new profile for "${formData.name}"!`
      );
      setModalOpen(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      alert(`Failed to save: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDeleteModal = (person) => {
    setPersonToDelete(person);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!personToDelete) return;
    setIsSaving(true);
    try {
      const updatedList = (people || []).filter((p) => p.id !== personToDelete.id);
      await updatePeopleCollection(updatedList);
      setSuccessMsg(`Profile for "${personToDelete.name}" removed from all pages.`);
      setDeleteModalOpen(false);
      setPersonToDelete(null);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-body pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-[#ffe08d]" />
            People Management
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Single source of truth for all patrons, office bearers, keynote speakers, and state members across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Person</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* SEARCH AND FILTER BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#000d25] p-4 rounded-2xl border border-white/10">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by Name, Designation, State, or Page used in..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-[#ffe08d]"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#000d25] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-[#ffe08d] cursor-pointer"
          >
            <option value="All">All Categories ({people?.length || 0})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SEARCHABLE PEOPLE TABLE */}
      <div className="bg-[#000d25] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white/60 text-[11px] uppercase font-bold tracking-wider border-b border-white/10">
                <th className="p-4">Photo</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Category / State</th>
                <th className="p-4">Used In Pages</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs text-white/90">
              {filteredPeople.length > 0 ? (
                filteredPeople.map((person) => (
                  <tr key={person.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <img
                        src={person.photoUrl}
                        alt={person.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#ffe08d]/40 shadow-sm"
                      />
                    </td>
                    <td className="p-4 font-bold text-white">
                      {person.name}
                    </td>
                    <td className="p-4 text-white/70">{person.designation}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-white/10 rounded-md text-[10px] font-semibold text-[#ffe08d] block w-fit mb-1">
                        {person.category || 'General'}
                      </span>
                      <span className="text-[10px] text-white/50">{person.state || 'National'}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(person.usedIn || []).map((page, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded text-[10px] font-medium"
                          >
                            ✓ {page}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          person.active !== false
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {person.active !== false ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(person)}
                          className="p-2 bg-white/10 hover:bg-[#ffe08d] text-white hover:text-[#000d25] rounded-lg transition-all"
                          title="Edit Person Profile"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(person)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition-all"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-white/40">
                    No people found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / ADD MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#000d25] border border-white/15 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ffe08d]" />
                {editingPerson ? `Edit Profile: ${editingPerson.name}` : 'Add New Person Profile'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSavePerson} className="space-y-6">
              {/* Photo & Cloudinary Uploader */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                <img
                  src={formData.photoUrl}
                  alt={formData.name || 'Preview'}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#ffe08d] shadow-md flex-shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <label className="text-xs font-bold text-white/80 block">Profile Image (Cloudinary Storage)</label>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <label className="px-4 py-2 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs cursor-pointer flex items-center gap-2">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>{isUploading ? 'Uploading...' : 'Replace Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[10px] text-white/40">Uploads to Cloudinary API returning optimized secure_url.</p>
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#000d25] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#ffe08d]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">State / Region</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/70 block">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#ffe08d]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 block">Description / Bio</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white outline-none focus:border-[#ffe08d] resize-none"
                ></textarea>
              </div>

              {/* CURRENTLY USED ON CHECKBOXES */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#ffe08d] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    Currently Used On Website Pages
                  </span>
                  <span className="text-[10px] text-white/50">Auto-Detect & Global Sync Enabled</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {PAGE_LOCATIONS.map((loc) => {
                    const isChecked = (formData.usedIn || []).includes(loc);
                    return (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => handleToggleUsedIn(loc)}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <span>{loc}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GLOBAL UPDATE CHECKBOX */}
              <div className="p-4 bg-[#ffe08d]/10 border border-[#ffe08d]/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="globalSyncCheck"
                    checked={formData.globalSync}
                    onChange={(e) => setFormData({ ...formData, globalSync: e.target.checked })}
                    className="w-4 h-4 accent-[#ffe08d] rounded cursor-pointer"
                  />
                  <label htmlFor="globalSyncCheck" className="text-xs font-bold text-[#ffe08d] cursor-pointer">
                    ☑ Update all usages of this person across entire website automatically
                  </label>
                </div>
              </div>

              {/* USAGE PREVIEW PANEL */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">
                  Usage Live Preview Panel
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(formData.usedIn || []).map((pageName, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-center"
                    >
                      <img
                        src={formData.photoUrl}
                        alt={pageName}
                        className="w-12 h-12 rounded-full object-cover mx-auto border border-[#ffe08d]"
                      />
                      <span className="text-[10px] font-bold text-white block truncate">{pageName}</span>
                      <span className="text-[9px] text-emerald-400 block font-mono">Live Sync Active</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Global Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && personToDelete && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#000d25] border border-red-500/30 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-7 h-7 flex-shrink-0" />
              <h3 className="font-display font-bold text-lg text-white">Confirm Delete Profile</h3>
            </div>

            <div className="space-y-3 text-xs text-white/80 leading-relaxed font-body">
              <p>
                Are you sure you want to delete profile for <strong>"{personToDelete.name}"</strong>?
              </p>

              {personToDelete.usedIn?.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-2">
                  <span className="font-bold text-red-300 block">
                    ⚠️ This profile is currently used on:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-red-200">
                    {personToDelete.usedIn.map((page, idx) => (
                      <li key={idx}>{page}</li>
                    ))}
                  </ul>
                  <span className="text-[10px] text-red-300 block pt-1">
                    Deleting it will remove it from all these pages across the website.
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isSaving}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Delete Everywhere</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPeople;
