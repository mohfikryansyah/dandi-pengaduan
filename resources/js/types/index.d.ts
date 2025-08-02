import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    roles?: string[];
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type TypeDusun = 'Dusun Ilomata' | 'Dusun Tamboo' | 'Dusun Bongo' | 'Dusun Bongo 2'

export interface User {
    id: number;
    name: string;
    dusun: TypeDusun;
    username: string;
    email: string;
    roles: string[];
    avatar: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles_list: string[];
    [key: string]: unknown;
}

export interface Pengaduan {
    id: number | string;
    judul: string;
    isi: string;
    bidang: string;
    diteruskan_ke: number;
    created_at: string;
    updated_at: string;
    berkas: Berkas[];
    status: Status[];
    latest_status: Status;
    tanggapans: Tanggapan[];
    user: User;
}

export interface Berkas {
    id: number | string;
    path_berkas: string;
    size: number;
    created_at: string;
    updated_at: string;
}

export interface Status {
    id: number | string;
    status: string;
    tindakan: string;
    created_at: string;
    updated_at: string;
}

export interface Tanggapan {
    id: number | string;
    user: User;
    tanggapan: string;
    created_at: string;
    updated_at: string;
}

export interface TemplateBerkas {
    id: string;
    nama_berkas: string;
    path: string;
    form_fields: {
        name: string;
        label: string;
        type: 'text' | 'date' | 'number';
    }[];
    created_at: string;
    updated_at: string;
}

export type StatusPermohonanSurat = 'Pending' | 'Disetujui' | 'Ditolak';

export interface PermohonanSurat {
    id: string;
    pemohon_id: number;
    pemohon: User;
    judul_surat: string;
    nomor_surat: string | null;
    path_surat: string;
    data_form: Record<string, any>;
    template_surat: TemplateBerkas;
    status: StatusPermohonanSurat;
    keterangan: string | null;
    created_at: string;
    updated_at: string;
}