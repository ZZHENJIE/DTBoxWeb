import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  type ChartOptions,
  type DeepPartial,
  type IChartApi,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";

export interface DataFromItem {
  Close: number;
  Date: string;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}

interface DataItem {
  Close: number;
  time: Time;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}

const time_str_to_timestamp = (dateStr: string): UTCTimestamp => {
  const split = dateStr.split(" ");
  const date = split[0]!.replace(/\//g, "-");
  const time = split[1];
  const str = `${date}Z${time}:00`;

  const dateObj = new Date(str);
  return (dateObj.getTime() / 1000) as UTCTimestamp;
};

export const create = (
  container_dom: HTMLElement,
  options: DeepPartial<ChartOptions>,
) => {
  return createChart(container_dom, options);
};

export const create_volume_series = (charts: IChartApi) => {
  return charts.addSeries(HistogramSeries, {
    color: "#2962FF",
    priceFormat: {
      type: "volume",
    },
    priceScaleId: "",
  });
};

export const add_date_volume_series = (items: DataItem[]) => {
  const result: {
    time: Time;
    value: number;
  }[] = [];
  for (const item of items) {
    result.push({
      time: item.time,
      value: item.Volume,
    });
  }
  return result;
};

export const create_candlestick_series = (charts: IChartApi) => {
  return charts.addSeries(CandlestickSeries, {
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
  });
};

export const add_date_candlestick_series = (items: DataItem[]) => {
  const result: {
    time: Time;
    open: number;
    high: number;
    low: number;
    close: number;
  }[] = [];
  for (const item of items) {
    result.push({
      time: item.time,
      open: item.Open,
      high: item.High,
      low: item.Low,
      close: item.Close,
    });
  }
  return result;
};

export const data_convert = (
  items: DataFromItem[],
  is_time: boolean = true,
) => {
  const result: DataItem[] = [];
  for (const item of items) {
    const time: Time = is_time
      ? time_str_to_timestamp(item.Date)
      : item.Date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
    result.push({
      time: time,
      Open: item.Open,
      Close: item.Close,
      High: item.High,
      Low: item.Low,
      Volume: item.Volume,
    });
  }
  return result;
};
