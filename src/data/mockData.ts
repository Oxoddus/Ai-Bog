import { Firmware, Product, StockItem, ServiceOrder, Article, Technician, Shop, AdBanner, User, AuditLog } from '../types';

export const INITIAL_FIRMWARES: Firmware[] = [
  {
    uuid: 'fw-8812-polytron-pld32t711',
    slug: 'firmware-tv-polytron-pld32t711-mainboard-ms33933-p851',
    title: 'Firmware LED TV Polytron PLD32T711 / PLD32T1500 (SPI Flash 8MB)',
    manufacturer: 'Polytron',
    model: 'PLD32T711',
    mainboard: 'MS33933-P851',
    chipset: 'MStar MSD3393',
    ic: '25Q64CSIG (8MB 3.3V)',
    resolution: '1366x768 (HD)',
    fileSize: '8.4 MB',
    passwordZip: 'ubayhub2026',
    md5: 'a41d8cd98f00b204e9800998ecf8427e',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    downloadsCount: 1420,
    viewsCount: 3890,
    uploadDate: '2026-01-15',
    version: 'v2.1.0-BLORA',
    status: 'Verified',
    mirrorServers: [
      { name: 'UbayHub Blora Node #1', url: 'https://cdn.ubayhub.id/fw/polytron_pld32t711.bin', status: 'Online' },
      { name: 'Cloudflare R2 Backup', url: 'https://r2.ubayhub.id/fw/polytron_pld32t711.bin', status: 'Online' },
      { name: 'Google Drive Mirror', url: 'https://drive.google.com/uc?export=download&id=ubayhub_fw1', status: 'Online' }
    ],
    tags: ['Polytron', 'PLD32T711', 'Mainboard MS33933', 'MStar', 'SPI Flash', 'Blora Tested'],
    category: 'TV LED/LCD',
    description: 'Firmware teruji tested 100% matot / logo Polytron standby merah meledak. Hasil dump teknisi UbayHub Blora. Siap diprogram pakai CH341A atau RT809F.',
    manualSteps: '1. Format Flashdisk FAT32.\n2. Copy file .bin ke root flashdisk.\n3. Colokkan ke USB TV.\n4. Tekan tombol Power TV sambil colok steker listrik hingga LED berkedip cepat.\n5. Tunggu proses flashing 100% selesai.'
  },
  {
    uuid: 'fw-9902-samsung-ua32fh4003',
    slug: 'firmware-samsung-ua32fh4003r-mainboard-bn41-02098b',
    title: 'Firmware LED TV Samsung UA32FH4003R / UA32H4000 (Dump BIN)',
    manufacturer: 'Samsung',
    model: 'UA32FH4003R',
    mainboard: 'BN41-02098B',
    chipset: 'SEMS31 / Novatek',
    ic: 'W25Q32FV (4MB)',
    resolution: '1366x768',
    fileSize: '4.2 MB',
    passwordZip: 'ubayhub.id',
    md5: '7c4a8d09ca3762af61e59520943dc264',
    sha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    downloadsCount: 980,
    viewsCount: 2450,
    uploadDate: '2026-02-10',
    version: 'v1.0.4',
    status: 'Verified',
    mirrorServers: [
      { name: 'UbayHub Primary Node', url: 'https://cdn.ubayhub.id/fw/samsung_ua32fh4003.bin', status: 'Online' },
      { name: 'Backblaze B2 Mirror', url: 'https://b2.ubayhub.id/fw/samsung_ua32fh4003.bin', status: 'Online' }
    ],
    tags: ['Samsung', 'UA32FH4003', 'BN41-02098B', 'SPI BIN'],
    category: 'TV LED/LCD',
    description: 'Solusi TV Samsung Standby tidak mau start, lampu indikator berkedip 5x. Dump original pabrikan.'
  },
  {
    uuid: 'fw-7741-lg-43lm5500pta',
    slug: 'firmware-smart-tv-lg-43lm5500pta-mainboard-eax68253604',
    title: 'Firmware Smart TV LG 43LM5500PTA / 32LM550BPTA (NAND / SPI)',
    manufacturer: 'LG',
    model: '43LM5500PTA',
    mainboard: 'EAX68253604 (1.0)',
    chipset: 'Realtek RTD2871',
    ic: 'MX25L3206E & NAND Flash',
    resolution: '1920x1080 (Full HD)',
    fileSize: '320 MB',
    passwordZip: 'ubayhub-blora',
    md5: '88390b29a1a8e999902341400234a1b0',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    downloadsCount: 1850,
    viewsCount: 4200,
    uploadDate: '2026-03-01',
    version: 'v03.20.15',
    status: 'Verified',
    mirrorServers: [
      { name: 'UbayHub Blora HighSpeed', url: 'https://cdn.ubayhub.id/fw/lg_43lm5500.zip', status: 'Online' },
      { name: 'MinIO Mirror Node', url: 'https://minio.ubayhub.id/fw/lg_43lm5500.zip', status: 'Online' }
    ],
    tags: ['LG', 'Smart TV', '43LM5500', 'webOS', 'EAX68253604'],
    category: 'Smart TV & Android TV',
    description: 'EPROM & NAND Flash lengkap untuk LG Smart TV restart berulang-ulang di logo webOS.'
  },
  {
    uuid: 'fw-5521-sharp-aquos-lc24le170i',
    slug: 'firmware-sharp-aquos-lc24le170i-mainboard-qpwbfe810wjzz',
    title: 'Firmware LED TV Sharp Aquos LC-24LE170I / LC-24LE175I',
    manufacturer: 'Sharp',
    model: 'LC-24LE170I',
    mainboard: 'QPWBFE810WJZZ',
    chipset: 'MStar MSD3463',
    ic: '25Q32CSIG',
    resolution: '1366x768',
    fileSize: '4.8 MB',
    passwordZip: 'ubayhub',
    md5: '3a4129b19e0998a129f12349081234a9',
    sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    downloadsCount: 750,
    viewsCount: 1820,
    uploadDate: '2026-03-22',
    version: 'v1.0.1',
    status: 'Verified',
    mirrorServers: [
      { name: 'UbayHub Server #1', url: 'https://cdn.ubayhub.id/fw/sharp_24le170i.bin', status: 'Online' }
    ],
    tags: ['Sharp', 'LC-24LE170I', 'MStar', 'Aquos'],
    category: 'TV LED/LCD',
    description: 'Dump IC Flash Sharp Aquos 24 inch. Menghilangkan masalah mati total atau suara ada gambar tidak tampil.'
  },
  {
    uuid: 'fw-3391-universal-t53u21-android',
    slug: 'firmware-mainboard-universal-t53u21-smart-android-tv',
    title: 'Firmware Universal Board T.V53.03 / T.T53U21.01 (Resolution Full Pack)',
    manufacturer: 'Universal Board',
    model: 'T.V53.03 / T.T53U21',
    mainboard: 'T.V53.03',
    chipset: 'TSUMV53RU',
    ic: '25Q32 (4MB)',
    resolution: 'All Resolutions (1366x768, 1920x1080, 1024x600)',
    fileSize: '45 MB',
    passwordZip: 'ubayhub2026',
    md5: '556677889900aabbccddeeff00112233',
    sha256: '11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
    downloadsCount: 3100,
    viewsCount: 6800,
    uploadDate: '2026-04-05',
    version: 'v3.0.0',
    status: 'Verified',
    mirrorServers: [
      { name: 'UbayHub Blora Direct', url: 'https://cdn.ubayhub.id/fw/universal_tv53.zip', status: 'Online' }
    ],
    tags: ['Universal Board', 'TV53', 'TSUMV53', 'All Resolution Pack'],
    category: 'TV LED/LCD',
    description: 'Paket firmware board universal pengganti mesin TV LED cina (Changhong, Coocaa, Weyon, dll).'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-ic-25q64',
    title: 'IC Memory Winbond 25Q64CSIG 25Q64 8MB SOP-8 208mil (Pre-Programmed Custom Firmware)',
    category: 'IC',
    price: 12500,
    originalPrice: 18000,
    discountPercent: 30,
    stock: 145,
    brand: 'Winbond Original',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80',
    description: 'IC SPI Flash Winbond 25Q64 8MB original. Bisa minta diisikan firmware Polytron / Samsung / LG / Sharp gratis dari teknisi UbayHub Blora!',
    isAffiliate: true,
    affiliatePlatform: 'Shopee',
    affiliateUrl: 'https://shopee.co.id/search?keyword=ic+25q64+ubayhub',
    affiliateCommission: '5%',
    isCod: true,
    location: 'Toko UbayHub, Blora Kota',
    rating: 4.9,
    soldCount: 840,
    sku: 'IC-W25Q64-SOP8',
    rackLocation: 'Rak IC-01'
  },
  {
    id: 'prod-led-polytron-32',
    title: 'Backlight TV LED Polytron 32 Inch PLD32T711 / 32T1500 (1 Set 2 Batang 10 Kancing 3V Alumunium)',
    category: 'LED Strip',
    price: 45000,
    originalPrice: 65000,
    discountPercent: 31,
    stock: 48,
    brand: 'UbayHub OEM Grade A',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=80',
    description: 'Lampu LED Backlight pengganti TV Polytron 32 inch. Plat alumunium cepat melepas panas, lensa cembung presisi anti-flek hitam.',
    isAffiliate: true,
    affiliatePlatform: 'Tokopedia',
    affiliateUrl: 'https://tokopedia.com/search?q=led+polytron+32+ubayhub',
    affiliateCommission: '7%',
    isCod: true,
    location: 'Toko UbayHub, Blora Kota',
    rating: 4.95,
    soldCount: 520,
    sku: 'LED-PLY-32-10K',
    rackLocation: 'Rak LED-B03'
  },
  {
    id: 'prod-mb-polytron-pld32',
    title: 'Mainboard TV LED Polytron PLD 32T711 / 32T1500 / 32D711 (Normal Tested Garansi 1 Bulan)',
    category: 'Mainboard',
    price: 245000,
    originalPrice: 280000,
    discountPercent: 12,
    stock: 8,
    brand: 'Polytron Ori Copotan',
    imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=500&auto=format&fit=crop&q=80',
    description: 'Mesin TV LED Polytron 32 inch. Sudah dites lulus QC workshop UbayHub Blora. Siap pasang langsung nyala.',
    isAffiliate: false,
    isCod: true,
    location: 'Gudang UbayHub Blora',
    rating: 5.0,
    soldCount: 94,
    sku: 'MB-PLY-32T711',
    rackLocation: 'Rak MB-02'
  },
  {
    id: 'prod-rt809f-programmer',
    title: 'Programmer RT809F USB ISP / EEPROM / SPI Flash / BIOS Flasher + Clip SOP8 Adaptor Set',
    category: 'Tools & Equipment',
    price: 325000,
    originalPrice: 380000,
    discountPercent: 14,
    stock: 12,
    brand: 'iFix / RT809',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    description: 'Alat flash chip memori TV, Laptop, Receiver Parabola wajib milik teknisi elektronika. Dilengkapi software v2026 dan tutorial UbayHub.',
    isAffiliate: true,
    affiliatePlatform: 'TikTok Shop',
    affiliateUrl: 'https://tiktok.com/@ubayhub_blora',
    affiliateCommission: '10%',
    isCod: true,
    location: 'Toko UbayHub, Blora Kota',
    rating: 4.88,
    soldCount: 210,
    sku: 'TOOL-RT809F-SET',
    rackLocation: 'Rak TOOL-01'
  },
  {
    id: 'prod-esp32-wroom',
    title: 'Modul ESP32 ESP-WROOM-32 Wi-Fi + Bluetooth IoT Development Board 30 Pin CP2102',
    category: 'Arduino & ESP32 / IoT',
    price: 52000,
    originalPrice: 65000,
    discountPercent: 20,
    stock: 65,
    brand: 'Espressif Original',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&auto=format&fit=crop&q=80',
    description: 'Modul mikrokontroler canggih untuk proyek IoT pelajar, mahasiswa SMK/STTR Blora & hobiis elektronika.',
    isAffiliate: true,
    affiliatePlatform: 'Shopee',
    affiliateUrl: 'https://shopee.co.id/search?keyword=esp32+ubayhub',
    affiliateCommission: '6%',
    isCod: true,
    location: 'Toko UbayHub Blora',
    rating: 4.92,
    soldCount: 430,
    sku: 'MCU-ESP32-30P',
    rackLocation: 'Rak MCU-05'
  }
];

export const INITIAL_STOCK: StockItem[] = [
  {
    id: 'stk-001',
    code: 'SKU-IC-25Q64',
    barcode: '889100234001',
    title: 'IC Winbond W25Q64CSIG SOP-8',
    category: 'IC Memory',
    stockQuantity: 145,
    minStockThreshold: 20,
    buyPrice: 6500,
    sellPrice: 12500,
    marginPercent: 92.3,
    rackLocation: 'Rak A-01 (Laci IC 02)',
    supplierName: 'PT Nusantara Suku Cadang Surabaya',
    serialNumber: 'WB2026-X88',
    lastUpdated: '2026-08-01',
    movementsCount: 38
  },
  {
    id: 'stk-002',
    code: 'SKU-LED-PLY32',
    barcode: '889100234002',
    title: 'Backlight LED Polytron 32 T711 (2 Strip)',
    category: 'Lampu LED TV',
    stockQuantity: 48,
    minStockThreshold: 10,
    buyPrice: 28000,
    sellPrice: 45000,
    marginPercent: 60.7,
    rackLocation: 'Rak B-03 (Box LED)',
    supplierName: 'CV Blora Optik & LED Supplier',
    lastUpdated: '2026-07-28',
    movementsCount: 22
  },
  {
    id: 'stk-003',
    code: 'SKU-MOSFET-K7A60',
    barcode: '889100234003',
    title: 'Mosfet Power Supply K7A60 / 7N60 TO-220F',
    category: 'Transistor MOSFET',
    stockQuantity: 8, // Low Stock Trigger!
    minStockThreshold: 15,
    buyPrice: 4000,
    sellPrice: 9500,
    marginPercent: 137.5,
    rackLocation: 'Rak A-04 (Laci MOSFET)',
    supplierName: 'Mega Komponen Jaya Jakarta',
    lastUpdated: '2026-08-02',
    movementsCount: 15
  },
  {
    id: 'stk-004',
    code: 'SKU-ELCO-470-35V',
    barcode: '889100234004',
    title: 'Kapasitor Elco Nippon Chemi-Con 470uF / 35V Low ESR',
    category: 'Kapasitor',
    stockQuantity: 220,
    minStockThreshold: 50,
    buyPrice: 800,
    sellPrice: 2500,
    marginPercent: 212.5,
    rackLocation: 'Rak C-01 (Bin Elco)',
    supplierName: 'PT Nusantara Suku Cadang Surabaya',
    lastUpdated: '2026-07-15',
    movementsCount: 65
  }
];

export const INITIAL_SERVICE_ORDERS: ServiceOrder[] = [
  {
    id: 'srv-8891',
    code: 'UB-2026-8891',
    customerName: 'Bapak Hartono',
    phone: '081234567890',
    city: 'Blora Kota',
    address: 'Jl. Pemuda No. 42, Blora, Jawa Tengah',
    deviceType: 'TV LED',
    brandModel: 'Polytron PLD 32T711',
    symptoms: 'Lampu indikator berkedip merah terus, layar tidak mau menyala sama sekali (Standby Matot).',
    estimatedCost: 150000,
    status: 'Dalam Pengerjaan',
    createdAt: '2026-08-02 09:30',
    isCod: true,
    courierName: 'Kurir Lokal UbayHub Blora',
    timeline: [
      { status: 'Diterima', time: '2026-08-02 09:30', note: 'Unit diterima di Counter Service UbayHub Blora oleh Mas Budi.', completed: true },
      { status: 'Pemeriksaan / Diagnosa', time: '2026-08-02 11:15', note: 'Pemeriksaan voltase PSU: VCC 5V drop ke 2.1V karena Kapasitor Elco cembung & IC EEPROM Corrupt.', completed: true },
      { status: 'Menunggu Sparepart', time: '2026-08-02 13:00', note: 'Sparepart IC 25Q64 + Elco Low ESR tersedia di rak stok UbayHub.', completed: true },
      { status: 'Dalam Pengerjaan', time: '2026-08-03 08:00', note: 'Proses flashing firmware SPI dan penggantian Elco PSU.', completed: true },
      { status: 'Testing & QC', time: 'Proses Selanjutnya', note: 'Uji nyala running test 4 jam non-stop.', completed: false },
      { status: 'Selesai & Siap Ambil / Kirim', time: 'Estimasi Hari Ini', note: 'Siap diantar via COD atau diambil di toko.', completed: false }
    ],
    notes: 'Pelanggan minta selesai sebelum jam 5 sore.'
  },
  {
    id: 'srv-8892',
    code: 'UB-2026-8892',
    customerName: 'Mas Wahyu Teknisi Cepu',
    phone: '085789123456',
    city: 'Cepu, Blora',
    address: 'Jl. Ronggolawe No. 15, Cepu, Blora',
    deviceType: 'Smart TV',
    brandModel: 'LG 43LM5500PTA',
    symptoms: 'Kirim via travel dari Cepu: Bootloop di logo LG webOS lalu mati restart sendiri.',
    estimatedCost: 220000,
    status: 'Selesai & Siap Ambil / Kirim',
    createdAt: '2026-08-01 14:00',
    isCod: true,
    courierName: 'JNE Reguler',
    trackingNumber: 'JNE-BLR-99881122',
    timeline: [
      { status: 'Diterima', time: '2026-08-01 14:00', note: 'Paket travel dari Cepu tiba di Workshop UbayHub.', completed: true },
      { status: 'Pemeriksaan / Diagnosa', time: '2026-08-01 15:30', note: 'Kerusakan pada Firmware NAND Flash webOS.', completed: true },
      { status: 'Menunggu Sparepart', time: '2026-08-01 16:00', note: 'Firmware dump LG 43LM5500 dari database UbayHub disiapkan.', completed: true },
      { status: 'Dalam Pengerjaan', time: '2026-08-02 09:00', note: 'Reflash chip NAND Flash menggunakan programmer RT809H.', completed: true },
      { status: 'Testing & QC', time: '2026-08-02 14:00', note: 'Running test Youtube 6 jam stabil lancar.', completed: true },
      { status: 'Selesai & Siap Ambil / Kirim', time: '2026-08-03 09:00', note: 'Paket siap dikirim balik ke Cepu via JNE / COD Travel.', completed: true }
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-001',
    title: 'Panduan Mengatasi TV LED Polytron Standby Kedip Merah (Gagal Start) Tanpa Ganti Mesin',
    slug: 'mengatasi-tv-led-polytron-standby-kedip-merah',
    category: 'TV LED/LCD',
    author: 'Ubay (Founder & Chief Teknisi UbayHub)',
    date: '2026-07-28',
    viewsCount: 4520,
    readTime: '6 Menit',
    excerpt: 'Kerusakan khas TV Polytron PLD32T711 / 32T1500 yaitu lampu indikator merah berkedip terus dan tombol power tidak merespon. Simak analisa tegangan dan flashing firmware terampuh!',
    content: `TV LED Polytron seri PLD32T711, PLD32T1500, dan PLD32D711 merupakan tipe yang paling populer di wilayah Kabupaten Blora dan sekitarnya. Namun, seri ini sering mengalami kendala *Standby Kedip Merah* setelah pemakaian 2-3 tahun.

### Penyebab Utama
1. **Drop Tegangan VCC 5V / 3.3V:** Disebabkan oleh penurunan performa Kapasitor Elco di bagian Power Supply Sekunder (terutama C508 & C510).
2. **Corrupt Firmware IC SPI Flash Winbond 25Q64:** Akibat fluktuasi listrik mati mendadak saat TV menyala.

### Langkah Perbaikan Bertahap
1. Buka casing TV dan persiapkan Multimeter Digital.
2. Ukur tegangan keluaran PSU: 12V (untuk Amplifier & Inverter LED) dan 5V (untuk Mainboard).
3. Apabila tegangan 5V goyang/drop ke 2-3 Volt, ganti Elco 470uF/16V atau 470uF/35V dengan tipe **Low ESR**.
4. Apabila tegangan PSU sudah stabil 5.0V dan 12.0V namun TV tetap kedip merah, lepaskan chip IC 25Q64CSIG.
5. Gunakan USB Programmer (CH341A / RT809F) untuk mengisi ulang (*flash*) file firmware BIN yang dapat diunduh gratis dari Pusat Firmware UbayHub.
6. Pasang kembali IC ke mainboard. Nyalakan TV, LED akan merah diam lalu hijau dan layar menyala logo Polytron!`,
    errorCode: 'ERR-PLY-STANDBY-BLINK',
    symptoms: ['LED Indikator merah kedip berulang', 'Tombol Power & Remote tidak merespon', 'Layar gelap total'],
    causeAnalysis: 'Drop voltase psu sekunder & kerusakan data checksum IC SPI Flash',
    solutionSteps: [
      'Ukur tegangan output Power Supply (12V & 5V)',
      'Ganti Elco sekunder psu yang terdeteksi drop / ESR tinggi',
      'Download Firmware Polytron PLD32T711 dari UbayHub',
      'Flash IC 25Q64 menggunakan CH341A / RT809F'
    ],
    relatedFirmwareUuid: 'fw-8812-polytron-pld32t711',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80',
    tags: ['Polytron', 'TV LED', 'Tutorial Service', 'Blora Teknisi']
  },
  {
    id: 'art-002',
    title: 'Cara Mengukur Tegangan T-Con & Panel Kaca LCD TV Samsung / LG Gambar Bergaris / Blank Putih',
    slug: 'cara-mengukur-tegangan-tcon-panel-lcd-tv',
    category: 'TV LED/LCD',
    author: 'Tim Laboratorium UbayHub Blora',
    date: '2026-08-01',
    viewsCount: 2890,
    readTime: '8 Menit',
    excerpt: 'Memahami titik ukur poin penting VGH, VGL, VDD, VCOM, dan AVDD pada modul Timing Controller (T-Con) untuk membedakan kerusakan board atau panel kaca.',
    content: `Kerusakan gambar klise, lambat (slow motion), bergaris horizontal/vertikal, atau blank putih sering membuat bingung teknisi pemula. Kunci utamanya adalah pengukuran tegangan poin T-Con secara teliti.`,
    errorCode: 'ERR-TCON-VGH-DROP',
    symptoms: ['Gambar Blank Putih', 'Gambar Slow Motion / Berbayang', 'Garis-garis pelangi'],
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    tags: ['T-Con', 'Samsung', 'Panel LCD', 'Point Check']
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-001',
    name: 'Mas Ubay (UbayHub Master Repair)',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    area: 'Blora Kota & Seluruh Kecamatan Blora',
    experienceYears: 12,
    rating: 4.98,
    reviewCount: 340,
    certificates: ['Sertifikasi Kompetensi BNSP Elektronika', 'Master Reflash NAND & BGA Chip', 'Pelatih Vokasi SMK Blora'],
    phone: '0813-2688-9900',
    whatsapp: '6281326889900',
    servicesOffered: ['Service TV LED/Smart TV', 'Flashing & Programmer IC', 'Penerimaan Service Luar Kota (COD)', 'Service Inverter & Module AC'],
    isVerified: true,
    address: 'Workshop UbayHub, Jl. Pemuda No. 88, Blora, Jawa Tengah',
    completedRepairsCount: 1850
  },
  {
    id: 'tech-002',
    name: 'Pak Budi Elektro Cepu',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    area: 'Kecamatan Cepu & Sambong',
    experienceYears: 15,
    rating: 4.90,
    reviewCount: 185,
    certificates: ['Teknisi Lemari Es & AC Berlisensi'],
    phone: '0852-9011-2233',
    whatsapp: '6285290112233',
    servicesOffered: ['Service Kulkas 1 & 2 Pintu', 'Service AC Split & Inverter', 'Mesin Cuci Otomatis'],
    isVerified: true,
    address: 'Jl. Diponegoro No. 12, Cepu, Blora',
    completedRepairsCount: 920
  },
  {
    id: 'tech-003',
    name: 'Mas Danang Micro Lab Kunduran',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    area: 'Kunduran, Ngawen, & Todanan',
    experienceYears: 8,
    rating: 4.88,
    reviewCount: 112,
    certificates: ['Sertifikat Hardware Laptop & Motherboard Repair'],
    phone: '0821-4455-6677',
    whatsapp: '6282144556677',
    servicesOffered: ['Service Laptop Mati Total', 'Ganti LCD & Keyboard Laptop', 'Rakit PC & Upgrade SSD'],
    isVerified: true,
    address: 'Pasar Kunduran Blok B-05, Kunduran, Blora',
    completedRepairsCount: 640
  }
];

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop-001',
    name: 'UbayHub Store & Service Center Blora',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    area: 'Blora Kota',
    address: 'Jl. Pemuda No. 88 (Selatan Alun-Alun Blora), Kec. Blora, Kab. Blora, Jawa Tengah',
    rating: 4.99,
    phone: '0813-2688-9900',
    whatsapp: '6281326889900',
    operationalHours: 'Senin - Sabtu: 08.00 - 20.00 WIB',
    googleMapsUrl: 'https://maps.google.com/?q=Blora+Jawa+Tengah',
    productsCount: 480,
    isVerified: true
  },
  {
    id: 'shop-002',
    name: 'Toko Sparepart Elektronik Jaya Abadi Randublatung',
    logoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
    area: 'Randublatung',
    address: 'Jl. Stasiun Randublatung No. 24, Blora',
    rating: 4.82,
    phone: '0857-1122-3344',
    whatsapp: '6285711223344',
    operationalHours: 'Setiap Hari: 08.00 - 17.00 WIB',
    googleMapsUrl: 'https://maps.google.com/?q=Randublatung+Blora',
    productsCount: 210,
    isVerified: true
  }
];

export const INITIAL_ADS: AdBanner[] = [
  {
    id: 'ad-001',
    title: 'Promo Diskon Suku Cadang TV LED Blora - Toko UbayHub',
    type: 'Image',
    location: 'Header Banner',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop&q=80',
    targetUrl: '/shop',
    priority: 1,
    active: true,
    deviceTarget: 'All',
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    impressions: 12400,
    clicks: 890,
    ctr: 7.17
  },
  {
    id: 'ad-002',
    title: 'Terima Service TV & Elektronik Luar Kota via COD Paket',
    type: 'Image',
    location: 'Homepage Banner',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80',
    targetUrl: '/service',
    priority: 1,
    active: true,
    deviceTarget: 'All',
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    impressions: 8900,
    clicks: 620,
    ctr: 6.96
  },
  {
    id: 'ad-003',
    title: 'Flash Sale Shopee Affiliate - Solder Station Quick 208',
    type: 'Affiliate',
    location: 'Sidebar Kanan',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    targetUrl: 'https://shopee.co.id/search?keyword=solder+station+quick',
    priority: 2,
    active: true,
    deviceTarget: 'Desktop',
    startDate: '2026-08-01',
    endDate: '2026-10-31',
    impressions: 4300,
    clicks: 310,
    ctr: 7.20
  },
  {
    id: 'ad-004',
    title: 'Gratis Download Firmware Tested 100% Khusus Komunitas Teknisi',
    type: 'Image',
    location: 'Sticky Bottom',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    targetUrl: '/firmware',
    priority: 1,
    active: true,
    deviceTarget: 'Mobile',
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    impressions: 15600,
    clicks: 1420,
    ctr: 9.10
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-01',
    username: 'ubay_master',
    email: 'admin@ubayhub.id',
    role: 'Super Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    lastLogin: '2026-08-03 11:45',
    is2faEnabled: true
  },
  {
    id: 'usr-tech-01',
    username: 'budi_teknisi',
    email: 'teknisi@ubayhub.id',
    role: 'Teknisi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    lastLogin: '2026-08-03 10:15',
    is2faEnabled: false
  },
  {
    id: 'usr-gudang-01',
    username: 'operator_gudang',
    email: 'gudang@ubayhub.id',
    role: 'Operator Gudang',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    lastLogin: '2026-08-02 16:20',
    is2faEnabled: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-08-03 11:45:12',
    username: 'ubay_master',
    action: 'Login Berhasil (Argon2 Hash Validated & 2FA Token Success)',
    ipAddress: '180.252.88.19 (Blora, Jawa Tengah)',
    device: 'Chrome 128 / Windows 11',
    status: 'Success'
  },
  {
    id: 'log-102',
    timestamp: '2026-08-03 11:30:05',
    username: 'ubay_master',
    action: 'Penerbitan Signed Token Download Firmware (Polytron PLD32T711)',
    ipAddress: '180.252.88.19',
    device: 'Chrome 128 / Android 15',
    status: 'Success'
  },
  {
    id: 'log-103',
    timestamp: '2026-08-03 10:15:22',
    username: 'budi_teknisi',
    action: 'Update Status Servis UB-2026-8891 -> Dalam Pengerjaan',
    ipAddress: '180.252.92.11',
    device: 'Safari / iPhone 15 Pro',
    status: 'Success'
  },
  {
    id: 'log-104',
    timestamp: '2026-08-02 23:10:00',
    username: 'unknown_bot',
    action: 'Brute Force Attack Blocked on Admin Login (Rate Limit Active)',
    ipAddress: '45.142.120.5',
    device: 'Python-urllib/3.10',
    status: 'Warning'
  }
];
