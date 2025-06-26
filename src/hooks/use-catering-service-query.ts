/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { ApiResponse, CateringServiceParams } from '@/types';

/**
 * 使用 Tauri 呼叫 QueryCateringService API
 */
const useCateringServiceQuery = (params: CateringServiceParams) => {
    const query = useQuery({
        queryKey: ['queryCateringService', params],
        queryFn: async () => {
            try {
                const result = await invoke<ApiResponse<any>>('query_catering_service', {
                    method: params.method,
                    schoolId: params.schoolId,
                    schoolCode: params.schoolCode || '',
                    schoolName: params.schoolName || '',
                    func: params.func || '',
                    storeId: params.storeId || '',
                    type: params.type || '',
                    valueName: params.valueName || '',
                    token: params.token,
                    username: params.username,
                    key: params.key,
                });
                return result;
            } catch (error) {
                throw new Error(error as string);
            }
        },
        enabled: !!params.schoolId, // 只有當 schoolId 存在時才執行查詢
    });

    return query;
};

export default useCateringServiceQuery;
