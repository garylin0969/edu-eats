import { Outlet } from 'react-router-dom';
import ThemeSwitch from '@/components/atoms/ThemeSwitch';

const DefaultLayout = () => {
    return (
        <>
            <header className="sticky top-0 right-0 left-0 z-50 flex h-12 items-center justify-between border-b border-purple-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-transparent dark:bg-gray-900/70 supports-[backdrop-filter]:dark:bg-gray-900/60">
                <div className="container mx-auto flex items-center justify-between px-5 md:px-0">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Edu Eats</h1>
                    <ThemeSwitch />
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default DefaultLayout;
