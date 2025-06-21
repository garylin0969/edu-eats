import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
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

const Home = () => {
    const { countyOptions } = useCounty(); //縣市選項
    const [areaOptions, setAreaOptions] = useState<Option[]>([]); //區域選項
    const [schoolOptions, setSchoolOptions] = useState<Option[]>([]); //學校選項

    // 表單
    const form = useForm<FormData>({ defaultValues });
    const { handleSubmit, setValue, getValues } = form;

    // 從URL參數自動填入表單
    useEffect(() => {
        const initializeFormFromUrl = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const schoolId = urlParams.get('SchoolId');
            const period = urlParams.get('period');

            // 如果有日期參數，直接設定
            if (period) {
                setValue('period', period);
            }

            // 如果有SchoolId參數，需要先搜尋學校資料來獲取其他相關資訊
            if (schoolId) {
                try {
                    // 使用SchoolId搜尋學校資料
                    const schoolResult = await GetSchool({ SchoolName: '', CountyId: '', AreaId: '', SchoolType: '' });
                    const targetSchool = schoolResult?.data?.find((school) => school.SchoolId?.toString() === schoolId);

                    if (targetSchool && targetSchool.CountyId && targetSchool.AreaId) {
                        // 設定縣市
                        setValue('CountyId', targetSchool.CountyId.toString());

                        // 獲取並設定區域選項
                        const areaResult = await GetArea(targetSchool.CountyId.toString());
                        const newAreaOptions = transformToOptions(areaResult?.data, 'Area', 'AreaId');
                        setAreaOptions(newAreaOptions);

                        // 設定區域
                        setValue('AreaId', targetSchool.AreaId.toString());

                        // 設定學校類型
                        if (targetSchool.SchoolType) {
                            setValue('SchoolType', targetSchool.SchoolType.toString());
                        }

                        // 獲取並設定學校選項
                        const schoolSearchResult = await GetSchool({
                            CountyId: targetSchool.CountyId.toString(),
                            AreaId: targetSchool.AreaId.toString(),
                            SchoolType: targetSchool.SchoolType?.toString() || '',
                        });
                        const newSchoolOptions = transformToOptions(schoolSearchResult?.data, 'SchoolName', 'SchoolId');
                        setSchoolOptions(newSchoolOptions);

                        // 設定學校
                        setValue('SchoolId', schoolId);
                    }
                } catch (error) {
                    console.error('Error initializing form from URL:', error);
                }
            }
        };

        initializeFormFromUrl();
    }, [setValue]);

    // 搜尋學校選項
    const handleChangeToSearchSchoolOptions = useCallback(async () => {
        const currentFormData = getValues();
        const { CountyId, AreaId, SchoolType } = currentFormData;
        const searchParams = { CountyId, AreaId, SchoolType };
        // 過濾掉空值參數
        const params = filterObjectEmptyValues(searchParams);
        // 如果沒有參數，則清空學校選項
        if (objectIsEmpty(params)) {
            setSchoolOptions([]);
            return;
        }
        // 搜尋學校選項
        const result = await GetSchool(params);
        const newSchoolOptions = transformToOptions(result?.data, 'SchoolName', 'SchoolId');
        setSchoolOptions(newSchoolOptions);
    }, [getValues]);

    // 縣市選擇變更
    const handleCountyChange = useCallback(
        async (CountyId: string) => {
            setValue('AreaId', ''); //清空區域

            // 如果縣市選擇為空，則清空區域選項、學校選項
            if (!CountyId) {
                setAreaOptions([]);
                setSchoolOptions([]);
                return;
            }

            // 搜尋區域選項
            const result = await GetArea(CountyId);
            const newAreaOptions = transformToOptions(result?.data, 'Area', 'AreaId');
            setAreaOptions(newAreaOptions);

            handleChangeToSearchSchoolOptions(); //搜尋學校選項
        },
        [handleChangeToSearchSchoolOptions, setValue]
    );

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
