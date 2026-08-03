import React from 'react';

export const AnnouncementBar = ({ notices = [] }) => {
  return (
    <div className="hidden md:block bg-[#000d25] text-white py-2 overflow-hidden border-b border-white/10 z-50">
      <div className="max-w-container-max mx-auto px-margin-desktop whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-8 text-xs font-medium">
          {notices.concat(notices).map((notice, idx) => (
            <div key={`${notice.id}-${idx}`} className="inline-flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-[#ffe08d]">
                {notice.type}:
              </span>
              <span className="opacity-90">{notice.text}</span>
              <span className="opacity-30 mx-3">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
