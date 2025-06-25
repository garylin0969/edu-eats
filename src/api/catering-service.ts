import { createHttpClient } from './axios';

interface PostCateringServiceBody {
    method: string;
    args: {
        schoolId: number;
        schoolCode: string;
        schoolName: string;
    };
}

// 創建專用的 Express Service API
const CateringServiceApi = createHttpClient(import.meta.env.VITE_EXPRESS_API_BASE_URL);

const PostCateringService = (body: PostCateringServiceBody) => {
    return CateringServiceApi.post('/api/cateringservice/rest/API', body);
};

export default PostCateringService;
