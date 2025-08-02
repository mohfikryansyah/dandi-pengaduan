import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Required } from '@/components/ui/required';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormPengaduan = {
    judul: string;
    isi: string;
    berkas: File | File[];
};

export default function FormPengaduan() {
    const { data, setData, post, errors, processing, reset } = useForm<Required<FormPengaduan>>({
        judul: '',
        isi: '',
        berkas: [],
    });

    const handleFileUpload = (berkas: File[]) => {
        setData('berkas', berkas);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('pengaduan.store'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Berhasil mengirim pengaduan');
                reset();
            },
            onError: (e) => {
                console.log(e);
                toast.error('Gagal mengirim pengaduan!');
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Form Pengaduan</CardTitle>
                <CardDescription>Lengkapi form dibawah ini untuk memberikan pengaduan.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="judul">
                            Judul
                            <Required />
                        </Label>
                        <Input id="judul" onChange={(e) => setData('judul', e.target.value)} value={data.judul} />
                        <InputError message={errors.judul} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="isi">
                            Isi Pengaduan
                            <Required />
                        </Label>
                        <Textarea id="isi" value={data.isi} onChange={(e) => setData('isi', e.target.value)} />
                        <InputError message={errors.isi} />
                    </div>
                    <div className="grid gap-2">
                        <Label>
                            Bukti
                            <Required />
                        </Label>
                        <div className="mx-auto min-h-96 w-full rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
                            <FileUpload isMultiple={true} onChange={handleFileUpload} />
                        </div>
                        <p className="text-xs text-gray-400">Upload file .jpg/.jpeg/.png | Ukuran maksimal berkas adalah 1MB</p>
                        <InputError
                            message={Object.entries(errors)
                                .filter(([key]) => key.startsWith('berkas.'))
                                .map(([_, message]) => message)
                                .join(' | ')}
                        />
                    </div>

                    <Button disabled={processing}>Submit</Button>
                </form>
            </CardContent>
        </Card>
    );
}
