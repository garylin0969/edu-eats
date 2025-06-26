/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { invoke, isTauri } from '@tauri-apps/api/core';
import { GetCateringService } from '@/api/catering-service';
import { ApiResponse, CateringServiceParams } from '@/types';

/**
 * 使用 Tauri 或 Web API 呼叫 QueryCateringService
 * - 在 App 環境中使用 Tauri Rust API
 * - 在瀏覽器環境中使用 Web API
 */
const useCateringServiceQuery = (params: CateringServiceParams) => {
    const query = useQuery({
        queryKey: ['query_catering_service', params],
        queryFn: async () => {
            if (isTauri()) {
                // 在 App 環境中使用 Tauri Rust API
                const response = await invoke<ApiResponse<any>>('query_catering_service', {
                    key: params.key,
                    method: params.method,
                    schoolId: params.schoolId ? Number(params.schoolId) : undefined,
                    schoolCode: params.schoolCode,
                    schoolName: params.schoolName,
                    func: params.func,
                    storeId: params.storeId,
                    type: params.type,
                    valueName: params.valueName,
                    token: params.token,
                    username: params.username,
                });
                return response;
            } else {
                params.schoolId = params.schoolId ? params.schoolId.toString() : undefined;
                // 在瀏覽器環境中使用 Web API
                const response = await GetCateringService(params);
                return response;
            }
        },
    });

    return query;
};

export default useCateringServiceQuery;
