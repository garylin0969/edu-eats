import { useQuery } from '@tanstack/react-query';
import { invoke, isTauri } from '@tauri-apps/api/core';
import { GetCateringService } from '@/api/catering-service';
import { ApiResponse, CateringServiceParams } from '@/types';

/**
 * 處理 schoolId 參數轉換
 * @param params 原始參數
 * @param isTauriEnv 是否為 Tauri 環境
 * @returns 處理後的參數
 */
const processParams = (params: CateringServiceParams, isTauriEnv: boolean): CateringServiceParams => {
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
};

/**
 * 使用 Tauri 或 Web API 調用餐飲服務查詢
 * - 在 App 環境中使用 Tauri Rust API
 * - 在瀏覽器環境中使用 Web API
 */
const useCateringServiceQuery = (params: CateringServiceParams) => {
    const query = useQuery({
        queryKey: ['query_catering_service', params],
        queryFn: async () => {
            const isTauriEnv = isTauri();
            const processedParams = processParams(params, isTauriEnv);

            if (isTauriEnv) {
                // 在 App 環境中使用 Tauri Rust API
                return await invoke<ApiResponse<unknown>>(
                    'query_catering_service',
                    processedParams as Record<string, unknown>
                );
            } else {
                // 在瀏覽器環境中使用 Web API
                return await GetCateringService(processedParams);
            }
        },
    });

    return query;
};

export default useCateringServiceQuery;
