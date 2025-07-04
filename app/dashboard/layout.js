import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/dashboard/app-sidebar";
import { auth } from "../_lib/auth";
import { SiteHeader } from "../_components/dashboard/site-header";

export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar session={session} variant="inset" />
      {children}
    </SidebarProvider>
  );
}
