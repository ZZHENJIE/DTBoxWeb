<template>
    <NForm>
        <NFormItemRow label="Name">
            <NInput v-model:value="name" />
        </NFormItemRow>
        <NFormItemRow label="Password">
            <NInput v-model:value="password" type="password" />
        </NFormItemRow>
    </NForm>
    <NButton @click="signin" type="primary" block secondary strong>
        Singin
    </NButton>
</template>

<script setup lang="ts">
import { ref } from "vue";
import User from "../../utils/api/user";
import { useNotification } from "naive-ui";

const notification = useNotification();
const user = new User(notification);
const name = ref();
const password = ref();

interface SI {
    token: string;
}

const signin = async () => {
    const singin_object = (await user.SignIn(name.value, password.value)) as SI;
    const token = singin_object.token;
    const result = await user.ProFile(token);
    console.log(result);
};

// const password_is_reasonable = () => {
//     return "success";
// };
// const confirm_password_is_reasonable = () => {
//     return "success";
// };
//
</script>
