import { useCallback } from 'react';

interface FormData {
    CountyId: string;
    AreaId: string;
    SchoolType: string;
    SchoolId: string;
    period: string;
}

interface UseFormInteractionsParams {
    setValue: (name: keyof FormData, value: string) => void;
    getValues: () => FormData;
    searchAreaOptions: (countyId: string) => Promise<unknown[]>;
    clearAreaOptions: () => void;
    searchSchoolOptions: (params: { CountyId?: string; AreaId?: string; SchoolType?: string }) => Promise<unknown[]>;
    clearSchoolOptions: () => void;
}

interface UseFormInteractionsReturn {
    handleCountyChange: (countyId: string) => Promise<void>;
    handleAreaChange: () => Promise<void>;
    handleSchoolTypeChange: () => Promise<void>;
}

/**
 * 表單聯動邏輯管理自定義 Hook
 * 處理表單欄位之間的互動關係
 */
const useFormInteractions = ({
    setValue,
    getValues,
    searchAreaOptions,
    clearAreaOptions,
    searchSchoolOptions,
    clearSchoolOptions,
}: UseFormInteractionsParams): UseFormInteractionsReturn => {
    // 基於當前表單值搜尋學校選項
    const handleSearchSchoolOptions = useCallback(async () => {
        const { CountyId, AreaId, SchoolType } = getValues();
        await searchSchoolOptions({ CountyId, AreaId, SchoolType });
    }, [getValues, searchSchoolOptions]);

    // 縣市選擇變更
    const handleCountyChange = useCallback(
        async (countyId: string) => {
            setValue('AreaId', ''); // 清空區域選擇
            setValue('SchoolId', ''); // 清空學校選擇

            if (!countyId) {
                clearAreaOptions();
                clearSchoolOptions();
                return;
            }

            await searchAreaOptions(countyId);
            await handleSearchSchoolOptions();
        },
        [setValue, searchAreaOptions, clearAreaOptions, clearSchoolOptions, handleSearchSchoolOptions]
    );

    // 區域選擇變更
    const handleAreaChange = useCallback(async () => {
        setValue('SchoolId', ''); // 清空學校選擇
        await handleSearchSchoolOptions();
    }, [setValue, handleSearchSchoolOptions]);

    // 學校類型變更
    const handleSchoolTypeChange = useCallback(async () => {
        setValue('SchoolId', ''); // 清空學校選擇
        await handleSearchSchoolOptions();
    }, [setValue, handleSearchSchoolOptions]);

    return {
        handleCountyChange,
        handleAreaChange,
        handleSchoolTypeChange,
    };
};

export default useFormInteractions;
