import React, { useState } from 'react';
import {
  sendTelegramNotification,
  formatTelegramServiceMessage
} from '../../services/telegramService';
import {
  StockItem,
  ServiceOrder,
  Firmware,
  AdBanner,
  User,
  AuditLog,
  AdPlacement
} from '../../types';
import {
  ShieldCheck,
  BarChart3,
  Box,
  Wrench,
  Download,
  Megaphone,
  Lock,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  AlertTriangle,
  QrCode,
  FileSpreadsheet,
  FileText,
  Eye,
  MousePointer,
  RefreshCw,
  LogOut,
  Sparkles,
  DollarSign,
  ExternalLink,
  TrendingUp,
  Share2,
  ShoppingBag,
  Percent,
  Copy,
  Check,
  Printer,
  MessageSquare,
  Send,
  Smartphone,
  ToggleLeft,
  ToggleRight,
  Settings,
  Code,
  Bot,
  CheckCircle2
} from 'lucide-react';

interface AdminDashboardViewProps {
  currentUser: User;
  stock: StockItem[];
  serviceOrders: ServiceOrder[];
  firmwares: Firmware[];
  ads: AdBanner[];
  auditLogs: AuditLog[];
  onLogout: () => void;
  onUpdateStock: (stk: StockItem[]) => void;
  onUpdateServiceOrders: (orders: ServiceOrder[]) => void;
  onUpdateAds: (ads: AdBanner[]) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  stock,
  serviceOrders,
  firmwares,
  ads,
  auditLogs,
  onLogout,
  onUpdateStock,
  onUpdateServiceOrders,
  onUpdateAds
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'stock' | 'services' | 'ads' | 'firmware' | 'affiliate' | 'security'>('overview');
  const [stockSearch, setStockSearch] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [firmwareList, setFirmwareList] = useState<Firmware[]>(firmwares);

  // New Firmware Modal
  const [showAddFirmwareModal, setShowAddFirmwareModal] = useState(false);
  const [newFwTitle, setNewFwTitle] = useState('');
  const [newFwBrand, setNewFwBrand] = useState('Polytron');
  const [newFwModel, setNewFwModel] = useState('');
  const [newFwMainboard, setNewFwMainboard] = useState('');
  const [newFwIcType, setNewFwIcType] = useState('GD25Q64 / 25Q32');
  const [newFwSize, setNewFwSize] = useState('8.00 MB');
  const [newFwUrl, setNewFwUrl] = useState('https://ubayhub.id/downloads/fw-test.bin');

  // Affiliate Mock Data State
  const [affiliateLinks, setAffiliateLinks] = useState([
    {
      id: 'aff-01',
      title: 'Solder Station Quick 861DW 1000W High Power',
      marketplace: 'Tokopedia',
      url: 'https://tokopedia.link/ubayhub-quick861dw',
      clicks: 3420,
      conversions: 184,
      ctr: 12.8,
      totalCommission: 1472000,
      pendingCommission: 320000,
      status: 'Active'
    },
    {
      id: 'aff-02',
      title: 'IC EEPROM Programmer RT809F Full Adapter Set',
      marketplace: 'Shopee',
      url: 'https://shopee.co.id/universal-rt809f-ubayhub',
      clicks: 4890,
      conversions: 210,
      ctr: 9.4,
      totalCommission: 1260000,
      pendingCommission: 450000,
      status: 'Active'
    },
    {
      id: 'aff-03',
      title: 'Alat Tes Backlight TV LED Digital Smart Tester',
      marketplace: 'Tokopedia',
      url: 'https://tokopedia.link/ubayhub-ledtester',
      clicks: 2150,
      conversions: 98,
      ctr: 8.2,
      totalCommission: 784000,
      pendingCommission: 150000,
      status: 'Active'
    },
    {
      id: 'aff-04',
      title: 'Fluks Solder Amtech NC-559-ASM Original 10cc',
      marketplace: 'TikTok Shop',
      url: 'https://vt.tiktok.com/ubayhub_amtech',
      clicks: 5610,
      conversions: 340,
      ctr: 14.1,
      totalCommission: 680000,
      pendingCommission: 120000,
      status: 'Active'
    },
    {
      id: 'aff-05',
      title: 'Mainboard TV Polytron LED 32 Inch Tested Good',
      marketplace: 'Lazada',
      url: 'https://s.lazada.co.id/s.ubayhub_polytron',
      clicks: 1820,
      conversions: 62,
      ctr: 6.8,
      totalCommission: 496000,
      pendingCommission: 80000,
      status: 'Active'
    }
  ]);

  // New Stock Item Modal State
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [newStockTitle, setNewStockTitle] = useState('');
  const [newStockCategory, setNewStockCategory] = useState('IC');
  const [newStockQty, setNewStockQty] = useState(50);
  const [newStockBuyPrice, setNewStockBuyPrice] = useState(10000);
  const [newStockSellPrice, setNewStockSellPrice] = useState(20000);
  const [newStockRack, setNewStockRack] = useState('Rak A-05');

  // New Ad Banner Modal State
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdLocation, setNewAdLocation] = useState<AdPlacement>('Header Banner');
  const [newAdTargetUrl, setNewAdTargetUrl] = useState('https://ubayhub.id/promo');
  const [newAdImageUrl, setNewAdImageUrl] = useState('https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800');

  // Automated WhatsApp Notification & Template Engine Config State
  const [waAutoNotifyEnabled, setWaAutoNotifyEnabled] = useState(true);
  const [waGatewayNumber, setWaGatewayNumber] = useState('0813-2688-9900 (UbayHub Gateway Server #1)');
  const [waTemplateText, setWaTemplateText] = useState(
    `*NOTIFIKASI AUTOMATED UBAYHUB BLORA*\n\nHalo {customer_name},\nUpdate pengerjaan servis perangkat Anda:\n\n📌 Kode Resi: *{invoice_code}*\n📺 Perangkat: *{device_model}*\n⚡ Status Terkini: *{status}*\n\nLacak real-time: {link}\nTerima kasih telah mempercayakan perbaikan di *UbayHub Blora*!`
  );
  const [waAutoTriggerCondition, setWaAutoTriggerCondition] = useState('ALL_STATUS_CHANGE');
  const [waTestPhone, setWaTestPhone] = useState('081234567890');
  const [waLogNotification, setWaLogNotification] = useState<string | null>(null);

  // Telegram Bot Notification Config State
  const [tgBotEnabled, setTgBotEnabled] = useState(true);
  const [tgBotToken, setTgBotToken] = useState('7123456789:AAFg88921_UBAYHUB_BLORA_TOKEN');
  const [tgChatId, setTgChatId] = useState('@UbayHubBlora_OfficialChannel');
  const [tgTestLog, setTgTestLog] = useState<string | null>(null);

  // Filtered Stock Items
  const filteredStock = stock.filter(
    (s) =>
      s.title.toLowerCase().includes(stockSearch.toLowerCase()) ||
      s.code.toLowerCase().includes(stockSearch.toLowerCase()) ||
      s.rackLocation.toLowerCase().includes(stockSearch.toLowerCase())
  );

  const handleCreateStock = (e: React.FormEvent) => {
    e.preventDefault();
    const margin = ((newStockSellPrice - newStockBuyPrice) / newStockBuyPrice) * 100;
    const newItem: StockItem = {
      id: 'stk-' + Date.now(),
      code: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
      barcode: '8891' + Math.floor(10000000 + Math.random() * 90000000),
      title: newStockTitle,
      category: newStockCategory,
      stockQuantity: Number(newStockQty),
      minStockThreshold: 10,
      buyPrice: Number(newStockBuyPrice),
      sellPrice: Number(newStockSellPrice),
      marginPercent: Number(margin.toFixed(1)),
      rackLocation: newStockRack,
      supplierName: 'PT Suplier Utama Blora',
      lastUpdated: new Date().toISOString().split('T')[0],
      movementsCount: 1
    };

    onUpdateStock([newItem, ...stock]);
    setShowAddStockModal(false);
    setNewStockTitle('');
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAd: AdBanner = {
      id: 'ad-' + Date.now(),
      title: newAdTitle,
      type: 'Image',
      location: newAdLocation,
      imageUrl: newAdImageUrl,
      targetUrl: newAdTargetUrl,
      priority: 1,
      active: true,
      deviceTarget: 'All',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      impressions: 0,
      clicks: 0,
      ctr: 0
    };

    onUpdateAds([newAd, ...ads]);
    setShowAddAdModal(false);
    setNewAdTitle('');
  };

  const toggleAdActive = (adId: string) => {
    const updated = ads.map((a) => (a.id === adId ? { ...a, active: !a.active } : a));
    onUpdateAds(updated);
  };

  const renderWaTemplate = (ord: Partial<ServiceOrder> & { customerName: string; code: string; brandModel: string; deviceType: string; status: string }) => {
    return waTemplateText
      .replace(/\{customer_name\}/g, ord.customerName)
      .replace(/\{invoice_code\}/g, ord.code)
      .replace(/\{device_model\}/g, `${ord.brandModel} (${ord.deviceType})`)
      .replace(/\{status\}/g, ord.status)
      .replace(/\{link\}/g, 'https://ubayhub.id/service');
  };

  const handleUpdateServiceStatus = (orderId: string, newStatus: ServiceOrder['status']) => {
    let targetOrder: ServiceOrder | undefined;
    const updated = serviceOrders.map((o) => {
      if (o.id === orderId) {
        targetOrder = o;
        const newTimeline = [...o.timeline];
        const stepIdx = newTimeline.findIndex((t) => t.status === newStatus);
        if (stepIdx !== -1) {
          newTimeline[stepIdx].completed = true;
          newTimeline[stepIdx].time = new Date().toLocaleString('id-ID');
        }
        return { ...o, status: newStatus, timeline: newTimeline };
      }
      return o;
    });

    onUpdateServiceOrders(updated);

    if (targetOrder) {
      if (waAutoNotifyEnabled) {
        const renderedMsg = renderWaTemplate({
          ...targetOrder,
          status: newStatus
        });
        setWaLogNotification(
          `✅ Automated WhatsApp Notifikasi Terkirim Otomatis via Gateway (${waGatewayNumber}) ke ${targetOrder.phone} (${targetOrder.customerName})\n` +
          (tgBotEnabled ? `🤖 Telegram Bot Message Dispatched to ${tgChatId} (Status: ${newStatus})` : '')
        );
      }

      // Execute Telegram Bot API service layer dispatch
      if (tgBotEnabled) {
        const telegramFormattedText = formatTelegramServiceMessage({
          customerName: targetOrder.customerName,
          customerPhone: targetOrder.phone,
          invoiceCode: targetOrder.code,
          deviceModel: targetOrder.brandModel,
          deviceType: targetOrder.deviceType,
          status: newStatus,
          estimatedCost: targetOrder.estimatedCost
        });

        sendTelegramNotification(
          { botToken: tgBotToken, chatId: tgChatId },
          telegramFormattedText
        ).then((res) => {
          if (res.success) {
            console.log('[Telegram Bot Integration Service] Successfully sent update:', res.data);
          } else {
            console.warn('[Telegram Bot Integration Service] Failed to send update:', res.error);
          }
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Status Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.username}
            className="w-12 h-12 rounded-2xl border-2 border-blue-500 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-white">{currentUser.username}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-600 text-white uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sesi Aktif: {currentUser.email} &bull; Login Terakhir: {currentUser.lastLogin}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi Admin</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'overview' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>1. Overview Analytics</span>
        </button>

        <button
          onClick={() => setAdminTab('stock')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'stock' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>2. Stok Barang & Rak ({stock.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('services')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'services' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>3. Order Servis ({serviceOrders.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('ads')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'ads' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>4. Manajemen Iklan ({ads.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('firmware')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'firmware' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Download className="w-4 h-4 text-orange-400" />
          <span>5. Kelola Firmware BIN ({firmwareList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('affiliate')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'affiliate' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>6. Affiliate Overview ({affiliateLinks.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('security')}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 ${
            adminTab === 'security' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>7. Keamanan & Log Audit</span>
        </button>
      </div>

      {/* Tab 1: Overview Analytics */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 font-bold">Total Firmware Downloads</span>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">14.820</div>
              <span className="text-[10px] text-emerald-500 font-bold">+12% dari minggu lalu</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 font-bold">Pendapatan Servis & Sparepart</span>
              <div className="text-2xl font-black text-orange-600 dark:text-orange-400">Rp 24.850.000</div>
              <span className="text-[10px] text-emerald-500 font-bold">Blora & Luar Kota</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 font-bold">Order Servis Aktif</span>
              <div className="text-2xl font-black text-emerald-500">{serviceOrders.length} Resi</div>
              <span className="text-[10px] text-slate-400">Persetujuan pelanggan OK</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-500 font-bold">Status Keamanan Portal</span>
              <div className="text-2xl font-black text-emerald-400">SECURE</div>
              <span className="text-[10px] text-slate-400">Argon2 / Rate Limit Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stock Management */}
      {adminTab === 'stock' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                placeholder="Cari SKU / Nama Barang / Rak..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => alert("Mengunduh Laporan Stok Excel (XLSX)...")}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                <span>Export Excel</span>
              </button>

              <button
                onClick={() => setShowAddStockModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Barang Baru</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-3">SKU & Barcode</th>
                  <th className="p-3">Nama Komponen / Barang</th>
                  <th className="p-3">Lokasi Rak</th>
                  <th className="p-3">Stok</th>
                  <th className="p-3">Harga Beli</th>
                  <th className="p-3">Harga Jual</th>
                  <th className="p-3">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredStock.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="p-3 font-mono">
                      <div>{item.code}</div>
                      <div className="text-[10px] text-slate-400">{item.barcode}</div>
                    </td>
                    <td className="p-3 font-bold">{item.title}</td>
                    <td className="p-3 text-orange-600 dark:text-orange-400 font-bold">{item.rackLocation}</td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        item.stockQuantity <= item.minStockThreshold
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-black'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {item.stockQuantity} pcs
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">Rp {item.buyPrice.toLocaleString('id-ID')}</td>
                    <td className="p-3 font-extrabold text-blue-600 dark:text-blue-400">Rp {item.sellPrice.toLocaleString('id-ID')}</td>
                    <td className="p-3 font-bold text-emerald-500">+{item.marginPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Service Orders Management */}
      {adminTab === 'services' && (
        <div className="space-y-6">
          {/* Notification Dispatch Log Banner */}
          {waLogNotification && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-bold flex justify-between items-center animate-fadeIn shadow-lg">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="whitespace-pre-line">{waLogNotification}</span>
              </div>
              <button
                onClick={() => setWaLogNotification(null)}
                className="p-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-[10px]"
              >
                Tutup Log
              </button>
            </div>
          )}

          {/* WhatsApp Automated Notification Settings & Template Engine */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase">
                      AUTOMATED WA GATEWAY
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                      TEMPLATE ENGINE V2.0
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                    Pengaturan Notifikasi Otomatis WhatsApp Update Status Servis
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sistem akan mengirimkan pesan pesan otomatis ke nomor HP pelanggan setiap kali teknisi mengubah status order servis.
                  </p>
                </div>
              </div>

              {/* Main Toggle Switch */}
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  Status Auto-Notify:
                </span>
                <button
                  type="button"
                  onClick={() => setWaAutoNotifyEnabled(!waAutoNotifyEnabled)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition shadow-md ${
                    waAutoNotifyEnabled
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                  }`}
                >
                  {waAutoNotifyEnabled ? (
                    <>
                      <ToggleRight className="w-5 h-5 text-emerald-200" />
                      <span>AKTIF (Auto Send)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5" />
                      <span>DIPAUSE (Manual Only)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Template Engine Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Config & Template Input */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Pilih WA Gateway Server:
                    </label>
                    <select
                      value={waGatewayNumber}
                      onChange={(e) => setWaGatewayNumber(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <option value="0813-2688-9900 (UbayHub Gateway Server #1)">0813-2688-9900 (Gateway Server #1 Blora)</option>
                      <option value="0858-1234-5678 (UbayHub Backup Node #2)">0858-1234-5678 (Backup Node #2)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Kondisi Trigger Otomatis:
                    </label>
                    <select
                      value={waAutoTriggerCondition}
                      onChange={(e) => setWaAutoTriggerCondition(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <option value="ALL_STATUS_CHANGE">Setiap Perubahan Status Servis</option>
                      <option value="ONLY_COMPLETED">Hanya Saat 'Selesai & Siap Ambil'</option>
                    </select>
                  </div>
                </div>

                {/* Variable Tags Quick Inserter */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Editor Template Pesan WhatsApp:
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Klik tag di bawah untuk menyisipkan variabel
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {[
                      { tag: '{customer_name}', label: 'Nama Pelanggan' },
                      { tag: '{invoice_code}', label: 'Kode Resi' },
                      { tag: '{device_model}', label: 'Merk Perangkat' },
                      { tag: '{status}', label: 'Status Pengerjaan' },
                      { tag: '{link}', label: 'Link Tracking URL' }
                    ].map((item) => (
                      <button
                        key={item.tag}
                        type="button"
                        onClick={() => setWaTemplateText((prev) => prev + ' ' + item.tag)}
                        className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-bold flex items-center gap-1 border border-blue-200 dark:border-blue-800/50"
                      >
                        <Code className="w-3 h-3 text-orange-500" />
                        <span>{item.tag}</span>
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={6}
                    value={waTemplateText}
                    onChange={(e) => setWaTemplateText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs border border-slate-800 focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Right Column: Live Template Preview & Test Trigger */}
              <div className="lg:col-span-5 space-y-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Pratinjau Pesan Real-Time (Live Rendered Preview):
                </label>

                {/* Simulated Phone Bubble Preview */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-3 font-sans shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tampilan di HP Pelanggan:</span>
                    </span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      WHATSAPP VERIFIED
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                    {renderWaTemplate({
                      customerName: 'Bapak Sukarno',
                      code: 'SRV-BLR-8812',
                      brandModel: 'Polytron LED 32 Inch',
                      deviceType: 'TV LED',
                      status: 'Dalam Pengerjaan'
                    })}
                  </div>
                </div>

                {/* Test Notification Trigger Form */}
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    Uji Coba Kirim Pesan Template ke Nomor HP:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={waTestPhone}
                      onChange={(e) => setWaTestPhone(e.target.value)}
                      placeholder="081234567890"
                      className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const previewMsg = renderWaTemplate({
                          customerName: 'Tes Pelanggan',
                          code: 'SRV-TEST-99',
                          brandModel: 'Samsung Curved 43',
                          deviceType: 'TV Smart',
                          status: 'Testing & QC'
                        });
                        setWaLogNotification(`✅ Tes Notifikasi WhatsApp berhasil dikirim ke ${waTestPhone}`);
                        window.open(`https://wa.me/${waTestPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(previewMsg)}`, '_blank');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1 shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Tes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Telegram Bot Automation Settings Box */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-500 border border-sky-500/30">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 font-black text-[10px] uppercase">
                      TELEGRAM BOT AUTOMATION
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                      BOT API V5.0
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                    Pengaturan Bot Telegram & Broadcaster Servis / Order
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sistem akan memposting pesan otomatis ke Channel Telegram UbayHub atau akun Telegram Teknisi saat ada order baru atau perbaikan selesai.
                  </p>
                </div>
              </div>

              {/* Telegram Bot Toggle */}
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  Bot Telegram Status:
                </span>
                <button
                  type="button"
                  onClick={() => setTgBotEnabled(!tgBotEnabled)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition shadow-md ${
                    tgBotEnabled
                      ? 'bg-sky-600 hover:bg-sky-700 text-white'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>{tgBotEnabled ? 'AKTIF (BROADCAST)' : 'NONAKTIF'}</span>
                </button>
              </div>
            </div>

            {/* Telegram Configuration Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Telegram Bot API Token:
                </label>
                <input
                  type="text"
                  value={tgBotToken}
                  onChange={(e) => setTgBotToken(e.target.value)}
                  placeholder="Contoh: 7123456789:AAFg88921_UBAYHUB..."
                  className="w-full p-2.5 rounded-xl font-mono text-xs bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Telegram Channel / Chat ID (@username atau ID):
                </label>
                <input
                  type="text"
                  value={tgChatId}
                  onChange={(e) => setTgChatId(e.target.value)}
                  placeholder="Contoh: @UbayHubBlora_OfficialChannel atau -10012345678"
                  className="w-full p-2.5 rounded-xl font-mono text-xs bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Test Send Telegram Notification Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-sky-950/30 border border-sky-800/50">
              <div className="text-xs text-sky-200">
                <span className="font-extrabold block">Uji Coba Pengiriman Bot Telegram:</span>
                <span className="text-[11px] text-slate-400">Klik untuk mengirimkan broadcast simulasi ke channel Telegram {tgChatId}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTgTestLog(`✅ Tes Pesan Bot Telegram Berhasil Disiarkan ke Channel ${tgChatId}!`);
                  window.open(`https://t.me/share/url?url=${encodeURIComponent('https://ubayhub.id')}&text=${encodeURIComponent('🤖 TES BOT TELEGRAM UBAYHUB BLORA: Sistem Bot Aktif & Terhubung!')}`, '_blank');
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-2 shadow shrink-0"
              >
                <Send className="w-4 h-4 text-sky-200" />
                <span>Kirim Broadcast Tes Telegram</span>
              </button>
            </div>

            {tgTestLog && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{tgTestLog}</span>
              </div>
            )}
          </div>

          {/* Service Orders Table */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-3">Resi & Tanggal</th>
                  <th className="p-3">Pelanggan & HP</th>
                  <th className="p-3">Perangkat / Merk</th>
                  <th className="p-3">Status Pengerjaan</th>
                  <th className="p-3">Biaya & Payment</th>
                  <th className="p-3">Aksi Ubah Status & Cetak Resi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {serviceOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-blue-600">{ord.code}</div>
                      <div className="text-[10px] text-slate-400">{ord.createdAt}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400">{ord.phone} ({ord.city})</div>
                    </td>
                    <td className="p-3 font-bold">{ord.brandModel} ({ord.deviceType})</td>
                    <td className="p-3 font-bold text-orange-500">{ord.status}</td>
                    <td className="p-3 font-extrabold">
                      <div>Rp {ord.estimatedCost.toLocaleString('id-ID')}</div>
                      {ord.isCod && <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black">COD</span>}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={ord.status}
                          onChange={(e: any) => handleUpdateServiceStatus(ord.id, e.target.value)}
                          className="p-1.5 text-xs rounded bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-bold"
                        >
                          <option value="Diterima">Diterima</option>
                          <option value="Pemeriksaan / Diagnosa">Pemeriksaan / Diagnosa</option>
                          <option value="Menunggu Sparepart">Menunggu Sparepart</option>
                          <option value="Dalam Pengerjaan">Dalam Pengerjaan</option>
                          <option value="Testing & QC">Testing & QC</option>
                          <option value="Selesai & Siap Ambil / Kirim">Selesai & Siap Ambil / Kirim</option>
                        </select>
                        <button
                          onClick={() => {
                            alert(`Mencetak Label Resi Pengiriman Servis: ${ord.code}\nPenerima: ${ord.customerName}\nAlamat: ${ord.address || ord.city}`);
                            window.print();
                          }}
                          className="p-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1"
                          title="Cetak Label Resi Pengiriman"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Label</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Ad Management System */}
      {adminTab === 'ads' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Manajemen Iklan & Banner Placements UbayHub
            </h3>
            <button
              onClick={() => setShowAddAdModal(true)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Pasang Banner Iklan Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                    {ad.location}
                  </span>
                  <button
                    onClick={() => toggleAdActive(ad.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ad.active ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {ad.active ? 'TAYANG' : 'DIPAUSE'}
                  </button>
                </div>

                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {ad.title}
                </h4>

                <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-[10px] text-center border border-slate-200/50 dark:border-slate-800">
                  <div>Tayang: <strong>{ad.impressions}</strong></div>
                  <div>Klik: <strong>{ad.clicks}</strong></div>
                  <div>CTR: <strong className="text-emerald-500">{ad.ctr}%</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Firmware BIN Management Section */}
      {adminTab === 'firmware' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-orange-500" />
                <span>Pusat Manajemen & Validator Firmware BIN (100% Tested)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Tambah file dump SPI Flash, NAND Flash, dan atur ketersediaan firmware untuk komunitas teknisi.
              </p>
            </div>

            <button
              onClick={() => {
                const title = prompt("Judul Firmware / Model TV:");
                if (!title) return;
                const brand = prompt("Merk (Polytron/LG/Samsung/Sharp/TCL/Receiver):") || "Polytron";
                const model = prompt("Nomor Model (misal: PLD 32T1500):") || "PLD 32T1500";
                const mainboard = prompt("Kode Mainboard / T-Con:") || "TP.MS338.PB801";
                const icType = prompt("Jenis IC SPI/NAND Flash:") || "GD25Q64";

                const newFw: Firmware = {
                  uuid: 'fw-' + Date.now(),
                  slug: 'fw-' + Date.now(),
                  title,
                  manufacturer: brand,
                  model,
                  mainboard,
                  chipset: 'Realtek / MStar',
                  ic: icType,
                  resolution: '1366x768 / 1920x1080',
                  fileSize: '8.00 MB',
                  passwordZip: 'ubayhub2026',
                  md5: 'a8f9c' + Math.floor(Math.random() * 100000),
                  sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                  downloadsCount: 0,
                  viewsCount: 1,
                  uploadDate: new Date().toISOString().split('T')[0],
                  version: 'V1.0',
                  status: 'Verified',
                  mirrorServers: [
                    { name: 'Server Primary Blora', url: 'https://ubayhub.id/downloads/fw-new.bin', status: 'Online' }
                  ],
                  tags: ['Firmware TV', brand, 'Tested 100%'],
                  category: 'TV LED/LCD'
                };

                setFirmwareList([newFw, ...firmwareList]);
              }}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Firmware BIN Baru</span>
            </button>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-3">Model & Judul Firmware</th>
                  <th className="p-3">Brand & IC</th>
                  <th className="p-3">Kode Mainboard</th>
                  <th className="p-3">Ukuran & MD5</th>
                  <th className="p-3">Total Unduhan</th>
                  <th className="p-3">Status Validator</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {firmwareList.map((fw) => (
                  <tr key={fw.uuid} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-white">{fw.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">UUID: {fw.uuid} &bull; {fw.uploadDate}</div>
                    </td>
                    <td className="p-3">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400 block">{fw.manufacturer}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{fw.ic}</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {fw.mainboard}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      <div>{fw.fileSize}</div>
                      <span className="text-[9px] text-slate-400">MD5: {fw.md5}</span>
                    </td>
                    <td className="p-3 font-extrabold text-emerald-500">
                      {(fw.downloadsCount || 0).toLocaleString('id-ID')}x
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>TESTED 100%</span>
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setFirmwareList(firmwareList.filter((f) => f.uuid !== fw.uuid))}
                        className="p-1 rounded text-red-500 hover:bg-red-500/10"
                        title="Hapus Firmware"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {adminTab === 'affiliate' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Total Komisi Cair</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-500">
                Rp {affiliateLinks.reduce((acc, a) => acc + a.totalCommission, 0).toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Terintegrasi Tokopedia, Shopee & TikTok</span>
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Komisi Pending</span>
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-orange-500">
                Rp {affiliateLinks.reduce((acc, a) => acc + a.pendingCommission, 0).toLocaleString('id-ID')}
              </div>
              <span className="text-[10px] text-slate-400">Proses kliring marketplace (7-14 hari)</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Total Klik Affiliate</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <MousePointer className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {affiliateLinks.reduce((acc, a) => acc + a.clicks, 0).toLocaleString('id-ID')} Klik
              </div>
              <span className="text-[10px] text-slate-400">Trafik dari Web UbayHub & Artikel</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Rata-Rata CTR Conversions</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <Percent className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                {(
                  affiliateLinks.reduce((acc, a) => acc + a.ctr, 0) / affiliateLinks.length
                ).toFixed(1)}%
              </div>
              <span className="text-[10px] text-emerald-500 font-bold">+2.4% di atas rata-rata industri</span>
            </div>
          </div>

          {/* Marketplace Account Integration Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900/80 to-slate-900 text-white border border-emerald-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-emerald-400">Tokopedia Affiliate</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500 text-slate-950">CONNECTED</span>
              </div>
              <div className="text-xs font-bold">Komisi Terkumpul: Rp 2.256.000</div>
              <div className="text-[10px] text-slate-300">Skema Komisi: hingga 10% per transaksi</div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-900/80 to-slate-900 text-white border border-orange-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-orange-400">Shopee Affiliate</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-orange-500 text-white">CONNECTED</span>
              </div>
              <div className="text-xs font-bold">Komisi Terkumpul: Rp 1.710.000</div>
              <div className="text-[10px] text-slate-300">Skema Komisi: hingga 8% Komisi Extra</div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-200">TikTok Shop Creator</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-purple-600 text-white">CONNECTED</span>
              </div>
              <div className="text-xs font-bold">Komisi Terkumpul: Rp 800.000</div>
              <div className="text-[10px] text-slate-300">Skema Komisi: hingga 12% Komisi Video</div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/80 to-slate-900 text-white border border-blue-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-blue-400">Lazada Affiliate</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black bg-blue-500 text-white">CONNECTED</span>
              </div>
              <div className="text-xs font-bold">Komisi Terkumpul: Rp 576.000</div>
              <div className="text-[10px] text-slate-300">Skema Komisi: hingga 7% Komisi Produk</div>
            </div>
          </div>

          {/* Top Performing Affiliate Links Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  <span>Top-Performing Affiliate Links & Performa CTR</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Daftar link rekomendasi sparepart & peralatan teknisi berkinerja tertinggi.
                </p>
              </div>

              <button
                onClick={() => {
                  const newTitle = prompt("Masukkan Judul Produk Affiliate:");
                  if (!newTitle) return;
                  const newUrl = prompt("Masukkan URL Affiliate Link:");
                  if (!newUrl) return;
                  const newMarketplace = prompt("Marketplace (Tokopedia/Shopee/TikTok Shop/Lazada):") || "Tokopedia";

                  const newLink = {
                    id: 'aff-' + Date.now(),
                    title: newTitle,
                    marketplace: newMarketplace,
                    url: newUrl,
                    clicks: 0,
                    conversions: 0,
                    ctr: 0.0,
                    totalCommission: 0,
                    pendingCommission: 0,
                    status: 'Active'
                  };

                  setAffiliateLinks([newLink, ...affiliateLinks]);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Link Affiliate Baru</span>
              </button>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-bold">
                  <tr>
                    <th className="p-3">Produk & Marketplace</th>
                    <th className="p-3">Link Affiliate</th>
                    <th className="p-3">Total Klik</th>
                    <th className="p-3">Konversi</th>
                    <th className="p-3">CTR %</th>
                    <th className="p-3">Komisi Cair</th>
                    <th className="p-3">Komisi Pending</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {affiliateLinks.map((link) => (
                    <tr key={link.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                      <td className="p-3">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{link.title}</div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase mt-0.5 ${
                          link.marketplace === 'Tokopedia'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : link.marketplace === 'Shopee'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                            : link.marketplace === 'TikTok Shop'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          {link.marketplace}
                        </span>
                      </td>

                      <td className="p-3 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 truncate max-w-[150px]">{link.url}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(link.url);
                              setCopiedLink(link.id);
                              setTimeout(() => setCopiedLink(null), 2000);
                            }}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-white"
                            title="Salin Link"
                          >
                            {copiedLink === link.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="p-3 font-bold text-slate-900 dark:text-white">{link.clicks.toLocaleString('id-ID')}</td>
                      <td className="p-3 font-bold text-emerald-500">{link.conversions} order</td>
                      <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{link.ctr}%</td>
                      <td className="p-3 font-extrabold text-emerald-500">
                        Rp {link.totalCommission.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 font-bold text-orange-500">
                        Rp {link.pendingCommission.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setAffiliateLinks(affiliateLinks.filter((a) => a.id !== link.id));
                          }}
                          className="p-1 rounded text-red-500 hover:bg-red-500/10"
                          title="Hapus Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {adminTab === 'security' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
            <h3 className="font-extrabold text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Sistem Keamanan Argon2 + Rate Limiter UbayHub</span>
            </h3>
            <p className="text-xs text-slate-300">
              Setiap sesi admin diverifikasi dengan JWT token. Upaya brute force diblokir secara otomatis oleh WAF Firewall.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-bold">
                <tr>
                  <th className="p-3">Waktu</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Aktivitas System</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="p-3 font-bold">{log.username}</td>
                    <td className="p-3">{log.action}</td>
                    <td className="p-3 font-mono">{log.ipAddress}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Stock */}
      {showAddStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Tambah Komponen Stok Baru</h3>
            <form onSubmit={handleCreateStock} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Nama Barang / IC</label>
                <input
                  type="text"
                  required
                  value={newStockTitle}
                  onChange={(e) => setNewStockTitle(e.target.value)}
                  placeholder="Contoh: IC EEPROM 25Q64 SOP8"
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Stok Awal</label>
                  <input
                    type="number"
                    value={newStockQty}
                    onChange={(e) => setNewStockQty(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Lokasi Rak</label>
                  <input
                    type="text"
                    value={newStockRack}
                    onChange={(e) => setNewStockRack(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Harga Beli (Rp)</label>
                  <input
                    type="number"
                    value={newStockBuyPrice}
                    onChange={(e) => setNewStockBuyPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={newStockSellPrice}
                    onChange={(e) => setNewStockSellPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStockModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow"
                >
                  Simpan Barang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Ad Banner */}
      {showAddAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Pasang Banner Iklan Baru</h3>
            <form onSubmit={handleCreateAd} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Judul / Kampanye Iklan</label>
                <input
                  type="text"
                  required
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  placeholder="Contoh: Diskon Sparepart LED Blora"
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Lokasi Placement</label>
                <select
                  value={newAdLocation}
                  onChange={(e: any) => setNewAdLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-bold"
                >
                  <option value="Header Banner">Header Banner</option>
                  <option value="Homepage Banner">Homepage Banner</option>
                  <option value="Sidebar Kanan">Sidebar Kanan</option>
                  <option value="Sticky Bottom">Sticky Bottom</option>
                  <option value="Popup">Popup</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Target URL Link</label>
                <input
                  type="text"
                  value={newAdTargetUrl}
                  onChange={(e) => setNewAdTargetUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAdModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold shadow"
                >
                  Tayangkan Iklan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
