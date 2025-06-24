import ComposableCard from '@/components/molecules/ComposableCard';
import ImageCard from '@/components/molecules/ImageCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Restaurant } from '@/types';

const DEFAULT_RESTAURANT_IMAGE_PATH = 'https://fatraceschool.k12ea.gov.tw/kitchen/logo/';

interface RestaurantCarouselProps {
    className?: string;
    restaurants?: Restaurant[];
    onRestaurantClick?: (restaurant: Restaurant) => void;
}

/**
 * 餐廳輪播
 */
const RestaurantCarousel = ({ className, restaurants = [], onRestaurantClick }: RestaurantCarouselProps) => {
    return (
        <section className={className}>
            <Carousel opts={{ dragFree: true, align: 'start', loop: true }}>
                <CarouselContent>
                    {restaurants?.map((restaurant) => (
                        <CarouselItem key={restaurant?.RestaurantId} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                            <ComposableCard
                                title=""
                                description=""
                                cardClassName="overflow-hidden p-0"
                                cardHeaderClassName="visuallyhidden"
                                cardContentClassName="p-0"
                                content={
                                    <ImageCard
                                        imageSrc={`${DEFAULT_RESTAURANT_IMAGE_PATH}${restaurant?.kitchenId}`}
                                        imageAlt={`${restaurant.RestaurantName}餐廳圖片`}
                                        title={restaurant.RestaurantName || '餐廳名稱'}
                                        onClick={() => {
                                            console.log('click restaurant:', restaurant);
                                            onRestaurantClick?.(restaurant);
                                        }}
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
};

export default RestaurantCarousel;
