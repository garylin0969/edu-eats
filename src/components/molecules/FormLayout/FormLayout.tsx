import { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/shadcn';

interface GroupProps {
    children: ReactNode;
    className?: string;
    as?: ElementType;
}

const Group = ({ children, className, as: Component = 'div' }: GroupProps) => {
    return <Component className={cn('w-full', className)}>{children}</Component>;
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
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
}

const Col = ({ children, className, xs, sm, md, lg }: ColProps) => {
    const getColClass = (size: string, breakpoint: 'xs' | 'sm' | 'md' | 'lg') => {
        // 使用靜態類名映射，避免動態生成導致的 Tailwind JIT 問題
        const classMap: Record<'xs' | 'sm' | 'md' | 'lg', Record<string, string>> = {
            xs: {
                '12': 'w-full',
                '11': 'w-11/12',
                '10': 'w-10/12',
                '9': 'w-9/12',
                '8': 'w-8/12',
                '7': 'w-7/12',
                '6': 'w-1/2',
                '5': 'w-5/12',
                '4': 'w-1/3',
                '3': 'w-1/4',
                '2': 'w-1/6',
                '1': 'w-1/12',
            },
            sm: {
                '12': 'sm:w-full',
                '11': 'sm:w-11/12',
                '10': 'sm:w-10/12',
                '9': 'sm:w-9/12',
                '8': 'sm:w-8/12',
                '7': 'sm:w-7/12',
                '6': 'sm:w-1/2',
                '5': 'sm:w-5/12',
                '4': 'sm:w-1/3',
                '3': 'sm:w-1/4',
                '2': 'sm:w-1/6',
                '1': 'sm:w-1/12',
            },
            md: {
                '12': 'md:w-full',
                '11': 'md:w-11/12',
                '10': 'md:w-10/12',
                '9': 'md:w-9/12',
                '8': 'md:w-8/12',
                '7': 'md:w-7/12',
                '6': 'md:w-1/2',
                '5': 'md:w-5/12',
                '4': 'md:w-1/3',
                '3': 'md:w-1/4',
                '2': 'md:w-1/6',
                '1': 'md:w-1/12',
            },
            lg: {
                '12': 'lg:w-full',
                '11': 'lg:w-11/12',
                '10': 'lg:w-10/12',
                '9': 'lg:w-9/12',
                '8': 'lg:w-8/12',
                '7': 'lg:w-7/12',
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
        'px-2 mb-2 md:mb-4 w-full',
        xs && getColClass(xs, 'xs'),
        sm && getColClass(sm, 'sm'),
        md && getColClass(md, 'md'),
        lg && getColClass(lg, 'lg'),
        className
    );

    return <div className={colClasses}>{children}</div>;
};

export { Group, Row, Col };
