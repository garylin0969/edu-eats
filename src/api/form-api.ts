import { ApiResponse, County, Area, School, SchoolParams } from '@/types';
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
export const GetArea = (CountyId: string): Promise<ApiResponse<Area[]>> => {
    const params = { CountyId };
    return http.get<ApiResponse<Area[]>>('/area', { params });
};

/**
 * 搜尋學校資料
 * @param searchParams 搜尋參數 (CountyId, AreaId, SchoolType, SchoolName)
 * @returns Promise<ApiResponse<School[]>>
 */
export const GetSchool = (params: SchoolParams): Promise<ApiResponse<School[]>> => {
    return http.get<ApiResponse<School[]>>('/school', { params });
};
