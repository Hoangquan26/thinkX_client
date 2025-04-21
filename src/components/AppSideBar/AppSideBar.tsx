import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import { sidebarConstant } from "./constants/sidebarConstants"
import { Link } from "react-router"

import styles from './styles.module.scss'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronUp, User2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

  export function AppSidebar() {
    const { container } = styles

    
    const { isLoggedIn } = useAuth()
    return (
    <Sidebar className={container} side="right" variant="sidebar">
        <SidebarHeader>
          <div className=" flex items-center gap-4">
            <SidebarTrigger></SidebarTrigger>
          </div>
        </SidebarHeader>
        <SidebarContent>
        </SidebarContent>
        <SidebarFooter >
          {
            !isLoggedIn ? 
            <>
              <SidebarMenu>
                <SidebarMenuItem >
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <User2 /> <span>Please login to use our service</span> 
                        <ChevronUp className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      className="w-[16rem] pt-2 pb-2"
                    >
                      <DropdownMenuItem className=" w-full">
                        <Link className=" flex w-full items-center gap-2 no-underline" to={sidebarConstant.footer.loginMenu.url}>
                         {sidebarConstant.footer.loginMenu.icon} {sidebarConstant.footer.loginMenu.content.eng} 
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className=" flex w-full items-center gap-2 no-underline" to={sidebarConstant.footer.registerMenu.url}>
                          {sidebarConstant.footer.registerMenu.icon} {sidebarConstant.footer.registerMenu.content.eng} 
                        </Link>
                      </DropdownMenuItem>
                     
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </>
            :
            <SidebarMenu>User</SidebarMenu>
          }
        </SidebarFooter>
      </Sidebar>
    )
  }
  