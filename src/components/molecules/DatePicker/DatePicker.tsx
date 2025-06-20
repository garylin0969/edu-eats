import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
    placeholder?: string;
}

const DatePicker = ({ placeholder = 'Select date' }: DatePickerProps) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                        {date ? date.toLocaleDateString() : placeholder}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0 dark:bg-slate-800" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                        components={{
                            DayButton: ({ ...props }) => {
                                return (
                                    <CalendarDayButton
                                        {...props}
                                        className="dark:data-[range-end=true]:bg-primary dark:data-[range-start=true]:bg-primary dark:data-[selected-single=true]:bg-primary data-[range-end=true]:bg-[#9333eacc] data-[range-start=true]:bg-[#9333eacc] data-[selected-single=true]:bg-[#9333eacc]"
                                    />
                                );
                            },
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;
