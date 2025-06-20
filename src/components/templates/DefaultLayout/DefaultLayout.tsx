import { Outlet } from 'react-router-dom';
import Logo from '@/components/atoms/Logo';
import ThemeSwitch from '@/components/atoms/ThemeSwitch';
import HamburgerMenu from '@/components/molecules/HamburgerMenu';

const DefaultLayout = () => {
    return (
        <>
            <header className="sticky top-0 right-0 left-0 z-50 flex h-12 items-center justify-between border-b border-purple-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto flex items-center justify-between px-5 md:px-0">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <h1 className="dark:text-foreground text-lg font-semibold">Edu Eats</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeSwitch />
                        <HamburgerMenu />
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default DefaultLayout;
