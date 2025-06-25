import { ApiResponse, County, Area, School, SchoolParams } from '@/types';
import { createHttpClient } from './axios';

// 建立專用於 fatraceschool 的 API 實例
const fatraceschoolApi = createHttpClient(import.meta.env.VITE_API_BASE_URL);

/**
 * 獲取縣市列表
 * @returns Promise<ApiResponse<County[]>>
 */
export const GetCounty = (): Promise<ApiResponse<County[]>> => {
    return fatraceschoolApi.get<ApiResponse<County[]>>('/county');
};

/**
 * 獲取區域列表
 * @param CountyId 縣市ID
 * @returns Promise<ApiResponse<Area[]>>
 */
export const GetArea = (CountyId: string): Promise<ApiResponse<Area[]>> => {
    const params = { CountyId };
    return fatraceschoolApi.get<ApiResponse<Area[]>>('/area', { params });
};

/**
 * 搜尋學校資料
 * @param searchParams 搜尋參數 (CountyId, AreaId, SchoolType, SchoolName)
 * @returns Promise<ApiResponse<School[]>>
 */
export const GetSchool = (params: SchoolParams): Promise<ApiResponse<School[]>> => {
    return fatraceschoolApi.get<ApiResponse<School[]>>('/school', { params });
};
