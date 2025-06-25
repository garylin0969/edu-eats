import { useQuery } from '@tanstack/react-query';
import { GetSchoolById } from '@/api/common-api';

interface UseSchoolByIdProps {
    schoolId: number | null;
    enabled?: boolean;
}

/**
 * 根據學校ID取得學校詳細資料的自定義 Hook
 * @param schoolId 學校ID
 * @param enabled 是否啟用查詢，預設為 true
 * @returns 包含學校詳細資料、載入狀態、錯誤狀態等的物件
 */
const useSchoolByIdQuery = ({ schoolId, enabled = true }: UseSchoolByIdProps) => {
    // 檢查是否應該執行查詢
    const shouldFetch = schoolId !== null && !isNaN(schoolId) && enabled;

    const query = useQuery({
        queryKey: ['school', schoolId],
        queryFn: () => GetSchoolById(schoolId!),
        enabled: shouldFetch,
        staleTime: 10 * 60 * 1000, // 10分鐘緩存
        refetchOnWindowFocus: false,
        select: (result) => result?.data,
    });

    return query;
};

export default useSchoolByIdQuery;
