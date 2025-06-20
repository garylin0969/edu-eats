import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export default ThemeToggle;
