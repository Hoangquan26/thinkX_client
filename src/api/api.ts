import HeaderConstant from "@/common/constants/headerConstant";
import { StatusCodes } from "@/common/statusCodes/httpStatusCode";
import { defaultApi, privateApi } from "@/configs/api.config";
import { toast } from 'react-toastify';
import { store } from "@/store/store";
import { setAuth, clearState } from "@/store/features/auth/auth.slice";
import AuthService from "@/services/auth.service";

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
        if (error.response.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await AuthService.refreshToken();
                originalRequest.headers[HeaderConstant.AUTHORIZATION] = `Bearer ${newToken}`;
                return defaultApi(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearState());
                toast("Session expired. Please log in again.", {
                    autoClose: 3000,
                    theme: "dark"
                });
            }
        } else if (error.response.status > 299) {
            const message = error.response.data?.error?.message ?? error.response.statusText;
            toast(message, {
                autoClose: 3000,
                theme: "dark"
            });
        }
        return Promise.reject(error);
    }
);

export {
    defaultApi,
    privateApi
};