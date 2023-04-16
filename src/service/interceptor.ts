import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from 'element-plus';
import { getToken } from '@/hooks/useToken';


interface RequestConfig extends AxiosRequestConfig {
  headers: any;
}

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use((config: RequestConfig) => {
    const token = config.headers.Authorization || getToken()
    if(token) {
        config.headers = {
            "Authorization": token,
        }
    }
    return config
});

axios.interceptors.response.use((response: AxiosResponse) => {
    return response.data
}, (error) => {
    ElMessage.error(error.response.data.error.message || 'Request Error')
    return Promise.reject(error)
})