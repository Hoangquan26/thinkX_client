import { BASE_URL, TIMEOUT } from "@/configs/api.config";
import AuthService from "@/services/auth.service";
import { logout, setAccessToken } from "@/store/features/auth/auth.slice"; 
import { RootState } from "@/store/store";
import { Store } from "@reduxjs/toolkit";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { toast } from "sonner";


const defaultApi = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
})

const privateApi = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    timeout: TIMEOUT
})

let isRefreshing = false;

let axiosReduxStore: Store<RootState, any>;

export const injectStore = (mainStore: Store<RootState>) => {
  axiosReduxStore = mainStore;
};

defaultApi.interceptors.request.use(
  (config) => {
    const token = axiosReduxStore.getState().auth.accessToken;
    if (token) {
      config.headers["x-authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshTokenPromise : Promise<AxiosResponse> | null = null
defaultApi.interceptors.response.use(res => res.data, 
  async (error) => {
    const original = error.config;
    if (error.response?.data?.statusCode === HttpStatusCode.Unauthorized) {
      axiosReduxStore.dispatch(logout());
    }
    if (error.response?.data?.statusCode === HttpStatusCode.Gone && !original._retry) {
      original._retry = true;
      if(!refreshTokenPromise) {
        console.log('---get Token')
        refreshTokenPromise = AuthService.refreshToken().then((res) => {
          if (res) {
            const resData = res.data.metadata.tokens.accessToken
            console.log('---have Token')

            console.log(resData)
            axiosReduxStore.dispatch(setAccessToken(resData))
            return resData
          }
          return res;
        })
        .catch((err) => {
          console.log(err)
          axiosReduxStore.dispatch(logout());
        })
        .finally(() => {
          refreshTokenPromise = null;
        })
      }
    }

    const message =
    error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại.";
    toast.error(message);

    console.log(message)
    return Promise.reject(error);
  }
)

privateApi.interceptors.request.use(
  (config) => {
    const token = axiosReduxStore.getState().auth.accessToken;
    if (token) {
      config.headers["x-authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


privateApi.interceptors.response.use(res => res.data,
  async (error) => {
    const message =
    error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại.";
    toast.error(message);
    console.log(message)
  }
)

export{
    privateApi,
    defaultApi
}