import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, Download, Database, Check, ShieldCheck, Sparkles, Smartphone, HardDrive } from 'lucide-react';

export const OfflineStatusIndicator: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstalled(true);
        }
        setDeferredPrompt(null);
      });
    } else {
      alert('Aplikasi UbayHub PWA sudah siap di-install! Gunakan menu "Tambahkan ke Layar Utama" di browser Anda.');
    }
  };

  return (
    <>
      {/* Permanent Offline Top Banner for Technicians in Remote Blora Areas */}
      {isOffline && (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-md border-b border-amber-500/50 animate-fadeIn z-50">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>
              <strong>Mode Offline Teknisi Aktif (PWA Service Worker Cache):</strong> Anda sedang offline di area Blora tanpa sinyal. Artikel & Firmware yang tersimpan tetap dapat dibaca!
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] bg-amber-900/40 px-2.5 py-1 rounded-lg border border-amber-400/30">
            <Database className="w-3.5 h-3.5 text-amber-300" />
            <span>Cache Offline Ready (ubayhub-cache-v1)</span>
          </div>
        </div>
      )}

      {/* Online Restored Toast */}
      {!isOffline && showNotification && (
        <div className="fixed top-4 right-4 z-50 p-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-xs font-bold flex items-center gap-2 border border-emerald-400 animate-bounce">
          <Wifi className="w-4 h-4 text-emerald-200" />
          <span>Koneksi Internet Terhubung Kembali! Sinkronisasi otomatis aktif.</span>
        </div>
      )}

      {/* PWA Install Promo Floating Button if install prompt is available */}
      {deferredPrompt && (
        <div className="fixed bottom-20 left-4 z-40">
          <button
            onClick={handleInstallClick}
            className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-black shadow-xl flex items-center gap-2 border border-blue-400/30 animate-pulse"
          >
            <Smartphone className="w-4 h-4 text-amber-300" />
            <span>Install UbayHub PWA App</span>
          </button>
        </div>
      )}
    </>
  );
};
