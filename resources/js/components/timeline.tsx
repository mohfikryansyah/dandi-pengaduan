import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { hasRole } from '@/helpers';
import { useInitials } from '@/hooks/use-initials';
import { SharedData, Tanggapan } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteDialog from './custom/delete-dialog';
import { Card, CardContent } from './ui/card';

type Props = {
    items: Tanggapan[];
};

export default function Timeline({ items }: Props) {
    const { auth } = usePage<SharedData>().props;

    const getInitials = useInitials();

    const [processing, setProccesing] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [openDialogId, setOpenDialogId] = useState<number | string | null>(null);

    const handleDeleteTanggapan = (tanggapan: Tanggapan) => {
        router.delete(route('tanggapan.destroy', { tanggapan }), {
            preserveState: true,
            onSuccess: () => {
                toast.success('Berhasil menghapus tanggapan');
                setProccesing(false);
                setOpenDialogId(null);
            },
            onError: (errors) => {
                toast.error(errors[0]);
                setOpenDialogId(null);
                setProccesing(false);
            },
        });
    };

    return (
        <div className="relative space-y-6 border-l-2 border-dashed border-blue-500 pl-6">
            {items.map((item, idx) => {
                const formatTanggal = format(item.created_at, 'EEEE, d MMMM y', { locale: id });
                const formatWaktu = format(item.created_at, 'HH:mm', { locale: id });

                return (
                    <div key={item.id} className="relative">
                        <span className="absolute top-1 -left-[31px] h-3 w-3 rounded-full border-2 border-white bg-blue-500" />

                        <div className="mb-2 flex items-center gap-3">
                            <div className="text-sm font-semibold text-blue-600">{formatTanggal}</div>
                            <div className="text-xs text-gray-500">{formatWaktu}</div>
                        </div>

                        {/* Chat bubble */}
                        <Card>
                            <CardContent className="flex gap-4">
                                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                    <AvatarImage src={'/storage/' + item.user.avatar} alt={item.user.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(item.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold">{item.user.name}</p>
                                            <p className="text-xs text-gray-500">{item.user.roles}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm">{item.tanggapan}</p>
                                </div>
                                {(item.user.id === auth.user.id || hasRole(auth.user, ['admin'])) && (
                                    <DeleteDialog
                                        key={item.id}
                                        title="Hapus Pengaduan"
                                        isProcessing={processing}
                                        onDelete={() => {
                                            setProccesing(true);
                                            handleDeleteTanggapan(item);
                                        }}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
