
import { useAuth } from "@/hooks/useAuth"

export const usePermission = (allowedRoles: string[]) => {
    const {user} = useAuth()
    const role = user?.role
    return role && allowedRoles.includes(role)
}
