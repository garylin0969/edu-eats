import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { GetArea, GetSchool } from '@/api/form-api';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
            <section>
                <Alert className="dark:border-input flex items-start gap-4 rounded-lg border border-purple-200 bg-transparent p-6 shadow-sm dark:bg-transparent dark:shadow-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-transparent">
                        <svg
                            className="h-5 w-5 text-purple-600 dark:text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <AlertTitle className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            查詢資訊
                        </AlertTitle>
                        <AlertDescription>
                            <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                透過上方表單選擇縣市、區域、院所類型和學校名稱，即可查詢指定日期的餐飲資訊。
                            </p>
                            <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                                    請先選擇縣市，系統會自動載入對應的區域選項
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                                    選擇院所類型有助於縮小搜尋範圍
                                </li>
                            </ul>
                        </AlertDescription>
                    </div>
                </Alert>
            </section>
        </>
    );
};

export default Home;
