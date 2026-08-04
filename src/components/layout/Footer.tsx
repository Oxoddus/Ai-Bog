import React from 'react';
import { Logo } from '../common/Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Youtube,
  Facebook,
  Instagram,
  Palette,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openBrandModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openBrandModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" size="lg" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Portal elektronik, pusat service elektronik, download firmware, sparepart elektronik,
              toko elektronik online & offline, komunitas teknisi, dan pusat edukasi elektronik terbesar di Kabupaten Blora.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Jl. Pemuda No. 88 (Selatan Alun-Alun Blora), Kec. Blora, Kab. Blora, Jawa Tengah 58219</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>WhatsApp Hotline: 0813-2688-9900 / (0296) 531889</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Email: support@ubayhub.id / teknisi@ubayhub.id</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Jam Buka: Senin - Sabtu (08.00 - 20.00 WIB)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-orange-500/30 pb-1.5 inline-block">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentTab('firmware')}
                  className="hover:text-orange-400 transition flex items-center gap-1.5"
                >
                  <span>Download Firmware BIN</span>
                  <span className="text-[9px] bg-blue-900 text-blue-200 px-1 rounded">Anti Link Mati</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('shop')}
                  className="hover:text-orange-400 transition"
                >
                  Toko Sparepart & Component
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('service')}
                  className="hover:text-orange-400 transition"
                >
                  Service Luar Kota & Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('articles')}
                  className="hover:text-orange-400 transition"
                >
                  Database Kasus Kerusakan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('technicians')}
                  className="hover:text-orange-400 transition"
                >
                  Direktori Teknisi Blora
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kategori Elektronik */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-orange-500/30 pb-1.5 inline-block">
              Kategori Perbaikan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>TV LED / LCD / Smart TV</li>
              <li>Mesin Cuci Otomatis</li>
              <li>Kulkas & Freezer Inverter</li>
              <li>AC Split & Ducting</li>
              <li>Laptop Mati Total</li>
              <li>Arduino, ESP32 & IoT Modul</li>
              <li>Power Supply & Inverter</li>
            </ul>
          </div>

          {/* Col 4: Komunitas & Media Sosial */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-orange-500/30 pb-1.5 inline-block">
              Komunitas & Sosmed
            </h4>
            <p className="text-xs text-slate-400">
              Bergabung dengan ribuan teknisi elektronika se-Indonesia di grup Telegram & Channel UbayHub.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://t.me/ubayhub_teknisi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
              <a
                href="https://youtube.com/@ubayhub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>YouTube</span>
              </a>
              <a
                href="https://facebook.com/ubayhub.blora"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-800/20 text-blue-300 hover:bg-blue-800 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://instagram.com/ubayhub_blora"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>

            <button
              onClick={openBrandModal}
              className="mt-3 w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-orange-400 hover:text-orange-300 hover:border-orange-500/50 transition flex items-center justify-center gap-2"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Download Brand Guidelines & Assets</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>&copy; {new Date().getFullYear()} UbayHub Blora. Hak Cipta Dilindungi Undang-Undang.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Server Status: <span className="text-emerald-400 font-bold">100% Online (Blora Node #1)</span></span>
            <span>•</span>
            <span>Enterprise Security (Argon2 / Signed Tokens)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
