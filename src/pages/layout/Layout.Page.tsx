import React from 'react'
import { Outlet } from 'react-router'
import Header from '@/components/headers/Header'
import Footer from '@/components/Footer/Footer'
import Copyright from '@/components/Copyright/Copyright'

export default function LayoutPage() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
      <Copyright/>
    </>
  )
}
