import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { listJudulSurat } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import { TemplateBerkas } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChevronDown, Plus, Trash } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

type FormField = {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'number';
};

type FormTemplateBerkas = {
    nama_berkas: string;
    // wajib_nomor_surat: boolean | null;
    path: File | null;
    form_fields: FormField[];
};

export default function FormTemplateBerkas({ templateBerkas }: { templateBerkas: TemplateBerkas[] }) {
    const { data, setData, post, processing, errors } = useForm<FormTemplateBerkas>({
        nama_berkas: '',
        // wajib_nomor_surat: null,
        path: null,
        form_fields: [],
    });

    const addField = () => {
        setData('form_fields', [...data.form_fields, { name: '', label: '', type: 'text' }]);
    };

    const removeField = (index: number) => {
        const updated = [...data.form_fields];
        updated.splice(index, 1);
        setData('form_fields', updated);
    };

    const handleFieldChange = <K extends keyof FormField>(index: number, key: K, value: FormField[K]) => {
        const updated = [...data.form_fields];
        updated[index][key] = value;
        setData('form_fields', updated);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('template-berkas.store'));
    };

    const isOpenPopoverJudulSurat = useBoolean();

    return (
        <form onSubmit={handleSubmit} className="mx-auto grid max-w-3xl gap-6">
            <div className="grid gap-2">
                <Label>Judul Surat</Label>
                <Popover open={isOpenPopoverJudulSurat.state} onOpenChange={isOpenPopoverJudulSurat.setState}>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} className="flex justify-between">
                            {data.nama_berkas ? data.nama_berkas : 'Pilih Judul Surat'}
                            <ChevronDown className="size-3" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="popover-content-width-same-as-its-trigger p-0" align="start">
                        <Command>
                            <CommandInput placeholder="Cari judul surat" />
                            <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                            <CommandList>
                                {listJudulSurat
                                    .filter((item) => !templateBerkas.some((berkas) => berkas.nama_berkas === item.label))
                                    .map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            onSelect={() => {
                                                setData('nama_berkas', item.label);
                                                toast.success(`"${item.label}" dipilih.`);
                                                isOpenPopoverJudulSurat.setFalse();
                                            }}
                                        >
                                            {item.label}
                                        </CommandItem>
                                    ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <InputError message={errors.nama_berkas} />
            </div>
            <div className="grid gap-2">
                <Label>Upload File Template (DOCX)</Label>
                <Input type="file" accept=".docx" onChange={(e) => setData('path', e.target.files?.[0] || null)} />
            </div>
            {/* <div className="grid gap-2">
                <Label>Wajib Nomor Surat</Label>
                <Select
                    value={
                        data.wajib_nomor_surat === true
                            ? '1'
                            : data.wajib_nomor_surat === false
                            ? '0'
                            : undefined
                    }
                    onValueChange={(value) =>
                        setData('wajib_nomor_surat', value === '1' ? true : value === '0' ? false : null)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih status nomor surat" className="whitespace-normal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">Wajib</SelectItem>
                            <SelectItem value="0">Tidak Wajib</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div> */}

            <div className="flex flex-row items-center justify-between">
                <CardTitle>Field Dinamis</CardTitle>
                <Button type="button" onClick={addField} variant="outline" size="sm">
                    <Plus className="mr-1 h-4 w-4" /> Tambah Field
                </Button>
            </div>
            <div className="grid gap-4">
                {data.form_fields.map((field, i) => (
                    <div key={i} className="relative grid gap-4 rounded-lg border p-3">
                        <Button type="button" variant="ghost" className="absolute top-0 right-0" onClick={() => removeField(i)}>
                            <Trash className="size-4 text-red-500" />
                        </Button>
                        <div className="grid gap-2">
                            <Label htmlFor={`name-${i}`}>Name (key)</Label>
                            <Input id={`name-${i}`} value={field.name} onChange={(e) => handleFieldChange(i, 'name', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`label-${i}`}>Label (tampil ke user)</Label>
                            <Input id={`label-${i}`} value={field.label} onChange={(e) => handleFieldChange(i, 'label', e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`type-${i}`}>Tipe</Label>
                            <Select value={field.type} onValueChange={(value) => handleFieldChange(i, 'type', value as FormField['type'])}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Tipe Input" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    Simpan Template
                </Button>
            </div>
        </form>
    );
}
