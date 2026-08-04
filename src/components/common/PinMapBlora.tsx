import React, { useState } from 'react';
import { MapPin, Navigation, Compass, PhoneCall, ShieldCheck, Clock, Truck, CheckCircle2, Building2 } from 'lucide-react';

export interface BloraLocationPin {
  id: string;
  name: string;
  type: 'headquarters' | 'branch' | 'kecamatan' | 'custom_pin';
  address: string;
  distanceKm: number;
  deliveryTime: string;
  shippingFee: number;
  isFreeCod: boolean;
  xPercent: number; // For SVG map coordinates
  yPercent: number;
  phone?: string;
  hours?: string;
}

const BLORA_LOCATIONS: BloraLocationPin[] = [
  {
    id: 'ubayhub-hq',
    name: 'UbayHub Workshop Central (Blora Kota)',
    type: 'headquarters',
    address: 'Jl. Pemuda No. 88 (Selatan Alun-Alun), Blora Kota, Jawa Tengah',
    distanceKm: 0,
    deliveryTime: '15 - 30 Menit (Instant UbayHub Express)',
    shippingFee: 0,
    isFreeCod: true,
    xPercent: 50,
    yPercent: 48,
    phone: '0813-2688-9900',
    hours: '08:00 - 20:00 WIB'
  },
  {
    id: 'ubayhub-cepu',
    name: 'UbayHub Service Branch Cepu',
    type: 'branch',
    address: 'Jl. Ronggolawe No. 42, Cepu, Blora, Jawa Tengah',
    distanceKm: 32,
    deliveryTime: '1 - 2 Jam (UbayHub Express)',
    shippingFee: 15000,
    isFreeCod: true,
    xPercent: 82,
    yPercent: 68,
    phone: '0813-2688-9911',
    hours: '08:00 - 18:00 WIB'
  },
  {
    id: 'ubayhub-ngawen',
    name: 'UbayHub Service Branch Ngawen',
    type: 'branch',
    address: 'Jl. Raya Blora-Purwodadi Km 12, Ngawen, Blora',
    distanceKm: 18,
    deliveryTime: '45 - 60 Menit',
    shippingFee: 10000,
    isFreeCod: true,
    xPercent: 32,
    yPercent: 42,
    phone: '0813-2688-9922',
    hours: '08:00 - 18:00 WIB'
  },
  {
    id: 'ubayhub-randublatung',
    name: 'UbayHub Pos Service Randublatung',
    type: 'branch',
    address: 'Jl. Raya Randublatung - Kradenan No. 15, Randublatung',
    distanceKm: 28,
    deliveryTime: '1 - 2 Jam',
    shippingFee: 12000,
    isFreeCod: true,
    xPercent: 55,
    yPercent: 78,
    phone: '0813-2688-9933',
    hours: '08:30 - 17:30 WIB'
  },
  {
    id: 'kec-kunduran',
    name: 'Kecamatan Kunduran',
    type: 'kecamatan',
    address: 'Area Wilayah Kunduran, Blora',
    distanceKm: 25,
    deliveryTime: '1 - 2 Jam',
    shippingFee: 12000,
    isFreeCod: true,
    xPercent: 20,
    yPercent: 38
  },
  {
    id: 'kec-jepon',
    name: 'Kecamatan Jepon',
    type: 'kecamatan',
    address: 'Area Wilayah Jepon, Blora',
    distanceKm: 12,
    deliveryTime: '30 - 45 Menit',
    shippingFee: 8000,
    isFreeCod: true,
    xPercent: 62,
    yPercent: 46
  },
  {
    id: 'kec-todanan',
    name: 'Kecamatan Todanan',
    type: 'kecamatan',
    address: 'Area Wilayah Todanan, Blora',
    distanceKm: 38,
    deliveryTime: '2 - 3 Jam',
    shippingFee: 18000,
    isFreeCod: true,
    xPercent: 18,
    yPercent: 22
  },
  {
    id: 'kec-japah',
    name: 'Kecamatan Japah',
    type: 'kecamatan',
    address: 'Area Wilayah Japah, Blora',
    distanceKm: 22,
    deliveryTime: '1 Jam',
    shippingFee: 10000,
    isFreeCod: true,
    xPercent: 34,
    yPercent: 28
  },
  {
    id: 'kec-tunjungan',
    name: 'Kecamatan Tunjungan',
    type: 'kecamatan',
    address: 'Area Wilayah Tunjungan, Blora',
    distanceKm: 8,
    deliveryTime: '20 - 30 Menit',
    shippingFee: 0,
    isFreeCod: true,
    xPercent: 44,
    yPercent: 36
  },
  {
    id: 'kec-bogorejo',
    name: 'Kecamatan Bogorejo',
    type: 'kecamatan',
    address: 'Area Wilayah Bogorejo, Blora',
    distanceKm: 19,
    deliveryTime: '45 - 60 Menit',
    shippingFee: 10000,
    isFreeCod: true,
    xPercent: 70,
    yPercent: 32
  },
  {
    id: 'kec-sambong',
    name: 'Kecamatan Sambong',
    type: 'kecamatan',
    address: 'Area Wilayah Sambong, Blora',
    distanceKm: 26,
    deliveryTime: '1 - 1.5 Jam',
    shippingFee: 12000,
    isFreeCod: true,
    xPercent: 76,
    yPercent: 60
  },
  {
    id: 'kec-kradenan',
    name: 'Kecamatan Kradenan',
    type: 'kecamatan',
    address: 'Area Wilayah Kradenan / Menden, Blora',
    distanceKm: 36,
    deliveryTime: '2 Jam',
    shippingFee: 15000,
    isFreeCod: true,
    xPercent: 65,
    yPercent: 88
  }
];

interface PinMapBloraProps {
  onSelectPin?: (pin: BloraLocationPin) => void;
  compact?: boolean;
}

export const PinMapBlora: React.FC<PinMapBloraProps> = ({ onSelectPin, compact = false }) => {
  const [selectedPin, setSelectedPin] = useState<BloraLocationPin>(BLORA_LOCATIONS[0]);
  const [customSearch, setCustomSearch] = useState('');

  const handlePinClick = (pin: BloraLocationPin) => {
    setSelectedPin(pin);
    if (onSelectPin) {
      onSelectPin(pin);
    }
  };

  const filteredLocations = BLORA_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(customSearch.toLowerCase()) ||
    loc.address.toLowerCase().includes(customSearch.toLowerCase())
  );

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-black text-[10px] uppercase tracking-wider">
            📍 PINMAP KABUPATEN BLORA OFFICIAL
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <Compass className="w-5 h-5 text-orange-500" />
            <span>Peta Lokasi Toko & Radii Pengiriman COD UbayHub Blora</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Jangkauan pengiriman instant UbayHub Express & layanan jemput-antar service elektronik di 16 Kecamatan Kabupaten Blora.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Gratis Ongkir COD 0-5 KM Blora Kota</span>
          </span>
        </div>
      </div>

      {/* Interactive Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Interactive Map Container */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 relative min-h-[320px] sm:min-h-[380px] overflow-hidden flex flex-col justify-between">
          {/* Map Grid Lines Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Map Title Overlay */}
          <div className="relative z-10 flex justify-between items-center bg-slate-900/90 backdrop-blur p-2.5 rounded-xl border border-slate-800 text-white text-xs">
            <div className="flex items-center gap-2 font-bold">
              <Navigation className="w-4 h-4 text-orange-400 animate-spin" />
              <span>Peta Wilayah Kabupaten Blora</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Blora Central HQ (-6.9697, 111.4184)</span>
          </div>

          {/* Interactive SVG Pin Canvas */}
          <div className="relative w-full h-[260px] sm:h-[300px] my-auto">
            {/* Blora Administrative District Outline Simulation */}
            <svg className="w-full h-full text-blue-900/40" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 15 20 Q 30 10, 50 15 Q 75 10, 88 25 Q 95 45, 85 65 Q 75 90, 55 92 Q 30 90, 15 75 Q 8 45, 15 20 Z"
                fill="currentColor"
                stroke="#1e3a8a"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </svg>

            {/* Render Pins */}
            {BLORA_LOCATIONS.map((loc) => {
              const isSelected = selectedPin.id === loc.id;
              const isHq = loc.type === 'headquarters';
              const isBranch = loc.type === 'branch';

              return (
                <button
                  key={loc.id}
                  onClick={() => handlePinClick(loc)}
                  style={{ left: `${loc.xPercent}%`, top: `${loc.yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all transform hover:scale-125 group z-20 ${
                    isSelected ? 'scale-125 z-30' : ''
                  }`}
                  title={`${loc.name} - ${loc.distanceKm} KM`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring for HQ and selected */}
                    {(isHq || isSelected) && (
                      <span className={`absolute w-8 h-8 rounded-full animate-ping opacity-75 ${
                        isHq ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                    )}

                    <div className={`p-2 rounded-full shadow-lg border-2 flex items-center justify-center text-white font-bold transition ${
                      isHq
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 border-white ring-2 ring-orange-500/50'
                        : isBranch
                        ? 'bg-blue-600 border-blue-300'
                        : isSelected
                        ? 'bg-emerald-600 border-white ring-2 ring-emerald-500/50'
                        : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}>
                      {isHq ? (
                        <Building2 className="w-4 h-4 text-white" />
                      ) : isBranch ? (
                        <MapPin className="w-3.5 h-3.5 text-blue-200" />
                      ) : (
                        <span className="text-[9px] font-mono px-0.5">{loc.name.substring(4, 7)}</span>
                      )}
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg border border-slate-700 shadow-xl pointer-events-none z-40">
                      {loc.name} ({loc.distanceKm} km)
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur p-2 rounded-xl border border-slate-800 text-[10px] text-slate-300">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-white" />
                <span>Central HQ Blora</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white" />
                <span>Cabang Service</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-500" />
                <span>Kecamatan Blora</span>
              </span>
            </div>
            <span className="text-orange-400 font-bold">Klik Pin untuk Cek Ongkir & Radius COD</span>
          </div>
        </div>

        {/* Pin Details & Selection Drawer */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Active Pin Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 text-white border border-blue-800/60 shadow-lg space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                  selectedPin.type === 'headquarters'
                    ? 'bg-orange-500 text-white'
                    : selectedPin.type === 'branch'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {selectedPin.type === 'headquarters'
                    ? 'WORKSHOP CENTRAL UTAMA'
                    : selectedPin.type === 'branch'
                    ? 'CABANG SERVICE RESMI'
                    : 'WILAYAH PENGIRIMAN COD'}
                </span>
                <h3 className="text-base font-extrabold text-white mt-1">
                  {selectedPin.name}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{selectedPin.address}</p>
              </div>
            </div>

            {/* Delivery Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Jarak dari Central HQ:</span>
                <span className="text-sm font-black text-orange-400">{selectedPin.distanceKm} KM</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Ongkir UbayHub Express:</span>
                <span className="text-sm font-black text-emerald-400">
                  {selectedPin.shippingFee === 0 ? 'GRATIS (0-5 KM)' : `Rp ${selectedPin.shippingFee.toLocaleString('id-ID')}`}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Estimasi Waktu Sampai: <strong>{selectedPin.deliveryTime}</strong></span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Status COD: <strong className="text-emerald-400">✅ Layan COD Bayar di Tempat</strong></span>
              </div>

              {selectedPin.phone && (
                <div className="flex items-center gap-2 text-slate-300 pt-1">
                  <PhoneCall className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Kontak Cabang: <strong>{selectedPin.phone}</strong></span>
                </div>
              )}
            </div>

            {onSelectPin && (
              <button
                type="button"
                onClick={() => onSelectPin(selectedPin)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Gunakan Lokasi Ini untuk Delivery / Service COD</span>
              </button>
            )}
          </div>

          {/* Quick Kecamatan Switcher */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Pilih Kecamatan / Cabang di Blora:
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {BLORA_LOCATIONS.map((loc) => {
                const isSelected = selectedPin.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handlePinClick(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span>{loc.name.replace('Kecamatan ', '')}</span>
                    {loc.type === 'headquarters' && <span className="text-[9px] bg-orange-500 text-white px-1 rounded">HQ</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
