import React from 'react'
import { Outlet } from 'react-router'
import Header from '@components/headers/Header'

export default function LayoutPage() {
  return (
    <>
        <Header/>
        <Outlet/>
    </>

  )
}
