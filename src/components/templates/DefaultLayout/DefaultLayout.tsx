import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-5 md:px-0">
                <Outlet />
            </main>
        </>
    );
};

export default DefaultLayout;
