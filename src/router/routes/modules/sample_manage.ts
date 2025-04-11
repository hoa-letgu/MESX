import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactMange: AppRouteRecordRaw = {
  path: '/sample_manage',
  name: 'sample_manage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.sample_manage',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'kanban_manufact_1',
      name: 'kanban_manufact_1',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_1/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_1',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kanban_manufact_2',
      name: 'kanban_manufact_2',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_2/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_2',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kanban_manufact_3',
      name: 'kanban_manufact_3',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_3/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_3',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kanban_manufact_4',
      name: 'kanban_manufact_4',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_4/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_4',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kanban_manufact_5',
      name: 'kanban_manufact_5',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_5/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_5',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kanban_manufact_6',
      name: 'kanban_manufact_6',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_6/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_6',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kanban_manufact_7',
      name: 'kanban_manufact_7',
      component: () =>
        import('@/views/sample_manage/kanban_manufact_7/index.vue'),
      meta: {
        locale: 'menu.sample_manage.kanban_manufact_7',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default manufactMange;
