import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import Form from '@/components/molecules/Form';
import { Button } from '@/components/ui/button';

const Home = () => {
    return (
        <div className="flex min-h-[calc(100vh-48px)] w-full flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Hello World</h1>
            <Form.Group as={Form.Row} className="md:w-2/3">
                <Form.Col lg="6">
                    <Combobox />
                </Form.Col>
                <Form.Col lg="6">
                    <DatePicker />
                </Form.Col>
            </Form.Group>
            <Button>Click me</Button>
        </div>
    );
};

export default Home;
