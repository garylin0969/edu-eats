import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 建立 axios 實例
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 請求攔截器
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在發送請求之前做些什麼
        console.log('🚀 發送請求:', config.method?.toUpperCase(), config.url);

        // 從 localStorage 獲取 token 並添加到請求頭
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        // 對請求錯誤做些什麼
        console.error('❌ 請求錯誤:', error);
        return Promise.reject(error);
    }
);

// 響應攔截器
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // 對響應數據做些什麼
        console.log('✅ 響應成功:', response.status, response.config.url);
        return response;
    },
    (error: AxiosError) => {
        // 對響應錯誤做些什麼
        console.error('❌ 響應錯誤:', error.response?.status, error.response?.data);

        // 處理不同的錯誤狀態碼
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 未授權，清除 token 並重定向到登入頁面
                    localStorage.removeItem('auth_token');
                    // 可以在這裡添加重定向邏輯
                    console.warn('⚠️ 未授權，請重新登入');
                    break;
                case 403:
                    console.warn('⚠️ 權限不足');
                    break;
                case 404:
                    console.warn('⚠️ 請求的資源不存在');
                    break;
                case 500:
                    console.error('💥 服務器內部錯誤');
                    break;
                default:
                    console.error('💥 未知錯誤');
            }
        } else if (error.request) {
            // 請求已發出但沒有收到響應
            console.error('🌐 網絡錯誤，請檢查網絡連接');
        } else {
            // 設置請求時發生錯誤
            console.error('⚙️ 請求配置錯誤:', error.message);
        }

        return Promise.reject(error);
    }
);

// 導出 axios 實例
export default api;

// 導出常用的 HTTP 方法
export const http = {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
        api.get<T>(url, config).then((response) => response.data),

    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        api.post<T>(url, data, config).then((response) => response.data),

    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        api.put<T>(url, data, config).then((response) => response.data),

    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        api.patch<T>(url, data, config).then((response) => response.data),

    delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
        api.delete<T>(url, config).then((response) => response.data),
};

// 導出類型
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };
