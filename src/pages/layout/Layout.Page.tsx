import React from 'react'
import { Outlet } from 'react-router'
import Header from '@components/headers/Header'
import Footer from '@components/Footer/Footer'

export default function LayoutPage() {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>

  )
}
