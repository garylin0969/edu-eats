import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { GetArea, GetSchool } from '@/api/form-api';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import Placeholder from '@/components/molecules/Placeholder';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SCHOOL_TYPE_OPTIONS } from '@/constants';
import { useCounty } from '@/hooks';
import { Option } from '@/types';
import { transformToOptions } from '@/utils/common';
import { formatDate } from '@/utils/date';
import { filterObjectEmptyValues, objectIsEmpty } from '@/utils/object';

interface FormData {
    CountyId: string;
    AreaId: string;
    SchoolType: string;
    SchoolId: string;
    period: string;
}

// 日期格式化
const DATE_FORMAT = 'YYYY-MM-DD';
const TODAY_FORMATTED = formatDate(new Date(), DATE_FORMAT);

// 表單預設值
const defaultValues: FormData = {
    CountyId: '',
    AreaId: '',
    SchoolType: '',
    SchoolId: '',
    period: TODAY_FORMATTED, //預設值為今天
};

// 日期格式化 for DatePicker
const formatDateValue = (date: Date): string => formatDate(date, DATE_FORMAT);

// 自定義 hook：管理區域和學校選項
const useSchoolOptions = (setValue: (name: keyof FormData, value: string) => void, getValues: () => FormData) => {
    const [areaOptions, setAreaOptions] = useState<Option[]>([]);
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);

    // 搜尋學校選項
    const searchSchoolOptions = useCallback(
        async (params: { CountyId?: string; AreaId?: string; SchoolType?: string }) => {
            const filteredParams = filterObjectEmptyValues(params);
            if (objectIsEmpty(filteredParams)) {
                setSchoolOptions([]);
                return [];
            }

            const result = await GetSchool(filteredParams);
            const newSchoolOptions = transformToOptions(result?.data, 'SchoolName', 'SchoolId');
            setSchoolOptions(newSchoolOptions);
            return result?.data || [];
        },
        []
    );

    // 搜尋區域選項
    const searchAreaOptions = useCallback(async (countyId: string) => {
        if (!countyId) {
            setAreaOptions([]);
            return [];
        }

        const result = await GetArea(countyId);
        const newAreaOptions = transformToOptions(result?.data, 'Area', 'AreaId');
        setAreaOptions(newAreaOptions);
        return result?.data || [];
    }, []);

    // 基於當前表單值搜尋學校選項
    const handleChangeToSearchSchoolOptions = useCallback(async () => {
        const { CountyId, AreaId, SchoolType } = getValues();
        await searchSchoolOptions({ CountyId, AreaId, SchoolType });
    }, [getValues, searchSchoolOptions]);

    // 縣市選擇變更
    const handleCountyChange = useCallback(
        async (CountyId: string) => {
            setValue('AreaId', ''); // 清空區域

            if (!CountyId) {
                setAreaOptions([]);
                setSchoolOptions([]);
                return;
            }

            await searchAreaOptions(CountyId);
            await handleChangeToSearchSchoolOptions();
        },
        [setValue, searchAreaOptions, handleChangeToSearchSchoolOptions]
    );

    return {
        areaOptions,
        schoolOptions,
        setAreaOptions,
        setSchoolOptions,
        searchSchoolOptions,
        searchAreaOptions,
        handleChangeToSearchSchoolOptions,
        handleCountyChange,
    };
};

// 自定義 hook：從 URL 參數初始化表單
const useUrlFormInitialization = (
    setValue: (name: keyof FormData, value: string) => void,
    searchAreaOptions: (countyId: string) => Promise<unknown[]>,
    searchSchoolOptions: (params: { CountyId?: string; AreaId?: string; SchoolType?: string }) => Promise<unknown[]>
) => {
    const [searchParams] = useSearchParams();

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

const Home = () => {
    const { countyOptions } = useCounty(); // 縣市選項

    // 表單
    const form = useForm<FormData>({ defaultValues });
    const { handleSubmit, setValue, getValues } = form;

    // 學校選項管理
    const {
        areaOptions,
        schoolOptions,
        searchAreaOptions,
        searchSchoolOptions,
        handleChangeToSearchSchoolOptions,
        handleCountyChange,
    } = useSchoolOptions(setValue, getValues);

    // URL 參數初始化
    useUrlFormInitialization(setValue, searchAreaOptions, searchSchoolOptions);

    // 提交表單
    const onSubmit = useCallback((data: FormData) => {
        console.log(data);
    }, []);

    return (
        <>
            <section className="my-5">
                <Form {...form}>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <FormLayout.Group as={FormLayout.Row}>
                            <FormLayout.Col xs="6" md="4">
                                <Combobox
                                    form={form}
                                    name="CountyId"
                                    placeholder="縣市"
                                    options={countyOptions}
                                    onChange={handleCountyChange}
                                />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" md="4">
                                <Combobox
                                    form={form}
                                    name="AreaId"
                                    placeholder="區域"
                                    options={areaOptions}
                                    onChange={handleChangeToSearchSchoolOptions}
                                />
                            </FormLayout.Col>
                            <FormLayout.Col xs="12" md="4">
                                <Combobox
                                    form={form}
                                    name="SchoolType"
                                    placeholder="院所類型"
                                    options={SCHOOL_TYPE_OPTIONS}
                                    onChange={handleChangeToSearchSchoolOptions}
                                />
                            </FormLayout.Col>
                        </FormLayout.Group>
                        <FormLayout.Group as={FormLayout.Row}>
                            <FormLayout.Col xs="12" lg="5">
                                <Combobox form={form} name="SchoolId" placeholder="學校名稱" options={schoolOptions} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" lg="5">
                                <DatePicker
                                    form={form}
                                    name="period"
                                    placeholder="日期"
                                    valueFormat={formatDateValue}
                                />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" lg="2">
                                <Button className="w-full" type="submit">
                                    查詢
                                </Button>
                            </FormLayout.Col>
                        </FormLayout.Group>
                    </form>
                </Form>
            </section>
            <Placeholder type="empty" />
            <Placeholder type="loading" />
            <Placeholder type="error" />
            <Placeholder type="custom" />
            <Placeholder icon={<Utensils className="h-12 w-12 text-gray-400" />} title="目前無食材相關資料" />
        </>
    );
};

export default Home;
