<template>
  <div class="">
    <dv-full-screen-container class="full">
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
                                  style="width: 254px"
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
                                  style="width: 254px"
                                  value-format="YYYY/MM/DD"
                              /></div>
                            </a-col>
                            <a-col :span="6" class="a-col-demo">
                              <div
                                ><span style="color: white">结束日期：</span>

                                <a-date-picker
                                  v-model="formModel.enddate"
                                  style="width: 254px"
                                  value-format="YYYY/MM/DD"
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
                                  style="width: 254px"
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
                            <a-col :span="6" class="a-col-demo">
                              <div
                                ><span style="color: white">上级部门：</span>

                                <a-select
                                  v-model="formModel.dept_no"
                                  :style="{ width: '160px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 254px"
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

                                <!-- <a-select
                                  v-model="formModel.group_no"
                                  :style="{ width: '160px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 254px"
                                >
                                  <a-option
                                    v-for="item in grouplist"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.NAME }}</a-option
                                  >
                                </a-select> -->
                                <a-auto-complete
                                  v-model="formModel.group_no"
                                  :data="grouplist"
                                  :style="{ width: '254px' }"
                                  :placeholder="
                                    $t('maintenancetasks.form.plsdept')
                                  "
                                  strict
                                />
                              </div>
                            </a-col>
                            <a-col :span="6" class="a-col-demo">
                              <div
                                ><a-button
                                  type="primary"
                                  style="width: 254px"
                                  @click="search"
                                  >查询</a-button
                                ></div
                              >
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
            <div class="content" style="text-align: center">
              <a-row class="grid-demo">
                <a-col :span="9">
                  <div>
                    <!-- <dv-border-box-1>dv-border-box-1</dv-border-box-1> -->
                    <dv-border-box-13
                      style="height: 48vh; width: 95%; margin: 0px auto"
                      title="原因类型"
                    >
                      <VCharts
                        :option="option3"
                        style="height: 45vh; width: 100%; padding-top: 5vh"
                      ></VCharts>
                    </dv-border-box-13>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div class="content-middle">
                    <div>
                      <div demo-bg>
                        <dv-border-box7 :reverse="true" title="问题总个数">
                          <div dv-bg>
                            <text> 问题总个数</text>
                            <div
                              small-bg
                              style="height: 10vh; line-height: 10vh"
                            >
                              <a-statistic
                                title=""
                                :value="allQty"
                                :precision="0"
                                :value-from="0"
                                :start="true"
                                animation
                              ></a-statistic>
                            </div>
                          </div>
                        </dv-border-box7>
                      </div>
                    </div>
                    <div>
                      <div demo-bg>
                        <dv-border-box7 :reverse="true" title="未完成个数">
                          <div dv-bg>
                            <text style="color: red"> 未完成个数</text>
                            <div
                              small-bg
                              style="height: 10vh; line-height: 10vh"
                            >
                              <a-statistic
                                title=""
                                :value="unfinishQty"
                                :precision="0"
                                :value-from="0"
                                :start="true"
                                animation
                              ></a-statistic>
                            </div>
                          </div>
                        </dv-border-box7>
                      </div>
                    </div>
                    <div>
                      <div demo-bg>
                        <dv-border-box7 :reverse="true" title="已完成个数">
                          <div dv-bg>
                            <text style="color: green"> 已完成个数</text>
                            <div
                              small-bg
                              style="height: 10vh; line-height: 10vh"
                            >
                              <a-statistic
                                title=""
                                :value="finishQty"
                                :precision="0"
                                :value-from="0"
                                :start="true"
                                animation
                              ></a-statistic>
                            </div>
                          </div>
                        </dv-border-box7>
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-col :span="9">
                  <div>
                    <dv-border-box-13
                      style="height: 48vh; width: 95%; margin: 0px auto"
                      title="问题趋势"
                    >
                      <VCharts
                        :option="option2"
                        style="
                          height: 48vh;
                          width: 100%;
                          padding-top: 5vh;
                          margin-left: 0.6vh;
                        "
                      ></VCharts>
                    </dv-border-box-13>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div
              class="bottom"
              style="text-align: center; color: white; margin-top: 10px"
            >
              <dv-border-box-7
                style="height: 32vh; width: 98%; margin: 0px auto"
                title="问题记录"
              >
                <div style="padding-top: 1vh; width: 95%; margin: 0px auto">
                  <h2> 问题记录</h2>
                  <table
                    class="table"
                    cellspacing="0"
                    cellpadding="0"
                    border="1"
                    @mouseover="mousehover()"
                    @mouseleave="mouseleave()"
                  >
                    <tr>
                      <th>{{ $t('IssueTrackingDashboard.form.qid') }}</th>
                      <th>{{ $t('IssueTrackingDashboard.form.org_name') }}</th>
                      <th>{{
                        $t('IssueTrackingDashboard.form.plant_name')
                      }}</th>
                      <th>{{ $t('IssueTrackingDashboard.form.dept_name') }}</th>
                      <th>{{
                        $t('IssueTrackingDashboard.form.group_name')
                      }}</th>
                      <th>{{ $t('IssueTrackingDashboard.form.art_no') }}</th>
                      <th>{{
                        $t('IssueTrackingDashboard.form.reasons_name')
                      }}</th>
                      <th>{{
                        $t('IssueTrackingDashboard.form.UNIT_OWNER')
                      }}</th>
                      <th>{{ $t('IssueTrackingDashboard.form.PLAN_DATE') }}</th>
                      <th>{{
                        $t('IssueTrackingDashboard.form.STATUS_NAME')
                      }}</th>
                      <th>{{
                        $t('IssueTrackingDashboard.form.CHECK_DATE')
                      }}</th>
                    </tr>

                    <tr v-for="item in listbox" :key="item.KEY">
                      <td :title="item.QID">{{ item.QID }}</td>
                      <td :title="item.ORG_NAME">{{ item.ORG_NAME }}</td>
                      <td :title="item.PLANT_NAME">{{ item.PLANT_NAME }}</td>
                      <td :title="item.DEPT_NAME">{{ item.DEPT_NAME }}</td>
                      <td :title="item.GROUP_NAME">{{ item.GROUP_NAME }}</td>
                      <td :title="item.ART_NO">{{ item.ART_NO }}</td>
                      <td :title="item.REASON_NAME">{{ item.REASON_NAME }}</td>
                      <td :title="item.UNIT_OWNER">{{ item.UNIT_OWNER }}</td>
                      <td :title="item.PLAN_DATE">{{ item.PLAN_DATE }}</td>
                      <td :title="item.STATUS_NAME">{{ item.STATUS_NAME }}</td>
                      <td :title="item.CHECK_DATE">{{ item.CHECK_DATE }}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 8px">
                    <a-pagination
                      :total="total"
                      :pagesize="vPagesize"
                      :current="vCurrent"
                      :page-size="3"
                      :default-current="1"
                      show-total
                      @change="onPageChange"
                  /></div>
                </div>
              </dv-border-box-7>
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
    GetlineRateData,
    GetpieRateData,
    Getplantlist,
    GetquestionList,
    GetquestionQty,
    loadUserInfo,
  } from '@/api/IssueTrackingDashboardApi';
  import { GetNowTime } from '@/api/General';
  import router from '@/router';
  import VCharts from 'vue-echarts';
  import { ref, onMounted, reactive, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import moment from 'moment';

  const { loading, setLoading } = useLoading(true);
  const generateFormModel = () => {
    return {
      org_id: '',
      plant_id: '',
      startdate: '2023/10/01',
      enddate: '2023/10/18',
      dept_no: '',
      group_no: '',
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
  const option3 = ref<any>([]);
  const option2 = ref<any>([]);
  const piedata = ref<any>([]);
  const lineYdata = ref<any>([]);
  const lineXdata = ref<any>([]);

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
    vPagesize.value = 3;
    questionList.value = [];
    total.value = questionList.value.length;
    vCurrent.value = 1;
    const obj = {
      starttime: '',
      endtime: '',
    };
    obj.starttime = moment(
      moment().add(-6, 'days').startOf('day').valueOf()
    ).format('YYYY-MM-DD');
    obj.endtime = moment(moment().valueOf()).format('YYYY-MM-DD');
    formModel.value.startdate = obj.starttime;
    formModel.value.enddate = obj.endtime;
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
      factoryareaList.value.length = 0;
      const vdata: any = await Getplantlist(formModel.value);
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
      deptlist.value.length = 0;
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
      grouplist.value.length = 0;
      const vdata: any = await Getgrouplist(formModel.value);
      const wdata = JSON.parse(JSON.stringify(vdata.list));
      wdata.forEach((val: any) => {
        const str = `${val.CODE}|${val.NAME}`;
        grouplist.value.unshift(str);
        console.log(str);
      });
      grouplist.value.unshift('|全部');
      formModel.value.group_no = '|全部';
      console.log(grouplist);
      // grouplist.value = JSON.parse(JSON.stringify(vdata.list.CODE));
      // grouplist.value.unshift({ CODE: '0000', NAME: '全部' });
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
        formModel.value.dept_no = vdata.list[0].DEPT_NO;
        formModel.value.group_no = `${vdata.list[0].DEPARTMENT_CODE}|${vdata.list[0].GROUP_NAME}`;
      }
      search();
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetpieRateData = async () => {
    setLoading(true);
    try {
      const vdata: any = await GetpieRateData(formModel.value);
      piedata.value = JSON.parse(JSON.stringify(vdata.list));
      console.log(piedata.value);
      option3.value.series[0].data = piedata.value;
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const FunGetquestionList = async () => {
    setLoading(true);
    try {
      const vdata: any = await GetquestionList(formModel.value);
      if (vdata.length === 0) questionList.value = [];
      else questionList.value = JSON.parse(JSON.stringify(vdata.list));
      total.value = questionList.value.length;
      paging();
      // console.log(questionList.value);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const FunGetlineRateData = async () => {
    setLoading(true);
    try {
      const vdata: any = await GetlineRateData(formModel.value);
      // console.log(vdata.list);
      // console.log(vdata.list.Xlist);
      // console.log(vdata.list.Ylist);
      lineYdata.value = vdata.list.Ylist;
      lineXdata.value = vdata.list.Xlist;
      option2.value.xAxis.data = lineXdata.value;
      option2.value.series[0].data = lineYdata.value;
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const FunGetquestionQty = async () => {
    setLoading(true);
    try {
      const vdata: any = await GetquestionQty(formModel.value);
      allQty.value = vdata.list.all;
      unfinishQty.value = vdata.list.unfinish;
      finishQty.value = vdata.list.finish;
      // console.log(vdata.list.all);
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
  FunloadUserInfo();

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
    setLoading(true);
    try {
      errorMessage.value = '';
      FunGetpieRateData();
      FunGetquestionList();
      FunGetlineRateData();
      FunGetquestionQty();
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  search();
  const onPageChange = (current: number) => {
    vCurrent.value = current;
    paging();
  };
  function paging() {
    const current = vCurrent.value;
    const pageSize = vPagesize.value;
    // console.log(`${current}---------${pageSize}`);
    listbox.value = [];
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageList = questionList.value.slice(startIndex, endIndex);
    listbox.value = pageList;
  }

  let recordtimer: any | null = null;
  function startTimer() {
    stopTimer();
    recordtimer = setInterval(() => {
      const num = vCurrent.value + 1;
      vCurrent.value = num;
      const cot: number = Math.round(total.value / vPagesize.value);
      const aa = ref(0);
      aa.value = cot;
      if (total.value % vPagesize.value > 0) {
        aa.value = cot + 1;
      }
      if (aa.value < vCurrent.value) {
        vCurrent.value = 1;
      }
      paging();
    }, 10000);
  }
  function mousehover() {
    stopTimer();
  }
  function mouseleave() {
    console.log('898989');
    startTimer();
  }

  function stopTimer() {
    if (recordtimer) {
      console.log('585858585858588');
      clearInterval(recordtimer);
      recordtimer = null;
    }
  }
  startTimer();

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
    clearInterval(recordtimer);
    clearInterval(Now1timer);
    clearInterval(searchtimer);
    document.exitFullscreen();
  });
  option3.value = {
    title: {
      text: '原因类型',
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: 15,
      },
    },
    label: {
      formatter(data: any) {
        return `${data.name}(${data.percent.toFixed(1)}%)`;
      },
      color: '#fff',
    },
    series: [
      {
        name: '信息详情',
        type: 'pie',
        radius: '50%',
        data: piedata.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  option2.value = {
    title: {
      text: '问题趋势',
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: lineXdata.value,
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        data: lineYdata.value,
        type: 'line',
        smooth: true,
        itemStyle: { normal: { label: { show: true, color: '#fff' } } },
        lineStyle: { width: 3 },
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
    background: rgba(40, 66, 198, 0.3);
    width: 100%;
    height: 100%;
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
    // border: 1px solid gray;
    padding: 8px 0px;
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
    background: rgba(35, 28, 238, 0.3);
    height: 5vh;
  }
  .table tr:nth-child(2) {
    background: rgba(5, 127, 183, 0.3);
  }
  .table tr:nth-child(3) {
    background: rgba(149, 75, 219, 0.3);
  }
  .table tr:nth-child(4) {
    background: rgba(5, 172, 250, 0.3);
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
</style>
