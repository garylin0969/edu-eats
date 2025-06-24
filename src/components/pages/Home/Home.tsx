import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import Placeholder from '@/components/molecules/Placeholder';
import RestaurantCarousel from '@/components/organisms/RestaurantCarousel';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SCHOOL_TYPE_OPTIONS } from '@/constants';
import {
    useCounty,
    useAreaOptions,
    useSchoolOptions,
    useFormInteractions,
    useUrlManager,
    useUrlFormInitialization,
} from '@/hooks';
import { HomeFormData } from '@/types';
import { formatDate } from '@/utils/date';

// 日期格式化
const DATE_FORMAT = 'YYYY-MM-DD';
const TODAY_FORMATTED = formatDate(new Date(), DATE_FORMAT);

// 表單預設值
const defaultValues: HomeFormData = {
    CountyId: '',
    AreaId: '',
    SchoolType: '',
    SchoolId: '',
    period: TODAY_FORMATTED, //預設值為今天
};

// 日期格式化 for DatePicker
const formatDateValue = (date: Date): string => formatDate(date, DATE_FORMAT);

const Home = () => {
    // 表單
    const form = useForm<HomeFormData>({ defaultValues });
    const { handleSubmit, setValue, getValues } = form;

    // 縣市選項
    const { countyOptions } = useCounty();

    // URL 管理
    const { updateUrlParams, searchParams } = useUrlManager();

    // 區域選項管理
    const { areaOptions, searchAreaOptions, clearAreaOptions } = useAreaOptions();

    // 學校選項管理
    const { schoolOptions, searchSchoolOptions, clearSchoolOptions } = useSchoolOptions();

    // 表單聯動邏輯
    const { handleCountyChange, handleAreaChange, handleSchoolTypeChange } = useFormInteractions({
        setValue,
        getValues,
        searchAreaOptions,
        clearAreaOptions,
        searchSchoolOptions,
        clearSchoolOptions,
    });

    // URL 參數初始化
    useUrlFormInitialization({
        setValue,
        searchAreaOptions,
        searchSchoolOptions,
        searchParams,
    });

    // 提交表單
    const onSubmit = useCallback(
        (data: HomeFormData) => {
            // 在提交表單時更新 URL 參數
            updateUrlParams(data.SchoolId, data.period);
            console.log(data);
        },
        [updateUrlParams]
    );

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
                                    onChange={handleAreaChange}
                                />
                            </FormLayout.Col>
                            <FormLayout.Col xs="12" md="4">
                                <Combobox
                                    form={form}
                                    name="SchoolType"
                                    placeholder="院所類型"
                                    options={SCHOOL_TYPE_OPTIONS}
                                    onChange={handleSchoolTypeChange}
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
            <RestaurantCarousel />
            <Placeholder type="empty" />
            <Placeholder type="loading" />
            <Placeholder type="error" />
            <Placeholder type="custom" />
            <Placeholder icon={<Utensils className="h-12 w-12 text-gray-400" />} title="目前無食材相關資料" />
        </>
    );
};

export default Home;
