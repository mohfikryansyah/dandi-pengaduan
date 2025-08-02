import Chart, { ChartData } from '../menu/dashboard/admin/chart';

interface StatistikData {
    chartData: ChartData[];
    countAllPengaduan: number;
    countPengaduanDiproses: number;
    countPengaduanSelesai: number;
}

interface Props {
    data: StatistikData;
}

export default function StatistikSection({ data }: Props) {
    return (
        <div className="w-full p-8 py-20 bg-sky-50 rounded-br-[20rem]">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 text-center">
                <h1 className="text-4xl font-semibold text-gray-800">Statistik Pengaduan</h1>
                <p className="mx-auto max-w-xl text-lg leading-8 text-gray-600">
                    Lihat ringkasan jumlah pengaduan yang telah diajukan, status penanganannya, dan progres penyelesaian oleh pihak desa.
                    Transparan, terstruktur, dan terus diperbarui.
                </p>
                <div className="mt-10 flex md:flex-row flex-col gap-8 items-center justify-around">
                    <div className="">
                        <h1 className="font-atma text-5xl text-sky-800">{data.countAllPengaduan}</h1>
                        <p className="font-semibold text-gray-700">Total Pengaduan</p>
                    </div>
                    <div className="">
                        <h1 className="font-atma text-5xl text-sky-800">{data.countPengaduanDiproses}</h1>
                        <p className="font-semibold text-gray-700">Total Pengaduan Diproses</p>
                    </div>
                    <div className="">
                        <h1 className="font-atma text-5xl text-sky-800">{data.countPengaduanSelesai}</h1>
                        <p className="font-semibold text-gray-700">Total Pengaduan Selesai</p>
                    </div>
                </div>
                <div className="mx-auto mt-10 w-full max-w-md">
                    <Chart chartData={data.chartData}></Chart>
                </div>
            </div>
        </div>
    );
}
