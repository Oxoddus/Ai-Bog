import React, { useState } from 'react';
import { Product } from '../../types';
import {
  X,
  Scale,
  Check,
  Zap,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Star,
  Tag,
  Truck,
  Building2,
  ArrowRightLeft,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';

interface ProductComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  initialProductA?: Product;
  initialProductB?: Product;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  initialProductA,
  initialProductB
}) => {
  // Default to first two products if not provided
  const [productAId, setProductAId] = useState<string>(
    initialProductA?.id || products[0]?.id || ''
  );
  const [productBId, setProductBId] = useState<string>(
    initialProductB?.id || products[1]?.id || products[0]?.id || ''
  );

  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(true);

  if (!isOpen) return null;

  const productA = products.find((p) => p.id === productAId) || products[0];
  const productB = products.find((p) => p.id === productBId) || products[1] || products[0];

  const handleSwap = () => {
    setProductAId(productBId);
    setProductBId(productAId);
  };

  // Preset Comparisons
  const handleApplyPreset = (idA: string, idB: string) => {
    const foundA = products.find((p) => p.id === idA || p.title.toLowerCase().includes(idA));
    const foundB = products.find((p) => p.id === idB || p.title.toLowerCase().includes(idB));
    if (foundA) setProductAId(foundA.id);
    if (foundB) setProductBId(foundB.id);
  };

  // Derived specs helper
  const getDerivedSpecs = (prod?: Product) => {
    if (!prod) return {};
    const titleLower = prod.title.toLowerCase();
    const isLed = prod.category === 'LED Strip' || titleLower.includes('led') || titleLower.includes('backlight');
    const isIc = prod.category === 'IC' || titleLower.includes('ic') || titleLower.includes('winbond');
    const isMb = prod.category === 'Mainboard' || titleLower.includes('mainboard');
    const isTool = prod.category === 'Tools & Equipment' || titleLower.includes('programmer') || titleLower.includes('solder');

    return {
      voltage: isLed ? '3V / 6V Per Kancing (30V - 75V Total)' : isIc ? '3.3V / 1.8V SPI Logic' : isMb ? '12V / 24V / 220V AC Input' : isTool ? '5V USB / 220V AC Power' : 'Standard Voltage',
      chipset: isIc ? 'Winbond / Macronix SPI Flash 8MB' : isMb ? 'MStar / Mediatek / Novatek' : isLed ? 'High-Lumen Aluminium Substrate' : 'Original Silicon IC',
      warranty: isMb ? '1 Bulan Garansi Toko UbayHub' : isTool ? '3 Bulan Garansi Service UbayHub' : 'Garansi Pasang / Tes Normal',
      build: isLed ? 'Plat Alumunium Cepat Lepas Panas + Lensa Cembung Presisi' : isIc ? 'Package SOP-8 / DIP-8 High Temperature Resistance' : isMb ? 'FR-4 Multi-Layer Board High Density' : 'ABS Impact Plastic & Metal Alloy',
      compatibility: isLed ? 'TV Polytron 32" / LG / Samsung / Sharp' : isIc ? 'Chassis TV Universal, CH341A, RT809F, RT809H' : isMb ? 'Polytron PLD 32 Series / Panel HD 1366x768' : 'Universal Electronics Repair Tools'
    };
  };

  const specsA = getDerivedSpecs(productA);
  const specsB = getDerivedSpecs(productB);

  // Helper to determine advantage
  const cheaperProduct = productA && productB ? (productA.price < productB.price ? 'A' : productA.price > productB.price ? 'B' : 'EQUAL') : 'EQUAL';
  const higherRating = productA && productB ? (productA.rating > productB.rating ? 'A' : productA.rating < productB.rating ? 'B' : 'EQUAL') : 'EQUAL';
  const higherStock = productA && productB ? (productA.stock > productB.stock ? 'A' : productA.stock < productB.stock ? 'B' : 'EQUAL') : 'EQUAL';

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-lg">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider">
                COMPARESPEC 2.0 UBAYHUB BLORA
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 flex items-center gap-2">
                Komparasi Produk Elektronik Side-by-Side
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 border ${
                highlightDifferences
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sorot Perbedaan</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Comparison Presets */}
        <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="font-extrabold text-slate-500 dark:text-slate-400 shrink-0 text-[11px]">
            ⚡ Preset Komparasi Populer:
          </span>
          <button
            onClick={() => handleApplyPreset('ic', 'led')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-blue-500 font-bold text-[11px] shrink-0 transition"
          >
            IC Winbond Flash vs Backlight Polytron 32"
          </button>
          <button
            onClick={() => handleApplyPreset('mainboard', 'rt809f')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-blue-500 font-bold text-[11px] shrink-0 transition"
          >
            Mainboard Polytron vs Programmer RT809F
          </button>
          <button
            onClick={() => handleApplyPreset('esp32', 'ic')}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-blue-500 font-bold text-[11px] shrink-0 transition"
          >
            ESP32 IoT vs IC Winbond 8MB
          </button>
        </div>

        {/* Scrollable Side-by-Side Comparison Sheet */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Selectors Bar */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Product A Selector */}
            <div className="md:col-span-5 space-y-1">
              <label className="block text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                PRODUK A (Pilihan Pertama)
              </label>
              <select
                value={productAId}
                onChange={(e) => setProductAId(e.target.value)}
                className="w-full p-2.5 text-xs font-extrabold rounded-xl bg-white dark:bg-slate-900 border border-blue-500/40 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {products.map((p) => (
                  <option key={`a-${p.id}`} value={p.id}>
                    [{p.category}] {p.title} (Rp {p.price.toLocaleString('id-ID')})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center py-1">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:scale-110 transition text-white shadow-md"
                title="Tukar Posisi Produk A dan B"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Product B Selector */}
            <div className="md:col-span-5 space-y-1">
              <label className="block text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                PRODUK B (Pilihan Kedua)
              </label>
              <select
                value={productBId}
                onChange={(e) => setProductBId(e.target.value)}
                className="w-full p-2.5 text-xs font-extrabold rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                {products.map((p) => (
                  <option key={`b-${p.id}`} value={p.id}>
                    [{p.category}] {p.title} (Rp {p.price.toLocaleString('id-ID')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side by Side Product Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Hero Card Product A */}
            <div className={`p-4 rounded-2xl border transition relative space-y-3 ${
              cheaperProduct === 'A' && highlightDifferences
                ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/80 ring-2 ring-blue-500/30'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}>
              {cheaperProduct === 'A' && (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider shadow">
                  🏷️ Opsi Lebih Hemat
                </span>
              )}
              <div className="flex gap-3 items-center">
                <img
                  src={productA.imageUrl}
                  alt={productA.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">{productA.brand} &bull; {productA.category}</span>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2">{productA.title}</h3>
                  <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-1">
                    Rp {productA.price.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(productA)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Beli Produk A</span>
                </button>
                {productA.isAffiliate && productA.affiliateUrl && (
                  <a
                    href={productA.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <span>{productA.affiliatePlatform || 'Shopee'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Hero Card Product B */}
            <div className={`p-4 rounded-2xl border transition relative space-y-3 ${
              cheaperProduct === 'B' && highlightDifferences
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/80 ring-2 ring-emerald-500/30'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}>
              {cheaperProduct === 'B' && (
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider shadow">
                  🏷️ Opsi Lebih Hemat
                </span>
              )}
              <div className="flex gap-3 items-center">
                <img
                  src={productB.imageUrl}
                  alt={productB.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">{productB.brand} &bull; {productB.category}</span>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2">{productB.title}</h3>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    Rp {productB.price.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(productB)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Beli Produk B</span>
                </button>
                {productB.isAffiliate && productB.affiliateUrl && (
                  <a
                    href={productB.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <span>{productB.affiliatePlatform || 'Shopee'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Technical Spec Sheet Comparison Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="bg-slate-900 text-white px-4 py-3 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-400" />
                <span>Tabel Lembar Spesifikasi Teknis (Technical Spec Sheet)</span>
              </span>
              <span className="text-[10px] text-slate-400">Verifikasi Tim Teknisi UbayHub Blora</span>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {/* Row: Harga & Hemat */}
              <div className="grid grid-cols-12 p-3 bg-slate-50 dark:bg-slate-950 font-bold items-center">
                <div className="col-span-4 text-slate-500 font-semibold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-500" />
                  <span>Harga & Hemat Diskon</span>
                </div>
                <div className={`col-span-4 pr-2 font-black text-sm ${cheaperProduct === 'A' ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                  Rp {productA.price.toLocaleString('id-ID')}
                  {productA.originalPrice && (
                    <span className="block text-[10px] text-slate-400 line-through font-normal">
                      Rp {productA.originalPrice.toLocaleString('id-ID')} ({productA.discountPercent}% OFF)
                    </span>
                  )}
                </div>
                <div className={`col-span-4 font-black text-sm ${cheaperProduct === 'B' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                  Rp {productB.price.toLocaleString('id-ID')}
                  {productB.originalPrice && (
                    <span className="block text-[10px] text-slate-400 line-through font-normal">
                      Rp {productB.originalPrice.toLocaleString('id-ID')} ({productB.discountPercent}% OFF)
                    </span>
                  )}
                </div>
              </div>

              {/* Row: Rating & Terjual */}
              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-4 text-slate-500 font-semibold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Rating & Penjualan</span>
                </div>
                <div className="col-span-4 font-bold">
                  ⭐ {productA.rating} / 5.0 ({productA.soldCount} Terjual)
                </div>
                <div className="col-span-4 font-bold">
                  ⭐ {productB.rating} / 5.0 ({productB.soldCount} Terjual)
                </div>
              </div>

              {/* Row: SKU & Kode Komponen */}
              <div className="grid grid-cols-12 p-3 bg-slate-50 dark:bg-slate-950 items-center">
                <div className="col-span-4 text-slate-500 font-semibold">SKU & Kode Komponen</div>
                <div className="col-span-4 font-mono font-bold text-slate-800 dark:text-slate-200">{productA.sku}</div>
                <div className="col-span-4 font-mono font-bold text-slate-800 dark:text-slate-200">{productB.sku}</div>
              </div>

              {/* Row: Tegangan & Daya */}
              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-4 text-slate-500 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tegangan & Konsumsi Daya</span>
                </div>
                <div className="col-span-4 font-extrabold text-blue-600 dark:text-blue-400">{specsA.voltage}</div>
                <div className="col-span-4 font-extrabold text-emerald-600 dark:text-emerald-400">{specsB.voltage}</div>
              </div>

              {/* Row: Chipset & Main IC */}
              <div className="grid grid-cols-12 p-3 bg-slate-50 dark:bg-slate-950 items-center">
                <div className="col-span-4 text-slate-500 font-semibold">Chipset / Arsitektur IC</div>
                <div className="col-span-4 font-bold">{specsA.chipset}</div>
                <div className="col-span-4 font-bold">{specsB.chipset}</div>
              </div>

              {/* Row: Kompatibilitas Perangkat */}
              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-4 text-slate-500 font-semibold">Kompatibilitas Utama</div>
                <div className="col-span-4 font-medium">{specsA.compatibility}</div>
                <div className="col-span-4 font-medium">{specsB.compatibility}</div>
              </div>

              {/* Row: Kualitas Build & Bahan */}
              <div className="grid grid-cols-12 p-3 bg-slate-50 dark:bg-slate-950 items-center">
                <div className="col-span-4 text-slate-500 font-semibold">Material & Substrat</div>
                <div className="col-span-4 font-medium">{specsA.build}</div>
                <div className="col-span-4 font-medium">{specsB.build}</div>
              </div>

              {/* Row: Garansi toko UbayHub */}
              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-4 text-slate-500 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Garansi Resmi & Layanan</span>
                </div>
                <div className="col-span-4 font-extrabold text-emerald-600 dark:text-emerald-400">{specsA.warranty}</div>
                <div className="col-span-4 font-extrabold text-emerald-600 dark:text-emerald-400">{specsB.warranty}</div>
              </div>

              {/* Row: Stok & Rak Gudang Blora */}
              <div className="grid grid-cols-12 p-3 bg-slate-50 dark:bg-slate-950 items-center">
                <div className="col-span-4 text-slate-500 font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>Stok & Lokasi Rak Blora</span>
                </div>
                <div className="col-span-4 font-bold">
                  {productA.stock} unit &bull; {productA.rackLocation || 'Rak Utama'}
                </div>
                <div className="col-span-4 font-bold">
                  {productB.stock} unit &bull; {productB.rackLocation || 'Rak Utama'}
                </div>
              </div>

              {/* Row: Layanan COD */}
              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-4 text-slate-500 font-semibold flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-500" />
                  <span>Layanan COD Blora</span>
                </div>
                <div className="col-span-4 font-bold text-emerald-600 dark:text-emerald-400">
                  {productA.isCod ? '✅ Bayar di Tempat (COD Ready)' : '❌ Non-COD'}
                </div>
                <div className="col-span-4 font-bold text-emerald-600 dark:text-emerald-400">
                  {productB.isCod ? '✅ Bayar di Tempat (COD Ready)' : '❌ Non-COD'}
                </div>
              </div>
            </div>
          </div>

          {/* Expert Recommendation Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900/40 to-orange-950/30 border border-blue-800/50 text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-orange-400 font-black uppercase tracking-wider text-[11px]">
              <Info className="w-4 h-4" />
              <span>Rekomendasi Teknisi UbayHub Blora:</span>
            </div>
            <p className="text-slate-300">
              Apabila Anda membutuhkan solusi paling ekonomis untuk perbaikan cepat, pilih{' '}
              <strong className="text-white">{cheaperProduct === 'A' ? productA.title : productB.title}</strong>.
              Semua sparepart yang dijual di UbayHub Blora telah melalui verifikasi pengujian fisik dan fungsional di workshop central kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
