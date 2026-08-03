import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Briefcase } from 'lucide-react';

export const MemberCard = ({ member }) => {
  const { name, designation, phone, email, state, post, address, occupation } = member;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-surface-variant hover:border-[#000d25]/40 transition-all flex flex-col justify-between"
    >
      <div>
        <h4 className="font-display font-bold text-base text-primary mb-1">{name}</h4>
        {designation && (
          <span className="inline-block px-2.5 py-0.5 bg-surface-container rounded-full text-[10px] font-semibold text-secondary uppercase tracking-wider mb-4">
            {designation}
          </span>
        )}

        <div className="space-y-2 text-xs text-on-surface-variant">
          {post && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-outline flex-shrink-0" />
              <span className="font-medium text-primary">{post}</span>
            </div>
          )}
          {occupation && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-outline flex-shrink-0" />
              <span className="font-medium text-primary">{occupation}</span>
            </div>
          )}
          {state && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-outline flex-shrink-0" />
              <span>{state}</span>
            </div>
          )}
          {address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-outline flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{address}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 pt-1">
              <Phone className="w-3.5 h-3.5 text-outline flex-shrink-0" />
              <span className="font-mono text-[11px]">{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-outline flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
