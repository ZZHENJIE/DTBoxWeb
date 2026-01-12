<template>
    <NFlex justify="center">
        <NImage
            v-for="item in result"
            :key="item.Ticker"
            :src="get_img_src(item.Ticker)"
        />
    </NFlex>
    <br />
    <NFlex justify="end">
        <NPagination
            v-model:page="page"
            v-model:page-size="page_size"
            :page-count="Math.ceil(data.length / page_size)"
            show-size-picker
            :page-sizes="[12, 24, 36]"
        ></NPagination>
    </NFlex>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from "vue";

interface ScreenerItem {
    "No.": number;
    Ticker: string;
    Company: string;
    Sector: string;
    Industry: string;
    Country: string;
    "Market Cap"?: number;
    "P/E"?: number;
    Price?: number;
    Change: string;
    Volume?: number;
}

const props = defineProps({
    data: {
        type: Array as PropType<ScreenerItem[]>,
        required: true,
        default: () => [],
    },
    interval: String,
});

const page = ref(1);
const page_size = ref(12);
const result = computed<ScreenerItem[]>(() => {
    const start = (page.value - 1) * page_size.value;
    return props.data.slice(start, start + page_size.value);
});

function get_img_src(symbol: string) {
    return `https://charts-node.finviz.com/chart.ashx?cs=l&t=${symbol}&tf=${props.interval}&pm=240&am=0&ct=candle_stick&tm=d`;
}
</script>
