import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { GetCounty } from '@/api/form-api';
import Combobox from '@/components/molecules/Combobox';
import CustomForm from '@/components/molecules/CustomForm';
import DatePicker from '@/components/molecules/DatePicker';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const Home = () => {
    const form = useForm();
    const { watch } = form;

    console.log(watch());

    const { data: countyData } = useQuery({
        queryKey: ['county'],
        queryFn: GetCounty,
        select: (result) => result?.data,
    });

    const countyOptions = countyData?.map((item) => ({
        label: item.County ?? '',
        value: item.CountyId?.toString() ?? '',
    }));

    return (
        <div className="flex min-h-[calc(100vh-48px)] w-full flex-col items-center justify-center space-y-4">
            <h2 className="text-4xl font-bold">Hello World</h2>

            <Form {...form}>
                <form className="md:w-2/3">
                    <CustomForm.Group as={CustomForm.Row}>
                        <CustomForm.Col lg="6">
                            <Combobox form={form} name="CountyId" placeholder="縣市" options={countyOptions} />
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
