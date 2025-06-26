import { Utensils } from 'lucide-react';
import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/utils/shadcn';

interface ImageCardProps {
    wrapperClassName?: string;
    imageClassName?: string;
    titleClassName?: string;
    ratio?: number;
    imageSrc?: string;
    imageAlt?: string;
    title?: string;
    description?: string;
    onClick?: () => void;
    fallbackIcon?: React.ReactNode;
}

/**
 * 圖片卡片 - 帶有底部標題覆蓋的圖片卡片
 */
const ImageCard = ({
    wrapperClassName,
    imageClassName,
    titleClassName,
    ratio = 1,
    imageSrc,
    imageAlt = '',
    title,
    description,
    onClick,
    fallbackIcon,
}: ImageCardProps) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageError(false);
    };

    return (
        <AspectRatio
            ratio={ratio}
            className={cn('relative', onClick && 'cursor-pointer', wrapperClassName)}
            onClick={onClick}
        >
            {/* 圖片 */}
            {imageSrc && !imageError && (
                <img
                    className={cn('h-full w-full object-cover select-none', imageClassName)}
                    src={imageSrc}
                    alt={imageAlt}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            )}

            {/* 備用圖示 - 當圖片載入失敗或沒有提供圖片源時顯示 */}
            {(!imageSrc || imageError) && (
                <div
                    className={cn(
                        'flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800',
                        imageClassName
                    )}
                >
                    {fallbackIcon || <Utensils className="h-12 w-12 text-gray-400" />}
                </div>
            )}

            {/* 標題和描述覆蓋層 */}
            {(title || description) && (
                <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
                    {title && <p className={cn('truncate text-sm font-medium', titleClassName)}>{title}</p>}
                    {description && <p className="truncate text-xs text-gray-200">{description}</p>}
                </div>
            )}
        </AspectRatio>
    );
};

export default ImageCard;
