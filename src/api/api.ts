import { defaultApi } from "@/configs/api.config";
import { privateApi } from "@/configs/api.config";
import toast from 'react-toastify'

defaultApi.interceptors.request.use((configs) => {
    
    return configs
})

defaultApi.interceptors.response.use((response) => {
    if(response.status > 299) {
        if(response.status != 410) {
            const message = response.data?.error?.message ?? response.statusText
        }
    }
    return response
})