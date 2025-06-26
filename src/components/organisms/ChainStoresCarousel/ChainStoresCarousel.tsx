import { useQuery } from '@tanstack/react-query';
import { Utensils } from 'lucide-react';
import { useMemo, useCallback } from 'react';
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
};

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

    // 從 URL 參數中獲取 SchoolId 和 period
    const schoolIdParam = searchParams.get('SchoolId');
    const periodParam = searchParams.get('period');

    // 轉換參數類型
    const schoolId = schoolIdParam ? parseInt(schoolIdParam, 10) : null;
    const period = periodParam || undefined;

    // 查詢參數
    const CATERING_SERVICE_QUERY_PARAMS = {
        method: 'QueryChainStore',
        schoolId: schoolId!,
        key: 'storeList',
    } as const;

    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: ['query_catering_service', ...objectToTanstackQueryKeys(CATERING_SERVICE_QUERY_PARAMS)],
        queryFn: () => GetCateringService(CATERING_SERVICE_QUERY_PARAMS),
        enabled: !!schoolId || !!period,
        select: (result) => result?.data,
    });

    // 學校查詢 - 當 URL 中存在 SchoolId 時自動調用
    const { data: schoolDetail } = useSchoolByIdQuery({ schoolId });

    // 記憶化連鎖商店點擊處理函數
    const handleChainStoresClick = useCallback(
        (chainStores: Store) => () => {
            onChainStoresClick?.(chainStores);
        },
        [onChainStoresClick]
    );

    // 記憶化連鎖商店數據檢查
    const hasChainStoresData = useMemo(() => {
        return Array.isArray(data) && data.length > 0;
    }, [data]);

    // 記憶化無數據時的提示信息
    const noDataDescription = useMemo(() => {
        return `學校: ${schoolDetail?.SchoolName ?? ''}, 日期: ${period ?? ''}`;
    }, [schoolDetail?.SchoolName, period]);

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

    // 渲染連鎖商店輪播內容
    const renderCarouselContent = useCallback(
        () => (
            <section className={className}>
                <Carousel opts={CAROUSEL_OPTIONS}>
                    <CarouselContent>{data?.map(renderChainStoresItem)}</CarouselContent>
                    <CarouselPrevious className="-left-3" />
                    <CarouselNext className="-right-3" />
                </Carousel>
            </section>
        ),
        [className, data, renderChainStoresItem]
    );

    // 渲染無數據佔位符
    const renderNoDataPlaceholder = useCallback(
        () => (
            <Placeholder
                icon={<Utensils className="h-12 w-12 text-gray-400" />}
                title="目前無連鎖商店相關資料"
                description={noDataDescription}
            />
        ),
        [noDataDescription]
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

    // 根據是否有連鎖商店數據渲染相應內容
    return hasChainStoresData ? renderCarouselContent() : renderNoDataPlaceholder();
};

export default ChainStoresCarousel;
