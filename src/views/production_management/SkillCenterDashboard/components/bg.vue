<template>
  <div ref="chartRef"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch, onUnmounted } from 'vue';
  import * as echarts from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { CustomChart, PieChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import { use } from 'echarts/core';

  // 注册必须的组件
  use([
    CanvasRenderer,
    CustomChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  ]);
  // ECharts实例
  let myChart: echarts.ECharts | null = null;
  // 获取圆周点的坐标
  const getCirlPoint = (x0: number, y0: number, r: number, angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: x0 + r * Math.cos(radian),
      y: y0 + r * Math.sin(radian),
    };
  };

  // 动画更新函数
  const angle = ref(0);
  const value = 100;
  let timerId: any | undefined;
  // Option配置
  const option = ref({
    backgroundColor: 'transparent',
    title: {
      text: '',
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: 48,
            color: '#29EEF3',
          },
          c: {
            fontSize: 20,
            color: '#ffffff',
          },
        },
      },
    },
    series: [
      // 紫色弧线
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createArcRenderItem(0, 90, 0.6, '#8383FA'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
          return {
            type: 'arc',
            shape: {
              cx,
              cy,
              r,
              startAngle: ((0 + angle.value) * Math.PI) / 180,
              endAngle: ((90 + angle.value) * Math.PI) / 180,
            },
            style: {
              stroke: '#8383FA',
              fill: 'transparent',
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 紫色圆点
      {
        name: 'ring5-dot',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createCircleRenderItem(90, 0.6, '#8450F9'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
          const point = getCirlPoint(cx, cy, r, 90 + angle.value);

          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: '#8450F9',
              fill: '#8450F9',
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 蓝色弧线
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createArcRenderItem(180, 270, 0.6, '#4386FA'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
          return {
            type: 'arc',
            shape: {
              cx,
              cy,
              r,
              startAngle: ((180 + angle.value) * Math.PI) / 180,
              endAngle: ((270 + angle.value) * Math.PI) / 180,
            },
            style: {
              stroke: '#4386FA',
              fill: 'transparent',
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 蓝色圆点
      {
        name: 'ring5-dot',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createCircleRenderItem(180, 0.6, '#4386FA'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
          const point = getCirlPoint(cx, cy, r, 180 + angle.value);

          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: '#4386FA',
              fill: '#4386FA',
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 淡蓝色弧线
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createArcRenderItem(270, 40, 0.65, '#0CD3DB'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
          return {
            type: 'arc',
            shape: {
              cx,
              cy,
              r,
              startAngle: ((270 + -angle.value) * Math.PI) / 180,
              endAngle: ((40 + -angle.value) * Math.PI) / 180,
            },
            style: {
              stroke: '#0CD3DB',
              fill: 'transparent',
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 橘色弧线
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createArcRenderItem(90, 220, 0.65, '#FF8E89'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
          return {
            type: 'arc',
            shape: {
              cx,
              cy,
              r,
              startAngle: ((90 + -angle.value) * Math.PI) / 180,
              endAngle: ((220 + -angle.value) * Math.PI) / 180,
            },
            style: {
              stroke: '#FF8E89',
              fill: 'transparent',
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 橘色圆点
      {
        name: 'ring5-dot',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createCircleRenderItem(90, 0.65, '#FF8E89'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
          const point = getCirlPoint(cx, cy, r, 90 + -angle.value);

          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: '#FF8E89',
              fill: '#FF8E89',
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 淡蓝色圆点
      {
        name: 'ring5-dot',
        type: 'custom',
        coordinateSystem: 'none',
        // renderItem: createCircleRenderItem(270, 0.65, '#0CD3DB'),
        renderItem: (params: any, api: any) => {
          const cx = api.getWidth() / 2;
          const cy = api.getHeight() / 2;
          const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
          const point = getCirlPoint(cx, cy, r, 270 + angle.value);

          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: '#0CD3DB',
              fill: '#0CD3DB',
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 饼图配置...
      {
        name: '吃猪肉频率',
        type: 'pie',
        radius: ['55%', '50%'],
        silent: true,
        clockwise: true,
        startAngle: 90,
        z: 0,
        zlevel: 0,
        label: {
          normal: {
            position: 'center',
          },
        },
        data: [
          {
            value: 100,
            name: '',
            itemStyle: {
              normal: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: '#A098FC', // 0% 处的颜色
                    },
                    {
                      offset: 0.3,
                      color: '#4386FA', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#4FADFD', // 0% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: '#0CD3DB', // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#646CF9', // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },
          {
            value: 100 - value,
            name: '',
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#173164',
              },
            },
          },
        ],
      },
      {
        name: '吃猪肉频率',
        type: 'pie',
        radius: ['47.5%', '48%'],
        silent: true,
        clockwise: true,
        startAngle: 270,
        z: 0,
        zlevel: 0,
        label: {
          normal: {
            position: 'center',
          },
        },
        data: [
          {
            value: 100,
            name: '',
            itemStyle: {
              normal: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: '#00EDF3', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#646CF9', // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },
          {
            value: 100 - value,
            name: '',
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#173164',
              },
            },
          },
        ],
      },
    ],
  });
  const draw = () => {
    angle.value += 3;
    myChart?.setOption(option.value, true);
  };

  // 参考元素
  const chartRef = ref<HTMLDivElement | null>(null);

  //   // 工厂函数创建弧线
  //   const createArcRenderItem =
  //     (
  //       startAngleOffset: number,
  //       endAngleOffset: number,
  //       radiusFactor: number,
  //       strokeColor: string
  //     ) =>
  //     (
  //       params: echarts.CustomSeriesRenderItemParams,
  //       api: echarts.ExtensionAPI
  //     ) => {
  //       const cx = api.getWidth() / 2;
  //       const cy = api.getHeight() / 2;
  //       const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * radiusFactor;

  //       return {
  //         type: 'arc',
  //         shape: {
  //           cx,
  //           cy,
  //           r,
  //           startAngle: ((startAngleOffset + angle.value) * Math.PI) / 180,
  //           endAngle: ((endAngleOffset + angle.value) * Math.PI) / 180,
  //         },
  //         style: {
  //           stroke: strokeColor,
  //           fill: 'transparent',
  //           lineWidth: 1.5,
  //         },
  //         silent: true,
  //       };
  //     };

  //   // 工厂函数创建圆点
  //   const createCircleRenderItem =
  //     (pointAngleOffset: number, radiusFactor: number, fillColor: string) =>
  //     (
  //       params: echarts.CustomSeriesRenderItemParams,
  //       api: echarts.ExtensionAPI
  //     ) => {
  //       const cx = api.getWidth() / 2;
  //       const cy = api.getHeight() / 2;
  //       const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * radiusFactor;
  //       const point = getCirlPoint(cx, cy, r, pointAngleOffset + angle.value);

  //       return {
  //         type: 'circle',
  //         shape: {
  //           cx: point.x,
  //           cy: point.y,
  //           r: 4,
  //         },
  //         style: {
  //           stroke: fillColor,
  //           fill: fillColor,
  //         },
  //         silent: true,
  //       };
  //     };

  onMounted(() => {
    if (!chartRef.value) {
      return;
    }

    myChart = echarts.init(chartRef.value);
    myChart.setOption(option.value);

    // 开启动画
    timerId = setInterval(draw, 100);
  });

  // 清除定时器以防止内存泄漏
  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId);
    }
    if (myChart) {
      myChart.dispose();
    }
  });
</script>
