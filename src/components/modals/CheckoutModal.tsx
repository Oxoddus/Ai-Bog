import React, { useState } from 'react';
import { Product } from '../../types';
import { X, ShoppingCart, QrCode, CreditCard, Truck, CheckCircle2, Printer, Send, ShieldCheck, Coins, MapPin, Copy, Check } from 'lucide-react';
import { PinMapBlora, BloraLocationPin } from '../common/PinMapBlora';
import { ShippingLabelModal } from '../common/ShippingLabelModal';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart
}) => {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'invoice'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [courierName, setCourierName] = useState('UbayHub Express (Instant COD Blora)');
  const [paymentMethod, setPaymentMethod] = useState<'midtrans' | 'qris' | 'shopeepay' | 'dana' | 'gopay' | 'crypto' | 'bank' | 'cod'>('midtrans');
  const [invoiceId, setInvoiceId] = useState('');
  const [autoResi, setAutoResi] = useState('');
  const [showSnapModal, setShowSnapModal] = useState(false);
  const [snapToken, setSnapToken] = useState('');
  const [snapVaNumber, setSnapVaNumber] = useState('');
  const [isPaidMidtrans, setIsPaidMidtrans] = useState(false);

  // PinMap & Label Modals
  const [showPinMapModal, setShowPinMapModal] = useState(false);
  const [showShippingLabel, setShowShippingLabel] = useState(false);
  const [selectedPinLoc, setSelectedPinLoc] = useState<BloraLocationPin | null>(null);
  const [copiedResi, setCopiedResi] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleOpenMidtransSnap = async () => {
    try {
      const res = await fetch('/api/midtrans/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: invoiceId || ('INV-UBAY-' + Math.floor(100000 + Math.random() * 900000)),
          grossAmount: totalAmount,
          customerDetails: { name: customerName, phone: customerPhone, address: customerAddress }
        })
      });
      const data = await res.json();
      if (data.success) {
        setSnapToken(data.snapToken);
        setSnapVaNumber(data.virtualAccount);
        setShowSnapModal(true);
      }
    } catch {
      setSnapToken('SNAP-MIDTRANS-UBAY-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      setSnapVaNumber('8891' + Math.floor(100000000 + Math.random() * 900000000));
      setShowSnapModal(true);
    }
  };

  const handleSimulateMidtransSuccess = async () => {
    try {
      await fetch('/api/midtrans/notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: invoiceId,
          transaction_status: 'settlement',
          payment_type: 'bank_transfer'
        })
      });
    } catch (e) {
      console.log(e);
    }
    setIsPaidMidtrans(true);
    setShowSnapModal(false);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Mohon lengkapi nama, nomor telepon, dan alamat pengiriman!");
      return;
    }

    const newInv = 'INV-UBAY-' + Math.floor(100000 + Math.random() * 900000);
    const prefixResi = courierName.includes('J&T')
      ? 'JNT-BLR-'
      : courierName.includes('JNE')
      ? 'JNE-BLR-'
      : courierName.includes('SiCepat')
      ? 'SICPT-BLR-'
      : 'UBY-EXP-';
    const newResi = prefixResi + Date.now().toString().substring(5);

    setInvoiceId(newInv);
    setAutoResi(newResi);
    setStep('invoice');

    if (paymentMethod === 'midtrans') {
      handleOpenMidtransSnap();
    }
  };

  const handleSelectPinFromMap = (pin: BloraLocationPin) => {
    setSelectedPinLoc(pin);
    setCustomerAddress(`${pin.name} - ${pin.address}`);
    setShowPinMapModal(false);
  };

  const handleCopyResi = () => {
    navigator.clipboard.writeText(autoResi);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold">Keranjang & Pembayaran Sparepart UbayHub</h2>
              <p className="text-xs text-slate-300">Pesan Suku Cadang Asli & Rekomendasi Teknisi Blora</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className={`font-bold ${step === 'cart' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
              1. Keranjang Belanja
            </span>
            <span>&rarr;</span>
            <span className={`font-bold ${step === 'shipping' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
              2. Data Pengiriman
            </span>
            <span>&rarr;</span>
            <span className={`font-bold ${step === 'invoice' ? 'text-emerald-500' : 'text-slate-400'}`}>
              3. Invoice & Pembayaran
            </span>
          </div>

          {step === 'cart' && (
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <ShoppingCart className="w-12 h-12 mx-auto text-slate-400" />
                  <p className="text-sm font-semibold">Keranjang belanja Anda masih kosong.</p>
                  <p className="text-xs">Silakan pilih produk sparepart di Toko UbayHub.</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-200 dark:border-slate-800"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold line-clamp-1">{item.product.title}</h4>
                          <span className="text-slate-500 block">Rp {item.product.price.toLocaleString('id-ID')} / pcs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300"
                          >
                            -
                          </button>
                          <span className="font-extrabold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 font-bold hover:bg-slate-300"
                          >
                            +
                          </button>
                        </div>
                        <div className="font-extrabold text-blue-600 dark:text-blue-400 shrink-0">
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-between font-bold text-sm">
                    <span>Total Pembayaran:</span>
                    <span className="text-lg text-orange-600 dark:text-orange-400">
                      Rp {totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={onClearCart}
                      className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      Kosongkan
                    </button>
                    <button
                      onClick={() => setStep('shipping')}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow"
                    >
                      Lanjut ke Data Pengiriman &rarr;
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 'shipping' && (
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Nama Lengkap Pembeli</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Pak Suparno"
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Nomor WhatsApp / HP</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">Pilih Metode Pembayaran</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {/* Midtrans Gateway */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('midtrans')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between col-span-2 sm:col-span-1 ${
                        paymentMethod === 'midtrans'
                          ? 'bg-blue-600/15 border-blue-500 ring-2 ring-blue-500/40'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] tracking-wider uppercase">
                          Midtrans SNAP
                        </span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'midtrans' ? 'border-blue-500 bg-blue-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'midtrans' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-extrabold text-xs block text-slate-900 dark:text-white">Midtrans Gateway</span>
                        <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold block line-clamp-1">VA BCA/Mandiri/BRI, Card & QRIS</span>
                      </div>
                    </button>

                    {/* QRIS */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qris')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'qris'
                          ? 'bg-blue-600/10 border-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <QrCode className="w-5 h-5 text-orange-500" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'qris' ? 'border-blue-500 bg-blue-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'qris' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">QRIS Instant</span>
                        <span className="text-[9px] text-slate-400 block line-clamp-1">All E-Wallet / M-Banking</span>
                      </div>
                    </button>

                    {/* ShopeePay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('shopeepay')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'shopeepay'
                          ? 'bg-orange-500/10 border-orange-500 ring-2 ring-orange-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded bg-orange-600 text-white font-black text-[10px]">Shopee</span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'shopeepay' ? 'border-orange-500 bg-orange-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'shopeepay' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">ShopeePay</span>
                        <span className="text-[9px] text-slate-400 block">E-Wallet Instant</span>
                      </div>
                    </button>

                    {/* DANA */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('dana')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'dana'
                          ? 'bg-sky-500/10 border-sky-500 ring-2 ring-sky-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded bg-sky-500 text-white font-black text-[10px]">DANA</span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'dana' ? 'border-sky-500 bg-sky-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'dana' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">DANA</span>
                        <span className="text-[9px] text-slate-400 block">E-Wallet Instant</span>
                      </div>
                    </button>

                    {/* GoPay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('gopay')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'gopay'
                          ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-black text-[10px]">GoPay</span>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'gopay' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'gopay' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">GoPay</span>
                        <span className="text-[9px] text-slate-400 block">E-Wallet Instant</span>
                      </div>
                    </button>

                    {/* Crypto */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'crypto'
                          ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Coins className="w-5 h-5 text-purple-400" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'crypto' ? 'border-purple-500 bg-purple-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'crypto' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">Crypto</span>
                        <span className="text-[9px] text-slate-400 block">USDT / BTC / ETH</span>
                      </div>
                    </button>

                    {/* Transfer Bank */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'bank'
                          ? 'bg-blue-600/10 border-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-blue-500" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'bank' ? 'border-blue-500 bg-blue-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'bank' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">Bank BCA/BRI</span>
                        <span className="text-[9px] text-slate-400 block">Transfer Manual</span>
                      </div>
                    </button>

                    {/* COD */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        paymentMethod === 'cod'
                          ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Truck className="w-5 h-5 text-amber-500" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'cod' ? 'border-amber-500 bg-amber-500' : 'border-slate-400'
                        }`}>
                          {paymentMethod === 'cod' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold text-xs block text-slate-900 dark:text-white">COD Blora</span>
                        <span className="text-[9px] text-slate-400 block">Bayar Tempat</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold">Alamat Lengkap Pengiriman</label>
                    <button
                      type="button"
                      onClick={() => setShowPinMapModal(true)}
                      className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>Pinpoint di PinMap Blora</span>
                    </button>
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Jl. / RT/RW / Desa / Kecamatan, Kabupaten Blora / Kota Asal"
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Pilih Kurir Pengiriman & Resi Otomatis</label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-bold"
                  >
                    <option value="UbayHub Express (Instant COD Blora)">UbayHub Express (Instant COD Blora 0-5 KM Gratis!)</option>
                    <option value="J&T Express (Resi Otomatis)">J&T Express (Resi Otomatis - COD / Reguler)</option>
                    <option value="JNE Express (Resi Otomatis)">JNE Express (Resi Otomatis - YES / REG)</option>
                    <option value="SiCepat Halu (Resi Otomatis)">SiCepat Halu (Resi Otomatis - Hemat / Reguler)</option>
                    <option value="Pos Indonesia (Resi Otomatis)">Pos Indonesia (Resi Otomatis - Kilat Khusus)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold"
                >
                  &larr; Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow"
                >
                  Proses Faktur Invoice Order
                </button>
              </div>
            </form>
          )}

          {step === 'invoice' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="font-bold text-sm text-emerald-200">Pesanan Berhasil Diterbitkan!</h4>
                    <p>Kode Invoice: <strong>{invoiceId}</strong></p>
                  </div>
                </div>

                {/* Resi Otomatis Display */}
                <div className="p-3 rounded-lg bg-slate-950 border border-emerald-800/80 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-sans">RESI OTOMATIS ({courierName}):</span>
                    <span className="text-sm font-black text-amber-400 tracking-wider">{autoResi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyResi}
                      className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans font-bold flex items-center gap-1"
                    >
                      {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{copiedResi ? 'Tersalin' : 'Salin Resi'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowShippingLabel(true)}
                      className="px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-sans font-extrabold flex items-center gap-1 shadow"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak Label Resi</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* QRIS / E-Wallet / Bank display */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-3 text-xs text-center">
                {paymentMethod === 'midtrans' && (
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between bg-blue-950/60 p-3 rounded-xl border border-blue-800/80">
                      <div>
                        <span className="font-extrabold text-blue-300 block">Midtrans Payment Gateway SNAP</span>
                        <span className="text-[11px] text-slate-300">Virtual Account (BCA/Mandiri/BNI/BRI), QRIS & Card</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                        isPaidMidtrans ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-950'
                      }`}>
                        {isPaidMidtrans ? 'LUNAS (SETTLEMENT)' : 'PENDING'}
                      </span>
                    </div>

                    {!isPaidMidtrans ? (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-mono">
                          <span className="text-slate-400">SNAP TOKEN:</span>
                          <span className="text-blue-400 font-bold">{snapToken || 'SNAP-MIDTRANS-UBAY-DEMO'}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-mono">
                          <span className="text-slate-400">SIMULATED VA:</span>
                          <span className="text-amber-400 font-bold">{snapVaNumber || '88910023400192'}</span>
                        </div>

                        <button
                          type="button"
                          onClick={handleOpenMidtransSnap}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow flex items-center justify-center gap-2 mt-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Buka Modal Pembayaran Midtrans SNAP</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Pembayaran via Midtrans Gateway Berhasil Terverifikasi! Pesanan Anda langsung diproses ke bagian pengemasan.</span>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'qris' && (
                  <div className="space-y-2">
                    <span className="font-bold text-orange-400 block">Scan QRIS Resmi UbayHub Blora:</span>
                    <div className="w-40 h-40 bg-white p-2 mx-auto rounded-xl shadow-inner flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-slate-900" />
                    </div>
                    <span className="text-[11px] text-slate-400 block">Mendukung ShopeePay, DANA, GoPay, OVO, LinkAja, BCA Mobile, BRImo</span>
                  </div>
                )}

                {paymentMethod === 'shopeepay' && (
                  <div className="space-y-2 text-left">
                    <span className="font-bold text-orange-500 block">Transfer / Top Up ShopeePay:</span>
                    <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 font-mono">
                      <div>Nomor ShopeePay: <strong className="text-orange-400">0813-2688-9900</strong></div>
                      <div>Atas Nama: <strong>UbayHub Blora Official</strong></div>
                      <div className="text-[10px] text-slate-400 font-sans mt-1">
                        Atau scan QRIS dengan aplikasi Shopee Anda. Masukkan nominal <strong>Rp {totalAmount.toLocaleString('id-ID')}</strong>.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'dana' && (
                  <div className="space-y-2 text-left">
                    <span className="font-bold text-sky-400 block">Transfer / Kirim Uang DANA:</span>
                    <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 font-mono">
                      <div>Nomor DANA: <strong className="text-sky-300">0813-2688-9900</strong></div>
                      <div>Atas Nama: <strong>UbayHub Blora Official</strong></div>
                      <div className="text-[10px] text-slate-400 font-sans mt-1">
                        Buka aplikasi DANA &gt; Kirim &gt; Nomor HP 0813-2688-9900. Total transfer: <strong>Rp {totalAmount.toLocaleString('id-ID')}</strong>.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'gopay' && (
                  <div className="space-y-2 text-left">
                    <span className="font-bold text-emerald-400 block">Transfer GoPay / Gojek:</span>
                    <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 font-mono">
                      <div>Nomor GoPay: <strong className="text-emerald-300">0813-2688-9900</strong></div>
                      <div>Atas Nama: <strong>UbayHub Blora Official</strong></div>
                      <div className="text-[10px] text-slate-400 font-sans mt-1">
                        Buka aplikasi Gojek / GoPay &gt; Transfer &gt; Kontak HP 0813-2688-9900. Total nominal: <strong>Rp {totalAmount.toLocaleString('id-ID')}</strong>.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="space-y-2 text-left">
                    <span className="font-bold text-purple-400 block">Pembayaran Cryptocurrency (USDT / BTC / ETH):</span>
                    <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
                      <div>Network: <strong className="text-purple-300">USDT (TRC20 / BEP20)</strong></div>
                      <div className="truncate">Wallet Address: <strong className="text-purple-300">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</strong></div>
                      <div>Estimasi Nominal Crypto: <strong>~{(totalAmount / 16000).toFixed(2)} USDT</strong></div>
                      <div className="text-[10px] text-slate-400 font-sans mt-1">
                        Kirimkan hash bukti transaksi (TXID) ke WhatsApp Admin UbayHub setelah transfer berhasil diselesaikan.
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="space-y-1 text-left">
                    <span className="font-bold text-blue-400 block">Nomor Rekening Pembayaran:</span>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono">
                      <div>Bank BCA: <strong>8891-0023-4001</strong> (a.n. UbayHub Blora)</div>
                      <div>Bank BRI: <strong>0023-0100-8891-530</strong> (a.n. UbayHub Blora)</div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-3 rounded bg-amber-950/50 border border-amber-800/50 text-amber-200 text-left">
                    <Truck className="w-5 h-5 text-amber-400 mb-1" />
                    <strong>Metode COD Aktif:</strong> Kurir UbayHub Blora akan mengantarkan pesanan langsung ke alamat Anda. Siapkan uang pas sebesar <strong>Rp {totalAmount.toLocaleString('id-ID')}</strong>.
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Faktur</span>
                </button>

                <a
                  href={`https://wa.me/6281326889900?text=Halo%20Admin%20UbayHub,%20saya%20sudah%20membuat%20pesanan%20dengan%20Invoice%20${invoiceId}%20atas%20nama%20${encodeURIComponent(customerName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>Konfirmasi via WhatsApp Admin</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Midtrans SNAP Interactive Payment Gateway Modal */}
      {showSnapModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden flex flex-col text-slate-900 dark:text-slate-100 animate-scaleUp">
            {/* Midtrans Snap Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-300" />
                <div>
                  <h3 className="font-extrabold text-xs uppercase tracking-wider">Midtrans Payment Gateway</h3>
                  <p className="text-[10px] text-blue-200">SNAP Sandbox Payment Simulator UbayHub</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSnapModal(false)}
                className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Midtrans Snap Body */}
            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Merchant:</span>
                  <span className="text-blue-600 dark:text-blue-400">UbayHub Blora Official</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor Order:</span>
                  <span className="font-mono font-bold">{invoiceId}</span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-bold">Total Pembayaran:</span>
                  <span className="text-base font-black text-orange-600 dark:text-orange-400">
                    Rp {totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Payment Methods inside Midtrans */}
              <div className="space-y-2">
                <span className="font-bold block text-slate-700 dark:text-slate-300">Pilih Saluran Pembayaran Midtrans:</span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-blue-500/40 flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-blue-600 dark:text-blue-400">BCA Virtual Account</span>
                      <span className="text-[10px] font-mono text-slate-400">No. VA: {snapVaNumber}</span>
                    </div>
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded">Otomatis</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-emerald-600 dark:text-emerald-400">Mandiri / BNI / BRI VA</span>
                      <span className="text-[10px] text-slate-400">Multi-Bank Direct Payment</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-orange-500">QRIS / ShopeePay / GoPay</span>
                      <span className="text-[10px] text-slate-400">Scan QR Code Instant</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleSimulateMidtransSuccess}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulasikan Pembayaran Sukses (Callback Webhook)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSnapModal(false)}
                  className="w-full py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Bayar Nanti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* PinMap Blora Selection Modal */}
      {showPinMapModal && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-300 dark:border-slate-800 p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Pilih Titik Lokasi Pengiriman di PinMap Blora</span>
              </span>
              <button
                onClick={() => setShowPinMapModal(false)}
                className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <PinMapBlora onSelectPin={handleSelectPinFromMap} />
          </div>
        </div>
      )}

      {/* Printable Shipping Label Modal */}
      <ShippingLabelModal
        isOpen={showShippingLabel}
        onClose={() => setShowShippingLabel(false)}
        orderData={{
          invoiceId,
          trackingNumber: autoResi,
          courierName,
          customerName,
          customerPhone,
          customerAddress,
          itemsSummary: cart.map((c) => `${c.product.title} (x${c.quantity})`).join(', '),
          totalAmount,
          paymentMethod: paymentMethod.toUpperCase(),
          isCod: paymentMethod === 'cod',
          date: new Date().toLocaleDateString('id-ID')
        }}
      />
    </div>
  );
};
