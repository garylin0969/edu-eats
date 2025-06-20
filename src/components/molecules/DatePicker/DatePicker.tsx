import { ChevronDownIcon } from 'lucide-react';
import { FieldValues, UseFormReturn, Path, ControllerRenderProps } from 'react-hook-form';
import { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { FormField } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps<T extends FieldValues> {
    className?: string;
    name: Path<T>;
    placeholder?: string;
    form: UseFormReturn<T>;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    onChange?: (value: Date | undefined) => void;
}

const DatePicker = <T extends FieldValues>({
    className,
    name,
    placeholder = 'Select date',
    form,
    disabled,
    minDate,
    maxDate,
    onChange,
}: DatePickerProps<T>) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    // 使用 useCallback 優化日期變更處理函數
    const handleDateChange = useCallback(
        (newDate: Date | undefined, field: ControllerRenderProps<T, Path<T>>) => {
            field.onChange(newDate);
            setOpen(false);
            onChange?.(newDate);
        },
        [onChange]
    );

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div className={cn('flex w-full flex-col gap-3', className)}>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                ref={buttonRef}
                                variant="outline"
                                id="date"
                                disabled={disabled}
                                onBlur={field.onBlur}
                                className="hover:text-foreground w-full justify-between font-normal"
                            >
                                {field.value ? new Date(field.value).toLocaleDateString() : placeholder}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0 dark:bg-slate-800" align="center">
                            <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                captionLayout="dropdown"
                                disabled={(date) => {
                                    if (minDate && date < minDate) return true;
                                    if (maxDate && date > maxDate) return true;
                                    return false;
                                }}
                                classNames={{
                                    today: 'bg-accent dark:bg-slate-700 text-accent-foreground rounded-md data-[selected=true]:rounded-none',
                                }}
                                components={{
                                    DayButton: ({ ...props }) => {
                                        return (
                                            <CalendarDayButton
                                                {...props}
                                                className="dark:data-[range-end=true]:bg-primary dark:data-[range-start=true]:bg-primary dark:data-[selected-single=true]:bg-primary data-[range-end=true]:bg-[#9333eacc] data-[range-start=true]:bg-[#9333eacc] data-[selected-single=true]:bg-[#9333eacc] dark:hover:!bg-slate-700"
                                            />
                                        );
                                    },
                                }}
                                onSelect={(date) => handleDateChange(date, field)}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        />
    );
};

export default DatePicker;
