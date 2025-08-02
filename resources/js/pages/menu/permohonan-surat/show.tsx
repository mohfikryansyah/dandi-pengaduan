import Heading from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getFileIcon, hasRole, strLimit } from '@/helpers';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PermohonanSurat, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DetailPermohonanSurat from './detail-permohonan-surat';
import AksiAdminPermohonanSurat from './form-surat/aksi-admin-permohonan-surat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Props = {
    permohonanSurat: PermohonanSurat; // Adjust type as necessary
};

export default function ShowPermohonanSurat({ permohonanSurat }: Props) {
    const { auth } = usePage<SharedData>().props;

    const [isDone, setIsDone] = useState(permohonanSurat.status === 'Disetujui' ? true : false);

    console.log(isDone);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Permohonan Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title={`${permohonanSurat.judul_surat}`} />
                <div className="grid-cols-5 gap-4 md:grid">
                    <Card className="col-span-3 max-h-fit">
                        <CardHeader>
                            <CardTitle>Data Permohonan</CardTitle>
                            <CardDescription>Periksa kembali data pemohon yang telah diisi berdasarkan template surat yang dipilih.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    {permohonanSurat.template_surat.form_fields.map((field) => (
                                        <TableRow>
                                            <TableCell key={field.name}>{field.label}</TableCell>
                                            <TableCell className="font-medium">{permohonanSurat.data_form?.[field.name]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <div className="col-span-2 space-y-4">
                        <DetailPermohonanSurat permohonanSurat={permohonanSurat} />
                        <Card>
                            <CardContent>
                                <div>
                                    <h2 className="mb-2 text-sm font-semibold text-gray-700">📎 Lampiran</h2>
                                    <div className="max-w-fit">
                                        {permohonanSurat.path_surat ? (
                                            <div
                                                className="flex items-center gap-2 rounded-md border bg-white p-2 transition hover:shadow-sm"
                                                key={permohonanSurat.id}
                                                title={permohonanSurat.judul_surat}
                                            >
                                                <img src={getFileIcon(permohonanSurat.path_surat)} alt="" className="size-7" />
                                                <a
                                                    href={`/storage/${permohonanSurat.path_surat}`}
                                                    className="text-sm text-blue-600 hover:underline"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                >
                                                    {strLimit(permohonanSurat.judul_surat, 50)}
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground text-sm italic">Tidak ada lampiran</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {permohonanSurat.status === 'Disetujui' && isDone === true ? (
                            <span className="text-sm font-medium text-gray-400">
                                Permohonan Surat Selesai.{' '}
                                <span onClick={() => setIsDone(false)} className="text-blue-400 hover:cursor-pointer hover:underline">
                                    Klik disini
                                </span>{' '}
                                jika ada perubahan
                            </span>
                        ) : (
                            isDone === false &&
                            hasRole(auth.user, ['admin']) && (
                                <Card className="col-span-1">
                                    <CardHeader>
                                        <CardTitle>Aksi</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <AksiAdminPermohonanSurat permohonanSurat={permohonanSurat} />
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
