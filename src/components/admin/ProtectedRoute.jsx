import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000d25] text-white flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#ffe08d]" />
        <p className="text-xs uppercase tracking-widest text-white/60">Verifying Admin Credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
