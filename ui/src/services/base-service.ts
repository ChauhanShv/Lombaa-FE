import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { BACKEND_HOST, BACKEND_PORT, REFRESH_TOKEN_RETRY } from '../config';

let refreshTokenRetry = REFRESH_TOKEN_RETRY; 
const refreshAccessToken = (): string => {
    // Call refresh token service store in local storage
    refreshTokenRetry = REFRESH_TOKEN_RETRY;
    return 'newToken';
};

const newAxios = axios.create({
    baseURL: `${BACKEND_HOST}:${BACKEND_PORT}/api`,
    headers: {
        'x-client-platform': 'Web'
    },
});

newAxios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = {
                ...config.headers,
                'x-access-token': token,
                'x-client-platform': 'Web',
            };
        }
        return config;
  },
  (error) => Promise.reject(error)
);

newAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if (error?.response?.status === 401 && refreshTokenRetry > 0) {
            // refreshTokenRetry--;
            // localStorage.setItem("token", await refreshAccessToken());
            // return axios(config);
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const token = localStorage.getItem("token");
export const useAxios = makeUseAxios({
    axios: newAxios,
    defaultOptions: {
        manual: true,
    }
});

export type { Method } from 'axios';