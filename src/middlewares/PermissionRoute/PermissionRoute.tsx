import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface PermissionRouteProps {
  allowedRoles: string[]
  redirectPath?: string
}

export default function PermissionRoute({ allowedRoles, redirectPath = "/404" }: PermissionRouteProps) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role)) return <Navigate to={redirectPath} replace />

  return <Outlet />
}
