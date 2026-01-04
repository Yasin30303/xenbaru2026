import { notFound } from "next/navigation";
import Image from "next/image";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Generate static params for SSG
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs;
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound(); // Show 404 page if service not found
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/layanan"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Layanan
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {service.shortDescription}
          </p>

          <div className="prose max-w-none mb-8">
            {/* Render longDescription as HTML, be careful with untrusted content */}
            <div
              dangerouslySetInnerHTML={{
                __html: service.longDescription.replace(/\n/g, "<br/>"),
              }}
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">
            Manfaat yang Anda Dapatkan:
          </h2>
          <ul className="list-disc list-inside text-muted-foreground mb-8">
            {service.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Proses Kerja Kami:</h2>
          <ol className="list-decimal list-inside text-muted-foreground mb-8">
            {service.process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {service.relatedProjects && service.relatedProjects.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Proyek Terkait:</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.relatedProjects.map((projectSlug, index) => (
                  <Badge key={index} variant="outline">
                    {projectSlug}
                  </Badge> // You might want to link to actual project pages here
                ))}
              </div>
            </>
          )}

          <Link href="/hubungi-kami">
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Dapatkan Penawaran
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
