import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('@/components/pages/Home'));
const Swagger = lazy(() => import('@/components/pages/Swagger')); // API Docs

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;
const THIRTY_SECONDS_IN_MS = 30 * 60 * 1000;
const MAX_RETRIES = 1;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: TEN_MINUTES_IN_MS,
            gcTime: TEN_MINUTES_IN_MS,
            retry: MAX_RETRIES,
            refetchInterval: THIRTY_SECONDS_IN_MS,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});
const router = createBrowserRouter([
    {
        path: '/',
        // element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'swagger',
                element: <Swagger />,
            },
        ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
