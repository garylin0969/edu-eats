import {
    ApiResponse,
    Restaurant,
    CanteenMeal,
    CanteenParams,
    MealParams,
    OfferingService,
    OfferingServiceParams,
} from '@/types';
import { createHttpClient } from './axios';

// 建立專用於 fatraceschool 的 API 實例
const fatraceschoolApi = createHttpClient(import.meta.env.VITE_API_BASE_URL);

/**
 * 搜尋學校餐廳資料
 * @param params 搜尋參數 (SchoolId 必填, SFStreetId 和 period 可選)
 * @returns Promise<ApiResponse<Restaurant[]>>
 */
export const GetCanteen = (params: CanteenParams): Promise<ApiResponse<Restaurant[]>> => {
    return fatraceschoolApi.get<ApiResponse<Restaurant[]>>('/canteen', { params });
};

/**
 * 查詢餐廳菜單
 * @param params 查詢參數 (SchoolId, RestaurantId, period 皆必填)
 * @returns Promise<ApiResponse<CanteenMeal[]>>
 */
export const GetCanteenMeal = (params: MealParams): Promise<ApiResponse<CanteenMeal[]>> => {
    return fatraceschoolApi.get<ApiResponse<CanteenMeal[]>>('/canteen/meal', { params });
};

/**
 * 查詢學校提供的服務類型
 * @param params 查詢參數 (SchoolId, period 皆必填)
 * @returns Promise<ApiResponse<OfferingService[]>>
 */
export const GetOfferingService = (params: OfferingServiceParams): Promise<ApiResponse<OfferingService[]>> => {
    return fatraceschoolApi.get<ApiResponse<OfferingService[]>>('/offering/service', { params });
};
