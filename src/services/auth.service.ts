import {defaultApi} from '@/api/api'
import {privateApi} from '@/api/api'
import { BASE_URL, ENDPOINT } from '@/configs/api.config'
import ISuccessResponse from '@/interfaces/ISuccessResponse'

//initial dto
type loginDTO = {email: String, password: String}
type registerDTO = {email: String, password: String}

const AuthService = {
    //initial service
    login: async({email, password}: loginDTO): Promise<ISuccessResponse> => {
        return await privateApi.post(BASE_URL + ENDPOINT.v1.login, {email, password})
    },

    register: async({email, password}: registerDTO): Promise<ISuccessResponse> => {
        return await defaultApi.post(BASE_URL + ENDPOINT.v1.register, {email, password})
    },
    
    logout: async() => {
        return await privateApi.delete(BASE_URL + ENDPOINT.v1.logout)
    },

    refreshToken: async() => {
        const res = await privateApi.post(BASE_URL + ENDPOINT.v1.refreshToken)
        return res
    },

    verifyAccount: async(data : {email: string, token: string}) => {
        return await defaultApi.put(BASE_URL + ENDPOINT.v1.verifyAccount, data)
    }
}

export default AuthService