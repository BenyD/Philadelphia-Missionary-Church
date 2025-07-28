"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  LogOut,
  Home,
  MessageSquare,
  Calendar,
  ExternalLink,
  Users,
  MapPin,
} from "lucide-react";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { user } = useSupabase();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      hoverBg: "hover:bg-blue-100",
    },
    {
      title: "Prayer Requests",
      icon: MessageSquare,
      href: "/admin/prayer-requests",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      hoverBg: "hover:bg-purple-100",
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/admin/events",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      hoverBg: "hover:bg-green-100",
    },
    {
      title: "Pastors",
      icon: Users,
      href: "/admin/pastors",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      hoverBg: "hover:bg-orange-100",
    },
    {
      title: "Locations",
      icon: MapPin,
      href: "/admin/locations",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      hoverBg: "hover:bg-indigo-100",
    },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">PMC Admin</h2>
            <p className="text-sm text-gray-600 font-medium">
              Philadelphia Missionary Church
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-gray-700 mb-4 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      onClick={() => router.push(item.href)}
                      className="cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-4 p-4 h-16 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? `${item.bgColor} ${item.textColor} shadow-md border-2 border-gray-200`
                            : `hover:${item.hoverBg} hover:shadow-lg hover:scale-[1.02] hover:border-2 hover:border-gray-200`
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200 ${
                            isActive
                              ? `bg-gradient-to-br ${item.color}`
                              : `bg-gradient-to-br ${item.color} group-hover:shadow-md group-hover:scale-110`
                          }`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-base font-semibold">
                          {item.title}
                        </span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="space-y-4">
          {/* Back to Website Button */}
          <Button
            variant="ghost"
            onClick={() => window.open("/", "_blank")}
            className="w-full justify-center gap-3 p-4 h-14 rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group"
          >
            <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Back to Website</span>
          </Button>

          <Separator className="bg-gray-300" />

          {/* User Info */}
          <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 font-medium truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-center gap-3 p-4 h-14 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-200 group"
          >
            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
