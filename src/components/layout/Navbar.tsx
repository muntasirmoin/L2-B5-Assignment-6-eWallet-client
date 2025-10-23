import InfoMenu from "@/components/info-menu";

import NotificationMenu from "@/components/notification-menu";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import Logo from "@/assets/icons/Logo";
import { ModeToggler } from "./ModeToggler";
import { Link } from "react-router-dom";
import { authApi, useLogoutMutation } from "@/redux/features/Auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { role } from "@/constants/role";
import { motion } from "framer-motion";
import { LogIn, LogOut } from "lucide-react";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC", id: "tour-home" },

  { href: "/features", label: "Features", role: "PUBLIC", id: "tour-features" },
  { href: "/contact", label: "Contact", role: "PUBLIC", id: "tour-contact" },
  { href: "/about", label: "About", role: "PUBLIC", id: "tour-about" },
  { href: "/faq", label: "FAQ", role: "PUBLIC", id: "tour-faq" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/agent", label: "Dashboard", role: role.AGENT },
  { href: "/user", label: "Dashboard", role: role.USER },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  console.log("info", data);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const canShow =
                      link.role === "PUBLIC" || link.role === data?.data?.role;
                    return canShow ? (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild className="py-1.5 w-full">
                          <Link to={link.href} id={link.id}>
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ) : null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-2">
            {/* <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a> */}
            <a
              href="#"
              className="text-primary hover:text-primary/90 flex items-center ml-3"
            >
              <img
                src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1760332205/output-onlinepngtools_iis7wf.png"
                alt="Company Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => {
                  const canShow =
                    link.role === "PUBLIC" || link.role === data?.data?.role;
                  return canShow ? (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        <Link to={link.href} id={link.id}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ) : null;
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* mode toggler */}
            <ModeToggler />

            {/* info menu */}
            <InfoMenu />

            {data?.data?.phone ? (
              <>
                {/* Info menu */}
                {/* <InfoMenu /> */}

                {/* Notification */}
                <NotificationMenu />

                {/* User menu */}
                <UserMenu name={data?.data?.name} phone={data?.data?.phone} />
                {/* logout */}
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer relative inline-flex items-center gap-2 overflow-hidden rounded-xl 
                 bg-gradient-to-r from-blue-500 to-indigo-700 px-4 py-2.5 text-sm font-medium 
                 text-white shadow-md transition-all duration-300 hover:shadow-lg 
                 hover:from-blue-600 hover:to-indigo-800 focus:outline-none"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity"></span>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="cursor-pointer relative inline-flex items-center gap-2 overflow-hidden rounded-xl 
                 bg-gradient-to-r from-blue-500 to-indigo-700 px-4 py-2.5 text-sm font-medium 
                 text-white shadow-md transition-all duration-300 hover:shadow-lg 
                 hover:from-blue-600 hover:to-indigo-800 focus:outline-none"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity"></span>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
