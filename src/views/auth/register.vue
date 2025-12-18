<template>
    <NForm>
        <NFormItemRow label="Name">
            <NInput v-model:value="name" />
        </NFormItemRow>
        <NFormItemRow label="Password">
            <NInput
                type="password"
                show-password-on="click"
                minlength="8"
                v-model:value="password"
            />
        </NFormItemRow>
        <NFormItemRow label="Confirm Password">
            <NInput
                type="password"
                show-password-on="click"
                minlength="8"
                v-model:value="confirm_password"
            />
        </NFormItemRow>
    </NForm>
    <NButton @click="register" type="primary" block secondary strong>
        Register
    </NButton>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User } from "../../utils/api";
import { useNotification } from "naive-ui";

const notification = useNotification();
const user = new User(notification);
const name = ref();
const password = ref();
const confirm_password = ref();

const register = async () => {
    const result = await user.Register(name.value, password.value);
};

// const password_is_reasonable = () => {
//     return "success";
// };
// const confirm_password_is_reasonable = () => {
//     return "success";
// };
//
</script>
