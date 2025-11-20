import React, { useEffect, useState } from 'react';
import { X, Quote as QuoteIcon, BookOpen, Sparkles } from 'lucide-react';
import { Quote, INSPIRATION_QUOTES } from '../types';

interface InspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InspirationModal: React.FC<InspirationModalProps> = ({ isOpen, onClose }) => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Pick random quote
      const random = INSPIRATION_QUOTES[Math.floor(Math.random() * INSPIRATION_QUOTES.length)];
      setQuote(random);
    }
  }, [isOpen]);

  if (!isOpen || !quote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-100 rounded-tr-full -ml-8 -mb-8 opacity-50"></div>

        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-10"
        >
            <X size={20} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
           <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-full">
             {quote.category === 'quran' ? <BookOpen size={32} /> : quote.category === 'hadith' ? <QuoteIcon size={32} /> : <Sparkles size={32} />}
           </div>
           
           <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">
              {quote.category === 'quran' ? 'Ayat Pilihan' : quote.category === 'hadith' ? 'Hadits Hari Ini' : 'Motivasi Islami'}
           </h3>
           
           <p className="text-xl md:text-2xl font-serif text-slate-800 mb-6 leading-relaxed">
             "{quote.text}"
           </p>
           
           <div className="h-1 w-20 bg-amber-400 rounded-full mb-4"></div>
           
           <p className="text-sm font-medium text-slate-500 italic">
             — {quote.source}
           </p>

           <button 
             onClick={onClose}
             className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 w-full"
           >
             Alhamdulillah, Saya Mengerti
           </button>
        </div>
      </div>
    </div>
  );
};

export default InspirationModal;