import { prisma } from "@/lib/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export const blogsRouter = createTRPCRouter({
  getALL: baseProcedure.query(async ({ ctx }) => {
    const blogs = await prisma.blogs.findMany({
      include: {
        user: true,
      },
    });
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
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        throw new Error("Unauthorized");
      }
      const blog = await prisma.blogs.create({
        data: {
          content: input.content,
          title: input.title,
          user_id: session.user.id, // Temporary static user ID},
        },
      });
      return blog;
    }),
  // Read detail of a blog post by ID
  getById: baseProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      const blog = await prisma.blogs.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!blog) {
        throw new Error("Blog not found");
      }

      return blog;
    }),
  // Update a blog post by ID
  update: baseProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        title: z.string().min(2).max(100).optional(),
        content: z.string().min(10).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if blog exists first
      const existingBlog = await prisma.blogs.findUnique({
        where: { id: input.id },
      });

      if (!existingBlog) {
        throw new Error("Blog not found");
      }

      // Build update data only with provided fields
      const updateData: any = {};
      if (input.title !== undefined) updateData.title = input.title;
      if (input.content !== undefined) updateData.content = input.content;

      const blog = await prisma.blogs.update({
        where: {
          id: input.id,
        },
        data: updateData,
      });

      return blog;
    }),
  delete: baseProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      const blog = await prisma.blogs.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
});
