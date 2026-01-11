import CreateBlogPage from "@/features/blogs/create-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";

export default async function Page() {
  await prefetch(trpc.blog.getALL.queryOptions());
  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateBlogPage />;
      </Suspense>
    </HydrateClient>
  );
}
