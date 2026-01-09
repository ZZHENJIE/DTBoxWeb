<template>
    <NLayout position="absolute" content-style="padding: 6px;">
        <NModal v-model:show="query_select_show">
            <NCard style="width: 400px" title="Query Select">
                <NForm>
                    <NFormItem label="Parameter">
                        <NSelect
                            :options="parameter_url_options"
                            placeholder="Please Select"
                            v-model:value="query_value.parameter_url"
                        />
                    </NFormItem>
                    <NFormItem label="Auto Refresh Time">
                        <NSelect
                            :options="auto_refresh_time_options"
                            v-model:value="query_value.auto_refresh_time"
                        />
                    </NFormItem>
                    <NFormItem label="Interval">
                        <NSelect
                            :options="interval_options"
                            v-model:value="query_value.interval"
                        />
                    </NFormItem>
                </NForm>
                <template #action>
                    <NButton @click="model_confirm">Confirm</NButton>
                </template>
            </NCard>
        </NModal>
        <NTabs type="segment" animated>
            <NTabPane name="table" tab="Table">
                <ResultTable :result="result" />
            </NTabPane>
            <NTabPane name="chart" tab="Chart">
                <ResultChart :result="result" />
            </NTabPane>
        </NTabs>
        <NTooltip style="z-index: 1000">
            <template #trigger
                ><NFloatButton
                    @click="toggleRunningState"
                    :top="112"
                    :right="10"
                >
                    <NIcon>
                        <Stop v-if="is_running" />
                        <Play v-else />
                    </NIcon> </NFloatButton
            ></template>
            Last Update Time: {{ last_update_time }}
        </NTooltip>
    </NLayout>
</template>

<script setup lang="ts">
import { Play, Stop } from "@vicons/ionicons5";
import { useNotification } from "naive-ui";
import { ref } from "vue";
import Screener from "../../../utils/api/screener";
import ResultTable from "./result_table.vue";
import ResultChart from "./result_chart.vue";

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

const notification = useNotification();
const screener = new Screener(notification);
const result = ref<ScreenerItem[]>([]);
const last_update_time = ref<string>("");
const refresh_timeout = ref<number | null>(null);
const query_select_show = ref(true);
const is_running = ref(false);
const query_value = ref({
    parameter_url: null,
    auto_refresh_time: 10,
    interval: "i1",
});

function toggleRunningState() {
    if (is_running.value) {
        is_running.value = false;
        clearTimeout(refresh_timeout.value!);
    } else {
        query_select_show.value = true;
    }
}

function model_confirm() {
    if (query_value.value.parameter_url === null) {
        notification.error({
            title: "Please select a parameter",
            duration: 2000,
        });
    } else {
        query_select_show.value = false;
        is_running.value = true;
        start_query();
    }
}

async function start_query() {
    result.value = (await screener.Finviz(
        query_value.value.parameter_url!,
    )) as ScreenerItem[];
    last_update_time.value = new Date().toLocaleString();
    if (is_running.value) {
        refresh_timeout.value = setTimeout(
            () => start_query(),
            query_value.value.auto_refresh_time * 1000,
        );
    }
}

const auto_refresh_time_options = [
    { label: "10 Seconds", value: 10 },
    { label: "30 Seconds", value: 30 },
    { label: "1 Minute", value: 60 },
];

const interval_options = [
    { label: "1 Minute", value: "i1" },
    { label: "3 Minutes", value: "i3" },
    { label: "5 Minutes", value: "i5" },
];

const parameter_url_options = [
    {
        label: "超0.7$交易量",
        value: "&f=sh_price_0.7to20,sh_curvol_o200&o=-volume",
    },
    {
        label: "异常交易量",
        value: "&s=ta_unusualvolume&f=sh_price_0.5to30,sh_curvol_o200&o=-volume",
    },
    {
        label: "10$手续费",
        value: "&f=ind_shellcompanies,sh_curvol_o200,sh_price_5to20&o=-volume",
    },
    {
        label: "稳票",
        value: "&f=sh_curvol_o200,sh_price_1to20,ta_change_-3to3&ft=4&o=-volume",
    },
];
</script>
