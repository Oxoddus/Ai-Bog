import React, { useState } from 'react';
import { Technician, Shop } from '../../types';
import {
  Users,
  Store,
  CheckCircle,
  Star,
  MapPin,
  PhoneCall,
  Send,
  ExternalLink,
  Award,
  Clock,
  Wrench
} from 'lucide-react';

interface TechniciansViewProps {
  technicians: Technician[];
  shops: Shop[];
}

export const TechniciansView: React.FC<TechniciansViewProps> = ({
  technicians,
  shops
}) => {
  const [directoryTab, setDirectoryTab] = useState<'technicians' | 'shops'>('technicians');
  const [selectedArea, setSelectedArea] = useState('All');

  const areas = ['All', 'Blora Kota', 'Cepu', 'Kunduran', 'Randublatung'];

  const filteredTechnicians = technicians.filter(
    (t) => selectedArea === 'All' || t.area.includes(selectedArea)
  );

  const filteredShops = shops.filter(
    (s) => selectedArea === 'All' || s.area.includes(selectedArea)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            Direktori Terpercaya Kabupaten Blora
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Teknisi Elektronika & Toko Sparepart Terverifikasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Cari teknisi panggilan terpercaya di Blora Kota, Cepu, Kunduran, Ngawen, Randublatung, dan kecamatan sekitar. Lengkap dengan sertifikat keahlian dan ulasan pelanggan.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setDirectoryTab('technicians')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition ${
              directoryTab === 'technicians'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Direktori Teknisi ({technicians.length})
          </button>
          <button
            onClick={() => setDirectoryTab('shops')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition ${
              directoryTab === 'shops'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Toko Sparepart ({shops.length})
          </button>
        </div>
      </div>

      {/* Area Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="font-bold text-slate-500 shrink-0">Filter Area Blora:</span>
        {areas.map((a) => (
          <button
            key={a}
            onClick={() => setSelectedArea(a)}
            className={`px-3.5 py-1.5 rounded-full font-bold transition shrink-0 ${
              selectedArea === a
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Directory Tab 1: Technicians */}
      {directoryTab === 'technicians' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm hover:shadow transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={tech.photoUrl}
                    alt={tech.name}
                    className="w-16 h-16 object-cover rounded-2xl border-2 border-orange-500 shrink-0 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {tech.name}
                      </h3>
                      {tech.isVerified && (
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{tech.rating} ({tech.reviewCount} ulasan)</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Pengalaman: <strong>{tech.experienceYears} Tahun</strong>
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>Area: <strong>{tech.area}</strong></span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                    <Award className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Sertifikat: {tech.certificates.join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Layanan Keahlian:</span>
                  <div className="flex flex-wrap gap-1">
                    {tech.servicesOffered.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex gap-2">
                <a
                  href={`https://wa.me/${tech.whatsapp}?text=Halo%20${encodeURIComponent(tech.name)},%20saya%20mendapat%20kontak%20Anda%20dari%20UbayHub%20Blora`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Teknisi</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Directory Tab 2: Shops */}
      {directoryTab === 'shops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm hover:shadow transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-16 h-16 object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {shop.name}
                      </h3>
                      {shop.isVerified && (
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{shop.rating} Rating Toko</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Jumlah Produk: <strong>{shop.productsCount}+ Komponen</strong>
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{shop.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{shop.operationalHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex gap-2">
                <a
                  href={shop.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={`https://wa.me/${shop.whatsapp}?text=Halo%20${encodeURIComponent(shop.name)},%20saya%20mau%20tanya%20stok%20sparepart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Toko</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
