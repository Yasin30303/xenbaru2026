import { motion } from "framer-motion";
import { Menu, X, LayoutDashboard, FileText, Mail, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar overlay */}
      {open && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-64 bg-blue-700 text-white shadow-lg z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-600">
            <h1 className="font-bold text-lg">XENA TEKNO</h1>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-blue-600">
            <p className="font-semibold">{"Administrator"}</p>
            <p className="text-sm text-blue-200">Admin</p>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded hover:bg-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5" /> Halaman Utama
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 p-2 rounded hover:bg-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              <FileText className="w-5 h-5" /> Kelola Blog
            </Link>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-600"></div>
        </motion.aside>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="ml-4 font-bold text-xl">Admin Dashboard</h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
