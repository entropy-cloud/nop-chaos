<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from '../router';

import {ajaxRequest, useAdapter} from '@nop-chaos/sdk'

import {Form as AForm, FormItem as AFormItem, Button as AButton, 
  Input as AInput, InputPassword as AInputPassword} from 'ant-design-vue'

const router = useRouter();

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
  
  ajaxRequest({
    url: `/r/LoginApi__login?@selection=token:accessToken`,
    data: {
      loginType: 1,
      principalId: formState.username,
      principalSecret: formState.password,
      verifyCode: null,
      verifySecret: null
    }
  }).then((res:any)=>{
    useAdapter().setAuthToken(res.token)
    router.push("/")
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

