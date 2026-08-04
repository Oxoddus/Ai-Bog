import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import {
  Search,
  Download,
  ShoppingBag,
  Wrench,
  BookOpen,
  Users,
  Bot,
  ShieldCheck,
  Moon,
  Sun,
  Menu,
  X,
  PhoneCall,
  MapPin,
  Clock,
  Palette
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  cartCount: number;
  openCart: () => void;
  openAiModal: () => void;
  openBrandModal: () => void;
  openLoginModal: () => void;
  isAdminLoggedIn: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  cartCount,
  openCart,
  openAiModal,
  openBrandModal,
  openLoginModal,
  isAdminLoggedIn,
  searchQuery,
  setSearchQuery,
  onSearchSubmit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: BookOpen },
    { id: 'firmware', label: 'Download Firmware', icon: Download, badge: 'Anti Link Mati' },
    { id: 'shop', label: 'Toko Sparepart', icon: ShoppingBag },
    { id: 'service', label: 'Service & Tracking', icon: Wrench, badge: 'Luar Kota' },
    { id: 'articles', label: 'Kasus Kerusakan', icon: BookOpen },
    { id: 'technicians', label: 'Teknisi & Toko', icon: Users, badge: 'Blora' },
    { id: 'admin', label: 'Dashboard Admin', icon: ShieldCheck, badge: 'Pro' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Bar Announcement */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-900 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-black text-orange-300 tracking-wide">
              ⚡ TOKO ELEKTRONIK ONLINE & OFFLINE TERLENGKAP DI BLORA
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Workshop UbayHub: Jl. Pemuda No. 88, Blora Kota, Jawa Tengah</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>Buka: Senin - Sabtu (08.00 - 20.00 WIB)</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openBrandModal}
              className="flex items-center gap-1 text-xs font-semibold text-orange-300 hover:text-white transition"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Brand Guidelines & Logo</span>
            </button>
            <span className="text-slate-400">|</span>
            <a
              href="https://wa.me/6281326889900?text=Halo%20Admin%20UbayHub%20Blora,%20saya%20butuh%20bantuan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-orange-300 hover:text-orange-200 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Hotline WhatsApp: 0813-2688-9900</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with Tagline Prioritized */}
          <div
            className="cursor-pointer"
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
          >
            <Logo variant="full" size="md" showTagline={true} />
          </div>

          {/* Live Search Bar */}
          <form onSubmit={onSearchSubmit} className="hidden lg:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Firmware, Kode Error TV, IC, Sparepart, atau Resi Servis..."
              className="w-full pl-10 pr-24 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white text-slate-900 placeholder-slate-400"
            />
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1 top-1 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
            >
              Cari
            </button>
          </form>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* UbayAI Diagnostic Assistant Button */}
            <button
              onClick={openAiModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold shadow-md hover:shadow-orange-500/20 transition"
              title="UbayAI Repair Diagnostic Assistant"
            >
              <Bot className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">UbayAI Diagnosis</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              title="Keranjang Sparepart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-orange-600 text-white text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              title="Ganti Mode Gelap/Terang"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Admin Login / Dashboard Button - High Visibility */}
            <button
              onClick={openLoginModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition shadow-sm border ${
                isAdminLoggedIn
                  ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
              }`}
              title="Akses Dashboard Admin UbayHub"
            >
              <ShieldCheck className="w-4 h-4 text-white animate-pulse" />
              <span>
                {isAdminLoggedIn ? 'Dashboard Admin' : 'Login Admin'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'admin' && !isAdminLoggedIn) {
                    openLoginModal();
                  } else {
                    setCurrentTab(item.id);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 text-[9px] rounded font-extrabold uppercase ${
                      isActive ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <form onSubmit={onSearchSubmit} className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Firmware, Kode Error, IC..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </form>

            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'admin' && !isAdminLoggedIn) {
                        openLoginModal();
                      } else {
                        setCurrentTab(item.id);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-bold transition text-left ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  openBrandModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
              >
                <Palette className="w-4 h-4 text-orange-500" />
                <span>Lihat Brand Guidelines & Logo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
