import { ApiResponse, Restaurant, RestaurantMeal, CanteenParams, MealParams } from '@/types';
import { http } from './axios';

/**
 * 搜尋學校餐廳資料
 * @param params 搜尋參數 (SchoolId 必填, SFStreetId 和 period 可選)
 * @returns Promise<ApiResponse<Restaurant[]>>
 */
export const GetCanteen = (params: CanteenParams): Promise<ApiResponse<Restaurant[]>> => {
    return http.get<ApiResponse<Restaurant[]>>('/canteen', { params });
};

/**
 * 查詢餐廳菜單
 * @param params 查詢參數 (SchoolId, RestaurantId, period 皆必填)
 * @returns Promise<ApiResponse<RestaurantMeal[]>>
 */
export const GetCanteenMeal = (params: MealParams): Promise<ApiResponse<RestaurantMeal[]>> => {
    return http.get<ApiResponse<RestaurantMeal[]>>('/canteen/meal', { params });
};
