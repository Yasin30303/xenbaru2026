"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white text-black border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-perusahaan.png"
              alt="XENA TEKNO Logo"
              width={40}
              height={40}
            />
            <h1 className="text-xl font-bold">XENA TEKNO</h1>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-500 transition-colors">
            Tentang Kami
          </Link>
          <Link
            href="/layanan"
            className="hover:text-blue-500 transition-colors"
          >
            Pelayanan
          </Link>
          <Link href="/blog" className="hover:text-blue-500 transition-colors">
            Blog
          </Link>
          <Link
            href="/hubungi-kami"
            className="hover:text-blue-500 transition-colors"
          >
            Kontak
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-blue-500">
            Tentang Kami
          </Link>
          <Link href="/" className="block hover:text-blue-500">
            Pelayanan
          </Link>
          <Link href="/blog" className="block hover:text-blue-500">
            Blog
          </Link>
          <Link href="/hubungi-kami" className="block hover:text-blue-500">
            Kontak
          </Link>
        </div>
      )}
    </header>
  );
}
