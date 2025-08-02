'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { hasRole } from '@/helpers';
import { useInitials } from '@/hooks/use-initials';
import { SharedData, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowUpDown, Eye, Trash2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const columns: ColumnDef<User>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) =>
    //                 table.toggleAllPageRowsSelected(!!value)
    //             }
    //             aria-label="Select all"
    //             className="bg-white data-[state=checked]:bg-green-500 data-[state=checked]:mt-1"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //             className="data-[state=checked]:mt-1"
    //         />
    //     ),
    // },
    {
        accessorKey: 'name',
        id: 'nama',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const getInitials = useInitials();
            return (
                <div className="flex items-center">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                        <Dialog>
                            <DialogTrigger>
                                <AvatarImage src={'/storage/' + row.original.avatar} alt={row.original.name} />
                            </DialogTrigger>
                            <DialogContent>
                                <AvatarImage src={'/storage/' + row.original.avatar} alt={row.original.name} />
                            </DialogContent>
                        </Dialog>
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(row.original.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="ml-3">{row.original.name}</span>
                </div>
            );
        },
    },

    {
        accessorKey: 'username',
        id: 'Nama Pengguna',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama Pengguna
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <span className="ml-3">{row.original.username}</span>,
    },
    {
        accessorKey: 'email',
        id: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <span className="ml-3">{row.original.email}</span>,
    },
    {
        accessorKey: 'role_names',
        id: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const role = (row.original.role_names as string[])[0];

            const roleLabel = role.startsWith('kadus_') ? role.replace('kadus_', 'Kepala Dusun ') : role === 'kades' ? 'Kepala Desa' : role;

            return <span className="ml-3">{roleLabel}</span>;
        },
    },

    {
        accessorKey: 'created_at',
        id: 'Tanggal bergabung',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Tanggal Bergabung
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
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState(false);
            const [openDialog, setOpenDialog] = useState(false);

            const handleDeleteRow = (user: User) => {
                setDisableButton(true);
                router.delete(route('delete.user', { user }), {
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

            const { auth } = usePage<SharedData>().props;

            return (
                <>
                    <div className="flex items-center">
                        {/* <Button variant="ghost" size="sm" onClick={() => router.get(route('pengaduan.show', { pengaduan: row.original }))}>
                            <Eye className="h-4 w-4 text-gray-800" />
                        </Button> */}

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
                                        <h1 className="mt-4 text-lg font-bold">Hapus User</h1>
                                        <p className="mt-2 text-gray-400">Apakah Anda yakin ingin menghapus ini?</p>
                                        <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
                                            <DialogClose asChild>
                                                <Button variant={'outline'}>Batal</Button>
                                            </DialogClose>
                                            <Button
                                                variant={'default'}
                                                className="bg-red-500 transition-all duration-300 hover:bg-red-600 active:scale-90"
                                                disabled={disableButton}
                                                onClick={() => handleDeleteRow(row.original)}
                                                aria-label="Delete row"
                                            >
                                                Ya, saya yakin!
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </>
            );
        },
    },
];
