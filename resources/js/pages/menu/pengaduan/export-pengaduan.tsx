import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, DownloadCloud } from 'lucide-react';
import { useState } from 'react';

export default function ExportPengaduan() {
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();

    console.log(end?.toDateString())
    const downloadPDF = () => {
        const params = new URLSearchParams();
    
        if (start) params.append('start', format(start, 'yyyy-MM-dd'));
        if (end) params.append('end', format(end, 'yyyy-MM-dd'));
    
        window.location.href = `/export-pdf?${params.toString()}`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8 bg-blue-500 transition-colors duration-300 hover:bg-blue-600">
                    <DownloadCloud />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Export PDF</DialogTitle>
                    <DialogDescription>Pilih rentang tanggal untuk export laporan pengaduan.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="start" className="text-right whitespace-nowrap">
                            Tanggal Awal
                        </Label>
                        <Popover modal={true}>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !start && 'text-muted-foreground')}>
                                    {start ? format(start, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    required
                                    selected={start}
                                    onSelect={(date) => {
                                        setStart(date ?? start);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex items-center gap-3">
                        <Label htmlFor="end" className="text-right whitespace-nowrap">
                            Tanggal Akhir
                        </Label>
                        <Popover modal={true}>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !end && 'text-muted-foreground')}>
                                    {end ? format(end, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    required
                                    selected={end}
                                    onSelect={(date) => {
                                        setEnd(date ?? end);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="bg-sky-800" onClick={() => downloadPDF()}>
                        Download PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
