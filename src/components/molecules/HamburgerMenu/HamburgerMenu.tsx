import { Menu, Home, User, Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const HamburgerMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Navigation menu</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                    <Button variant="ghost" className="justify-start gap-2">
                        <Home className="h-4 w-4" />
                        Home
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <User className="h-4 w-4" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                        <Info className="h-4 w-4" />
                        About
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default HamburgerMenu;
