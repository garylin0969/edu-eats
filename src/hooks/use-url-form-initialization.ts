import { useEffect } from 'react';
import { GetSchool } from '@/api/form-api';
import { HomeFormData } from '@/types';

interface UseUrlFormInitializationParams {
    setValue: (name: keyof HomeFormData, value: string) => void;
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
    searchAreaOptions,
    searchSchoolOptions,
    searchParams,
}: UseUrlFormInitializationParams): void => {
    useEffect(() => {
        const initializeFormFromUrl = async () => {
            const schoolId = searchParams.get('SchoolId');
            const period = searchParams.get('period');

            // 設定日期參數
            if (period) {
                setValue('period', period);
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
        };

        initializeFormFromUrl();
    }, [searchParams, setValue, searchAreaOptions, searchSchoolOptions]);
};

export default useUrlFormInitialization;
