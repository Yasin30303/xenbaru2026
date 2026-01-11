import { UpdateBlogView } from "@/features/blogs/update-view";
import { prisma } from "@/lib/client";

export default async function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  if (!searchParams.id) {
    throw new Error("Blog ID tidak ditemukan");
  }

  const blogs = await prisma.blogs.findUnique({
    where: { id: searchParams.id },
  });

  if (!blogs) {
    throw new Error("Blog tidak ditemukan");
  }

  return <UpdateBlogView />;
}
