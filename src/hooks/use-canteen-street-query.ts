import { useQuery } from '@tanstack/react-query';
import { GetCanteenStreet } from '@/api/canteen-api';
import { CanteenStreetParams } from '@/types';
import useUrlManager from './use-url-manager';

/**
 * 查詢學校校舍區域的 Hook
 */
const useCanteenStreetQuery = () => {
    const { searchParams } = useUrlManager();

    // 從 URL 參數中獲取 SchoolId 和 period
    const schoolIdParam = searchParams.get('SchoolId');
    const periodParam = searchParams.get('period');

    // 轉換參數類型
    const schoolId = schoolIdParam ? parseInt(schoolIdParam, 10) : null;
    const period = periodParam || null;

    // 檢查是否同時存在必要參數
    const shouldFetch = schoolId !== null && period !== null && !isNaN(schoolId);

    const params: CanteenStreetParams | null = shouldFetch
        ? {
              SchoolId: schoolId!,
              period: period!,
          }
        : null;

    const query = useQuery({
        queryKey: ['canteen-street', params],
        queryFn: () => GetCanteenStreet(params!),
        enabled: shouldFetch,
        staleTime: 5 * 60 * 1000, // 5分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    return { ...query, params, shouldFetch, schoolId, period };
};

export default useCanteenStreetQuery;
