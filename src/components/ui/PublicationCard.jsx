import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export const PublicationCard = ({ pub, onDownload }) => {
  const { title, size, format } = pub;

  return (
    <motion.div
      whileHover={{ x: 6 }}
      className="p-6 bg-white rounded-xl shadow-sm border-l-4 border-primary transition-all hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <FileText className="w-9 h-9 text-secondary flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-label-lg mb-1 leading-snug text-primary">{title}</h4>
          <p className="text-xs opacity-60 mb-3">
            Size: {size} • {format}
          </p>
          <button
            onClick={() => onDownload && onDownload(pub)}
            className="flex items-center gap-2 text-primary font-button text-xs group hover:text-secondary transition-colors"
          >
            DOWNLOAD NOW
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
