import React from 'react';
import ChatArea from './ChatArea';

const BusinessTools: React.FC = () => {
  const businessPrompts = [
    "Buatkan kalender konten Instagram 1 minggu untuk jualan gamis",
    "Tulis caption soft-selling tentang hijrah",
    "Strategi funneling untuk produk herbal",
    "Analisa target market Gen-Z Muslim",
    "Ide script video TikTok 15 detik (AIDA)",
    "Buatkan copy iklan Facebook Ads yang menyentuh hati"
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm z-10">
        <div>
           <h2 className="text-lg font-bold text-slate-800">Business & Content Coach</h2>
           <p className="text-xs text-slate-500">Strategi growth, copywriting, dan manajemen bisnis.</p>
        </div>
        <div className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
          Pro Mode
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatArea 
            mode="BUSINESS"
            initialMessage="Assalamualaikum. Saya siap membantu bisnis Anda tumbuh dengan cara yang berkah. Kita mau bahas strategi marketing, ide konten, atau operasional hari ini?"
            suggestions={businessPrompts}
        />
      </div>
    </div>
  );
};

export default BusinessTools;