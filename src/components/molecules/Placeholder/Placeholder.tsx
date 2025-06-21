import { Loader2, FileX, AlertCircle, Package } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/utils/shadcn';

interface PlaceholderProps {
    type?: 'loading' | 'empty' | 'error' | 'custom';
    icon?: ReactNode;
    title?: string;
    description?: string;
    className?: string;
    iconClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

// 默認配置
const defaultConfigs = {
    loading: {
        icon: <Loader2 className="text-primary h-12 w-12 animate-spin" />,
        title: '載入中...',
        description: '請稍候，正在處理您的請求',
        iconClassName: 'bg-primary/10',
    },
    empty: {
        icon: <Package className="text-muted-foreground h-12 w-12" />,
        title: '暫無資料',
        description: '目前沒有可顯示的內容',
        iconClassName: 'bg-muted/50',
    },
    error: {
        icon: <AlertCircle className="text-destructive h-12 w-12" />,
        title: '出現錯誤',
        description: '載入時發生問題，請稍後再試',
        iconClassName: 'bg-destructive/10',
    },
    custom: {
        icon: <FileX className="text-muted-foreground h-12 w-12" />,
        title: '自定義內容',
        description: '',
        iconClassName: 'bg-muted/50',
    },
};

const Placeholder = ({
    type = 'custom',
    icon,
    title,
    description,
    className,
    iconClassName,
    titleClassName,
    descriptionClassName,
}: PlaceholderProps) => {
    const config = defaultConfigs[type];

    // 使用傳入的值或默認值
    const finalIcon = icon ?? config.icon;
    const finalTitle = title ?? config.title;
    const finalDescription = description ?? config.description;

    return (
        <section className={cn('flex flex-col items-center justify-center py-12', className)}>
            <div className="max-w-md space-y-4 text-center">
                {/* 圖標 */}
                <div
                    className={cn(
                        'mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full',
                        config.iconClassName,
                        iconClassName
                    )}
                >
                    {finalIcon}
                </div>
                {/* 主標題 */}
                <h3 className={cn('text-foreground text-xl font-semibold', titleClassName)}>{finalTitle}</h3>
                {/* 描述 */}
                {finalDescription && (
                    <p className={cn('text-muted-foreground', descriptionClassName)}>{finalDescription}</p>
                )}
            </div>
        </section>
    );
};

export default Placeholder;
