import DetailPengaduan from '@/components/detail-pengaduan';
import Timeline from '@/components/timeline';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hasRole } from '@/helpers';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Pengaduan, SharedData, User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import AksiAdmin from './aksi-admin';
import AksiKades from './aksi-kades';
import AksiKadus from './aksi-kadus';
import FormTanggapan from './form-tanggapan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaduan',
        href: route('pengaduan.index'),
    },
    {
        title: 'Detail Pengaduan',
        href: '#',
    },
];

interface Props {
    pengaduan: Pengaduan;
    kadus_users: User[];
}

export const statusColorMap: Record<string, string> = {
    'Menunggu verifikasi': 'bg-gray-500 text-gray-100',
    'Diteruskan ke Kepala Dusun': 'bg-yellow-500 text-yellow-100',
    'Diverifikasi Kepala Dusun': 'bg-blue-500 text-blue-100',
    Selesai: 'bg-green-500 text-green-100',
    Ditolak: 'bg-red-500 text-red-100',
};

export default function ShowPengaduan({ pengaduan, kadus_users }: Props) {
    const formatCreatedAtPengaduan = format(pengaduan.created_at, 'EEEE, d MMMM y', { locale: id });
    const formatCreatedAtStatusPengaduan = format(pengaduan.latest_status.created_at, 'EEEE, d MMMM y', { locale: id });
    const user = pengaduan.user;
    const getInitials = useInitials();

    const badgeClass = statusColorMap[pengaduan.latest_status.status] ?? 'bg-gray-500 text-white';
    const { data, setData, put, processing, errors, reset, isDirty } = useForm({
        status: pengaduan.latest_status.status,
        tindakan: '',
        diteruskan_ke: '',
    });

    const { auth } = usePage<SharedData>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('pengaduan.update', { pengaduan }), {
            preserveState: false,
            onSuccess: () => {
                toast.success('Berhasil memperbarui status'), reset();
            },
            onError: () => toast.error('Gagal memperbarui status'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full gap-x-5 not-lg:flex-col not-lg:gap-y-3">
                    <div className="w-full max-w-4xl not-lg:order-2">
                        {pengaduan.latest_status.status === 'Selesai' && (
                            <Alert className="mb-3 border-green-500 bg-green-100">
                                <AlertDescription className="justify-center text-gray-800">
                                    <span className="font-bold">Pengaduan telah diselesaikan!</span>
                                </AlertDescription>
                            </Alert>
                        )}

                        <DetailPengaduan pengaduan={pengaduan} className="border-b pb-3" />

                        <div className="mt-2 mb-5">
                            <Badge className="border border-blue-300 bg-blue-50 text-blue-500">Tanggapan</Badge>
                        </div>

                        {pengaduan.latest_status.status !== 'Selesai' && hasRole(auth.user, ['admin', 'kadus_1', 'kadus_2', 'kadus_3', 'kades']) && <FormTanggapan pengaduan={pengaduan} />}

                        {pengaduan.tanggapans.length > 0 ? (
                            <Timeline items={pengaduan.tanggapans} />
                        ) : (
                            <div className="flex items-center justify-center rounded-2xl border border-dashed py-20">
                                <p className="text-sm text-gray-500">Tidak ada tanggapan untuk pengaduan ini.</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full space-y-5 lg:max-w-sm">
                        <Card className="shadow-none">
                            <CardHeader>
                                <CardTitle>Info Pengaduan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex gap-x-2">
                                        <p className="text-sm font-medium text-gray-600">Status:</p>
                                        <Badge className={cn(badgeClass)}>{pengaduan.latest_status.status}</Badge>
                                    </div>
                                    {pengaduan.latest_status.tindakan && (
                                        <div className="flex gap-x-2">
                                            <p className="text-sm font-medium text-gray-600">Tindakan:</p>
                                            <p className="text-sm font-medium text-gray-800">{pengaduan.latest_status.tindakan}</p>
                                        </div>
                                    )}
                                    <div className="flex gap-x-2">
                                        <p className="text-sm font-medium text-gray-600">Diajukan:</p>
                                        <p className="text-sm font-medium text-gray-800">{formatCreatedAtPengaduan}</p>
                                    </div>
                                    <div className="flex gap-x-2">
                                        <p className="text-sm font-medium text-gray-600">Pembaruan Terakhir:</p>
                                        <p className="text-sm font-medium text-gray-800">{formatCreatedAtStatusPengaduan}</p>
                                    </div>
                                </div>
                                {hasRole(auth.user, ['admin', 'kadus_1', 'kadus_2', 'kadus_3']) && (
                                    <div className="mt-5 space-y-2">
                                        <p className="text-sm font-medium text-gray-800">Pengaduan dari:</p>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                                <AvatarImage src={'/storage/' + user.avatar} alt={user.name} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold text-blue-500">{user.name}</span>
                                                <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {hasRole(auth.user, ['admin']) && <AksiAdmin pengaduan={pengaduan} kadus_users={kadus_users} />}
                        {auth.user.id === pengaduan.diteruskan_ke && hasRole(auth.user, ['kadus_1', 'kadus_2', 'kadus_3', 'kadus_4']) && (
                            <AksiKadus pengaduan={pengaduan} />
                        )}
                        {pengaduan.latest_status.status !== 'Selesai' && hasRole(auth.user, ['kades']) && <AksiKades pengaduan={pengaduan} />}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
