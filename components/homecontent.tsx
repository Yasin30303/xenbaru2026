"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
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
      <div className="relative min-h-screen w-full bg-white overflow-hidden">
        {/* Latar Belakang Warna Diagonal */}
        <div className="absolute inset-0 flex">
          <div className="hidden md:block w-1/2" /> {/* Kosong di desktop */}
          <div className="w-full md:w-1/2 flex -skew-x-25 md:translate-x-24">
            <div className="w-1/3 bg-[#F4B400]" />
            <div className="w-1/3 bg-[#4285F4]" />
            <div className="w-1/3 bg-[#DB4437]" />
          </div>
        </div>

        {/* Konten */}
        <main className="relative z-10 flex flex-col md:grid md:grid-cols-2 items-center min-h-[80vh] px-4 sm:px-6 lg:px-12 gap-y-8">
          {/* Kolom Kiri */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-2 relative z-20">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Solusi Digital untuk{" "}
              <AuroraText speed={2}>Bisnis Modern</AuroraText>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Xena Tekno membantu bisnis Anda berkembang melalui pengembangan
              website, aplikasi web, dan sistem digital yang efisien dan aman.
            </p>
          </div>

          {/* Kolom Kanan */}
          <div className="flex items-center justify-center text-center md:text-right">
            {/* <h1 className="text-black text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug tracking-wide">
              Menghadirkan Solusi Lewat Teknologi
            </h1> */}
          </div>
        </main>
      </div>

      {/* Tentang Kami Section */}
      <section id="tentang" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/gambar-tentang.png"
              alt="Tentang Kami"
              width={400}
              height={300}
              className="w-full max-w-xs sm:max-w-md h-auto"
            />
          </div>
          <div>
            <MotionDiv>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                Tentang Kami
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                Kami mengembangkan teknologi untuk berbagai perusahaan, selain
                itu kami bergerak dalam bidang perdagangan barang dan jasa.
              </p>
            </MotionDiv>
            <Button
              onClick={() => setShowVisiMisi(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Selengkapnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Divider Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Meningkatkan Bisnis Anda Melalui Inovasi
            </h2>
          </MotionDiv>
          <MotionDiv delay={0.3}>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Kami menggabungkan strategi, desain, dan teknologi untuk
              menciptakan solusi digital.
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
          className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-black"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Hubungi Kami
            </h2>
            <p className="text-base sm:text-lg mb-8 text-gray-600">
              Hubungi Kami Untuk Mendapatkan Penawaran Terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/hubungi-kami">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
                >
                  Hubungi Kami
                  <ArrowRight className="ml-2 h-4 w-4" />
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
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Visi dan Misi
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm sm:text-base">
            <p className="text-gray-600 leading-relaxed">
              Visi dan Misi kami adalah memberikan solusi terbaik bagi
              perusahaan melalui teknologi.
            </p>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                Struktur Organisasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">
                    Komisaris
                  </h4>
                  <p className="text-gray-700">Rey Mantovani Tarigan</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Direktur</h4>
                  <p className="text-gray-700">Faiza Fasha</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Teknisi</h4>
                  <p className="text-gray-700">Kasum</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Keuangan</h4>
                  <p className="text-gray-700">Dini Nur Salamah</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
