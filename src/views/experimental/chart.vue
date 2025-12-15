<template>
    <NLayout position="absolute" content-style="padding: 24px;">
        <NInputGroup style="padding-bottom: 20px">
            <NInput v-model:value="input_value" />
            <NButton @click="reload" type="primary" ghost>Confirm</NButton>
        </NInputGroup>
        <div ref="container"></div>
    </NLayout>
</template>

<script setup lang="ts">
import { useNotification } from "naive-ui";
import { Candlestick } from "../../utils/api";
import { onMounted, ref } from "vue";
import {
    type DataFromItem,
    add_date_candlestick_series,
    add_date_volume_series,
    create,
    create_candlestick_series,
    create_volume_series,
    data_convert,
} from "./chart";
import type { IChartApi, ISeriesApi } from "lightweight-charts";

const notification = useNotification();
const candlestick = new Candlestick(notification);
const result = ref<DataFromItem[]>([]);
const container = ref();
const input_value = ref();
let chart: IChartApi;
let candlestick_series: ISeriesApi<"Candlestick">;
let volume_series: ISeriesApi<"Histogram">;

const reload = async () => {
    result.value = await candlestick.Finviz(input_value.value, "d1", "i1");
    //添加数据
    const data = data_convert(result.value);
    candlestick_series.setData(add_date_candlestick_series(data));
    volume_series.setData(add_date_volume_series(data));
    //整理布局
    chart.timeScale().fitContent();
};

onMounted(() => {
    //创建图表
    chart = create(container.value, {
        layout: {
            attributionLogo: false,
            textColor: "white",
            background: { color: "black" },
        },
        height: 300,
        timeScale: {
            timeVisible: true,
        },
    });
    //创建蜡烛图
    candlestick_series = create_candlestick_series(chart);
    candlestick_series.priceScale().applyOptions({
        scaleMargins: {
            top: 0.1,
            bottom: 0.4,
        },
    });
    //创建成交量
    volume_series = create_volume_series(chart);
    volume_series.priceScale().applyOptions({
        scaleMargins: {
            top: 0.7,
            bottom: 0,
        },
    });
});
</script>
