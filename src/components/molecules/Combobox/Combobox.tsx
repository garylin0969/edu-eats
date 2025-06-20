import { Check, ChevronsUpDown } from 'lucide-react';
import { FieldValues, UseFormReturn, Path, ControllerRenderProps } from 'react-hook-form';
import { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormField } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Option } from '@/types';

interface ComboboxProps<T extends FieldValues> {
    className?: string;
    name: Path<T>;
    placeholder?: string;
    form: UseFormReturn<T>;
    options?: Option[];
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const Combobox = <T extends FieldValues>({
    className,
    name,
    placeholder = 'Select ...',
    form,
    options = [],
    disabled,
    onChange,
}: ComboboxProps<T>) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    // 使用 useCallback 優化值變更處理函數
    const handleValueChange = useCallback(
        (newValue: string, field: ControllerRenderProps<T, Path<T>>) => {
            const finalValue = newValue === field.value ? '' : newValue;
            field.onChange(finalValue);
            setOpen(false);
            onChange?.(finalValue);
        },
        [onChange]
    );

    // 使用 useMemo 緩存當前選中項的標籤
    const selectedLabel = useMemo(() => {
        return options?.find((option) => option?.value === form.watch(name))?.label || placeholder;
    }, [options, form, name, placeholder]);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div className={cn('w-full', className)}>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                ref={buttonRef}
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                disabled={disabled}
                                onBlur={field.onBlur}
                                className="hover:text-foreground w-full justify-between"
                            >
                                {selectedLabel}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" style={{ width: buttonRef?.current?.clientWidth }}>
                            <Command className="dark:bg-slate-800">
                                <CommandInput className="h-9" placeholder="Search ..." />
                                <CommandList>
                                    <CommandEmpty>Not found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                className="hover:!text-foreground data-[selected=true]:text-foreground hover:cursor-pointer hover:!bg-slate-100 data-[selected=true]:bg-transparent dark:hover:!bg-slate-700"
                                                value={option.value}
                                                onSelect={() => handleValueChange(option.value, field)}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        'ml-auto',
                                                        field.value === option.value ? 'opacity-100' : 'opacity-0'
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        />
    );
};

export default Combobox;
