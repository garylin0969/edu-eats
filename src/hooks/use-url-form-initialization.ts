import { useEffect, useRef } from 'react';
import { GetSchoolById } from '@/api/common-api';
import { HomeFormData } from '@/types';
import { isValidDateFormat, getTodayDateString } from '@/utils/date';

interface UseUrlFormInitializationParams {
    setValue: (name: keyof HomeFormData, value: string) => void;
    getValues: () => HomeFormData;
    searchAreaOptions: (countyId: string) => Promise<unknown[]>;
    searchSchoolOptions: (params: { CountyId?: string; AreaId?: string; SchoolType?: string }) => Promise<unknown[]>;
    searchParams: URLSearchParams;
}

/**
 * URL 表單初始化自定義 Hook
 * 從 URL 參數初始化表單狀態
 */
const useUrlFormInitialization = ({
    setValue,
    getValues,
    searchAreaOptions,
    searchSchoolOptions,
    searchParams,
}: UseUrlFormInitializationParams): void => {
    const lastUrlParamsRef = useRef<string>('');

    useEffect(() => {
        const initializeFormFromUrl = async () => {
            const schoolId = searchParams.get('SchoolId');
            const period = searchParams.get('period');

            // 如果沒有任何URL參數，則不需要初始化
            if (!schoolId && !period) {
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
                        await searchAreaOptions(countyId.toString());
                        setValue('AreaId', AreaId.toString());

                        // 設定學校類型
                        if (SchoolType) {
                            setValue('SchoolType', SchoolType.toString());
                        }

                        // 設定學校選項和值
                        await searchSchoolOptions({
                            CountyId: countyId.toString(),
                            AreaId: AreaId.toString(),
                            SchoolType: SchoolType?.toString() || '',
                        });
                        setValue('SchoolId', schoolId);
                    }
                } catch (error) {
                    console.error('Error initializing form from URL:', error);
                }
            }
        };

        initializeFormFromUrl();
    }, [searchParams, setValue, getValues, searchAreaOptions, searchSchoolOptions]);
};

export default useUrlFormInitialization;
