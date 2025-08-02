import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TemplateBerkas } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import FormFieldRenderer from './form-surat/form-field-renderer';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Props = {
    templateSurats: TemplateBerkas[];
};

type PermohonanSuratForm = {
    nomor_surat: string;
    template_surat_id: string | null;
    // path_surat: File | null;
    data_form: Record<string, any>;
};

export default function CreatePermohonanSurat({ templateSurats }: Props) {
    const [templateSurat, setTemplateSurat] = useState<TemplateBerkas | null>(null);

    const isOpenPopoverPilihSurat = useBoolean();

    const { data, setData, post, processing, errors, reset, isDirty } = useForm<PermohonanSuratForm>({
        nomor_surat: '',
        template_surat_id: null,
        // path_surat: null,
        data_form: {},
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('permohonan-surat.store'), {
            onSuccess: () => {
                toast.success('Permohonan surat berhasil dibuat.')
                reset();
            },
            onError: () => {
                toast.error('Gagal membuat permohonan surat.');
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Permohonan Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={submit}>
                    <Card className="w-full max-w-3xl">
                        <CardHeader>
                            <CardTitle>Buat Permohonan Surat</CardTitle>
                            <CardDescription>Silakan isi form untuk membuat permohonan surat.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Popover open={isOpenPopoverPilihSurat.state} onOpenChange={isOpenPopoverPilihSurat.setState}>
                                <Label>Surat</Label>
                                <PopoverTrigger asChild>
                                    <Button variant={'outline'} className="flex w-full justify-between">
                                        {templateSurat ? templateSurats.find((surat) => surat.id === templateSurat.id)?.nama_berkas : 'Pilih Surat'}
                                        <ChevronDown className="size-3" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="popover-content-width-same-as-its-trigger p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Cari judul surat" />
                                        <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                                        <CommandList>
                                            {templateSurats.map((template) => (
                                                <CommandItem
                                                    key={template.id}
                                                    onSelect={() => {
                                                        setTemplateSurat(template);
                                                        setData('template_surat_id', template.id);
                                                        isOpenPopoverPilihSurat.setFalse();
                                                    }}
                                                >
                                                    {template.nama_berkas}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {templateSurat && (
                                <FormFieldRenderer
                                    data={data.data_form}
                                    fields={templateSurat.form_fields}
                                    setData={(key, value) => setData('data_form', { ...data.data_form, [key]: value })}
                                    errors={errors}
                                />
                            )}
                            <CardFooter className='p-0 flex justify-end'>
                                <Button type='submit'>Submit</Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
