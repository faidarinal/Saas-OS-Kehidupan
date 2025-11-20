import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const UmrohTool: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState(35000000);
  const [currentSavings, setCurrentSavings] = useState(5000000);
  const [months, setMonths] = useState(12);

  const calculation = useMemo(() => {
    const remaining = targetAmount - currentSavings;
    const monthlyNeeded = remaining > 0 ? remaining / months : 0;
    const dailyNeeded = monthlyNeeded / 30;
    return { remaining, monthlyNeeded, dailyNeeded };
  }, [targetAmount, currentSavings, months]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Calculator size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Kalkulator Tabungan Umroh</h2>
            <p className="text-sm text-slate-500">Rencanakan perjalanan ke Baitullah dengan realistis.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Biaya Umroh (Target)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tabungan Saat Ini</label>
              <div className="relative">
                <TrendingUp size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rencana Berangkat (Bulan)</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  min={1}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6 flex flex-col justify-between border border-emerald-100">
            <div>
              <h3 className="text-emerald-800 font-semibold mb-4">Target Menabung</h3>
              
              <div className="mb-4">
                <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold mb-1">Per Bulan</p>
                <p className="text-2xl font-bold text-emerald-900">{formatRupiah(calculation.monthlyNeeded)}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold mb-1">Per Hari</p>
                <p className="text-xl font-bold text-emerald-800 opacity-80">{formatRupiah(calculation.dailyNeeded)}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-200">
              <p className="text-sm text-emerald-700">
                Sisa yang dibutuhkan: <span className="font-semibold">{formatRupiah(calculation.remaining)}</span>
              </p>
              <p className="text-xs text-emerald-600 mt-2 italic">"Allah tidak memanggil yang mampu, tapi memampukan yang terpanggil."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrohTool;
