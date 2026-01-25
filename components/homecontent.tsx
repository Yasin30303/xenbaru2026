"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Zap, Target, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaqSection } from "@/app/faq";
import { ProjectGallery } from "@/app/project-gallery";
import { ModernServicesCarousel } from "@/components/modern-services-carousel";
import { MotionDiv } from "@/components/motion-div";
import { ScrollAnimatedSvg } from "@/components/scroll-animated-svg";
import { AuroraText } from "@/components/ui/aurora-text";

export default function HomeContent() {
  const [showVisiMisi, setShowVisiMisi] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        {/* Latar Belakang Warna Diagonal */}
        <div className="absolute inset-0 flex">
          <div className="hidden md:block w-1/2" />
          <div className="w-full md:w-1/2 flex -skew-x-25 md:translate-x-24">
            <div className="w-1/3 bg-[#F4B400] opacity-90" />
            <div className="w-1/3 bg-[#4285F4] opacity-90" />
            <div className="w-1/3 bg-[#DB4437] opacity-90" />
          </div>
        </div>

        {/* Konten */}
        <main className="relative z-10 flex flex-col md:grid md:grid-cols-2 items-center min-h-[80vh] px-4 sm:px-6 lg:px-12 gap-y-8">
          {/* Kolom Kiri */}
          <MotionDiv className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 relative z-20">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-gray-900">
              Solusi Digital untuk{" "}
              <AuroraText speed={2}>Bisnis Modern</AuroraText>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Xena Tekno membantu bisnis Anda berkembang melalui pengembangan
              website, aplikasi web, dan sistem digital yang efisien dan aman.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link href="/hubungi-kami">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 group"
                >
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2"
                onClick={() => {
                  document.getElementById("tentang")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </MotionDiv>

          {/* Kolom Kanan */}
        </main>
      </div>

      {/* Tentang Kami Section */}
      <section
        id="tentang"
        className="py-20 sm:py-24 px-4 sm:px-6 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Background Decoration */}
          <div className="absolute -left-40 top-1/2 transform -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

          <MotionDiv className="flex justify-center relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-20" />
              <Image
                src="/images/gambar-tentang.png"
                alt="Tentang Kami"
                width={400}
                height={300}
                className="w-full max-w-xs sm:max-w-md h-auto rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 relative z-10"
              />
            </div>
          </MotionDiv>
          <MotionDiv className="relative z-10">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Tentang Kami
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Inovasi Teknologi untuk Kesuksesan Bisnis Anda
            </h2>
            <MotionDiv delay={0.2}>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Kami mengembangkan teknologi untuk berbagai perusahaan. Dengan
                pengalaman kami siap memahami kebutuhan bisnis digital Anda.
              </p>
            </MotionDiv>
            <MotionDiv delay={0.4}>
              <Button
                onClick={() => setShowVisiMisi(true)}
                className="bg-blue-600 hover:bg-blue-700 group"
              >
                Selengkapnya
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* Divider Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <MotionDiv delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meningkatkan Bisnis Anda Melalui Inovasi
            </h2>
          </MotionDiv>
          <MotionDiv delay={0.3}>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Kami menggabungkan strategi, desain, dan teknologi untuk
              menciptakan solusi digital yang mengubah cara Anda berbisnis.
            </p>
          </MotionDiv>
          <MotionDiv delay={0.5}>
            <ScrollAnimatedSvg className="shrink-0 max-w-full" />
          </MotionDiv>
        </div>
      </section>

      {/* Services */}
      <MotionDiv>
        <ModernServicesCarousel />
      </MotionDiv>

      {/* Projects */}
      <MotionDiv>
        <ProjectGallery />
      </MotionDiv>

      {/* FAQ */}
      <MotionDiv>
        <FaqSection />
      </MotionDiv>

      {/* Hubungi Kami */}
      <MotionDiv>
        <section
          id="kontak"
          className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
            <div className="absolute -bottom-8 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Siap Mengembangkan Bisnis Anda?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-gray-300">
              Hubungi Kami untuk Mendapatkan Penawaran Terbaik dan Konsultasi
              Gratis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/hubungi-kami">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto group"
                >
                  Hubungi Kami Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </MotionDiv>

      {/* Visi Misi Dialog */}
      <Dialog open={showVisiMisi} onOpenChange={setShowVisiMisi}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
              Visi dan Misi Xena Tekno
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-8">
            <MotionDiv>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  📈 Visi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi mitra teknologi terpercaya yang menghadirkan solusi
                  digital inovatif untuk mengakselerasi pertumbuhan bisnis di
                  era digital.
                </p>
              </div>
            </MotionDiv>

            <MotionDiv delay={0.2}>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  🎯 Misi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Memberikan solusi terbaik melalui teknologi modern, konsultasi
                  profesional, dan layanan purna jual yang responsif untuk
                  kesuksesan bisnis klien kami.
                </p>
              </div>
            </MotionDiv>

            <MotionDiv delay={0.4}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Struktur Organisasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    role: "Komisaris",
                    name: "Rey Mantovani Tarigan",
                    color: "from-blue-50",
                  },
                  {
                    role: "Direktur",
                    name: "Faiza Fasha",
                    color: "from-purple-50",
                  },
                  { role: "Teknisi", name: "Kasum", color: "from-pink-50" },
                  {
                    role: "Keuangan",
                    name: "Dini Nur Salamah",
                    color: "from-indigo-50",
                  },
                ].map((person, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${person.color} to-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow`}
                  >
                    <h4 className="font-bold text-gray-900 mb-1">
                      {person.role}
                    </h4>
                    <p className="text-gray-700">{person.name}</p>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
}
