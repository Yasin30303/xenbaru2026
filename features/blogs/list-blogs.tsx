"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Plus,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  Loader2,
  AlertTriangle,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function BlogPost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // READ
  const { data, isLoading } = useQuery(trpc.blog.getALL.queryOptions());

  // DELETE
  const deleteBlog = useMutation(
    trpc.blog.delete.mutationOptions({
      onSuccess: async () => {
        toast.success("🗑️ Blog berhasil dihapus!", {
          description: "Artikel telah dihapus dari database.",
        });
        await queryClient.invalidateQueries(trpc.blog.getALL.queryOptions());
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      },
      onError: (error) => {
        toast.error("Gagal menghapus blog", {
          description: error.message ?? "Terjadi kesalahan",
        });
      },
    })
  );

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteBlog.mutate({ id: deleteId });
    }
  };

  const filteredData = data?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse" />
            <Loader2 className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Memuat artikel...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                Manajemen Artikel
              </h1>
              <p className="text-gray-500 mt-1">
                Kelola semua artikel blog Anda di sini
              </p>
            </div>
            <Link href="/admin/blog/create">
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="w-5 h-5" />
                Buat Artikel Baru
              </Button>
            </Link>
          </motion.div>

          {/* Search and View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-xl"
              >
                <List className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-xl"
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredData && filteredData.length > 0 ? (
          <motion.div
            layout
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl 
                    transition-all duration-300 overflow-hidden group
                    ${viewMode === "list" ? "flex" : ""}
                  `}
                >
                  {/* Card Header with gradient */}
                  <div
                    className={`
                    bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4
                    ${viewMode === "list" ? "w-2" : ""}
                  `}
                  >
                    {viewMode === "grid" && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1">
                    <div
                      className={`
                      ${viewMode === "list" ? "flex items-start justify-between gap-4" : ""}
                    `}
                    >
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>

                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {blog.user.name}
                          </span>
                          {viewMode === "list" && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(blog.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          )}
                        </div>

                        {viewMode === "grid" && (
                          <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                            {blog.content.replace(/<[^>]*>/g, "").slice(0, 150)}
                            ...
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div
                        className={`
                        flex gap-2 
                        ${viewMode === "grid" ? "mt-4" : "flex-shrink-0"}
                      `}
                      >
                        <Link href={`/admin/blog/edit?id=${blog.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                          >
                            <Edit className="w-4 h-4" />
                            {viewMode === "list" && "Edit"}
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(blog.id)}
                          disabled={deleteBlog.isPending}
                          className="gap-2 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                        >
                          {deleteBlog.isPending && deleteId === blog.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          {viewMode === "list" && "Hapus"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchQuery ? "Artikel tidak ditemukan" : "Belum ada artikel"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Coba kata kunci lain"
                : "Mulai buat artikel pertama Anda!"}
            </p>
            {!searchQuery && (
              <Link href="/admin/blog/create">
                <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600">
                  <Plus className="w-5 h-5" />
                  Buat Artikel Pertama
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl">
                  Hapus Artikel?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus
                  secara permanen dari database.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteBlog.isPending}
              className="bg-red-600 hover:bg-red-700 rounded-xl gap-2"
            >
              {deleteBlog.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Ya, Hapus
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
