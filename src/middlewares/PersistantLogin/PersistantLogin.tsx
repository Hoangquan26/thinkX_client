import useRefreshToken from "@/hooks/useRefreshToken";
import { selectAuthentication } from "@/store/features/auth/auth.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";

export default function PersistantLogin() {
    const accessToken = useSelector(selectAuthentication)
    const dispatch = useDispatch()
    const refresh = useRefreshToken()                                                                       
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let isMounted = true
        const verifyUser = async() => {
            try {
                const verifyUser = await refresh()
            }
            catch (err){
                console.log(err)
            }
            finally {
                isMounted && setLoading(false)
            }               
        }
        !accessToken ? verifyUser () : setLoading(false)
        return () => isMounted = false
    }, [])
    return (
        <>
            {
                loading ? 'Loading...' : <Outlet/>
            }
        </>
    )
}
