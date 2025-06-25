import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GetArea } from '@/api/form-api';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';

/**
 * 區域選項管理自定義 Hook
 * 使用 useQuery 提供區域選項的搜尋和清空功能
 */
const useAreaQuery = (countyId?: string) => {
    // 使用 useQuery 管理區域數據
    const query = useQuery({
        queryKey: ['area', countyId],
        queryFn: () => GetArea(countyId!),
        enabled: !!countyId, // 只有當 countyId 存在時才執行查詢
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    const { data, refetch } = query;

    // 使用 useMemo 緩存 areaOptions，避免每次渲染都重新計算
    const areaOptions = useMemo((): Option[] => {
        return transformToOptions(data, 'Area', 'AreaId');
    }, [data]);

    // 搜尋區域選項（觸發重新獲取）
    const searchAreaOptions = (newCountyId: string) => {
        if (newCountyId) {
            refetch();
        }
    };

    return {
        ...query,
        areaOptions: countyId ? areaOptions : [],
        searchAreaOptions,
    };
};

export default useAreaQuery;
