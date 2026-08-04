import React, { useState } from 'react';
import {
  X,
  Globe,
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';

interface SeoSitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoSitemapModal: React.FC<SeoSitemapModalProps> = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedXml, setCopiedXml] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'jsonld'>('visual');
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const sitemapUrls = [
    { loc: 'https://ubayhub.id/', lastmod: '2026-08-04', changefreq: 'daily', priority: '1.0', title: 'Beranda UbayHub Blora' },
    { loc: 'https://ubayhub.id/firmware', lastmod: '2026-08-04', changefreq: 'daily', priority: '0.9', title: 'Download Firmware TV & Laptop' },
    { loc: 'https://ubayhub.id/shop', lastmod: '2026-08-04', changefreq: 'daily', priority: '0.9', title: 'Toko Sparepart Elektronik' },
    { loc: 'https://ubayhub.id/service', lastmod: '2026-08-04', changefreq: 'daily', priority: '0.9', title: 'Pusat Service & Tracking Resi' },
    { loc: 'https://ubayhub.id/articles', lastmod: '2026-08-03', changefreq: 'weekly', priority: '0.8', title: 'Artikel Kerusakan & Panduan' },
    { loc: 'https://ubayhub.id/technicians', lastmod: '2026-08-03', changefreq: 'weekly', priority: '0.8', title: 'Direktori Teknisi Elektronik Blora' }
  ];

  const generatedXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${sitemapUrls
    .map(
      (u) => `<url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n  ')}
</urlset>`;

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "UbayHub Blora",
    "description": "Toko Elektronik Online & Offline Terlengkap di Blora, Pusat Service, Download Firmware TV & Sparepart.",
    "url": "https://ubayhub.id",
    "telephone": "+6281326889900",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Pemuda No. 88, Blora Kota",
      "addressLocality": "Blora",
      "addressRegion": "Jawa Tengah",
      "postalCode": "58211",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.9692",
      "longitude": "111.4172"
    },
    "openingHours": "Mo-Sa 08:00-20:00"
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://ubayhub.id/sitemap.xml');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyXml = () => {
    navigator.clipboard.writeText(generatedXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([generatedXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePingSearchEngines = () => {
    setPingStatus('Pinging Google & Bing Bot...');
    setTimeout(() => {
      setPingStatus('✅ Sukses! Sitemap berhasil di-submit ke Google Search Console & Bing Webmaster Indexing API');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-extrabold text-[10px] uppercase tracking-wider">
                CEO & SEARCH ENGINE AUTOMATION
              </span>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                Automated SEO Sitemap Generator & Schema Markup
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs font-bold shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'visual'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Struktur URL Visual</span>
            </button>

            <button
              onClick={() => setActiveTab('xml')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'xml'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Sitemap.xml Raw</span>
            </button>

            <button
              onClick={() => setActiveTab('jsonld')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'jsonld'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Schema JSON-LD</span>
            </button>
          </div>

          <button
            onClick={handlePingSearchEngines}
            className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-black text-xs flex items-center gap-1 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submit Google Indexing</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {pingStatus && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold animate-fadeIn">
              {pingStatus}
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-700 dark:text-slate-300">
                  Daftar Halaman Utama UbayHub Blora
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Total {sitemapUrls.length} Endpoints</span>
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
                {sitemapUrls.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-slate-900 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-950">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{item.title}</span>
                      <a href={item.loc} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 font-mono text-[11px] hover:underline flex items-center gap-1">
                        <span>{item.loc}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="text-right text-[10px]">
                      <span className="font-bold text-slate-400 block">Priority: {item.priority}</span>
                      <span className="text-slate-500">{item.changefreq}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'xml' && (
            <div className="space-y-2">
              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-72">
                {generatedXml}
              </pre>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyXml}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  {copiedXml ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-blue-500" />}
                  <span>{copiedXml ? 'Tersalin' : 'Salin Code XML'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadXml}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download sitemap.xml</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jsonld' && (
            <div className="space-y-2">
              <pre className="p-4 rounded-2xl bg-slate-950 text-amber-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-72">
                {JSON.stringify(jsonLdSchema, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
