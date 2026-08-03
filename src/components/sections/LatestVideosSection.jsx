import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Video } from 'lucide-react';

export const LatestVideosSection = () => {
  const videos = [
    {
      id: 'v-1',
      title: 'AILC National Conference & Legal Awareness Program',
      embedUrl: 'https://www.youtube-nocookie.com/embed/6Zk68oz5iC4',
    },
    {
      id: 'v-2',
      title: 'Advocate Protection & Rights National Summit',
      embedUrl: 'https://www.youtube-nocookie.com/embed/kX91TWggntQ',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#000814] text-white relative overflow-hidden font-body">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffe08d]/15 border border-[#ffe08d]/40 rounded-full text-[11px] font-semibold text-[#ffe08d] tracking-widest uppercase">
            <Video className="w-3.5 h-3.5 text-[#ffe08d]" />
            MEDIA & BROADCASTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Latest Videos
          </h2>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed font-body">
            Watch AILC's latest conferences, legal awareness programs and public initiatives.
          </p>
        </div>

        {/* 2 Responsive Video Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#000d25] border border-white/15 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-950/20 transition-all group flex flex-col"
            >
              {/* Responsive Iframe Container */}
              <div className="relative aspect-video w-full bg-black/40 overflow-hidden">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Title & Metadata Footer */}
              <div className="p-6 flex items-center gap-4 bg-[#000d25] border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#ffe08d]/15 border border-[#ffe08d]/30 text-[#ffe08d] flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-sm sm:text-base text-white leading-snug">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideosSection;
