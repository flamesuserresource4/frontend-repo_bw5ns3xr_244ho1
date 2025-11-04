import { Globe, Eye } from 'lucide-react';

function PostCard({ post }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border ${
        post.highlighted ? 'border-fuchsia-400/40' : 'border-white/10'
      } bg-white/5 p-0 shadow-lg transition`}
    >
      <div className="flex items-start gap-3 p-4">
        <img
          src={post.avatar}
          alt={post.author}
          className="h-10 w-10 rounded-full ring-1 ring-white/10"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-2 text-sm">
            <p className="font-semibold">{post.author}</p>
            <span className="text-white/40">@{post.username}</span>
            <span className="mx-1 text-white/20">•</span>
            <span className="text-white/60">{post.time}</span>
            <span className="mx-1 text-white/20">•</span>
            <span className="inline-flex items-center gap-1 text-white/60">
              {post.privacy === 'Publik' ? (
                <Globe className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {post.privacy}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-white/90">
            {post.content}
          </p>
        </div>
      </div>

      {post.images && post.images.length > 0 && (
        <div className="grid gap-1 p-1 sm:grid-cols-2">
          {post.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="media"
              className="h-64 w-full rounded-xl object-cover ring-1 ring-white/10"
            />
          ))}
        </div>
      )}

      {post.highlighted && (
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
      )}
    </article>
  );
}

export default function Dashboard({ posts, keywords }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-white/60">Kata kunci aktif:</span>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200"
              >
                #{k}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-white/50">Feed realtime ditampilkan penuh tanpa gangguan</div>
      </div>

      <section className="grid gap-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </div>
  );
}
