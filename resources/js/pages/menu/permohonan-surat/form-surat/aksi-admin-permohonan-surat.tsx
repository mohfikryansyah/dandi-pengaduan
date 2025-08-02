import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Required } from '@/components/ui/required';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PermohonanSurat, StatusPermohonanSurat } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type Props = {
    permohonanSurat: PermohonanSurat;
};

export default function AksiAdminPermohonanSurat({ permohonanSurat }: Props) {
    const { data, setData, put, errors, reset, processing, isDirty } = useForm({
        status: permohonanSurat.status,
        keterangan: '',
        nomor_surat: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('permohonan-surat.update', { permohonanSurat: permohonanSurat }), {
            onSuccess: () => {
                reset();
                toast.success('Berhasil memperbarui status permohonan surat.');
            },
            onError: () => {
                toast.error('Gagal mengubah status permohonan surat.');
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="gap-2 md:grid">
                <Label>
                    Status
                    <Required />
                </Label>
                <Select defaultValue={data.status} onValueChange={(value) => setData('status', value as StatusPermohonanSurat)} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Disetujui">Disetujui</SelectItem>
                            <SelectItem value="Ditolak">Ditolak</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError message={errors.status}></InputError>
            </div>

            {data.status === 'Disetujui' && (
                <div className="grid gap-2">
                    <Label htmlFor="nomor_surat">Nomor Surat</Label>
                    <div className="relative w-full">
                        <span className="text-muted-foreground absolute inset-y-0 left-0 flex items-center pl-3 text-sm">140/Ds-Plht/</span>
                        <Input
                            id="nomor_surat"
                            value={data.nomor_surat}
                            onChange={(e) => setData('nomor_surat', e.target.value)}
                            className="pl-[6rem]" // atau bisa pakai pl-40 jika kira-kira pas
                        />
                    </div>
                    <InputError message={errors.nomor_surat} />
                </div>
            )}
            {data.status === 'Ditolak' && (
                <div className="grid gap-2">
                    <Label htmlFor="keterangan">Keterangan</Label>
                    <Textarea id="keterangan" value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
                    <InputError message={errors.keterangan} />
                </div>
            )}

            <Button type="submit" disabled={processing}>
                Simpan Perubahan
            </Button>
        </form>
    );
}
