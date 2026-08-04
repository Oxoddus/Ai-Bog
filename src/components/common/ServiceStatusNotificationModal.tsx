import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Send,
  PhoneCall,
  Clock,
  Wrench,
  AlertTriangle,
  Smartphone,
  Copy,
  Check,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface ServiceStatusNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCode?: string;
  customerName?: string;
  customerPhone?: string;
  deviceType?: string;
  currentStatus?: string;
}

export const ServiceStatusNotificationModal: React.FC<ServiceStatusNotificationModalProps> = ({
  isOpen,
  onClose,
  serviceCode = 'SRV-BLR-8812',
  customerName = 'Bapak Sukarno',
  customerPhone = '081234567890',
  deviceType = 'TV LED Polytron 32 Inch (Mati Total)',
  currentStatus = 'Dalam Pengerjaan'
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [sentWhatsapp, setSentWhatsapp] = useState(false);
  const [sentTelegram, setSentTelegram] = useState(false);
  const [telegramChatId, setTelegramChatId] = useState('@UbayHubBlora_BotChannel');
  const [copiedResi, setCopiedResi] = useState(false);

  if (!isOpen) return null;

  const statusTimeline = [
    { title: 'Diterima di Workshop', desc: 'Perangkat diterima di Workshop UbayHub Jl. Pemuda No. 88 Blora', icon: ShieldCheck },
    { title: 'Pemeriksaan / Diagnosa', desc: 'Pengecekan tegangan PS0, Backlight, dan IC SPI Flash', icon: Wrench },
    { title: 'Menunggu Sparepart', desc: 'Pengambilan part dari Rak A-02 / Order Komponen', icon: Clock },
    { title: 'Dalam Pengerjaan', desc: 'Pengantian IC Flash / Solder Ulang Mainboard', icon: Wrench },
    { title: 'Testing & QC', desc: 'Run test continuous 24 Jam uji ketahanan layar & suara', icon: RefreshCw },
    { title: 'Selesai & Siap Ambil / Kirim', desc: 'Siap diambil di workshop atau dikirim via UbayHub Express COD', icon: CheckCircle2 }
  ];

  const waMessageTemplate = `*NOTIFIKASI UPDATE SERVIS UBAYHUB BLORA*%0A%0A` +
    `Halo *${customerName}*,%0A` +
    `Berikut update pengerjaan servis perangkat Anda:%0A%0A` +
    `📌 Kode Resi: *${serviceCode}*%0A` +
    `📺 Perangkat: *${deviceType}*%0A` +
    `⚡ Status Terkini: *${selectedStatus}*%0A%0A` +
    `Anda dapat memantau progres langsung secara real-time di website: https://ubayhub.id/service%0A%0A` +
    `Terima kasih telah mempercayakan perbaikan di *UbayHub Blora*!`;

  const handleSimulateSendWa = () => {
    setSentWhatsapp(true);
    setTimeout(() => setSentWhatsapp(false), 3000);
    window.open(`https://wa.me/${customerPhone.replace(/[^0-9]/g, '')}?text=${waMessageTemplate}`, '_blank');
  };

  const handleSimulateSendTelegram = () => {
    setSentTelegram(true);
    setTimeout(() => setSentTelegram(false), 3000);
    const tgMsg = `🤖 *AUTOMATED BOT TELEGRAM UBAYHUB BLORA*\n\n` +
      `👤 *Pelanggan:* ${customerName} (${customerPhone})\n` +
      `🏷️ *Resi:* ${serviceCode}\n` +
      `📺 *Perangkat:* ${deviceType}\n` +
      `⚡ *Status Update:* ${selectedStatus}\n\n` +
      `🌐 Real-time Tracking: https://ubayhub.id/service`;
    
    // Open Telegram web share or bot trigger link
    window.open(`https://t.me/share/url?url=${encodeURIComponent('https://ubayhub.id/service')}&text=${encodeURIComponent(tgMsg)}`, '_blank');
  };

  const handleCopyResi = () => {
    navigator.clipboard.writeText(serviceCode);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-lg animate-bounce">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-extrabold text-[10px] uppercase tracking-wider">
                NOTIFIKASI STATUS SERVIS REAL-TIME
              </span>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                Pusat Notifikasi & Tracking Pelanggan
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Customer & Device Ticket Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black text-blue-600 dark:text-blue-400">{serviceCode}</span>
                <button onClick={handleCopyResi} className="text-slate-400 hover:text-slate-600">
                  {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{customerName} ({customerPhone})</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{deviceType}</p>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Status Terdaftar:</span>
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-black text-xs inline-block mt-0.5 shadow">
                {selectedStatus}
              </span>
            </div>
          </div>

          {/* Interactive Progress Timeline */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Tahapan Progress Pengerjaan Servis:
            </h4>

            <div className="space-y-2">
              {statusTimeline.map((step, idx) => {
                const isCurrent = step.title === selectedStatus;
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedStatus(step.title)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/50'
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-blue-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-extrabold text-xs block">{step.title}</span>
                        <span className={`text-[10px] ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>{step.desc}</span>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase shrink-0">
                        AKTIFF
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Automated Notification Action (WhatsApp & Telegram Bot API) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* WhatsApp Dispatch */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-emerald-200">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Notifikasi WhatsApp</span>
              </div>
              <p className="text-[10px] text-slate-300">
                Kirim pesan update status pengerjaan via WhatsApp Web Gateway.
              </p>
              <button
                type="button"
                onClick={handleSimulateSendWa}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sentWhatsapp ? 'WhatsApp Terkirim!' : 'Kirim WA Pelanggan'}</span>
              </button>
            </div>

            {/* Telegram Bot Dispatch */}
            <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-800/60 text-sky-300 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sky-200">
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Notifikasi Bot Telegram</span>
              </div>
              <p className="text-[10px] text-slate-300">
                Kirim broadcast otomatis ke Channel / Group Telegram UbayHub.
              </p>
              <button
                type="button"
                onClick={handleSimulateSendTelegram}
                className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow transition"
              >
                <Send className="w-3.5 h-3.5 text-sky-200" />
                <span>{sentTelegram ? 'Telegram Terkirim!' : 'Kirim Bot Telegram'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
