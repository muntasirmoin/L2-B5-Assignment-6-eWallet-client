// import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-rose-500">
            Dashboard
          </h1>
        </header> */}

        {/*  */}
        {/* HEADER */}
        {/* Header */}
        <header className="flex items-center h-16 border-b px-4 sticky top-0 bg-white dark:bg-black z-50">
          {/* Left side: Sidebar Trigger + Home Button */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-rose-500 border border-rose-500 hover:bg-green-500 hover:text-white hover:border-green-100"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </Button>
          </div>

          {/* Center or right aligned Dashboard title */}
          <div className="flex-1 flex justify-center max-sm:justify-end pointer-events-none px-4 absolute left-0 right-0">
            <h1 className="text-lg md:text-xl font-bold text-rose-500 text-center whitespace-nowrap pointer-events-none">
              Dashboard
            </h1>
          </div>
        </header>

        {/*  */}

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
