<template>
  <div style="display: block; clear: both"
    ><div class="circle"  :style="{ background: color }">
      <div class="pie_left">
        <div
          class="left"
          :style="{ transform: 'rotate(' + leftstyle + 'deg)' }"
        ></div>
      </div>
      <div class="pie_right">
        <div
          class="right"
          :style="{ transform: 'rotate(' + rightstyle + 'deg)' }"
        ></div>
      </div>
      <div class="mask"
        ><span :mask="props.mask" style="color: black">{{ props.mask }}%</span
        ><div :title="title" class="title"
          ><b>{{ title }}</b></div
        ></div
      >
    </div></div
  >
</template>

<script lang="ts" setup>
  //   import { EChartsOption } from 'echarts/types/dist/echarts';
  import { ref, onMounted, reactive, onUpdated } from 'vue';

  // 定义props
  interface Props {
    className?: string;
    width?: string;
    height?: string;
    mask: number;
    title: string;
  }
  const leftstyle: any = ref(0);
  const rightstyle: any = ref(0);
  const props = withDefaults(defineProps<Props>(), {
    className: 'chart',
    width: '100%',
    height: '100%',
    mask: 0,
    title: '统计图',
  });
  const color: any = ref('');
  onMounted(() => {
    const num: number = props.mask * 3.6;
    if (num <= 180) {
      rightstyle.value = num;
      leftstyle.value = 0;
    } else {
      rightstyle.value = 180;
      leftstyle.value = num - 180;
    }
    if (props.mask > 20) {  // 颜色管控
      color.value = '#5ba3ef';
    } else {
      color.value = '#5ba3ef';
    }
  });
  const txtchange = reactive(() => {
    const num: number = props.mask * 3.6;
    if (num <= 180) {
      rightstyle.value = num;
      leftstyle.value = 0;
    } else {
      rightstyle.value = 180;
      leftstyle.value = num - 180;
    }
    if (props.mask > 20) { // 颜色管控
      color.value = '#5ba3ef';
    } else {
      color.value = '#5ba3ef';
    }
  });
  onUpdated(() => {
    txtchange();
  });
  //   watch(props.mask, (newValue, oldValue) => {
  //     if (newValue != oldValue) {
  //     }
  //     txtchange();
  //   });
</script>

<style>
  .circle {
    width: 180px;
    height: 180px;
    position: absolute;
    border-radius: 50%;
    background: #5ba3ef;
    transition-timing-function: linear;
    margin-left: 9%;
    /* left: 2%; */
    /* // border: 1px solid yellow; */
  }

  .pie_left,
  .pie_right {
    width: 180px;
    height: 180px;
    position: absolute;
    top: 0%;
    left: 0%;
  }
  /* .pie_left .left:hover {
    background-color: antiquewhite;
    animation-duration: 0s;
    transition-duration: 0s;
    transition-delay: 0s;
  } */

  .left,
  .right {
    display: block;
    width: 180px;
    height: 180px;
    background: #d1d1d1;
    /* background: transparent; */
    border-radius: 50%;
    position: absolute;
    top: 0%;
    left: 0%;
    /* transform: rotate(30deg); */
  }

  .pie_right,
  .right {
    clip: rect(0, auto, auto, 90px);
    animation-name: right;
    animation-duration: 0.5s;
    transition-duration: 0.5s;
    /* animation-iteration-count: infinite; */
    transition-timing-function: linear;
    /* transform: rotate(180deg); */
  }

  .pie_left,
  .left {
    clip: rect(0, 90px, auto, 0);
    animation-name: left;
    animation-duration: 0.5s;
    transition-duration: 0.5s;
    /* animation-iteration-count: infinite; */
    transition-delay: 0.5s;
    transition-timing-function: linear;
    /* -webkit-transition-timing-function: linear; */
    /* transform: rotate(40deg); */
  }

  .mask {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    left: 25px;
    top: 25px;
    background: #fff;
    position: absolute;
    text-align: center;
    line-height: 130px;
    font-size: 16px;
  }
  .title {
    margin-top: -20px;
  }
</style>
