import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  X,
  PhoneCall,
  Bot,
  User,
  ExternalLink,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  Megaphone,
  ShoppingBag,
  Wrench,
  Download
} from 'lucide-react';
import { AdBanner } from '../../types';

interface FloatingWidgetsProps {
  ads: AdBanner[];
  onAdClick: (adId: string) => void;
  openAiModal: () => void;
  setCurrentTab: (tab: string) => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  ads,
  onAdClick,
  openAiModal,
  setCurrentTab
}) => {
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [showPopupAd, setShowPopupAd] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: 'cs' | 'user'; text: string; time: string; linkTab?: string }[]
  >([
    {
      sender: 'cs',
      text: 'Halo! Selamat datang di UbayHub Blora. Ada yang bisa kami bantu seputar Service TV, Firmware, atau Sparepart?',
      time: '12:00'
    }
  ]);
  const [inputChat, setInputChat] = useState('');

  const stickyAd = ads.find((a) => a.active && a.location === 'Sticky Bottom') || ads[0];

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userText = inputChat;
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputChat('');

    // Automated CS response based on keywords
    setTimeout(() => {
      let reply = 'Terima kasih telah menghubungi UbayHub Blora. Tim Customer Service / Teknisi kami akan merespons pesan Anda secara otomatis.';
      let linkTab: string | undefined = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes('resi') || lower.includes('service') || lower.includes('lacak') || lower.includes('servis')) {
        reply = 'Untuk melacak status servis atau mendaftar servis luar kota, Anda dapat melihat halaman Tracking Servis UbayHub.';
        linkTab = 'service';
      } else if (lower.includes('firmware') || lower.includes('bin') || lower.includes('download')) {
        reply = 'Seluruh firmware TV & Elektronik UbayHub teruji 100% dengan proteksi Anti-Link Mati. Silakan buka tab Download Firmware.';
        linkTab = 'firmware';
      } else if (lower.includes('ic') || lower.includes('sparepart') || lower.includes('stok') || lower.includes('beli')) {
        reply = 'Anda bisa memesan sparepart & komponen IC langsung via Toko Online UbayHub atau Tokopedia/Shopee Affiliate kami.';
        linkTab = 'shop';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'cs',
          text: reply,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          linkTab
        }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Buttons Stack (WhatsApp, Telegram, Live Chat) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        {/* Sticky Bottom Ad Space Bar */}
        {stickyAd && (
          <div className="mb-1 p-2.5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-orange-950 text-white shadow-2xl border border-blue-800/80 backdrop-blur-md max-w-sm hidden sm:block animate-fadeIn">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-orange-400 mb-1">
              <span className="flex items-center gap-1">
                <Megaphone className="w-3 h-3 text-orange-400" />
                <span>SPONSOR & PROMO UBAYHUB</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-orange-500/30 text-orange-300">IKLAN</span>
            </div>
            <a
              href={stickyAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAdClick(stickyAd.id)}
              className="text-xs font-bold hover:underline text-slate-100 flex items-center justify-between gap-2"
            >
              <span className="line-clamp-1">{stickyAd.title}</span>
              <span className="px-2 py-0.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black shrink-0">
                KLIK DISINI
              </span>
            </a>
          </div>
        )}

        {/* Floating Telegram Group Button */}
        <a
          href="https://t.me/ubayhub_blora"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-xl hover:scale-110 transition duration-200 flex items-center justify-center group relative"
          title="Gabung Grup Telegram Teknisi Blora"
        >
          <Send className="w-5 h-5 -rotate-45" />
          <span className="absolute right-14 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md pointer-events-none">
            Grup Telegram Teknisi
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/6281326889900?text=Halo%20Admin%20UbayHub%20Blora,%20saya%20mau%20tanya%20seputar%20Service%20/%20Firmware%20/%20Sparepart"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:scale-110 transition duration-200 flex items-center justify-center group relative ring-4 ring-emerald-500/20"
          title="Chat CS WhatsApp UbayHub Blora"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
          <span className="absolute right-16 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md pointer-events-none">
            WhatsApp Online (0813-2688-9900)
          </span>
        </a>

        {/* Floating Live Chat Widget Toggle */}
        <button
          onClick={() => setIsLiveChatOpen(!isLiveChatOpen)}
          className="px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-2xl hover:scale-105 transition flex items-center gap-2 border border-orange-400/30"
        >
          <Bot className="w-5 h-5 animate-bounce" />
          <span>Live Chat CS UbayHub</span>
        </button>
      </div>

      {/* Live Chat Modal Window */}
      {isLiveChatOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[450px] text-slate-900 dark:text-slate-100 animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between shadow">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-black text-xs">
                  UB
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs">CS Live Support UbayHub</h4>
                <span className="text-[10px] text-slate-300">Respon Cepat &bull; Toko Blora</span>
              </div>
            </div>

            <button
              onClick={() => setIsLiveChatOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[10px] font-bold">
            <button
              onClick={() => {
                setCurrentTab('service');
                setIsLiveChatOpen(false);
              }}
              className="px-2.5 py-1 rounded-full bg-blue-600 text-white whitespace-nowrap flex items-center gap-1"
            >
              <Wrench className="w-3 h-3" />
              <span>Lacak Resi Servis</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('firmware');
                setIsLiveChatOpen(false);
              }}
              className="px-2.5 py-1 rounded-full bg-orange-600 text-white whitespace-nowrap flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Cari Firmware BIN</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('shop');
                setIsLiveChatOpen(false);
              }}
              className="px-2.5 py-1 rounded-full bg-emerald-600 text-white whitespace-nowrap flex items-center gap-1"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Stok Component</span>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50 dark:bg-slate-950/60">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed space-y-1 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.linkTab && (
                    <button
                      onClick={() => {
                        setCurrentTab(msg.linkTab!);
                        setIsLiveChatOpen(false);
                      }}
                      className="mt-1 px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold flex items-center gap-1 shadow"
                    >
                      <span>Buka Halaman Sekarang</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendChatMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              className="flex-1 p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
