import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import FormFieldRenderer from './form-field-renderer';
import { TemplateBerkas } from '@/types';

type PermohonanSuratForm = {
    nomor_surat: string;
    template_surat_id: string | null;
    path_surat: File | null;
    data_form: Record<string, any>;
};

type Props = {
    template_surat: TemplateBerkas;
};

export default function SuratKehilangan({ template_surat }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<PermohonanSuratForm>({
        nomor_surat: '',
        template_surat_id: template_surat.id,
        path_surat: null,
        data_form: {}
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post;
    };

    return (
        <form onSubmit={submit}>
            <FormFieldRenderer
                fields={template_surat.form_fields}
                data={data.data_form}
                setData={(key, value) => setData('data_form', { ...data.data_form, [key]: value })}
            />
        </form>
    );
}
