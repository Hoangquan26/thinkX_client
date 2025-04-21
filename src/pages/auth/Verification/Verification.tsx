import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { routerConfig } from "@/configs/router.config";
import AuthService from "@/services/auth.service";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";

export default function Verification() {
    const [searchParams] = useSearchParams();
    const {email, token} = Object.fromEntries([...searchParams]);

    useEffect(() => {
        if(email && token) {
            AuthService.verifyAccount({email, token})
            .then((_) => setTimeout(() => {
                setVerified(true)
            }, 1000))
        }
    }, [email, token])

    const [verified, setVerified] = useState(false);
    if(!email || !token) {
        return <Navigate to={'/404'}/>
    }
    if(!verified) return <LoadingSpinner fullScreen={true} caption="Verifying your account"/>
    return (
        <Navigate to={routerConfig.getLoginVerified(email)}/>
    )
}
