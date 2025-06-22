import { useCallback, useState } from 'react';
import { GetArea } from '@/api/form-api';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';

interface UseAreaOptionsReturn {
    areaOptions: Option[];
    searchAreaOptions: (countyId: string) => Promise<unknown[]>;
    clearAreaOptions: () => void;
}

/**
 * 區域選項管理自定義 Hook
 * 提供區域選項的搜尋和清空功能
 */
const useAreaOptions = (): UseAreaOptionsReturn => {
    const [areaOptions, setAreaOptions] = useState<Option[]>([]);

    const searchAreaOptions = useCallback(async (countyId: string) => {
        if (!countyId) {
            setAreaOptions([]);
            return [];
        }

        // 搜尋區域
        const result = await GetArea(countyId);
        // 轉換為選項
        const newAreaOptions = transformToOptions(result?.data, 'Area', 'AreaId');
        setAreaOptions(newAreaOptions);
        return result?.data || [];
    }, []);

    const clearAreaOptions = useCallback(() => {
        setAreaOptions([]);
    }, []);

    return {
        areaOptions,
        searchAreaOptions,
        clearAreaOptions,
    };
};

export default useAreaOptions;
