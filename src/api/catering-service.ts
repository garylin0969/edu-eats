import { GetCateringServiceParams } from '@/types';
import { createHttpClient } from './axios';

// 創建專用的 Express Service API
const CateringServiceApi = createHttpClient(import.meta.env.VITE_EXPRESS_API_BASE_URL);

const GetCateringService = (params: GetCateringServiceParams) => {
    return CateringServiceApi.get('/api/cateringservice/rest/API', { params });
};

export default GetCateringService;
