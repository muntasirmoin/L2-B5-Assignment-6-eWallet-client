import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  DribbbleIcon,
} from "lucide-react";
import { Link } from "react-router";

const footerLinks = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookies", href: "#" },
];

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: DribbbleIcon, label: "Dribbble", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background px-4 pt-12 pb-6 md:px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        {/* Policy links */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row">
            {footerLinks.map((link, idx) => (
              <NavigationMenuItem key={idx}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Social icons */}
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ icon: Icon, label, href }, idx) => (
            <Button
              key={idx}
              asChild
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon className="size-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()}. e-Wallet. All rights reserved.
      </p>
    </footer>
  );
}
