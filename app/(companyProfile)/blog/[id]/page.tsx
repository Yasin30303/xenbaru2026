import { supabase } from "@/lib/supabaseClient";

type Blog = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author?: string;
};

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id) // cari blog berdasarkan id
    .single(); // hanya ambil 1 row

  if (error) {
    console.error("Supabase error:", error.message);
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Gagal Memuat Blog
          </h2>
          <p className="text-red-600">
            Terjadi kesalahan saat mengambil data blog.
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Blog Tidak Ditemukan
          </h2>
          <p className="text-gray-600">
            Blog yang Anda cari tidak tersedia atau mungkin sudah dihapus.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <time dateTime={blog.created_at}>
              {new Date(blog.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {blog.author && (
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>{blog.author}</span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        {/* PERBAIKAN UTAMA: Gunakan dangerouslySetInnerHTML untuk render HTML */}
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="prose prose-lg prose-gray max-w-none 
                     prose-headings:text-gray-900 prose-headings:font-bold
                     prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                     prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
                     prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
                     prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                     prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                     prose-ul:my-4 prose-ol:my-4
                     prose-li:text-gray-700 prose-li:mb-2
                     prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                     prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4
                     prose-blockquote:italic prose-blockquote:text-gray-700
                     prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 
                     prose-code:rounded prose-code:text-sm prose-code:font-mono
                     prose-strong:text-gray-900 prose-strong:font-semibold
                     prose-em:text-gray-800"
        />
      </article>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Kembali ke Blog
        </a>
      </div>
    </div>
  );
}
