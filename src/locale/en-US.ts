import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/homePage/workplace/locale/en-US';
// import DailyProduction from '@/views/report/F_SCM_DailyProduction_Output/locale/en-US';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/en-US';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/en-US';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/en-US';
import localrepairdetail from '@/views/device_management/repairDetails/locale/en-US';
import rtlLocal from '@/views/production_management/rtlDataAnalyze/locale/en-US';
import ProcessLineDashboard from '@/views/production_management/ProcessLineDashboard/locale/en-US';
import WarehouseDashboard from '@/views/warehouse_management/WarehouseDashboard/locale/en-US';
import FaceStocDashboard from '@/views/warehouse_management/FaceStocDashboard/locale/en-US';

import localmanufact from '@/views/sample_manage/kanban_manufact_1/locale/en-US';
import localmanufact2 from '@/views/sample_manage/kanban_manufact_2/locale/en-US';
import localmanufact3 from '@/views/sample_manage/kanban_manufact_3/locale/en-US';
import localmanufact4 from '@/views/sample_manage/kanban_manufact_4/locale/en-US';
import localmanufact5 from '@/views/sample_manage/kanban_manufact_5/locale/en-US';
import localmanufact6 from '@/views/sample_manage/kanban_manufact_6/locale/en-US';
import localmanufact7 from '@/views/sample_manage/kanban_manufact_7/locale/en-US';

import gluestock from '@/views/BottomFactory/glue_stock/locale/en-US';

import localmouid from '@/views/mould/kanban_mould/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'APP.Platform.Name': 'APACHE FOOTWEAR VIETNAM - DASHBOARD PLATFORM',
  'menu.homePage': 'Home page',
  'menu.server.homePage': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'menu.manufact_mange': 'Production management',
  'menu.manufact_report': 'Production report',
  'menu.permission_mange': 'Rights Management',
  'menu.sample_manage': 'sample_manage',
  'menu.production_management': '生产管理',
  'menu.Level_Meeting': '层级会议',

  'menu.manufact_report.F_SCM_DailyProduction_Output':
    'Daily production report',
  'menu.permission_mange.F_PERMISSION_MANGE': 'Menu settings',
  'menu.device_management': 'Equipment management',
  'menu.device_management.Kanban_device_A':
    'Digital Device Management Dashboard',
  'menu.device_management.maintenanceDetails':
    'Maintenance status details page',
  'menu.device_management.repairDetails': 'Maintenance Status Details Page',
  'menu.device_management.maintenancetasks': '保养任务',
  'menu.sample_manage.kanban_manufact_1': 'Manufact manage(B)',
  'menu.sample_manage.kanban_manufact_2': 'overview1',
  'menu.sample_manage.kanban_manufact_3': 'overview2',
  'menu.sample_manage.kanban_manufact_4': 'Manufact manage(C)',
  'menu.sample_manage.kanban_manufact_5': 'Manufact manage(D)',
  'menu.sample_manage.kanban_manufact_6': 'Manufact manage(E)',
  'menu.sample_manage.kanban_manufact_7': 'Manufact manage(I)',
  'menu.production_management.rtlDataAnalyze': 'RTL',
  'menu.production_management.IssueTrackingDashboard': '问题追踪看板',
  'menu.Level_Meeting.First_Meeting': '一层会议',
  'menu.mould': 'mould',
  'menu.mould.kanban_mould': 'mould',
  'menu.production_management.ProcessLineDashboard':
    'Processing Line Dashboard',
  'menu.warehouse_management': 'warehouse management',
  'menu.warehouse_management.WarehouseDashboard': 'Warehouse Digital Dashboard',
  'menu.warehouse_management.FaceStocDashboard': 'Face Bottom Supporting Inventory',
  'menu.BottomFactory': 'BottomFactory Dashboard',
  'menu.BottomFactory.glue_stock': 'glue stock Dashboard',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...F_PERMISSION_MANGE,
  ...localbaoyangdetail,
  ...localDeviceMain,
  ...localrepairdetail,
  ...rtlLocal,
  ...ProcessLineDashboard,
  ...WarehouseDashboard,
  ...FaceStocDashboard,
  ...localmanufact,
  ...localmanufact2,
  ...localmanufact3,
  ...localmanufact4,
  ...localmanufact5,
  ...localmanufact6,
  ...localmanufact7,
  ...gluestock,
  ...localmouid,
};
