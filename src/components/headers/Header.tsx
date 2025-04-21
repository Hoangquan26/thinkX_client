'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Bell,
  Heart,
  Menu,
  ShoppingCart
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/features/auth/auth.slice'
import { useAuth } from '@/hooks/useAuth'
import { AppDispatch } from '@/store/store'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { routerConfig } from '@/configs/router.config'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export default function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleLogout = () => {
    toast.promise(dispatch(logout()), {
      loading: 'Logging out...',
      success: () => {
        navigate(routerConfig.login)
        return 'Logout successful'
      }
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50 relative">
      {/* Logo */}
      <Link to={routerConfig.homePage} className="text-2xl font-bold text-red-600 no-underline">
        ThinkX
      </Link>

      {/* Search */}
      <div className="flex-grow max-w-xl mx-6 hidden md:block">
        <Input
          type="text"
          placeholder="Find some course..."
          className="rounded-full px-5 py-6 border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <span className="hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all cursor-pointer"
            onClick={() => navigate(routerConfig.course)}
          >
            Browse
          </span>
          <span className="hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all cursor-pointer">
            Udemy Business
          </span>
          <Link
            to={routerConfig.authenticate.user.instructorRequest}
            className="hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all cursor-pointer no-underline"
          >
            Teaching on ThinkX
          </Link>
          <Link
            to={routerConfig.authenticate.user.myEnrollments}
            className="hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all cursor-pointer no-underline"
          >
            Learning
          </Link>
        </div>

        <Heart className="w-8 h-8 cursor-pointer hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all" />
        <ShoppingCart className="w-8 h-8 cursor-pointer hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all" />
        <Bell className="w-8 h-8 cursor-pointer hover:text-white hover:bg-red-600 p-2 rounded-sm transition-all" />

        {/* User menu */}
        {user ? (
          !isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 p-0 overflow-hidden">
                <div className="px-4 py-3 bg-gray-100">
                  <p className="text-sm font-medium">{user?.createdAt}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate(routerConfig.authenticate.user.myEnrollments)}>
                  Learning
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(routerConfig.authenticate.user.carts)}>
                  My Cart
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(routerConfig.instructor)}>
                  Teach on ThinkX
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-100 hover:text-red-700 font-semibold"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null
        ) : (
          <div className={`flex items-center gap-2 ${isMobile ? 'hidden' : ''}`}>
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:text-red-600 cursor-pointer hover:bg-red-100"
              onClick={() => navigate(routerConfig.login)}
            >
              Log in
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              onClick={() => navigate(routerConfig.register)}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Menu className="w-6 h-6 cursor-pointer hover:text-red-600" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <h2 className="text-lg font-semibold text-red-600 mb-4">ThinkX</h2>
            <div className="flex flex-col text-sm text-gray-800 grow justify-between">
              <div className="flex flex-col gap-3">
                <MenuItem label="Browse" onClick={() => { navigate(routerConfig.course); setOpen(false); }} />
                <MenuItem label="Udemy Business" />
                <MenuItem label="Teaching on ThinkX" onClick={() => { navigate(routerConfig.instructor); setOpen(false); }} />
                <MenuItem label="Learning" onClick={() => { navigate(routerConfig.authenticate.user.myEnrollments); setOpen(false); }} />
                <MenuItem label="Logout" onClick={() => { handleLogout(); setOpen(false); }} />
              </div>
              <div className='flex items-center justify-between'>
                <div className="relative cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                </div>
                <span className='text-sm'>
                  {user?.email}
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function MenuItem({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      className="hover:text-white hover:bg-red-600 px-3 py-2 rounded-md transition-all cursor-pointer"
    >
      {label}
    </span>
  )
}
