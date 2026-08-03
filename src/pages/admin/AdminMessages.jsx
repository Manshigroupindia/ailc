import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  db,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from '@/services/firebase';
import {
  Mail,
  CalendarCheck,
  Search,
  Filter,
  Star,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  User,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';

export const AdminMessages = () => {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' | 'rsvp'
  const [contactMessages, setContactMessages] = useState([]);
  const [rsvpSubmissions, setRsvpSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected item for detail modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Realtime listeners for contact_submissions & rsvp_submissions
  useEffect(() => {
    setLoading(true);

    // 1. Contact Messages Realtime Listener
    const contactQuery = query(collection(db, 'contact_submissions'), orderBy('submittedAt', 'desc'));
    const unsubContact = onSnapshot(
      contactQuery,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            submittedAtDate: data.submittedAt?.toDate ? data.submittedAt.toDate() : new Date(),
          };
        });
        setContactMessages(list);
        setLoading(false);
      },
      (err) => {
        console.error('Contact submissions listener error:', err);
        setLoading(false);
      }
    );

    // 2. RSVP Submissions Realtime Listener
    const rsvpQuery = query(collection(db, 'rsvp_submissions'), orderBy('submittedAt', 'desc'));
    const unsubRsvp = onSnapshot(
      rsvpQuery,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            submittedAtDate: data.submittedAt?.toDate ? data.submittedAt.toDate() : new Date(),
          };
        });
        setRsvpSubmissions(list);
      },
      (err) => {
        console.error('RSVP submissions listener error:', err);
      }
    );

    return () => {
      unsubContact();
      unsubRsvp();
    };
  }, []);

  // Compute unread badges
  const unreadContactCount = contactMessages.filter((m) => m.status === 'New').length;
  const unreadRsvpCount = rsvpSubmissions.filter((m) => m.status === 'New').length;

  // Active dataset depending on tab
  const currentList = activeTab === 'contact' ? contactMessages : rsvpSubmissions;

  // Filter dataset
  const filteredList = currentList.filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.state || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'starred') return matchesSearch && item.isStarred;
    return matchesSearch && (item.status || '').toLowerCase() === statusFilter.toLowerCase();
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Actions
  const handleToggleStar = async (item) => {
    try {
      const collectionName = activeTab === 'contact' ? 'contact_submissions' : 'rsvp_submissions';
      const itemRef = doc(db, collectionName, item.id);
      await updateDoc(itemRef, { isStarred: !item.isStarred });
    } catch (err) {
      console.error('Failed to toggle star:', err);
    }
  };

  const handleToggleReadStatus = async (item) => {
    try {
      const collectionName = activeTab === 'contact' ? 'contact_submissions' : 'rsvp_submissions';
      const itemRef = doc(db, collectionName, item.id);
      const newStatus = item.status === 'New' ? 'Read' : 'New';
      await updateDoc(itemRef, { status: newStatus });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission record?')) {
      try {
        const collectionName = activeTab === 'contact' ? 'contact_submissions' : 'rsvp_submissions';
        await deleteDoc(doc(db, collectionName, id));
        if (selectedItem?.id === id) setSelectedItem(null);
      } catch (err) {
        console.error('Failed to delete item:', err);
      }
    }
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setAdminNotes(item.notes || '');
    setSelectedStatus(item.status || 'Read');

    // Automatically mark as Read if status was New
    if (item.status === 'New') {
      const collectionName = activeTab === 'contact' ? 'contact_submissions' : 'rsvp_submissions';
      updateDoc(doc(db, collectionName, item.id), { status: 'Read' }).catch(console.error);
    }
  };

  const handleSaveDetailChanges = async () => {
    if (!selectedItem) return;
    try {
      const collectionName = activeTab === 'contact' ? 'contact_submissions' : 'rsvp_submissions';
      await updateDoc(doc(db, collectionName, selectedItem.id), {
        status: selectedStatus,
        notes: adminNotes,
      });
      setSelectedItem(null);
    } catch (err) {
      console.error('Failed to save details:', err);
    }
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const dataToExport = filteredList;
    if (!dataToExport.length) return alert('No records available to export.');

    let csvContent = 'data:text/csv;charset=utf-8,';

    if (activeTab === 'contact') {
      csvContent += 'Name,Email,Subject,Message,Submitted At,Status,Starred,Notes\n';
      dataToExport.forEach((item) => {
        const dateStr = item.submittedAtDate ? item.submittedAtDate.toLocaleString() : '';
        const cleanName = `"${(item.name || '').replace(/"/g, '""')}"`;
        const cleanEmail = `"${(item.email || '').replace(/"/g, '""')}"`;
        const cleanSubject = `"${(item.subject || '').replace(/"/g, '""')}"`;
        const cleanMsg = `"${(item.message || '').replace(/"/g, '""')}"`;
        const cleanNotes = `"${(item.notes || '').replace(/"/g, '""')}"`;

        csvContent += `${cleanName},${cleanEmail},${cleanSubject},${cleanMsg},"${dateStr}",${item.status || 'New'},${item.isStarred ? 'Yes' : 'No'},${cleanNotes}\n`;
      });
    } else {
      csvContent += 'Name,Email,Phone,State,Event,Submitted At,Status,Starred,Notes\n';
      dataToExport.forEach((item) => {
        const dateStr = item.submittedAtDate ? item.submittedAtDate.toLocaleString() : '';
        const cleanName = `"${(item.name || '').replace(/"/g, '""')}"`;
        const cleanEmail = `"${(item.email || '').replace(/"/g, '""')}"`;
        const cleanPhone = `"${(item.phone || '').replace(/"/g, '""')}"`;
        const cleanState = `"${(item.state || '').replace(/"/g, '""')}"`;
        const cleanEvent = `"${(item.eventTitle || '').replace(/"/g, '""')}"`;
        const cleanNotes = `"${(item.notes || '').replace(/"/g, '""')}"`;

        csvContent += `${cleanName},${cleanEmail},${cleanPhone},${cleanState},${cleanEvent},"${dateStr}",${item.status || 'New'},${item.isStarred ? 'Yes' : 'No'},${cleanNotes}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AILC_${activeTab}_submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 font-body max-w-7xl mx-auto">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-variant pb-6">
        <div>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase block mb-1">
            LEAD & SUBMISSION MANAGEMENT
          </span>
          <h1 className="font-display text-3xl font-bold text-primary flex items-center gap-3">
            <span>Messages & Inquiries</span>
            {(unreadContactCount > 0 || unreadRsvpCount > 0) && (
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full animate-pulse flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 fill-current" />
                {unreadContactCount + unreadRsvpCount} New
              </span>
            )}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Realtime Firestore inbox for contact submissions and event RSVPs.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-[#000d25] text-white hover:bg-secondary hover:text-[#000d25] font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-[#ffe08d]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-surface-variant shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('contact');
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-[#000d25] text-white shadow-md'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <Mail className="w-4 h-4 text-[#ffe08d]" />
            <span>Contact Messages</span>
            {unreadContactCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadContactCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('rsvp');
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'rsvp'
                ? 'bg-[#000d25] text-white shadow-md'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-[#ffe08d]" />
            <span>RSVP Submissions</span>
            {unreadRsvpCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadRsvpCount}
              </span>
            )}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container pl-9 pr-4 py-2 rounded-xl text-xs outline-none border border-surface-variant focus:ring-2 focus:ring-[#000d25]"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-container px-3 py-2 rounded-xl text-xs outline-none border border-surface-variant text-primary font-semibold"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="starred">Starred Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="bg-white rounded-3xl border border-surface-variant shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-outline space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
            <p>Loading real-time submission data...</p>
          </div>
        ) : paginatedList.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <MessageSquare className="w-12 h-12 text-outline mx-auto" />
            <h4 className="font-display font-bold text-lg text-primary">No Messages Found</h4>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              There are currently no submission entries matching your search filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#000d25] text-white text-[11px] font-bold uppercase tracking-wider border-b border-white/10">
                  <th className="py-4 px-5 w-10">★</th>
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Email</th>
                  {activeTab === 'contact' ? (
                    <th className="py-4 px-5">Subject</th>
                  ) : (
                    <>
                      <th className="py-4 px-5">Phone</th>
                      <th className="py-4 px-5">State</th>
                    </>
                  )}
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant text-xs">
                {paginatedList.map((item) => {
                  const isNew = item.status === 'New';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-surface-container-low transition-colors ${
                        isNew ? 'bg-amber-500/5 font-semibold' : ''
                      }`}
                    >
                      {/* Star Column */}
                      <td className="py-4 px-5">
                        <button
                          onClick={() => handleToggleStar(item)}
                          className="hover:scale-125 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              item.isStarred ? 'text-amber-500 fill-amber-500' : 'text-outline'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Name */}
                      <td className="py-4 px-5 text-primary font-bold">
                        <div className="flex items-center gap-2">
                          <span>{item.name || 'Anonymous'}</span>
                          {isNew && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                          )}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-5 text-on-surface-variant">{item.email}</td>

                      {/* Contact Subject or RSVP Phone & State */}
                      {activeTab === 'contact' ? (
                        <td className="py-4 px-5 text-primary max-w-xs truncate">
                          {item.subject}
                        </td>
                      ) : (
                        <>
                          <td className="py-4 px-5 text-primary">{item.phone}</td>
                          <td className="py-4 px-5 text-on-surface-variant">{item.state}</td>
                        </>
                      )}

                      {/* Date */}
                      <td className="py-4 px-5 text-outline whitespace-nowrap">
                        {item.submittedAtDate ? item.submittedAtDate.toLocaleDateString() : ''}
                      </td>

                      {/* Status Tag */}
                      <td className="py-4 px-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isNew
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : item.status === 'Replied'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-surface-container text-on-surface-variant border border-surface-variant'
                          }`}
                        >
                          {item.status || 'New'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-all text-primary"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleReadStatus(item)}
                          className="p-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-[#000d25] transition-all text-primary"
                          title={isNew ? 'Mark as Read' : 'Mark as Unread'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white transition-all text-red-600"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 bg-surface-container-low border-t border-surface-variant flex items-center justify-between">
            <span className="text-xs text-outline">
              Page {currentPage} of {totalPages} ({filteredList.length} total items)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded-lg bg-white border border-surface-variant disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-lg bg-white border border-surface-variant disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-[#000d25]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-surface-variant max-w-2xl w-full p-6 sm:p-8 z-10 overflow-hidden space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-surface-variant pb-4">
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1">
                    SUBMISSION DETAILS
                  </span>
                  <h3 className="font-display text-2xl font-bold text-primary">
                    {selectedItem.name || 'Anonymous Submission'}
                  </h3>
                  <span className="text-xs text-outline">
                    Received on {selectedItem.submittedAtDate?.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-full bg-surface-container hover:bg-surface-variant text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8f9fb] p-4 rounded-2xl border border-surface-variant text-xs">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-secondary flex-shrink-0" />
                  <div>
                    <span className="text-outline block text-[10px]">Email Address</span>
                    <strong className="text-primary">{selectedItem.email}</strong>
                  </div>
                </div>

                {selectedItem.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div>
                      <span className="text-outline block text-[10px]">Phone Number</span>
                      <strong className="text-primary">{selectedItem.phone}</strong>
                    </div>
                  </div>
                )}

                {selectedItem.state && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div>
                      <span className="text-outline block text-[10px]">State</span>
                      <strong className="text-primary">{selectedItem.state}</strong>
                    </div>
                  </div>
                )}

                {selectedItem.subject && (
                  <div className="flex items-center gap-2 col-span-full">
                    <FileText className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div>
                      <span className="text-outline block text-[10px]">Subject</span>
                      <strong className="text-primary">{selectedItem.subject}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Content */}
              {selectedItem.message && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                    Message Body
                  </label>
                  <div className="p-4 bg-surface-container rounded-2xl border border-surface-variant text-xs leading-relaxed text-on-surface whitespace-pre-wrap">
                    {selectedItem.message}
                  </div>
                </div>
              )}

              {/* Status & Admin Notes */}
              <div className="space-y-4 pt-2 border-t border-surface-variant">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-primary uppercase block mb-1.5">
                      Update Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-surface-container border border-surface-variant p-2.5 rounded-xl text-xs outline-none font-bold text-primary"
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-primary uppercase block mb-1.5">
                      Admin Action Notes
                    </label>
                    <input
                      type="text"
                      placeholder="Add private note (e.g. Email sent on 3rd Aug)"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full bg-surface-container border border-surface-variant p-2.5 rounded-xl text-xs outline-none text-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-surface-variant">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-variant text-xs font-bold text-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDetailChanges}
                  className="px-6 py-2.5 rounded-full bg-[#000d25] text-white hover:bg-secondary hover:text-[#000d25] text-xs font-bold transition-all shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMessages;
