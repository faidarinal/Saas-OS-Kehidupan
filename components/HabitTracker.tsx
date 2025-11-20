import React, { useState } from 'react';
import { CheckCircle2, Circle, Trophy, Activity, Plus, Trash2, Tag } from 'lucide-react';
import { Habit } from '../types';

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Shalat Subuh Berjamaah', category: 'ibadah', completed: true },
    { id: '2', name: 'Dzikir Pagi', category: 'ibadah', completed: false },
    { id: '3', name: 'Tilawah 1 Halaman', category: 'ibadah', completed: false },
    { id: '4', name: 'Minum 2L Air (HARA)', category: 'health', completed: true },
    { id: '5', name: 'Jalan Kaki 30 Menit', category: 'health', completed: false },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState<Habit['category']>('ibadah');

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const handleAddHabit = () => {
    if (!newHabitName.trim()) return;
    const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        category: newHabitCategory,
        completed: false,
        custom: true
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setIsAdding(false);
  };

  const handleDeleteHabit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const progress = Math.round((completedCount / habits.length) * 100);

  const getCategoryColor = (cat: string) => {
    switch(cat) {
        case 'ibadah': return 'bg-purple-100 text-purple-600';
        case 'health': return 'bg-green-100 text-green-600';
        case 'mindset': return 'bg-blue-100 text-blue-600';
        case 'work': return 'bg-amber-100 text-amber-600';
        default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-full overflow-y-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg text-teal-700">
              <Activity size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Hijrah Habit Tracker</h2>
              <p className="text-sm text-slate-500">Istiqomah sedikit demi sedikit.</p>
            </div>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-1 text-amber-500 font-bold justify-end">
                <Trophy size={16} />
                <span>{completedCount}/{habits.length}</span>
             </div>
             <p className="text-xs text-slate-400">Selesai Hari Ini</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8">
          <div 
            className="bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="space-y-3 mb-8">
          {habits.map((habit) => (
            <div 
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                habit.completed 
                  ? 'bg-teal-50 border-teal-200' 
                  : 'bg-white border-slate-100 hover:border-teal-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`text-${habit.completed ? 'teal-600' : 'slate-300'}`}>
                  {habit.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </div>
                <div>
                    <h3 className={`font-medium ${habit.completed ? 'text-teal-900 line-through opacity-70' : 'text-slate-700'}`}>{habit.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide ${getCategoryColor(habit.category)}`}>
                        {habit.category}
                    </span>
                </div>
              </div>
              
              {/* Delete Button for Custom Habits */}
              <button 
                onClick={(e) => handleDeleteHabit(habit.id, e)}
                className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                title="Hapus"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Habit Section */}
        {!isAdding ? (
            <button 
                onClick={() => setIsAdding(true)}
                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-teal-400 hover:text-teal-600 transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={20} /> Tambah Target Baru
            </button>
        ) : (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                <h4 className="text-sm font-bold text-slate-700 mb-3">Target Baru</h4>
                <div className="space-y-3">
                    <input 
                        type="text" 
                        value={newHabitName}
                        onChange={(e) => setNewHabitName(e.target.value)}
                        placeholder="Contoh: Baca buku 15 menit"
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {(['ibadah', 'health', 'mindset', 'work'] as const).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setNewHabitCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize flex items-center gap-1 ${
                                    newHabitCategory === cat 
                                        ? 'bg-teal-600 text-white border-teal-600' 
                                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                                }`}
                            >
                                <Tag size={12} /> {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                        <button 
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700"
                        >
                            Batal
                        </button>
                        <button 
                            onClick={handleAddHabit}
                            disabled={!newHabitName.trim()}
                            className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 font-medium"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default HabitTracker;