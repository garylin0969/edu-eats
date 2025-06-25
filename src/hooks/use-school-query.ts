import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GetSchool } from '@/api/form-api';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';
import { filterObjectEmptyValues, objectIsEmpty } from '@/utils/object';

interface SchoolSearchParams {
    CountyId?: string;
    AreaId?: string;
    SchoolType?: string;
    [key: string]: string | undefined;
}

/**
 * 學校選項管理自定義 Hook
 * 使用 useQuery 提供學校選項的搜尋和清空功能
 */
const useSchoolQuery = (searchParams?: SchoolSearchParams) => {
    // 過濾空值參數
    const filteredParams = useMemo(() => {
        if (!searchParams) return null;
        const filtered = filterObjectEmptyValues(searchParams);
        return objectIsEmpty(filtered) ? null : filtered;
    }, [searchParams]);

    // 使用 useQuery 管理學校數據
    const query = useQuery({
        queryKey: ['school', filteredParams],
        queryFn: () => GetSchool(filteredParams!),
        enabled: !!filteredParams, // 只有當參數存在時才執行查詢
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    const { data, refetch } = query;

    // 使用 useMemo 緩存 schoolOptions，避免每次渲染都重新計算
    const schoolOptions = useMemo((): Option[] => {
        return transformToOptions(data, 'SchoolName', 'SchoolId');
    }, [data]);

    // 搜尋學校選項（觸發重新獲取）
    const searchSchoolOptions = (params: SchoolSearchParams) => {
        const filtered = filterObjectEmptyValues(params);
        if (!objectIsEmpty(filtered)) {
            refetch();
        }
    };

    return {
        ...query,
        schoolOptions: filteredParams ? schoolOptions : [],
        searchSchoolOptions,
    };
};

export default useSchoolQuery;
