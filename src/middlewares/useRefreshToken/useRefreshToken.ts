import AuthService from "@/services/auth.service"

export default function useRefreshToken() {
    const refresh = async() => {
        return await AuthService.refreshToken()
    }

    return {refresh}
}