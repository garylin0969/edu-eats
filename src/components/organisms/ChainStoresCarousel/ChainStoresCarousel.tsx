import { useQuery } from '@tanstack/react-query';
import { Utensils } from 'lucide-react';
import { useCallback } from 'react';
import { GetCateringService } from '@/api/catering-service';
import ComposableCard from '@/components/molecules/ComposableCard';
import ImageCard from '@/components/molecules/ImageCard';
import Placeholder from '@/components/molecules/Placeholder';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useSchoolByIdQuery, useUrlManager } from '@/hooks';
import { Store } from '@/types';
import { objectToTanstackQueryKeys } from '@/utils/object';

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

interface ChainStoresCarouselProps {
    className?: string;
    onChainStoresClick?: (chainStores: Store) => void;
}

/**
 * 美食街輪播元件
 */
const ChainStoresCarousel = ({ className, onChainStoresClick }: ChainStoresCarouselProps) => {
    const { searchParams } = useUrlManager();

    // 從 URL 參數中獲取並轉換參數
    const schoolIdParam = searchParams.get('SchoolId');
    const periodParam = searchParams.get('period');
    const schoolId = schoolIdParam ? parseInt(schoolIdParam, 10) : null;
    const period = periodParam || undefined;

    // 查詢參數
    const queryParams = {
        method: 'QueryChainStore',
        schoolId: schoolId!,
        key: 'storeList',
    } as const;

    // 連鎖商店數據查詢
    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['query_catering_service', ...objectToTanstackQueryKeys(queryParams)],
        queryFn: () => GetCateringService(queryParams),
        enabled: !!schoolId && !!period, // 恢復條件檢查
        select: (result) => result?.data,
    });

    // 學校詳情查詢
    const { data: schoolDetail } = useSchoolByIdQuery({ schoolId });

    // 連鎖商店點擊處理函數
    const handleChainStoresClick = useCallback(
        (chainStores: Store) => () => {
            onChainStoresClick?.(chainStores);
        },
        [onChainStoresClick]
    );

    // 渲染連鎖商店輪播項目
    const renderChainStoresItem = useCallback(
        (chainStores: Store) => (
            <CarouselItem key={chainStores?.storeId} className={CAROUSEL_ITEM_BASIS_CLASSES}>
                <ComposableCard
                    cardClassName="overflow-hidden p-0"
                    cardHeaderClassName="visuallyhidden"
                    cardContentClassName="p-0"
                    content={
                        <ImageCard
                            imageSrc={chainStores?.logo ?? ''}
                            imageAlt={chainStores?.storeName ?? ''}
                            title={chainStores?.storeName ?? ''}
                            onClick={handleChainStoresClick(chainStores)}
                        />
                    }
                />
            </CarouselItem>
        ),
        [handleChainStoresClick]
    );

    // 早期返回：如果必要參數不存在則不渲染
    if (!schoolId || !period) {
        return null;
    }

    // 檢查是否有連鎖商店數據
    const hasChainStoresData = Array.isArray(data) && data.length > 0;

    // 處理加載狀態
    if (isLoading) {
        return <Placeholder type="loading" />;
    }

    // 處理錯誤狀態
    if (isError) {
        return isFetching ? <Placeholder type="loading" /> : <Placeholder type="error" refetch={refetch} />;
    }

    // 渲染無數據狀態
    if (!hasChainStoresData) {
        return (
            <Placeholder
                icon={<Utensils className="h-12 w-12 text-gray-400" />}
                title="目前無連鎖商店相關資料"
                description={`學校: ${schoolDetail?.SchoolName ?? ''}, 日期: ${period ?? ''}`}
            />
        );
    }

    // 渲染連鎖商店輪播
    return (
        <section className={className}>
            <Carousel opts={CAROUSEL_OPTIONS}>
                <CarouselContent>{data?.map(renderChainStoresItem)}</CarouselContent>
                <CarouselPrevious className="-left-3" />
                <CarouselNext className="-right-3" />
            </Carousel>
        </section>
    );
};

export default ChainStoresCarousel;
