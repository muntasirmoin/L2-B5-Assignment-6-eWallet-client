import { BookIcon, InfoIcon, LifeBuoyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";

export default function InfoMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <InfoIcon
            className="text-muted-foreground"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Need help?</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link to="/faq" className="flex items-center gap-2">
            <BookIcon size={16} className="opacity-60" aria-hidden="true" />
            FAQ
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link to="/contact" className="flex items-center gap-2">
            <LifeBuoyIcon size={16} className="opacity-60" aria-hidden="true" />
            Support
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
