<template>
    <NButton @click="button_click">Auth</NButton>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const $router = useRouter();

const button_click = () => $router.push("/auth");
</script>
