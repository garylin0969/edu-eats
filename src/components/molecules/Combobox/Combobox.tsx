import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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

interface ComboboxProps {
    className?: string;
    label?: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
}

const Combobox = ({
    className,
    label = 'label',
    placeholder = 'Select ...',
    options = exampleOptions,
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    return (
        <div className={cn('w-full', className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                        {value ? options.find((option) => option.value === value)?.label : placeholder}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command className="dark:bg-slate-800">
                        <CommandInput className="h-9" placeholder={`Search ${label}...`} />
                        <CommandList>
                            <CommandEmpty>No {label} found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        className="hover:!text-foreground data-[selected=true]:text-foreground hover:!bg-slate-100 data-[selected=true]:bg-transparent dark:hover:!bg-slate-700"
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? '' : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option.value ? 'opacity-100' : 'opacity-0'
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
};

export default Combobox;
