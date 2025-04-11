import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactMange: AppRouteRecordRaw = {
  path: '/warehouse_management',
  name: 'warehouse_management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.warehouse_management',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'WarehouseDashboard',
      name: 'WarehouseDashboard',
      component: () =>
        import('@/views/warehouse_management/WarehouseDashboard/index.vue'),
      meta: {
        locale: 'menu.warehouse_management.WarehouseDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'FaceStocDashboard',
      name: 'FaceStocDashboard',
      component: () =>
        import('@/views/warehouse_management/FaceStocDashboard/index.vue'),
      meta: {
        locale: 'menu.warehouse_management.FaceStocDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
  ],
};

export default manufactMange;
