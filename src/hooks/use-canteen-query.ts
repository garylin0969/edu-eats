import { useQuery } from '@tanstack/react-query';
import { GetCanteen } from '@/api/canteen-api';
import { CanteenParams } from '@/types';
import useUrlManager from './use-url-manager';

/**
 * 餐廳查詢 Hook
 * 當 URL 中同時存在 SchoolId 和 period 參數時，自動調用 GetCanteen API
 */
const useCanteenQuery = () => {
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
    const params: CanteenParams | null = shouldFetch
        ? {
              SchoolId: schoolId!,
              period: period!,
              // SFStreetId 是可選參數，這裡可以從 URL 中獲取或設為 undefined
              SFStreetId: searchParams.get('SFStreetId') ? parseInt(searchParams.get('SFStreetId')!, 10) : undefined,
          }
        : null;

    // 使用 useQuery 進行數據獲取
    const query = useQuery({
        queryKey: ['canteen', params],
        queryFn: () => GetCanteen(params!),
        enabled: shouldFetch, // 只有當參數完整時才執行查詢
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
    });

    return {
        ...query,
        params,
        shouldFetch,
        schoolId,
        period,
    };
};

export default useCanteenQuery;
