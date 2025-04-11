<template>
  <div class="">
    <dv-full-screen-container class="full">
      <VScaleScreen width="1920" height="1080" :full-screen="true">
        <!-- <Breadcrumb :items="['menu.list', 'menu.list.repairDetails']" />
    <a-card class="general-card" :title="$t('menu.list.repairDetails')">
      <a-row> -->

        <div class="container"
          ><div class="bg">
            <a-spin
              :loading="loading"
              tip="数据加载中...(Loading data...)"
              style="width: 100%; height: auto"
            >
              <div class="left-side">
                <div class="panel">
                  <h1 class="tit">设备数位化管理看板</h1>
                  <div style="color: red">{{ errorMessage }}</div>
                </div>
                <div>
                  <img
                    src="@/assets/images/back.png"
                    style="width: 40px; margin-left: 20px"
                    @click="toList"
                /></div>
                <div class="grid-demo-background">
                  <a-space
                    direction="vertical"
                    :size="16"
                    style="display: block"
                  >
                    <a-row class="grid-demo">
                      <!-- <button @click="toList">点击返回列表</button>
                  <div>传递参数：{{ byList }}</div> -->

                      <div class="box">
                        <div class="box1">
                          <ul>
                            <li
                              ><h2>{{ $t('维修任务分析') }}</h2></li
                            ></ul
                          >
                          <div class="box1-border">
                            <div style="display: flex">
                              <div class="box1-col">
                                <div>
                                  <VCharts
                                    :option="option1"
                                    style="
                                      height: 320px;
                                      width: 500px;

                                      margin: 0px auto;
                                    "
                                  ></VCharts> </div
                              ></div>
                              <div class="box1-col"
                                ><div>
                                  <VCharts
                                    :option="option2"
                                    style="
                                      height: 280px;
                                      width: 500px;

                                      margin: 0px auto;
                                    "
                                  ></VCharts> </div
                              ></div>
                              <div class="box1-col"
                                ><div>
                                  <VCharts
                                    :option="option3"
                                    style="
                                      height: 320px;
                                      width: 500px;

                                      margin: 0px auto;
                                    "
                                  ></VCharts> </div
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div class="box2">
                          <ul>
                            <li
                              ><h2>{{ $t('维修任务清单') }}</h2></li
                            ></ul
                          >
                          <div>
                            <table
                              class="table"
                              cellspacing="0"
                              border="1"
                              cellpadding="0"
                            >
                              <tr>
                                <th>{{ $t('派工单号') }}</th>
                                <th>{{ $t('状态') }}</th>
                                <th>{{ $t('位置') }}</th>
                                <th>{{ $t('设备名称') }}</th>
                                <th>{{ $t('报障日期') }}</th>
                                <th>{{ $t('报障人') }}</th>
                                <th>{{ $t('报障内容') }}</th>
                                <th>{{ $t('维修措施') }}</th>
                                <th>{{ $t('停机时常(分钟)') }}</th>
                              </tr>

                              <tr v-for="item in listbox" :key="item.KEY">
                                <td>{{ item.WORK_ORDER }}</td>
                                <td
                                  :class="item.STATUS == '0' ? 'red' : 'yellow'"
                                  >{{ item.STATUS_NAME }}</td
                                >
                                <td>{{ item.ADDRESS_NAME }}</td>
                                <td>{{ item.DEVICE_NAME }}</td>
                                <td>{{ item.BZ_DATE }}</td>
                                <td>{{ item.BZ_USER }}</td>
                                <td>{{ item.BZ_REMARK }}</td>
                                <td>{{ item.REPAIR_NAME }}</td>
                                <td
                                  :class="item.REPAIR_TIME > 15 ? 'red' : ''"
                                  >{{ item.REPAIR_TIME }}</td
                                >
                              </tr>
                            </table>
                            <div style="margin-top: 8px">
                              <a-pagination
                                :total="total"
                                :pagesize="vPagesize"
                                :current="vCurrent"
                                :default-page-size="vPagesize"
                                show-total
                                show-page-size
                                :page-size-options="[5, 6, 7, 8]"
                                @change="onPageChange"
                                @page-size-change="onpageSizeChange"
                            /></div>
                          </div>
                        </div>
                      </div>
                    </a-row>
                  </a-space>
                </div>
              </div>
            </a-spin>
          </div>
        </div>
      </VScaleScreen>
    </dv-full-screen-container>
    <!-- </a-row>
    </a-card> -->
  </div>
</template>

<script lang="ts" setup>
  import { Getorg, Getrepairtasks1 } from '@/api/kanbandevicea';
  import router from '@/router';
  import { ref, onMounted, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import VCharts from 'vue-echarts';
  import moment from 'moment';

  const { loading, setLoading } = useLoading(true);
  const generateFormModel = () => {
    return {
      selectorg: '1001',
    };
  };
  const errorMessage = ref('');
  const colorstr = ref('');
  const fontcolorstr = ref('');
  const formModel = ref(generateFormModel());
  const repairList = ref<any>([]);
  const listbox = ref<any>([]);
  const vPagesize = ref(5);
  const vCurrent = ref(1);
  const total = ref(300);
  const option1 = ref<any>([]);
  const option2 = ref<any>([]);
  const option3 = ref<any>([]);
  const series2 = ref<any>([]);
  const series3 = ref<any>([]);
  const AY = ref<any>([]);
  const BX = ref<any>([]);
  const CX = ref<any>([]);

  onMounted(() => {
    // 最大化
    const element = document.documentElement;
    element.requestFullscreen();
    // 读取缓存数据
    const getLocalorg = window.sessionStorage.getItem('org_code');
    if (getLocalorg != null) {
      formModel.value.selectorg = getLocalorg;
      search();
    } else {
      const range = ref<any>([]);
      const obj = {
        starttime: '',
        endtime: '',
      };
      obj.starttime = moment(moment().startOf('day').valueOf()).format(
        'YYYY-MM-DD'
      );
      obj.endtime = moment(moment().valueOf()).format('YYYY-MM-DD');
      range.value.push(obj.starttime);
      range.value.push(obj.endtime);
      // console.log(range);
    }
  });

  function toList() {
    router.go(-1);
  }

  const recordtimer = setInterval(() => {
    search();
  }, 10000);
  const search = async () => {
    setLoading(false);
    try {
      const data2: any = await Getrepairtasks1(formModel.value);
      console.log('9999999999');
      option1.value.xAxis.data = data2.list.AX;
      data2.list.AY.forEach((el: any, index: any) => {
        if (data2.list.AX[index] === '待维修') {
          AY.value.push({
            value: el,
            itemStyle: {
              color: '#a90000',
            },
          });
        } else {
          AY.value.push({
            value: el,
          });
        }
      });
      console.log(AY.value);
      option1.value.series[0].data = AY.value;

      // 二
      const arr: any = data2.list.BX.split(',');
      BX.value = arr;
      series2.value = [];
      data2.list.BY.forEach((el: any) => {
        const arr1: any = el.d.split(',');
        colorstr.value = '';
        fontcolorstr.value = '#fff';
        if (el.name === '待维修') {
          colorstr.value = '#a90000';
        } else if (el.name === '维修中') {
          colorstr.value = '#eaff56';
          fontcolorstr.value = '#000';
        } else if (el.name === '领料中') {
          colorstr.value = '#44cef6';
        }
        series2.value.push({
          name: el.name,
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: arr1,
          label: {
            show: true,
            color: fontcolorstr.value,
            position: 'inside',
            formatter: (params: any) => {
              if (params.data === '0') {
                return '';
              }
              return params.data;
            },
          },
          color: colorstr.value,
        });
      });
      option2.value.series = series2.value;

      //  三
      series3.value = [];
      const arr2: any = data2.list.CX.split(',');
      CX.value = arr2;
      data2.list.CY.forEach((el: any) => {
        const arr3: any = el.d.split(',');
        colorstr.value = '';
        fontcolorstr.value = '#fff';
        if (el.name === '待维修') {
          colorstr.value = '#a90000';
        } else if (el.name === '维修中') {
          colorstr.value = '#eaff56';
          fontcolorstr.value = '#000';
        } else if (el.name === '领料中') {
          colorstr.value = '#44cef6';
        }
        series3.value.push({
          name: el.name,
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: arr3,
          label: {
            show: true,
            color: fontcolorstr.value,
            position: 'inside',
            formatter: (params: any) => {
              if (params.data === '0') {
                return '';
              }
              return params.data;
            },
          },
          color: colorstr.value,
        });
      });
      option3.value.series = series3.value;

      repairList.value = JSON.parse(JSON.stringify(data2.list.table));
      total.value = repairList.value.length;
      onPageChange(1);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const onPageChange = (current: number) => {
    vCurrent.value = current;
    paging();
  };
  const onpageSizeChange = (pageSize: number) => {
    vPagesize.value = pageSize;
    paging();
  };
  function paging() {
    const current = vCurrent.value;
    const pageSize = vPagesize.value;
    console.log(`${current}---------${pageSize}`);
    listbox.value = [];
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageList = repairList.value.slice(startIndex, endIndex);
    // .filter((item: any) => item.value !== undefined);
    // console.log(pageList);
    listbox.value = pageList;
  }
  option1.value = {
    legend: {
      show: true,
      bottom: 'bottom',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ['待维修'],
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      show: false,
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        data: AY.value,
        barWidth: '70%',
        type: 'bar',
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
    ],
  };
  option2.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      show: true,
      textStyle: {
        fontSize: 12,
        color: '#fff',
      },
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: BX,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
          axisLabel: {
            color: '#A1A7B3',
            interval: 0, // 横轴信息全部显示
            rotate: 30, //
          },
        },
      },
    ],
    yAxis: {
      show: false,
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: series2.value,
  };
  option3.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      show: true,

      textStyle: {
        fontSize: 12,
        color: '#fff',
      },
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: CX,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          color: '#A1A7B3',
          interval: 0, // 横轴信息全部显示
          rotate: 30, // 30度角倾斜显示
        },
      },
    ],
    yAxis: {
      show: false,
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: series3.value,
  };
  // 组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(recordtimer);
    // document.exitFullscreen();
  });
</script>

<script lang="ts">
  export default {
    name: 'Maintenancetasks',
  };
</script>

<style scoped lang="less">
  h1 {
    // color: var(--color-neutral-10);
    color: white;
  }
  .margin_10 {
    margin: 20px;
  }
  .txt_center {
    text-align: center;
  }
  .boder {
    border: 1px solid var(--color-neutral-4);
  }
  .container {
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/pageBg.png');
    // padding-top: 20px;
  }
  .bg {
    background: rgba(40, 66, 198, 0.2);
    width: 100%;
    height: 100%;
  }
  h2 {
    font-family: '宋体';
    text-align: left;
  }
  .arco-layout-footer footer {
    display: none;
  }

  ul {
    list-style-type: disc; /* 实心圆点 */
    // background-color: #fff143;
  }

  .tit {
    text-align: center;
    padding-top: 10px;
    position: relative;
    color: transparent;
    font-style: italic;
    font-weight: 900;
    letter-spacing: 0.25vw;
    background: linear-gradient(183deg, #fff 35%, #3fb4ff);
    background-clip: text;
    -webkit-background-clip: text;
  }
  .tit_1 {
    text-align: center;
    padding-top: 0px;
  }
  .box {
    width: 90%;
    margin: 0px auto;
    text-align: center;
  }
  .box1 {
    color: white;
    // border: 1px solid rgb(255, 255, 255);
    // height: 30vh;
    width: 100%;
  }
  .box1-border {
    // border: 1px solid rgb(94, 75, 237);
    // width: 93.5%;
  }
  .box1 .box1-col {
    border: 1px dashed rgb(94, 75, 237);
    height: 320px;
    // width: 100%;
    flex: 1;
    margin: 0px auto;
    background: rgba(40, 66, 198, 0.1);
  }
  .box2,
  .box3 {
    // border: 1px solid red;
    color: white;
    margin-top: 30px;
  }
  .table {
    width: 100%;
    font-size: 16px;
    // margin-top: 30px;
    // color: rgb(198, 190, 190);
    background: rgba(253, 253, 253, 0.2);
  }
  .table td,
  .table th {
    border: 1px solid rgba(254, 254, 254, 0.2);
    height: 50px;
  }
  .table th {
    background: rgba(40, 66, 198, 0.2);
  }
  .table td {
    // background: rgba(253, 253, 253, 0.2);
  }
  .table tr:nth-child(2n) {
    // background: rgba(49, 58, 232, 0.1);
  }
  .table tr:nth-child(2n-1) {
    //background: rgba(235, 238, 239, 0.4);
  }
  .red {
    background: rgba(234, 14, 14, 0.4);
    color: white;
  }
  .green {
    background: rgba(12, 158, 68, 0.4);
    color: white;
  }
  .yellow {
    background: rgba(247, 248, 246, 0.7);
    color: black;
    // color: rgb(193, 183, 183);
  }
  ::v-deep .arco-pagination-item {
    color: white;
  }
  ::v-deep .arco-pagination-total {
    color: white;
  }
  ::v-deep .arco-pagination-item:hover {
    // color: blue;
    background-color: rgb(var(--arcoblue-3));
  }
  ::v-deep .arco-pagination-item-active,
  .arco-pagination-item-active:hover {
    background-color: rgb(var(--arcoblue-3));
  }
  .a-col-demo {
    // border: 1px solid gray;
    padding: 8px 0px;
  }
  .grid-demo {
    margin-bottom: 0px;
  }
  ::v-deep .arco-input-wrapper,
  ::v-deep .arco-picker,
  ::v-deep .arco-select-view-single {
    background-color: transparent;
    border: 1px solid rgb(137, 132, 132);
    // background: rgba(235, 238, 239, 0.4);
    color: white;
  }
  ::v-deep .arco-input-wrapper:hover,
  ::v-deep .arco-picker:hover,
  ::v-deep .arco-select-view-single:hover {
    // background-color: transparent;
    background: rgba(49, 174, 232, 0.4);
  }
  ::v-deep .arco-picker input {
    color: white;
  }
  ::v-deep .arco-picker-suffix-icon {
    // background-color: white;
    color: white;
  }
  ::v-deep .arco-picker-focused .arco-picker-input-active input,
  .arco-picker-focused:hover .arco-picker-input-active input {
    background-color: transparent;
    color: white;
  }
</style>
