import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getStatusBadgeClass } from '@/helpers';
import { cn } from '@/lib/utils';
import { PermohonanSurat } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function DetailPermohonanSurat({ permohonanSurat }: { permohonanSurat: PermohonanSurat }) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Detail Permohonan Surat</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="">Nama Pemohon</TableCell>
                            <TableCell className="font-medium">{permohonanSurat.pemohon.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Nomor Surat</TableCell>
                            <TableCell className="font-medium">{permohonanSurat.nomor_surat ? permohonanSurat.nomor_surat : '-'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Tanggal Permohonan</TableCell>
                            <TableCell className="font-medium">{format(permohonanSurat.created_at, 'PPP', { locale: id })}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="">Status</TableCell>
                            <TableCell className="font-medium">
                                <Badge className={cn(getStatusBadgeClass(permohonanSurat.status))}>
                                    {permohonanSurat.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
