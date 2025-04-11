import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/homePage',
  name: 'homePage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.homePage',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/homePage/workplace/index.vue'),
      meta: {
        locale: 'menu.homePage.workplace',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
