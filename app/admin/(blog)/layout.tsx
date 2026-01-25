import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";
import { requireAuth } from "@/lib/auth-utils";
// !WAJIB
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
}
