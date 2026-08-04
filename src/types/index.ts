export type CategoryType = 
  | 'TV LED/LCD'
  | 'Smart TV & Android TV'
  | 'Mesin Cuci'
  | 'Kulkas & Freezer'
  | 'Air Conditioner (AC)'
  | 'Laptop & Computer'
  | 'Printer & Scanner'
  | 'Power Supply & Inverter'
  | 'Arduino & ESP32 / IoT'
  | 'Sparepart & Komponen'
  | 'Tips & Tutorial';

export interface Firmware {
  uuid: string;
  slug: string;
  title: string;
  manufacturer: string; // e.g., Samsung, Polytron, LG, Sharp, Toshiba
  model: string;
  mainboard: string;
  chipset: string;
  ic: string;
  resolution: string;
  fileSize: string;
  passwordZip: string;
  md5: string;
  sha256: string;
  downloadsCount: number;
  viewsCount: number;
  uploadDate: string;
  version: string;
  status: 'Active' | 'Deprecated' | 'Verified';
  mirrorServers: { name: string; url: string; status: 'Online' | 'Offline' }[];
  tags: string[];
  category: CategoryType;
  description?: string;
  manualSteps?: string;
}

export interface Product {
  id: string;
  title: string;
  category: CategoryType | 'IC' | 'LED Strip' | 'Mainboard' | 'Power Supply' | 'Tools & Equipment';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  stock: number;
  brand: string;
  imageUrl: string;
  description: string;
  isAffiliate: boolean;
  affiliatePlatform?: 'Shopee' | 'Tokopedia' | 'TikTok Shop' | 'Lazada' | 'Blibli';
  affiliateUrl?: string;
  affiliateCommission?: string;
  isCod: boolean;
  location: string;
  rating: number;
  soldCount: number;
  sku: string;
  rackLocation?: string;
}

export interface StockItem {
  id: string;
  code: string;
  barcode: string;
  title: string;
  category: string;
  stockQuantity: number;
  minStockThreshold: number;
  buyPrice: number;
  sellPrice: number;
  marginPercent: number;
  rackLocation: string;
  supplierName: string;
  serialNumber?: string;
  lastUpdated: string;
  movementsCount: number;
}

export interface ServiceStep {
  status: 'Diterima' | 'Pemeriksaan / Diagnosa' | 'Menunggu Sparepart' | 'Dalam Pengerjaan' | 'Testing & QC' | 'Selesai & Siap Ambil / Kirim';
  time: string;
  note: string;
  completed: boolean;
}

export interface ServiceOrder {
  id: string;
  code: string; // e.g. UB-2026-8891
  customerName: string;
  phone: string;
  city: string; // e.g. Blora, Cepu, Semarang, Jakarta
  address: string;
  deviceType: string;
  brandModel: string;
  symptoms: string;
  estimatedCost: number;
  status: 'Diterima' | 'Pemeriksaan / Diagnosa' | 'Menunggu Sparepart' | 'Dalam Pengerjaan' | 'Testing & QC' | 'Selesai & Siap Ambil / Kirim';
  createdAt: string;
  isCod: boolean;
  courierName?: string;
  trackingNumber?: string;
  timeline: ServiceStep[];
  notes?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  author: string;
  date: string;
  viewsCount: number;
  readTime: string;
  excerpt: string;
  content: string;
  errorCode?: string;
  symptoms?: string[];
  causeAnalysis?: string;
  solutionSteps?: string[];
  relatedFirmwareUuid?: string;
  youtubeUrl?: string;
  imageUrl: string;
  tags: string[];
}

export interface Technician {
  id: string;
  name: string;
  photoUrl: string;
  area: string; // e.g. Blora Kota, Cepu, Ngawen, Kunduran
  experienceYears: number;
  rating: number;
  reviewCount: number;
  certificates: string[];
  phone: string;
  whatsapp: string;
  servicesOffered: string[];
  isVerified: boolean;
  address: string;
  completedRepairsCount: number;
}

export interface Shop {
  id: string;
  name: string;
  logoUrl: string;
  area: string;
  address: string;
  rating: number;
  phone: string;
  whatsapp: string;
  operationalHours: string;
  googleMapsUrl: string;
  productsCount: number;
  isVerified: boolean;
}

export type AdPlacement = 
  | 'Header Banner'
  | 'Homepage Banner'
  | 'Sidebar Kanan'
  | 'Sidebar Kiri'
  | 'Tengah Artikel'
  | 'Awal Artikel'
  | 'Akhir Artikel'
  | 'Footer'
  | 'Popup'
  | 'Sticky Bottom'
  | 'Floating WhatsApp'
  | 'Video Banner'
  | 'Banner Firmware'
  | 'Banner Produk'
  | 'Banner Download'
  | 'Banner Dashboard'
  | 'Banner Mobile'
  | 'Banner Desktop';

export interface AdBanner {
  id: string;
  title: string;
  type: 'Image' | 'HTML / AdSense' | 'Video' | 'Affiliate';
  location: AdPlacement;
  imageUrl?: string;
  targetUrl: string;
  htmlCode?: string;
  videoUrl?: string;
  priority: number; // 1 (High) to 5 (Low)
  active: boolean;
  deviceTarget: 'All' | 'Mobile' | 'Desktop';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
  categoryTarget?: string;
}

export type AdminRole = 
  | 'Super Admin'
  | 'Admin'
  | 'Editor'
  | 'Teknisi'
  | 'Operator Gudang'
  | 'Customer Service'
  | 'Moderator';

export interface User {
  id: string;
  username: string;
  email: string;
  role: AdminRole;
  avatarUrl: string;
  lastLogin: string;
  is2faEnabled: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  username: string;
  action: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Failed' | 'Warning';
}
