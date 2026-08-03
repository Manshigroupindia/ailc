import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Scale, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const PagePlaceholder = ({
  title = "Page Title",
  breadcrumbs = [{ label: 'Home', path: '/' }],
  description = "Official document and archival section of the All India Lawyers Council.",
  icon: IconComponent = Scale,
  categoryTag = "INSTITUTIONAL PORTAL",
  children
}) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Hero Banner with Dark Navy & Gold Accents */}
      <div className="bg-[#000d25] text-white py-12 md:py-16 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffe08d_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4 flex-wrap">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />}
                  {isLast ? (
                    <span className="text-[#ffe08d] font-semibold">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Title & Tag */}
          <span className="inline-block px-3 py-1 bg-[#ffe08d]/10 border border-[#ffe08d]/30 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase mb-3">
            {categoryTag}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed font-body">
            {description}
          </p>
        </div>
      </div>

      {/* Main Content Area / Content Coming Soon */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
        {children ? (
          children
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-sm border border-surface-variant max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#000d25]/5 border border-[#000d25]/10 flex items-center justify-center mx-auto mb-6 text-[#000d25]">
              <IconComponent className="w-10 h-10 text-[#000d25]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5" /> ARCHIVAL PREPARATION IN PROGRESS
            </span>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-3">
              {title} Section
            </h2>

            <p className="text-sm text-outline max-w-lg mx-auto mb-8 leading-relaxed">
              Official records, verified documentation, and legal frameworks for <strong>{title}</strong> are being updated by the All India Lawyers Council Secretariat. Full content will be published shortly.
            </p>

            <div className="pt-6 border-t border-surface-variant flex flex-wrap justify-center items-center gap-4 text-xs text-outline font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#ffe08d]" /> AILC Verified Resource
              </span>
              <span>•</span>
              <span>Updated Term 2023–2026</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
