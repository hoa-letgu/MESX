import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { ResultParameter } from '@/api/scmapi';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    role: '',
    code: undefined,
    qq: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data as UserState);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        clearToken();
        const res: ResultParameter = await userLogin(loginForm);
        if (res.IsSuccess) {
          const RetData = JSON.parse(res.RetData);
          setToken(RetData.UserToken);
          this.userInfo.role = 'BIT01';
        } else {
          throw new Error(res.ErrMsg);
        }
      } catch (err) {
        clearToken();
        throw err;
      }
      // try {
      //   const res = await userLogin(loginForm);
      //   setToken(res.data.token);
      // } catch (err) {
      //   clearToken();
      //   throw err;
      // }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
