<template>
    <NLayout position="absolute" content-style="padding: 24px;">
        <div id="container"></div>
    </NLayout>
</template>

<script setup lang="ts">
import { useNotification } from "naive-ui";
import { Candlestick } from "../../utils/api";
import { onMounted, ref } from "vue";
import Chart from "./chart";

interface Item {
    Close: number;
    Date: string;
    High: number;
    Low: number;
    Open: number;
    Volume: number;
}

const notification = useNotification();
const candlestick = new Candlestick(notification);
const result = ref<Item[]>([]);

onMounted(async () => {
    result.value = await candlestick.Finviz("AAPL");
    const container_dom = document.getElementById("container");
    if (!container_dom) {
        return;
    }
    Chart(container_dom, result.value);
});
</script>
