<script lang="ts" setup>
import { useElementPlusDesignTokens } from '@vben/hooks';

import { ElConfigProvider } from 'element-plus';

import { elementLocale } from '#/locales';

defineOptions({ name: 'App' });

useElementPlusDesignTokens();
</script>

<template>
  <!-- ElConfigProvider 是Element Plus 库的一个组件，它用于配置Element Plus组件库的全局配置，:locale="elementLocale" 语言配置 -->
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
