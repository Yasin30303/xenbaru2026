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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const signInSchema = z.object({
  email: z.string().email("Email Tidak Valid"),
  password: z.string().min(6, "Password harus 6 karakter atau lebih"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = (values: SignInFormData) => {
    setIsSubmitting(true);
    authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (session) => {
          setIsSubmitting(false);
          toast.success("Berhasil masuk, selamat datang kembali!");
          router.push("/admin/blog");
        },

        onError: (error) => {
          setIsSubmitting(false);
          toast.error(`Gagal login: ${error.error.message}`);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Masuk ke dashboard admin Anda
            </p>
          </motion.div>

          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
                        <div className="relative mt-1">
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
                        </div>
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
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-gray-700 font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-500" />
                        Password
                      </Label>
                      <FormControl>
                        <div className="relative mt-1">
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
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <LogIn className="w-5 h-5" />
                      Masuk
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-6 border-t border-gray-100"
          >
            <p className="text-center text-sm text-gray-500">
              Butuh bantuan?{" "}
              <Link
                href="/hubungi-kami"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Hubungi Admin
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Bottom card decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-2 left-4 right-4 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-b-2xl -z-10 blur-sm"
        />
      </motion.div>
    </div>
  );
};

export default SignInPage;
