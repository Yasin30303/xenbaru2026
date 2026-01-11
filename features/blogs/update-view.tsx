"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TiptapEditor } from "@/components/tiptap-editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const updateblogSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(10),
});

type UpdateBlogForm = z.infer<typeof updateblogSchema>;

export function UpdateBlogView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const { toast } = useToast();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<UpdateBlogForm>({
    resolver: zodResolver(updateblogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Fetch blog
  const { data } = useQuery(
    trpc.blog.getById.queryOptions(
      { id: blogId! },
      {
        enabled: !!blogId,
      }
    )
  );

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, form]);

  const update = useMutation(
    trpc.blog.update.mutationOptions({
      onSuccess: async () => {
        toast({ title: "Berhasil", description: "Blog diperbarui" });
        await queryClient.invalidateQueries(trpc.blog.getALL.queryOptions());
        router.push("/admin/blog");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    })
  );

  const onSubmit = (values: UpdateBlogForm) => {
    update.mutate({
      id: blogId!,
      ...values,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konten</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={update.isPending}>
            {update.isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
