import axios from 'axios'
import { HEADER_CONFIG } from './headers.config'

// Config default api
export const BASE_URL = "http://localhost:3001"
export const TIMEOUT = 10000

export const defaultApi = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
})
// handle defaultApi response data
defaultApi.interceptors.response.use((defaultApi) => (defaultApi.data))

//Config private api
export const privateApi = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
})
// handle privateApi response data
privateApi.interceptors.response.use((privateApi) => (privateApi.data))

export const ENDPOINT = {
    v1: {
        login: '/v1/api/login',
        register: '/v1/api/register',
        logout: '/v1/api/logout',
        refreshToken: '/v1/api/refreshToken',
    }
}
