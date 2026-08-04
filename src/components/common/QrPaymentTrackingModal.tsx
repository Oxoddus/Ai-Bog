import React, { useState } from 'react';
import {
  X,
  QrCode,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  ShieldCheck,
  Copy,
  Check,
  Printer,
  Smartphone,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface QrPaymentTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInvoiceId?: string;
  defaultTotal?: number;
}

export const QrPaymentTrackingModal: React.FC<QrPaymentTrackingModalProps> = ({
  isOpen,
  onClose,
  defaultInvoiceId = 'INV-UBAY-882190',
  defaultTotal = 285000
}) => {
  const [searchTxId, setSearchTxId] = useState(defaultInvoiceId);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'SUCCESS' | 'PENDING' | 'EXPIRED'>('SUCCESS');

  if (!isOpen) return null;

  const handleSearchTx = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPaymentStatus('SUCCESS');
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 text-white flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-lg">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-extrabold text-[10px] uppercase tracking-wider">
                QRIS & DIGITAL PAYMENT TRACKER
              </span>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                Pelacak Status Pembayaran QRIS & E-Wallet
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
          {/* Search Form */}
          <form onSubmit={handleSearchTx} className="relative">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Masukkan Invoice ID / Nomor Transaksi QRIS:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTxId}
                onChange={(e) => setSearchTxId(e.target.value)}
                placeholder="Contoh: INV-UBAY-882190 atau QRIS-990218"
                className="flex-1 px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Lacak QR</span>
              </button>
            </div>
          </form>

          {/* Active Status Display Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">STATUS TRANSAKSI QRIS:</span>
                <span className="font-mono text-xs font-black text-slate-800 dark:text-slate-200">{searchTxId}</span>
              </div>

              {paymentStatus === 'SUCCESS' ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-xs border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>PEMBAYARAN LUNAS</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-xs border border-amber-500/30 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>MENUNGGU SCAN QR</span>
                </span>
              )}
            </div>

            {/* Simulated Live QR Code Card */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="p-2 bg-white rounded-xl shadow border border-slate-300 text-center shrink-0">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=00020101021126580014ID.LINKAJA.WWW011893600911002202611520202111000303UMI51440014ID.CO.QRIS.WWW0215ID10203040506070303UMI5204581253033605802ID5913UBAYHUB BLORA6005BLORA61055821162070703A0163041A2B"
                  alt="QRIS UbayHub Blora"
                  className="w-32 h-32 rounded object-contain mx-auto"
                />
                <span className="text-[9px] font-bold text-slate-500 block mt-1">QRIS NATIONAL STANDARD</span>
              </div>

              <div className="space-y-2 text-xs flex-1 w-full">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                  <span className="text-slate-500">Merchant Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">UbayHub Blora Official</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                  <span className="text-slate-500">NMID / ID Merchant:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">ID1020304050607</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                  <span className="text-slate-500">Total Nominal:</span>
                  <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                    Rp {defaultTotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500">Metode QR Supported:</span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    ShopeePay, GoPay, DANA, BCA, BRI, Mandiri
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleCopy(searchTxId)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-blue-500" />}
                <span>{copied ? 'Tersalin' : 'Salin Ref QR'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Bukti QR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
