<template>
    <NLayout
        position="absolute"
        style="display: flex; justify-content: center; padding: 20px"
    >
        <NCard style="width: 600px">
            <NTabs default-value="signin" animated>
                <NTabPane name="signin" tab="SignIn"><Signin /></NTabPane>
                <NTabPane name="register" tab="Register"><Register /></NTabPane>
            </NTabs>
        </NCard>
    </NLayout>
</template>

<script setup lang="ts">
import Register from "./register.vue";
import Signin from "./signin.vue";
</script>
