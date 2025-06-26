import { CateringServiceParams } from '@/types';
import { createHttpClient } from './axios';

// 創建專用的 Express Service API
const CateringServiceApi = createHttpClient(import.meta.env.VITE_EXPRESS_API_BASE_URL);

export const GetCateringService = (params: CateringServiceParams) => {
    return CateringServiceApi.get('/api/cateringservice/rest/API', { params });
};
