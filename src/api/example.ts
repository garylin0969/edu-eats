import { http } from './axios';

// 定義 API 響應的通用類型
export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// 定義用戶相關的類型
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

// 定義登入請求的類型
export interface LoginRequest {
    email: string;
    password: string;
}

// 定義登入響應的類型
export interface LoginResponse {
    user: User;
    token: string;
}

// 用戶相關的 API 服務
export const userApi = {
    // 獲取當前用戶信息
    getCurrentUser: () => http.get<User>('/user/me'),

    // 用戶登入
    login: (data: LoginRequest) => http.post<LoginResponse>('/auth/login', data),

    // 用戶註冊
    register: (data: Omit<LoginRequest, 'password'> & { password: string; confirmPassword: string }) =>
        http.post<LoginResponse>('/auth/register', data),

    // 用戶登出
    logout: () => http.post('/auth/logout'),

    // 更新用戶信息
    updateProfile: (data: Partial<User>) => http.put<User>('/user/profile', data),

    // 上傳頭像
    uploadAvatar: (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return http.post<{ avatar: string }>('/user/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

// 定義餐廳相關的類型
export interface Restaurant {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    rating: number;
    image?: string;
    category: string;
    priceRange: 'low' | 'medium' | 'high';
    isOpen: boolean;
    createdAt: string;
    updatedAt: string;
}

// 定義餐廳查詢參數
export interface RestaurantQuery {
    search?: string;
    category?: string;
    priceRange?: string;
    rating?: number;
    page?: number;
    limit?: number;
}

// 餐廳相關的 API 服務
export const restaurantApi = {
    // 獲取餐廳列表
    getRestaurants: (params?: RestaurantQuery) =>
        http.get<{ restaurants: Restaurant[]; total: number; page: number; limit: number }>('/restaurants', { params }),

    // 獲取單個餐廳詳情
    getRestaurant: (id: string) => http.get<Restaurant>(`/restaurants/${id}`),

    // 創建餐廳
    createRestaurant: (data: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>) =>
        http.post<Restaurant>('/restaurants', data),

    // 更新餐廳信息
    updateRestaurant: (id: string, data: Partial<Restaurant>) => http.put<Restaurant>(`/restaurants/${id}`, data),

    // 刪除餐廳
    deleteRestaurant: (id: string) => http.delete(`/restaurants/${id}`),

    // 獲取餐廳分類
    getCategories: () => http.get<string[]>('/restaurants/categories'),
};

// 定義訂單相關的類型
export interface Order {
    id: string;
    userId: string;
    restaurantId: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    deliveryAddress: string;
    deliveryTime?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    notes?: string;
}

// 訂單相關的 API 服務
export const orderApi = {
    // 獲取用戶訂單列表
    getUserOrders: () => http.get<Order[]>('/orders'),

    // 獲取單個訂單詳情
    getOrder: (id: string) => http.get<Order>(`/orders/${id}`),

    // 創建訂單
    createOrder: (data: Omit<Order, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) =>
        http.post<Order>('/orders', data),

    // 更新訂單狀態
    updateOrderStatus: (id: string, status: Order['status']) => http.patch<Order>(`/orders/${id}/status`, { status }),

    // 取消訂單
    cancelOrder: (id: string) => http.post(`/orders/${id}/cancel`),
};

// 導出所有 API 服務
export const api = {
    user: userApi,
    restaurant: restaurantApi,
    order: orderApi,
};
