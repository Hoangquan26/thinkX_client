import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { selectAuth } from "@/store/features/auth/auth.slice"
import { useSelector } from "react-redux"
import { sidebarConstant } from "./constants/sidebarConstants"
import { Link } from "react-router"

import styles from './styles.module.scss'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronUp, User2 } from "lucide-react"

  export function AppSidebar() {
    const { container } = styles

    
    const authUser = useSelector(selectAuth)
    const isLoged = authUser.authentication
    return (
      <Sidebar className={container} side="right" variant="sidebar">
        <SidebarContent>
        </SidebarContent>
        <SidebarFooter >
          {
            !isLoged ? 
            <>
              <SidebarMenu>
                <SidebarMenuItem >
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <User2 /> <span className=" text-base">Please login to use our service</span> 
                        <ChevronUp className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      className="w-[22rem] pt-2 pb-2 "
                    >
                      <DropdownMenuItem className=" w-full">
                        <Link className="text-base flex w-full items-center gap-2 no-underline" to={sidebarConstant.footer.loginMenu.url}>
                         {sidebarConstant.footer.loginMenu.icon} {sidebarConstant.footer.loginMenu.content.eng} 
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="text-base flex w-full items-center gap-2 no-underline" to={sidebarConstant.footer.registerMenu.url}>
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
  