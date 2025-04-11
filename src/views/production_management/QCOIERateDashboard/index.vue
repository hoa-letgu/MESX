<template>
  <div class="">
    <dv-full-screen-container class="full" v-show="true">
      <div class="container">
        <div class="border">
          <a-spin
            :loading="loading"
            tip="数据加载中...(Loading data...)"
            style="width: 100%; height: auto"
          >
            <!-- <dv-border-box-11
            style="height: 100vh; width: 100%"
            title="问题追踪看板"
          > -->
            <div class="head" style="padding-top: 30px">
              <div class="grid-demo-background">
                <a-space direction="vertical" :size="16" style="display: block">
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
                        style="position: fixed; left: 0; top: 1; color: red"
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
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">工厂：</span>

                                <a-select
                                  v-model="formModel.org_id"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px"
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
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">厂区：</span>

                                <a-select
                                  v-model="formModel.plant_id"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px"
                                  @change="FunselectPlantchange"
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
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">上级部门：</span>

                                <a-select
                                  v-model="formModel.dept_no"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px"
                                  @change="Funselectdeptchange"
                                >
                                  <a-option
                                    v-for="item in deptlist"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.NAME }}</a-option
                                  >
                                </a-select></div
                              >
                            </a-col>
                            <a-col :span="6" class="a-col-demo">
                              <div
                                ><span style="color: white">工作中心：</span>
                                <a-auto-complete
                                  v-model="formModel.group_no"
                                  :data="grouplist"
                                  :style="{ width: '220px' }"
                                  strict
                                />
                              </div>
                            </a-col>
                            <a-col :span="2" class="a-col-demo"> </a-col>
                          </a-row>
                          <!-- 第二行 -->
                          <a-row class="grid-demo" style="margin-top: -16px">
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">转换时间：</span
                                ><a-date-picker
                                  v-model="formModel.startdate"
                                  style="width: 220px"
                                  value-format="YYYY/MM/DD"
                              /></div>
                            </a-col>
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">至：</span>

                                <a-date-picker
                                  v-model="formModel.enddate"
                                  style="width: 220px"
                                  value-format="YYYY/MM/DD"
                              /></div>
                            </a-col>
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">ART：</span>

                                <a-input
                                  v-model="formModel.ART"
                                  :style="{ width: '220px' }"
                                  allow-clear
                                />
                              </div>
                            </a-col>
                            <a-col :span="6" class="a-col-demo">
                              <div
                                ><span style="color: white">制程：</span>

                                <a-select
                                  v-model="formModel.PROCESS_NO"
                                  :style="{ width: '220px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px"
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
                            <a-col :span="3" class="a-col-demo">
                              <div>
                                <a-button
                                  type="primary"
                                  class="button"
                                  @click="search"
                                >
                                  <template #icon>
                                    <icon-search />
                                  </template>
                                  <template #default>搜索</template>
                                </a-button>
                              </div>
                            </a-col>

                            <!-- <a-col :span="6" class="a-col-demo">
                            <div
                              ><a-button style="width: 254px" @click="reset"
                                >重置</a-button
                              ></div
                            >
                          </a-col> -->
                          </a-row>
                        </a-space>
                      </div>
                      <div> </div>
                    </div>
                  </a-row>
                </a-space>
              </div>
            </div>

            <div
              class="bottom"
              style="text-align: center; color: white; margin-top: 10px"
            >
              <div style="height: 32vh; width: 98%; margin: 0px auto" title="">
                <div style="padding-top: 1vh; width: 95%; margin: 0px auto">
                  <div
                    class="bg"
                    style="height: 68vh; width: 99%; margin: 5px 5px"
                  >
                    <div>
                      <VCharts
                        id="line"
                        :option="option1"
                        style="height: 70vh; width: 100%; padding-top: 10vh"
                      ></VCharts
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- </dv-border-box-11> -->
          </a-spin>
        </div></div
      >
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
  import { Getorg, Getfactory } from '@/api/kanbandevicea';
  import {
    Getdeptlist,
    Getgrouplist,
    Getplantlist,
    GetquestionQty,
    loadUserInfo,
    GetQCOIEratemm,
    GetPROCESS,
    GetplantlistNew,
  } from '@/api/IssueTrackingDashboardApi';
  import {
    GetNowTime
  } from '@/api/General';
  import router from '@/router';
  import VCharts from 'vue-echarts';
  import { ref, onMounted, reactive, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import moment from 'moment';
  import { TEXT_ALIGNS } from '@arco-design/web-vue/es/_utils/constant';
  import { init, SetOptionOpts } from 'echarts/core';

  const { loading, setLoading } = useLoading(true);
  const generateFormModel = () => {
    return {
      org_id: '',
      plant_id: '',
      startdate: '',
      enddate: '',
      dept_no: '',
      group_no: '',
      ART: '',
      PROCESS_NO: '',
    };
  };
  const errorMessage = ref('');
  const allQty = ref();
  const unfinishQty = ref();
  const finishQty = ref();
  const timeNow = ref('');
  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const questionList = ref<any>([]);
  const listbox = ref<any>([]);
  const vPagesize = ref(3);
  const vCurrent = ref(1);
  const total = ref(0);
  const deptlist = ref<any>([]);
  const grouplist = ref<any>([]);
  const option1 = ref<any>([]);
  const s = ref<any>([]);
  const XTimeName = ref<any>([]);
  const PROCESSList = ref<any>([]);
  const dtgroup = ref<any>([]);

  const element = document.documentElement;
  element.requestFullscreen();

  // if (element.requestFullscreen) {
  //   element.requestFullscreen();
  // } else if (element.mozRequestFullScreen) {
  //   element.mozRequestFullScreen();
  // } else if (element.webkitRequestFullscreen) {
  //   element.webkitRequestFullscreen();
  // } else if (element.msRequestFullscreen) {
  //   element.msRequestFullscreen();
  // }

  onMounted(() => {
    vPagesize.value = 10;
    questionList.value = [];
    total.value = questionList.value.length;
    vCurrent.value = 1;
    formModel.value.org_id = '0000';
    formModel.value.plant_id = '0000';
    formModel.value.dept_no = '0000';
    formModel.value.group_no = '';
    formModel.value.ART = '';
    formModel.value.PROCESS_NO = '0000';
    const obj = {
      starttime: '',
      endtime: '',
    };
    obj.starttime = moment(
      moment().add(0, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
    obj.endtime = moment(moment().valueOf()).format('YYYY/MM/DD');
    formModel.value.startdate = obj.starttime;
    formModel.value.enddate = obj.endtime;
    search();
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
      formModel.value.plant_id = '0000';
      const vdata: any = await GetplantlistNew(formModel.value);
      factoryareaList.value = JSON.parse(JSON.stringify(vdata.list));
      factoryareaList.value.unshift({ CODE: '0000', NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetdeptlist = async () => {
    // setLoading(true);
    try {
      formModel.value.dept_no = '0000';
      const vdata: any = await Getdeptlist(formModel.value);
      deptlist.value = JSON.parse(JSON.stringify(vdata.list));
      deptlist.value.unshift({ CODE: '0000', NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetgrouplist = async () => {
    // setLoading(true);
    try {
      formModel.value.group_no = '';
      const vdata: any = await Getgrouplist(formModel.value);
      dtgroup.value = JSON.parse(JSON.stringify(vdata.list));
      grouplist.value = [];
      dtgroup.value.forEach((item: any) => {
        grouplist.value.push(`${item.CODE}|${item.NAME}`);
      });
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

  const FunGetQCOIEratemm = async () => {
    setLoading(true);
    try {
      try {
        const myChart = init(document.getElementById('line') as HTMLElement);
        myChart.clear();
      } catch {
        return;
      }
      if (
        formModel.value.group_no === '' &&
        formModel.value.PROCESS_NO === '0000'
      ) {
        // alert("sss");
        return;
      }

      const IEratData: any = await GetQCOIEratemm(formModel.value);
      console.log(IEratData.list);
      XTimeName.value = IEratData.list.Xlist;
      s.value.length = 0;
      Object.keys(IEratData.list).forEach((key: any) => {
        if (key !== 'Xlist')
          s.value.push({
            name: key,
            type: 'line',
            smooth: true,
            data: IEratData.list[key],
            itemStyle: {
              normal: {
                label: { show: false, color: 'greenyellow', distance: 10 },
              },
            },
            lineStyle: { width: 2 },
          });
      }, console.log(s.value));
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  Fungetorglist();
  FunGetplantlist();
  FunGetdeptlist();
  FunGetgrouplist();
  FungetPROCESSlist();
  // FunloadUserInfo();

  function FunselectPlantchange() {
    FunGetdeptlist();
    FunGetgrouplist();
  }
  function Funselectorgchange() {
    FunGetplantlist();
    FunGetdeptlist();
    FunGetgrouplist();
  }
  function Funselectdeptchange() {
    FunGetgrouplist();
  }
  const search = async () => {
    // setLoading(true);
    try {
      errorMessage.value = '';

      FunGetQCOIEratemm();
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
  }, 30000);
  // 组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(Now1timer);
    clearInterval(searchtimer);
    document.exitFullscreen();
  });
  option1.value = {
    title: {
      text: '',
      left: 'center',
      textStyle: {
        color: '#fff',
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
      boundaryGap: true,
      data: XTimeName,
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: 45,
        formatter: (params: any) => {
          if (params) {
            return `${params.substring(5, params.length)}`;
          }
          return '';
        },
        textStyle: {
          fontSize: 18, // 设置字体大小
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
        textStyle: {
          fontSize: 18, // 设置字体大小
        },
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        show: false,
      },
    },
    series: s.value,
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
    background-color: white;
    background-size: cover;
  }
  .container {
    background-color: white;
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
    // background: rgba(40, 66, 198, 0.3);
  }
  .arco-layout-footer footer {
    display: none;
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
    //  border: 1px solid gray;
    padding: 10px 0px;
    text-align: right;
  }
  .grid-demo {
    margin-bottom: 0px;
  }
  .head {
    height: 15vh;
  }
  .content {
    // margin: 0px 10px;
    height: 50vh;
    color: white;
  }
  .bottom {
    // margin: -20px 10px;
    height: 40vh;
  }
  .content-middle div {
    // margin: 10px 2px;
    width: 95%;
    margin: 1vh auto;
    // background: rgba(236, 236, 238, 0.3);
    // background-image: url('@/assets/images/bgmain.png');
    background-repeat: no-repeat;
  }
  .content-middle {
    margin-top: -1vh;
  }
  text {
    // margin-top: -20px;
    color: white;
    font-family: 'STHupo';
    font-size: 20px;
    // position: fixed;
  }
  .table {
    width: 100%;
    font-size: 16px;
    margin-top: 30px;
    // color: rgb(198, 190, 190);
  }
  .table td,
  .table th {
    border: 1px solid rgb(183, 179, 179);
    height: 4vh;
  }
  .table th {
    // background: rgba(35, 28, 238, 0.3);
    height: 5vh;
  }
  .table tr:nth-child(2) {
    // background: rgba(5, 127, 183, 0.3);
  }
  .table tr:nth-child(3) {
    // background: rgba(149, 75, 219, 0.3);
  }
  .table tr:nth-child(4) {
    // background: rgba(5, 172, 250, 0.3);
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
  ::v-deep .arco-statistic-content .arco-statistic-value {
    color: yellow;
    // font-family: 'STHupo';
    text-align: center;
    // padding-top: 20px;
    // color: rgb(247, 133, 34);
    // padding-bottom: 10px;
    // width: 300px;
  }
  ::v-deep .arco-statistic-content .arco-statistic-value-integer {
    font-size: 60px;
  }

  .button {
    position: relative;
    background-color: #b067ff;
    border: none;
    font-size: 16px;
    color: #ffffff;
    padding: 8px;
    width: 100px;
    height: 40px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
  }

  .button:after {
    content: '';
    background: #c9d841;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s;
  }

  .button:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
</style>
