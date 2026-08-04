import React, { useState } from 'react';
import { Firmware } from '../../types';
import {
  X,
  FileCheck,
  Cpu,
  ShieldCheck,
  Download,
  Copy,
  Check,
  HardDrive,
  Tv,
  Layers,
  Zap,
  Lock,
  ExternalLink,
  Sparkles,
  Terminal,
  Server
} from 'lucide-react';

interface FirmwarePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  firmware: Firmware | null;
  onStartDownload: (fw: Firmware) => void;
}

export const FirmwarePreviewModal: React.FC<FirmwarePreviewModalProps> = ({
  isOpen,
  onClose,
  firmware,
  onStartDownload
}) => {
  const [copiedMd5, setCopiedMd5] = useState(false);
  const [copiedSha256, setCopiedSha256] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'hex' | 'chassis' | 'mirrors'>('specs');

  if (!isOpen || !firmware) return null;

  const handleCopy = (text: string, type: 'md5' | 'sha' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'md5') {
      setCopiedMd5(true);
      setTimeout(() => setCopiedMd5(false), 2000);
    } else if (type === 'sha') {
      setCopiedSha256(true);
      setTimeout(() => setCopiedSha256(false), 2000);
    } else if (type === 'pass') {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  // Simulated HEX Header Dump for preview
  const hexDumpPreview = [
    '00000000  4d 53 54 38 30 31 5f 55  2d 42 6f 6f 74 20 76 32  |MST801_U-Boot v2|',
    '00000010  2e 31 2e 30 20 28 50 6f  6c 79 74 72 6f 6e 20 54  |.1.0 (Polytron T|',
    '00000020  56 20 46 6c 61 73 68 20  44 75 6d 70 20 42 6c 6f  |V Flash Dump Blo|',
    '00000030  72 61 20 55 62 61 79 48  75 62 20 32 30 32 36 29  |ra UbayHub 2026)|',
    '00000040  ff ff ff ff 00 1f 8a b2  3c 4d 11 09 a0 5f e2 10  |........<M..._..|',
    '00000050  80 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|'
  ];

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white flex justify-between items-start border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-extrabold text-[10px] uppercase tracking-wider">
                  PREVIEW CARD FIRMWARE BIN
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  VERIFIED DUMP 100%
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-1">
                {firmware.title}
              </h2>
              <p className="text-xs text-slate-300">
                Model: <strong>{firmware.model}</strong> &bull; IC Flash: <strong>{firmware.ic}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'specs'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Spesifikasi Dump</span>
          </button>

          <button
            onClick={() => setActiveTab('hex')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'hex'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Hex Header BIN</span>
          </button>

          <button
            onClick={() => setActiveTab('chassis')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'chassis'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Chassis & Panel</span>
          </button>

          <button
            onClick={() => setActiveTab('mirrors')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'mirrors'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Mirror Server</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'specs' && (
            <div className="space-y-4">
              {/* Technical Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-bold">Ukuran File BIN:</span>
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">{firmware.fileSize}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-bold">Kode Mainboard:</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs truncate block">{firmware.mainboard}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-bold">Chipset/CPU:</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs truncate block">{firmware.chipset}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-bold">IC EEPROM Flash:</span>
                  <span className="font-extrabold text-amber-500 text-xs truncate block">{firmware.ic}</span>
                </div>
              </div>

              {/* Checksum & Security Card */}
              <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between font-sans border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Integritas Checksum File & Password Archive</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                    PASS VERIFIED
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">MD5 Checksum:</span>
                      <span className="text-amber-400 text-xs">{firmware.md5}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(firmware.md5, 'md5')}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans text-[10px] font-bold flex items-center gap-1"
                    >
                      {copiedMd5 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{copiedMd5 ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">SHA256 Checksum:</span>
                      <span className="text-blue-300 text-[11px] truncate block max-w-[320px]">{firmware.sha256}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(firmware.sha256, 'sha')}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans text-[10px] font-bold flex items-center gap-1"
                    >
                      {copiedSha256 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{copiedSha256 ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Password File Zip:</span>
                      <span className="text-emerald-400 text-xs font-bold">{firmware.zipPassword || 'ubayhub.id'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(firmware.zipPassword || 'ubayhub.id', 'pass')}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans text-[10px] font-bold flex items-center gap-1"
                    >
                      {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{copiedPass ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hex' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 text-amber-400 font-mono text-xs border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-sans font-bold uppercase mb-2 border-b border-slate-800 pb-1">
                  Hexadecimal Header Inspector Dump BIN (U-Boot Header):
                </div>
                {hexDumpPreview.map((line, idx) => (
                  <div key={idx} className="whitespace-pre overflow-x-auto text-[11px] leading-tight">
                    {line}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                 Header terdeteksi valid MSTAR / Realtek TV Bootloader. Aman diflash langsung menggunakan Programmer RT809H, RT809F, atau CH341A Black Edition.
              </p>
            </div>
          )}

          {activeTab === 'chassis' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-blue-500" />
                  <span>Kompatibilitas T-Con Panel & Resolusi Layar</span>
                </h4>
                <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-1 text-[11px]">
                  <li>Resolusi Layar Tested: <strong>1366 x 768 HD (8 Bit Single LVDS)</strong></li>
                  <li>Tegangan Panel VCC: <strong>12V DC (Jumper JP1 Default)</strong></li>
                  <li>Remote Control Compatible: Remote Asli Polytron / Remote Universal Akari-LG (Key 011)</li>
                  <li>Inverter Backlight Current: <strong>300mA - 450mA Adjustable</strong></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'mirrors' && (
            <div className="space-y-3 text-xs">
              <span className="font-extrabold text-slate-700 dark:text-slate-300 block">
                Daftar Mirror Server Anti Link Mati:
              </span>
              <div className="space-y-2">
                {firmware.mirrorServers.map((server, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white block">{server.name}</span>
                      <span className="text-[10px] text-slate-400">Status: <strong className="text-emerald-500">ONLINE</strong> &bull; Speed: 100 Mbps</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartDownload(firmware)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            UUID: <strong className="font-mono">{firmware.uuid}</strong>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-xs"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartDownload(firmware);
              }}
              className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Firmware BIN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
