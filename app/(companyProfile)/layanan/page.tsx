"use client";

import { useState } from "react";
import {
  Code,
  Smartphone,
  PenTool,
  Server,
  Shield,
  Cloud,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Pengembangan Website",
    description:
      "Kami membangun website modern, responsif, dan cepat yang disesuaikan dengan kebutuhan bisnis Anda. Dari landing page hingga e-commerce kompleks.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Loading",
      "Modern UI/UX",
    ],
  },
  {
    title: "Aplikasi Mobile",
    description:
      "Solusi aplikasi mobile untuk Android dan iOS yang inovatif dan ramah pengguna untuk menjangkau pelanggan Anda di mana saja.",
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
    features: [
      "Cross Platform",
      "Native Performance",
      "Offline Support",
      "Push Notifications",
    ],
  },
  {
    title: "Desain UI/UX",
    description:
      "Kami merancang antarmuka yang tidak hanya indah secara visual tetapi juga intuitif dan mudah digunakan, meningkatkan kepuasan pengguna.",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    features: ["User Research", "Wireframing", "Prototyping", "Design System"],
  },
  {
    title: "Infrastruktur Server",
    description:
      "Solusi server dan hosting yang andal, aman, dan scalable untuk mendukung aplikasi dan website bisnis Anda.",
    icon: Server,
    color: "from-orange-500 to-red-500",
    features: [
      "High Availability",
      "Auto Scaling",
      "24/7 Monitoring",
      "Backup & Recovery",
    ],
  },
  {
    title: "Keamanan Siber",
    description:
      "Lindungi aset digital Anda dengan solusi keamanan komprehensif, audit keamanan, dan implementasi best practices.",
    icon: Shield,
    color: "from-red-500 to-rose-500",
    features: [
      "Security Audit",
      "Penetration Testing",
      "SSL/TLS Setup",
      "Firewall Config",
    ],
  },
  {
    title: "Cloud Solutions",
    description:
      "Migrasi dan pengelolaan layanan cloud untuk efisiensi operasional dan skalabilitas bisnis yang lebih baik.",
    icon: Cloud,
    color: "from-indigo-500 to-blue-500",
    features: [
      "Cloud Migration",
      "Cost Optimization",
      "Multi-Cloud",
      "DevOps Setup",
    ],
  },
];

export default function LayananPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Layanan Profesional
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Layanan Kami
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai solusi teknologi untuk membantu bisnis Anda
            bertumbuh dan berkembang di era digital.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;
            const isSelected = selectedService === index;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 h-full ${
                    isHovered ? "shadow-2xl scale-[1.02]" : "shadow-lg"
                  } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setSelectedService(isSelected ? null : index)}
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 ${
                      isHovered ? "opacity-5" : ""
                    }`}
                  />

                  <CardHeader className="relative z-10 text-center pb-2">
                    {/* Icon Container */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 text-center">
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {/* Features - Expandable */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isSelected ? "auto" : 0,
                        opacity: isSelected ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Fitur Utama:
                        </h4>
                        <ul className="space-y-2 text-left">
                          {service.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{
                                opacity: isSelected ? 1 : 0,
                                x: isSelected ? 0 : -10,
                              }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Click hint */}
                    <motion.p
                      animate={{ opacity: isHovered && !isSelected ? 1 : 0 }}
                      className="text-sm text-blue-600 mt-4"
                    >
                      Klik untuk detail →
                    </motion.p>
                  </CardContent>

                  {/* Bottom Gradient Line */}
                  <motion.div
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                    style={{ transformOrigin: "left" }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Butuh Solusi Khusus?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Tim kami siap membantu mengembangkan solusi yang sesuai dengan
                kebutuhan spesifik bisnis Anda. Konsultasi gratis!
              </p>
              <Link href="/hubungi-kami">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 group"
                >
                  Hubungi Kami Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
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
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
