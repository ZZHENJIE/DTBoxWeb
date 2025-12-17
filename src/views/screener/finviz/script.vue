<template>
    <NLayout
        position="absolute"
        content-style="padding: 24px;"
        :native-scrollbar="false"
    >
        <div ref="codeEditor" style="height: 400px; width: 100%"></div>
    </NLayout>
</template>

<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup, EditorView } from "codemirror";
import { onMounted, ref } from "vue";

const codeEditor = ref();
onMounted(() => {
    new EditorView({
        doc: 'console.log("hello, world")',
        extensions: [basicSetup, javascript()],
        parent: codeEditor.value,
    });
});
</script>
