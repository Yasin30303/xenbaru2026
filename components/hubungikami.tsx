// components/ContactContent.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
  Building2,
  User,
  Loader2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "xenatekno@gmail.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Telepon",
    value: "+62 838-2158-7222",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Alamat",
    value: "Bandung, Indonesia",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Jam Kerja",
    value: "Senin - Jumat, 09:00 - 17:00",
    color: "from-orange-500 to-red-500",
  },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    namaPerusahaan: "",
    email: "",
    nomorHandphone: "",
    pertanyaan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
      setFormData({
        namaLengkap: "",
        namaPerusahaan: "",
        email: "",
        nomorHandphone: "",
        pertanyaan: "",
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            <MessageSquare className="w-4 h-4" />
            Hubungi Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mari Berkolaborasi
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mulailah berkolaborasi dengan XENA TEKNO. Tim kami akan menanggapi
            pertanyaan Anda dalam waktu 1x24 jam kerja.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {info.title}
                </h3>
                <p className="text-sm text-gray-600">{info.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full -translate-x-1/2 translate-y-1/2" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">
                  Kenapa Memilih Kami?
                </h2>
                <ul className="space-y-4">
                  {[
                    "Tim profesional dengan pengalaman 10+ tahun",
                    "Respons cepat dalam 1x24 jam",
                    "Konsultasi gratis tanpa biaya",
                    "Solusi yang disesuaikan dengan kebutuhan",
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl p-2 shadow-lg overflow-hidden"
            >
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.759569386498!2d107.55071250985925!3d-6.919321067693235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5ed777e8557%3A0x9cbc1fc0c2b26e19!2sJl.%20Rorojonggrang%20III%20No.33%2C%20Melong%2C%20Kec.%20Cimahi%20Sel.%2C%20Kota%20Cimahi%2C%20Jawa%20Barat%2040534!5e0!3m2!1sid!2sid!4v1769363106243!5m2!1sid!2sid"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="w-6 h-6" />
                  Kirim Pesan
                </CardTitle>
                <p className="text-white/80 text-sm mt-1">
                  Isi formulir di bawah dan kami akan segera menghubungi Anda
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-gray-600">
                      Terima kasih! Tim kami akan segera menghubungi Anda.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nama Lengkap */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        htmlFor="namaLengkap"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      >
                        <User className="w-4 h-4" />
                        Nama Lengkap *
                      </label>
                      <Input
                        id="namaLengkap"
                        name="namaLengkap"
                        type="text"
                        required
                        value={formData.namaLengkap}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("namaLengkap")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full transition-all duration-300 ${
                          focusedField === "namaLengkap"
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : ""
                        }`}
                        placeholder="Masukkan nama lengkap"
                      />
                    </motion.div>

                    {/* Nama Perusahaan */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <label
                        htmlFor="namaPerusahaan"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      >
                        <Building2 className="w-4 h-4" />
                        Nama Perusahaan
                      </label>
                      <Input
                        id="namaPerusahaan"
                        name="namaPerusahaan"
                        type="text"
                        value={formData.namaPerusahaan}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("namaPerusahaan")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full transition-all duration-300 ${
                          focusedField === "namaPerusahaan"
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : ""
                        }`}
                        placeholder="Masukkan nama perusahaan (opsional)"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full transition-all duration-300 ${
                          focusedField === "email"
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : ""
                        }`}
                        placeholder="email@contoh.com"
                      />
                    </motion.div>

                    {/* Nomor Handphone */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <label
                        htmlFor="nomorHandphone"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      >
                        <Phone className="w-4 h-4" />
                        Nomor Handphone *
                      </label>
                      <Input
                        id="nomorHandphone"
                        name="nomorHandphone"
                        type="tel"
                        required
                        value={formData.nomorHandphone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("nomorHandphone")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full transition-all duration-300 ${
                          focusedField === "nomorHandphone"
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : ""
                        }`}
                        placeholder="+62 xxx xxxx xxxx"
                      />
                    </motion.div>

                    {/* Pertanyaan */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label
                        htmlFor="pertanyaan"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Pertanyaan/Permintaan *
                      </label>
                      <Textarea
                        id="pertanyaan"
                        name="pertanyaan"
                        required
                        rows={5}
                        placeholder="Beritahu kami kebutuhan bisnis Anda..."
                        value={formData.pertanyaan}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("pertanyaan")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full transition-all duration-300 resize-none ${
                          focusedField === "pertanyaan"
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : ""
                        }`}
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg group"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            Kirim Pesan
                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
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
