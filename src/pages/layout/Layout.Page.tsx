import React from 'react'
import { Outlet } from 'react-router'
import Header from '@/components/headers/Header'
import Footer from '@/components/Footer/Footer'
import Copyright from '@/components/Copyright/Copyright'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSideBar/AppSideBar'

export default function LayoutPage() {
  return (
    <>
      <SidebarProvider className='flex flex-col'>
          <AppSidebar/>
          <>
            <Header/>
            <Outlet/>
            <Footer/>
            <Copyright/>
          </>
        
      </SidebarProvider>
       
    </>
  )
}
