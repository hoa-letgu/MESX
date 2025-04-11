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
              <div style="height: 1000px">
                <div>
                  <div class="display">
                    <div
                      class="border1"
                      style="
                        flex: 2;
                        height: 420px;
                        width: 1920px;
                        margin-right: 20px;
                      "
                    >
                      <dv-border-box12 :reverse="true"
                        ><VCharts
                          :option="option2"
                          style="
                            height: 400px;
                            width: 1900px;
                            padding-top: 20px;
                            margin-right: 10px;
                            margin-left: 10px;
                          "
                        ></VCharts
                      ></dv-border-box12>
                    </div>
                  </div>
                  <div style="height: 3vh"></div>
                  <div class="display">
                    <div
                      class="border1"
                      style="
                        flex: 2;
                        height: 420px;
                        width: 1920px;
                        margin-right: 20px;
                      "
                    >
                      <dv-border-box12 :reverse="true"
                        ><VCharts
                          :option="option4"
                          style="
                            height: 400px;
                            width: 1900px;
                            padding-top: 20px;
                            margin-right: 10px;
                            margin-left: 10px;
                          "
                        ></VCharts
                      ></dv-border-box12>
                    </div>
                  </div>
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
    Getplantlist,
    loadUserInfo,
  } from '@/api/IssueTrackingDashboardApi';
  import { GetNowTime } from '@/api/General';
  import { GetCompareIERateDoard } from '@/api/EfficiencyKanbanApi';
  import router from '@/router';
  import VCharts from 'vue-echarts';
  import { ref, onMounted, reactive, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';

  const { loading, setLoading } = useLoading(false);
  const generateFormModel = () => {
    return {
      org_id: '',
      plant_id: '',
      startdate: '',
      enddate: '',
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
  const PROCESSList = ref<any>([]);
  const option4 = ref<any>([]);
  const option4X = ref<any>([]);
  const option4Y = ref<any>([]);
  const option2 = ref<any>([]);
  const option2Y = ref<any>([]);
  const VdataZoom = ref(true);

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
  function updateDate() {
    const satrtdate: any = new Date(formModel.value.enddate);
    formModel.value.startdate = moment(satrtdate)
      .add(-13, 'days')
      .format('YYYY-MM-DD');
  }
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
      console.log('6666666666666666666666666666666666666666666');
      const orgdata: any = await Getorg();
      console.log(orgdata);
      // alert(orgdata);
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

  FunloadUserInfo();
  function Funselectorgchange() {
    FunGetplantlist();
    FungetPROCESSlist();
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
      const vdata: any = await GetCompareIERateDoard(formModel.value);

      option2.value.xAxis.data = [];
      option2Y.value.length = 0;
      if (vdata.list.data1 != null && vdata.list.data1.length > 1) {
        option2Y.value = [];
        console.log(vdata.list.data1);
        const data1X: any = vdata.list.data1[0].DEPT_NO.split(',');
        const data1Y1: any = vdata.list.data1[0].RATE.split(',');
        const data1Y2: any = vdata.list.data1[1].RATE.split(',');
        option2.value.xAxis.data = data1X;
        let i: any = 0;
        data1X.forEach((item: any) => {
          const CZ: any = data1Y1[i] - data1Y2[i];
          option2Y.value.push(CZ.toFixed(2));
          i += 1;
        });

        // const data1Y: any = vdata.list.data1Y.split(',');
        option2.value.series[0].data = option2Y.value;
      }

      // option4Y.value.length = 0;
      option4.value.xAxis.data = [];
      option4.value.series[0].name = '';
      option4.value.series[0].data = '';
      option4.value.series[1].name = '';
      option4.value.series[1].data = '';

      if (vdata.list.data2 != null && vdata.list.data2.length > 0) {
        option4Y.value = [];
        const data2JSON = JSON.parse(JSON.stringify(vdata.list.data2));
        option4X.value = data2JSON[0].DEPT_NO.split(',');
        let i: any = 0;
        data2JSON.forEach((item: any) => {
          i += 1;
          if (i < 3) {
            const data2Y = item.RATE.split(',');
            option4.value.series[i - 1].name = item.WEEKDAY;
            option4.value.series[i - 1].data = data2Y;
            // option4Y.value.push({
            //   name: item.WEEKDAY,
            //   data: data2Y,
            //   type: 'bar',
            //   smooth: true,
            //   itemStyle: {
            //     normal: {
            //       label: {
            //         show: true,
            //         color: '#fff',
            //         formatter: (params: any) => {
            //           if (params.data === '0') {
            //             return '';
            //           }
            //           return params.data;
            //         },
            //         position: 'top',
            //       },
            //     },
            //   },
            //   lineStyle: { width: 2 },
            // });

            // break;
          }
        });
      }
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

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
  }, 60000);
  // 组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(Now1timer);
    clearInterval(searchtimer);
    document.exitFullscreen();
  });
  option4.value = {
    title: {
      text: '',
      left: 'left',
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 'top',
      left: 'right',
      textStyle: {
        color: '#fff',
      },
    },

    xAxis: {
      type: 'category',
      data: option4X,
      axisTick: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        rotate: 45,
        interval: 0,
        fontSize: 12,
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
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '',
        data: '',
        type: 'bar',
        smooth: true,
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
              formatter: (params: any) => {
                if (params.data === '0') {
                  return '';
                }
                return params.data;
              },
              position: 'top',
            },
          },
        },
        lineStyle: { width: 2 },
      },
      {
        name: '',
        data: '',
        type: 'bar',
        smooth: true,
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: '#fff',
              formatter: (params: any) => {
                if (params.data === '0') {
                  return '';
                }
                return params.data;
              },
              position: 'top',
            },
          },
        },
        lineStyle: { width: 2 },
      },
    ],
  };
  option2.value = {
    color: ['#FE9A2E'],
    title: {
      text: '',
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
      // formatter: '{b0}<br/> {c0}%',
    },
    legend: {
      top: 'top',
      left: 'right',
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      type: 'category',
      data: [],
      axisTick: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 45,
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
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '与上周对比',
        data: [],
        type: 'bar',
        smooth: true,
        itemStyle: { normal: { label: { show: true, color: '#fff' } } },
        lineStyle: { width: 2 },
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
    // background-image: url('@/assets/images/backgroud-1.png');
    background-color: black;
    background-size: cover;
  }
  .container {
    // background-color: var(--color-bg-1);
    // background-image: url('@/assets/images/backgroud-1.png');
    background-size: cover;
    // background-repeat: no-repeat;
    // background-color: #031a5a;
    width: 100%;
    height: 100%;
    // background-position: 0px -70px;
    // overflow: scroll;
    background-image: url('@/assets/images/pageBg.png');
  }
  .border {
    background: rgba(40, 66, 198, 0.2);
    width: 100%;
    height: 100%;
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
    background: linear-gradient(183deg, #fff 35%, #535657);
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
    // margin-top: -20px;
    color: white;
    font-family: 'STHupo';
    font-size: 20px;
    // position: fixed;
  }
  .border1 {
    // border: 2px dashed rgba(71, 175, 231, 0.6);
    height: 100%;
    width: 100%;
    color: white;
    // background-color: rgba(8, 8, 8, 0.2);
    // background: rgba(205, 203, 203, 0.2);
  }
  .border1 {
    // background-color: transparent;
    // box-shadow: rgb(71, 175, 231) 0px 0px 5px inset;
    color: white;
    border-radius: 8px;
    // width: 80%;
  }

  // ::v-deep .arco-input-wrapper,
  // ::v-deep .arco-picker,
  // ::v-deep .arco-select-view-single {
  //   background-color: transparent;
  //   border: 1px solid rgb(74, 136, 237);
  //   // background: rgba(235, 238, 239, 0.4);
  //   color: white;
  // }
  // ::v-deep .arco-input-wrapper:hover,
  // ::v-deep .arco-picker:hover,
  // ::v-deep .arco-select-view-single:hover {
  //   // background-color: transparent;
  //   background: rgba(49, 174, 232, 0.4);
  // }
  // ::v-deep .arco-picker input {
  //   color: white;
  // }
  // ::v-deep .arco-picker-suffix-icon {
  //   // background-color: white;
  //   color: white;
  // }
  // ::v-deep .arco-picker-focused .arco-picker-input-active input,
  // .arco-picker-focused:hover .arco-picker-input-active input {
  //   background-color: transparent;
  //   color: white;
  // }
  // ::v-deep .arco-link {
  //   color: rgb(164, 164, 156);
  // }
  // ::v-deep .arco-btn-primary,
  // .arco-btn-primary[type='button'],
  // .arco-btn-primary[type='submit'] {
  //   background-color: transparent;
  //   border: 1px solid rgb(74, 136, 237);
  //   // background: rgba(235, 238, 239, 0.4);
  //   color: white;
  // }
</style>
