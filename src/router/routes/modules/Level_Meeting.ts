import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactMange: AppRouteRecordRaw = {
  path: '/Level_Meeting',
  name: 'Level_Meeting',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.Level_Meeting',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'First_Meeting',
      name: 'First_Meeting',
      component: () =>
        import('@/views/Level_Meeting/First_Meeting/index.vue'),
      meta: {
        locale: 'menu.Level_Meeting.First_Meeting',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default manufactMange;
