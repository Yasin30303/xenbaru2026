import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function BlogList() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return (
      <div className="p-8 text-center text-red-500">
        Gagal memuat data blog: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">
            Blog XENA TEKNO
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Wawasan, berita, dan pemikiran dari tim kami.
          </p>

          <div className="space-y-8">
            {blogs?.length === 0 && (
              <p className="text-center text-gray-500">Belum ada blog.</p>
            )}

            {blogs?.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <Card className="hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 hover:text-blue-600">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500 pt-2">
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <CardDescription className="pt-4 text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} XENA TEKNO. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
