import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    return (
        <>
            <header className="sticky top-0 right-0 left-0 z-50 flex h-12 items-center justify-between border-b border-purple-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto flex items-center justify-between">
                    <h1>Edu Eats</h1>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default DefaultLayout;
