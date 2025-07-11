import { useEffect, useRef } from 'react';
import { GetSchoolById } from '@/api/common-api';
import { HomeFormData } from '@/types';
import { isValidDateFormat, getTodayDateString } from '@/utils/date';

interface UseUrlFormInitializationParams {
    setValue: (name: keyof HomeFormData, value: string) => void;
    getValues: () => HomeFormData;
    searchParams: URLSearchParams;
}

/**
 * URL 表單初始化自定義 Hook
 * 從 URL 參數初始化表單狀態
 * 使用 useQuery 後，不再需要手動搜尋選項
 */
const useUrlFormInitialization = ({ setValue, getValues, searchParams }: UseUrlFormInitializationParams): void => {
    const lastUrlParamsRef = useRef<string>('');

    useEffect(() => {
        const initializeFormFromUrl = async () => {
            const schoolId = searchParams.get('SchoolId');
            const period = searchParams.get('period');
            const currentValues = getValues();

            // 如果沒有任何URL參數，則不需要初始化
            if (!schoolId && !period) {
                return;
            }

            // 檢查表單當前值是否與URL參數一致，如果一致則跳過初始化
            const isFormUpToDate = currentValues.SchoolId === schoolId && currentValues.period === period;
            if (isFormUpToDate) {
                return;
            }

            // 建立當前URL參數的唯一標識符
            const currentUrlParams = JSON.stringify({ schoolId, period });

            // 如果URL參數沒有變化，則不需要重新初始化
            if (lastUrlParamsRef.current === currentUrlParams) {
                return;
            }

            lastUrlParamsRef.current = currentUrlParams;

            // 設定日期參數
            if (period) {
                // 驗證日期格式，如果不符合 YYYY-MM-DD 格式則使用今日日期
                const validPeriod = isValidDateFormat(period) ? period : getTodayDateString();
                setValue('period', validPeriod);
            }

            // 設定學校參數
            if (schoolId) {
                try {
                    // 直接根據學校ID獲取學校詳細資料
                    const schoolResult = await GetSchoolById(parseInt(schoolId, 10));
                    const targetSchool = schoolResult?.data;

                    // 注意：API返回的是 ConuntyId（拼寫錯誤），不是 CountyId
                    const countyId =
                        (targetSchool as unknown as Record<string, unknown>)?.ConuntyId || targetSchool?.CountyId;
                    if (countyId && targetSchool?.AreaId) {
                        const { AreaId, SchoolType } = targetSchool;

                        // 設定縣市
                        setValue('CountyId', countyId.toString());

                        // 設定區域
                        setValue('AreaId', AreaId.toString());

                        // 設定學校類型
                        if (SchoolType) {
                            setValue('SchoolType', SchoolType.toString());
                        }

                        // 設定學校ID
                        setValue('SchoolId', schoolId);

                        // 區域和學校選項會自動通過 useQuery 更新
                    }
                } catch (error) {
                    console.error('Error initializing form from URL:', error);
                }
            }
        };

        initializeFormFromUrl();
    }, [searchParams, setValue, getValues]);
};

export default useUrlFormInitialization;
