import { CateringServiceParams } from '@/types';
import type { ApiResponse } from '@/types';
import { createHttpClient } from './axios';

export interface CateringService {
    enable: string;
    logo: string;
    schoolId: string;
    schoolName: string;
    sfStreetId: string;
    storeCode: string;
    storeId: string;
    storeName: string;
    storeParentCode: string;
    storeParentName: string;
    storeTypeCode: string;
    storeTypeName: string;
}

// 創建專用的 Express Service API
const CateringServiceApi = createHttpClient(import.meta.env.VITE_EXPRESS_API_BASE_URL);

export const GetCateringService = (params: CateringServiceParams) => {
    return CateringServiceApi.get<ApiResponse<CateringService[]>>('/api/cateringservice/rest/API', { params });
};
