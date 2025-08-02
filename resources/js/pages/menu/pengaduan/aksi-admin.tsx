import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { roleToLabel } from '@/lib/utils';
import { BreadcrumbItem, Pengaduan, User } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Props = {
    pengaduan: Pengaduan;
    kadus_users: User[];
};

export default function AksiAdmin({ pengaduan, kadus_users }: Props) {
    const { data, setData, put, processing, errors, reset, isDirty } = useForm({
        status: pengaduan.latest_status.status,
        tindakan: '',
        diteruskan_ke: '',
    });

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
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>Perbarui Status</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select onValueChange={(value) => setData('status', value)} defaultValue={data.status}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih status baru" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Menunggu verifikasi">Menunggu verifikasi</SelectItem>
                                    <SelectItem value="Diteruskan ke Kepala Dusun">Diteruskan ke Kepala Dusun</SelectItem>
                                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            <InputError message={errors.status} />
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Teruskan ke</Label>
                        <Select onValueChange={(value) => setData('diteruskan_ke', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih kepala dusun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {kadus_users.map((kadus) => {
                                        const role = kadus.roles[0];
                                        const roleLabel = roleToLabel(role);
                                        return (
                                            <SelectItem key={kadus.id} value={String(kadus.id)}>
                                                {roleLabel}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                            <InputError message={errors.diteruskan_ke} />
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tindakan">Tindakan</Label>
                        <Textarea id="tindakan" value={data.tindakan} onChange={(e) => setData('tindakan', e.target.value)} />
                        <InputError message={errors.tindakan} />
                    </div>

                    <Button disabled={processing || !isDirty}>Simpan</Button>
                </form>
            </CardContent>
        </Card>
    );
}
