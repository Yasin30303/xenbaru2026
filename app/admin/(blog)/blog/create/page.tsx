// app/(blog)/blog/create/page.tsx
"use client";

import { TiptapEditor } from "@/components/tiptap-editor";
import Link from "next/link";
import { useState } from "react";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("<p>Halo dunia!</p>");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Di sini Anda bisa kirim data ke API (nanti saat integrasi Supabase)
    console.log({ title, content, category });

    // Contoh: alert sukses (hapus saat integrasi backend)
    alert("Artikel berhasil disimpan (mock)! Cek console untuk detail.");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">✍️ Buat Artikel Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Judul */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Judul Artikel
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Contoh: Panduan Next.js 15"
            required
          />
        </div>

        {/* Konten (Tiptap) */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Konten
          </label>
          {/* Editor Component */}
          <TiptapEditor
            content={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Kategori */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategori (Opsional)
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Pilih Kategori</option>
            <option value="tech">Teknologi</option>
            <option value="business">Bisnis</option>
            <option value="lifestyle">Gaya Hidup</option>
          </select>
        </div>

        {/* Aksi */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Simpan Artikel
          </button>
          <Link
            href="/blog"
            className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
