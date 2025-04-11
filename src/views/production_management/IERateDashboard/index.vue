<template>
  <div class="">
    <dv-full-screen-container class="full" v-show="true">
      <VScaleScreen width="1920" height="1080" :full-screen="true">
        <div class="container">
          <div class="border">
            <a-spin
              :loading="loading"
              tip="数据加载中...(Loading data...)"
              style="width: 100%; height: auto"
            >
              <div class="head" style="padding-top: 30px">
                <div class="grid-demo-background">
                  <a-space
                    direction="vertical"
                    :size="16"
                    style="display: block"
                  >
                    <a-row class="grid-demo">
                      <div style="position: fixed; margin-left: 30px">
                        <!-- <dv-button @click="toList" border="Border5" color="green"></dv-button>
                     
                      </dv-button> -->
                        <a-link @click="toList">
                          <img
                            src="@/assets/images/back.png"
                            style="width: 40px; margin-left: 20px"
                            @click="toList"
                          />
                        </a-link>
                        <div
                          style="
                            position: fixed;
                            left: 0;
                            top: 1;
                            color: red;
                            font-size: 20px;
                            background-color: rgb(211, 204, 113);
                          "
                          >{{ errorMessage }}</div
                        >
                      </div>
                      <div
                        style="
                          position: fixed;
                          right: 0;
                          color: white;
                          margin-right: 30px;
                          font-size: 20px;
                        "
                        >{{ timeNow }}</div
                      >
                      <div class="box">
                        <div class="box1">
                          <a-space
                            direction="vertical"
                            :size="16"
                            style="display: block"
                          >
                            <!-- //第一行 -->
                            <a-row class="grid-demo">
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white">工厂：</span>

                                  <a-select
                                    v-model="formModel.org_id"
                                    :style="{ width: '160px' }"
                                    placeholder=""
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 55%"
                                    @change="Funselectorgchange"
                                  >
                                    <a-option
                                      v-for="item in orgList"
                                      :key="item.ORG_CODE"
                                      :value="item.ORG_CODE"
                                      >{{ item.ORG_NAME }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white">起始日期：</span
                                  ><a-date-picker
                                    v-model="formModel.startdate"
                                    style="width: 55%"
                                    readonly
                                    value-format="YYYY/MM/DD"
                                /></div>
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white">结束日期：</span>

                                  <a-date-picker
                                    v-model="formModel.enddate"
                                    style="width: 55%"
                                    value-format="YYYY/MM/DD"
                                    @change="updateDate"
                                /></div>
                              </a-col>
                            </a-row>
                            <!-- 第二行 -->
                            <a-row class="grid-demo" style="margin-top: -16px">
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white">厂区：</span>

                                  <a-select
                                    v-model="formModel.plant_id"
                                    :style="{ width: '160px' }"
                                    placeholder=""
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 55%"
                                  >
                                    <a-option
                                      v-for="item in factoryareaList"
                                      :key="item.CODE"
                                      :value="item.CODE"
                                      >{{ item.NAME }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white; margin-left: 40px"
                                    >制程：</span
                                  >

                                  <a-select
                                    v-model="formModel.process_no"
                                    :style="{ width: '200px' }"
                                    placeholder=""
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 55%"
                                  >
                                    <a-option
                                      v-for="item in PROCESSList"
                                      :key="item.PROCESS_NO"
                                      :value="item.PROCESS_NO"
                                      >{{ item.PROCESS_NAME }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo"> </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><a-button
                                    type="primary"
                                    style="width: 55%"
                                    @click="search"
                                    >查询</a-button
                                  ></div
                                >
                              </a-col>
                            </a-row>
                          </a-space>
                        </div>
                        <div> </div>
                      </div>
                    </a-row>
                  </a-space>
                </div>
              </div>
              <div class="content" style="text-align: center"> </div>
              <div style="height: 1000px" class="display">
                <div style="flex: 5; height: 100%; text-align: center">
                  <div class="display">
                    <div
                      class="border1"
                      style="flex: 1; height: 420px; margin-right: 20px"
                    >
                      <dv-border-box12 :reverse="true">
                        <a-statistic
                          title="本周产量"
                          :value="bzcl"
                          :precision="0"
                          :value-from="0"
                          :start="true"
                          animation
                          style="
                            height: 400px;
                            width: 400px;
                            padding-top: 130px;
                            margin-left: 6px;
                          "
                          class="C1"
                        ></a-statistic>
                      </dv-border-box12>
                    </div>
                    <div
                      class="border1"
                      style="
                        flex: 1;
                        height: 420px;
                        width: 400px;
                        margin-right: 20px;
                      "
                    >
                      <dv-border-box12 :reverse="true">
                        <VCharts
                          :option="option6"
                          style="
                            height: 400px;
                            width: 400px;
                            padding-top: 30px;
                            margin-right: 10px;
                            margin-left: 10px;
                          "
                        ></VCharts>
                      </dv-border-box12>
                    </div>
                    <div
                      class="border1"
                      style="
                        flex: 2;
                        height: 420px;
                        margin-right: 20px;
                        width: 750px;
                      "
                    >
                      <dv-border-box13 :reverse="true"
                        ><VCharts
                          :option="option2"
                          style="
                            height: 400px;
                            width: 750px;
                            padding-top: 30px;
                            margin-left: 20px;
                          "
                        ></VCharts
                      ></dv-border-box13>
                    </div>
                  </div>
                  <div style="height: 30px"></div>
                  <div class="display">
                    <div
                      class="border1"
                      style="
                        flex: 1;
                        height: 420px;
                        width: 400px;
                        margin-right: 20px;
                      "
                    >
                      <dv-border-box13 :reverse="true"
                        ><VCharts
                          :option="option3"
                          style="
                            height: 400px;
                            width: 800px;
                            padding-top: 30px;
                            margin-left: 20px;
                          "
                        ></VCharts
                      ></dv-border-box13>
                    </div>
                    <div
                      class="border1"
                      style="
                        flex: 1;
                        height: 420px;
                        margin-right: 20px;
                        width: 400px;
                      "
                    >
                      <dv-border-box13 :reverse="true">
                        <VCharts
                          :option="option4"
                          style="
                            height: 400px;
                            width: 800px;
                            padding-top: 30px;
                            margin-left: 20px;
                          "
                        ></VCharts
                      ></dv-border-box13>
                    </div>
                  </div>
                </div>
                <div
                  class="border1"
                  style="flex: 1; height: 870px; width: 300px"
                >
                  <dv-border-box12 :reverse="true"
                    ><VCharts
                      :option="option5"
                      style="
                        height: 800px;
                        width: 300px;
                        padding-top: 20px;
                        margin-left: 6px;
                      "
                    ></VCharts
                  ></dv-border-box12>
                </div>
              </div>
            </a-spin> </div
        ></div>
      </VScaleScreen>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
  import { Getorg } from '@/api/kanbandevicea';
  import {
    GetPROCESS,
    Getgrouplist,
    Getplantlist,
    loadUserInfo,
  } from '@/api/IssueTrackingDashboardApi';
  import { GetNowTime } from '@/api/General';
  import { GetIERateDoard } from '@/api/EfficiencyKanbanApi';
  import router from '@/router';
  import VCharts from 'vue-echarts';
  import { ref, onMounted, reactive, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';
  import waterCircle from './components/waterCircle.vue';

  const { loading, setLoading } = useLoading(false);
  const generateFormModel = () => {
    return {
      org_id: '1001',
      plant_id: '',
      startdate: '2023/11/01',
      enddate: '2023/11/30',
      process_no: '',
    };
  };
  const errorMessage = ref('');
  const timeNow = ref('');
  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const questionList = ref<any>([]);
  const vPagesize = ref(3);
  const vCurrent = ref(1);
  const total = ref(0);
  const watervalue = ref<any>([]);
  const PROCESSList = ref<any>([]);
  const grouplist = ref<any>([]);
  const option5 = ref<any>([]);
  const option5X = ref<any>([]);
  const option4 = ref<any>([]);
  const option3 = ref<any>([]);
  const option3X = ref<any>([]);
  const option2 = ref<any>([]);
  const option1 = ref<any>([]);
  const option6 = ref<any>([]);
  const bzcl = ref<any>([]);

  const element = document.documentElement;
  element.requestFullscreen();

  onMounted(() => {
    vPagesize.value = 3;
    questionList.value = [];
    total.value = questionList.value.length;
    vCurrent.value = 1;
    // 默认周四日期
    const weekOfday1: any = moment(moment().startOf('day').valueOf()).format(
      'YYYY-MM-DD'
    );
    // 计算今天是这周第几天
    const weekOfday: any = moment(weekOfday1).format('E');
    formModel.value.enddate = moment(weekOfday1)
      .subtract(weekOfday - 1, 'days')
      .add(2, 'days')
      .format('YYYY-MM-DD');
    updateDate();
  });

  function toList() {
    console.log('进入了主页');
    router.push({
      name: 'Workplace',
      query: {
        // selectdate: formModel.value.selectdate,
        // selectorg: formModel.value.selectorg,
      },
    });
  }
  const Fungetorglist = async () => {
    // setLoading(true);
    try {
      const orgdata: any = await Getorg();
      orgList.value = JSON.parse(JSON.stringify(orgdata.list));
      orgList.value.unshift({ ORG_CODE: '0000', ORG_NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetplantlist = async () => {
    // setLoading(true);
    try {
      const vdata: any = await Getplantlist(formModel.value);
      factoryareaList.value = JSON.parse(JSON.stringify(vdata.list));
      factoryareaList.value.unshift({ CODE: '0000', NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FungetPROCESSlist = async () => {
    // setLoading(true);
    try {
      const PROCESSdata: any = await GetPROCESS();
      PROCESSList.value = JSON.parse(JSON.stringify(PROCESSdata.list));
      PROCESSList.value.unshift({ PROCESS_NO: '0000', PROCESS_NAME: '--' });
      console.log(PROCESSList.value);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetgrouplist = async () => {
    // setLoading(true);
    try {
      const vdata: any = await Getgrouplist(formModel.value);
      grouplist.value = JSON.parse(JSON.stringify(vdata.list));
      grouplist.value.unshift({ CODE: '0000', NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunloadUserInfo = async () => {
    // setLoading(true);
    try {
      const vdata: any = await loadUserInfo();
      if (vdata.list.length > 0) {
        formModel.value.org_id = vdata.list[0].ORG_ID;
        formModel.value.plant_id = vdata.list[0].PLANT_ID;
        // search();
      }
      // search();
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };

  Fungetorglist();
  FunGetplantlist();
  FungetPROCESSlist();
  FunGetgrouplist();
  FunloadUserInfo();
  function Funselectorgchange() {
    FunGetplantlist();
    FungetPROCESSlist();
    FunGetgrouplist();
  }
  const search = async () => {
    // setLoading(true);
    try {
      errorMessage.value = '';
      const week = moment(new Date(formModel.value.enddate)).day();
      if (week !== 3) {
        errorMessage.value = '0000:选择的结束日期必须为周三，请重新选择！';
        return;
      }
      if (formModel.value.process_no === '') {
        errorMessage.value = '0000:请选择制程';
        return;
      }
      const vdata: any = await GetIERateDoard(formModel.value);
      bzcl.value = vdata.list.data1[0].value;
      // watervalue.value = vdata.list.data2;

      watervalue.value = [];
      watervalue.value.push({ name: 'IE达成率%', value: vdata.list.data2 });
      option6.value.series[0].data = watervalue.value;

      option2.value.xAxis.data = [];
      option2.value.series[0].data = [];
      if (vdata.list.data3X != null && vdata.list.data3X.length > 0) {
        const data3X: any = vdata.list.data3X.split(',');
        const data3Y: any = vdata.list.data3Y.split(',');
        option2.value.xAxis.data = data3X;
        option2.value.series[0].data = data3Y;
      }

      option5.value.yAxis.data = [];
      option5.value.series[0].data = [];
      if (vdata.list.data4X != null && vdata.list.data4X.length > 0) {
        const data4X: any = vdata.list.data4X.split(',');
        const data4Y: any = vdata.list.data4Y.split(',');
        option5.value.yAxis.data = data4X;
        option5.value.series[0].data = data4Y;
      }

      option3.value.series[0].data = [];
      option3.value.series[1].data = [];
      // option3.value.xAxis.data = data5X;
      if (vdata.list.data5X != null && vdata.list.data5X.length > 0) {
        const data5X: any = vdata.list.data5X.split(',');
        const data5Y1: any = vdata.list.data5Y1.split(',');
        const data5Y2: any = vdata.list.data5Y2.split(',');
        option3.value.xAxis.data = data5X;
        option3X.value = data5X;
        option3.value.series[0].data = data5Y1;
        option3.value.series[0].name = 'IE PPH';
        option3.value.series[1].data = data5Y2;
        option3.value.series[1].name = '实际PPH';
      }

      option4.value.series[0].data = [];
      option4.value.series[1].data = [];
      if (vdata.list.data6X != null && vdata.list.data6X.length > 0) {
        const data6X: any = vdata.list.data6X.split(',');
        const data6Y1: any = vdata.list.data6Y1.split(',');
        const data6Y2: any = vdata.list.data6Y2.split(',');
        console.log(data6X);
        option4.value.xAxis.data = data6X;
        option5X.value = data6X;
        option4.value.series[0].data = data6Y1;
        option4.value.series[0].name = '目标';
        option4.value.series[1].data = data6Y2;
        option4.value.series[1].name = '实际';
      }
      console.log(vdata);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  function updateDate() {
    const satrtdate: any = new Date(formModel.value.enddate);
    formModel.value.startdate = moment(satrtdate)
      .add(-27, 'days')
      .format('YYYY-MM-DD');
  }
  const Now1timer = setInterval(async () => {
    // timeNow.value = new Date().toString();
    // const year1 = new Date().getFullYear();
    // const Month1 = new Date().getMonth() + 1;
    // const day1 = new Date().getDate();
    // const Hour1 =
    //   new Date().getHours().toLocaleString().length > 1
    //     ? new Date().getHours()
    //     : `${new Date().getHours()}`;
    // const Minute1 =
    //   new Date().getMinutes().toLocaleString().length > 1
    //     ? new Date().getMinutes()
    //     : `0${new Date().getMinutes()}`;
    // const Second1 =
    //   new Date().getSeconds().toLocaleString().length > 1
    //     ? new Date().getSeconds()
    //     : `0${new Date().getSeconds()}`;
    // timeNow.value = `${year1}年${Month1}月${day1}日 ${Hour1}:${Minute1}:${Second1}`;
    const date: any = await GetNowTime();
    timeNow.value = date.list;
  }, 1000);
  const searchtimer = setInterval(() => {
    console.log('定时查询');
    search();
  }, 300000);
  // 组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(Now1timer);
    clearInterval(searchtimer);
    document.exitFullscreen();
  });
  option1.value = {
    title: {
      text: '本周产量',
      left: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: 'item',
    },

    series: [
      {
        type: 'pie',
        radius: ['49%', '70%'],
        avoidLabelOverlap: false,

        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { name: '产量', value: 0 },
          { name: '', value: 1 },
        ],
        itemStyle: {
          normal: {
            label: {
              show: true,
              fontSize: 15,
              position: 'inner',
              color: 'white',
              formatter: (params: any) => {
                if (params.name === '') {
                  return '';
                }

                return `${params.name}(${
                  params.value === undefined ? 0 : params.value
                })`;
              },
            },
            color: (params: any) => {
              // 某一个数据项的颜色。
              if (params.name === '') {
                return '#AAAAAA';
              }
              return '#00d3ee';
            },
          },
        },
      },
    ],
  };
  option2.value = {
    color: ['#FE9A2E'],
    title: {
      text: '周IE达成率',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: '{b0}<br/> {c0}%',
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      type: 'value',
      // min: 100,
      name: '%',
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
        itemStyle: { normal: { label: { show: true, color: '#fff' } } },
        lineStyle: { width: 2 },
      },
    ],
  };
  option3.value = {
    title: {
      text: 'PPH',
      left: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
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
    grid: {
      left: '3%',
      right: '10%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: option3X,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
    ],
    yAxis: [
      {
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
    ],
    series: [
      {
        name: '目标',
        type: 'bar',
        barWidth: '30%',
        data: [],
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
      {
        name: '实际',
        type: 'bar',
        barWidth: '30%',
        data: [],
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
    ],
  };
  option4.value = {
    color: ['#FFBF00', '#E2A9F3'],
    title: {
      text: '实际产量',
      left: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
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
    grid: {
      left: '3%',
      right: '10%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: option5X,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
    ],
    yAxis: [
      {
        name: 'x 10000',
        show: true,
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        axisLabel: {
          formatter: (params: any) => {
            if (params) {
              return params / 10000;
            }
            return '';
          },
        },
      },
    ],
    series: [
      {
        name: '目标',
        type: 'bar',
        barWidth: '30%',
        data: [],
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
              position: 'top',
              formatter: (params: any) => {
                if (params) {
                  return `${(params.value / 10000).toFixed(2)}`;
                }
                return '';
              },
            },
          },
        },
      },
      {
        name: '实际',
        type: 'bar',
        barWidth: '30%',
        data: [],
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
              position: 'top',
              formatter: (params: any) => {
                if (params) {
                  return `${(params.value / 10000).toFixed(2)}`;
                }
                return '';
              },
            },
          },
        },
      },
    ],
  };
  option5.value = {
    color: ['#3398DB'],
    title: {
      text: '厂区IE达成率',
      left: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: [],
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
              position: 'insideRight',
              // formatter: (params: any) => {
              //   return `${params.data}%`;
              // },
            },
          },
        },
      },
    ],
  };
  option6.value = {
    // tooltip: {
    //   formatter: '{a} <br/>{b} : {c}%',
    // },
    title: {
      text: '本周IE达成率',
      left: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },

    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    series: [
      {
        type: 'gauge',
        splitNumber: 2,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2'],
            ],
          },
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%',
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          length: 10,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: 'auto',
            width: 3,
          },
        },
        axisLabel: {
          color: '#fff',

          // fontSize: 20,
          // distance: -60,
          // rotate: 'tangential',
          show: false,
        },
        title: {
          color: '#fff',
          // offsetCenter: [0, '-10%'],
          // fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}',
          color: 'inherit',
          offsetCenter: [0, '-10%'],
        },
        data: [
          {
            value: 0,
            name: '达成率%',
          },
        ],
      },
    ],
  };
</script>

<script lang="ts">
  export default {
    name: 'Maintenancetasks',
  };
</script>

<style scoped lang="less">
  .boder {
    border: 1px solid var(--color-neutral-4);
  }
  .full {
    background-color: black;
    background-size: cover;
  }
  .container {
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/pageBg.png');
  }
  .border {
    background: rgba(40, 66, 198, 0.2);
    // width: 1920px;
    // height: 1080px;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .display {
    display: flex;
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
    font-size: 20px;
  }
  .box2,
  .box3 {
    // border: 1px solid red;
    color: white;
    margin-top: 50px;
  }
  .a-col-demo {
    // border: 1px solid gray;
    padding: 8px 0px;
  }
  .grid-demo {
    margin-bottom: 0px;
  }
  .head {
    height: 150px;
  }
  .content {
    // margin: 0px 10px;
    // height: 100vh;
  }
  text {
    color: white;
    font-family: 'STHupo';
    font-size: 20px;
  }
  .border1 {
    height: 100%;
    width: 100%;
    color: white;
  }
  .border1 {
    color: white;
    border-radius: 8px;
  }
  .C1 ::v-deep .arco-statistic-content .arco-statistic-value-integer {
    color: rgb(207, 162, 14);
    font-size: 35px;
  }
  .C1 ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    color: rgb(207, 162, 14);
    font-size: 32px;
  }
  .C1 ::v-deep .arco-statistic-title {
    display: inline-block;
    color: white;
    font-size: 38px;
  }
</style>
