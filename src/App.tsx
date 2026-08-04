/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Views
import { HomeView } from './components/views/HomeView';
import { FirmwareView } from './components/views/FirmwareView';
import { ShopView } from './components/views/ShopView';
import { ServiceView } from './components/views/ServiceView';
import { ArticlesView } from './components/views/ArticlesView';
import { TechniciansView } from './components/views/TechniciansView';
import { AdminDashboardView } from './components/views/AdminDashboardView';

// Modals
import { BrandGuidelineModal } from './components/modals/BrandGuidelineModal';
import { AiDiagnosticModal } from './components/modals/AiDiagnosticModal';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { LoginAdminModal } from './components/modals/LoginAdminModal';
import { FloatingWidgets } from './components/common/FloatingWidgets';

// Mock Data & Types
import {
  INITIAL_FIRMWARES,
  INITIAL_PRODUCTS,
  INITIAL_STOCK,
  INITIAL_SERVICE_ORDERS,
  INITIAL_ARTICLES,
  INITIAL_TECHNICIANS,
  INITIAL_SHOPS,
  INITIAL_ADS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS
} from './data/mockData';

import {
  Firmware,
  Product,
  StockItem,
  ServiceOrder,
  Article,
  Technician,
  Shop,
  AdBanner,
  User,
  AuditLog
} from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Data States
  const [firmwares, setFirmwares] = useState<Firmware[]>(INITIAL_FIRMWARES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(INITIAL_SERVICE_ORDERS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [ads, setAds] = useState<AdBanner[]>(INITIAL_ADS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Cart State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  // Selected Items for Modals
  const [selectedFirmware, setSelectedFirmware] = useState<Firmware | null>(null);
  const [trackedServiceCode, setTrackedServiceCode] = useState('UB-2026-8891');

  // Modals visibility
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Admin Auth State
  const [adminUser, setAdminUser] = useState<User | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dynamic SEO Meta Tag Injection
  useEffect(() => {
    const seoMap: Record<string, { title: string; description: string }> = {
      home: {
        title: 'UbayHub - Toko Elektronik Online & Offline Terlengkap di Blora',
        description: 'Pusat elektronik, sparepart, firmware BIN, dan service elektronik online & offline terbesar di Kabupaten Blora.'
      },
      firmware: {
        title: 'Download Firmware TV & MCU Tested 100% | UbayHub Blora',
        description: 'Download firmware TV LED/LCD, receiver parabola, IC EEPROM, dan file BIN microcontroller teruji 100% gratis.'
      },
      shop: {
        title: 'Toko Sparepart & Komponen IC Elektronik | UbayHub Blora',
        description: 'Jual sparepart elektronik, IC EEPROM, mainboard TV, alat solder, dan komponen terlengkap di Blora.'
      },
      service: {
        title: 'Lacak Status Service TV & Elektronik | UbayHub Blora',
        description: 'Layanan perbaikan & tracking status service elektronik transparan online untuk wilayah Blora & sekitarnya.'
      },
      articles: {
        title: 'Panduan & Solusi Kasus Kerusakan TV | UbayHub Blora',
        description: 'Kumpulan artikel teknik, diagram skema, dan tutorial analisis kerusakan TV LED/LCD untuk teknisi.'
      },
      technicians: {
        title: 'Direktori Teknisi & Toko Elektronik Blora | UbayHub',
        description: 'Komunitas teknisi profesional & lokasi toko elektronik terpercaya di seluruh Kabupaten Blora.'
      },
      admin: {
        title: 'Dashboard Manajemen Admin | UbayHub Blora',
        description: 'Portal administrasi UbayHub untuk pengelolaan stok, pesanan servis, iklan banner, dan laporan affiliate.'
      }
    };

    const currentSeo = seoMap[currentTab] || seoMap.home;
    document.title = currentSeo.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentSeo.description);
  }, [currentTab]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
      );
    }
  };

  const handleClearCart = () => setCart([]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Route search query intelligently
    if (searchQuery.toLowerCase().startsWith('ub-')) {
      setTrackedServiceCode(searchQuery.toUpperCase());
      setCurrentTab('service');
    } else {
      setCurrentTab('firmware');
    }
  };

  const handleAdClick = (adId: string) => {
    setAds((prev) =>
      prev.map((a) => {
        if (a.id === adId) {
          const newClicks = a.clicks + 1;
          const newCtr = Number(((newClicks / (a.impressions || 1)) * 100).toFixed(2));
          return { ...a, clicks: newClicks, ctr: newCtr };
        }
        return a;
      })
    );
  };

  const handleAddNewServiceOrder = (newOrder: Partial<ServiceOrder>) => {
    setServiceOrders((prev) => [newOrder as ServiceOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-orange-500 selection:text-white flex flex-col justify-between overflow-x-hidden max-w-full w-full">
      {/* Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartCount}
        openCart={() => setIsCheckoutModalOpen(true)}
        openAiModal={() => setIsAiModalOpen(true)}
        openBrandModal={() => setIsBrandModalOpen(true)}
        openLoginModal={() => {
          if (adminUser) setCurrentTab('admin');
          else setIsLoginModalOpen(true);
        }}
        isAdminLoggedIn={!!adminUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main View Router */}
      <main className="flex-1 overflow-x-hidden max-w-full w-full">
        {currentTab === 'home' && (
          <HomeView
            firmwares={firmwares}
            products={products}
            serviceOrders={serviceOrders}
            articles={articles}
            ads={ads}
            setCurrentTab={setCurrentTab}
            openAiModal={() => setIsAiModalOpen(true)}
            openFirmwareModal={(fw) => {
              setSelectedFirmware(fw);
              setCurrentTab('firmware');
            }}
            onAdClick={handleAdClick}
            onTrackSubmit={(code) => {
              setTrackedServiceCode(code);
              setCurrentTab('service');
            }}
          />
        )}

        {currentTab === 'firmware' && (
          <FirmwareView
            firmwares={firmwares}
            selectedFirmware={selectedFirmware}
            setSelectedFirmware={setSelectedFirmware}
            openDownloadModal={(fw) => setSelectedFirmware(fw)}
          />
        )}

        {currentTab === 'shop' && (
          <ShopView
            products={products}
            onAddToCart={handleAddToCart}
            openCheckout={() => setIsCheckoutModalOpen(true)}
          />
        )}

        {currentTab === 'service' && (
          <ServiceView
            serviceOrders={serviceOrders}
            onSubmitNewService={handleAddNewServiceOrder}
            trackedCode={trackedServiceCode}
          />
        )}

        {currentTab === 'articles' && (
          <ArticlesView
            articles={articles}
            firmwares={firmwares}
            onSelectArticle={() => {}}
            openFirmwareModal={(fw) => {
              setSelectedFirmware(fw);
              setCurrentTab('firmware');
            }}
          />
        )}

        {currentTab === 'technicians' && (
          <TechniciansView technicians={technicians} shops={shops} />
        )}

        {currentTab === 'admin' && adminUser && (
          <AdminDashboardView
            currentUser={adminUser}
            stock={stock}
            serviceOrders={serviceOrders}
            firmwares={firmwares}
            ads={ads}
            auditLogs={auditLogs}
            onLogout={() => {
              setAdminUser(null);
              setCurrentTab('home');
            }}
            onUpdateStock={setStock}
            onUpdateServiceOrders={setServiceOrders}
            onUpdateAds={setAds}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        openBrandModal={() => setIsBrandModalOpen(true)}
      />

      {/* Floating Interactive Widgets (WhatsApp, Telegram, Live Chat, Sticky Ad) */}
      <FloatingWidgets
        ads={ads}
        onAdClick={handleAdClick}
        openAiModal={() => setIsAiModalOpen(true)}
        setCurrentTab={setCurrentTab}
      />

      {/* Modals */}
      <BrandGuidelineModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />

      <AiDiagnosticModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <LoginAdminModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setCurrentTab('admin');
        }}
      />
    </div>
  );
}
