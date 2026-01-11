"use client";
import { useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const trpc = useTRPC();

  const { data, isLoading } = useQuery(trpc.blog.getById.queryOptions({ id }));

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Blog tidak ditemukan</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
