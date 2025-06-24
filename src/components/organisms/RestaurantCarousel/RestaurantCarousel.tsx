import ComposableCard from '@/components/molecules/ComposableCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface RestaurantCarouselProps {
    className?: string;
}

/**
 * 餐廳輪播
 */
const RestaurantCarousel = ({ className }: RestaurantCarouselProps) => {
    return (
        <section className={className}>
            <Carousel className="" opts={{ dragFree: true, align: 'start', loop: true }}>
                <CarouselContent>
                    {Array.from({ length: 12 }).map((_, index) => {
                        return (
                            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                                <ComposableCard
                                    title=""
                                    description=""
                                    cardClassName="overflow-hidden p-0"
                                    cardHeaderClassName="visuallyhidden"
                                    cardContentClassName="p-0"
                                    content={
                                        <>
                                            <AspectRatio ratio={1}>
                                                <img
                                                    className="h-full w-full object-cover select-none"
                                                    src="https://img.4gamers.com.tw/news-image/8043dc2a-bcfa-4265-934d-4657d05b67a3.jpg"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                        </>
                                    }
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="-left-3" />
                <CarouselNext className="-right-3" />
            </Carousel>
        </section>
    );
};

export default RestaurantCarousel;
