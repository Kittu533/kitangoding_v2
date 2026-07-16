import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { redirect } from "next/navigation";
import { isUnauthorizedAdminRequest, requireAdminSession } from "@/lib/admin-session";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Admin Dashboard - kitangoding.id",
  description: "Internal Content Management System",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  try {
    await requireAdminSession();
  } catch (error) {
    if (isUnauthorizedAdminRequest(error)) {
      redirect("/admin/login");
    }

    throw error;
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <span className="text-sm font-semibold tracking-tight">Admin Dashboard</span>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 bg-muted/20 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
