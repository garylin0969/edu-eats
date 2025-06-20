import { http } from './axios';

// 通用 API 響應類型
interface ApiResponse<T> {
    result: number;
    message?: string;
    data: T;
}

// 縣市數據類型
interface County {
    CountyId: number | null;
    County: string | null;
    Code: string | null;
}

// 縣市選項類型
export interface CountyOption {
    label: string;
    value: string;
}

/**
 * 獲取縣市列表
 * @returns Promise<ApiResponse<County[]>>
 */
export const GetCounty = (): Promise<ApiResponse<County[]>> => {
    return http.get<ApiResponse<County[]>>('/county');
};
