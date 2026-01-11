import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { blogsRouter } from "@/features/blogs/routers";

export const appRouter = createTRPCRouter({
  blog: blogsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
