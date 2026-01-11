"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BlogPost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // READ
  const { data, isLoading } = useQuery(trpc.blog.getALL.queryOptions());

  // DELETE
  const deleteBlog = useMutation(
    trpc.blog.delete.mutationOptions({
      onSuccess: async () => {
        toast.success("Blog berhasil dihapus");
        await queryClient.invalidateQueries(trpc.blog.getALL.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message ?? "Gagal menghapus blog");
      },
    })
  );

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">📰 Semua Artikel</h1>
          <p className="text-gray-600">
            Temukan wawasan terbaru dari tim kami.
          </p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="gap-2">✍️ Buat Artikel Baru</Button>
        </Link>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-shadow duration-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Oleh {blog.user.name} •{" "}
                    {new Date(blog.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-2 text-gray-700">{blog.content}</p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/admin/blog/edit?id=${blog.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBlog.mutate({ id: blog.id })}
                    disabled={deleteBlog.isPending}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Belum ada artikel. Mulai buat yang pertama!
        </p>
      )}
    </div>
  );
}
