import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Scale, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, authError, setAuthError } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please enter both Email Address and Password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      // Error state handled by AdminAuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-body select-none">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#ffe08d]/5 rounded-full blur-[140px] pointer-events-none -top-32 -left-32" />
      <div className="absolute w-[500px] h-[500px] bg-[#001e4d]/30 rounded-full blur-[140px] pointer-events-none -bottom-32 -right-32" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#000d25] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#ffe08d] text-[#000d25] flex items-center justify-center mx-auto shadow-lg">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
            AILC Secretariat CMS
          </h1>
          <p className="text-xs text-white/60 tracking-wider uppercase">
            Authorized Executive Access Only
          </p>
        </div>

        {/* Error Alert Box */}
        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="leading-relaxed">{authError}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ailcindia.org"
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[#ffe08d] focus:ring-1 focus:ring-[#ffe08d] transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[#ffe08d] focus:ring-1 focus:ring-[#ffe08d] transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#ffe08d] hover:bg-[#ebd079] text-[#000d25] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#000d25]" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Login to CMS Dashboard</span>
            )}
          </button>
        </form>

        {/* Security Notice Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40 leading-relaxed">
            Protected by Firebase Authentication. Unauthorized access attempts are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
