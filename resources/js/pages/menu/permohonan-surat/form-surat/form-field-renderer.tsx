import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

type Field = {
    label: string;
    name: string;
    type: string;
    required?: boolean;
};

type Props = {
    fields: Field[];
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string | undefined>;
};

export default function FormFieldRenderer({ fields, data, setData, errors }: Props) {
    console.log('tes', errors, 'fields', fields);
    return (
        <div className="grid gap-2">
            {fields.map((field) => {
                return (
                    <div key={field.name}>
                        <Label htmlFor={field.name}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </Label>

                        {field.type === 'date' ? (
                            <>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full bg-transparent pl-3 text-left font-normal',
                                                !data[field.name] && 'text-muted-foreground',
                                            )}
                                        >
                                            {data[field.name] ? format(data[field.name], 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            required
                                            selected={data[field.name]}
                                            onSelect={(date) => {
                                                const dateFormatted = date ? format(date, 'yyyy-MM-dd', { locale: id }) : null;
                                                setData(field.name, dateFormatted);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors?.[`data_form.${field.name}`]} />
                            </>
                        ) : (
                            <>
                                <Input
                                    id={field.name}
                                    type={field.type}
                                    value={data[field.name] || ''}
                                    onChange={(e) => setData(field.name, e.target.value)}
                                    required={field.required}
                                />
                                <InputError message={errors?.[`data_form.${field.name}`]} />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
