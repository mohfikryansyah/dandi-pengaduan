import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import { Button } from '@/components/ui/button';
import { PermohonanSurat } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { getStatusBadgeClass } from '@/helpers';
import { Badge } from '@/components/ui/badge';
// import useDelete from '@/hooks/use-delete';

export const columns: ColumnDef<PermohonanSurat>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'pemohon.name',
        id: 'nama',
        header: 'Pemohon',
    },
    {
        accessorKey: 'judul_surat',
        id: 'judul surat',
        header: 'Judul Surat',
    },
    {
        accessorKey: 'nomor_surat',
        id: 'nomor surat',
        header: 'Nomor Surat',
        cell: ({ row }) => {
            const nomor_surat = row.original.nomor_surat;
            if (!nomor_surat) {
                return <span className="text-gray-500 italic">Belum ada nomor surat</span>;
            }
            return <span className='font-bold'>{`140/Ds-Plht/${nomor_surat}`}</span>;
        }
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return <Badge className={getStatusBadgeClass(status) || 'text-gray-500'}>{status}</Badge>;
        }
    },
    {
        accessorKey: 'tanggal_formatted',
        id: 'tanggal permohonan',
        header: 'Tanggal permohonan',
    },
    {
        accessorKey: 'aksi',
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            const { deleteItem } = useDeleteWithToast();
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const handleDeleteRow = (permohonanSurat: PermohonanSurat) => {
                setDisableButton(true);
                deleteItem('permohonan-surat.destroy', permohonanSurat);
            };

            return (
                <div className="flex items-center">
                    <Link href={route('permohonan-surat.show', { permohonanSurat: data })}>
                        <Button variant="ghost" size="sm" title="Lihat detail">
                            <Eye className="h-4 w-4 text-gray-800" />
                        </Button>
                    </Link>
                    {/* <Link href={route('permohonan-surat.edit', { permohonanSurat: data })}>
                        <Button variant="ghost" size="sm" title="Ubah data" className='m-0 cursor-pointer hover:bg-orange-100'>
                            <Edit className="h-4 w-4 text-orange-500" />
                        </Button>
                    </Link> */}
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(data)}
                        title="Hapus Permohonan Surat"
                        key={row.original.id}
                    />
                </div>
            );
        },
    },
];
