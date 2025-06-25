import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 工廠函數：創建自定義 baseURL 的 http 實例
export const createHttpClient = (baseURL: string, customConfig?: Partial<AxiosRequestConfig>) => {
    const customApi: AxiosInstance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
        ...customConfig,
    });

    // 添加與主要 API 相同的攔截器
    customApi.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            console.log('🚀 發送請求:', config.method?.toUpperCase(), config.url);

            const token = localStorage.getItem('auth_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error: AxiosError) => {
            console.error('❌ 請求錯誤:', error);
            return Promise.reject(error);
        }
    );

    customApi.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log('✅ 響應成功:', response.status, response.config.url);
            return response;
        },
        (error: AxiosError) => {
            console.error('❌ 響應錯誤:', error.response?.status, error.response?.data);

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        localStorage.removeItem('auth_token');
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
                console.error('🌐 網絡錯誤，請檢查網絡連接');
            } else {
                console.error('⚙️ 請求配置錯誤:', error.message);
            }

            return Promise.reject(error);
        }
    );

    // 返回包裝後的 HTTP 方法
    return {
        get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
            customApi.get<T>(url, config).then((response) => response.data),

        post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
            customApi.post<T>(url, data, config).then((response) => response.data),

        put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
            customApi.put<T>(url, data, config).then((response) => response.data),

        patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
            customApi.patch<T>(url, data, config).then((response) => response.data),

        delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
            customApi.delete<T>(url, config).then((response) => response.data),
    };
};

// 導出類型
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };
