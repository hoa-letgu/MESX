<template>
  <a-layout-footer class="footer">APACHE - ( @Version: {{ versionStorage }} )</a-layout-footer>
</template>

<script lang="ts" setup>
    // const versionStorage = localStorage.getItem('version');
    const versionStorage = '1.0.0';
</script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
  }
</style>
