import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactMange: AppRouteRecordRaw = {
  path: '/BottomFactory',
  name: 'BottomFactory',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.BottomFactory',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'glue_stock',
      name: 'glue_stock',
      component: () =>
        import('@/views/BottomFactory/glue_stock/index.vue'),
      meta: {
        locale: 'menu.BottomFactory.glue_stock',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'HP_Dashboard',
      name: 'HP_Dashboard',
      component: () =>
        import('@/views/BottomFactory/HP_Dashboard/index.vue'),
      meta: {
        locale: 'menu.BottomFactory.HP_Dashboard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'ShelfBoard',
      name: 'ShelfBoard',
      component: () =>
        import('@/views/BottomFactory/ShelfBoard/index.vue'),
      meta: {
        locale: 'menu.BottomFactory.ShelfBoard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'FI_Dashboard',
      name: 'FI_Dashboard',
      component: () =>
        import('@/views/BottomFactory/FI_Dashboard/index.vue'),
      meta: {
        locale: 'menu.BottomFactory.FI_Dashboard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
  
};

export default manufactMange;
