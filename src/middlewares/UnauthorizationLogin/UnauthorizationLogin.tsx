import { routerConfig } from "@/configs/router.config"
import { selectAuthentication } from "@/store/features/auth/auth.slice"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

export default function UnauthorizationLogin() {
    const authUser = useSelector(selectAuthentication)
    const location = useLocation()
    return (
        <>
            {!authUser ? <Outlet/> : <Navigate to={routerConfig.homePage} replace state={{from: location.pathname}}></Navigate>}
        </>
    )
}
