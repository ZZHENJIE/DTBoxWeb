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
import Candlestick from "../../utils/api/candlestick";
import { onMounted, ref } from "vue";
import { CandlestickChart, type DataItem } from "./candlestick_chart";

const notification = useNotification();
const candlestick = new Candlestick(notification);
const result = ref<DataItem[]>([]);
const container = ref();
const input_value = ref("NVDA");
let chart: CandlestickChart;

const reload = async () => {
    result.value = (await candlestick.Finviz(
        input_value.value,
        "d1",
        "i1",
    )) as DataItem[];
    chart.set_data(result.value);
};

onMounted(() =>
    setTimeout(() => {
        chart = new CandlestickChart(container.value, {
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
        chart.add_tooltip(container.value);
    }, 1),
);
</script>
