import { useForm } from 'react-hook-form';
import Combobox from '@/components/molecules/Combobox';
import DatePicker from '@/components/molecules/DatePicker';
import FormLayout from '@/components/molecules/FormLayout';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCounty } from '@/hooks';
import { formatDate } from '@/utils/date';

interface FormData {
    CountyId: string;
    AreaId: string;
    SchoolType: string;
    SchoolName: string;
    date: string;
}

const formatDateValue = (date: Date) => formatDate(date, 'YYYY-MM-DD');

const defaultValues: FormData = {
    CountyId: '',
    AreaId: '',
    SchoolType: '',
    SchoolName: '',
    date: formatDate(new Date(), 'YYYY-MM-DD'), // 預設值為今天
};

const Home = () => {
    // 表單
    const form = useForm<FormData>({ defaultValues });
    const { handleSubmit } = form;

    // 縣市選項
    const { countyOptions } = useCounty();

    // 提交表單
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="min-h-[calc(100vh-68px)] w-full">
            <section className="my-5">
                <Form {...form}>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <FormLayout.Group as={FormLayout.Row}>
                            <FormLayout.Col xs="6" md="4">
                                <Combobox form={form} name="CountyId" placeholder="縣市" options={countyOptions} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" md="4">
                                <Combobox form={form} name="AreaId" placeholder="區域" options={countyOptions} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="12" md="4">
                                <Combobox
                                    form={form}
                                    name="SchoolType"
                                    placeholder="院所類型"
                                    options={countyOptions}
                                />
                            </FormLayout.Col>
                        </FormLayout.Group>
                        <FormLayout.Group as={FormLayout.Row}>
                            <FormLayout.Col xs="12" lg="5">
                                <Combobox
                                    form={form}
                                    name="SchoolName"
                                    placeholder="學校名稱"
                                    options={countyOptions}
                                />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" lg="5">
                                <DatePicker form={form} name="date" placeholder="日期" valueFormat={formatDateValue} />
                            </FormLayout.Col>
                            <FormLayout.Col xs="6" lg="2">
                                <Button className="w-full" type="submit">
                                    查詢
                                </Button>
                            </FormLayout.Col>
                        </FormLayout.Group>
                    </form>
                </Form>
            </section>
        </div>
    );
};

export default Home;
