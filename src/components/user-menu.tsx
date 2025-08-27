// import { UserPenIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  name?: string;
  phone?: string;
}

export default function UserMenu({ name, phone }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 m-0.5 cursor-pointer hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full transition"
        >
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback className="bg-indigo-700 text-white font-semibold text-sm uppercase">
              {name ? name.split(" ")[0].slice(0, 2).toUpperCase() : "ME"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name ?? ""}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {phone ?? ""}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
