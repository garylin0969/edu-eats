import { Utensils } from 'lucide-react';
import ComposableCard from '@/components/molecules/ComposableCard';
import ImageCard from '@/components/molecules/ImageCard';
import Placeholder from '@/components/molecules/Placeholder';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useCanteenQuery } from '@/hooks';
import { Restaurant } from '@/types';

/**
 * 餐廳圖片預設路徑
 */
const DEFAULT_RESTAURANT_IMAGE_PATH = 'https://fatraceschool.k12ea.gov.tw/kitchen/logo/';

interface RestaurantCarouselProps {
    className?: string;
    onRestaurantClick?: (restaurant: Restaurant) => void;
}

/**
 * 餐廳輪播
 */
const RestaurantCarousel = ({ className, onRestaurantClick }: RestaurantCarouselProps) => {
    // 餐廳查詢 - 當 URL 中同時存在 SchoolId 和 period 時自動調用
    const { data, isLoading, isError, shouldFetch, schoolId, period, refetch } = useCanteenQuery();

    const handleRestaurantClick = (restaurant: Restaurant) => () => onRestaurantClick?.(restaurant);

    // 渲染內容
    if (!shouldFetch) {
        return (
            <>
                <section className={className}>
                    <Carousel opts={{ dragFree: true, align: 'start', loop: true }}>
                        <CarouselContent>{/* 空的輪播 */}</CarouselContent>
                        <CarouselPrevious className="-left-3" />
                        <CarouselNext className="-right-3" />
                    </Carousel>
                </section>
                <Placeholder type="empty" />
            </>
        );
    }

    if (isLoading) {
        return <Placeholder type="loading" />;
    }

    if (isError) {
        return <Placeholder type="error" refetch={refetch} />;
    }

    if (Array.isArray(data) && data?.length > 0) {
        // 有餐廳資料時顯示輪播
        return (
            <section className={className}>
                <Carousel opts={{ dragFree: true, align: 'start', loop: true }}>
                    <CarouselContent>
                        {data?.map((restaurant) => (
                            <CarouselItem
                                key={restaurant?.RestaurantId}
                                className="basis-1/3 md:basis-1/4 lg:basis-1/6"
                            >
                                <ComposableCard
                                    cardClassName="overflow-hidden p-0"
                                    cardHeaderClassName="visuallyhidden"
                                    cardContentClassName="p-0"
                                    content={
                                        <ImageCard
                                            imageSrc={`${DEFAULT_RESTAURANT_IMAGE_PATH}${restaurant?.kitchenId}`}
                                            imageAlt={`${restaurant?.RestaurantName}餐廳圖片`}
                                            title={restaurant?.RestaurantName || '餐廳名稱'}
                                            onClick={handleRestaurantClick(restaurant)}
                                        />
                                    }
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-3" />
                    <CarouselNext className="-right-3" />
                </Carousel>
            </section>
        );
    } else {
        // 查詢成功但沒有資料
        return (
            <Placeholder
                icon={<Utensils className="h-12 w-12 text-gray-400" />}
                title="目前無餐廳相關資料"
                description={`學校ID: ${schoolId}, 日期: ${period}`}
            />
        );
    }
};

export default RestaurantCarousel;
