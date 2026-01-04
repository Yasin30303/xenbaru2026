// app/(blog)/blog/page.tsx
"use client"; // Karena ini frontend-only mockup (tidak fetch data dari server)

import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
};

const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Mengapa Next.js 15 Adalah Pilihan Terbaik",
    excerpt:
      "Next.js 15 membawa fitur-fitur baru yang revolusioner seperti React Server Components, partial hydration, dan compiler yang lebih cepat.",
    date: "2026-01-03",
    author: "Tim Teknologi",
  },
  {
    id: "2",
    title: "Panduan Lengkap Membangun Website Profesional",
    excerpt:
      "Mulai dari desain hingga deployment, semua ada di sini. Pelajari praktik terbaik untuk website company profile.",
    date: "2026-01-01",
    author: "Admin",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">📰 Semua Artikel</h1>
      <p className="text-gray-600 mb-8">
        Temukan wawasan terbaru dari tim kami.
      </p>

      {mockBlogs.length > 0 ? (
        <div className="space-y-4">
          {mockBlogs.map((post) => (
            <Link
              key={post.id}
              href={`/admin/blog/${post.id}`}
              className="block border rounded-lg p-4 hover:bg-gray-50 transition-shadow duration-200"
            >
              <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Oleh {post.author} •{" "}
                {new Date(post.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Belum ada artikel. Mulai buat yang pertama!
        </p>
      )}

      <div className="mt-10 text-center">
        <Link
          href="admin/blog/create"
          className="inline-flex items-center gap-1 bg-indigo-600 text-white py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          ✍️ Buat Artikel Baru
        </Link>
      </div>
    </div>
  );
}
