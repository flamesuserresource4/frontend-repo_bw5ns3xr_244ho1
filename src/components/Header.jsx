import { Search, Bell, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Header({ onSearch }) {
  const [value, setValue] = useState('');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/20">
            <span className="text-lg font-black">F</span>
          </div>
          <div>
            <p className="font-semibold leading-tight">FB Monitor</p>
            <p className="text-xs text-white/50">Realtime Keyword & Friend Feed</p>
          </div>
        </div>

        <div className="relative hidden flex-1 items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-white/50" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch?.(value);
            }}
            placeholder="Cari di dashboard (akun, username, isi postingan)"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-white/50 outline-none transition focus:border-fuchsia-400/40"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSearch?.(value)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 md:hidden"
          >
            <Search className="h-4 w-4" />
            Cari
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
