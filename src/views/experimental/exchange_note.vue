<template>
    <NLayout position="absolute" content-style="padding: 24px;">
        <div class="markdown-body" v-html="markdown"></div>
    </NLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import markdown_text from "../../assets/markdown/exchange_note.md?raw";
import { marked } from "marked";

const markdown = ref(marked(markdown_text));
</script>

<style lang="css">
.markdown-body table {
    width: 100%;
}

.markdown-body th {
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
}

.markdown-body td {
    padding: 10px 12px;
}
</style>
