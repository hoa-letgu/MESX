<template>
  <div class="login-form-wrapper">
    <!-- Change language -->
    <div class="language-select">
      <h2 style="font-family: 'Times New Roman', Times, serif">{{
        $t('login.form.language')
      }}</h2>
      <select
        v-model="selectedLanguage"
        class="select-language"
        @change="handleChangeLanguage"
      >
        <option
          v-for="lang in supportedLanguages"
          :key="lang.code"
          :value="lang.code"
        >
          {{ lang.name }}
        </option>
      </select>
    </div>

    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-spin
      :loading="loading"
      tip="登陆中...(Logging in...)"
      style="width: 100%; height: 100%"
    >
      <a-form
        ref="loginForm"
        :model="userInfo"
        class="login-form"
        layout="vertical"
        @submit="handleSubmit"
      >
        <a-form-item
          field="username"
          :rules="[
            { required: true, message: $t('login.form.userName.errMsg') },
          ]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            v-model="userInfo.username"
            :placeholder="$t('login.form.userName.placeholder')"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :rules="[
            { required: true, message: $t('login.form.password.errMsg') },
          ]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input-password
            v-model="userInfo.password"
            :placeholder="$t('login.form.password.placeholder')"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-space :size="16" direction="vertical">
          <div class="login-form-password-actions">
            <a-checkbox
              checked="rememberPassword"
              :model-value="loginConfig.rememberPassword"
              @change="setRememberPassword as any"
            >
              {{ $t('login.form.rememberPassword') }}
            </a-checkbox>
          </div>
          <a-button type="outline" html-type="submit" long :loading="loading">
            {{ $t('login.form.login') }}
          </a-button>
          <!-- <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.register') }}
        </a-button> -->
        </a-space>
      </a-form>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  import { Base64 } from 'js-base64';

  const supportedLanguages = [
    { code: 'yn-VN', name: 'Tiếng Việt' },
    { code: 'en-US', name: 'English' },
    { code: 'zh-CN', name: 'China' },
  ];
  const { locale } = useI18n();
  const selectedLanguage = ref(locale.value);
  const handleChangeLanguage = () => {
    locale.value = selectedLanguage.value;
  };

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '', // 演示默认值
    password: '', // demo default value
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: Base64.decode(loginConfig.value.password),
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        const base64password = Base64.encode(password);
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? base64password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }

  .language-select {
    position: absolute;
    top: 10px;
    left: 20px;
    display: inline-block;
  }

  .select-language {
    appearance: none; /* Ẩn giao diện mặc định */
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px 16px;
    width: 220px;
    font-size: 14px;
    color: #333;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    background-image: url('data:image/svg+xml;utf8,<svg fill="gray" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  }

  .select-language:hover {
    border-color: #888;
    box-shadow: 0 0 0 3px rgba(0, 132, 255, 0.1);
  }

  .select-language:focus {
    border-color: #0084ff;
    box-shadow: 0 0 0 3px rgba(0, 132, 255, 0.3);
  }
</style>
