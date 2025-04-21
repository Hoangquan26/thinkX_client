import { usePermission } from "@/hooks/usePermission"
import { ReactNode } from "react"

interface Props {
  allowedRoles: string[]
  children: ReactNode
  fallback?: ReactNode
}

export default function PermissionGate({ allowedRoles, children, fallback = null }: Props) {
  const hasAccess = usePermission(allowedRoles)

  return <>{hasAccess ? children : fallback}</>
}
