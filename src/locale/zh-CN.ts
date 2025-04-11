import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/homePage/workplace/locale/zh-CN';
// import DailyProduction from '@/views/report/F_SCM_DailyProduction_Output/locale/zh-CN';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/zh-CN';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/zh-CN';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/zh-CN';
import localrepairdetail from '@/views/device_management/repairDetails/locale/zh-CN';
import localmaintenancetasks from '@/views/device_management/maintenancetasks/locale/zh-CN';
import locarepairTasks from '@/views/device_management/repairTasks/locale/zh-CN';
import rtlLocal from '@/views/production_management/rtlDataAnalyze/locale/zh-CN';
import IssueLocal from '@/views/production_management/IssueTrackingDashboard/locale/zh-CN';
import OutputRateDashboard from '@/views/production_management/OutputRateDashboard/locale/zh-CN';
import SupervisorOutputDashboard from '@/views/production_management/SupervisorOutputDashboard/locale/zh-CN';
import ProcessLineDashboard from '@/views/production_management/ProcessLineDashboard/locale/zh-CN';
import WarehouseDashboard from '@/views/warehouse_management/WarehouseDashboard/locale/zh-CN';
import FaceStocDashboard from '@/views/warehouse_management/FaceStocDashboard/locale/zh-CN';

import localmanufact from '@/views/sample_manage/kanban_manufact_1/locale/zh-CN';
import localmanufact2 from '@/views/sample_manage/kanban_manufact_2/locale/zh-CN';
import localmanufact3 from '@/views/sample_manage/kanban_manufact_3/locale/zh-CN';
import localmanufact4 from '@/views/sample_manage/kanban_manufact_4/locale/zh-CN';
import localmanufact5 from '@/views/sample_manage/kanban_manufact_5/locale/zh-CN';
import localmanufact6 from '@/views/sample_manage/kanban_manufact_6/locale/zh-CN';
import localmanufact7 from '@/views/sample_manage/kanban_manufact_7/locale/zh-CN';

import gluestock from '@/views/BottomFactory/glue_stock/locale/zh-CN';

import HPDashboard from '@/views/BottomFactory/HP_Dashboard/locale/zh-CN';
import ShelfBoard from '@/views/BottomFactory/ShelfBoard/locale/zh-CN';
import FIDashboard from '@/views/BottomFactory/FI_Dashboard/locale/zh-CN';

import localmouid from '@/views/mould/kanban_mould/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'APP.Platform.Name': '万邦生产管理看板平台',
  'menu.homePage': '首页',
  'menu.server.homePage': '仪表盘-服务端',
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
  'navbar.action.locale': '切换为中文',
  'menu.list.searchTable': '查询表格',
  'menu.manufact_mange': '工厂管理',
  'menu.manufact_report': '生产报表',
  'menu.permission_mange': '权限管理',
  'menu.device_management': '设备管理',
  'menu.sample_manage': '样品室管理',
  'menu.production_management': '生产管理',
  'menu.Level_Meeting': '层级会议',

  'menu.manufact_report.F_SCM_DailyProduction_Output': '每日生产报表',
  'menu.permission_mange.F_PERMISSION_MANGE': '菜单设置',
  'menu.device_management.Kanban_device_A': '数位化设备管理看板',
  'menu.device_management.Kanban_device_B': 'B数位化设备管理看板',
  'menu.device_management.maintenanceDetails': '保养状况详情页',
  'menu.device_management.repairDetails': '维修状况详情页',
  'menu.device_management.maintenancetasks': '保养任务',
  'menu.device_management.repairTasks': '维修任务',
  'menu.sample_manage.kanban_manufact_1': '生产管理(裁剪实时)',
  'menu.sample_manage.kanban_manufact_2': '生产管理(概览1)',
  'menu.sample_manage.kanban_manufact_3': '生产管理(概览2)',
  'menu.sample_manage.kanban_manufact_4': '生产管理(针车实时)',
  'menu.sample_manage.kanban_manufact_5': '生产管理(贴底实时)',
  'menu.sample_manage.kanban_manufact_6': '生产管理(加工实时)',
  'menu.sample_manage.kanban_manufact_7': '生产管理(工艺实时)',
  'menu.production_management.rtlDataAnalyze': 'RTL',
  'menu.production_management.IssueTrackingDashboard': '问题追踪看板',
  'menu.Level_Meeting.First_Meeting': '一层会议',
  'menu.production_management.QCODashboard': 'QCO',
  'menu.production_management.QCOIERateDashboard': 'QCO效率看板',
  'menu.production_management.IERateDashboard': 'IE达成率看板',
  'menu.production_management.BigArtIERateDashboard': '大单型体IE达成率看板',
  'menu.production_management.CompareIERateDashboard': '达成率差异对比看板',
  'menu.BottomFactory': '底厂看板',
  'menu.BottomFactory.glue_stock': '片料仓目视看板',
  'menu.production_management.OutputRateDashboard': '产量达成率',
  'menu.production_management.SupervisorOutputDashboard': '主管产量达成率',
  'menu.mould': '模具看板',
  'menu.mould.kanban_mould': '模具看板',
  'menu.production_management.ProcessLineDashboard': '加工线生产看板',
  'menu.warehouse_management': '仓库管理',
  'menu.warehouse_management.WarehouseDashboard': '仓库数位化管理看板',
  'menu.warehouse_management.FaceStocDashboard': '配套仓面底库存看板',
  'menu.BottomFactory.HP_Dashboard': '热压生产目视看板',
  'menu.BottomFactory.ShelfBoard': '货架看板',
  'menu.BottomFactory.FI_Dashboard': '整理目视看板',

  'menu.aeqs':'质量管理',
  'menu.aeqs.china_return':'中国市场退货分析',
  'menu.aeqs.aql':'AQL分析',
  'menu.production_management.SkillCenterDashboard': '技能人力调配中心看板',
  ...rtlLocal,
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...F_PERMISSION_MANGE,
  ...localbaoyangdetail,
  ...localDeviceMain,
  ...localrepairdetail,
  ...locarepairTasks,
  ...localmaintenancetasks,
  ...localmanufact,
  ...localmanufact2,
  ...localmanufact3,
  ...localmanufact4,
  ...localmanufact5,
  ...localmanufact6,
  ...localmanufact7,
  ...IssueLocal,
  ...OutputRateDashboard,
  ...SupervisorOutputDashboard,
  ...ProcessLineDashboard,
  ...WarehouseDashboard,
  ...FaceStocDashboard,
  ...gluestock,
  ...localmouid,
  ...HPDashboard,
  ...ShelfBoard,
  ...FIDashboard,
};
