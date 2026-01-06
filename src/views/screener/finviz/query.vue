<template>
    <NLayout position="absolute" content-style="padding: 6px;">
        <NInput v-model:value="query_url" style="margin-bottom: 6px"></NInput>
        <NFlex>
            <NPopover v-for="query of querys" trigger="hover">
                <template #trigger>
                    <NButton>{{ query.label }}</NButton>
                </template>
                <div v-if="query.type === 'select'">
                    <NTransfer virtual-scroll :options="query.options" />
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
                                ><template #suffix>{{ query.unit }}</template>
                            </NInputNumber>
                            <NInputNumber
                                button-placement="both"
                                placeholder="End"
                                ><template #suffix>{{ query.unit }}</template>
                            </NInputNumber>
                        </NTabPane>
                    </NTabs>
                </div>
            </NPopover>
        </NFlex>
    </NLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import querys from "../../../assets/finviz_screener_query.json";

const query_url = ref("");
</script>
