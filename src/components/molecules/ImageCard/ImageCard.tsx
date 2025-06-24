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
}: ImageCardProps) => {
    return (
        <AspectRatio ratio={ratio} className={cn('relative', wrapperClassName)}>
            <img
                className={cn('h-full w-full object-cover select-none', imageClassName)}
                src={imageSrc}
                alt={imageAlt}
            />
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
