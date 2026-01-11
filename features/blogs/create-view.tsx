// app/(blog)/blog/create/page.tsx
"use client";

import { TiptapEditor } from "@/components/tiptap-editor";
import Link from "next/link";
import { useState } from "react";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "recharts";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const blogSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(20, "Konten minimal 20 karakter"),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export default function CreateBlogPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const create = useMutation(
    trpc.blog.create.mutationOptions({
      // setelah sukses membuat blog maka tampilkan notif
      onSuccess: async (data) => {
        toast.success("Artikel berhasil dibuat!");
        // prefetch semisal lamun nga create blog, engke teh si data blog na lansgung ka tampilkan tanpa delay
        await queryClient.invalidateQueries(trpc.blog.getALL.queryOptions());
      },
    })
  );

  const form = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: zodResolver(blogSchema),
  });

  const handleSubmit = (values: BlogFormData) => {
    setIsSubmitting(true);
    create.mutate({
      content: values.content,
      title: values.title,
    });
    setIsSubmitting(false);
    router.push("/admin/blog");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">✍️ Buat Artikel Baru</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Artikel
                </Label>
                <FormControl>
                  <Input
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Contoh: Panduan Next.js 15"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <Label>Kontent Artikel</Label>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "buat artikel"
              )}
            </Button>
            <Link
              href="/blog"
              className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
            >
              Batal
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
