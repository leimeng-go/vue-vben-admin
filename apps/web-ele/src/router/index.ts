import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { resetStaticRoutes } from '@vben/utils';

import { createRouterGuard } from './guard';
import { routes } from './routes';

/**
 *  @zh_CN 创建vue-router实例
 */
const router = createRouter({
  history:
    // 根据环境变量选择使用hash模式或history模式
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? // 它使用URL的hash部分（即#后面的部分）来模拟完整的URL路径,而不会导致浏览器向服务器发送请求，一般格式是：https://example.com/#/about
        createWebHashHistory(import.meta.env.VITE_BASE)
      : // 基于HTML5的history.pushState API来实现的，无需#，请求后段url
        createWebHistory(import.meta.env.VITE_BASE),
  // 应该添加到路由的初始路由列表。
  routes,
  // 定义了页面切换时的滚动行为
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 };
  },
  // 是否应该禁止尾部斜杠。
  // strict: true,
});

const resetRoutes = () => resetStaticRoutes(router, routes);

// 创建路由守卫
createRouterGuard(router);

export { resetRoutes, router };
