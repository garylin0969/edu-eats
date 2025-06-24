import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageCardProps {
    className?: string;
    imageSrc: string;
    imageAlt?: string;
    title: string;
}

/**
 * 圖片卡片 - 帶有底部標題覆蓋的圖片卡片
 */
const ImageCard = ({ className, imageSrc, imageAlt = '', title }: ImageCardProps) => {
    return (
        <AspectRatio ratio={1} className={`relative ${className || ''}`}>
            <img className="h-full w-full object-cover select-none" src={imageSrc} alt={imageAlt} />
            <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
                <p className="truncate text-sm font-medium">{title}</p>
            </div>
        </AspectRatio>
    );
};

export default ImageCard;
