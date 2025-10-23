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
import { motion } from "framer-motion";

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
          className="relative rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
          aria-label="Open info menu"
        >
          <InfoIcon className="text-primary" size={18} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="p-0"
        sideOffset={12}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-w-[200px] bg-background border border-border shadow-lg rounded-xl overflow-hidden dark:bg-gray-900 dark:border-gray-700"
        >
          <DropdownMenuLabel className="text-sm text-muted-foreground px-4 py-2">
            Need help?
          </DropdownMenuLabel>

          <DropdownMenuItem
            asChild
            className="px-4 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors flex items-center gap-2"
          >
            <Link to="/faq">
              <BookIcon size={18} className="opacity-70" />
              FAQ
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="px-4 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors flex items-center gap-2"
          >
            <Link to="/contact">
              <LifeBuoyIcon size={18} className="opacity-70" />
              Support
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="px-4 py-2 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleRestartTour();
              }}
            >
              <RotateCcwIcon size={18} className="opacity-70" />
              Restart Tour
            </Link>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
