"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function BlogListPage() {
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(trpc.blog.getALL.queryOptions());

  if (isLoading) {
    return <p className="text-center py-12">Loading...</p>;
  }

  if (error || !data) {
    return (
      <p className="text-red-500 text-center py-12">Gagal memuat data blog.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-6">
        Wawasan, berita, dan pemikiran dari tim kami.
      </p>

      {data.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          <div className="border rounded-lg p-4 mb-4 hover:bg-gray-50">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString("id-ID")}
            </p>
            <p className="mt-2 text-gray-700">
              {post.content.slice(0, 100)}...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
