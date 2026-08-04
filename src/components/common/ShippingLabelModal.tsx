import React from 'react';
import { X, Printer, Copy, Check, QrCode, ShieldCheck, Truck, Package, MapPin } from 'lucide-react';

interface ShippingLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    invoiceId: string;
    trackingNumber: string;
    courierName: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    itemsSummary: string;
    totalAmount: number;
    paymentMethod: string;
    isCod: boolean;
    date: string;
  };
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({
  isOpen,
  onClose,
  orderData
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderData.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-300 flex flex-col max-h-[90vh]">
        {/* Modal Controls Header */}
        <div className="p-3 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-orange-400" />
            <span className="font-extrabold text-xs">Cetak Label Pengiriman / Resi Otomatis</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Label Area */}
        <div className="p-6 space-y-4 overflow-y-auto font-sans print:p-0 print:border-none" id="printable-label">
          {/* Label Header */}
          <div className="border-2 border-slate-900 rounded-xl p-4 space-y-3 bg-white">
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 block">UBAYHUB BLORA</span>
                <span className="text-[10px] font-bold text-slate-600 uppercase">Toko & Service Center Elektronik</span>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 bg-slate-900 text-white font-black text-xs uppercase rounded">
                  {orderData.courierName || 'UbayHub Express'}
                </span>
                {orderData.isCod && (
                  <span className="block mt-1 px-2.5 py-0.5 bg-orange-600 text-white font-black text-[11px] uppercase rounded">
                    COD - BAYAR DI TEMPAT
                  </span>
                )}
              </div>
            </div>

            {/* Barcode / Resi Number Block */}
            <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">NOMOR RESI OTOMATIS:</span>
              <div className="text-2xl font-mono font-black tracking-wider text-blue-900 flex items-center justify-center gap-2">
                <span>{orderData.trackingNumber}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 no-print"
                  title="Salin Resi"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {/* Simulated Barcode */}
              <div className="h-8 bg-slate-900 my-1 rounded flex items-center justify-center text-white text-[9px] font-mono tracking-widest uppercase">
                |||||||||||| |||||||| |||||||||||||||| |||||||
              </div>
            </div>

            {/* Addresses Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs border-b-2 border-slate-900 pb-3">
              <div className="pr-2 border-r border-slate-300 space-y-1">
                <span className="font-extrabold uppercase text-[10px] text-slate-500 block">PENGIRIM:</span>
                <span className="font-bold text-slate-900 block">UbayHub Official Store Blora</span>
                <span className="text-[11px] text-slate-600 block">Jl. Pemuda No. 88, Blora Kota, Jawa Tengah</span>
                <span className="text-[11px] text-slate-600 block">Telp/WA: 0813-2688-9900</span>
              </div>

              <div className="space-y-1">
                <span className="font-extrabold uppercase text-[10px] text-slate-500 block">PENERIMA:</span>
                <span className="font-extrabold text-slate-900 block">{orderData.customerName}</span>
                <span className="text-[11px] text-slate-800 block font-medium">{orderData.customerAddress}</span>
                <span className="text-[11px] text-slate-600 block">HP: {orderData.customerPhone}</span>
              </div>
            </div>

            {/* Order Details & COD Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Invoice: <strong>{orderData.invoiceId}</strong></span>
                <span className="text-slate-500">Tanggal: <strong>{orderData.date}</strong></span>
              </div>

              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold block text-[11px]">Rincian Barang:</span>
                <p className="text-[11px] text-slate-700">{orderData.itemsSummary}</p>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span className="font-extrabold text-slate-800">Metode Pembayaran:</span>
                <span className="font-black text-xs uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  {orderData.paymentMethod}
                </span>
              </div>

              {orderData.isCod && (
                <div className="p-2.5 rounded-lg bg-orange-100 border border-orange-300 text-orange-950 flex justify-between items-center">
                  <span className="font-black text-xs">TAGIHAN COD KURIR:</span>
                  <span className="font-black text-sm text-orange-700">
                    Rp {orderData.totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
