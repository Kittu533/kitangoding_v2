"use client"

import * as React from "react"
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Inbox / Leads", href: "/admin/leads", icon: InboxIcon },
  { name: "Kategori Portofolio", href: "/admin/categories", icon: FolderIcon },
  { name: "Portfolio", href: "/admin/portfolio", icon: BriefcaseIcon },
  { name: "Layanan & Produk", href: "/admin/services", icon: QueueListIcon },
  { name: "Testimonial", href: "/admin/testimonials", icon: ChatBubbleLeftRightIcon },
  { name: "Blog", href: "/admin/blog", icon: DocumentTextIcon },
  { name: "Kategori Blog", href: "/admin/blog-categories", icon: DocumentTextIcon },
  { name: "Pricing", href: "/admin/pricing", icon: CurrencyDollarIcon },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    for (const item of navigation) {
      router.prefetch(item.href)
    }
  }, [router])

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
                  <SidebarMenuButton render={<Link href={item.href} prefetch={true} />} isActive={pathname === item.href} tooltip={item.name}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
