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

interface UseSchoolOptionsReturn {
    schoolOptions: Option[];
    searchSchoolOptions: (params: SchoolSearchParams) => void;
    clearSchoolOptions: () => void;
    isLoading: boolean;
    error: Error | null;
}

/**
 * 學校選項管理自定義 Hook
 * 使用 useQuery 提供學校選項的搜尋和清空功能
 */
const useSchoolOptions = (searchParams?: SchoolSearchParams): UseSchoolOptionsReturn => {
    // 過濾空值參數
    const filteredParams = useMemo(() => {
        if (!searchParams) return null;
        const filtered = filterObjectEmptyValues(searchParams);
        return objectIsEmpty(filtered) ? null : filtered;
    }, [searchParams]);

    // 使用 useQuery 管理學校數據
    const {
        data: schoolData,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['school', filteredParams],
        queryFn: () => GetSchool(filteredParams!),
        enabled: !!filteredParams, // 只有當參數存在時才執行查詢
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    // 使用 useMemo 緩存 schoolOptions，避免每次渲染都重新計算
    const schoolOptions = useMemo((): Option[] => {
        return transformToOptions(schoolData, 'SchoolName', 'SchoolId');
    }, [schoolData]);

    // 搜尋學校選項（觸發重新獲取）
    const searchSchoolOptions = (params: SchoolSearchParams) => {
        const filtered = filterObjectEmptyValues(params);
        if (!objectIsEmpty(filtered)) {
            refetch();
        }
    };

    // 清空學校選項（實際上是通過 searchParams 為空來控制）
    const clearSchoolOptions = () => {
        // 這個方法主要是為了保持 API 兼容性
        // 實際的清空邏輯應該在父組件中通過不傳遞 searchParams 來實現
    };

    return {
        schoolOptions: filteredParams ? schoolOptions : [],
        searchSchoolOptions,
        clearSchoolOptions,
        isLoading,
        error,
    };
};

export default useSchoolOptions;
