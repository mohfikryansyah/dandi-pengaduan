import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

  export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
export const roleToLabel = (role: string): string => {
  const mapping: Record<string, string> = {
    kadus_1: 'Kepala Dusun Ilomata',
    kadus_2: 'Kepala Dusun Tamboo',
    kadus_3: 'Kepala Dusun Bongo',
    kadus_4: 'Kepala Dusun Bongo 2',
    admin: 'Operator Desa',
    kades: 'Kepala Desa',
  };

  return mapping[role] ?? role;
};
