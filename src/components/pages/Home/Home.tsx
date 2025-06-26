import { Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { lazy, useCallback, useMemo } from 'react';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import Placeholder from '@/components/molecules/Placeholder';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SCHOOL_TYPE_OPTIONS, ServiceType } from '@/constants';
import {
    useCountyQuery,
    useAreaQuery,
    useSchoolQuery,
    useFormInteractions,
    useUrlManager,
    useUrlFormInitialization,
    useOfferingServiceQuery,
    useCanteenStreetQuery,
} from '@/hooks';
import { HomeFormData } from '@/types';
import { formatDate } from '@/utils/date';

const RestaurantCarousel = lazy(() => import('@/components/organisms/RestaurantCarousel')); // 美食街輪播元件
const ChainStoresCarousel = lazy(() => import('@/components/organisms/ChainStoresCarousel')); // 連鎖商店輪播元件

// 日期格式化
const DATE_FORMAT = 'YYYY-MM-DD';
const TODAY_FORMATTED = formatDate(new Date(), DATE_FORMAT);

// 日期格式化函數
const formatDateValue = (date: Date): string => formatDate(date, DATE_FORMAT);

// 表單預設值
const defaultValues: HomeFormData = {
    CountyId: '',
    AreaId: '',
    SchoolType: '',
    SchoolId: '',
    period: TODAY_FORMATTED, //預設值為今天
};

const Home = () => {
    // 表單管理
    const form = useForm<HomeFormData>({ defaultValues });
    const { handleSubmit, setValue, getValues, watch } = form;

    // 監聽表單值變化
    const CountyId = watch('CountyId');
    const AreaId = watch('AreaId');
    const SchoolType = watch('SchoolType');

    // 資料查詢
    const { countyOptions } = useCountyQuery();
    const { areaOptions, isLoading: isLoadingAreas } = useAreaQuery(CountyId);

    // 學校查詢參數
    const schoolSearchParams = useMemo(() => {
        if (!CountyId && !AreaId && !SchoolType) return undefined;
        return { CountyId, AreaId, SchoolType };
    }, [CountyId, AreaId, SchoolType]);

    const { schoolOptions, isLoading: isLoadingSchools } = useSchoolQuery(schoolSearchParams);

    // URL 管理
    const { updateUrlParams, searchParams } = useUrlManager();

    // 表單聯動邏輯
    const { handleCountyChange, handleAreaChange, handleSchoolTypeChange } = useFormInteractions({ setValue });

    // URL 參數初始化
    useUrlFormInitialization({ setValue, getValues, searchParams });

    // 表單提交處理
    const onSubmit = useCallback(
        (data: HomeFormData) => {
            // 在提交表單時更新 URL 參數
            updateUrlParams(data.SchoolId, data.period);
            console.log(data);
        },
        [updateUrlParams]
    );

    // 服務類型查詢
    const { offeringServiceOptions } = useOfferingServiceQuery();

    // 校舍區域查詢
    const { data: canteenStreetData } = useCanteenStreetQuery();

    // 美食街點擊處理
    const handleRestaurantClick = useCallback((restaurant: unknown) => {
        console.log('Selected restaurant:', restaurant);
        // 這裡可以添加點擊餐廳後的邏輯，比如顯示菜單
    }, []);
    // 連鎖商店點擊處理
    const handleChainStoresClick = useCallback((chainStores: unknown) => {
        console.log('Selected chainStores:', chainStores);
        // 這裡可以添加點擊餐廳後的邏輯，比如顯示菜單
    }, []);

    // 渲染標籤內容
    const renderTabContent = useCallback(
        (serviceType: string) => {
            // 美食街
            if (parseInt(serviceType) === ServiceType.Restaurant) {
                return <RestaurantCarousel className="px-3" onRestaurantClick={handleRestaurantClick} />;
            }
            // 連鎖商店
            if (parseInt(serviceType) === ServiceType.ChainStores) {
                return <ChainStoresCarousel className="px-3" onChainStoresClick={handleChainStoresClick} />;
            }
            return null;
        },
        [handleRestaurantClick, handleChainStoresClick]
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

            {offeringServiceOptions?.length > 0 && (
                <Tabs className="w-full" defaultValue={offeringServiceOptions[0]?.value}>
                    <div className="flex items-center justify-between">
                        <TabsList className="bg-primary/10">
                            {offeringServiceOptions.map((option) => (
                                <TabsTrigger key={option.value} value={option.value}>
                                    {option.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <div className="relative h-13 w-60">
                            <Accordion className="absolute top-0 right-0 z-2 h-full w-full" type="single" collapsible>
                                <AccordionItem value="street">
                                    <AccordionTrigger>
                                        <span className="flex-1 text-right">校舍區域選擇</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="top-[100%] right-0 z-50 w-60 rounded-md bg-white p-2 shadow-lg">
                                        <ul className="max-h-48 space-y-1 overflow-y-auto">
                                            <li
                                                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-[#581c87]"
                                                tabIndex={0}
                                                role="option"
                                            >
                                                所有區域
                                            </li>
                                            {canteenStreetData?.map((street) => (
                                                <li
                                                    key={street?.SFStreetId}
                                                    className="cursor-pointer rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-[#581c87]"
                                                    tabIndex={0}
                                                    role="option"
                                                >
                                                    {street?.SFStreetName}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    {offeringServiceOptions.map((option) => (
                        <TabsContent key={option.value} value={option.value}>
                            {renderTabContent(option.value)}
                        </TabsContent>
                    ))}
                </Tabs>
            )}

            {/* 其他 Placeholder 示例 */}
            <Placeholder type="loading" />
            <Placeholder type="error" />
            <Placeholder type="custom" />
            <Placeholder icon={<Utensils className="h-12 w-12 text-gray-400" />} title="目前無食材相關資料" />
        </>
    );
};

export default Home;
