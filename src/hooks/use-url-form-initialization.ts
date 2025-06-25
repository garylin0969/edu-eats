import { useEffect, useRef } from 'react';
import { GetSchool } from '@/api/form-api';
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
    const initializedRef = useRef(false);

    useEffect(() => {
        const initializeFormFromUrl = async () => {
            const schoolId = searchParams.get('SchoolId');
            const period = searchParams.get('period');
            const currentValues = getValues();

            // 如果表單已經有對應的值，且與URL參數相同，則不需要重新初始化
            if (initializedRef.current && currentValues.SchoolId === schoolId && currentValues.period === period) {
                return;
            }

            // 設定日期參數
            if (period) {
                // 驗證日期格式，如果不符合 YYYY-MM-DD 格式則使用今日日期
                const validPeriod = isValidDateFormat(period) ? period : getTodayDateString();
                setValue('period', validPeriod);
            }

            // 設定學校參數
            if (schoolId) {
                try {
                    // 搜尋所有學校來找到目標學校
                    const schoolResult = await GetSchool({ SchoolName: '', CountyId: '', AreaId: '', SchoolType: '' });
                    const targetSchool = schoolResult?.data?.find((school) => school.SchoolId?.toString() === schoolId);

                    if (targetSchool?.CountyId && targetSchool?.AreaId) {
                        const { CountyId, AreaId, SchoolType } = targetSchool;

                        // 設定縣市
                        setValue('CountyId', CountyId.toString());

                        // 設定區域
                        await searchAreaOptions(CountyId.toString());
                        setValue('AreaId', AreaId.toString());

                        // 設定學校類型
                        if (SchoolType) {
                            setValue('SchoolType', SchoolType.toString());
                        }

                        // 設定學校選項和值
                        await searchSchoolOptions({
                            CountyId: CountyId.toString(),
                            AreaId: AreaId.toString(),
                            SchoolType: SchoolType?.toString() || '',
                        });
                        setValue('SchoolId', schoolId);
                    }
                } catch (error) {
                    console.error('Error initializing form from URL:', error);
                }
            }

            initializedRef.current = true;
        };

        initializeFormFromUrl();
    }, [searchParams, setValue, getValues, searchAreaOptions, searchSchoolOptions]);
};

export default useUrlFormInitialization;
