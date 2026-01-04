import Link from "next/link";
import { createServerClient } from "@/lib/supabaseClient";

type Blog = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default async function BlogList() {
  const supabase = createServerClient();

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return <p className="text-red-500">Gagal memuat data blog.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-6">
        Wawasan, berita, dan pemikiran dari tim kami.
      </p>
      {blogs?.map((post: Blog) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          <div className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString("id-ID")}
            </p>
            <p className="mt-2 text-gray-700">
              {post.content.substring(0, 100)}...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
