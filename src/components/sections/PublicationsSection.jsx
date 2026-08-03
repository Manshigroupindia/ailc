import React from 'react';
import { publicationsData } from '@/data/mockData';
import { PublicationCard } from '../ui/PublicationCard';
import { useModal } from '@/context/ModalContext';

export const PublicationsSection = () => {
  const { openModal } = useModal();

  const handleDownload = (pub) => {
    openModal({
      title: `Downloading: ${pub.title}`,
      content: (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-secondary font-bold text-xl">
            PDF
          </div>
          <h4 className="font-headline-sm text-primary text-lg">{pub.title}</h4>
          <p className="text-sm text-outline">Size: {pub.size} • Format: {pub.format}</p>
          <p className="text-xs text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
            Document download started automatically. Check your browser downloads folder.
          </p>
        </div>
      ),
    });
  };

  return (
    <div className="bg-surface-container rounded-2xl p-8 lg:p-10 border border-surface-variant shadow-premium">
      <h2 className="font-headline-md text-headline-md text-primary mb-8">Publications</h2>
      <div className="space-y-6">
        {publicationsData.map((pub) => (
          <PublicationCard key={pub.id} pub={pub} onDownload={handleDownload} />
        ))}
      </div>
    </div>
  );
};
