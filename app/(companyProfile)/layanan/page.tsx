import { Code, Smartphone, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: 'Pengembangan Website',
    description: 'Kami membangun website modern, responsif, dan cepat yang disesuaikan dengan kebutuhan bisnis Anda. Dari landing page hingga e-commerce kompleks.',
    icon: <Code className="h-12 w-12 mb-4 text-blue-500" />,
  },
  {
    title: 'Aplikasi Mobile',
    description: 'Solusi aplikasi mobile untuk Android dan iOS yang inovatif dan ramah pengguna untuk menjangkau pelanggan Anda di mana saja.',
    icon: <Smartphone className="h-12 w-12 mb-4 text-green-500" />,
  },
  {
    title: 'Desain UI/UX',
    description: 'Kami merancang antarmuka yang tidak hanya indah secara visual tetapi juga intuitif dan mudah digunakan, meningkatkan kepuasan pengguna.',
    icon: <PenTool className="h-12 w-12 mb-4 text-purple-500" />,
  },
  // Anda bisa menambahkan layanan lain di sini
];

export default function LayananPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Layanan Kami</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Kami menawarkan berbagai solusi teknologi untuk membantu bisnis Anda bertumbuh.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col text-center items-center p-6">
            <CardHeader className="items-center">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
