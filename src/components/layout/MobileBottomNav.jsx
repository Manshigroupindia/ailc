import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, Scale, Mail, Menu } from 'lucide-react';

export const MobileBottomNav = ({ onOpenMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isPledge = location.pathname === '/about/pledge' || location.pathname === '/pledge';
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 pb-safe">
      <div className="bg-[#000d25]/95 backdrop-blur-lg border border-white/15 rounded-full shadow-2xl px-3 py-2 flex items-center justify-between max-w-md mx-auto text-white">
        {/* ① About Us */}
        <button
          onClick={() => navigate('/about')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors active:scale-95 ${
            isAbout ? 'text-[#ffe08d] font-bold' : 'text-white/70 hover:text-[#ffe08d]'
          }`}
          aria-label="About Us"
        >
          <Info className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">About</span>
        </button>

        {/* ② Pledge */}
        <button
          onClick={() => navigate('/about/pledge')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors active:scale-95 ${
            isPledge ? 'text-[#ffe08d] font-bold' : 'text-white/70 hover:text-[#ffe08d]'
          }`}
          aria-label="Advocate Pledge"
        >
          <Scale className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Pledge</span>
        </button>

        {/* ③ Home (Center Larger Floating Button) */}
        <div className="relative -top-5 px-1">
          <button
            onClick={() => navigate('/')}
            className={`w-14 h-14 rounded-full bg-[#ffe08d] text-[#000d25] flex items-center justify-center shadow-lg active:scale-90 transition-transform border-4 border-[#000d25] ${
              isHome ? 'ring-2 ring-[#ffe08d]/50' : ''
            }`}
            aria-label="Home"
          >
            <Home className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* ④ Contact Us */}
        <button
          onClick={() => navigate('/contact')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors active:scale-95 ${
            isContact ? 'text-[#ffe08d] font-bold' : 'text-white/70 hover:text-[#ffe08d]'
          }`}
          aria-label="Contact Secretariat"
        >
          <Mail className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Contact</span>
        </button>

        {/* ⑤ Menu */}
        <button
          onClick={onOpenMenu}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white/70 hover:text-[#ffe08d] transition-colors active:scale-95"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
