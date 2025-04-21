import useRefreshToken from "@/hooks/useRefreshToken";
import { selectAuthentication } from "@/store/features/auth/auth.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch } from "@/store/store";

export default function PersistantLogin() {
    const accessToken = useSelector(selectAuthentication);
    const dispatch = useDispatch<AppDispatch>();
    const {refresh} = useRefreshToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const verifyUser = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (!accessToken) {
            verifyUser();
        } else {
            setLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [accessToken, refresh]);

    return (
        <>
            {loading ? 'Loading...' : <Outlet />}
        </>
    );
}
