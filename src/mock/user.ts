import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import { isLogin } from '@/utils/auth';
import { DEFAULT_LAYOUT } from '@/router/routes/base';

setupMock({ 
  mock:false,
  setup() {
    // Mock.XHR.prototype.withCredentials = true;
    
    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin';
        return successResponseWrap({
          name: '王立群',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role,
        });
      }
      return failResponseWrap(null, '未登录', 50008);
    });

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body);
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin');
        return successResponseWrap({
          token: '12345',
        });
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user');
        return successResponseWrap({
          token: '54321',
        });
      }
      return failResponseWrap(null, '账号或者密码错误', 50000);
    });

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/manufact_report',
          name: 'manufact_report',
          component: DEFAULT_LAYOUT,
          meta: {
            locale: 'menu.manufact_report',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 0,
          },
          children: [
            {
              path: 'search-table1',
              name: 'SearchTable1',
              component: () => import('@/views/list/search-table/index.vue'),
              meta: {
                locale: 'menu.list.searchTable',
                requiresAuth: true,
              },
            },
            {
              path: 'search-table2',
              name: 'SearchTable2',
              component: () => import('@/views/report/F_SCM_FulfillmentRate_report/index.vue'),
              meta: {
                locale: 'menu.list.searchTable',
                requiresAuth: true,
              },
            },
            {
              path: 'search-table3',
              name: 'SearchTable3',
              component: () => import('@/views/report/F_SCM_DailyProduction_Output/index.vue'),
              meta: {
                locale: 'menu.manufact_report.F_SCM_DailyProduction_Output',
                requiresAuth: true,
              },
            },
          ],
        }
      ]; 



      return successResponseWrap(menuList);
    });
  },
});
