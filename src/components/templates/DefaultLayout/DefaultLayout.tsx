import { Outlet } from 'react-router-dom';
import ThemeToggle from '@/components/atoms/ThemeToggle';

const DefaultLayout = () => {
    return (
        <>
            <header className="sticky top-0 right-0 left-0 z-50 flex h-12 items-center justify-between border-b border-purple-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-purple-800 dark:bg-gray-900/70 supports-[backdrop-filter]:dark:bg-gray-900/60">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Edu Eats</h1>
                    <ThemeToggle />
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default DefaultLayout;
