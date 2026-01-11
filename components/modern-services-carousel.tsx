"use client";

import {
  MonitorCog,
  ShieldCheck,
  Code2,
  ServerCog,
  ChevronLeft,
  ChevronRight,
  Cloud,
} from "lucide-react"; // Added Cloud icon
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react"; // Added imports

const servicesData = [
  {
    title: "Konsultasi IT",
    description:
      "Memberikan saran ahli untuk strategi teknologi, optimasi infrastruktur, dan solusi digital yang sesuai dengan tujuan bisnis Anda.",
    icon: MonitorCog,
  },
  {
    title: "Keamanan Siber",
    description:
      "Melindungi aset digital Anda dari ancaman siber dengan solusi keamanan komprehensif, termasuk audit, implementasi, dan pemantauan.",
    icon: ShieldCheck,
  },
  {
    title: "Pengembangan Aplikasi",
    description:
      "Membangun aplikasi web dan mobile kustom yang inovatif, responsif, dan berkinerja tinggi untuk memenuhi kebutuhan spesifik bisnis Anda.",
    icon: Code2,
  },
  {
    title: "Pemeliharaan Sistem",
    description:
      "Memastikan sistem IT Anda berjalan lancar dan efisien dengan layanan pemeliharaan proaktif, pembaruan, dan dukungan teknis.",
    icon: ServerCog,
  },
  {
    // New service
    title: "Lisensi & Layanan Cloud",
    description:
      "Menyediakan solusi lisensi perangkat lunak dan layanan cloud terkelola untuk mendukung operasional bisnis Anda dengan efisien dan aman.",
    icon: Cloud,
  },
];

export function ModernServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // Get emblaApi
    loop: true,
    align: "start",
    dragFree: true, // Added for more natural inertia
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 3 }, // Desktop: scroll 3 slides
      "(min-width: 768px)": { slidesToScroll: 2 }, // Tablet: scroll 2 slides
      "(max-width: 767px)": { slidesToScroll: 1 }, // Mobile: scroll 1 slide
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

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
    <section id="pelayanan" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Pelayanan Kami
        </h2>

        <div className="relative">
          {" "}
          {/* Added relative for absolute positioning of buttons */}
          <div className="embla overflow-hidden" ref={emblaRef}>
            {" "}
            {/* Added overflow-hidden */}
            <div className="embla__container flex -ml-4">
              {" "}
              {/* Added -ml-4 for spacing */}
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className="embla__slide shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  {" "}
                  {/* Changed px-4 to pl-4 */}
                  <div
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center h-full
                               transform transition-all duration-300 hover:scale-105 hover:shadow-lg select-none" // Added select-none
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-auto bg-blue-600 hover:bg-blue-700"
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <Button
            className="absolute top-1/2 -translate-y-1/2 left-0 bg-white rounded-full p-2 shadow-md opacity-75 hover:opacity-100 transition-opacity duration-300 hidden md:flex"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </Button>
          <Button
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white rounded-full p-2 shadow-md opacity-75 hover:opacity-100 transition-opacity duration-300 hidden md:flex"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </Button>
        </div>
      </div>
    </section>
  );
}
