# Axios 配置說明

這個目錄包含了 axios 攔截器和 API 服務的配置檔案。

## 檔案結構

- `axios.ts` - axios 實例和攔截器配置
- `example.ts` - API 服務和類型定義
- `README.md` - 本說明文件

## 使用方法

### 1. 基本使用

```typescript
import { http } from '@/api/axios';

// GET 請求
const users = await http.get<User[]>('/users');

// POST 請求
const newUser = await http.post<User>('/users', {
    name: 'John Doe',
    email: 'john@example.com',
});

// PUT 請求
const updatedUser = await http.put<User>('/users/1', {
    name: 'Jane Doe',
});

// DELETE 請求
await http.delete('/users/1');
```

### 2. 使用 API 服務

```typescript
import { api } from '@/api/example';

// 用戶相關操作
const currentUser = await api.user.getCurrentUser();
const loginResult = await api.user.login({
    email: 'user@example.com',
    password: 'password123',
});

// 餐廳相關操作
const restaurants = await api.restaurant.getRestaurants({
    search: 'pizza',
    category: 'italian',
    page: 1,
    limit: 10,
});

// 訂單相關操作
const orders = await api.order.getUserOrders();
const newOrder = await api.order.createOrder({
    restaurantId: 'restaurant-1',
    items: [{ name: 'Pizza', price: 15.99, quantity: 2 }],
    totalAmount: 31.98,
    deliveryAddress: '123 Main St',
});
```

### 3. 環境變數配置

在專案根目錄建立 `.env` 檔案：

```env
# API 配置
VITE_API_BASE_URL=http://localhost:3000/api

# 開發環境配置
VITE_APP_ENV=development
VITE_APP_NAME=EduEats
```

## 功能特性

### 請求攔截器

- 自動添加 Authorization token
- 請求日誌記錄
- 錯誤處理

### 響應攔截器

- 自動處理常見錯誤狀態碼
- 401 錯誤自動清除 token
- 詳細的錯誤日誌

### 類型安全

- 完整的 TypeScript 類型定義
- 泛型支援
- 自動類型推斷

## 錯誤處理

攔截器會自動處理以下錯誤：

- `401` - 未授權，自動清除 token
- `403` - 權限不足
- `404` - 資源不存在
- `500` - 服務器錯誤
- 網絡錯誤
- 請求配置錯誤

## 自定義配置

你可以根據需要修改 `axios.ts` 中的配置：

```typescript
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000, // 超時時間
    headers: {
        'Content-Type': 'application/json',
    },
});
```

## 注意事項

1. 確保在 `.env` 檔案中設置正確的 `VITE_API_BASE_URL`
2. Token 會自動從 localStorage 中讀取，key 為 `auth_token`
3. 所有 API 響應都會自動解包 `response.data`
4. 錯誤會自動記錄到 console，生產環境可以考慮移除或替換為其他日誌系統
