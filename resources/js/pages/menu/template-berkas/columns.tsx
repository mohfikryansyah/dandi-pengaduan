import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import { Button } from '@/components/ui/button';
import { TemplateBerkas } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useDeleteWithToast } from '@/hooks/use-delete';
// import useDelete from '@/hooks/use-delete';

export const columns: ColumnDef<TemplateBerkas>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'user.name',
        id: 'nama',
        header: 'Dibuat oleh',
    },
    {
        accessorKey: 'nama_berkas',
        id: 'nama berkas',
        header: 'Nama berkas',
    },
    {
        accessorKey: 'tanggal_formatted',
        id: 'tanggal diunggah',
        header: 'Tanggal diunggah',
    },
    {
        accessorKey: 'aksi',
        id: 'aksi',
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            const { deleteItem } = useDeleteWithToast();
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const handleDeleteRow = (templateBerkas: TemplateBerkas) => {
                setDisableButton(true);
                deleteItem('template-berkas.destroy', templateBerkas);
            };

            return (
                <div className="flex items-center">
                    {/* <Link href={route('catin.permohonan-nikah.show', { permohonanNikah: data })}>
                        <Button variant="ghost" size="sm" title="Lihat detail">
                            <Eye className="h-4 w-4 text-gray-800" />
                        </Button>
                    </Link> */}
                    <Link href={route('template-berkas.edit', { templateBerkas: data })}>
                        <Button variant="ghost" size="sm" title="Ubah data" className='m-0 cursor-pointer hover:bg-orange-100'>
                            <Edit className="h-4 w-4 text-orange-500" />
                        </Button>
                    </Link>
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(data)}
                        title="Hapus Template Berkas"
                        key={row.original.id}
                    />
                </div>
            );
        },
    },
];
