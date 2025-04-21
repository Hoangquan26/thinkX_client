import { routerConfig } from "@/configs/router.config"
import { useAuth } from "@/hooks/useAuth"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

export default function ProtectedRoute() {
    const {isLoggedIn} = useAuth()
    const location = useLocation()
    return (
        <>
            {isLoggedIn ? <Outlet/> : <Navigate to={routerConfig.login} replace state={{from: location.pathname}}></Navigate>}
        </>
    )
}
