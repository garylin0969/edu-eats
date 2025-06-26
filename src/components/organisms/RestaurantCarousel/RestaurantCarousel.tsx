import { Utensils } from 'lucide-react';
import { useMemo, useCallback } from 'react';
import ComposableCard from '@/components/molecules/ComposableCard';
import ImageCard from '@/components/molecules/ImageCard';
import Placeholder from '@/components/molecules/Placeholder';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useCanteenQuery, useSchoolByIdQuery } from '@/hooks';
import { Restaurant } from '@/types';
import { cn } from '@/utils/shadcn';

/**
 * 餐廳圖片預設路徑
 */
const DEFAULT_RESTAURANT_IMAGE_PATH = 'https://fatraceschool.k12ea.gov.tw/kitchen/logo/';

/**
 * 輪播設定選項
 */
const CAROUSEL_OPTIONS = {
    dragFree: true,
    align: 'start' as const,
    loop: true,
} as const;

/**
 * 響應式基礎類別設定
 */
const CAROUSEL_ITEM_BASIS_CLASSES = 'basis-1/3 md:basis-1/4 lg:basis-1/6';

/**
 * 響應式布局斷點
 */
const RESPONSIVE_BREAKPOINTS = {
    MOBILE: 3,
    TABLET: 4,
    DESKTOP: 6,
} as const;

interface RestaurantCarouselProps {
    className?: string;
    onRestaurantClick?: (restaurant: Restaurant) => void;
}

/**
 * 計算響應式輪播內容類別
 */
const getCarouselContentClassName = (dataLength: number): string => {
    return cn(
        dataLength <= RESPONSIVE_BREAKPOINTS.MOBILE && 'flex items-center justify-center',
        dataLength <= RESPONSIVE_BREAKPOINTS.TABLET && 'md:flex md:items-center md:justify-center',
        dataLength <= RESPONSIVE_BREAKPOINTS.DESKTOP && 'lg:flex lg:items-center lg:justify-center'
    );
};

/**
 * 美食街輪播元件
 */
const RestaurantCarousel = ({ className, onRestaurantClick }: RestaurantCarouselProps) => {
    // 餐廳查詢 - 當 URL 中同時存在 SchoolId 和 period 時自動調用
    const { data, isLoading, isFetching, isError, schoolId, period, refetch } = useCanteenQuery();

    // 學校查詢 - 當 URL 中存在 SchoolId 時自動調用
    const { data: schoolDetail } = useSchoolByIdQuery({ schoolId });

    // 記憶化餐廳點擊處理函數
    const handleRestaurantClick = useCallback(
        (restaurant: Restaurant) => () => {
            onRestaurantClick?.(restaurant);
        },
        [onRestaurantClick]
    );

    // 記憶化餐廳數據檢查和響應式類別計算
    const { hasRestaurantData, carouselContentClassName } = useMemo(() => {
        const hasData = Array.isArray(data) && data.length > 0;
        const className = hasData ? getCarouselContentClassName(data.length) : '';

        return {
            hasRestaurantData: hasData,
            carouselContentClassName: className,
        };
    }, [data]);

    // 渲染餐廳輪播項目
    const renderRestaurantItem = useCallback(
        (restaurant: Restaurant) => (
            <CarouselItem key={restaurant.RestaurantId} className={CAROUSEL_ITEM_BASIS_CLASSES}>
                <ComposableCard
                    cardClassName="overflow-hidden p-0"
                    cardHeaderClassName="visuallyhidden"
                    cardContentClassName="p-0"
                    content={
                        <ImageCard
                            imageSrc={`${DEFAULT_RESTAURANT_IMAGE_PATH}${restaurant.kitchenId}`}
                            imageAlt={`${restaurant.RestaurantName}餐廳圖片`}
                            title={restaurant.RestaurantName ?? '餐廳名稱'}
                            onClick={handleRestaurantClick(restaurant)}
                        />
                    }
                />
            </CarouselItem>
        ),
        [handleRestaurantClick]
    );

    // 渲染餐廳輪播內容
    const renderCarouselContent = useCallback(
        () => (
            <section className={className}>
                <Carousel opts={CAROUSEL_OPTIONS}>
                    <CarouselContent className={carouselContentClassName}>
                        {data?.map(renderRestaurantItem)}
                    </CarouselContent>
                    <CarouselPrevious className="-left-3" />
                    <CarouselNext className="-right-3" />
                </Carousel>
            </section>
        ),
        [className, data, renderRestaurantItem, carouselContentClassName]
    );

    // 如果 URL 中不存在 SchoolId 或 period，則不顯示輪播
    if (!schoolId || !period) {
        return null;
    }

    // 處理加載狀態
    if (isLoading) {
        return <Placeholder type="loading" />;
    }

    // 處理錯誤狀態
    if (isError) {
        return isFetching ? <Placeholder type="loading" /> : <Placeholder type="error" refetch={refetch} />;
    }

    // 根據是否有餐廳數據渲染相應內容
    if (hasRestaurantData) {
        return renderCarouselContent();
    }

    return (
        <Placeholder
            icon={<Utensils className="h-12 w-12 text-gray-400" />}
            title="目前無餐廳相關資料"
            description={`學校: ${schoolDetail?.SchoolName ?? ''}, 日期: ${period ?? ''}`}
        />
    );
};

export default RestaurantCarousel;
