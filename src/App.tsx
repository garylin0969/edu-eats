import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import DefaultLayout from './components/templates/DefaultLayout';

const Home = lazy(() => import('@/components/pages/Home'));
// API Docs - 只在開發環境中載入
const Swagger = import.meta.env.DEV ? lazy(() => import('@/components/pages/Swagger')) : null;

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

// 根據環境動態建立路由
const routeChildren = [
    {
        index: true,
        element: <Home />,
    },
    // 只在開發環境中添加 swagger 路由
    ...(import.meta.env.DEV && Swagger
        ? [
              {
                  path: 'swagger',
                  element: <Swagger />,
              },
          ]
        : []),
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: routeChildren,
    },
]);

function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
