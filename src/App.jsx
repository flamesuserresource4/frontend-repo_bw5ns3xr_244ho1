import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [showKeywords, setShowKeywords] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [keywords, setKeywords] = useState(['promo', 'diskon', 'event']);
  const [accounts, setAccounts] = useState([
    { id: '1', name: 'Teman A', username: 'teman.a' },
    { id: '2', name: 'Teman B', username: 'teman.b' },
  ]);
  const [query, setQuery] = useState('');

  // Mocked posts for visual demo only (no backend calls yet)
  const [posts] = useState(() => [
    {
      id: 'p1',
      author: 'Teman A',
      username: 'teman.a',
      avatar: 'https://i.pravatar.cc/100?img=12',
      time: '2 jam lalu',
      privacy: 'Teman',
      content:
        'Lagi ada promo spesial di kafe langganan! Diskon 50% buat semua menu sore ini. Siapa mau ikut? #promo #diskon',
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      ],
    },
    {
      id: 'p2',
      author: 'Teman B',
      username: 'teman.b',
      avatar: 'https://i.pravatar.cc/100?img=32',
      time: 'Kemarin',
      privacy: 'Teman dari Teman',
      content:
        'Akhirnya kelar juga mini project weekend. Btw lagi nyari rekomendasi kamera mirrorless buat vlogging. Ada saran? ',
      images: [],
    },
    {
      id: 'p3',
      author: 'Brand Lokal',
      username: 'brand.lokal',
      avatar: 'https://i.pravatar.cc/100?img=5',
      time: '1 jam lalu',
      privacy: 'Publik',
      content:
        'Pengumuman: Event komunitas bulan ini pindah ke tanggal 12! Akan ada workshop gratis dan hadiah menarik. #event',
      images: [
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      ],
    },
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.author.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }, [query, posts]);

  const keywordMatches = useMemo(() => {
    const keys = keywords.map((k) => k.toLowerCase());
    return filtered.map((p) => ({
      ...p,
      highlighted: keys.some((k) => p.content.toLowerCase().includes(k)),
    }));
  }, [filtered, keywords]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[52rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <Header onSearch={setQuery} />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-10 pt-4 md:pt-6">
        <Sidebar
          onOpenKeywords={() => setShowKeywords(true)}
          onOpenAccounts={() => setShowAccounts(true)}
        />

        <main className="flex-1">
          <Dashboard posts={keywordMatches} keywords={keywords} />
        </main>
      </div>

      {/* Keywords Drawer */}
      {showKeywords && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowKeywords(false)}
          />
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-slate-900/95 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Kata Kunci Dipantau</h3>
              <button
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                onClick={() => setShowKeywords(false)}
              >
                Tutup
              </button>
            </div>
            <div className="space-y-4">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  const value = (fd.get('keyword') || '').toString().trim();
                  if (!value) return;
                  if (!keywords.includes(value)) setKeywords((k) => [...k, value]);
                  form.reset();
                }}
              >
                <input
                  name="keyword"
                  placeholder="Tambah kata kunci..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder-white/40 outline-none ring-0 focus:border-fuchsia-400/40"
                />
                <button className="rounded-lg bg-fuchsia-500 px-3 py-2 text-sm font-medium text-white hover:bg-fuchsia-600">
                  Tambah
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span
                    key={k}
                    className="group inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-200"
                  >
                    #{k}
                    <button
                      onClick={() => setKeywords((arr) => arr.filter((x) => x !== k))}
                      className="rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-xs text-fuchsia-100 hover:bg-fuchsia-500/30"
                      aria-label={`Hapus ${k}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <p className="mt-6 text-xs text-white/50">
                Catatan: Konten yang cocok dengan kata kunci akan ditandai di dashboard secara
                otomatis. Integrasi pengambilan data langsung dari backend dapat dihubungkan
                kemudian.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Accounts Drawer */}
      {showAccounts && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAccounts(false)}
          />
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-slate-900/95 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Akun yang Dipantau</h3>
              <button
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                onClick={() => setShowAccounts(false)}
              >
                Tutup
              </button>
            </div>

            <form
              className="mb-5 grid grid-cols-1 gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = (fd.get('name') || '').toString().trim();
                const username = (fd.get('username') || '').toString().trim();
                if (!name || !username) return;
                setAccounts((arr) => [
                  ...arr,
                  { id: Math.random().toString(36).slice(2), name, username },
                ]);
                e.currentTarget.reset();
              }}
            >
              <input
                name="name"
                placeholder="Nama tampilan"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder-white/40 outline-none focus:border-cyan-400/40"
              />
              <input
                name="username"
                placeholder="Username/ID Facebook"
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder-white/40 outline-none focus:border-cyan-400/40"
              />
              <button className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-600">
                Tambah Akun
              </button>
            </form>

            <ul className="space-y-2">
              {accounts.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-white/50">@{a.username}</p>
                  </div>
                  <button
                    onClick={() => setAccounts((arr) => arr.filter((x) => x.id !== a.id))}
                    className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-white/50">
              Akun yang ditambahkan akan menjadi sumber pemantauan. Sistem backend nantinya
              akan menggunakan cookie akun Anda untuk mengakses postingan yang hanya terlihat
              oleh pertemanan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
