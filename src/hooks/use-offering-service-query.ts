import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GetOfferingService } from '@/api/canteen-api';
import { OfferingServiceParams } from '@/types';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';
import useUrlManager from './use-url-manager';

/**
 * 服務類型查詢 Hook
 * 當 URL 中同時存在 SchoolId 和 period 參數時，自動調用 GetOfferingService API
 */
const useOfferingServiceQuery = () => {
    const { searchParams } = useUrlManager();

    // 從 URL 參數中獲取 SchoolId 和 period
    const schoolIdParam = searchParams.get('SchoolId');
    const periodParam = searchParams.get('period');

    // 轉換參數類型
    const schoolId = schoolIdParam ? parseInt(schoolIdParam, 10) : null;
    const period = periodParam || null;

    // 檢查是否同時存在必要參數
    const shouldFetch = schoolId !== null && period !== null && !isNaN(schoolId);

    // 構建查詢參數
    const params: OfferingServiceParams | null = shouldFetch
        ? {
              SchoolId: schoolId!,
              period: period!,
          }
        : null;

    // 使用 useQuery 進行數據獲取
    const query = useQuery({
        queryKey: ['offering-service', params],
        queryFn: () => GetOfferingService(params!),
        enabled: shouldFetch, // 只有當參數完整時才執行查詢
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    const { data } = query;

    // 使用 useMemo 緩存 offeringServiceOptions，避免每次渲染都重新計算
    const offeringServiceOptions = useMemo((): Option[] => {
        return transformToOptions(data, 'label', 'ServiceId');
    }, [data]);

    return {
        ...query,
        params,
        shouldFetch,
        schoolId,
        period,
        offeringServiceOptions,
    };
};

export default useOfferingServiceQuery;
