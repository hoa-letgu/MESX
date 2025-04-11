<template>
  <div style="margin: 0px auto">
    <div
      style="
        padding-top: 5vh;
        /* margin: 30px; */
        height: 10vh;
        margin-left: 1.2vh;
        text-align: left;
        font-size: 22px;
        font-weight: 600;
      "
      >{{ title }}</div
    >
    <div style="height: 4vh"></div>
    <div style="width: 220px; margin-left: 10%">
      <div style="position: relative; margin: 40px -95px">
        <div class="waterCircle">
          <div
            class="container22"
            :class="{
              warning: value > 60,
              standard: value > 80,
            }"
          >
            <div class="wave"> </div>
            <div class="wave-mask" :style="`top: ${-1.7 * value}px`"></div>
          </div>
        </div>
        <div style="position: absolute; top: 30px; left: 226px">
          <div style="width: 70px">
            <el-row type="flex" align="middle" justify="center"
              ><span class="totalNum">{{ value }}%</span
              ><span style="font-size: 14px"></span
            ></el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  //   import { EChartsOption } from 'echarts/types/dist/echarts';
  import { ref, onMounted, reactive, onUpdated } from 'vue';

  // 定义props
  interface Props {
    title: string;
    value: number;
  }
  const leftstyle: any = ref(0);
  const rightstyle: any = ref(0);
  const props = withDefaults(defineProps<Props>(), {
    title: '产线总合格率',
    value: 0,
  });
</script>

<style>
  .totalNum {
    font-size: 28px;
    margin-left: -18px;
    /* text-align: center; */
    margin-left: 120%;
  }
  .isTarget {
    display: inline-block;
    background: #12f4ff;
    width: 65px;
    text-align: center;
    height: 25px;
    line-height: 25px;
    border-radius: 12px;
    color: black;
  }
  /* ========================================  波纹 start  =========================================================== */
  .waterCircle {
    position: absolute;
    top: 60px;
    left: 90%;
  }
  .container22 {
    width: 230px;
    height: 230px;
    border-radius: 50%;
    border: 2px dashed red;
    background: rgba(2, 47, 79, 0.5);
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px;
    .wave {
      position: relative;
      width: 230px;
      height: 230px;
      background-image: linear-gradient(-180deg, #aaff80 0%, red 100%);
      border-radius: 50%;
      margin: -7px -6px;
    }
    /* // 波纹效果 */
    .wave-mask {
      position: absolute;
      width: 500px;
      height: 500px;
      top: 0;
      left: 50%;
      border-radius: 40%;
      background-color: rgba(2, 47, 79, 1);
      transform: translate(-50%, -70%) rotate(0);
      animation: toRotate 10s linear -5s infinite;
      z-index: 20;
    }

    &.warning {
      border: 2px dashed #e6a23c;
      .wave {
        background-image: linear-gradient(-180deg, #f0c78a 13%, #e6a23c 100%);
      }
      &.standard {
        border: 2px dashed #12f4ff;
        .wave {
          background-image: linear-gradient(-180deg, #12f4ff 13%, #12f4ff 100%);
        }
      }
    }
  }
  .using-slider {
    width: 800px;
    margin: 0 auto;
  }

  @keyframes toRotate {
    50% {
      transform: translate(-50%, -70%) rotate(180deg);
    }
    100% {
      transform: translate(-50%, -70%) rotate(360deg);
    }
  }
</style>
