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
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  PenLine,
  Type,
  FileText,
  Loader2,
  CheckCircle,
  Send,
  AlertTriangle,
} from "lucide-react";

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
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<BlogFormData | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const create = useMutation(
    trpc.blog.create.mutationOptions({
      onSuccess: async (data) => {
        toast.success("🎉 Artikel berhasil dipublikasikan!", {
          description: "Artikel Anda sudah dapat dibaca oleh pengunjung.",
        });
        await queryClient.invalidateQueries(trpc.blog.getALL.queryOptions());
        setIsSubmitting(false);
        router.push("/admin/blog");
      },
      onError: (error) => {
        toast.error("Gagal membuat artikel", {
          description: error.message,
        });
        setIsSubmitting(false);
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

  const handleFormSubmit = (values: BlogFormData) => {
    setPendingValues(values);
    setIsPublishDialogOpen(true);
  };

  const confirmPublish = () => {
    if (pendingValues) {
      setIsSubmitting(true);
      create.mutate({
        content: pendingValues.content,
        title: pendingValues.title,
      });
    }
    setIsPublishDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
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
              <PenLine className="w-4 h-4 text-emerald-500" />
              Mode Tulis
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
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <PenLine className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Buat Artikel Baru
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Tulis dan publikasikan artikel berkualitas untuk pembaca Anda
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
                          <Type className="w-4 h-4 text-emerald-500" />
                          Judul Artikel
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={`rounded-xl border-2 py-3 transition-all duration-300 ${
                              focusedField === "title"
                                ? "border-emerald-500 shadow-lg shadow-emerald-500/20"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            placeholder="Contoh: Panduan Lengkap Next.js 15"
                            onFocus={() => setFocusedField("title")}
                            onBlur={() => setFocusedField(null)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
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
                          <FileText className="w-4 h-4 text-teal-500" />
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
                        <FormMessage className="text-red-500 text-sm mt-1" />
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
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mempublikasikan...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Publikasikan
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-white/60 backdrop-blur rounded-xl p-4 border border-gray-100"
        >
          <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            💡 Tips Menulis Artikel
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Gunakan judul yang menarik dan deskriptif</li>
            <li>• Tambahkan gambar untuk memperjelas konten</li>
            <li>• Gunakan paragraf pendek agar mudah dibaca</li>
            <li>• Sertakan kesimpulan di akhir artikel</li>
          </ul>
        </motion.div>
      </div>

      {/* Publish Confirmation Dialog */}
      <AlertDialog
        open={isPublishDialogOpen}
        onOpenChange={setIsPublishDialogOpen}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl">
                  Publikasikan Artikel?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  Artikel akan dipublikasikan dan dapat dibaca oleh semua
                  pengunjung website.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPublish}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mempublikasikan...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Ya, Publikasikan
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
