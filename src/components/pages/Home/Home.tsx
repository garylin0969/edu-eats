import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { GetArea, GetSchool } from '@/api/form-api';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SCHOOL_TYPE_OPTIONS } from '@/constants';
import { useCounty } from '@/hooks';
import { Area, Option, School } from '@/types';
import { formatDate } from '@/utils/date';

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

    // 搜尋學校選項
    const handleChangeToSearchSchoolOptions = useCallback(async () => {
        const currentFormData = getValues();
        const { CountyId, AreaId, SchoolType } = currentFormData;
        const searchParams = { CountyId, AreaId, SchoolType };
        // 過濾掉空值參數
        const params = Object?.fromEntries(
            Object?.entries(searchParams)?.filter(([, value]) => value !== undefined && value !== '')
        );
        // 如果沒有參數，則清空學校選項
        if (Object?.keys(params)?.length === 0) {
            setSchoolOptions([]);
            return;
        }
        const result = await GetSchool(params);
        const newSchoolOptions = result?.data?.map((item: School) => ({
            label: item?.SchoolName ?? '',
            value: item?.SchoolId?.toString() ?? '',
        }));
        setSchoolOptions(newSchoolOptions ?? []);
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

            const result = await GetArea(CountyId);
            const newAreaOptions =
                result?.data?.map((item: Area) => ({
                    label: item?.Area ?? '',
                    value: item?.AreaId?.toString() ?? '',
                })) ?? [];
            setAreaOptions(newAreaOptions ?? []);

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
            {/* 空狀態區域 */}
            <section className="flex flex-col items-center justify-center">
                <div className="max-w-md space-y-4 text-center">
                    {/* 圖標 */}
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                        <Utensils className="h-12 w-12 text-gray-400" />
                    </div>
                    {/* 主標題 */}
                    <h3 className="text-xl font-semibold">目前無食材相關資料</h3>
                </div>
            </section>
        </>
    );
};

export default Home;
