import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useInitials } from '@/hooks/use-initials';
import { Pengaduan, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

interface Props {
    pengaduan: Pengaduan;
}

export default function FormTanggapan({ pengaduan }: Props) {
    const getInitials = useInitials();
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, errors, reset, processing } = useForm({
        tanggapan: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tanggapan.store', { pengaduan_id: pengaduan.id }), {
            preserveState: true,
            onSuccess: () => {
                toast.success('Berhasil memberikan tanggapan');
                reset();
            },
            onError: () => toast.error('Gagal memberikan tanggapan'),
        });
    };

    return (
        <>
            <Card className="mb-5">
                <CardContent className="space-y-5">
                    <div className="flex gap-4">
                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                            <AvatarImage src={'/storage/' + auth.user.avatar} alt={auth.user.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold">{auth.user.name}</p>
                                    <p className="text-xs text-gray-500">{auth.user.roles}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={submit} id="form-tanggapan">
                        <Textarea value={data.tanggapan} onChange={(e) => setData('tanggapan', e.target.value)} />
                        <InputError message={errors.tanggapan} />
                    </form>
                </CardContent>
                <CardFooter>
                    <Button form="form-tanggapan" disabled={processing} className="w-full bg-sky-800 transition-colors duration-150 hover:bg-sky-900">
                        Kirim
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
