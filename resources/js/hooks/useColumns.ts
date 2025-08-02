export const useColumns = (): ColumnDef<Pengaduan>[] => {
    const { auth } = usePage<SharedData>().props;
    const userRoles = auth.user.roles.map(role => role.name);
    
    // Asumsi: jika user memiliki role 'masyarakat', maka tidak tampilkan kolom Nama
    const isMasyarakat = userRoles.includes('masyarakat');
    
    return getColumns(isMasyarakat ? 'masyarakat' : 'admin');
};