import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import UmrohTool from './components/UmrohTool';
import HabitTracker from './components/HabitTracker';
import DesignStudio from './components/DesignStudio';
import BusinessTools from './components/BusinessTools';
import InspirationModal from './components/InspirationModal';
import { ViewState, DAILY_DOA } from './types';
import { Menu, X, ArrowRight, CheckCircle2, Heart, Wallet, Palette, Star, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInspirationOpen, setIsInspirationOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.CHAT:
        return <ChatArea />;
      case ViewState.DESIGN_STUDIO:
        return <DesignStudio />;
      case ViewState.UMROH_TOOLS:
        return <UmrohTool />;
      case ViewState.HABIT_TRACKER:
        return <HabitTracker />;
      case ViewState.BUSINESS_TOOLS:
        return <BusinessTools />;
      case ViewState.DASHBOARD:
      default:
        return <DashboardSummary setCurrentView={setCurrentView} openInspiration={() => setIsInspirationOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[260px] flex-shrink-0 border-r border-slate-200 z-10 bg-slate-950">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
             <div className="flex justify-end p-4">
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500">
                 <X size={24} />
               </button>
             </div>
             <Sidebar 
                currentView={currentView} 
                setCurrentView={setCurrentView} 
                isMobile={true} 
                closeMobileNav={() => setIsMobileMenuOpen(false)}
             />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Header (Visible mostly on Mobile) */}
        <header className="md:hidden bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="text-slate-600" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-sm font-bold text-slate-800 capitalize">
              {currentView.replace('_', ' ')}
            </h2>
          </div>
        </header>

        {/* Main View Area */}
        <main className="flex-1 overflow-hidden relative">
            {renderContent()}
        </main>
      </div>
      
      {/* Global Popups */}
      <InspirationModal isOpen={isInspirationOpen} onClose={() => setIsInspirationOpen(false)} />
    </div>
  );
};

// Dashboard Component for Summary View
const DashboardSummary: React.FC<{ setCurrentView: (v: ViewState) => void, openInspiration: () => void }> = ({ setCurrentView, openInspiration }) => {
  const [todayDoa, setTodayDoa] = useState(DAILY_DOA[0]);

  useEffect(() => {
    // Rotate Doa based on day of month
    const day = new Date().getDate();
    const index = day % DAILY_DOA.length;
    setTodayDoa(DAILY_DOA[index]);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6 md:p-10 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Ahlan Wa Sahlan!</h1>
                <p className="text-lg text-slate-600">Mari mulai hari dengan basmalah dan niat yang lurus.</p>
            </div>
            <button 
                onClick={openInspiration}
                className="px-5 py-2.5 bg-amber-100 text-amber-700 font-semibold rounded-full hover:bg-amber-200 transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
                <Star size={16} fill="currentColor" /> Inspirasi Hari Ini
            </button>
        </div>
        
        {/* Daily Doa Widget */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <BookOpen size={200} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 opacity-80">
                    <span className="px-2 py-1 bg-white/20 rounded text-xs font-semibold">DOA HARIAN</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{todayDoa.title}</h3>
                <p className="text-xl md:text-3xl font-serif mb-4 leading-relaxed text-right font-medium" dir="rtl">{todayDoa.arabic}</p>
                <p className="text-sm italic opacity-90 mb-2">{todayDoa.latin}</p>
                <p className="text-base font-medium">"{todayDoa.translation}"</p>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div 
              onClick={() => setCurrentView(ViewState.UMROH_TOOLS)}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer"
          >
             <div className="mb-4 p-3 bg-emerald-100 w-fit rounded-xl text-emerald-700 group-hover:scale-110 transition-transform">
                <Wallet size={24} />
             </div>
             <h3 className="text-lg font-semibold mb-1 text-slate-900">Tabungan Umroh</h3>
             <p className="text-slate-500 text-sm">Track progres ke Baitullah.</p>
          </div>

          {/* Card 2 */}
          <div 
              onClick={() => setCurrentView(ViewState.HABIT_TRACKER)}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all cursor-pointer"
          >
             <div className="mb-4 p-3 bg-purple-100 w-fit rounded-xl text-purple-700 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
             </div>
             <h3 className="text-lg font-semibold mb-1 text-slate-900">Hijrah Habit</h3>
             <p className="text-slate-500 text-sm">Istiqomah setiap hari.</p>
          </div>

          {/* Card 3 */}
          <div 
              onClick={() => setCurrentView(ViewState.BUSINESS_TOOLS)}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all cursor-pointer"
          >
             <div className="mb-4 p-3 bg-amber-100 w-fit rounded-xl text-amber-700 group-hover:scale-110 transition-transform">
                <Heart size={24} />
             </div>
             <h3 className="text-lg font-semibold mb-1 text-slate-900">Business Tools</h3>
             <p className="text-slate-500 text-sm">Copywriting & Strategi.</p>
          </div>

          {/* Card 4 - New Design Studio */}
           <div 
              onClick={() => setCurrentView(ViewState.DESIGN_STUDIO)}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
          >
             <div className="mb-4 p-3 bg-blue-100 w-fit rounded-xl text-blue-700 group-hover:scale-110 transition-transform">
                <Palette size={24} />
             </div>
             <h3 className="text-lg font-semibold mb-1 text-slate-900">Studio Desain</h3>
             <p className="text-slate-500 text-sm">Gambar Syar'i & Konten.</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Butuh teman curhat?</h3>
            <p className="text-slate-400 max-w-lg">Diskusikan masalah hati, fiqih, atau sekedar mencari nasihat penyejuk jiwa.</p>
          </div>
          <button 
              onClick={() => setCurrentView(ViewState.CHAT)}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            Mulai Chat Personal <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;