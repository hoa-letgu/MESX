<template>
  <div style="background-color: transparent">
    <div class="circle">
      <div class="circle0">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';
</script>

<style scoped>
  .circle {
    position: relative;
    width: 30px;
    height: 30px;
    background-image: url('@/assets/images/person.png');
    background-size: cover;
  }
  .circle0 {
    width: 30px;
    height: 30px;
    /* border: 1px solid rgba(162, 0, 255, 0.2); */
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: -5px;
    margin-right: -4px;
    /* position: relative; */
  }
  .circle1 {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: yellow;
    right: 10px;
    bottom: 10px;
    position: absolute;
  }
  .circle2 {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    margin: 0px auto;
    right: 5px;
    bottom: 5px;
    animation-name: changeColor2;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  .circle3 {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    animation-name: changeColor3;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  @keyframes changeColor2 {
    0% {
      background-color: rgba(255, 255, 0, 0.3); /* 半透明黄色 */
    }
    50% {
      background-color: rgba(255, 255, 0, 0.3); /* 半透明黄色 */
    }
    100% {
      background-color: transparent;
    }
  }
  @keyframes changeColor3 {
    0% {
      background-color: transparent;
    }
    50% {
      background-color: rgba(255, 255, 0, 0.2); /* 半透明黄色 */
    }
    100% {
      background-color: transparent;
    }
  }
</style>
