import React, { useState } from 'react';
import { Firmware, Product, ServiceOrder, Article, AdBanner, CategoryType } from '../../types';
import { AdBannerComponent } from '../common/AdBannerComponent';
import {
  Download,
  ShoppingBag,
  Wrench,
  BookOpen,
  Search,
  ShieldCheck,
  CheckCircle,
  Truck,
  Star,
  Cpu,
  Bot,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  Flame,
  Zap
} from 'lucide-react';

interface HomeViewProps {
  firmwares: Firmware[];
  products: Product[];
  serviceOrders: ServiceOrder[];
  articles: Article[];
  ads: AdBanner[];
  setCurrentTab: (tab: string) => void;
  openAiModal: () => void;
  openFirmwareModal: (fw: Firmware) => void;
  onAdClick: (adId: string) => void;
  onTrackSubmit: (code: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  firmwares,
  products,
  serviceOrders,
  articles,
  ads,
  setCurrentTab,
  openAiModal,
  openFirmwareModal,
  onAdClick,
  onTrackSubmit
}) => {
  const [trackCodeInput, setTrackCodeInput] = useState('');

  const handleTrackSubmitLocal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCodeInput.trim()) return;
    onTrackSubmit(trackCodeInput.trim());
    setCurrentTab('service');
  };

  const categoriesList: { name: CategoryType; iconName: string; count: number }[] = [
    { name: 'TV LED/LCD', iconName: '📺', count: 1840 },
    { name: 'Smart TV & Android TV', iconName: '📱', count: 620 },
    { name: 'Mesin Cuci', iconName: '🧺', count: 430 },
    { name: 'Kulkas & Freezer', iconName: '❄️', count: 510 },
    { name: 'Air Conditioner (AC)', iconName: '💨', count: 390 },
    { name: 'Laptop & Computer', iconName: '💻', count: 880 },
    { name: 'Power Supply & Inverter', iconName: '⚡', count: 720 },
    { name: 'Arduino & ESP32 / IoT', iconName: '🤖', count: 950 },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Ad Banner Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdBannerComponent location="Header Banner" ads={ads} onAdClick={onAdClick} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-12 md:py-16 border-y border-slate-800">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black tracking-wider uppercase">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>TOKO ELEKTRONIK ONLINE & OFFLINE TERLENGKAP DI BLORA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                Toko Elektronik Online & Offline <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 bg-clip-text text-transparent">Terlengkap di Blora</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Portal elektronik, pusat service profesional, download firmware BIN 100% tested, toko sparepart IC original, serta komunitas teknisi terbesar di Kabupaten Blora.
              </p>

              {/* Quick Action Badges / CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('firmware')}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Firmware BIN</span>
                </button>

                <button
                  onClick={() => setCurrentTab('service')}
                  className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg hover:shadow-orange-500/25 transition"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Service Luar Kota (COD)</span>
                </button>

                <button
                  onClick={openAiModal}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-orange-500 text-orange-300 font-extrabold text-xs flex items-center gap-2 transition"
                >
                  <Bot className="w-4 h-4 text-orange-400" />
                  <span>UbayAI Diagnosis</span>
                </button>
              </div>

              {/* Service Tracking Bar inside Hero */}
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-orange-400" />
                  <span>Cek Resi & Status Perbaikan Perangkat Anda:</span>
                </span>
                <form onSubmit={handleTrackSubmitLocal} className="flex gap-2">
                  <input
                    type="text"
                    value={trackCodeInput}
                    onChange={(e) => setTrackCodeInput(e.target.value)}
                    placeholder="Masukkan Kode Servis (Contoh: UB-2026-8891)"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shrink-0"
                  >
                    Lacak Status
                  </button>
                </form>
              </div>
            </div>

            {/* Right Col: Hero Card / Stats Highlight */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Statistik UbayHub Blora</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold">
                    LIVE DATA 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-orange-400">14.800+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Download Firmware BIN</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-blue-400">2.450+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Perangkat Berhasil Di-Service</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400">120+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Teknisi Terverifikasi Blora</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">5.000+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Stok Sparepart IC & LED</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 text-[11px] text-blue-200 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sistem Download Firmware Anti Link Mati dengan Mapped UUID & Signed Token.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kategori Spesialisasi & Sparepart</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pilih modul perbaikan & suku cadang berdasarkan jenis perangkat</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categoriesList.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentTab('firmware')}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition text-center space-y-1.5 group"
            >
              <div className="text-2xl group-hover:scale-110 transition duration-200">{cat.iconName}</div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 block">{cat.count} Files</span>
            </button>
          ))}
        </div>
      </section>

      {/* Ad Banner Homepage Middle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBannerComponent location="Homepage Banner" ads={ads} onAdClick={onAdClick} />
      </div>

      {/* Grid Section: Featured Firmwares & Top Spareparts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Featured Firmware Downloads */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Firmware Terbaru Teruji (Verified BIN)</h2>
              </div>
              <button
                onClick={() => setCurrentTab('firmware')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua Firmware</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {firmwares.map((fw) => (
                <div
                  key={fw.uuid}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {fw.manufacturer}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        {fw.mainboard}
                      </span>
                      <span className="text-[10px] text-slate-400">Size: {fw.fileSize}</span>
                    </div>

                    <h3
                      onClick={() => openFirmwareModal(fw)}
                      className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-1"
                    >
                      {fw.title}
                    </h3>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Chipset: <strong>{fw.chipset}</strong></span>
                      <span>&bull;</span>
                      <span>IC: <strong>{fw.ic}</strong></span>
                      <span>&bull;</span>
                      <span>Download: <strong>{fw.downloadsCount}x</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => openFirmwareModal(fw)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download BIN</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Featured Sparepart Store & Affiliate */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Toko Sparepart Blora</h2>
              </div>
              <button
                onClick={() => setCurrentTab('shop')}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                <span>Toko</span>
              </button>
            </div>

            <div className="space-y-3">
              {products.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-sm hover:shadow transition"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-200 dark:border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                      {prod.category}
                    </span>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                      {prod.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-extrabold text-xs text-orange-600 dark:text-orange-400">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                      {prod.isCod && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-1 rounded">
                          COD Blora
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Ad Placement */}
            <AdBannerComponent location="Sidebar Kanan" ads={ads} onAdClick={onAdClick} />
          </div>
        </div>
      </section>

      {/* Official Affiliate Ecosystem Channels (Shopee, TikTok Shop, Tokopedia) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 tracking-wider">
                Ecosystem Marketplace & Partner Affiliate
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Official Marketplace & Link Affiliate UbayHub Blora
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('shop')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Jelajahi Katalog Toko & Affiliate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Shopee Affiliate Card */}
            <a
              href="https://shopee.co.id/search?keyword=ubayhub+blora"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/30 hover:border-orange-500/60 transition group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-orange-600 text-white font-black text-[11px]">
                  🛍️ Shopee Star Seller
                </span>
                <ExternalLink className="w-4 h-4 text-orange-500 group-hover:translate-x-0.5 transition" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Shopee Official Store & Affiliate</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Gratis Ongkir Extra, Cashback XTRA & COD Seluruh Indonesia. Komisi affiliate hingga 8%.
                </p>
              </div>
              <div className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                <span>Kunjungi Lapak Shopee</span>
                <span>&rarr;</span>
              </div>
            </a>

            {/* TikTok Shop Affiliate Card */}
            <a
              href="https://tiktok.com/@ubayhub_blora"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/10 via-stone-900/5 to-transparent border border-slate-700/50 hover:border-slate-500/80 transition group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-slate-950 text-white font-black text-[11px] border border-slate-700">
                  🎵 TikTok Shop Official
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">TikTok Live Shopping & Affiliate</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Live streaming tutorial perbaikan TV & sikat voucher diskon khusus followers TikTok.
                </p>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1">
                <span>Tonton Live & Beli TikTok Shop</span>
                <span>&rarr;</span>
              </div>
            </a>

            {/* Tokopedia Affiliate Card */}
            <a
              href="https://tokopedia.com/search?q=ubayhub+blora"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 hover:border-emerald-500/60 transition group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-black text-[11px]">
                  🟢 Tokopedia Power Merchant
                </span>
                <ExternalLink className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Tokopedia Official Store</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Pengiriman GoSend/GrabExpress sameday & bebas ongkir Tokopedia dengan jaminan original.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>Kunjungi Store Tokopedia</span>
                <span>&rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Service Outside Blora CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
              Layanan Service Luar Kota Seluruh Indonesia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Punya Perangkat Rusak Tapi Jauh dari Blora? Kirimkan ke UbayHub!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Sistem penerimaan perbaikan profesional dengan garansi penuh, panduan cara packing aman, update status transparan, serta pengiriman balik menggunakan paket COD JNE/J&T/Sicepat.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('service')}
            className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm shadow-xl hover:shadow-orange-500/30 transition shrink-0 flex items-center gap-2"
          >
            <Wrench className="w-5 h-5" />
            <span>Formulir Service Luar Kota</span>
          </button>
        </div>
      </section>
    </div>
  );
};
