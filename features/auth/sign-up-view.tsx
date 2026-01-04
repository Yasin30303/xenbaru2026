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

const signUpSchema = z.object({
  fullname: z.string().min(2, "Nama harus lebih dari 2 karakter mas"),
  email: z.string().email("Email Tidak Valid mas"),
  password: z.string().min(6, "assword kudu 6 karakter mas"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const form = useForm<SignUpFormData>({
    defaultValues: {
      fullname: "John Doe",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmit = (values: SignUpFormData) => {
    authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.fullname,
      },
      {
        onSuccess: (data) => {
          console.log("User signed up successfully:", data);
          toast.success("Berhasil masuk, silahkan login!");
        },
        onError: (error) => {
          toast.error(`Gagal daftar: ${error.error.message}`);
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">📝 Admin Sign Up</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="fullname"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Masukan FUll name</Label>
                <FormControl>
                  <Input placeholder="Muhammad Nuaina yasin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Masukan Username</Label>
                <FormControl>
                  <Input placeholder="nassemuchi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Masukan Password</Label>
                <FormControl>
                  <Input type="password" placeholder="nassemuchi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-sm text-gray-600">
        Sudah punya akun?{" "}
        <Link href="/admin/sign-in" className="text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
