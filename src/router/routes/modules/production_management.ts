import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const manufactMange: AppRouteRecordRaw = {
  path: '/production_management',
  name: 'production_management',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.production_management',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'rtlDataAnalyze',
      name: 'rtlDataAnalyze',
      component: () =>
        import('@/views/production_management/rtlDataAnalyze/index.vue'),
      meta: {
        locale: 'menu.production_management.rtlDataAnalyze',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'IssueTrackingDashboard',
      name: 'IssueTrackingDashboard',
      component: () =>
        import(
          '@/views/production_management/IssueTrackingDashboard/index.vue'
        ),
      meta: {
        locale: 'menu.production_management.IssueTrackingDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'QCODashboard',
      name: 'QCODashboard',
      component: () =>
        import('@/views/production_management/QCODashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.QCODashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'QCOIERateDashboard',
      name: 'QCOIERateDashboard',
      component: () =>
        import('@/views/production_management/QCOIERateDashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.QCOIERateDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'IERateDashboard',
      name: 'IERateDashboard',
      component: () =>
        import('@/views/production_management/IERateDashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.IERateDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'BigArtIERateDashboard',
      name: 'BigArtIERateDashboard',
      component: () =>
        import('@/views/production_management/BigArtIERateDashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.BigArtIERateDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'CompareIERateDashboard',
      name: 'CompareIERateDashboard',
      component: () =>
        import(
          '@/views/production_management/CompareIERateDashboard/index.vue'
        ),
      meta: {
        locale: 'menu.production_management.CompareIERateDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'OutputRateDashboard',
      name: 'OutputRateDashboard',
      component: () =>
        import('@/views/production_management/OutputRateDashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.OutputRateDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'SupervisorOutputDashboard',
      name: 'SupervisorOutputDashboard',
      component: () =>
        import(
          '@/views/production_management/SupervisorOutputDashboard/index.vue'
        ),
      meta: {
        locale: 'menu.production_management.SupervisorOutputDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'ProcessLineDashboard',
      name: 'ProcessLineDashboard',
      component: () =>
        import('@/views/production_management/ProcessLineDashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.ProcessLineDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
    {
      path: 'SkillCenterDashboard',
      name: 'SkillCenterDashboard',
      component: () =>
        import('@/views/production_management/SkillCenterDashboard/index.vue'),
      meta: {
        locale: 'menu.production_management.SkillCenterDashboard',
        requiresAuth: false,
        roles: ['*'],
      },
    },
  ],
};

export default manufactMange;
