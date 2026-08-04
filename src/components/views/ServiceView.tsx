import React, { useState } from 'react';
import { ServiceOrder } from '../../types';
import {
  Wrench,
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  ShieldCheck,
  Calculator,
  Send,
  AlertCircle,
  ChevronRight,
  MapPin,
  PhoneCall
} from 'lucide-react';

interface ServiceViewProps {
  serviceOrders: ServiceOrder[];
  onSubmitNewService: (order: Partial<ServiceOrder>) => void;
  trackedCode: string;
}

export const ServiceView: React.FC<ServiceViewProps> = ({
  serviceOrders,
  onSubmitNewService,
  trackedCode
}) => {
  const [activeTab, setActiveTab] = useState<'track' | 'submit' | 'packing' | 'faq'>('track');
  const [searchCode, setSearchCode] = useState(trackedCode || 'UB-2026-8891');
  const [searchedOrder, setSearchedOrder] = useState<ServiceOrder | null>(
    serviceOrders.find((s) => s.code.toLowerCase() === searchCode.toLowerCase()) || serviceOrders[0]
  );

  // Form states for new service submission
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Blora Kota');
  const [address, setAddress] = useState('');
  const [deviceType, setDeviceType] = useState('TV LED');
  const [brandModel, setBrandModel] = useState('Polytron PLD32T711');
  const [symptoms, setSymptoms] = useState('Indikator kedip merah, tidak mau start.');
  const [submittedCode, setSubmittedCode] = useState('');

  const handleSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = serviceOrders.find(
      (s) => s.code.toLowerCase().trim() === searchCode.toLowerCase().trim()
    );
    if (found) {
      setSearchedOrder(found);
    } else {
      alert("Kode servis tidak ditemukan. Mohon periksa kembali resi Anda.");
    }
  };

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !symptoms) {
      alert("Mohon lengkapi nama, nomor HP, dan gejala kerusakan!");
      return;
    }

    const newCode = 'UB-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: ServiceOrder = {
      id: 'srv-' + Date.now(),
      code: newCode,
      customerName,
      phone,
      city,
      address,
      deviceType,
      brandModel,
      symptoms,
      estimatedCost: 180000,
      status: 'Diterima',
      createdAt: new Date().toLocaleString('id-ID'),
      isCod: true,
      timeline: [
        {
          status: 'Diterima',
          time: new Date().toLocaleString('id-ID'),
          note: 'Pendaftaran service berhasil. Paket akan dijemput kurir UbayHub / diterima di workshop.',
          completed: true
        },
        { status: 'Pemeriksaan / Diagnosa', time: 'Pending', note: 'Menunggu analisa teknisi UbayHub.', completed: false },
        { status: 'Menunggu Sparepart', time: 'Pending', note: 'Menunggu ketersediaan komponen.', completed: false },
        { status: 'Dalam Pengerjaan', time: 'Pending', note: 'Proses perbaikan hardware.', completed: false },
        { status: 'Testing & QC', time: 'Pending', note: 'Running test kestabilan.', completed: false },
        { status: 'Selesai & Siap Ambil / Kirim', time: 'Pending', note: 'Unit selesai dan siap diserahterimakan.', completed: false }
      ]
    };

    onSubmitNewService(newOrder);
    setSubmittedCode(newCode);
    setSearchedOrder(newOrder);
    setSearchCode(newCode);
    setActiveTab('track');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-orange-950 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            Penerimaan Service Elektronik Seluruh Indonesia
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Lacak Status Servis & Pendaftaran Perbaikan Luar Kota
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Sistem tracking transparan dengan update foto/catatan teknisi real-time, jaminan garansi pengerjaan 1-3 bulan, serta pengiriman balik COD via JNE, J&T, atau Travel.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition ${
              activeTab === 'track'
                ? 'bg-orange-500 text-white shadow'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Lacak Resi
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition ${
              activeTab === 'submit'
                ? 'bg-orange-500 text-white shadow'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Form Service Baru
          </button>
        </div>
      </div>

      {/* Tabs View Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('track')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'track'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          1. Tracking Real-time
        </button>
        <button
          onClick={() => setActiveTab('submit')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'submit'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          2. Formulir Service Luar Kota
        </button>
        <button
          onClick={() => setActiveTab('packing')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'packing'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          3. Panduan Packing Aman
        </button>
      </div>

      {/* Tab 1: Tracking View */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          <form onSubmit={handleSearchTrack} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Masukkan Kode Servis Anda (Contoh: UB-2026-8891)"
              className="flex-1 p-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white uppercase font-bold"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow"
            >
              <Search className="w-4 h-4" />
              <span>Cari Status Resi</span>
            </button>
          </form>

          {searchedOrder && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                    Resi: {searchedOrder.code}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                    {searchedOrder.brandModel} ({searchedOrder.deviceType})
                  </h3>
                  <p className="text-xs text-slate-500">Pemilik: <strong>{searchedOrder.customerName}</strong> &bull; Kota: {searchedOrder.city}</p>
                </div>

                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 text-xs">
                  <span className="text-slate-500 block">Estimasi Biaya:</span>
                  <span className="text-base font-black text-orange-600 dark:text-orange-400">
                    Rp {searchedOrder.estimatedCost.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Timeline Stepper */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Timeline Perjalanan Service:
                </h4>

                <div className="space-y-4 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                  {searchedOrder.timeline.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Circle Dot */}
                      <div
                        className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                          step.completed
                            ? 'bg-emerald-500 border-emerald-300 ring-4 ring-emerald-500/20'
                            : 'bg-slate-300 dark:bg-slate-800 border-slate-400'
                        }`}
                      />

                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
                            {step.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {step.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Submit New Service Form */}
      {activeTab === 'submit' && (
        <form onSubmit={handleSubmitService} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            Formulir Penerimaan Service Elektronik Luar Kota
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Nama Lengkap Pemilik</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Bpk. Suroso"
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Nomor WhatsApp / Telp</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Kota / Kabupaten Asal</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Cepu, Semarang, Kudus, Pati, Tuban..."
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Jenis Perangkat</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
              >
                <option value="TV LED">TV LED / Smart TV</option>
                <option value="Mesin Cuci">Mesin Cuci Otomatis</option>
                <option value="Kulkas / Freezer">Kulkas / Freezer</option>
                <option value="Laptop">Laptop / Notebook</option>
                <option value="Module Power Supply">Module Power Supply / Inverter</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1">Merk & Tipe Perangkat / Mainboard</label>
            <input
              type="text"
              value={brandModel}
              onChange={(e) => setBrandModel(e.target.value)}
              placeholder="Contoh: Polytron PLD32T711 / Mainboard MS33933"
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1">Deskripsi Gejala Kerusakan</label>
            <textarea
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Jelaskan secara rinci kendala yang terjadi pada perangkat..."
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Pendaftaran & Dapatkan Kode Resi Tracking</span>
          </button>
        </form>
      )}

      {/* Tab 3: Packing Guidelines */}
      {activeTab === 'packing' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm text-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span>Panduan Cara Packing Aman Perangkat Elektronik</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">1. Modul Mainboard & IC</h4>
              <p className="text-slate-500 leading-relaxed">
                Bungkus modul dalam kantong anti-statis (ESD Bag), lapisi dengan bubble wrap minimal 3 lapis, lalu kardus tebal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-orange-600 dark:text-orange-400 text-sm">2. Unit TV LED Complete</h4>
              <p className="text-slate-500 leading-relaxed">
                Gunakan proteksi tambahan styrofoam tipis di depan layar panel LCD kaca. Minta opsi packing kayu di ekspedisi JNE/J&T.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">3. Alamat Tujuan Pengiriman</h4>
              <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 p-2 rounded bg-slate-200 dark:bg-slate-900">
                Workshop UbayHub Blora<br />
                Jl. Pemuda No. 88 (Selatan Alun-Alun)<br />
                Blora, Jawa Tengah 58219<br />
                HP: 0813-2688-9900
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
