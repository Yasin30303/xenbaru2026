"use client";

import {
  MonitorCog,
  ShieldCheck,
  Code2,
  ServerCog,
  ChevronLeft,
  ChevronRight,
  Cloud,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Konsultasi IT",
    description:
      "Memberikan saran ahli untuk strategi teknologi, optimasi infrastruktur, dan solusi digital yang sesuai dengan tujuan bisnis Anda.",
    icon: MonitorCog,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Keamanan Siber",
    description:
      "Melindungi aset digital Anda dari ancaman siber dengan solusi keamanan komprehensif, termasuk audit, implementasi, dan pemantauan.",
    icon: ShieldCheck,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Pengembangan Aplikasi",
    description:
      "Membangun aplikasi web dan mobile kustom yang inovatif, responsif, dan berkinerja tinggi untuk memenuhi kebutuhan spesifik bisnis Anda.",
    icon: Code2,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Pemeliharaan Sistem",
    description:
      "Memastikan sistem IT Anda berjalan lancar dan efisien dengan layanan pemeliharaan proaktif, pembaruan, dan dukungan teknis.",
    icon: ServerCog,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Lisensi & Layanan Cloud",
    description:
      "Menyediakan solusi lisensi perangkat lunak dan layanan cloud terkelola untuk mendukung operasional bisnis Anda dengan efisien dan aman.",
    icon: Cloud,
    color: "from-indigo-500 to-blue-500",
  },
];

export function ModernServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 3 },
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(max-width: 767px)": { slidesToScroll: 1 },
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="pelayanan"
      className="py-24 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Layanan Kami
          </span>
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Solusi Lengkap Untuk Kebutuhan Digital Anda
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            Kami menyediakan berbagai layanan profesional untuk mengakselerasi
            transformasi digital bisnis Anda
          </p>
        </motion.div>

        <div className="relative group">
          <div className="embla overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="embla__container flex -ml-4">
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="embla__slide shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4"
                  >
                    <motion.div
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      animate={{
                        y: hoveredIndex === index ? -8 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center h-full border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden relative group/card"
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover/card:opacity-5 transition-opacity duration-300`}
                      />

                      {/* Icon Container */}
                      <motion.div
                        animate={{
                          scale: hoveredIndex === index ? 1.15 : 1,
                          rotate: hoveredIndex === index ? 10 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 line-clamp-3 relative z-10 flex-grow">
                        {service.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              className="absolute top-1/2 -translate-y-1/2 -left-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex z-20 hover:bg-blue-600 hover:text-white"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              variant="ghost"
              size="icon"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              className="absolute top-1/2 -translate-y-1/2 -right-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex z-20 hover:bg-blue-600 hover:text-white"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              variant="ghost"
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>

          {/* Carousel Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center gap-2 mt-8"
          >
            {servicesData.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx % 3 === 0 ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
