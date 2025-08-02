import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Pengaduan, PermohonanSurat, SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns } from '../columns';
import { columns as columnsPermohonanSurat } from '../../permohonan-surat/columns';
import Chart, { ChartData } from './chart';
import { hasRole } from '@/helpers';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    countAllPengaduan: number;
    countPengaduanDiajukan: number;
    countPengaduanDiproses: number;
    countPengaduanSelesai: number;
    chartData: ChartData[];
    pengaduanTervalidasi: Pengaduan[];

    countAllSurat: number;
    countSuratPending: number;
    countSuratDisetujui: number;
    countSuratDitolak: number;
    suratTervalidasi: PermohonanSurat[];
}

export default function Dashboard({
    countAllPengaduan,
    countPengaduanDiajukan,
    countPengaduanDiproses,
    countPengaduanSelesai,
    chartData,
    pengaduanTervalidasi,

    countAllSurat,
    countSuratPending,
    countSuratDisetujui,
    countSuratDitolak,
    suratTervalidasi,
}: Props) {
    console.log(chartData);

    const DataPengaduanForChart = chartData.map((data) => ({
        month: data.month,
        pengaduan: Number(data.pengaduan),
        surat: Number(data.surat),
    }));

    const DataTotalPengaduan = [
        {
            title: 'Total Pengaduan',
            description: 'Jumlah keseluruhan pengaduan',
            value: countAllPengaduan,
        },
        {
            title: 'Total Pengaduan Diajukan',
            description: 'Jumlah keseluruhan pengaduan yang diajukan',
            value: countPengaduanDiajukan,
        },
        {
            title: 'Total Pengaduan Diproses',
            description: 'Jumlah keseluruhan pengaduan yang diproses',
            value: countPengaduanDiproses,
        },
        {
            title: 'Total Pengaduan Selesai',
            description: 'Jumlah keseluruhan pengaduan yang telah selesai',
            value: countPengaduanSelesai,
        },
    ];

    const DataTotalSurat = [
        {
            title: 'Total Permohonan Surat',
            description: 'Jumlah keseluruhan permohonan surat',
            value: countAllSurat,
        },
        {
            title: 'Permohonan Surat Pending',
            description: 'Jumlah permohonan surat yang masih menunggu proses',
            value: countSuratPending,
        },
        {
            title: 'Permohonan Surat Disetujui',
            description: 'Jumlah permohonan surat yang telah disetujui',
            value: countSuratDisetujui,
        },
        {
            title: 'Permohonan Surat Ditolak',
            description: 'Jumlah permohonan surat yang ditolak',
            value: countSuratDitolak,
        },
    ];

    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {DataTotalPengaduan.map((data, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{data.title}</CardTitle>
                                <CardDescription>{data.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h1 className="text-xl font-bold tracking-tight">{data.value}</h1>
                            </CardContent>
                        </Card>
                    ))}
                    {DataTotalSurat.map((data, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{data.title}</CardTitle>
                                <CardDescription>{data.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h1 className="text-xl font-bold tracking-tight">{data.value}</h1>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex gap-4">
                    <div className="w-full max-w-lg">
                        <Chart chartData={DataPengaduanForChart}></Chart>
                    </div>
                    <div className="w-full space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Pengaduan Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DataTable data={pengaduanTervalidasi} columns={columns}></DataTable>
                            </CardContent>
                        </Card>
                        {hasRole(auth.user, ['admin', 'kades', 'masyarakat']) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Permohonan Surat Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DataTable data={suratTervalidasi} columns={columnsPermohonanSurat}></DataTable>
                            </CardContent>
                        </Card>

                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
