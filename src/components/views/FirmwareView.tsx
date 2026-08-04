import React, { useState } from 'react';
import { Firmware } from '../../types';
import {
  Download,
  Search,
  ShieldCheck,
  Key,
  Clock,
  Server,
  AlertTriangle,
  Lock,
  Copy,
  Check,
  FileCheck,
  Info,
  RefreshCw,
  ExternalLink,
  Eye
} from 'lucide-react';
import { FirmwarePreviewModal } from '../common/FirmwarePreviewModal';

interface FirmwareViewProps {
  firmwares: Firmware[];
  selectedFirmware: Firmware | null;
  setSelectedFirmware: (fw: Firmware | null) => void;
  openDownloadModal: (fw: Firmware) => void;
}

export const FirmwareView: React.FC<FirmwareViewProps> = ({
  firmwares,
  selectedFirmware,
  setSelectedFirmware,
  openDownloadModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [copiedMd5, setCopiedMd5] = useState(false);
  const [previewFirmware, setPreviewFirmware] = useState<Firmware | null>(null);

  // Download Token Modal States
  const [downloadStep, setDownloadStep] = useState<'details' | 'captcha' | 'generating' | 'ready'>('details');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('BLORA9');
  const [countdown, setCountdown] = useState(5);
  const [signedDownloadUrl, setSignedDownloadUrl] = useState('');
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  const brands = ['All', 'Polytron', 'Samsung', 'LG', 'Sharp', 'Universal Board'];

  const filteredFirmwares = firmwares.filter((fw) => {
    const matchesSearch =
      fw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fw.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fw.mainboard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fw.chipset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fw.ic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = selectedBrand === 'All' || fw.manufacturer === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  const handleStartDownloadFlow = (fw: Firmware) => {
    setSelectedFirmware(fw);
    setDownloadStep('details');
    setCaptchaInput('');
    setCountdown(5);
  };

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const handleVerifyCaptcha = async () => {
    if (captchaInput.toUpperCase() !== captchaCode) {
      alert("Kode CAPTCHA tidak cocok! Silakan coba lagi.");
      refreshCaptcha();
      return;
    }

    setDownloadStep('generating');

    // Simulate countdown and trigger server API
    let secondsLeft = 5;
    const timer = setInterval(() => {
      secondsLeft -= 1;
      setCountdown(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(timer);
        generateSignedToken();
      }
    }, 1000);
  };

  const generateSignedToken = async () => {
    if (!selectedFirmware) return;

    try {
      const response = await fetch('/api/firmware/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firmwareId: selectedFirmware.uuid,
          firmwareTitle: selectedFirmware.title,
          fileUrl: selectedFirmware.mirrorServers[0]?.url,
          checksum: selectedFirmware.sha256
        })
      });

      const data = await response.json();
      setTokenInfo(data);
      setSignedDownloadUrl(data.downloadUrl);
      setDownloadStep('ready');
    } catch (err) {
      console.error(err);
      alert("Gagal menerbitkan signed token download. Membuka mirror cadangan...");
    }
  };

  const handleCopyMd5 = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMd5(true);
    setTimeout(() => setCopiedMd5(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Anti-Dead Link Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white border border-blue-800/60 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Database Firmware Mapping Anti Link Mati (UUID Signed)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pusat Download Firmware TV, Laptop, & Module Elektronik
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Seluruh file hasil dump tim teknisi UbayHub Blora teruji 100% normal. Dilengkapi verifikasi Checksum MD5/SHA256, password zip transparan, dan mirror server berkecepatan tinggi.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 shrink-0 space-y-1">
          <div className="font-bold text-orange-400">Status Server Download:</div>
          <div>Node #1 (Blora Primary): <span className="text-emerald-400 font-bold">ONLINE</span></div>
          <div>Cloudflare Mirror R2: <span className="text-emerald-400 font-bold">ONLINE</span></div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan Merk, Tipe TV, Kode Mainboard (ex: MS33933), Chipset (ex: MStar), IC (ex: 25Q64)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  Filter Merk: {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Firmware Items Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <strong>{filteredFirmwares.length}</strong> file firmware terverifikasi
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFirmwares.map((fw) => (
            <div
              key={fw.uuid}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition space-y-3 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 font-bold rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {fw.manufacturer}
                  </span>
                  <span className="px-2 py-0.5 font-bold rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                    Mainboard: {fw.mainboard}
                  </span>
                  <span className="px-2 py-0.5 font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {fw.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                  {fw.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {fw.description}
                </p>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-[11px] font-sans border border-slate-200/50 dark:border-slate-800">
                  <div>Model: <strong>{fw.model}</strong></div>
                  <div>Chipset: <strong>{fw.chipset}</strong></div>
                  <div>IC Flash: <strong>{fw.ic}</strong></div>
                  <div>Ukuran File: <strong>{fw.fileSize}</strong></div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/80 text-xs">
                <span className="text-slate-500 text-[11px]">
                  Diunduh: <strong>{fw.downloadsCount} kali</strong>
                </span>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setPreviewFirmware(fw)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                    title="Preview Card Detail BIN & Checksum"
                  >
                    <Eye className="w-3.5 h-3.5 text-orange-500" />
                    <span>Preview BIN</span>
                  </button>

                  <button
                    onClick={() => handleStartDownloadFlow(fw)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signed Download Modal Dialog */}
      {selectedFirmware && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto text-slate-900 dark:text-slate-100">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-orange-400" />
                <h3 className="font-extrabold text-sm">Unduh Firmware Secure Gateway</h3>
              </div>
              <button
                onClick={() => setSelectedFirmware(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-orange-500 uppercase">
                  UUID: {selectedFirmware.uuid}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {selectedFirmware.title}
                </h4>
              </div>

              {/* Password Zip & MD5 info */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Password ZIP:</span>
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    {selectedFirmware.passwordZip}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">MD5 Checksum:</span>
                  <button
                    onClick={() => handleCopyMd5(selectedFirmware.md5)}
                    className="font-mono text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>{selectedFirmware.md5.substring(0, 16)}...</span>
                    {copiedMd5 ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {downloadStep === 'details' && (
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-blue-950/40 text-blue-300 border border-blue-800/50 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      Sistem menggunakan Database Mapping Anti-Link Mati. Token temporer berlaku 15 menit setelah diterbitkan.
                    </span>
                  </div>

                  <button
                    onClick={() => setDownloadStep('captcha')}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow flex items-center justify-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    <span>Lanjut Verifikasi Captcha</span>
                  </button>
                </div>
              )}

              {downloadStep === 'captcha' && (
                <div className="space-y-3 pt-2 animate-fadeIn">
                  <label className="block font-bold">Verifikasi Captcha Anti Hotlink:</label>
                  <div className="flex gap-2">
                    <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-base font-extrabold tracking-widest text-orange-400 flex items-center justify-center select-none shrink-0">
                      {captchaCode}
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Masukkan 6 Kode"
                      className="flex-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white uppercase font-bold"
                    />
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleVerifyCaptcha}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow"
                  >
                    Verifikasi & Terbitkan Signed Token
                  </button>
                </div>
              )}

              {downloadStep === 'generating' && (
                <div className="py-8 text-center space-y-3 animate-fadeIn">
                  <RefreshCw className="w-8 h-8 mx-auto text-orange-500 animate-spin" />
                  <div className="font-bold text-sm">Sedang Menghubungkan ke Node Storage UbayHub Blora...</div>
                  <div className="text-xs text-slate-400">Mohon tunggu {countdown} detik...</div>
                </div>
              )}

              {downloadStep === 'ready' && tokenInfo && (
                <div className="space-y-3 pt-2 animate-fadeIn">
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 space-y-1">
                    <div className="font-bold">Signed Token Download Berhasil Diterbitkan!</div>
                    <div className="font-mono text-[10px] text-slate-300 truncate">Token: {tokenInfo.token}</div>
                  </div>

                  <a
                    href={signedDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5 animate-bounce" />
                    <span>Download File BIN Sekarang</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Firmware Interactive Preview Card Modal */}
      <FirmwarePreviewModal
        isOpen={Boolean(previewFirmware)}
        onClose={() => setPreviewFirmware(null)}
        firmware={previewFirmware}
        onStartDownload={(fw) => {
          setPreviewFirmware(null);
          handleStartDownloadFlow(fw);
        }}
      />
    </div>
  );
};
