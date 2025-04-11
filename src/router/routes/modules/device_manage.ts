/* eslint-disable prettier/prettier */
import { AppRouteRecordRaw } from '../types';
import { DEFAULT_LAYOUT } from '../base';

const deviceManage: AppRouteRecordRaw = {
  path: '/device_management',
  name: 'device_management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.device_management',
    requiresAuth: true,
    icon: 'icon-tool',
  },
  children: [
    {
      path: 'Kanban_device_A',
      name: 'Kanban_device_A',
      component: () =>
        import('@/views/device_management/Kanban_device_A/index.vue'),
      meta: {
        locale: 'menu.device_management.Kanban_device_A',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'maintenanceDetails',
      name: 'maintenanceDetails',
      component: () =>
        import('@/views/device_management/maintenanceDetails/index.vue'),
      meta: {
        locale: 'menu.device_management.maintenanceDetails',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'repairDetails',
      name: 'repairDetails',
      component: () =>
        import('@/views/device_management/repairDetails/index.vue'),
      meta: {
        locale: 'menu.device_management.repairDetails',
        requiresAuth: true,
      },
    },
    {
      path: 'maintenancetasks',
      name: 'maintenancetasks',
      component: () =>
        import('@/views/device_management/maintenancetasks/index.vue'),
      meta: {
        locale: 'menu.device_management.maintenancetasks',
        requiresAuth: true,
      },
    },
    {
      path: 'repairTasks',
      name: 'repairTasks',
      component: () =>
        import('@/views/device_management/repairTasks/index.vue'),
      meta: {
        locale: 'menu.device_management.repairTasks',
        requiresAuth: true,
      },
    },
  ],
};

export default deviceManage;
