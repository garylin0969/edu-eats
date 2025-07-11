import Logo from '@/components/atoms/Logo';
import ThemeSwitch from '@/components/atoms/ThemeSwitch';
import HamburgerMenu from '@/components/molecules/HamburgerMenu';

const Header = () => {
    return (
        <header className="sticky top-0 right-0 left-0 z-50 flex h-12 items-center justify-between border-b border-purple-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-transparent dark:bg-transparent dark:shadow-sm dark:shadow-white/10">
            <div className="container mx-auto flex h-full items-center justify-between px-5 md:px-0">
                <div className="flex items-center gap-2">
                    <Logo />
                    <h1 className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-lg font-bold text-transparent dark:from-pink-400 dark:via-purple-300 dark:to-cyan-300">
                        Edu Eats
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitch />
                    <HamburgerMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
