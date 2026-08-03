import React from 'react';
import { newsData } from '@/data/mockData';
import { NewsCard } from '../ui/NewsCard';
import { useModal } from '@/context/ModalContext';

export const LatestNewsSection = ({ showAllLink = true }) => {
  const { openModal } = useModal();

  const handleNewsClick = (item) => {
    openModal({
      title: item.title,
      content: (
        <div className="space-y-4">
          <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-xl shadow-md" />
          <div className="flex items-center justify-between text-xs text-outline">
            <span className="text-secondary font-bold uppercase">{item.category}</span>
            <span>{item.date}</span>
          </div>
          <p className="text-body-md text-on-surface-variant leading-relaxed">{item.summary}</p>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            The All India Lawyers Council continues to monitor legislative and judicial updates closely. Full resolutions passed by the executive assembly have been communicated to regional bar associations for implementation.
          </p>
        </div>
      ),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-headline-md text-headline-md text-primary">Latest News</h2>
        {showAllLink && (
          <button
            onClick={() => {
              openModal({
                title: 'AILC News Archive',
                content: (
                  <div className="space-y-4">
                    {newsData.map((n) => (
                      <div key={n.id} className="p-4 bg-surface-container rounded-lg">
                        <span className="text-xs text-secondary uppercase font-semibold">{n.category}</span>
                        <h4 className="font-bold text-primary">{n.title}</h4>
                        <p className="text-xs text-outline mt-1">{n.date}</p>
                      </div>
                    ))}
                  </div>
                ),
              });
            }}
            className="font-button text-sm text-secondary hover:underline cursor-pointer"
          >
            BROWSE ALL
          </button>
        )}
      </div>

      <div className="space-y-8">
        {newsData.map((item, idx) => (
          <React.Fragment key={item.id}>
            <NewsCard news={item} onClick={handleNewsClick} />
            {idx < newsData.length - 1 && <div className="h-px bg-surface-variant w-full" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
