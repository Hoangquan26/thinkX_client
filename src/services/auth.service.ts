import {defaultApi} from '@/api/api'
import {privateApi} from '@/api/api'
import { BASE_URL, ENDPOINT } from '@/configs/api.config'
import ISuccessResponse from '@/interfaces/ISuccessResponse'

//initial dto
type loginDTO = {email: String, password: String}
type registerDTO = {email: String, password: String}

const AuthService  = {

    //initial service
    login: async({email, password}: loginDTO): Promise<ISuccessResponse> => {
        return await defaultApi.post(BASE_URL + ENDPOINT.v1.login, {email, password})
    },

    register: async({email, password}: registerDTO): Promise<ISuccessResponse> => {
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