import React from 'react';
import { newsData, publicationsData } from '@/data/mockData';
import { FileText, ArrowRight, Download } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export const NewsAndPublicationsSection = () => {
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

  const handleDownload = (pub) => {
    openModal({
      title: `Downloading: ${pub.title}`,
      content: (
        <div className="text-center py-6 space-y-4">
          <FileText className="w-16 h-16 text-primary mx-auto" />
          <h4 className="font-headline-sm text-primary text-lg font-bold">{pub.title}</h4>
          <p className="text-sm text-outline">{pub.details}</p>
          <p className="text-xs text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
            Document download started automatically. Check your browser downloads folder.
          </p>
        </div>
      ),
    });
  };

  return (
    <section id="news" className="py-xl bg-[#f2f4f6]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Left 2 Cols: Latest News */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-secondary tracking-widest uppercase font-semibold">
              MEDIA & PUBLICATIONS
            </span>
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
              className="text-xs font-semibold text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1"
            >
              BROWSE ALL NEWS <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* News Items Stack */}
          <div className="space-y-6">
            {newsData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNewsClick(item)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-surface-variant flex flex-col md:flex-row gap-6 cursor-pointer group hover:border-secondary-fixed/40 transition-all"
              >
                <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-outline">{item.date}</span>
                    <span className="text-primary font-bold text-[11px] group-hover:underline uppercase tracking-wider flex items-center gap-1">
                      READ FULL STORY →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Publications Panel */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-surface-variant flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-primary mb-2">Publications</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Download our quarterly journals, annual reports, and legal resources.
            </p>

            <div className="space-y-4">
              {publicationsData.map((pub) => (
                <div
                  key={pub.id}
                  className="p-4 bg-[#f8f9fb] rounded-xl border border-surface-variant flex items-start gap-4 hover:border-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-sm text-primary truncate mb-1">
                      {pub.title}
                    </h4>
                    <p className="text-[11px] text-outline mb-2">{pub.details}</p>
                    <button
                      onClick={() => handleDownload(pub)}
                      className="text-[11px] font-bold text-primary hover:text-secondary uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      DOWNLOAD <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
