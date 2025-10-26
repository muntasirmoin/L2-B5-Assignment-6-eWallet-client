import * as React from "react";
import { Minus, Plus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/utils/getSidebarItems";

// import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { Link, useLocation } from "react-router-dom";
import { useMyWalletQuery } from "@/redux/features/Wallet/wallet.api";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);

  const location = useLocation();
  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  const role = userInfo?.data?.role;
  const isWalletUser = role === "user" || role === "agent";

  const {
    data: userWallet,
    error: walletError,
    isLoading: walletLoading,
  } = useMyWalletQuery(undefined, {
    skip: !isWalletUser,
  });

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-2 no-underline ">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square w-8 h-8 items-center justify-center rounded-lg">
                  {/* <Logo /> */}
                </div>
                {/* {["user", "agent"].includes(userInfo?.data?.role ?? "") && (
                  <div className="flex flex-col gap-0.5 leading-none ml-1.5">
                    <span className="font-bold mb-0.5 text-center">
                      Balance
                    </span>
                    <span className="font-bold mb-0.5 text-rose-500 bg-white rounded-md border px-2 py-1 inline-block">
                      {userWallet?.myWallet?.balance} Taka
                    </span>
                  </div>
                )} */}

                {/*  Balance section with loading/error block */}
                {/* {isWalletUser && (
                  <div className="flex flex-col gap-0.5 leading-none ml-1.5">
                    <span className="font-bold mb-0.5 text-center">
                      Balance
                    </span>

                    {walletLoading ? (
                      <div className="flex flex-col gap-1 leading-none ml-1.5 animate-pulse">
                        <span className="h-4 w-16 bg-gray-300 rounded-md mb-1"></span>
                        <span className="h-6 w-24 bg-gray-300 rounded-md"></span>
                      </div>
                    ) : walletError ? (
                      <p className="text-red-500 text-sm">
                        Error fetching wallet data
                      </p>
                    ) : (
                      <span className="font-bold mb-0.5 text-rose-500 bg-white rounded-md border px-2 py-1 inline-block">
                        {userWallet?.myWallet?.balance} Taka
                      </span>
                    )}
                  </div>
                )} */}

                {isWalletUser ? (
                  <div className="flex flex-col gap-0.5 leading-none ml-1.5">
                    <span className="font-bold mb-0.5 text-center">
                      Balance
                    </span>

                    {walletLoading ? (
                      <div className="flex flex-col gap-1 leading-none ml-1.5 animate-pulse">
                        <span className="h-4 w-16 bg-gray-300 rounded-md mb-1"></span>
                        <span className="h-6 w-24 bg-gray-300 rounded-md"></span>
                      </div>
                    ) : walletError ? (
                      <p className="text-red-500 text-sm">
                        Error fetching wallet data
                      </p>
                    ) : (
                      <span className="font-bold mb-0.5 text-rose-500 bg-white rounded-md border px-2 py-1 inline-block">
                        {userWallet?.myWallet?.balance} Taka
                      </span>
                    )}
                  </div>
                ) : role === "admin" ? (
                  <div className="flex flex-col gap-0.5 leading-none ml-1.5">
                    {/* <span className="font-bold mb-0.5 text-center">Admin</span> */}
                    <span className="font-bold mb-0.5 text-gray-700 bg-white rounded-md border px-2 py-1 inline-block">
                      {userInfo?.data?.name || "Admin User"}
                    </span>
                  </div>
                ) : null}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item?.items?.some(
                  (subItem) => location.pathname === subItem.url
                )}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
