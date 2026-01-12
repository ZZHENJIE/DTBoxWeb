<template>
    <NDataTable
        :columns="columns"
        :data="data"
        :pagination="paginationReactive"
    />
</template>

<script setup lang="ts">
import { NText, type DataTableColumns } from "naive-ui";
import type { PropType } from "vue";
import { h, reactive } from "vue";

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
});

function create_columns(): DataTableColumns<ScreenerItem> {
    return [
        {
            title: "No.",
            key: "No.",
            width: 50,
        },
        {
            title: "Symbol",
            key: "Ticker",
            width: 80,
        },
        {
            title: "Company",
            key: "Company",
            ellipsis: { tooltip: true },
        },
        {
            title: "Sector",
            key: "Sector",
            ellipsis: { tooltip: true },
        },
        {
            title: "Industry",
            key: "Industry",
            ellipsis: { tooltip: true },
        },
        {
            title: "Country",
            key: "Country",
            ellipsis: { tooltip: true },
        },
        {
            title: "Market Cap",
            key: "Market Cap",
            ellipsis: { tooltip: true },
            render(row) {
                const marketCap = row["Market Cap"];
                if (marketCap == undefined) {
                    return "—";
                } else {
                    return `${marketCap}M`;
                }
            },
        },
        {
            title: "P/E",
            key: "P/E",
            render(row) {
                return row["P/E"]?.toFixed(2) ?? "—";
            },
        },
        {
            title: "Price",
            key: "Price",
            render(row) {
                return row.Price?.toFixed(2) ?? "—";
            },
        },
        {
            title: "Change",
            key: "Change",
            render: (row) => {
                const value = Number(row.Change.slice(0, -1));
                const color = value > 0 ? "#90EE90" : "#DB7093";
                return h(
                    NText,
                    {
                        style: {
                            color: color,
                        },
                    },
                    () => value + "%",
                );
            },
        },
        {
            title: "Volume",
            key: "Volume",
            ellipsis: { tooltip: true },
            render(row) {
                return row.Volume?.toLocaleString("en-US") ?? "—";
            },
        },
    ];
}
const columns = create_columns();
const paginationReactive = reactive({
    page: 1,
    pageSize: 20,
    showSizePicker: true,
    pageSizes: [20, 40, 60],
    onChange: (page: number) => {
        paginationReactive.page = page;
    },
    onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
    },
});
</script>
