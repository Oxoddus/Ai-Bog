import React, { useState } from 'react';
import { AdminRole, User } from '../../types';
import { X, ShieldCheck, Lock, UserCheck, KeyRound, RefreshCw, AlertTriangle, ShieldAlert } from 'lucide-react';

interface LoginAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginAdminModal: React.FC<LoginAdminModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('ubay_master');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<AdminRole>('Super Admin');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K2P9');
  const [requires2fa, setRequires2fa] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  if (!isOpen) return null;

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (captchaInput.toUpperCase() !== captchaCode) {
      alert("Kode CAPTCHA tidak sesuai! Silakan ulang.");
      refreshCaptcha();
      return;
    }

    if (!requires2fa && selectedRole === 'Super Admin') {
      setRequires2fa(true);
      return;
    }

    // Authenticated
    const authenticatedUser: User = {
      id: 'usr-session-' + Date.now(),
      username: username || 'ubay_master',
      email: `${username}@ubayhub.id`,
      role: selectedRole,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      lastLogin: new Date().toLocaleString('id-ID'),
      is2faEnabled: true
    };

    onLoginSuccess(authenticatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900 via-slate-900 to-orange-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Login Admin Secure Portal</h2>
              <p className="text-[11px] text-slate-300">UbayHub Argon2 + JWT Security Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Security Banner & Quick Demo Credentials */}
          <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/80 text-slate-300 space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>IP: 180.252.88.19 (Blora, Central Java)</span>
              </span>
              <span className="text-emerald-400 font-extrabold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">Argon2 WAF Active</span>
            </div>
            <div className="pt-1.5 border-t border-blue-900/60 text-slate-400 flex items-center justify-between font-mono text-[10px]">
              <span>Demo Login: <strong className="text-orange-400">ubay_master</strong></span>
              <span>Password: <strong className="text-orange-400">ubay123456</strong></span>
            </div>
          </div>

          {!requires2fa ? (
            <>
              <div>
                <label className="block font-bold mb-1 text-slate-300">Role Hak Akses (RBAC)</label>
                <select
                  value={selectedRole}
                  onChange={(e: any) => setSelectedRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                >
                  <option value="Super Admin">Super Admin (Akses Penuh Seluruh Sistem)</option>
                  <option value="Admin">Admin Portal & Iklan</option>
                  <option value="Teknisi">Teknisi Service & Firmware Validator</option>
                  <option value="Operator Gudang">Operator Gudang & Stok Barang</option>
                  <option value="Customer Service">Customer Service & Resi Tracking</option>
                  <option value="Editor">Editor Artikel & Kasus Kerusakan</option>
                  <option value="Moderator">Moderator Forum & Komunitas</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-300">Username / Email Admin</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-300">Password (Argon2 Encrypted)</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              {/* CAPTCHA */}
              <div>
                <label className="block font-bold mb-1 text-slate-300">Kode Verifikasi Keamanan CAPTCHA</label>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-base font-extrabold tracking-widest text-orange-400 flex items-center justify-center select-none shrink-0">
                    {captchaCode}
                  </div>
                  <input
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Masukkan 5 Karakter"
                    className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white uppercase"
                  />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Ganti CAPTCHA"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3 py-2 animate-fadeIn">
              <div className="p-3 rounded-xl bg-orange-950/50 border border-orange-800/60 text-orange-200 text-center space-y-1">
                <KeyRound className="w-6 h-6 mx-auto text-orange-400" />
                <h4 className="font-bold text-xs text-white">Two-Factor Authentication (2FA) Google Authenticator</h4>
                <p className="text-[11px] text-orange-300">Masukkan 6 digit kode OTP dari HP Anda atau SMS/WhatsApp Admin.</p>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-300">Kode OTP 2FA (Demo: Ketik 123456)</label>
                <input
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-center font-mono text-lg tracking-widest"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-extrabold shadow-lg transition flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>{requires2fa ? 'Verifikasi OTP & Masuk Dashboard' : 'Masuk Dashboard Admin UbayHub'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
