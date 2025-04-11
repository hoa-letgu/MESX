<template>
  <div
    ref="chartRef"
    class="chart-container"
    style="width: 100%; height: 320px; /* border: 1px solid red; */"
  ></div>
  <!-- <div ref="chartRef2" class="chart-container"></div> -->
</template>

<script lang="ts" setup>
  import { onMounted, ref, onUnmounted, nextTick, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';

  // 使用 ref 来创建响应式数据
  const start = ref(0);
  const end = ref(70);
  const chartRef = ref<HTMLElement | null>(null);
  let myChart: echarts.ECharts | null = null;
  let intervalId: any | null;
  const chartRef2 = ref<HTMLElement | null>(null);
  let myChart2: echarts.ECharts | null = null;
  // let intervalId2: any | null;
  // 定义一个函数用于更新dataZoom的位置
  function updateDataZoom() {
    console.log('开始了定时器');
    // 每次调用时增加start和end的值
    start.value += 10;
    end.value += 10;
    console.log('start:', start.value, 'end:', end.value);

    // 如果end超过了100，则重置start和end到初始值
    if (end.value > 100) {
      start.value = 0;
      end.value = 70;
    }

    // 更新图表1的 dataZoom 配置
    if (myChart) {
      myChart.setOption({
        dataZoom: [
          {
            type: 'slider',
            yAxisIndex: [0, 1, 2],
            start: start.value,
            end: end.value,
          },
          {
            type: 'inside',
            yAxisIndex: [0, 1, 2],
            start: start.value,
            end: end.value,
          },
        ],
      });
    }
    // 更新图表2的 dataZoom 配置
    if (myChart2) {
      myChart2.setOption({
        dataZoom: [
          {
            type: 'slider',
            yAxisIndex: [0, 1, 2],
            start: start.value,
            end: end.value,
          },
          {
            type: 'inside',
            yAxisIndex: [0, 1, 2],
            start: start.value,
            end: end.value,
          },
        ],
      });
    }
  }
  // 开始定时器
  function startTimer() {
    intervalId = setInterval(updateDataZoom, 2000); // 每2秒调用一次updateDataZoom
  }

  // 停止定时器
  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  }
  // 初始化图表
  function initChart() {
    console.log('初始化图表');

    // 确保在重新初始化之前销毁旧的图表实例
    if (myChart) {
      myChart.dispose();
    }

    if (chartRef.value) {
      myChart = echarts.init(chartRef.value);

      const option = {
        tooltip: {
          trigger: 'axis',
          show: true,
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: [
            '贴底',
            '拉胶',
            '拉邦',
            '其他',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
          ],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 14,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
          min: 0, // 设置y轴最小值
          max: 'dataMax', // 设置y轴最大值，这个值应该根据你的实际需要进行调整
          interval: 50,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            show: false,
          },
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 70,
            show: false,
          },
          {
            type: 'inside', // 内置型 dataZoom 组件，无需额外空间
            xAxisIndex: 0,
            start: 0,
            end: 70,
            // 注意：这里不需要设置 show 属性，除非你有特殊需求
          },
        ],

        series: [
          {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 14],
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              barBorderRadius: [10, 10, 10, 10],
            },
            label: {
              show: true,
              color: '#ffffff',
              distance: 10,
              position: 'top',
              fontSize: 12,
            },
          },
        ],
      };

      myChart.setOption(option);
    }
  }
  function initChart2() {
    console.log('初始化图表');

    // 确保在重新初始化之前销毁旧的图表实例
    if (myChart2) {
      myChart2.dispose();
    }

    if (chartRef2.value) {
      myChart2 = echarts.init(chartRef2.value);

      const option = {
        tooltip: {
          trigger: 'axis',
          show: true,
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: [
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
            '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
          ],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 12,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
          interval: 50,
          min: 0, // 设置y轴最小值
          max: null, // 设置y轴最大值，这个值应该根据你的实际需要进行调整
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            show: false,
          },
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 70,
            show: false, // 确保dataZoom组件可见
            realtime: true, // 实时更新
            moveSpeed: 20, // 控制滚动速度
            zoomLock: true, // 锁定缩放
          },
          {
            type: 'inside', // 内置型 dataZoom 组件，无需额外空间
            xAxisIndex: 0,
            start: 0,
            end: 70,
            moveSpeed: 20, // 控制滚动速度
          },
        ],

        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              color: 'rgba(0,0,0,0)', // 设置柱子的颜色为透明
              borderColor: 'rgba(0,0,0,0)', // 设置柱子边框的颜色为蓝色
              borderWidth: 1, // 设置边框宽度，可以根据需要调整
              barBorderRadius: [10, 10, 10, 10], // 圆角边框
              emphasis: {
                // 设置高亮状态下的样式
                barMinHeight: 20, // 设置柱子最小高度（像素）
              },
            },
            label: {
              show: false,
              color: '#ffffff',
              distance: 10,
              fontSize: 12,
              position: 'inside',
              verticalAlign: 'middle', // 尝试垂直居中，效果取决于文本长度和barWidth
              formatter(params: any) {
                // 根据数据项的索引来决定显示的文本
                const labels = [
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                  '一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12',
                ];
                return labels[params.dataIndex];
              },
            },
          },
        ],
      };

      myChart2.setOption(option);
    }
  }

  // 调用 initChart 函数来初始化图表
  // initChart();
  onMounted(() => {
    console.log('初始化');
    initChart();
    initChart2();
    startTimer(); // 组件挂载后启动定时器
  });
  onBeforeUnmount(() => {
    stopTimer(); // 组件卸载前停止定时器
    if (myChart) {
      myChart.dispose(); // 销毁图表实例
    }
    if (myChart2) {
      myChart2.dispose(); // 销毁图表实例
    }
  });
</script>

<style scoped>
  .chart-container {
    width: 600px;
    height: 400px;
    position: relative;
  }

  .custom-tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 4px;
    pointer-events: none; /* 确保提示框不会影响鼠标事件 */
    z-index: 10;
  }
</style>
