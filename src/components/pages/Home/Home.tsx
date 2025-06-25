import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import Placeholder from '@/components/molecules/Placeholder';
import RestaurantCarousel from '@/components/organisms/RestaurantCarousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SCHOOL_TYPE_OPTIONS } from '@/constants';
import {
    useCountyQuery,
    useAreaQuery,
    useSchoolQuery,
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
    const { handleSubmit, setValue, getValues, watch } = form;

    // 監聽表單值變化
    const CountyId = watch('CountyId');
    const AreaId = watch('AreaId');
    const SchoolType = watch('SchoolType');

    // 縣市選項
    const { countyOptions } = useCountyQuery();

    // URL 管理
    const { updateUrlParams, searchParams } = useUrlManager();

    // 區域選項管理 - 基於當前選擇的縣市
    const { areaOptions, isLoading: isLoadingAreas } = useAreaQuery(CountyId);

    // 學校選項管理 - 基於當前選擇的縣市、區域和學校類型
    const schoolSearchParams = useMemo(() => {
        if (!CountyId && !AreaId && !SchoolType) return undefined;
        return { CountyId, AreaId, SchoolType };
    }, [CountyId, AreaId, SchoolType]);

    const { schoolOptions, isLoading: isLoadingSchools } = useSchoolQuery(schoolSearchParams);

    // 表單聯動邏輯
    const { handleCountyChange, handleAreaChange, handleSchoolTypeChange } = useFormInteractions({ setValue });

    // URL 參數初始化
    useUrlFormInitialization({ setValue, getValues, searchParams });

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
                                    disabled={isLoadingAreas}
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
                                <Combobox
                                    form={form}
                                    name="SchoolId"
                                    placeholder="學校名稱"
                                    options={schoolOptions}
                                    disabled={isLoadingSchools}
                                />
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

            <div className="flex items-center justify-between">
                <div>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">Make changes to your account here.</TabsContent>
                        <TabsContent value="password">Change your password here.</TabsContent>
                    </Tabs>
                </div>
                <div className="relative h-13 w-60">
                    <Accordion className="absolute top-0 right-0 z-2 h-full w-full" type="single" collapsible>
                        <AccordionItem value="street">
                            <AccordionTrigger>
                                <span className="flex-1 text-right">校舍區域選擇</span>
                            </AccordionTrigger>
                            <AccordionContent className="top-[100%] right-0 z-50 w-60 rounded-md bg-white p-2 shadow-lg">
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            {/* 餐廳輪播 - 現在內部處理查詢和狀態管理 */}
            <RestaurantCarousel
                className="px-3"
                onRestaurantClick={(restaurant) => {
                    console.log('Selected restaurant:', restaurant);
                    // 這裡可以添加點擊餐廳後的邏輯，比如顯示菜單
                }}
            />

            {/* 其他 Placeholder 示例 */}
            <Placeholder type="loading" />
            <Placeholder type="error" />
            <Placeholder type="custom" />
            <Placeholder icon={<Utensils className="h-12 w-12 text-gray-400" />} title="目前無食材相關資料" />
        </>
    );
};

export default Home;
