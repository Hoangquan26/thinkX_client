import { API_ENDPOINT, privateApi } from "@/configs/api.config"
import { useDispatch, useSelector } from "react-redux"

export default async function useRefreshToken() {
    const dispatch = useDispatch()
    const refreshToken = async() => {
        const response = await privateApi.post(API_ENDPOINT.auth.refreshToken)
        // const accessToken = response.metadata.tokens.accessToken
        // const user = response.metadata.user
        // dispatch(setAuth({
        //     user
        // }))
        // return accessToken
        return response
    }
    return refreshToken
}
