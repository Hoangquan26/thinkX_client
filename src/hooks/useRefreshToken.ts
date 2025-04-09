import { API_ENDPOINT } from "@/common/constants/api.constant"
import { privateApi } from "@/configs/api.config"

export default function useRefreshToken() {
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
