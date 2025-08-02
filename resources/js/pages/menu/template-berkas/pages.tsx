import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TemplateBerkas as TypeTemplateBerkas } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from './columns';
import Heading from '@/components/heading';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function TemplateBerkas() {
    const { templateBerkas } = usePage<{ templateBerkas: TypeTemplateBerkas[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template Berkas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title='Daftar Template Surat'/>
                <DataTable columns={columns} data={templateBerkas}>
                    <Link href={route('template-berkas.create')}>
                        <Button className="h-8">Unggah Surat</Button>
                    </Link>
                </DataTable>
            </div>
        </AppLayout>
    );
}
