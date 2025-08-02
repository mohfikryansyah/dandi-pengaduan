import AppLayout from '@/layouts/app-layout';
import FormPengaduan from './form-pengaduan';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaduan',
        href: route('pengaduan.index')
    },
    {
        title: 'Form Pengaduan',
        href: route('pengaduan.create')
    },
]

export default function CreatePengaduan() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="max-w-5xl">
                    <FormPengaduan />
                </div>
            </div>
        </AppLayout>
    );
}
