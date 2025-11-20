import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Video, Download, RefreshCw, AlertCircle, Copy } from 'lucide-react';
import { generateIslamicImage, sendMessageToGemini } from '../services/geminiService';

const DesignStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [videoPromptResult, setVideoPromptResult] = useState<string | null>(null);
  const [style, setStyle] = useState('Realistic');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setVideoPromptResult(null);

    try {
      if (activeTab === 'image') {
        const fullPrompt = `${style} style. ${prompt}`;
        const imageUrl = await generateIslamicImage(fullPrompt);
        setGeneratedImage(imageUrl);
      } else {
        // Generate Video Prompt Logic
        const systemInstruction = "Buatlah prompt video yang sangat detail untuk AI Video Generator (seperti Sora/Veo). Pastikan prompt dalam bahasa Inggris. Scene harus Syar'i, cinematic, tanpa wajah close-up yang menggoda, fokus pada ambiance, nature, atau aktivitas positif.";
        const result = await sendMessageToGemini(`${systemInstruction}\n\nTopik video: ${prompt}`);
        setVideoPromptResult(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Sparkles className="text-purple-500" />
            Studio Desain Syar'i
          </h1>
          <p className="text-slate-600 mt-2">
            Buat aset visual Islami aman tanpa khawatir melanggar adab. Otomatis Faceless & Sopan.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 bg-white p-1 rounded-xl w-fit border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'image' 
                ? 'bg-purple-100 text-purple-700 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ImageIcon size={18} /> Generator Gambar
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'video' 
                ? 'bg-purple-100 text-purple-700 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Video size={18} /> Video Prompt Creator
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {activeTab === 'image' ? 'Deskripsi Gambar' : 'Ide Video'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={activeTab === 'image' ? "Contoh: Pemandangan Masjid Nabawi saat senja, watercolor style..." : "Contoh: Video timelapse orang sedang tawaf di Ka'bah..."}
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                />
                
                {activeTab === 'image' && (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Gaya Visual</label>
                    <div className="flex gap-2 flex-wrap">
                      {['Realistic', 'Clay 3D', 'Watercolor', 'Line Art', 'Anime Syari'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStyle(s)}
                          className={`px-3 py-1.5 text-xs rounded-full border ${
                            style === s 
                              ? 'bg-purple-600 text-white border-purple-600' 
                              : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-amber-600 text-xs bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                      <AlertCircle size={14} />
                      <span>Auto-Filter: Faceless & Syar'i</span>
                   </div>
                   <button
                    onClick={handleGenerate}
                    disabled={!prompt || isGenerating}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors font-medium shadow-lg shadow-purple-200"
                   >
                     {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                     {isGenerating ? 'Sedang Membuat...' : 'Generate'}
                   </button>
                </div>
             </div>
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center p-6 relative overflow-hidden">
             {isGenerating ? (
               <div className="text-center space-y-4">
                 <div className="w-16 h-16 border-4 border-purple-100 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                 <p className="text-slate-500 text-sm animate-pulse">AI sedang bekerja...</p>
               </div>
             ) : generatedImage ? (
               <div className="w-full h-full flex flex-col">
                 <img src={generatedImage} alt="Generated" className="w-full h-auto rounded-lg shadow-md object-cover" />
                 <a 
                   href={generatedImage} 
                   download={`syari-design-${Date.now()}.jpg`}
                   className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                 >
                   <Download size={18} /> Download HD
                 </a>
               </div>
             ) : videoPromptResult ? (
               <div className="w-full h-full flex flex-col text-left">
                 <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                   <Video size={18} className="text-purple-600" />
                   Video Prompt Result
                 </h3>
                 <div className="flex-1 bg-slate-50 p-4 rounded-xl text-sm text-slate-700 font-mono overflow-y-auto border border-slate-200 leading-relaxed">
                   {videoPromptResult}
                 </div>
                 <button 
                   onClick={() => navigator.clipboard.writeText(videoPromptResult)}
                   className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                 >
                   <Copy size={18} /> Copy Prompt
                 </button>
               </div>
             ) : (
               <div className="text-center text-slate-400">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === 'image' ? <ImageIcon size={32} /> : <Video size={32} />}
                  </div>
                  <p>Hasil {activeTab === 'image' ? 'gambar' : 'prompt video'} akan muncul di sini.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;