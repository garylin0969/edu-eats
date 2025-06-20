import { cn } from '@/utils/shadcn';

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
    return <img src="/favicon/favicon.ico" alt="Edu Eats Logo" className={cn('h-8 w-8', className)} />;
};

export default Logo;
