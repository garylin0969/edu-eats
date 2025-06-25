import { useCallback } from 'react';
import { HomeFormData } from '@/types';

interface UseFormInteractionsParams {
    setValue: (name: keyof HomeFormData, value: string) => void;
}

interface UseFormInteractionsReturn {
    handleCountyChange: (countyId: string) => void;
    handleAreaChange: () => void;
    handleSchoolTypeChange: () => void;
}

/**
 * 表單聯動邏輯管理自定義 Hook
 * 處理表單欄位之間的互動關係
 * 使用 useQuery 後，不再需要手動管理搜尋邏輯
 */
const useFormInteractions = ({ setValue }: UseFormInteractionsParams): UseFormInteractionsReturn => {
    // 縣市選擇變更
    const handleCountyChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_countyId: string) => {
            setValue('AreaId', ''); // 清空區域選擇
            setValue('SchoolId', ''); // 清空學校選擇
            // 區域選項會自動通過 useQuery 更新
            // countyId 透過表單 setValue 自動處理，不需要在此處理
        },
        [setValue]
    );

    // 區域選擇變更
    const handleAreaChange = useCallback(() => {
        setValue('SchoolId', ''); // 清空學校選擇
        // 學校選項會自動通過 useQuery 更新
    }, [setValue]);

    // 學校類型變更
    const handleSchoolTypeChange = useCallback(() => {
        setValue('SchoolId', ''); // 清空學校選擇
        // 學校選項會自動通過 useQuery 更新
    }, [setValue]);

    return {
        handleCountyChange,
        handleAreaChange,
        handleSchoolTypeChange,
    };
};

export default useFormInteractions;
