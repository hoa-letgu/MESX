import localeMessageBox from '@/components/message-box/locale/yn-VN';
import localeLogin from '@/views/login/locale/yn-VN';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/yn-VN';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/yn-VN';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/yn-VN';
import localrepairdetail from '@/views/device_management/repairDetails/locale/yn-VN';
import localmanufact from '@/views/sample_manage/kanban_manufact_1/locale/yn-VN';
import localmanufact2 from '@/views/sample_manage/kanban_manufact_2/locale/yn-VN';
import localmanufact3 from '@/views/sample_manage/kanban_manufact_3/locale/yn-VN';
import localmanufact4 from '@/views/sample_manage/kanban_manufact_4/locale/yn-VN';
import localmanufact5 from '@/views/sample_manage/kanban_manufact_5/locale/yn-VN';
import localmanufact6 from '@/views/sample_manage/kanban_manufact_6/locale/yn-VN';
import localmanufact7 from '@/views/sample_manage/kanban_manufact_7/locale/yn-VN';
import ProcessLineDashboard from '@/views/production_management/ProcessLineDashboard/locale/yn-VN';
import WarehouseDashboard from '@/views/warehouse_management/WarehouseDashboard/locale/yn-VN';
import FaceStocDashboard from '@/views/warehouse_management/FaceStocDashboard/locale/yn-VN';

import localmouid from '@/views/mould/kanban_mould/locale/yn-VN';

import localeSettings from './yn-VN/settings';

export default {
  'APP.Platform.Name': '万邦生产管理看板平台',
  'menu.homePage': 'Bảng điều khiển',
  'menu.server.homePage': 'Bảng điều khiển - cuối máy chủ',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': 'Chuyển sang tiếng Việt',
  'menu.list.searchTable': '查询表格',
  'menu.manufact_mange': '工厂管理',
  'menu.manufact_report': '生产报表',
  'menu.permission_mange': '权限管理',
  'menu.manufact_report.F_SCM_DailyProduction_Output': '每日生产报表',
  'menu.permission_mange.F_PERMISSION_MANGE': '菜单设置',
  'menu.device_management': '设备管理',
  'menu.device_management.Kanban_device_A': '数位化设备管理看板',
  'menu.device_management.maintenanceDetails': '保养状况详情页',
  'menu.device_management.repairDetails': '维修状况详情页',
  'menu.device_management.maintenancetasks': '保养任务',
  'menu.sample_manage': '样品室管理',
  'menu.sample_manage.kanban_manufact_1': '生产管理(裁剪实时)',
  'menu.sample_manage.kanban_manufact_2': '生产管理(概览1)',
  'menu.sample_manage.kanban_manufact_3': '生产管理(概览2)',
  'menu.sample_manage.kanban_manufact_4': '生产管理(针车实时)',
  'menu.sample_manage.kanban_manufact_5': '生产管理(贴底实时)',
  'menu.sample_manage.kanban_manufact_6': '生产管理(加工实时)',
  'menu.sample_manage.kanban_manufact_7': '生产管理(工艺实时)',
  'menu.production_management': '生产管理',
  'menu.production_management.rtlDataAnalyze': 'RTL',
  'menu.production_management.IssueTrackingDashboard': '问题追踪看板',
  'menu.Level_Meeting': '层级会议',
  'menu.Level_Meeting.First_Meeting': '一层会议',
  'menu.mould': '模具看板',
  'menu.mould.kanban_mould': '模具看板',
  'menu.production_management.ProcessLineDashboard':
    'Dây chuyền sản xuất Kanban',
  'menu.warehouse_management': 'Quản lý kho',
  'menu.warehouse_management.WarehouseDashboard':
    'Quản lý kho kỹ thuật số Kanban',
  'menu.warehouse_management.FaceStocDashboard': 'Mặt dưới phù hợp với cổ phiếu',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...F_PERMISSION_MANGE,
  ...localbaoyangdetail,
  ...localDeviceMain,
  ...localrepairdetail,
  ...localmanufact,
  ...localmanufact2,
  ...localmanufact3,
  ...localmanufact4,
  ...localmanufact5,
  ...localmanufact6,
  ...localmanufact7,
  ...localmouid,
  ...ProcessLineDashboard,
  ...WarehouseDashboard,
  ...FaceStocDashboard,
};
