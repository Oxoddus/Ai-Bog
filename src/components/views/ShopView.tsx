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
  Percent
} from 'lucide-react';

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
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'IC', 'LED Strip', 'Mainboard', 'Tools & Equipment', 'Arduino & ESP32 / IoT'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
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

        <button
          onClick={openCheckout}
          className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Lihat Keranjang & Faktur Order</span>
        </button>
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
                  <div className="space-y-1">
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Beli di {p.affiliatePlatform} (Affiliate)</span>
                    </a>
                  </div>
                ) : null}

                <button
                  onClick={() => handleAddCartLocal(p)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition"
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
        ))}
      </div>
    </div>
  );
};
