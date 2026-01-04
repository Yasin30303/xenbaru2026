import { prisma } from "@/lib/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const blogsRouter = createTRPCRouter({
  getALL: baseProcedure.query(async ({ ctx }) => {
    const blogs = await prisma.blogs.findMany();
    return blogs;
  }),
  create: baseProcedure
    .input(
      z.object({
        title: z.string().min(2).max(100),
        content: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      const blog = await prisma.blogs.create({
        data: {
          content: input.content,
          title: input.title,
        },
      });
      return blog;
    }),
});
