<template></template>

<script setup lang="ts">
import type { PropType } from "vue";

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
    result: {
        type: Array as PropType<ScreenerItem[]>,
        required: true,
        default: () => [],
    },
});
//https://charts-node.finviz.com/chart.ashx?cs=l&t=LRHC&tf=i1&pm=240&am=1200&ct=candle_stick
</script>
