import { useDispatch } from "react-redux"
import { logout } from "@/store/features/auth/auth.slice"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { AppDispatch } from "@/store/store"
import { Home, LogOut, User } from "lucide-react"
import { routerConfig } from "@/configs/router.config"

export default function Header() {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(routerConfig.login)
  }

  return (
    <header className="w-full px-6 py-4 bg-white shadow-sm border-b flex justify-between items-center">
      {/* Left side: Brand name */}
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-gray-800"><span className=" text-red-500">ThinkX</span> -Teaching manager</h1>
      </div>

      {/* Right side: User avatar + dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user?.avatarUrl || ""} />
            <AvatarFallback>{user?.username?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium text-gray-800">{user?.username}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => navigate(routerConfig.homePage)}>
            <Home className="w-4 h-4 mr-2" /> Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(routerConfig.authenticate.user.userProfile)}>
            <User className="w-4 h-4 mr-2" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
