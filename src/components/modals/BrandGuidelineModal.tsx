import React from 'react';
import { Logo } from '../common/Logo';
import { X, Palette, CheckCircle, Download, FileText, Sparkles, Layers } from 'lucide-react';

interface BrandGuidelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuidelineModal: React.FC<BrandGuidelineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">UbayHub Brand Guidelines & Logo Identity</h2>
              <p className="text-xs text-slate-300">Panduan Identitas Visual, Logo, & Standar Branding Resmi UbayHub Blora</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-slate-800 dark:text-slate-200 text-sm">
          {/* Brand Summary */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Positioning Brand
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                UbayHub &bull; "Toko Elektronik Online & Offline Terlengkap di Blora"
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Portal elektronik, pusat service elektronik, download firmware, sparepart elektronik, toko elektronik online & offline, komunitas teknisi, dan pusat edukasi elektronik terbesar di Kabupaten Blora.
              </p>
            </div>
            <a
              href="#download-assets"
              onClick={(e) => {
                e.preventDefault();
                alert("Mengunduh Paket Brand Kit UbayHub (Logo SVG, EPS, PNG, Favicon, Color Palette PDF)...");
              }}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Brand Kit (ZIP)</span>
            </a>
          </div>

          {/* Logo Variations Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-500" />
              <span>Variasi Logo Resmi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Full Color Logo */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase">1. Full Color Logo</span>
                <div className="py-4">
                  <Logo variant="full" size="lg" showTagline={false} />
                </div>
                <p className="text-[11px] text-slate-500">Guna utama: Header website, media sosial, banner promosi & aplikasi android.</p>
              </div>

              {/* Monochrome Logo */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase">2. Monochrome Logo</span>
                <div className="py-4">
                  <Logo variant="monochrome" size="lg" showTagline={false} />
                </div>
                <p className="text-[11px] text-slate-500">Guna utama: Nota cetak, stiker garansi teknisi, faktur & dokumen formal.</p>
              </div>

              {/* Icon Only & Favicon */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase">3. Icon Only & Favicon</span>
                <div className="py-2 flex items-center gap-4">
                  <Logo variant="icon-only" size="lg" />
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    <Logo variant="icon-only" size="sm" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">Guna utama: Favicon browser, avatar sosial media & icon aplikasi mobile.</p>
              </div>
            </div>
          </div>

          {/* Color Palette Specification */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span>Palet Warna Utama (Color Palette)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-blue-600 text-white space-y-1 shadow-sm">
                <div className="text-xs font-bold">Royal Tech Blue</div>
                <div className="text-[11px] opacity-90">HEX: #2563EB</div>
                <div className="text-[10px] opacity-75">RGB: (37, 99, 235)</div>
              </div>

              <div className="p-3 rounded-xl bg-orange-500 text-white space-y-1 shadow-sm">
                <div className="text-xs font-bold">Electric Orange</div>
                <div className="text-[11px] opacity-90">HEX: #F97316</div>
                <div className="text-[10px] opacity-75">RGB: (249, 115, 22)</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 text-white space-y-1 shadow-sm border border-slate-800">
                <div className="text-xs font-bold">Deep Slate Dark</div>
                <div className="text-[11px] opacity-90">HEX: #0F172A</div>
                <div className="text-[10px] opacity-75">RGB: (15, 23, 42)</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white space-y-1 shadow-sm border border-slate-300 dark:border-slate-700">
                <div className="text-xs font-bold">Clean Canvas Light</div>
                <div className="text-[11px] opacity-90">HEX: #F8FAFC</div>
                <div className="text-[10px] opacity-75">RGB: (248, 250, 252)</div>
              </div>
            </div>
          </div>

          {/* Logo Concept Explanation */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Filosofi & Simbolisme Elemen Logo UbayHub:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Icon Chip IC & Pin:</strong> Memvisualisasikan UbayHub sebagai pusat komponen & firmware elektronika terbesar.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Jalur PCB Circuit:</strong> Melambangkan jaringan komunitas teknisi dan integrasi sistem digital modern.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Petir Listrik & Solder/Obeng:</strong> Simbol kecepatan eksekusi service, energi listrik, dan keterampilan teknik.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Huruf U Modern:</strong> Identitas kuat nama UbayHub yang profesional, ramah, dan mudah diingat.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
