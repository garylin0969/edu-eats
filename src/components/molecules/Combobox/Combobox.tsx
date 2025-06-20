import { Check, ChevronsUpDown } from 'lucide-react';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormField } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ComboboxOption {
    value: string;
    label: string;
}

interface ComboboxProps<T extends FieldValues> {
    className?: string;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    form: UseFormReturn<T>;
    options?: ComboboxOption[];
    disabled?: boolean;
}

const Combobox = <T extends FieldValues>({
    className,
    name,
    label = 'label',
    placeholder = 'Select ...',
    form,
    options = [],
    disabled,
}: ComboboxProps<T>) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const handleValueChange = (newValue: string) => {
                    const finalValue = newValue === field.value ? '' : newValue;
                    field.onChange(finalValue);
                    setOpen(false);
                };

                return (
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
                                    {field.value
                                        ? options?.find((option: ComboboxOption) => option?.value === field.value)
                                              ?.label
                                        : placeholder}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" style={{ width: buttonRef?.current?.clientWidth }}>
                                <Command className="dark:bg-slate-800">
                                    <CommandInput className="h-9" placeholder={`Search ${label}...`} />
                                    <CommandList>
                                        <CommandEmpty>No {label} found.</CommandEmpty>
                                        <CommandGroup>
                                            {options?.map((option: ComboboxOption) => (
                                                <CommandItem
                                                    key={option.value}
                                                    className="hover:!text-foreground data-[selected=true]:text-foreground hover:!bg-slate-100 data-[selected=true]:bg-transparent dark:hover:!bg-slate-700"
                                                    value={option?.value}
                                                    onSelect={() => handleValueChange(option?.value)}
                                                >
                                                    {option?.label}
                                                    <Check
                                                        className={cn(
                                                            'ml-auto',
                                                            field.value === option?.value ? 'opacity-100' : 'opacity-0'
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
                );
            }}
        />
    );
};

export default Combobox;
