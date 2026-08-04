import React, { useState } from 'react';
import { AdBanner, AdPlacement } from '../../types';
import { ExternalLink, X, Tag, Sparkles, AlertCircle } from 'lucide-react';

interface AdBannerProps {
  location: AdPlacement;
  ads: AdBanner[];
  onAdClick?: (adId: string) => void;
  className?: string;
}

export const AdBannerComponent: React.FC<AdBannerProps> = ({
  location,
  ads,
  onAdClick,
  className = ''
}) => {
  const [dismissed, setDismissed] = useState(false);

  // Find active ads matching location
  const activeAds = ads.filter(
    (a) => a.active && a.location === location
  ).sort((a, b) => a.priority - b.priority);

  if (dismissed || activeAds.length === 0) {
    return null;
  }

  const currentAd = activeAds[0];

  const handleClick = () => {
    if (onAdClick) {
      onAdClick(currentAd.id);
    }
  };

  return (
    <div className={`relative group overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-900/40 p-1.5 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
      {/* Sponsor Badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/10">
        <Sparkles className="w-3 h-3 text-orange-400" />
        <span>Iklan UbayHub</span>
      </div>

      {/* Dismiss button if sticky or popup */}
      {(location === 'Sticky Bottom' || location === 'Popup') && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 z-20 p-1 rounded-full bg-slate-900/80 text-white/80 hover:text-white hover:bg-slate-800 transition"
          title="Tutup Iklan"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {currentAd.type === 'Image' || currentAd.type === 'Affiliate' ? (
        <a
          href={currentAd.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block relative overflow-hidden rounded-lg group/img"
        >
          <img
            src={currentAd.imageUrl || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1000'}
            alt={currentAd.title}
            className="w-full h-auto max-h-48 object-cover rounded-lg transform group-hover/img:scale-102 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
            <div className="flex items-center justify-between w-full text-white">
              <span className="font-semibold text-sm line-clamp-1 group-hover/img:text-orange-400 transition">
                {currentAd.title}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-orange-300 bg-orange-950/60 px-2 py-1 rounded border border-orange-500/30">
                <ExternalLink className="w-3 h-3" />
                Lihat Promo
              </span>
            </div>
          </div>
        </a>
      ) : currentAd.type === 'HTML / AdSense' ? (
        <div
          onClick={handleClick}
          className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-white/50 dark:bg-slate-900/50"
          dangerouslySetInnerHTML={{ __html: currentAd.htmlCode || '<!-- Google AdSense Container -->' }}
        />
      ) : (
        <div className="p-3 text-center">
          <a
            href={currentAd.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="text-sm font-semibold text-blue-600 hover:underline flex items-center justify-center gap-1"
          >
            {currentAd.title}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
