import React, { useState } from 'react';
import { Product } from '../../types';
import { X, ShoppingCart, QrCode, CreditCard, Truck, CheckCircle2, Printer, Send, ShieldCheck } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'shopeepay' | 'dana' | 'gopay' | 'bank' | 'cod'>('qris');
  const [invoiceId, setInvoiceId] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Mohon lengkapi nama, nomor telepon, dan alamat pengiriman!");
      return;
    }

    const newInv = 'INV-UBAY-' + Math.floor(100000 + Math.random() * 900000);
    setInvoiceId(newInv);
    setStep('invoice');
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
                  <label className="block text-xs font-bold mb-1">Alamat Lengkap Pengiriman</label>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Jl. / RT/RW / Desa / Kecamatan, Kabupaten Blora / Kota Asal"
                    className="w-full p-2.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
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
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-200">Pesanan Berhasil Diterbitkan!</h4>
                  <p>Kode Invoice: <strong>{invoiceId}</strong></p>
                </div>
              </div>

              {/* QRIS / E-Wallet / Bank display */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-3 text-xs text-center">
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
    </div>
  );
};
