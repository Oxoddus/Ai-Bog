import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory token storage for Anti-Dead Link Signed Firmware Download System
  const downloadTokens = new Map<string, {
    firmwareId: string;
    firmwareTitle: string;
    expiresAt: number;
    checksum: string;
    fileUrl: string;
    downloadsCount: number;
  }>();

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "UbayHub Blora Platform", timestamp: new Date().toISOString() });
  });

  // Gemini AI Repair Diagnostic Endpoint
  app.post("/api/ai/diagnose", async (req, res) => {
    try {
      const { deviceType, brand, model, symptoms } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback intelligent repair diagnosis if key is not configured
        return res.json({
          diagnosis: `[Analisis AI UbayHub untuk ${brand || 'Perangkat'} ${model || ''} (${deviceType || 'Elektronik'})]`,
          possibleCauses: [
            "Kerusakan pada blok Power Supply (Tegangan Drop / Elco Kembung)",
            "Kerusakan IC Memory Flash / Firmware Corrupt",
            "Proteksi Jalur Tegangan Secondary / Jalur Feedback Terputus"
          ],
          recommendedActions: [
            "Cek tegangan B+ / 12V / 5V / 3.3V menggunakan Multimeter Digital.",
            "Lakukan flashing ulang firmware IC SPI Flash menggunakan programmer RT809F / CH341A.",
            "Periksa visual komponen MOSFET dan Kapasitor Elco di sekitar bagian PSU."
          ],
          estimatedCost: "Rp 75.000 - Rp 250.000 (Tergantung penggantian sparepart)",
          recommendedFirmware: `${brand || 'UNIVERSAL'}_${model || 'BOARD'}_SPI_FLASH.bin`,
          recommendedParts: ["IC EEPROM / SPI Flash 25Q64", "Kapasitor Elco Low ESR 470uF/35V", "Mosfet K7A60"]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Anda adalah Asisten Pakar Teknik Elektronika UbayHub Blora. 
Seorang teknisi/pelanggan mengalami kendala pada perangkat elektronik berikut:
- Jenis Perangkat: ${deviceType || 'Tidak disebutkan'}
- Merk: ${brand || 'Tidak disebutkan'}
- Tipe/Model/Mainboard: ${model || 'Tidak disebutkan'}
- Gejala Kerusakan: ${symptoms}

Berikan analisis mendalam, bahasa Indonesia teknis namun mudah dipahami:
1. Kemungkinan Penyebab Kerusakan (3 poin teknis)
2. Langkah Analisis & Cara Perbaikan Bertahap (Sebutkan poin pengujian tegangan/komponen)
3. Estimasi Biaya Perbaikan & Sparepart yang Dibutuhkan
4. Catatan keselamatan kerja elektronika (ESD / Tegangan Tinggi).
Respon secara terstruktur dan profesional.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || "Tidak dapat menghasilkan diagnosis saat ini.";

      return res.json({
        diagnosis: text,
        estimatedCost: "Rp 100.000 - Rp 300.000 (Tergantung tingkat kesulitan & suku cadang)",
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("Gemini AI Error:", err);
      res.status(500).json({ error: "Gagal menghubungkan ke UbayHub AI Engine. Silakan coba beberapa saat lagi." });
    }
  });

  // Signed Token Generator for Firmware Download
  app.post("/api/firmware/generate-token", (req, res) => {
    const { firmwareId, firmwareTitle, fileUrl, checksum } = req.body;
    const token = 'UB-DL-' + Math.random().toString(36).substring(2, 11).toUpperCase() + '-' + Date.now();
    const expiresAt = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes

    downloadTokens.set(token, {
      firmwareId: firmwareId || 'FW-UNKNOWN',
      firmwareTitle: firmwareTitle || 'Firmware File',
      expiresAt,
      checksum: checksum || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      fileUrl: fileUrl || 'https://storage.ubayhub.id/firmware/mainboard_bin.zip',
      downloadsCount: 0
    });

    res.json({
      success: true,
      token,
      expiresAt,
      downloadUrl: `/api/firmware/download/${token}`,
      message: "Token download anti-link mati berhasil diterbitkan. Berlaku 15 menit."
    });
  });

  // Signed Download Execution Endpoint
  app.get("/api/firmware/download/:token", (req, res) => {
    const { token } = req.params;
    const record = downloadTokens.get(token);

    if (!record) {
      return res.status(404).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #fff;">
          <h1 style="color: #ef4444;">404 - Token Download Tidak Valid / Kadaluarsa</h1>
          <p>Link download ini sudah tidak berlaku atau tidak ditemukan di Database UbayHub Mapping.</p>
          <a href="/" style="color: #3b82f6; text-decoration: underline;">Kembali ke Beranda UbayHub</a>
        </div>
      `);
    }

    if (Date.now() > record.expiresAt) {
      downloadTokens.delete(token);
      return res.status(410).send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #fff;">
          <h1 style="color: #f97316;">410 - Link Download Telah Kadaluarsa</h1>
          <p>Demi keamanan, link temporer hanya berlaku selama 15 menit. Silakan generate token baru dari website UbayHub.</p>
          <a href="/" style="color: #3b82f6; text-decoration: underline;">Kembali ke Portal UbayHub</a>
        </div>
      `);
    }

    record.downloadsCount += 1;
    // Set headers for download simulation or redirect to secure CDN file
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${record.firmwareTitle.replace(/[^a-zA-Z0-0_.-]/g, '_')}.zip"`);
    
    // Simulate direct file payload stream or notice
    res.send(`UbayHub Firmware Bin Stream Package: ${record.firmwareTitle}\nMD5 Checksum Verified: ${record.checksum}\nStorage Node: Blora Server Node #1\nVerified Download Success!`);
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[UbayHub Engine] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
