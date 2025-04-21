import { routerConfig } from "@/configs/router.config"
import { useAuth } from "@/hooks/useAuth"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

export default function UnauthorizationLogin() {
    const {isLoggedIn} = useAuth()
    const location = useLocation()
    return (
        <>
            {!isLoggedIn ? <Outlet/> : <Navigate to={routerConfig.homePage} replace state={{from: location.pathname}}></Navigate>}
        </>
    )
}
