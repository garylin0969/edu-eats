import { ApiResponse, County, Area } from '@/types';
import { http } from './axios';

/**
 * 獲取縣市列表
 * @returns Promise<ApiResponse<County[]>>
 */
export const GetCounty = (): Promise<ApiResponse<County[]>> => {
    return http.get<ApiResponse<County[]>>('/county');
};

/**
 * 獲取區域列表
 * @param CountyId 縣市ID
 * @returns Promise<ApiResponse<Area[]>>
 */
export const GetArea = (CountyId: number): Promise<ApiResponse<Area[]>> => {
    const params = { CountyId };
    return http.get<ApiResponse<Area[]>>('/area', { params });
};
