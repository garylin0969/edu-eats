/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { GetCateringService } from '@/api/catering-service';
import { ApiResponse, CateringServiceParams } from '@/types';

/**
 * 檢查是否在 Tauri App 環境中運行
 */
const isTauriApp = () => {
    return typeof window !== 'undefined' && '__TAURI__' in window;
};

/**
 * 使用 Tauri 或 Web API 呼叫 QueryCateringService
 * - 在 App 環境中使用 Tauri Rust API
 * - 在瀏覽器環境中使用 Web API
 */
const useCateringServiceQuery = (params: CateringServiceParams) => {
    const query = useQuery({
        queryKey: ['queryCateringService', params],
        queryFn: async () => {
            if (isTauriApp()) {
                // 在 App 環境中使用 Tauri Rust API
                const response = await invoke<ApiResponse<any>>('query_catering_service', {
                    method: params.method,
                    schoolId: params.schoolId,
                    schoolCode: params.schoolCode,
                    schoolName: params.schoolName,
                    func: params.func,
                    storeId: params.storeId,
                    type: params.type,
                    valueName: params.valueName,
                    token: params.token,
                    username: params.username,
                    key: params.key,
                });
                return response;
            } else {
                // 在瀏覽器環境中使用 Web API
                const response = await GetCateringService(params);
                return response;
            }
        },
        enabled: !!params.schoolId, // 只有當 schoolId 存在時才執行查詢
    });

    return query;
};

export default useCateringServiceQuery;
