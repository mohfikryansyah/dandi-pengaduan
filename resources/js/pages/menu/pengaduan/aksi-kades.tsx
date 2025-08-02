import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem, Pengaduan } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Props = {
    pengaduan: Pengaduan;
};

export default function AksiKades({ pengaduan }: Props) {
    const [disableButton, setDisableButton] = useState(false);

    const handleReject = (pengaduan: Pengaduan, status: string) => {
        setDisableButton(true);
        router.put(route('pengaduan.validasi.kades', { pengaduan, status }));
    };

    const handleApprove = (pengaduan: Pengaduan, status: string) => {
        setDisableButton(true);
        router.put(route('pengaduan.validasi.kades', { pengaduan, status }));
    };

    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>Perbarui Status</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="default" className="w-full">
                            Selesaikan
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin ingin menyelesaikan pengaduan ini?</AlertDialogTitle>
                            <AlertDialogDescription>Aksi ini tidak dapat dibatalkan.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction className="bg-sky-800" onClick={() => handleApprove(pengaduan, 'Selesai')}>
                                Ya, saya yakin!
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            Tolak
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda yakin ingin menolak pengaduan ini?</AlertDialogTitle>
                            <AlertDialogDescription>Aksi ini tidak dapat dibatalkan.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500" onClick={() => handleReject(pengaduan, 'Ditolak Kades')}>
                                Ya, saya yakin!
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
}
