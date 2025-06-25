import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GetArea } from '@/api/form-api';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';

interface UseAreaOptionsReturn {
    areaOptions: Option[];
    searchAreaOptions: (countyId: string) => void;
    clearAreaOptions: () => void;
    isLoading: boolean;
    error: Error | null;
}

/**
 * 區域選項管理自定義 Hook
 * 使用 useQuery 提供區域選項的搜尋和清空功能
 */
const useAreaOptions = (countyId?: string): UseAreaOptionsReturn => {
    // 使用 useQuery 管理區域數據
    const {
        data: areaData,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['area', countyId],
        queryFn: () => GetArea(countyId!),
        enabled: !!countyId, // 只有當 countyId 存在時才執行查詢
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    // 使用 useMemo 緩存 areaOptions，避免每次渲染都重新計算
    const areaOptions = useMemo((): Option[] => {
        return transformToOptions(areaData, 'Area', 'AreaId');
    }, [areaData]);

    // 搜尋區域選項（觸發重新獲取）
    const searchAreaOptions = (newCountyId: string) => {
        if (newCountyId) {
            refetch();
        }
    };

    // 清空區域選項（實際上是通過 countyId 為空來控制）
    const clearAreaOptions = () => {
        // 這個方法主要是為了保持 API 兼容性
        // 實際的清空邏輯應該在父組件中通過不傳遞 countyId 來實現
    };

    return {
        areaOptions: countyId ? areaOptions : [],
        searchAreaOptions,
        clearAreaOptions,
        isLoading,
        error,
    };
};

export default useAreaOptions;
