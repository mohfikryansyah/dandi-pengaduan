import ListPengaduan from '@/components/list-pengaduan';
import { useInitials } from '@/hooks/use-initials';
import GuestLayout from '@/layouts/guest-layout';
import { Pengaduan } from '@/types';
import { ChartData } from '../menu/dashboard/admin/chart';
import Footer from './footer';
import HeroSection from './hero-section';
import StatistikSection from './statistik-section';

interface Props {
    pengaduans: Pengaduan[];
    chartData: ChartData[];
    countAllPengaduan: number;
    countPengaduanDiproses: number;
    countPengaduanSelesai: number;
}

export default function LandingPage({ pengaduans, chartData, countAllPengaduan, countPengaduanDiproses, countPengaduanSelesai }: Props) {
    const getInitials = useInitials();

    return (
        <GuestLayout>
            <div className="flex h-full w-full flex-1 flex-col">
                <HeroSection />
                <StatistikSection data={{ chartData, countAllPengaduan, countPengaduanDiproses, countPengaduanSelesai }} />
                <div className="mx-auto flex w-full max-w-6xl flex-col p-4 py-20">
                    <h1 className="md:text-4xl text-3xl font-semibold text-gray-800">Daftar Pengaduan Umum</h1>
                    <ListPengaduan items={pengaduans} />
                </div>
                <Footer />
            </div>
        </GuestLayout>
    );
}
