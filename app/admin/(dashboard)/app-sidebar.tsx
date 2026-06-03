"use client"

import * as React from "react"
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  HomeIcon,
  InboxIcon,
  QueueListIcon,
  FolderIcon,
} from "@heroicons/react/24/outline"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Inbox / Leads", href: "/admin/leads", icon: InboxIcon },
  { name: "Kategori Portofolio", href: "/admin/categories", icon: FolderIcon },
  { name: "Portfolio", href: "/admin/portfolio", icon: BriefcaseIcon },
  { name: "Layanan & Produk", href: "/admin/services", icon: QueueListIcon },
  { name: "Testimonial", href: "/admin/testimonials", icon: ChatBubbleLeftRightIcon },
  { name: "Blog", href: "/admin/blog", icon: DocumentTextIcon },
  { name: "Pricing", href: "/admin/pricing", icon: CurrencyDollarIcon },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex h-12 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              K
            </div>
            <span className="text-lg font-semibold tracking-tight">KitaNgoding</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton render={<Link href={item.href} />} isActive={pathname === item.href} tooltip={item.name}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/admin/settings" />} tooltip="Settings">
              <Cog6ToothIcon />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
