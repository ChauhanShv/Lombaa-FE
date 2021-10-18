import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { BACKEND_HOST, BACKEND_PORT, REFRESH_TOKEN_RETRY } from '../config';

let refreshTokenRetry = REFRESH_TOKEN_RETRY; 
const refreshAccessToken = (): string => {
    // Call refresh token service store in local storage
    refreshTokenRetry = REFRESH_TOKEN_RETRY;
    return 'newToken';
};

axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`
            };
        }
        return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if (error.response.status === 401 && refreshTokenRetry > 0) {
            refreshTokenRetry--;
            localStorage.setItem("token", await refreshAccessToken());
            return axios(config);
        }
        return Promise.reject(error);
    }
);

export const useAxios = makeUseAxios({
    axios: axios.create({ baseURL: `${BACKEND_HOST}:${BACKEND_PORT}` }),
});

export type { Method } from 'axios';