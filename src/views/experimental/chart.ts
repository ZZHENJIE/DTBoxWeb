import { CandlestickSeries, createChart, type ChartOptions, type DeepPartial, type UTCTimestamp } from 'lightweight-charts';

interface Item {
    Close: number,
    Date: string,
    High: number,
    Low: number,
    Open: number,
    Volume: number
}

function getChartTimestamp(dateStr: string): number {
    const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s+(AM|PM)$/i);
    if (!match) return Math.floor(Date.now() / 1000);

    const [, month, day, year, hour, minute, period] = match as [string, string, string, string, string, string, string];

    let hours24 = parseInt(hour, 10);
    const periodUpper = period.toUpperCase();

    if (periodUpper === 'PM' && hours24 < 12) hours24 += 12;
    if (periodUpper === 'AM' && hours24 === 12) hours24 = 0;

    const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        hours24,
        parseInt(minute, 10)
    );

    return Math.floor(date.getTime() / 1000);
}

export default (dom: HTMLElement, result: Item[]) => {
    const chartOptions: DeepPartial<ChartOptions> = {
        layout: {
            textColor: 'white',
            background: {
                color: 'black'
            }
        },
        height: 300,
    };
    const chart = createChart(dom, chartOptions);
    // 监听窗口大小变化
    function handleResize() {
        const newWidth = window.innerWidth - 40;
        // 更新图表宽度
        chart.applyOptions({
            width: newWidth
        });
    }

    // 立即执行一次
    handleResize();

    // 添加监听
    window.addEventListener('resize', handleResize);
    // const areaSeries = chart.addSeries(AreaSeries, {
    //     lineColor: '#2962FF', topColor: '#2962FF',
    //     bottomColor: 'rgba(41, 98, 255, 0.28)',
    // });
    interface ValueItem { time: UTCTimestamp, value: number };
    interface CandlestickItems { time: UTCTimestamp, open: number, high: number, low: number, close: number };
    const value_items: ValueItem[] = [];
    const candlestick_items: CandlestickItems[] = [];

    for (const item of result) {
        const time = getChartTimestamp(item.Date) as UTCTimestamp;
        value_items.push({
            time: time,
            value: item.Volume
        });
        candlestick_items.push({
            time: time,
            open: item.Open,
            close: item.Close,
            high: item.High,
            low: item.Low,
        })
    }

    // areaSeries.setData(value_items);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candlestickSeries.setData(candlestick_items);

    chart.timeScale().fitContent();
}