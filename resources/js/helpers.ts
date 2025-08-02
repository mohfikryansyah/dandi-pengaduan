import { TemplateBerkas, User } from "./types";

// export function hasRole(user: User, role: string): boolean {
//     return user.roles.includes(role);
// }

export const getStatusBadgeClass = (status: string): string => {
  if (status.startsWith('Pending')) {
    return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
  }

  if (status.startsWith('Disetujui')) {
    return 'bg-blue-100 text-blue-800 border border-blue-300';
  }

  if (status.startsWith('Ditolak')) {
    return 'bg-red-100 text-red-800 border border-red-300';
  }

  if (status === 'Selesai') {
    return 'bg-green-100 text-green-800 border border-green-300';
  }

  return '';
};

export function hasRole(user: User, roles: string[]) {
    return user.roles.some(r => roles.includes(r));
}

export const limitText = (text: string, limit: number = 100): string => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

export const getNamaTemplate = (templateSurats: TemplateBerkas[], id: string | null) =>
    templateSurats.find((surat) => surat.id === id)?.nama_berkas ?? '';

export const getFileIcon = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return '/assets/pdf.png';
    case 'doc':
    case 'docx':
      return '/assets/docx.png';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '/assets/image.png';
    case 'xlsx':
    case 'xls':
      return '/assets/excel.png';
    default:
      return '/assets/file.png';
  }
};

export function strLimit(text: string, limit: number = 100, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}

export const listJudulSurat = [
    {
        label: 'Surat Kehilangan',
        value: 'Surat Kehilangan',
    },
    {
        label: 'Surat Izin Keramaian Hajatan',
        value: 'Surat Izin Keramaian Hajatan',
    },
    {
        label: 'Surat Kelakuan Baik',
        value: 'Surat Kelakuan Baik',
    },
    {
        label: 'Surat Keterangan Domisili',
        value: 'Surat Keterangan Domisili',
    },
    {
        label: 'Surat Keterangan Bepergian',
        value: 'Surat Keterangan Bepergian',
    },
    {
        label: 'Surat Beda Nama',
        value: 'Surat Beda Nama',
    },
    {
        label: 'Surat Jalan',
        value: 'Surat Jalan',
    },
    {
        label: 'Surat Kuasa',
        value: 'Surat Kuasa',
    },
]