<template>
    <NLayout position="absolute" style="padding: 6px" :native-scrollbar="false">
        <NTabs
            type="segment"
            @update:value="on_update"
            default-value="EDGA"
            animated
        >
            <NTabPane v-for="value in markets" :name="value" :tab="value" />
        </NTabs>
        <NTable>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>EDGA</td>
                    <td>100.00</td>
                    <td>1000</td>
                </tr>
            </tbody>
        </NTable>
    </NLayout>
</template>

<script setup lang="ts">
import { useNotification } from "naive-ui";
import { ref } from "vue";
import Market from "../../utils/api/market";

const markets = ref(["EDGA", "EDGK", "BYX", "BZX"]);
const notification = useNotification();
const market = new Market(notification);
// const result = ref([]);
const on_update = (value: "EDGA" | "EDGK" | "BYX" | "BZX") => {
    market.cboe_book_view(value);
};
</script>
