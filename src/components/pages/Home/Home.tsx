import { Button } from '@/components/ui/button';

const Home = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="my-4 text-4xl font-bold">Hello World</h1>
            <Button>Click me</Button>
        </div>
    );
};

export default Home;
