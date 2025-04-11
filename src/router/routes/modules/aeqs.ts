import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const AEQS: AppRouteRecordRaw = {
  path: '/aeqs',
  name: 'aeqs',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.aeqs',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'china_return',
      name: 'china_return',
      component: () => import('@/views/aeqs/china_return/index.vue'),
      meta: {
        locale: 'menu.aeqs.china_return',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'aql',
      name: 'aql',
      component: () => import('@/views/aeqs/aql/index.vue'),
      meta: {
        locale: 'menu.aeqs.aql',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default AEQS;
