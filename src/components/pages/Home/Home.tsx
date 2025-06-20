import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import { Button } from '@/components/ui/button';

const Home = () => {
    return (
        <div className="flex min-h-[calc(100vh-48px)] w-full flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Hello World</h1>
            <Combobox />
            <DatePicker />
            <Button>Click me</Button>
        </div>
    );
};

export default Home;
