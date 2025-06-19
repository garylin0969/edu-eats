import DatePicker from '@/components/molecules/DatePicker';
import { Button } from '@/components/ui/button';

const Home = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Hello World</h1>
            <DatePicker />
            <Button>Click me</Button>
        </div>
    );
};

export default Home;
