import { ReactNode } from 'react';
import { cn } from '@/utils/shadcn';

interface PlaceholderProps {
    icon: ReactNode;
    title: string;
    description?: string;
    className?: string;
    iconClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

const Placeholder = ({
    icon,
    title,
    description,
    className,
    iconClassName,
    titleClassName,
    descriptionClassName,
}: PlaceholderProps) => {
    return (
        <section className={cn('flex flex-col items-center justify-center', className)}>
            <div className="max-w-md space-y-4 text-center">
                {/* 圖標 */}
                <div
                    className={cn(
                        'mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full',
                        iconClassName
                    )}
                >
                    {icon}
                </div>
                {/* 主標題 */}
                <h3 className={cn('text-xl font-semibold', titleClassName)}>{title}</h3>
                {/* 描述 */}
                {description && <p className={cn(descriptionClassName)}>{description}</p>}
            </div>
        </section>
    );
};

export default Placeholder;
