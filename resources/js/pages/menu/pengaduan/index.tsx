import { DataTable } from '@/components/datatable/data-table';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { hasRole } from '@/helpers';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Pengaduan, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useColumns } from './columns';
import ExportPengaduan from './export-pengaduan';
import Heading from '@/components/heading';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaduan',
        href: route('pengaduan.index'),
    },
];

export default function Index({ pengaduans }: { pengaduans: Pengaduan[] }) {
    const { auth } = usePage<SharedData>().props;
    const columns = useColumns();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaduan Umum" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <Card>
                    <CardContent> */}
                        <Heading title="Daftar Pengaduan" />
                        <DataTable columns={columns} data={pengaduans}>
                            {hasRole(auth.user, ['masyarakat']) && (
                                <Link href={route('pengaduan.create')}>
                                    <Button className="h-8 bg-emerald-600 transition-colors duration-300 hover:bg-emerald-700">Buat Pengaduan</Button>
                                </Link>
                            )}

                            {hasRole(auth.user, ['admin', 'kadus_1', 'kadus_2', 'kadus_3', 'kades']) && <ExportPengaduan />}
                        </DataTable>
                    {/* </CardContent>
                </Card> */}
            </div>
        </AppLayout>
    );
}
