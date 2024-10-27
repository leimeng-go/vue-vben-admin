import type { LocaleSetupOptions, SupportedLanguagesType } from '@vben/locales';
import type { Language } from 'element-plus/es/locale';

import type { App } from 'vue';
import { ref } from 'vue';

import { $t, setupI18n as coreSetup, loadLocalesMap } from '@vben/locales';
import { preferences } from '@vben/preferences';

import dayjs from 'dayjs';
import enLocale from 'element-plus/es/locale/lang/en';
import defaultLocale from 'element-plus/es/locale/lang/zh-cn';
/*
const elementLocale: 声明一个常量 elementLocale ,用于存储语言设置
ref<Language>: 使用vue3的ref函数创建以一个响应式引用。<Language>是一个泛型类型参数，指定了这个ref中存储的值的类型
*/
const elementLocale = ref<Language>(defaultLocale);
// 动态导入当前目录下langs 文件夹中所有以.json结尾的文件，这些文件被视作模块，并且他们的内容被导入到modules 对象中。
const modules = import.meta.glob('./langs/*.json');

const localesMap = loadLocalesMap(modules);

/**
 * 加载应用特有的语言包
 * 这里也可以改造为从服务端获取翻译数据
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  // 解构赋值,const [appLocaleMessages] = ... ,只取Promise.all返回的数组中的第一个元素，即localesMap[lang]?.()的结果
  const [appLocaleMessages] = await Promise.all([
    // 导入当前目录下的langs文件夹下的所有以.json结尾的文件，并将其内容导入到modules对象中。
    // vite 特有功能
    localesMap[lang]?.(),
    loadThirdPartyMessage(lang),
  ]);
  return appLocaleMessages?.default;
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  await Promise.all([loadElementLocale(lang), loadDayjsLocale(lang)]);
}

/**
 * 加载dayjs的语言包
 * @param lang
 */
async function loadDayjsLocale(lang: SupportedLanguagesType) {
  let locale;
  switch (lang) {
    case 'zh-CN': {
      locale = await import('dayjs/locale/zh-cn');
      break;
    }
    case 'en-US': {
      locale = await import('dayjs/locale/en');
      break;
    }
    // 默认使用英语
    default: {
      locale = await import('dayjs/locale/en');
    }
  }
  if (locale) {
    dayjs.locale(locale);
  } else {
    console.error(`Failed to load dayjs locale for ${lang}`);
  }
}

/**
 * 加载element-plus的语言包
 * @param lang
 */
async function loadElementLocale(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'zh-CN': {
      elementLocale.value = defaultLocale;
      break;
    }
    case 'en-US': {
      elementLocale.value = enLocale;
      break;
    }
  }
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreSetup(app, {
    defaultLocale: preferences.app.locale,
    loadMessages,
    missingWarn: !import.meta.env.PROD,
    ...options,
  });
}

export { $t, elementLocale, setupI18n };
