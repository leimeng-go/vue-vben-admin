<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';

import { computed, markRaw } from 'vue';

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'vben',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
  {
    label: 'Guest',
    value: 'guest',
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      /*
       * VbenSelect: 这是一个自定义组件，用于处理用户选择账户的组件
       * componentProps: 这是一个动态属性绑定，将componentProps计算属性的值传递给VbenSelect组件
       * options: 这是一个动态属性绑定，将MOCK_USER_OPTIONS计算属性的值传递给VbenSelect组件
       * placeholder: 这是一个动态属性绑定，将$t('authentication.selectAccount')计算属性的值传递给VbenSelect组件
       * fieldName: 这是一个动态属性绑定，将'selectAccount'计算属性的值传递给VbenSelect组件
       * label: 这是一个动态属性绑定，将$t('authentication.selectAccount')计算属性的值传递给VbenSelect组件
       * rules: 这是一个动态属性绑定，将z.string().min(1, { message: $t('authentication.selectAccount') })计算属性的值传递给VbenSelect组件
       */
      component: 'VbenSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('vben'),
    },
    /*
     * VbenInput: 这是一个自定义组件，用于处理用户输入的组件
     * componentProps: 这是一个动态属性绑定，将componentProps计算属性的值传递给VbenInput组件
     * placeholder: 这是一个动态属性绑定，将$t('authentication.usernameTip')计算属性的值传递给VbenInput组件
     * dependencies: 这是一个动态属性绑定，将dependencies计算属性的值传递给VbenInput组件
     * triggerFields: 这是一个动态属性绑定，将['selectAccount']计算属性的值传递给VbenInput组件
     */
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: '123456',
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    /*
     * VbenInputPassword: 这是一个自定义组件，用于处理用户输入密码的组件
     * componentProps: 这是一个动态属性绑定，将componentProps计算属性的值传递给VbenInputPassword组件
     * placeholder: 这是一个动态属性绑定，将$t('authentication.password')计算属性的值传递给VbenInputPassword组件
     */
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    /*
     * SliderCaptcha: 这是一个自定义组件，用于处理用户输入验证码的组件
     * component: 这是一个动态属性绑定，将markRaw(SliderCaptcha)计算属性的值传递给SliderCaptcha组件
     * fieldName: 这是一个动态属性绑定，将'captcha'计算属性的值传递给SliderCaptcha组件
     * rules: 这是一个动态属性绑定，将z.boolean().refine((value) => value, { message: $t('authentication.verifyRequiredTip') })计算属性的值传递给SliderCaptcha组件
     */
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },
  ];
});
</script>

<!-- 
AuthenticationLogin: 这是一个自定义组件，用于处理用户认证登录的组件
<<<<<<< HEAD
：form-schema: 这是一个动态属性绑定，将formSchema计算属性的值传递给AuthenticationLogin组件
：loading: 这是一个动态属性绑定，将authStore.loginLoading计算属性的值传递给AuthenticationLogin组件
：submit: 这是一个事件绑定，将authStore.authLogin方法绑定到AuthenticationLogin组件的submit事件上
=======
:form-schema="formSchema": 这是一个属性绑定，将formSchema变量传递给AuthenticationLogin组件。formSchema可能包含了表单的结构和验证规则。
:loading="authStore.loginLoading": 这个属性绑定用于控制登录过程中的加载状态。它使用了authStore中的loginLoading属性，可能是一个布尔值，用来显示或隐藏加载指示器。
@submit="authStore.authLogin": 这是一个事件监听器，当表单提交时，它会调用authStore中的authLogin方法来处理登录逻辑。
>>>>>>> dfa41e43c9f6fa365690e7062b82c0e92854276f
-->
<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
