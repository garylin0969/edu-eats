import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

// API 回應類型（根據實際 API 回應）
interface ApiResponse {
    result_content: {
        resStatus: number;
        msg: string;
        storeList: Store[];
    };
    resource: string;
    method: string;
    result: string;
    error_msg: string;
}

interface Store {
    storeId: string;
    storeName: string;
    schoolId: string;
    schoolName: string;
    storeTypeCode: string;
    storeTypeName: string;
    storeParentCode: string;
    storeParentName: string;
    storeCode: string;
    sfStreetId: string;
    enable: string;
    logo: string;
}

// QueryChainStore 參數類型
interface QueryChainStoreParams {
    schoolId: number;
    schoolCode?: string;
    schoolName?: string;
}

/**
 * 使用 Tauri 呼叫 QueryChainStore API
 */
export const useQueryChainStore = (params: QueryChainStoreParams) => {
    return useQuery<ApiResponse, Error>({
        queryKey: ['queryChainStore', params],
        queryFn: async () => {
            try {
                const result = await invoke<ApiResponse>('query_chain_store', {
                    schoolId: params.schoolId,
                    schoolCode: params.schoolCode || '',
                    schoolName: params.schoolName || '',
                });
                return result;
            } catch (error) {
                throw new Error(error as string);
            }
        },
        enabled: !!params.schoolId, // 只有當 schoolId 存在時才執行查詢
    });
};

/**
 * 手動呼叫 QueryChainStore API（不使用 React Query）
 */
export const queryChainStoreApi = async (params: QueryChainStoreParams): Promise<ApiResponse> => {
    try {
        const result = await invoke<ApiResponse>('query_chain_store', {
            schoolId: params.schoolId,
            schoolCode: params.schoolCode || '',
            schoolName: params.schoolName || '',
        });
        return result;
    } catch (error) {
        throw new Error(error as string);
    }
};
