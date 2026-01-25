"use client";

import { useEffect, useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileEdit,
  Type,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const updateblogSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter").max(100, "Judul maksimal 100 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
});

type UpdateBlogForm = z.infer<typeof updateblogSchema>;

export function UpdateBlogView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const { toast } = useToast();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<UpdateBlogForm | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<UpdateBlogForm>({
    resolver: zodResolver(updateblogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Fetch blog
  const { data, isLoading } = useQuery(
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
        toast({
          title: "✅ Berhasil!",
          description: "Artikel berhasil diperbarui.",
        });
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

  const handleFormSubmit = (values: UpdateBlogForm) => {
    setPendingValues(values);
    setIsSaveDialogOpen(true);
  };

  const confirmSave = () => {
    if (pendingValues && blogId) {
      update.mutate({
        id: blogId,
        ...pendingValues,
      });
    }
    setIsSaveDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-pulse" />
            <Loader2 className="w-8 h-8 text-amber-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Memuat artikel...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileEdit className="w-4 h-4 text-amber-500" />
              Mode Edit
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileEdit className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Perbarui konten artikel Anda
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                          <Type className="w-4 h-4 text-amber-500" />
                          Judul Artikel
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Masukkan judul artikel..."
                            className={`rounded-xl border-2 py-3 transition-all duration-300 ${
                              focusedField === "title"
                                ? "border-amber-500 shadow-lg shadow-amber-500/20"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onFocus={() => setFocusedField("title")}
                            onBlur={() => setFocusedField(null)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4 text-orange-500" />
                          Konten Artikel
                        </FormLabel>
                        <FormControl>
                          <div className="rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all overflow-hidden">
                            <TiptapEditor
                              content={field.value}
                              onChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 pt-4"
                >
                  <Link href="/admin/blog" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-xl py-3"
                    >
                      Batal
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={update.isPending}
                    className="flex-1 rounded-xl py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {update.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Menyimpan...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Save className="w-5 h-5" />
                        Simpan Perubahan
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>

      {/* Save Confirmation Dialog */}
      <AlertDialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl">
                  Simpan Perubahan?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  Perubahan yang Anda buat akan disimpan dan dipublikasikan.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSave}
              disabled={update.isPending}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl gap-2"
            >
              {update.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Ya, Simpan
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
