<script lang="ts" setup>
import { useElementPlusDesignTokens } from '@vben/hooks';

import { ElConfigProvider } from 'element-plus';

import { elementLocale } from '#/locales';
// Vue3 中的一个编译时宏(compile-time macro),用于在单文件组件(SFC)中定义组件选项。
// 这个语句的作用是为组件定一个名称"App"，这样在其他地方引用这个组件时，就可以直接使用"App"这个名称来引用这个组件。
defineOptions({ name: 'App' });

// Element Plus 主题适配
useElementPlusDesignTokens();
</script>

<template>
  <!-- ElConfigProvider 是Element Plus 库的一个组件，它用于配置Element Plus组件库的全局配置，:locale="elementLocale" 语言配置 -->
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
