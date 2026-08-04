import React, { useState, useEffect } from 'react';
import { X, Bot, Sparkles, Loader2, Wrench, ShieldAlert, Cpu, CheckCircle, Mic, MicOff, Volume2 } from 'lucide-react';

interface AiDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiDiagnosticModal: React.FC<AiDiagnosticModalProps> = ({ isOpen, onClose }) => {
  const [deviceType, setDeviceType] = useState('TV LED/LCD');
  const [brand, setBrand] = useState('Polytron');
  const [model, setModel] = useState('PLD32T711 / Mainboard MS33933');
  const [symptoms, setSymptoms] = useState('Lampu indikator merah berkedip terus, tombol power tidak merespon, layar tidak menyala.');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const handleToggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser Anda belum mendukung SpeechRecognition API. Silakan gunakan Google Chrome atau MS Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'id-ID';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSymptoms((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceType, brand, model, symptoms }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        diagnosis: "Terjadi gangguan koneksi jaringan. Gunakan panduan manual dari UbayHub.",
        estimatedCost: "Rp 100.000 - Rp 250.000"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-orange-600 via-amber-600 to-blue-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 text-white backdrop-blur-md">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <span>UbayAI Repair Diagnostic Engine</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                  Gemini Powered
                </span>
              </h2>
              <p className="text-xs text-orange-100">Asisten Pintar Analisa Kerusakan Perangkat Elektronik UbayHub Blora</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <form onSubmit={handleDiagnose} className="space-y-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Jenis Perangkat
                </label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="TV LED/LCD">TV LED / LCD</option>
                  <option value="Smart TV & Android TV">Smart TV / Android TV</option>
                  <option value="Mesin Cuci">Mesin Cuci Otomatis</option>
                  <option value="Kulkas & Freezer">Kulkas / Freezer</option>
                  <option value="Air Conditioner (AC)">Air Conditioner (AC)</option>
                  <option value="Laptop & Computer">Laptop / Komputer</option>
                  <option value="Power Supply / Inverter">Power Supply / Inverter</option>
                  <option value="Arduino & ESP32">Arduino / ESP32 IoT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Merk / Manufacturer
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Contoh: Polytron, Samsung, LG..."
                  className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Model / Kode Mainboard
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Contoh: PLD32T711 / MS33933"
                  className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Deskripsikan Gejala Kerusakan (Gejala Fisik, Lampu Indikator, Suara, Layar)
                </label>

                {/* Speech Recognition Voice Microphone Button */}
                <button
                  type="button"
                  onClick={handleToggleVoiceInput}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition border shadow-sm ${
                    isListening
                      ? 'bg-rose-600 text-white border-rose-400 animate-pulse ring-2 ring-rose-500/50'
                      : 'bg-slate-200 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                  }`}
                  title="Gunakan Input Suara (Speech Recognition API Bahasa Indonesia)"
                >
                  {isListening ? (
                    <>
                      <Mic className="w-3.5 h-3.5 text-white animate-bounce" />
                      <span>Mendengarkan Suara... (Bicara Sekarang)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-orange-500" />
                      <span>Bicara Gejala (Voice Input)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={3}
                  placeholder="Jelaskan atau sebutkan secara lisan gejala kerusakan perangkat Anda..."
                  className={`w-full p-2.5 text-xs rounded-lg bg-white dark:bg-slate-900 border text-slate-900 dark:text-white transition ${
                    isListening
                      ? 'border-rose-500 ring-2 ring-rose-500/30'
                      : 'border-slate-300 dark:border-slate-800'
                  }`}
                />

                {isListening && (
                  <div className="absolute right-3 bottom-3 flex items-center gap-1 text-[10px] font-extrabold text-rose-500 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/80 animate-pulse">
                    <Volume2 className="w-3 h-3 text-rose-400" />
                    <span>RECORDING VOICE...</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>UbayAI Sedang Menganalisis Tegangan & Rangkaian...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Mulai Analisis Kerusakan Cerdas (UbayAI)</span>
                </>
              )}
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="flex items-center gap-2 text-xs font-bold text-orange-400">
                  <Cpu className="w-4 h-4" />
                  <span>Hasil Rekomendasi Diagnosa UbayAI:</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  Status: Terverifikasi Workshop UbayHub
                </span>
              </div>

              {/* Diagnosis text */}
              <div className="whitespace-pre-line text-xs text-slate-300 leading-relaxed font-sans">
                {result.diagnosis}
              </div>

              {/* Estimate & Recommended Parts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {result.estimatedCost && (
                  <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs">
                    <span className="text-blue-300 font-semibold block">Estimasi Biaya Service:</span>
                    <span className="text-emerald-400 font-extrabold text-sm mt-0.5 block">
                      {result.estimatedCost}
                    </span>
                  </div>
                )}

                {result.recommendedFirmware && (
                  <div className="p-3 rounded-xl bg-orange-950/60 border border-orange-800/60 text-xs">
                    <span className="text-orange-300 font-semibold block">Firmware Direkomendasikan:</span>
                    <span className="text-white font-mono text-xs mt-0.5 block truncate">
                      {result.recommendedFirmware}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-200 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Keselamatan Kerja:</strong> Pastikan kabel listrik dicabut sebelum menyentuh modul Power Supply.
                  Butuh bantuan perbaikan? Bawa perangkat Anda ke Workshop UbayHub Blora atau gunakan layanan <strong>Service Luar Kota via Paket COD</strong>.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Powered by Gemini AI Engine &bull; UbayHub Blora
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
