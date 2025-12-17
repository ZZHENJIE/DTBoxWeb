import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  type CandlestickData,
  type ChartOptions,
  type DeepPartial,
  type HistogramData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";

const toolTipWidth = 80;
const toolTipHeight = 80;
const toolTipMargin = 15;

export interface DataItem {
  Close: number;
  Date: string;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}

export class CandlestickChart {
  symbol: string | null = null;
  is_time: boolean;
  chart: IChartApi;
  candlestick_series: ISeriesApi<"Candlestick">;
  volume_series: ISeriesApi<"Histogram">;
  constructor(container_dom: HTMLElement, options: DeepPartial<ChartOptions>) {
    this.is_time = true;
    //create chart
    this.chart = createChart(container_dom, options);
    //create candlestick series
    this.candlestick_series = this.chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    this.candlestick_series.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });
    //create volume series
    this.volume_series = this.chart.addSeries(HistogramSeries, {
      color: "#2962FF",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    this.volume_series.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });
  }

  set_symbol(symbol: string) {
    this.symbol = symbol;
  }

  set_is_time(is_time: boolean) {
    this.is_time = is_time;
  }

  set_data(items: DataItem[]) {
    const result = this.data_convert(items);
    const volume_data: {
      time: Time;
      value: number;
    }[] = [];
    const candlestick_data: {
      time: Time;
      open: number;
      high: number;
      low: number;
      close: number;
    }[] = [];
    for (const item of result) {
      volume_data.push({
        time: item.time,
        value: item.volume,
      });
      candlestick_data.push({
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      });
    }
    this.candlestick_series.setData(candlestick_data);
    this.volume_series.setData(volume_data);
    this.chart.timeScale().fitContent();
  }

  data_convert(items: DataItem[]) {
    const result: {
      time: Time;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }[] = [];
    for (const item of items) {
      const time: Time = this.is_time
        ? time_str_to_timestamp(item.Date)
        : item.Date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
      result.push({
        time: time,
        open: item.Open,
        close: item.Close,
        high: item.High,
        low: item.Low,
        volume: item.Volume,
      });
    }
    return result;
  }

  add_tooltip(container_dom: HTMLElement) {
    const toolTip = document.createElement("div");
    toolTip.style = `width: 110px; height: 110px; position: absolute; display: none; padding: 8px; box-sizing: border-box; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = "black";
    toolTip.style.color = "white";
    toolTip.style.borderColor = "rgba( 38, 166, 154, 1)";
    container_dom.appendChild(toolTip);

    this.chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container_dom.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container_dom.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        toolTip.style.display = "block";
        const volume_data: HistogramData = param.seriesData.get(
          this.volume_series,
        ) as HistogramData;
        const candlestick_data: CandlestickData = param.seriesData.get(
          this.candlestick_series,
        ) as CandlestickData;
        toolTip.innerHTML = `
          <div style="font-size: 12px; margin: 2px 0px; color: ${"white"}">
                Open:${candlestick_data.open}
                High:${candlestick_data.high}
                Low:${candlestick_data.low}
                Close:${candlestick_data.close}
                Volume:${volume_data.value}
                </div>
        `;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > container_dom.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > container_dom.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + "px";
        toolTip.style.top = top + "px";
      }
    });
  }
}

const time_str_to_timestamp = (dateStr: string): UTCTimestamp => {
  const split = dateStr.split(" ");
  const date = split[0]!.replace(/\//g, "-");
  const time = split[1];
  const str = `${date}Z${time}:00`;

  const dateObj = new Date(str);
  return (dateObj.getTime() / 1000) as UTCTimestamp;
};
