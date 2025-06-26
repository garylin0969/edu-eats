import { invoke, isTauri } from '@tauri-apps/api/core';
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

/**
 * 處理 schoolId 參數轉換
 * @param params 原始參數
 * @param isTauriEnv 是否為 Tauri 環境
 * @returns 處理後的參數
 */
function processParams(params: CateringServiceParams, isTauriEnv: true): CateringServiceParams & { schoolId: number };
function processParams(params: CateringServiceParams, isTauriEnv: false): CateringServiceParams & { schoolId: string };
function processParams(params: CateringServiceParams, isTauriEnv: boolean): CateringServiceParams {
    if (isTauriEnv) {
        // Tauri 環境需要 number 類型的 schoolId
        return {
            ...params,
            schoolId: params.schoolId ? Number(params.schoolId) : undefined,
        };
    } else {
        // Web 環境需要 string 類型的 schoolId
        return {
            ...params,
            schoolId: params.schoolId ? params.schoolId.toString() : undefined,
        };
    }
}

export const GetCateringServiceByAPI = (params: CateringServiceParams & { schoolId: string }) => {
    return CateringServiceApi.get<ApiResponse<CateringService[]>>('/api/cateringservice/rest/API', { params });
};

export const GetCateringServiceByRust = (params: CateringServiceParams & { schoolId: number }) => {
    return invoke<ApiResponse<CateringService[]>>(
        'query_catering_service',
        params as unknown as Record<string, unknown>
    );
};

export const GetCateringService = (params: CateringServiceParams) => {
    const isTauriEnv = isTauri();

    if (isTauriEnv) {
        const processedParams = processParams(params, true);
        return GetCateringServiceByRust(processedParams);
    } else {
        const processedParams = processParams(params, false);
        return GetCateringServiceByAPI(processedParams);
    }
};
