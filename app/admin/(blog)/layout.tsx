import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";
// !WAJIB
interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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
