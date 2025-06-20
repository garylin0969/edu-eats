import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { cn } from '@/utils/shadcn';

const ThemeSwitch = () => {
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => {
        if (theme === 'system') {
            setTheme(systemTheme === 'dark' ? 'dark' : 'light');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [systemTheme]);

    return (
        <SwitchPrimitive.Root
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            className={cn(
                'peer focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                theme === 'dark' ? 'bg-slate-500' : 'bg-slate-200'
            )}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    'pointer-events-none flex h-5 w-5 items-center justify-center rounded-full border shadow-lg ring-0 transition-transform',
                    theme === 'dark'
                        ? 'translate-x-5 border-slate-500 bg-slate-800'
                        : 'translate-x-0 border-transparent bg-purple-600'
                )}
            >
                {theme === 'dark' ? <Moon className="h-3 w-3 text-white" /> : <Sun className="h-3 w-3 text-white" />}
            </SwitchPrimitive.Thumb>
            <span className="sr-only">Switch theme</span>
        </SwitchPrimitive.Root>
    );
};

export default ThemeSwitch;
