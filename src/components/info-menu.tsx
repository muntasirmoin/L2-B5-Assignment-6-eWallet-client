import { BookIcon, InfoIcon, LifeBuoyIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function InfoMenu() {
  const handleRestartTour = () => {
    localStorage.removeItem("hasSeenAppTour");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild id="tour-info-dropdown-button">
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

        <DropdownMenuItem>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleRestartTour();
            }}
            className="w-full flex items-center gap-2"
          >
            <RotateCcwIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            Restart Tour
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
