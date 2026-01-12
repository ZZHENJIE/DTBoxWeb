<template>
    <NConfigProvider :theme="get_theme()" inlineThemeDisabled>
        <NLoadingBarProvider>
            <NNotificationProvider>
                <NModalProvider><slot /></NModalProvider>
            </NNotificationProvider>
        </NLoadingBarProvider>
    </NConfigProvider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui";
const props = defineProps({
    theme: Boolean,
});

const get_theme = () => {
    return props.theme ? darkTheme : lightTheme;
};
</script>
