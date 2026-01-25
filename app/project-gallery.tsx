"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { motion } from "framer-motion"

const projects = [
  {
    client: "PUPR",
    year: "2022",
    logo: "/images/logo-pupr.png",
    image: "/images/pupr.jpeg",
    services: [
      "Pemeliharaan Data",
      "Alat Audio Visual",
      "Pengadaan Laptop",
      "Lisensi Google Workspace",
    ],
  },
  {
    client: "Institut Teknologi Bandung",
    year: "2022",
    logo: "/images/logo-itb.png",
    image: "/images/itb.jpg",
    services: ["Pengadaan SSD Server", "Pembuatan Aplikasi", "Web Learning Outcome"],
  },
  {
    client: "Gunung Raja Paksi",
    year: "2022",
    logo: "/images/logo-gp.png",
    image: "/images/gp.jpeg",
    services: [
      "Kabel Data Server",
      "Processor Server",
    ],
  },
  {
    client: "Gunung Raja Paksi",
    year: "2023",
    logo: "/images/logo-gp.png",
    image: "/images/gp.jpeg",
    services: ["SSD Server", "Power Supply Server"],
  },
]

export function ProjectGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Portofolio Proyek Kami
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami telah berhasil menyelesaikan berbagai proyek untuk klien-klien terkemuka
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <div className="rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full flex flex-col bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-gray-100 hover:border-blue-200">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image}
                      alt={`Proyek untuk ${project.client}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Logo Overlay */}
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-4"
                  >
                    <Image
                      src={project.logo}
                      alt={`Logo ${project.client}`}
                      width={48}
                      height={48}
                      className="bg-white p-1 rounded-full shadow-lg"
                    />
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {project.client}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">{project.year}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.services.slice(0, 2).map((service, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs group-hover:bg-blue-200 group-hover:text-blue-700 transition-colors"
                        >
                          {service}
                        </Badge>
                      </motion.div>
                    ))}
                    {project.services.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                      >
                        +{project.services.length - 2} lagi
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 border-t border-gray-200 overflow-hidden"
                >
                  <p className="text-sm text-gray-600 mt-4">
                    {project.services.join(", ")}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}