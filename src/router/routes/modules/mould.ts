import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactMange: AppRouteRecordRaw = {
  path: '/mould',
  name: 'mould',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.mould',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'kanban_mould',
      name: 'kanban_mould',
      component: () =>
        import('@/views/mould/kanban_mould/index.vue'),
      meta: {
        locale: 'menu.mould.kanban_mould',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default manufactMange;
