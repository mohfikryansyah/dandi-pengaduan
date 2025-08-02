import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PermohonanSurat } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './columns';
import Heading from '@/components/heading';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Props = {
    permohonanSurats: PermohonanSurat[];
};

export default function IndexPermohonanSurat({ permohonanSurats }: Props) {

    console.log('permohonanSurats', permohonanSurats);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permohonan Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title='Daftar Permohonan Surat'/>
                <DataTable columns={columns} data={permohonanSurats}>
                    <Link href={route('permohonan-surat.create')}>
                        <Button variant={'default'} className="h-8">
                            Buat Surat
                        </Button>
                    </Link>
                </DataTable>
            </div>
        </AppLayout>
    );
}
