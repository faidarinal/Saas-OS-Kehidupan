export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  UMROH_TOOLS = 'UMROH_TOOLS',
  HABIT_TRACKER = 'HABIT_TRACKER',
  BUSINESS_TOOLS = 'BUSINESS_TOOLS',
  DESIGN_STUDIO = 'DESIGN_STUDIO'
}

export enum Sender {
  USER = 'USER',
  AI = 'AI'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isThinking?: boolean;
  imageUri?: string;
  isSaved?: boolean;
}

export interface Habit {
  id: string;
  name: string;
  category: 'ibadah' | 'health' | 'mindset' | 'work';
  completed: boolean;
  custom?: boolean;
}

export interface Quote {
  text: string;
  source: string;
  category: 'hadith' | 'quran' | 'motivation';
}

export interface Doa {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
}

export const SYSTEM_PROMPT_TEXT = `
Kamu adalah Asisten Islami Modern yang bekerja sebagai “OS Kehidupan”.

Fokus tugasmu:
1. Umroh & Haji (Tabungan, Manasik, Strategi Hemat)
2. Hijrah & Habit (Challenge, Reset Kebiasaan, Tracking Ibadah)
3. Hidup Sehat HARA Method™ (Happy, Aware, Realistic, Active)
4. Bisnis & Konten (Copywriting, Strategi, Branding)
5. Studio Desain Syar'i (Visual Consultant)

ATURAN VISUAL & DESAIN (SANGAT PENTING):
- Jika diminta membuat prompt gambar/video: Pastikan "Faceless" (tanpa wajah detail), Menutup Aurat sempurna, Tidak Sensual/Tabarruj.
- Gaya gambar: Bisa Realistic, Clay 3D, Watercolor, atau Minimalist Line Art.

Gaya bicara:
- Santai, manusiawi, sopan, Islami (gunakan istilah: Alhamdulillah, InsyaAllah, Qadarullah).
- Solutif dan to the point.
`;

// Data Sources
export const DAILY_DOA: Doa[] = [
  {
    title: "Doa Memohon Kebaikan Dunia Akhirat",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latin: "Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah, wa qina 'adzaban-nar",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka."
  },
  {
    title: "Doa Kemudahan Urusan",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    latin: "Rabbish rahli sadri, wa yassirlii amri",
    translation: "Ya Tuhanku, lapangkanlah untukku dadaku, dan mudahkanlah untukku urusanku."
  },
  {
    title: "Doa Memohon Rezeki Halal",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    latin: "Allahumma inni as-aluka 'ilman naafi'an wa rizqan thayyiban wa 'amalan mutaqabbalan",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik dan amal yang diterima."
  }
];

export const INSPIRATION_QUOTES: Quote[] = [
  {
    text: "Barangsiapa yang menempuh suatu jalan untuk menuntut ilmu, maka Allah akan memudahkan baginya jalan menuju surga.",
    source: "HR. Muslim",
    category: "hadith"
  },
  {
    text: "Maka sesungguhnya bersama kesulitan ada kemudahan.",
    source: "QS. Al-Insyirah: 5",
    category: "quran"
  },
  {
    text: "Dunia ini ibarat bayangan. Kalau kau berusaha menangkapnya, ia akan lari. Tapi kalau kau membelakanginya, ia tak punya pilihan selain mengikutimu.",
    source: "Ibnu Qayyim Al-Jauziyah",
    category: "motivation"
  },
  {
    text: "Janganlah engkau berduka cita, sesungguhnya Allah bersama kita.",
    source: "QS. At-Taubah: 40",
    category: "quran"
  },
  {
    text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.",
    source: "HR. Ahmad",
    category: "hadith"
  }
];