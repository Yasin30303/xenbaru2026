"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function BlogListPage() {
  const trpc = useTRPC();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery(trpc.blog.getALL.queryOptions());

  // Filter posts based on search
  const filteredPosts = data?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-xl"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-500 text-lg font-medium">
            Gagal memuat data blog.
          </p>
          <p className="text-gray-500 mt-2">Silakan coba lagi nanti.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            Blog & Artikel
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wawasan & Berita Terbaru
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Temukan artikel, tips, dan insight terbaru dari tim kami seputar
            teknologi dan bisnis digital.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Blog Posts */}
        {filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/blog/${post.id}`}>
                  <div
                    className={`group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col ${
                      hoveredId === post.id ? "shadow-2xl scale-[1.02]" : ""
                    }`}
                  >
                    {/* Gradient Header */}
                    <div className="h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10" />
                      <motion.div
                        animate={{
                          scale: hoveredId === post.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <BookOpen className="w-12 h-12 text-white/50" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil(post.content.length / 1000)} min
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                        {post.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Gradient Line */}
                    <motion.div
                      animate={{ scaleX: hoveredId === post.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? `Tidak ada artikel yang cocok dengan "${searchQuery}"`
                : "Belum ada artikel yang dipublikasikan."}
            </p>
          </motion.div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
