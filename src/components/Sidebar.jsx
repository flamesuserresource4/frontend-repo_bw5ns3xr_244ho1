import { Home, User, Hash } from 'lucide-react';

export default function Sidebar({ onOpenAccounts, onOpenKeywords }) {
  return (
    <aside className="sticky top-[68px] hidden h-[calc(100vh-68px)] w-[84px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur md:flex">
      <button
        className="group flex w-full flex-col items-center gap-1 rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-3 text-xs hover:from-white/20"
        title="Dashboard"
      >
        <Home className="h-6 w-6 text-white group-hover:text-white" />
        <span className="text-[10px] text-white/70">Home</span>
      </button>

      <div className="my-1 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <button
        onClick={onOpenAccounts}
        className="group flex w-full flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-3 text-xs hover:bg-white/10"
        title="Kelola Akun Dipantau"
      >
        <User className="h-6 w-6" />
        <span className="text-[10px] text-white/70">Akun</span>
      </button>

      <button
        onClick={onOpenKeywords}
        className="group flex w-full flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-3 text-xs hover:bg-white/10"
        title="Kata Kunci"
      >
        <Hash className="h-6 w-6" />
        <span className="text-[10px] text-white/70">Kunci</span>
      </button>

      <div className="mt-auto rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-center text-[10px] text-emerald-200">
        Live
        <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-emerald-400/70" />
      </div>
    </aside>
  );
}
