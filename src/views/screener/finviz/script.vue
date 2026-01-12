<template>
    <NLayout
        position="absolute"
        content-style="padding: 24px;"
        :native-scrollbar="false"
    >
        <div ref="codeEditor" style="height: 400px; width: 100%"></div>
        <NButton @click="run_code">Run</NButton>
    </NLayout>
</template>

<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup, EditorView } from "codemirror";
import { onMounted, ref } from "vue";

const codeEditor = ref();
const editorView = ref<EditorView | null>(null);
onMounted(() => {
    editorView.value = new EditorView({
        doc: 'console.log("hello, world");',
        extensions: [basicSetup, javascript()],
        parent: codeEditor.value,
    });
});

function run_code() {
    const code = editorView.value?.state.doc.toString();
    if (code) {
        eval(code);
    }
}
</script>
