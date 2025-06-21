import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GetCounty } from '@/api/form-api';
import { County, Option } from '@/types';

interface UseCountyReturn {
    countyData: County[] | undefined;
    isCountyLoading: boolean;
    isCountyError: boolean;
    countyOptions: Option[];
}

/**
 * 縣市數據自定義 Hook
 * 包含 countyData, isCountyLoading, isCountyError, countyOptions
 */
const useCounty = (): UseCountyReturn => {
    const {
        data: countyData,
        isLoading: isCountyLoading,
        isError: isCountyError,
    } = useQuery({
        queryKey: ['county'],
        queryFn: GetCounty,
        select: (result) => result?.data,
    });

    //使用 useMemo 緩存 countyOptions，避免每次渲染都重新計算
    const countyOptions = useMemo((): Option[] => {
        if (!countyData) return [];

        return countyData?.map((item: County) => ({
            label: item?.County ?? '',
            value: item?.CountyId?.toString() ?? '',
        }));
    }, [countyData]);

    return {
        countyData,
        isCountyLoading,
        isCountyError,
        countyOptions,
    };
};

export default useCounty;
