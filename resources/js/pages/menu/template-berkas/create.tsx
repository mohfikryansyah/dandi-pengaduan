import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { listJudulSurat } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

import { BreadcrumbItem, TemplateBerkas as TypeTemplateBerkas } from '@/types';
import FormTemplateBerkas from './form-template-berkas';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type TemplateBerkasForm = {
    nama_berkas: string;
    path: File | null;
};

export default function CreateTemplateBerkas() {
    const { templateBerkas } = usePage<{ templateBerkas: TypeTemplateBerkas[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Template Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Form Template Surat</CardTitle>
                        <CardDescription>Silakan unggah template surat.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTemplateBerkas templateBerkas={templateBerkas}/>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
