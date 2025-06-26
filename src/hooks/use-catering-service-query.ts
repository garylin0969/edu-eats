/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { ApiResponse } from '@/types';

// QueryCateringService 參數類型
interface QueryCateringServiceParams {
    method: string;
    schoolId: number;
    schoolCode?: string;
    schoolName?: string;
    func?: string;
    storeId?: string;
    varType?: string;
    valueName?: string;
    token?: string;
    username?: string;
    key?: string; // 用於選擇要回傳的特定資料欄位
}

/**
 * 使用 Tauri 呼叫 QueryCateringService API
 */
const useCateringServiceQuery = (params: QueryCateringServiceParams) => {
    return useQuery<ApiResponse<any>, Error>({
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
                    varType: params.varType || '',
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
};

export default useCateringServiceQuery;
