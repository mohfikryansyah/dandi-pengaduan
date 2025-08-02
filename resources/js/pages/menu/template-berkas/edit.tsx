import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { listJudulSurat } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Template Berkas',
        href: ' /template-berkas',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

type TemplateBerkas = {
    id: number;
    nama_berkas: string;
    path: string;
};

type Props = {
    templateBerkas: TemplateBerkas;
};

export default function EditTemplateBerkas({ templateBerkas }: Props) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        nama_berkas: templateBerkas.nama_berkas,
        path: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('template-berkas.update', templateBerkas), {
            onSuccess: () => {
                toast.success('Template berkas berhasil diperbarui!');
            },
            onError: () => {
                toast.error('Gagal memperbarui template berkas.');
            },
        });
    };
    const isOpenPopoverJudulSurat = useBoolean();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Template Berkas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Edit Template Surat</CardTitle>
                        <CardDescription>
                            Kamu bisa mengganti nama atau mengunggah file baru. File sebelumnya akan diganti jika kamu upload file baru.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Judul Surat</Label>
                                <Popover open={isOpenPopoverJudulSurat.state} onOpenChange={isOpenPopoverJudulSurat.setState}>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'} className="flex justify-between">
                                            {data.nama_berkas ? data.nama_berkas : 'Pilih Judul Surat'}
                                            <ChevronDown className="size-3" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content-width-same-as-its-trigger p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Cari judul surat" />
                                            <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                                            <CommandList>
                                                {listJudulSurat
                                                    .filter((item) => templateBerkas.nama_berkas !== item.label)
                                                    .map((item) => (
                                                        <CommandItem
                                                            key={item.value}
                                                            onSelect={() => {
                                                                setData('nama_berkas', item.label);
                                                                toast.success(`"${item.label}" dipilih.`);
                                                                isOpenPopoverJudulSurat.setFalse();
                                                            }}
                                                        >
                                                            {item.label}
                                                        </CommandItem>
                                                    ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.nama_berkas && <p className="text-sm text-red-500">{errors.nama_berkas}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Upload File Baru (tidak wajib)</Label>
                                <Input type="file" onChange={(e) => setData('path', e.target.files?.[0] ?? null)} />
                                {errors.path && <p className="text-sm text-red-500">{errors.path}</p>}
                            </div>
                            <Button type="submit" disabled={processing || !isDirty}>
                                Simpan Perubahan
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
