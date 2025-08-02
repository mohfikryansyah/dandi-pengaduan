import { limitText } from '@/helpers';
import { useInitials } from '@/hooks/use-initials';
import { Pengaduan } from '@/types';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { endOfDay, startOfDay } from 'date-fns';
import { X } from 'lucide-react';

export default function ListPengaduan({ items }: { items: Pengaduan[] }) {
    const getInitials = useInitials();

    const [searchInput, setSearchInput] = useState('');
    const [visibleCount, setVisibleCount] = useState(5); // jumlah yang terlihat
    const [filters, setFilters] = useState({
        search: '',
        startDate: null as string | null,
        endDate: null as string | null,
        status: '' as string,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters((prev) => ({
                ...prev,
                search: searchInput,
            }));
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    useEffect(() => {
        setVisibleCount(5); // reset ke 5 saat filter berubah
    }, [filters]);

    const filteredItems = items.filter((item) => {
        const matchSearch = item.judul.toLowerCase().includes(filters.search.toLowerCase());
        const matchStatus = filters.status ? item.latest_status.status === filters.status : true;

        const createdAt = new Date(item.created_at);
        const startDate = filters.startDate ? startOfDay(new Date(filters.startDate)) : null;
        const endDate = filters.endDate ? endOfDay(new Date(filters.endDate)) : null;

        const matchDate = (!startDate || createdAt >= startDate) && (!endDate || createdAt <= endDate);

        return matchSearch && matchStatus && matchDate;
    });

    const handleReset = () => {
        setFilters({
            search: '',
            startDate: null,
            endDate: null,
            status: '',
        });
        setSearchInput('');
    };

    return (
        <>
            <div className="mb-4 mt-6 max-w-3xl items-center gap-2 not-md:space-y-2 md:flex">
                <Input
                    placeholder="Cari pengaduan..."
                    className="text-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="not-md:w-full" variant={'outline'}>
                            {filters.startDate
                                ? format(parseISO(filters.startDate), 'd MMM yyyy', { locale: id })
                                : 'Dari Tanggal'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={filters.startDate ? new Date(filters.startDate) : undefined}
                            onSelect={(date) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    startDate: date ? date.toISOString() : null,
                                }))
                            }
                        />
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="not-md:w-full" variant={'outline'}>
                            {filters.endDate
                                ? format(parseISO(filters.endDate), 'd MMM yyyy', { locale: id })
                                : 'Sampai Tanggal'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={filters.endDate ? new Date(filters.endDate) : undefined}
                            onSelect={(date) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    endDate: date ? date.toISOString() : null,
                                }))
                            }
                        />
                    </PopoverContent>
                </Popover>

                <Select
                    value={filters.status}
                    onValueChange={(value) =>
                        setFilters((prev) => ({
                            ...prev,
                            status: value,
                        }))
                    }
                >
                    <SelectTrigger className="md:w-[300px]">
                        <SelectValue placeholder="Pilih status" className="whitespace-normal" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Diajukan">Diajukan</SelectItem>
                            <SelectItem value="Diproses">Diproses</SelectItem>
                            <SelectItem value="Selesai">Selesai</SelectItem>
                            <SelectItem value="Ditolak">Ditolak</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {(filters.search || filters.endDate || filters.startDate || filters.status) && (
                    <Button onClick={handleReset} variant={'ghost'}>
                        <X />
                        Reset
                    </Button>
                )}
            </div>

            {filteredItems.length > 0 ? (
                <>
                    {filteredItems.slice(0, visibleCount).map((item) => (
                        <Card key={item.id} className='mb-4'>
                            <CardContent>
                                <div className="items-center justify-between not-md:space-y-3 md:flex">
                                    <div className="flex gap-2">
                                        {/* <p>Bidang:</p> */}
                                        {/* <Badge variant={'outline'}>{item.bidang}</Badge> */}
                                        <Badge className="bg-sky-800">{item.latest_status.status}</Badge>
                                    </div>
                                    <div className="gap-4 text-sm text-gray-700 md:flex">
                                        <p>Dibuat: {format(item.created_at, 'EEEE, d MMMM y', { locale: id })}</p>
                                        <p>
                                            Pembaruan:{' '}
                                            {format(item.latest_status.created_at, 'EEEE, d MMMM y', {
                                                locale: id,
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 border-b pb-4">
                                    <h1 className="text-xl font-semibold text-blue-500">{item.judul}</h1>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">{limitText(item.isi, 300)}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-gray-700">Pengaduan dari:</p>
                                        <div className="flex gap-2">
                                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                                <AvatarImage src={'/storage/' + item.user.avatar} alt={item.user.name} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(item.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 items-center text-left text-sm leading-tight">
                                                <span className="truncate font-semibold text-blue-500">{item.user.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {visibleCount < filteredItems.length && (
                        <div className="mt-6 flex justify-center">
                            <Button onClick={() => setVisibleCount((prev) => prev + 5)} variant="outline">
                                Lihat Lebih Banyak
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <Card className="border-dashed py-10 shadow-none">
                    <CardContent className="flex items-center justify-center text-gray-500">Tidak ada data ditemukan</CardContent>
                </Card>
            )}
        </>
    );
}
