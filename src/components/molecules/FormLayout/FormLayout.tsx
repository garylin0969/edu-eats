import { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GroupProps {
    children: ReactNode;
    className?: string;
    as?: ElementType;
}

const Group = ({ children, className, as: Component = 'div' }: GroupProps) => {
    return <Component className={cn('mb-4 w-full', className)}>{children}</Component>;
};

// Row 元件用於橫向排列
interface RowProps {
    children: ReactNode;
    className?: string;
}

const Row = ({ children, className }: RowProps) => {
    return <div className={cn('flex flex-wrap', className)}>{children}</div>;
};

// Col 元件用於控制寬度
interface ColProps {
    children: ReactNode;
    className?: string;
    sm?: string;
    md?: string;
    lg?: string;
}

const Col = ({ children, className, sm, md, lg }: ColProps) => {
    const getColClass = (size: string, breakpoint: 'sm' | 'md' | 'lg') => {
        // 使用靜態類名映射，避免動態生成導致的 Tailwind JIT 問題
        const classMap: Record<'sm' | 'md' | 'lg', Record<string, string>> = {
            sm: {
                '12': 'sm:w-full',
                '6': 'sm:w-1/2',
                '5': 'sm:w-5/12',
                '4': 'sm:w-1/3',
                '3': 'sm:w-1/4',
                '2': 'sm:w-1/6',
                '1': 'sm:w-1/12',
            },
            md: {
                '12': 'md:w-full',
                '6': 'md:w-1/2',
                '5': 'md:w-5/12',
                '4': 'md:w-1/3',
                '3': 'md:w-1/4',
                '2': 'md:w-1/6',
                '1': 'md:w-1/12',
            },
            lg: {
                '12': 'lg:w-full',
                '6': 'lg:w-1/2',
                '5': 'lg:w-5/12',
                '4': 'lg:w-1/3',
                '3': 'lg:w-1/4',
                '2': 'lg:w-1/6',
                '1': 'lg:w-1/12',
            },
        };

        return classMap[breakpoint]?.[size] || `${breakpoint}:w-full`;
    };

    const colClasses = cn(
        'px-2 w-full mb-2',
        sm && getColClass(sm, 'sm'),
        md && getColClass(md, 'md'),
        lg && getColClass(lg, 'lg'),
        className
    );

    return <div className={colClasses}>{children}</div>;
};

export { Group, Row, Col };
