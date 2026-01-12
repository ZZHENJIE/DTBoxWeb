<template>
    <NLayout position="absolute" has-sider>
        <NLayout content-style="padding: 8px;" :native-scrollbar="false">
            <NList hoverable clickable>
                <NListItem
                    v-for="item in news_result"
                    @click="openUrl(item.Url)"
                >
                    <NThing :title="item.Title">
                        <template #description>
                            <NSpace size="small" style="margin-top: 4px">
                                <NTag round type="info">
                                    {{ item.Source }}
                                </NTag>
                            </NSpace>
                        </template>
                        {{ item.Date }}
                    </NThing>
                </NListItem>
            </NList>
        </NLayout>
        <NLayoutSider
            content-style="padding: 24px;"
            :native-scrollbar="false"
            bordered
        >
        </NLayoutSider>
    </NLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLoadingBar, useNotification } from "naive-ui";
import Event from "../utils/api/event";
import { openUrl } from "../utils/tool";

interface News_Item {
    Title: string;
    Source: string;
    Date: string;
    Url: string;
    Category: string;
}

export interface News {
    Common: News_Item[];
}

const notification = useNotification();
const event = new Event(notification);
const news_result = ref<News_Item[]>([]);
const loadingBar = useLoadingBar();
const news_refresh = async () => {
    loadingBar.start();
    const json = (await event.Finviz("News", (_) => {
        loadingBar.finish();
    })) as News;
    news_result.value = json.Common;
};

onMounted(() => news_refresh());
</script>
