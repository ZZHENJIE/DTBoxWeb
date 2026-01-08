<template>
    <NLayout position="absolute" content-style="padding: 6px;">
        <NInputGroup>
            <NInput
                v-model:value="query_url"
                style="margin-bottom: 6px"
            ></NInput>
            <NButton @click="format_object"> Format </NButton>
        </NInputGroup>
        <NCard title="Descriptive">
            <NFlex>
                <NPopover v-for="query of querys" trigger="hover">
                    <template #trigger>
                        <NButton>{{ query.label }}</NButton>
                    </template>
                    <div v-if="query.type === 'select'">
                        <NTransfer
                            @update:value="
                                (value: Array<string | number>) =>
                                    select_on_update(value, query.key)
                            "
                            virtual-scroll
                            :value="query_object[query.key]"
                            :options="query.options"
                        />
                    </div>
                    <div style="width: 150px" v-if="query.type === 'value'">
                        <NTabs type="segment" animated>
                            <NTabPane name="select" tab="Select">
                                <NSelect
                                    placeholder="Any"
                                    :options="query.options"
                                />
                            </NTabPane>
                            <NTabPane name="edit" tab="Edit">
                                <NInputNumber
                                    button-placement="both"
                                    placeholder="Begin"
                                    ><template #suffix>{{
                                        query.unit
                                    }}</template>
                                </NInputNumber>
                                <NInputNumber
                                    button-placement="both"
                                    placeholder="End"
                                    ><template #suffix>{{
                                        query.unit
                                    }}</template>
                                </NInputNumber>
                            </NTabPane>
                        </NTabs>
                    </div>
                </NPopover>
            </NFlex>
        </NCard>
    </NLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import querys from "../../../assets/finviz_screener_query.json";

interface QueryObject {
    [key: string]: Array<string | number>;
}

const query_object = ref<QueryObject>({});
const query_url = ref("");

function select_on_update(value: Array<string | number>, key: string) {
    query_object.value[key] = value;
}

function format_object() {
    query_url.value = "";
    Object.entries(query_object.value).forEach(([key, value]) => {
        const length = value.length;
        if (length != 0) {
            query_url.value = query_url.value + `${key}_`;
            value.forEach((val) => {
                query_url.value = query_url.value + `${val}|`;
            });
            query_url.value = query_url.value.slice(0, -1) + ",";
        }
    });
    if (query_url.value.length != 0) {
        query_url.value = query_url.value.slice(0, -1);
    }
}
</script>
