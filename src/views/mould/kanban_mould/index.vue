<template>
 
      <VScaleScreen
   width="1920"
   height="1080"
   :full-screen="true"
   >
  <div class="container">
    <!-- 创建两个按钮 -->
    <button class="btn btn-primary" @click="redirectTo('http://10.2.1.46:8095/')" style="position: fixed;right: 1120px; top: 100px;z-index: 999; ">{{ $t('Kanban.list_mould_1') }}</button>
    <button class="btn btn-secondary" @click="redirectTo('http://10.2.1.46:8095/a.html')" style="position: fixed;right: 950px; top: 100px;z-index: 999; ">{{ $t('Kanban.list_mould_2') }}</button>
  </div>
</VScaleScreen>
  
</template>

<script lang="ts" setup>
// TypeScript 版本需要声明函数类型
function redirectTo(url: string) {
  window.location.href = url;
}
</script> 

<style lang="less" scoped>
/* 添加样式以美化按钮 */
.btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &.btn-primary {
    background-color: #007bff;
    color: #fff;
  }

  &.btn-secondary {
    background-color: #007bff;
    color: #fff;
  }
}
.container {
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/pageBg.png');
  }
  .bg,
  .bg3 {
    background: rgba(0, 0, 0, 0.1);
  }
  .container_outside {
    background-image: url('@/assets/images/bgmain.png');
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .insercolor {
    background: rgba(17, 120, 128, 0.301);
    width: 100%;
    height: 100%;
  }
</style>
