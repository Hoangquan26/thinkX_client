// src/layouts/instructor/InstructorLayout.tsx
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Sidebar from "@/components/Instructor/Sidebar"
import Header from "@/components/Instructor/Header"
import { useAuth } from "@/hooks/useAuth"

export default function InstructorLayout() {
  const {user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== 'instructor') {
      navigate("/404") 
    }
  }, [user])

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <main className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
