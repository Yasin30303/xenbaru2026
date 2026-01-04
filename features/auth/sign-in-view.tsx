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

const signInSchema = z.object({
  email: z.string().email("Email Tidak valid mas"),
  password: z.string().min(6, "Password kudu 6 karakter mas"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = (values: SignInFormData) => {
    authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (session) => {
          toast.success("Berhasil masuk, selamat datang kembali!");
          router.push("/admin/blog");
        },

        onError: (error) => {
          toast.error(`Gagal login: ${error.error.message}`);
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">📝 Admin Sign In</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
            Sign In
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-sm text-gray-600">
        Belom punya akun?{" "}
        <Link href="/admin/sign-up" className="text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
