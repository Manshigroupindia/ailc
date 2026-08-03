import React from 'react';
import { Link } from 'react-router-dom';
import { useCmsData } from '@/context/CmsContext';
import {
  PhoneCall,
  Scale,
  Globe,
  Image as ImageIcon,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { mediaList, patrons, contact } = useCmsData();

  const stats = [
    { label: 'Media Photographs', count: mediaList.length || 0, icon: ImageIcon, color: 'text-blue-400', link: '/admin/media' },
    { label: 'Distinguished Patrons', count: patrons.length || 0, icon: Award, color: 'text-amber-400', link: '/admin/patrons' },
    { label: 'Activity Reports', count: 9, icon: BarChart3, color: 'text-emerald-400', link: '/admin/activity-reports' },
    { label: 'Cloud Storage', count: 'Cloudinary Ready', icon: ShieldCheck, color: 'text-[#ffe08d]', link: '/admin/branding' },
  ];

  const quickLinks = [
    { title: 'Contact & Social Details', desc: 'Update official Secretariat phone, email, address & social links', icon: PhoneCall, path: '/admin/contact' },
    { title: 'Logo & Branding', desc: 'Upload main logo, dark logo, light logo and favicon', icon: Scale, path: '/admin/branding' },
    { title: 'SEO & Meta Tags', desc: 'Manage Google search title, description, and keywords', icon: Globe, path: '/admin/seo' },
    { title: 'Media Manager', desc: 'Upload, delete, and organize official photography via Cloudinary', icon: ImageIcon, path: '/admin/media' },
    { title: 'Activity Reports', desc: 'Edit location reports for Malegaon, Delhi, Manipur & Common Report', icon: BarChart3, path: '/admin/activity-reports' },
    { title: 'National Conference 2023', desc: 'Update conference speakers, venue, and event details', icon: Building2, path: '/admin/conference' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#000d25] to-[#001e4d] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ffe08d] bg-[#ffe08d]/10 px-3 py-1 rounded-full border border-[#ffe08d]/20 inline-block">
            Production Enterprise CMS
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome to All India Lawyers Council CMS
          </h1>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            All updates performed here dynamically synchronize across the public website via Firebase Cloud Firestore and Cloudinary image storage.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="bg-[#000d25] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all group hover:scale-[1.02] shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
              </div>
              <p className="text-2xl font-bold text-white mb-1 font-display">{stat.count}</p>
              <span className="text-xs text-white/60 font-medium">{stat.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                className="bg-[#000d25] border border-white/10 hover:border-[#ffe08d]/50 rounded-2xl p-6 transition-all group shadow-md space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffe08d]/10 text-[#ffe08d] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-white group-hover:text-[#ffe08d] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-body">
                  {item.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
