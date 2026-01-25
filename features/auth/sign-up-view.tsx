"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2Icon, User, Mail, Lock, UserPlus, ArrowLeft, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const signUpSchema = z.object({
  fullname: z.string().min(2, "Nama harus lebih dari 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password harus 6 karakter atau lebih"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SignUpFormData>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = (values: SignUpFormData) => {
    setIsSubmitting(true);
    authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.fullname,
      },
      {
        onSuccess: (data) => {
          setIsSubmitting(false);
          setIsSuccess(true);
          toast.success("Admin baru berhasil dibuat!");
          form.reset();
          setTimeout(() => setIsSuccess(false), 3000);
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error(`Gagal membuat akun: ${error.error.message}`);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Buat Admin Baru
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Tambahkan admin baru ke sistem
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Admin Berhasil Dibuat!
                </h3>
                <p className="text-gray-500">
                  Admin baru dapat login dengan kredensial mereka
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Form {...form}>
                  <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FormField
                        name="fullname"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <Label className="text-gray-700 font-medium flex items-center gap-2">
                              <User className="w-4 h-4 text-emerald-500" />
                              Nama Lengkap
                            </Label>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className={`pl-4 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                  focusedField === "fullname"
                                    ? "border-emerald-500 shadow-lg shadow-emerald-500/20"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onFocus={() => setFocusedField("fullname")}
                                onBlur={() => setFocusedField(null)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm mt-1" />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <Label className="text-gray-700 font-medium flex items-center gap-2">
                              <Mail className="w-4 h-4 text-blue-500" />
                              Email
                            </Label>
                            <FormControl>
                              <Input
                                placeholder="admin@example.com"
                                className={`pl-4 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                  focusedField === "email"
                                    ? "border-blue-500 shadow-lg shadow-blue-500/20"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm mt-1" />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <Label className="text-gray-700 font-medium flex items-center gap-2">
                              <Lock className="w-4 h-4 text-purple-500" />
                              Password
                            </Label>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className={`pl-4 pr-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                  focusedField === "password"
                                    ? "border-purple-500 shadow-lg shadow-purple-500/20"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm mt-1" />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2Icon className="w-5 h-5 animate-spin" />
                            Membuat Akun...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Buat Admin Baru
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom card decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-2 left-4 right-4 h-8 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-b-2xl -z-10 blur-sm"
        />
      </motion.div>
    </div>
  );
};

export default SignUpPage;
