import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  LayoutDashboard,
  Mail,
  PhoneCall,
  Image as ImageIcon,
  Globe,
  Award,
  BarChart3,
  Building2,
  FileText,
  LogOut,
  Scale,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  Layout,
  Home,
  UserCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const { currentUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Messages & Inquiries', path: '/admin/messages', icon: Mail },
    { label: 'People Management', path: '/admin/people', icon: UserCheck },
    { label: 'Home Page Editor', path: '/admin/pages/home', icon: Home },
    { label: 'Contact & Social Details', path: '/admin/contact', icon: PhoneCall },
    { label: 'Logo & Branding', path: '/admin/branding', icon: Scale },
    { label: 'SEO & Meta Settings', path: '/admin/seo', icon: Globe },
    { label: 'Media Gallery Manager', path: '/admin/media', icon: ImageIcon },
    { label: 'Patrons Directory', path: '/admin/patrons', icon: Award },
    { label: 'Executive Committee', path: '/admin/executive', icon: Users },
    { label: 'Activity Reports', path: '/admin/activity-reports', icon: BarChart3 },
    { label: 'National Conference 2023', path: '/admin/conference', icon: Building2 },
    { label: 'Navbar & Footer CMS', path: '/admin/navigation', icon: Layout },
    { label: 'Page Content Editor', path: '/admin/pages', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#000814] text-white flex flex-col md:flex-row font-body">
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Left Executive Sidebar */}
      <aside
        className={`fixed md:static top-0 bottom-0 left-0 w-72 bg-[#000d25] border-r border-white/10 z-50 flex flex-col transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header Branding */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffe08d] text-[#000d25] flex items-center justify-center font-bold shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-tight text-white uppercase">AILC CMS</h2>
              <span className="text-[10px] text-[#ffe08d] uppercase tracking-wider block">Enterprise Portal</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-white/70 hover:text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 block my-2">
            CMS Core Management
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#ffe08d] text-[#000d25] shadow-md font-bold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#ffe08d]/20 text-[#ffe08d] flex items-center justify-center text-xs font-bold border border-[#ffe08d]/30">
              {currentUser?.email?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser?.email || 'Administrator'}</p>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Authenticated
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <header className="h-16 border-b border-white/10 bg-[#000d25] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="w-4 h-4 text-[#ffe08d]" />
              <span>Realtime Cloud Firestore Synchronized</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-white/15"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffe08d]" />
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/60" />
            </a>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
