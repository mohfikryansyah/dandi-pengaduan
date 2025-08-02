'use client';

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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { hasRole } from '@/helpers';
import { cn } from '@/lib/utils';
import { Pengaduan, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowUpDown, Check, Eye, Trash2, TriangleAlert, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { statusColorMap } from '../pengaduan/show-pengaduan';

export const columns: ColumnDef<Pengaduan>[] = [
    {
        accessorKey: 'created_at',
        id: 'Tanggal laporan',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Tanggal Pengaduan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const createdAt = row.original.created_at;
            const formatted = format(createdAt, 'EEEE, d MMMM y', {
                locale: id,
            });
            // const formatted = dayjs(createdAt).fromNow();

            return <span className="pl-4 text-center font-medium">{formatted}</span>;
        },
    },

    {
        accessorKey: 'user.name',
        id: 'Nama',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <span className="ml-3">{row.original.user.name}</span>,
    },
    {
        accessorKey: 'judul',
        id: 'judul',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Judul
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const judul = row.original.judul;
            return <div className="w-[200px] truncate pl-4">{judul}</div>;
        },
    },
    {
        accessorKey: 'latest_status.status',
        id: 'status',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const badgeClass = statusColorMap[row.original.latest_status.status] ?? 'bg-gray-500 text-white';
            return <Badge className={cn('ml-3', badgeClass)}>{row.original.latest_status.status}</Badge>;
        },
    },
    {
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState(false);
            const [openDialog, setOpenDialog] = useState(false);

            const handleDeleteRow = (id: number | string) => {
                setDisableButton(true);
                router.delete(route('pengaduan.destroy', { id }), {
                    onSuccess: () => {
                        toast.success('Baris berhasil dihapus!');
                        setDisableButton(false);
                        setOpenDialog(false);
                    },
                    onError: () => {
                        toast.error('Terjadi kesalahan saat menghapus baris.');
                        setOpenDialog(false);
                        setDisableButton(false);
                    },
                });
            };

            const handleReject = (pengaduan: Pengaduan, status: string) => {
                setDisableButton(true);
                router.put(route('pengaduan.validasi.kades', { pengaduan, status }));
            };

            const handleApprove = (pengaduan: Pengaduan, status: string) => {
                setDisableButton(true);
                router.put(route('pengaduan.validasi.kades', { pengaduan, status }));
            };

            const { auth } = usePage<SharedData>().props;

            return (
                <>
                    <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => router.get(route('pengaduan.show', { pengaduan: row.original }))}>
                            <Eye className="h-4 w-4 text-gray-800" />
                        </Button>

                        {hasRole(auth.user, ['admin']) && (
                            <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-200">
                                            <TriangleAlert className="h-8 w-8 text-red-500" />
                                        </div>
                                        <h1 className="mt-4 text-lg font-bold">Hapus Pengaduan</h1>
                                        <p className="mt-2 text-gray-400">Apakah Anda yakin ingin menghapus ini?</p>
                                        <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
                                            <DialogClose asChild>
                                                <Button variant={'outline'}>Batal</Button>
                                            </DialogClose>
                                            <Button
                                                variant={'default'}
                                                className="bg-red-500 transition-all duration-300 hover:bg-red-600 active:scale-90"
                                                disabled={disableButton}
                                                onClick={() => handleDeleteRow(row.original.id)}
                                                aria-label="Delete row"
                                            >
                                                Ya, saya yakin!
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}

                        {row.original.latest_status.status !== 'Selesai' && (
                            <>
                                {hasRole(auth.user, ['kades']) && (
                                    <div className="flex">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" className="size-8">
                                                    <Check className="text-green-500" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Apakah Anda yakin ingin menyelesaikan pengaduan ini?</AlertDialogTitle>
                                                    <AlertDialogDescription>Aksi ini tidak dapat dibatalkan.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-sky-800" onClick={() => handleApprove(row.original, 'Selesai')}>
                                                        Ya, saya yakin!
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" className="size-8">
                                                    <X className="text-red-500" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Apakah Anda yakin ingin menolak pengaduan ini?</AlertDialogTitle>
                                                    <AlertDialogDescription>Aksi ini tidak dapat dibatalkan.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-red-500" onClick={() => handleReject(row.original, 'Ditolak Kades')}>
                                                        Ya, saya yakin!
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            );
        },
    },
];
