import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <header className="w-full px-4 py-3 border-b bg-white flex items-center justify-between shadow-sm">
      <div className="text-lg font-semibold text-gray-800">Dashboard</div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-3 py-1.5">
            <Avatar className="h-8 w-8">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={user.username} />
              ) : (
                <AvatarFallback className="uppercase">
                  {user?.username?.[0] ?? "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm font-medium hidden sm:inline">{user?.username}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
