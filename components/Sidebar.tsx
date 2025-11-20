import React from 'react';
import { LayoutDashboard, MessageSquareText, Calculator, Activity, Briefcase, LogOut, Palette } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  isMobile?: boolean;
  closeMobileNav?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isMobile, closeMobileNav }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.CHAT, label: 'Chat Asisten', icon: MessageSquareText },
    { id: ViewState.BUSINESS_TOOLS, label: 'Bisnis & Konten', icon: Briefcase },
    { id: ViewState.DESIGN_STUDIO, label: 'Studio Desain', icon: Palette },
    { id: ViewState.UMROH_TOOLS, label: 'Tabungan Umroh', icon: Calculator },
    { id: ViewState.HABIT_TRACKER, label: 'Habit Tracker', icon: Activity },
  ];

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'bg-white' : 'bg-slate-950 text-slate-300'}`}>
      <div className="p-6">
        <h1 className={`text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent ${isMobile ? 'text-center' : ''}`}>
          SaaS Islami
        </h1>
        <p className={`text-xs mt-1 ${isMobile ? 'text-center text-slate-500' : 'text-slate-500'}`}>OS Kehidupan Muslim</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentView(item.id);
              if (isMobile && closeMobileNav) closeMobileNav();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? isMobile 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'bg-white/10 text-white shadow-lg'
                : isMobile
                    ? 'text-slate-600 hover:bg-slate-50'
                    : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-400 transition-colors">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;