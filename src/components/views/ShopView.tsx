import React, { useState } from 'react';
import { Product } from '../../types';
import {
  ShoppingBag,
  Search,
  ExternalLink,
  Plus,
  Check,
  Star,
  MapPin,
  Tag,
  Truck,
  ShieldCheck,
  Percent,
  Scale
} from 'lucide-react';
import { ProductComparisonModal } from '../common/ProductComparisonModal';

interface ShopViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  openCheckout: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onAddToCart,
  openCheckout
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [affiliateFilter, setAffiliateFilter] = useState<'All' | 'Shopee' | 'TikTok' | 'Tokopedia' | 'UbayHub'>('All');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Comparison Tool Modal States
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareProductA, setCompareProductA] = useState<Product | undefined>();
  const [compareProductB, setCompareProductB] = useState<Product | undefined>();

  const categories = ['All', 'IC', 'LED Strip', 'Mainboard', 'Tools & Equipment', 'Arduino & ESP32 / IoT'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    let matchesAffiliate = true;
    if (affiliateFilter === 'Shopee') {
      matchesAffiliate = p.isAffiliate && p.affiliatePlatform === 'Shopee';
    } else if (affiliateFilter === 'TikTok') {
      matchesAffiliate = p.isAffiliate && p.affiliatePlatform === 'TikTok Shop';
    } else if (affiliateFilter === 'Tokopedia') {
      matchesAffiliate = p.isAffiliate && p.affiliatePlatform === 'Tokopedia';
    } else if (affiliateFilter === 'UbayHub') {
      matchesAffiliate = !p.isAffiliate;
    }

    return matchesSearch && matchesCategory && matchesAffiliate;
  });

  const handleAddCartLocal = (p: Product) => {
    onAddToCart(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-900 via-amber-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30">
            Toko Online & Offline Toko Elektronik Blora
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Suku Cadang Elektronik, IC Memory, & Tools Teknisi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Sedia komponen siap kirim ke seluruh Indonesia via COD atau beli langsung di Toko UbayHub Blora Kota. Lengkap dengan rekomendasi toko affiliate Shopee, Tokopedia, & TikTok Shop.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => {
              setCompareProductA(products[0]);
              setCompareProductB(products[1]);
              setIsCompareOpen(true);
            }}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg"
          >
            <Scale className="w-4 h-4 text-orange-300" />
            <span>Bandingkan Spesifikasi Produk</span>
          </button>

          <button
            onClick={openCheckout}
            className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Lihat Keranjang & Faktur Order</span>
          </button>
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
              placeholder="Cari IC Flash 25Q64, Backlight Polytron 32, Programmer RT809F, ESP32..."
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

        {/* Affiliate Store Quick Tabs */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mr-1">
            Official Store & Affiliate:
          </span>
          <button
            onClick={() => setAffiliateFilter('All')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition ${
              affiliateFilter === 'All'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Semua Produk
          </button>
          <button
            onClick={() => setAffiliateFilter('Shopee')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition flex items-center gap-1.5 ${
              affiliateFilter === 'Shopee'
                ? 'bg-orange-600 text-white shadow'
                : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 hover:bg-orange-500/20'
            }`}
          >
            <span>🛍️ Shopee Affiliate</span>
          </button>
          <button
            onClick={() => setAffiliateFilter('TikTok')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition flex items-center gap-1.5 ${
              affiliateFilter === 'TikTok'
                ? 'bg-slate-950 text-white shadow ring-1 ring-white/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200'
            }`}
          >
            <span>🎵 TikTok Shop Affiliate</span>
          </button>
          <button
            onClick={() => setAffiliateFilter('Tokopedia')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition flex items-center gap-1.5 ${
              affiliateFilter === 'Tokopedia'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
          >
            <span>🟢 Tokopedia Affiliate</span>
          </button>
          <button
            onClick={() => setAffiliateFilter('UbayHub')}
            className={`px-3 py-1.5 rounded-xl font-extrabold transition flex items-center gap-1.5 ${
              affiliateFilter === 'UbayHub'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <span>🏬 Stok Toko UbayHub Direct</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
          >
            {/* Image & Discount Badge */}
            <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-950">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {p.discountPercent && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px]">
                  -{p.discountPercent}% OFF
                </span>
              )}
              {p.isCod && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                  COD Available
                </span>
              )}
            </div>

            {/* Product Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{p.brand}</span>
                  <span>Stok: <strong>{p.stock} pcs</strong></span>
                </div>

                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {p.title}
                </h3>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-black text-orange-600 dark:text-orange-400">
                    Rp {p.price.toLocaleString('id-ID')}
                  </span>
                  {p.originalPrice && (
                    <span className="text-xs line-through text-slate-400">
                      Rp {p.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {p.description}
                </p>
              </div>

              {/* Affiliate Platform Buttons or Direct Buy */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
                {p.isAffiliate && p.affiliateUrl ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        {p.affiliatePlatform || 'Shopee'} Affiliate
                      </span>
                      {p.affiliateCommission && (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          Komisi: {p.affiliateCommission}
                        </span>
                      )}
                    </div>

                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition ${
                        p.affiliatePlatform === 'Shopee'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
                          : p.affiliatePlatform === 'TikTok Shop'
                          ? 'bg-gradient-to-r from-slate-900 via-stone-900 to-slate-950 hover:from-slate-800 hover:to-stone-900 border border-slate-700'
                          : p.affiliatePlatform === 'Tokopedia'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Beli di {p.affiliatePlatform || 'Shopee'}</span>
                    </a>
                  </div>
                ) : null}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCompareProductA(p);
                      const other = products.find((item) => item.id !== p.id) || p;
                      setCompareProductB(other);
                      setIsCompareOpen(true);
                    }}
                    className="py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                    title="Bandingkan spesifikasi dengan produk lain"
                  >
                    <Scale className="w-3.5 h-3.5 text-orange-500" />
                    <span>Bandingkan</span>
                  </button>

                  <button
                    onClick={() => handleAddCartLocal(p)}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    {addedIds[p.id] ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Masuk Keranjang!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Tambah ke Keranjang UbayHub</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Comparison Tool Modal */}
      <ProductComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={products}
        onAddToCart={onAddToCart}
        initialProductA={compareProductA}
        initialProductB={compareProductB}
      />
    </div>
  );
};
