import React, { useState } from 'react';
import { Article, Firmware } from '../../types';
import {
  BookOpen,
  Search,
  Eye,
  Clock,
  Tag,
  Youtube,
  ShieldCheck,
  ChevronRight,
  Download,
  Flame,
  HelpCircle
} from 'lucide-react';

interface ArticlesViewProps {
  articles: Article[];
  firmwares: Firmware[];
  onSelectArticle: (art: Article) => void;
  openFirmwareModal: (fw: Firmware) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  firmwares,
  onSelectArticle,
  openFirmwareModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(articles[0] || null);

  const categories = ['All', 'TV LED/LCD', 'Smart TV & Android TV', 'Kulkas & Freezer', 'Mesin Cuci', 'Laptop & Computer'];

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.errorCode && a.errorCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            Database Kasus Kerusakan Elektronika UbayHub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Panduan Servis, Analisa Tegangan, & Kode Error TV
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Kumpulan catatan kasus perbaikan riil dari workshop UbayHub Blora. Dilengkapi foto titik pengujian tegangan, langkah perbaikan, serta tautan firmware pendukung.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Kasus: Polytron kedip merah, LG webOS restart, T-Con blank putih, kode error..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Kategori: {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols): Article List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredArticles.map((art) => {
            const isSelected = activeArticle?.id === art.id;
            return (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className={`p-4 rounded-2xl cursor-pointer border transition space-y-2 ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {art.category}
                  </span>
                  {art.errorCode && (
                    <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                      [{art.errorCode}]
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {art.title}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {art.excerpt}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Oleh: {art.author}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{art.viewsCount} views</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Article Reader Detail */}
        <div className="lg:col-span-7">
          {activeArticle ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
              <div className="space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 font-bold rounded bg-blue-600 text-white">
                    {activeArticle.category}
                  </span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-500">{activeArticle.date}</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-500">{activeArticle.readTime}</span>
                </div>

                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="text-xs text-slate-500">
                  Penulis: <strong>{activeArticle.author}</strong>
                </div>
              </div>

              {/* Featured Image */}
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-56 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
              />

              {/* Symptoms & Causes Box */}
              {activeArticle.symptoms && activeArticle.symptoms.length > 0 && (
                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 space-y-2 text-xs">
                  <h4 className="font-bold text-orange-800 dark:text-orange-300">Gejala Khas Kerusakan:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {activeArticle.symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Content */}
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>

              {/* Related Firmware Badge */}
              {activeArticle.relatedFirmwareUuid && (
                <div className="p-4 rounded-xl bg-blue-900 text-white flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="text-orange-400 font-bold block">Firmware Terkait Kasus Ini:</span>
                    <span>Tersedia file BIN teruji untuk tipe ini di UbayHub.</span>
                  </div>

                  <button
                    onClick={() => {
                      const fw = firmwares.find((f) => f.uuid === activeArticle.relatedFirmwareUuid);
                      if (fw) openFirmwareModal(fw);
                      else alert("Firmware terkait siap diunduh di tab Firmware.");
                    }}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Firmware BIN</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              Pilih artikel dari daftar di sebelah kiri untuk membaca panduan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
