import { ApiResponse, SchoolDetail } from '@/types';
import { createHttpClient } from './axios';

// 建立專用於 fatraceschool 的 API 實例
const fatraceschoolApi = createHttpClient(import.meta.env.VITE_API_BASE_URL);

/**
 * 根據學校ID取得學校詳細資料
 * @param schoolId 學校ID
 * @returns Promise<ApiResponse<SchoolDetail>>
 */
export const GetSchoolById = (schoolId?: number | string): Promise<ApiResponse<SchoolDetail>> => {
    return fatraceschoolApi.get<ApiResponse<SchoolDetail>>(`/school/${schoolId}`);
};
