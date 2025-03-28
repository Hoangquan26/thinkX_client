import HeaderConstant from "@/common/constants/headerConstant";
import { StatusCodes } from "@/common/statusCodes/httpStatusCode";
import { defaultApi, privateApi } from "@/configs/api.config";
import { toast } from 'react-toastify';
import { store } from "@/store/store";
import { setAuth, clearState } from "@/store/features/auth/auth.slice";
import AuthService from "@/services/auth.service";
import { ErrorToast } from "@/utils/toastify.util";

defaultApi.interceptors.request.use((configs) => {
    const state = store.getState();
    const token = state.auth.authentication;
    if (token) {
        configs.headers[HeaderConstant.AUTHORIZATION] = `Bearer ${token}`;
    }
    return configs;
});

defaultApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === StatusCodes.GONE && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await AuthService.refreshToken();
                originalRequest.headers[HeaderConstant.AUTHORIZATION] = `Bearer ${newToken}`;
                return defaultApi(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearState());
                const message = "Session expired! Please login again"
                ErrorToast(message)
            }
        } else if (error.response.status > 299) {
            const message = error.response.data?.message ?? error.response.statusText;
            console.log(message)
            ErrorToast(message)
        }
        return Promise.reject(error);
    }
);

export {
    defaultApi,
    privateApi
};