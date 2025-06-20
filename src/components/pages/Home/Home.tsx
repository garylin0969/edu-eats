import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { GetCounty, CountyOption } from '@/api/form-api';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const Home = () => {
    const form = useForm();

    const { data: countyData } = useQuery({
        queryKey: ['county'],
        queryFn: GetCounty,
        select: (result) => result?.data,
    });

    // 使用 useMemo 緩存 countyOptions，避免每次渲染都重新計算
    const countyOptions: CountyOption[] = useMemo(() => {
        return (
            countyData?.map((item) => ({
                label: item.County ?? '',
                value: item.CountyId?.toString() ?? '',
            })) ?? []
        );
    }, [countyData]);

    return (
        <div className="flex min-h-[calc(100vh-48px)] w-full flex-col items-center justify-center space-y-4">
            <h2 className="text-4xl font-bold">Hello World</h2>

            <Form {...form}>
                <form className="md:w-2/3">
                    <FormLayout.Group as={FormLayout.Row}>
                        <FormLayout.Col lg="6">
                            <Combobox form={form} name="CountyId" placeholder="縣市" options={countyOptions} />
                        </FormLayout.Col>
                        <FormLayout.Col lg="6">
                            <DatePicker form={form} name="date" />
                        </FormLayout.Col>
                    </FormLayout.Group>
                </form>
            </Form>

            <Button>Click me</Button>
        </div>
    );
};

export default Home;
