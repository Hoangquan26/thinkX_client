import {defaultApi} from '@/api/api'
import {privateApi} from '@/api/api'
import { BASE_URL, ENDPOINT } from '@/configs/api.config'

const AuthService  = {
    login: async({email, password}: {email: String, password: String}) => {
        return await defaultApi.post(BASE_URL + ENDPOINT.v1.login, {email, password})
    },

    register: async({email, password}: {email: String, password: String}) => {
        return await defaultApi.post(BASE_URL + ENDPOINT.v1.register, {email, password})
    },
    
    logout: async() => {
        return await defaultApi.delete(BASE_URL + ENDPOINT.v1.register)
    },

    refreshToken: async() => {
        return await privateApi.post(BASE_URL + ENDPOINT.v1.refreshToken)
    }
}

export default AuthService