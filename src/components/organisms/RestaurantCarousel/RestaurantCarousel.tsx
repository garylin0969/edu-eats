import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const RestaurantCarousel = () => {
    return (
        <section>
            <Carousel className="" opts={{ dragFree: true, align: 'start', loop: true }}>
                <CarouselContent>
                    {Array.from({ length: 12 }).map((_, index) => {
                        return (
                            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                                <Card className="overflow-hidden p-0">
                                    <CardHeader className="visuallyhidden">
                                        <CardTitle>Card Title</CardTitle>
                                        <CardDescription>Card Description</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <AspectRatio ratio={1}>
                                            <img
                                                className="h-full w-full object-cover select-none"
                                                src="https://img.4gamers.com.tw/news-image/8043dc2a-bcfa-4265-934d-4657d05b67a3.jpg"
                                                alt=""
                                            />
                                        </AspectRatio>
                                    </CardContent>
                                </Card>
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
