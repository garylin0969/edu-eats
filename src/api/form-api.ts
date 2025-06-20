import { ApiResponse, County } from '@/types';
import { http } from './axios';

/**
 * 獲取縣市列表
 * @returns Promise<ApiResponse<County[]>>
 */
export const GetCounty = (): Promise<ApiResponse<County[]>> => {
    return http.get<ApiResponse<County[]>>('/county');
};
