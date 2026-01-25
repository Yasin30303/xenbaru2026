"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Apa saja layanan utama yang ditawarkan oleh XENA TEKNO?",
    answer:
      "Kami fokus pada tiga layanan utama: pengembangan aplikasi & teknologi informasi, pengadaan perangkat keras & lunak, serta layanan pemeliharaan sistem untuk memastikan solusi teknologi Anda berjalan optimal.",
  },
  {
    question: "Bagaimana proses untuk memulai proyek dengan XENA TEKNO?",
    answer:
      "Prosesnya mudah. Anda bisa menghubungi kami melalui formulir kontak di situs ini atau melalui email. Tim kami akan segera menjadwalkan sesi konsultasi untuk memahami kebutuhan Anda dan mengajukan proposal.",
  },
  {
    question:
      "Berapa lama waktu yang dibutuhkan untuk mengembangkan sebuah aplikasi?",
    answer:
      "Waktu pengembangan sangat bervariasi tergantung pada kompleksitas dan fitur yang dibutuhkan. Setelah diskusi awal, kami akan memberikan estimasi waktu pengerjaan yang lebih akurat dalam proposal kami.",
  },
  {
    question: "Apakah XENA TEKNO menyediakan dukungan setelah proyek selesai?",
    answer:
      "Tentu saja. Kami menyediakan paket layanan pemeliharaan dan dukungan teknis untuk memastikan aplikasi atau sistem Anda tetap berjalan lancar dan aman setelah diluncurkan.",
  },
  {
    question: "Berapa biaya untuk konsultasi awal?",
    answer:
      "Konsultasi awal kami gratis! Kami percaya dalam memahami kebutuhan klien terlebih dahulu sebelum memberikan penawaran harga yang kompetitif dan sesuai dengan budget Anda.",
  },
  {
    question: "Teknologi apa yang Anda gunakan untuk pengembangan?",
    answer:
      "Kami menggunakan teknologi terkini seperti Next.js, React, TypeScript, Node.js, dan berbagai framework modern lainnya untuk memastikan aplikasi yang Anda dapatkan scalable dan maintainable.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="py-24 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Pertanyaan Umum
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Jawaban Untuk Pertanyaan Anda
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang layanan dan proses kami
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                value={`item-${index + 1}`}
                className="border border-gray-200 rounded-xl px-6 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50 data-[state=open]:to-purple-50 data-[state=open]:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors py-5">
                  <span className="flex items-center gap-3 w-full">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {faq.answer}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-2">Masih Ada Pertanyaan?</h3>
          <p className="mb-6">
            Tim kami siap membantu Anda dengan konsultasi gratis
          </p>
          <a
            href="/hubungi-kami"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Hubungi Tim Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}
