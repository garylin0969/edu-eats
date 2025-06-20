import { useForm } from 'react-hook-form';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCounty } from '@/hooks';
import { formatDate } from '@/utils/date';

const Home = () => {
    const form = useForm();
    const { countyOptions } = useCounty(); // 縣市選項

    const { watch } = form;
    console.log(watch());

    return (
        <div className="min-h-[calc(100vh-48px)] w-full">
            <section className="my-5">
                <Form {...form}>
                    <form className="w-full">
                        <FormLayout.Group as={FormLayout.Row}>
                            <FormLayout.Col xs="6" md="4">
                                <Combobox form={form} name="CountyId" placeholder="縣市" options={countyOptions} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" md="4">
                                <Combobox form={form} name="CountyId" placeholder="區域" options={countyOptions} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="12" md="4">
                                <Combobox form={form} name="CountyId" placeholder="院所類型" options={countyOptions} />
                            </FormLayout.Col>
                        </FormLayout.Group>
                        <FormLayout.Group as={FormLayout.Row}>
                            <FormLayout.Col xs="12" lg="5">
                                <Combobox form={form} name="CountyId" placeholder="學校名稱" options={countyOptions} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" lg="5">
                                <DatePicker
                                    form={form}
                                    name="date"
                                    placeholder="日期"
                                    valueFormat={(date) => formatDate(date, 'YYYY-MM-DD')}
                                />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" lg="2">
                                <Button className="w-full">查詢</Button>
                            </FormLayout.Col>
                        </FormLayout.Group>
                    </form>
                </Form>
            </section>
        </div>
    );
};

export default Home;
