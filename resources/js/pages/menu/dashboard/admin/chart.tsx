'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export interface ChartData {
    month: string;
    pengaduan: number;
    surat: number;
}

interface Props {
    chartData: ChartData[];
}

const chartConfig = {
    pengaduan: {
        label: 'Pengaduan',
        color: 'hsl(var(--chart-1))',
    },
    surat: {
        label: 'Permohonan Surat',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export default function Chart({ chartData }: Props) {
    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Diagram Pengaduan & Surat</CardTitle>
                    <CardDescription>Tidak ada data tersedia</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-muted-foreground text-sm">
                        Belum ada pengaduan atau surat yang tercatat untuk ditampilkan dalam grafik.
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getPercentageChange = (current: number, previous: number): number => {
        if (previous === 0) return 100;
        return ((current - previous) / previous) * 100;
    };

    const getStartAndEndMonth = (data: { month: string }[]) => {
        const months = data.map((item) => item.month);
        const startMonth = months[0];
        const endMonth = months[months.length - 1];
        return { startMonth, endMonth };
    };

    const { startMonth, endMonth } = getStartAndEndMonth(chartData);

    const prev = chartData.length > 1 ? chartData[chartData.length - 2] : null;
    const curr = chartData[chartData.length - 1];

    const totalPrev = prev ? prev.pengaduan + prev.surat : 0;
    const totalCurr = curr.pengaduan + curr.surat;

    const percentChange = prev ? getPercentageChange(totalCurr, totalPrev) : 0;

    const getTrendInfo = () => {
        if (prev) {
            if (percentChange > 0) {
                return {
                    icon: <TrendingUp className="h-4 w-4 text-green-600" />,
                    text: `Total naik ${percentChange.toFixed(1)}% dari bulan ${prev.month}`,
                    color: 'text-green-700',
                };
            } else if (percentChange < 0) {
                return {
                    icon: <TrendingDown className="h-4 w-4 text-red-600" />,
                    text: `Total turun ${Math.abs(percentChange).toFixed(1)}% dari bulan ${prev.month}`,
                    color: 'text-red-700',
                };
            } else {
                return {
                    icon: <Minus className="h-4 w-4 text-gray-500" />,
                    text: 'Tidak ada perubahan jumlah dari bulan sebelumnya',
                    color: 'text-gray-700',
                };
            }
        } else {
            return {
                icon: <Minus className="h-4 w-4 text-gray-500" />,
                text: 'Data bulan sebelumnya tidak tersedia',
                color: 'text-gray-500',
            };
        }
    };

    const { icon, text } = getTrendInfo();

    const currentYear = new Date().getFullYear();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Diagram Pengaduan & Surat</CardTitle>
                <CardDescription>{`${startMonth} - ${endMonth} ${currentYear}`}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="pengaduan" fill="var(--color-pengaduan)" radius={4} />
                        <Bar dataKey="surat" fill="var(--color-surat)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    {icon}
                    {text}
                </div>
                <div className="text-muted-foreground leading-none">
                    Menampilkan total pengaduan & surat untuk 6 bulan terakhir
                </div>
            </CardFooter>
        </Card>
    );
}
