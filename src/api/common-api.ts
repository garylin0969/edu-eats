import { ApiResponse, SchoolDetail } from '@/types';
import { http } from './axios';

/**
 * 根據學校ID取得學校詳細資料
 * @param schoolId 學校ID
 * @returns Promise<ApiResponse<SchoolDetail>>
 */
export const GetSchoolById = (schoolId?: number | string): Promise<ApiResponse<SchoolDetail>> => {
    return http.get<ApiResponse<SchoolDetail>>(`/school/${schoolId}`);
};
