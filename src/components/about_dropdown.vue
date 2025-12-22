<template>
    <NDropdown trigger="hover" :options="options">
        <NButton @click="$router.push('/about')">About</NButton>
    </NDropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";

const options = ref([
    {
        label: "Help",
        key: "help",
    },
]);

fetch("/api/version").then(async (response) => {
    const version = await response.text();
    options.value.push({
        label: version,
        key: "version",
    });
});
</script>
