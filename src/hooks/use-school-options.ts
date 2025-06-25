import { useCallback, useState } from 'react';
import { GetSchool } from '@/api/form-api';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';
import { filterObjectEmptyValues, objectIsEmpty } from '@/utils/object';

interface UseSchoolOptionsReturn {
    schoolOptions: Option[];
    searchSchoolOptions: (params: { CountyId?: string; AreaId?: string; SchoolType?: string }) => Promise<unknown[]>;
    clearSchoolOptions: () => void;
}

/**
 * 學校選項管理自定義 Hook
 * 提供學校選項的搜尋和清空功能
 */
const useSchoolOptions = (): UseSchoolOptionsReturn => {
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);

    const searchSchoolOptions = useCallback(
        async (params: { CountyId?: string; AreaId?: string; SchoolType?: string }) => {
            const filteredParams = filterObjectEmptyValues(params);

            if (objectIsEmpty(filteredParams)) {
                setSchoolOptions([]);
                return [];
            }

            try {
                // 搜尋學校
                const result = await GetSchool(filteredParams);
                // 轉換為選項
                const newSchoolOptions = transformToOptions(result?.data, 'SchoolName', 'SchoolId');
                setSchoolOptions(newSchoolOptions);
                return result?.data || [];
            } catch (error) {
                console.error('Error fetching school options:', error);
                return [];
            }
        },
        []
    );

    const clearSchoolOptions = useCallback(() => {
        setSchoolOptions([]);
    }, []);

    return {
        schoolOptions,
        searchSchoolOptions,
        clearSchoolOptions,
    };
};

export default useSchoolOptions;
