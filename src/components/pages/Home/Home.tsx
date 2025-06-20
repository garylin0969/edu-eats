import { useForm } from 'react-hook-form';
import Combobox from '@/components/molecules/Combobox';
import CustomForm from '@/components/molecules/CustomForm';
import DatePicker from '@/components/molecules/DatePicker';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const exampleOptions = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
];

const Home = () => {
    const form = useForm();

    const { watch } = form;

    console.log(watch());

    return (
        <div className="flex min-h-[calc(100vh-48px)] w-full flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Hello World</h1>

            <Form {...form}>
                <form className="md:w-2/3">
                    <CustomForm.Group as={CustomForm.Row}>
                        <CustomForm.Col lg="6">
                            <Combobox form={form} name="username" options={exampleOptions} />
                        </CustomForm.Col>
                        <CustomForm.Col lg="6">
                            <DatePicker form={form} name="date" />
                        </CustomForm.Col>
                    </CustomForm.Group>
                </form>
            </Form>

            <Button>Click me</Button>
        </div>
    );
};

export default Home;
