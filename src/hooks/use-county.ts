import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GetCounty } from '@/api/form-api';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';

/**
 * 縣市數據自定義 Hook
 * 包含 countyData, isCountyLoading, isCountyError, countyOptions
 */
const useCounty = () => {
    const query = useQuery({
        queryKey: ['county'],
        queryFn: GetCounty,
        select: (result) => result?.data,
    });

    const { data } = query;

    //使用 useMemo 緩存 countyOptions，避免每次渲染都重新計算
    const countyOptions = useMemo((): Option[] => {
        return transformToOptions(data, 'County', 'CountyId');
    }, [data]);

    return {
        ...query,
        countyOptions,
    };
};

export default useCounty;
