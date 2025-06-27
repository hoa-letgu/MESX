<template>
  <div class="container">
    <iframe
      :src="url"
      class="iframe"
      title="Embedded page"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const url = ref('http://10.30.0.36:9007/vi/');

</script>

<style scoped lang="less">
/* Khung bao ngoài */
.container {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-1);
  padding: 16px 20px 0;
  display: flex;
  justify-content: center;
}

/* Iframe nhúng */
.iframe {
  width: 100%;
  height: 80vh;
  border: none;
}

/* Ví dụ thêm class trang trí (nếu cần dùng) */
.imgs {
  width: 87%;
  height: 85%;
  opacity: 0.6;
  object-fit: contain;
}

.h11 {
  color: goldenrod;
  margin-left: 3%;
  text-align: center;
}

/* —— Responsive (mobile) —— */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>
