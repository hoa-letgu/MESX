<template>
  <div class="">
    <dv-full-screen-container class="full" v-show="true">
      <div class="container">
        <div class="insercolor">
          <div class="container_outside">
            <!-- <Breadcrumb :items="['menu.list', 'menu.list.Kanban_device_A']" />
    <a-card class="general-card" :title="$t('menu.list.F_PERMISSION_MANGE')">
      <a-row> -->
            <a-spin
              :loading="loading"
              tip="数据加载中...(Loading data...)"
              style="width: 100%"
            >
              <div style="position: fixed; margin-left: -20px; left: 0">
                <!-- <dv-button @click="toList" border="Border5" color="green"></dv-button>
                     
                      </dv-button> -->
                <a-link @click="toList" class="button4">
                  <img
                    src="@/assets/images/back.png"
                    style="width: 40px; margin-left: 20px"
                    @click="toList"
                  />
                </a-link>
                <div style="left: 0; top: 0; color: red; margin-left: 360px">{{
                  errorMessage
                }}</div>
              </div>
              <div class="" style="margin: 0 20px">
                <div class="left-side">
                  <div class="panel" style="margin: -0.8vh 0vh">
                    <h1 class="tit"
                      ><img
                        src="@/assets/images/logo.png"
                        style="height: 5vh; width: 70px; margin: -1vh 0"
                      />{{ $t('menu.Level_Meeting.First_Meeting') }}</h1
                    >
                  </div>

                  <!-- <div style="color: red">{{ errorMessage }}</div> -->
                  <div class="grid-demo-background">
                    <a-space
                      direction="vertical"
                      :size="16"
                      style="display: block"
                    >
                      <a-row class="grid-demo">
                        <!-- //第一列 -->
                        <a-col :span="4.5">
                          <div class="one">
                            <div
                              style="
                                text-align: left;
                                margin: -5px 45px;
                                height: 30px;
                              "
                            >
                              <button
                                id="SearchToday"
                                class="button button2"
                                @click="SearchToday"
                                >今天</button
                              >
                              <button
                                id="SearchYesToday"
                                class="button button1"
                                @click="SearchYesToday"
                                >昨天</button
                              >&nbsp;&nbsp;
                            </div>
                            <div
                              style="
                                text-align: left;
                                margin: 2px 45px;
                                height: 30px;
                              "
                            >
                              <label
                                class="text"
                                style="
                                  color: #2f2531;
                                  font-size: 50px;
                                  margin: -20px;
                                "
                                >●</label
                              >
                              <label
                                style="
                                  color: #33ccff;
                                  font-size: 35px;
                                  margin: 20px;
                                "
                                >基础信息</label
                              >
                            </div>
                            <div class="one_top" style="margin: 28px 10px">
                              <a-card class="card-demo boder margin_10">
                                <table
                                  class="table1"
                                  style="
                                    width: 100%;
                                    height: 80%;
                                    border-collapse: collapse;
                                  "
                                >
                                  <tr style="width: 100%; height: 20%">
                                    <td
                                      style="
                                        width: 100%;
                                        border: 1px solid rgb(120, 120, 233);
                                        font-size: 23px;
                                        color: white;
                                      "
                                      colspan="4"
                                    >
                                      组别 ：{{ GroupName }}</td
                                    >
                                  </tr>
                                  <tr style="width: 100%; height: 20%">
                                    <td
                                      style="
                                        width: 100%;
                                        border: 1px solid rgb(120, 120, 233);
                                        font-size: 26px;
                                        color: white;
                                      "
                                      colspan="4"
                                    >
                                      {{ searchDates }}</td
                                    >
                                  </tr>
                                  <tr style="width: 100%; height: 20%">
                                    <td colspan="2">
                                      <div
                                        style="
                                          font-size: 22px;
                                          margin-bottom: -8px;
                                        "
                                        >{{ Czg }}</div
                                      ><br /><br />操作工</td
                                    >
                                    <td colspan="2">
                                      <div
                                        style="
                                          font-size: 22px;
                                          margin-bottom: -8px;
                                        "
                                        >{{ Szz }}</div
                                      ><br /><br />水蜘蛛</td
                                    >
                                  </tr>
                                  <tr style="width: 100%; height: 20%">
                                    <td colspan="2">
                                      <div
                                        style="
                                          font-size: 22px;
                                          margin-bottom: -8px;
                                        "
                                        >{{ TT }}</div
                                      ><br /><br />TT</td
                                    >
                                    <td colspan="2">
                                      <div
                                        style="
                                          font-size: 22px;
                                          margin-bottom: -8px;
                                        "
                                        >{{ TAaccepted }}</div
                                      ><br /><br />提案采纳</td
                                    >
                                  </tr>
                                </table>
                                <a-carousel
                                  style="
                                    height: 20%;
                                    width: 100%;
                                    border: 1px solid rgb(120, 120, 233);
                                    border-top: none;
                                  "
                                  :auto-play="{ interval: 5000 }"
                                  indicator-type="dot"
                                  show-arrow="hover"
                                >
                                  <a-carousel-item
                                    v-for="item in ART"
                                    :key="item.NAME_T"
                                  >
                                    <div class="lunbotu-out">
                                      <table class="lunbotu-in">
                                        <tr>
                                          <td
                                            class="lunbotu-in"
                                            style="
                                              border-right: 1px dashed
                                                greenyellow;
                                              background-color: #072831;
                                            "
                                          >
                                            <P>{{ item.NAME_T }}</P>
                                            <P> 鞋型名称</P>
                                          </td>
                                          <td
                                            class="lunbotu-in"
                                            style="background-color: #072831"
                                          >
                                            <P> {{ item.UDF01 }}</P>
                                            <P>IE THT</P>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </a-carousel-item>
                                </a-carousel>
                              </a-card>
                            </div>
                            <div class="one_bottom" style="margin: -1vh 10px">
                              <a-card
                                class="card-demo boder margin_10"
                                style="background-color: black"
                              >
                                <img
                                  src="@/assets/images/ad1.png"
                                  style="height: 280px; width: 300px"
                                  @click="linkToIssueTracking()"
                                />
                              </a-card>
                            </div>
                          </div>
                        </a-col>
                        <!-- //第二列 -->
                        <a-col :span="15">
                          <div class="two" style="margin: 16px 15px">
                            <div
                              style="
                                text-align: left;
                                margin: 1.5px 30px;
                                height: 30px;
                              "
                            >
                              <label
                                class="text"
                                style="
                                  color: #2f2531;
                                  font-size: 50px;
                                  margin: -50px;
                                "
                                >●</label
                              >
                              <label
                                style="
                                  color: #33ccff;
                                  font-size: 35px;
                                  margin: 50px;
                                "
                                >生产指标信息</label
                              >
                              <div
                                style="
                                  width: 290px;
                                  text-align: left;
                                  position: fixed;
                                  top: 0;
                                  right: 0;
                                  margin: 70px 30px 0 0;
                                "
                                ><h2 class="time">{{ timeNow }}</h2>
                              </div>
                            </div>
                            <div
                              class="card_content"
                              style="margin: 30px 10px; margin-left: -14px"
                            >
                              <div style="display: flex">
                                <div style="flex: 2">
                                  <div
                                    class="bg"
                                    style="
                                      height: 15vh;
                                      width: 95%;
                                      margin: 5px 5px;
                                    "
                                  >
                                    <div>
                                      <a-statistic
                                        title=""
                                        :value="WORKQTY"
                                        :precision="0"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                      ></a-statistic>
                                      <h2>目标产量</h2>
                                    </div>
                                  </div>
                                  <div
                                    class="bg"
                                    style="
                                      height: 15vh;
                                      width: 95%;
                                      margin: 5px 5px;
                                    "
                                  >
                                    <div>
                                      <a-statistic
                                        title=""
                                        :value="FINISHQTY"
                                        :precision="0"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                      ></a-statistic>
                                      <h2>实际产量</h2>
                                    </div>
                                  </div>
                                </div>
                                <div style="flex: 7">
                                  <div
                                    class="bg"
                                    style="
                                      height: 30.5vh;
                                      width: 99%;
                                      margin: 5px 5px;
                                    "
                                  >
                                    <div>
                                      <VCharts
                                        :option="option1"
                                        style="
                                          height: 30vh;
                                          width: 100%;
                                          padding-top: 5vh;
                                        "
                                      ></VCharts
                                    ></div>
                                  </div>
                                </div>
                              </div>

                              <div style="display: flex">
                                <div style="flex: 3">
                                  <div
                                    class="bg"
                                    style="
                                      height: 23vh;
                                      width: 95%;
                                      margin: -10px 5px;
                                    "
                                  >
                                    <waterCircle
                                      :value="LinePassRate"
                                      title="产线总合格率"
                                    ></waterCircle>
                                  </div>
                                </div>
                                <div style="flex: 4">
                                  <div
                                    class="bg"
                                    style="
                                      height: 23vh;
                                      width: 95%;
                                      margin: 20px auto;
                                    "
                                  >
                                    <div>
                                      <!-- <h2 style="padding-top: 10px">不良Top3</h2> -->
                                      <VCharts
                                        :option="option2"
                                        style="
                                          height: 20vh;
                                          width: 93%;
                                          padding-top: 1vh;
                                          margin: 0px auto；;
                                        "
                                      ></VCharts>
                                    </div>
                                  </div>
                                </div>
                                <div style="flex: 3">
                                  <div
                                    class="bg"
                                    style="
                                      height: 23vh;
                                      width: 98%;
                                      margin: 20px auto;
                                    "
                                  >
                                    <h2 style="padding-top: 10px">IE达成率</h2>
                                    <VCharts
                                      :option="option3"
                                      style="
                                        height: 32vh;
                                        width: 100%;
                                        margin: -8vh 0vh; ;
                                      "
                                    ></VCharts>
                                    <!-- <Chart  :option="option3"  style=" margin: -20vh,0; height:30vh"/> -->
                                  </div>
                                </div>
                              </div>

                              <div style="display: flex">
                                <div style="flex: 6">
                                  <div
                                    class="bg"
                                    style="
                                      height: 24.8vh;
                                      width: 99%;
                                      margin: 0px auto;
                                    "
                                  >
                                    <div>
                                      <!-- <h2 style="padding-top: 10px">IE达成率</h2> -->
                                      <VCharts
                                        :option="option5"
                                        style="
                                          height: 24vh;
                                          width: 100%;
                                          padding-top: 1vh;
                                        "
                                      ></VCharts>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a-col>
                        <!-- //第三列 -->
                        <a-col :span="4">
                          <div class="tip">
                            <!-- 公告栏 -->

                            <div demo-bg>
                              <dv-border-box7
                                :color="['blue', 'gold']"
                                :reverse="true"
                              >
                                <div dv-bg>
                                  <div small-bg>
                                    <marquee
                                      id="m1"
                                      direction="left"
                                      vspace="1"
                                      hspace="1"
                                      scrollamount="5"
                                      class="hh"
                                      >{{
                                        Notice == ''
                                          ? 'loading................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................'
                                          : Notice
                                      }}</marquee
                                    >
                                  </div>
                                </div>
                              </dv-border-box7>
                            </div>
                            <div
                              style="float: right"
                              v-show="bofang"
                              @click="FunIsbofang()"
                              ><icon-pause-circle-fill
                                :style="{ fontSize: '32px' }"
                                onclick="m1.stop();"
                            /></div>
                            <div
                              style="float: right"
                              v-show="!bofang"
                              @click="FunIsbofang()"
                              ><icon-play-circle-fill
                                id="statrmq"
                                :style="{ fontSize: '32px' }"
                                onclick="m1.start();"
                            /></div>
                          </div>
                          <div class="three" style="margin: 88px 0vh">
                            <div class="three_top boder">
                              <div
                                class="bg3"
                                style="height: 30vh; padding-top: 0.5vh"
                              >
                                <div>
                                  <VCharts
                                    :option="option6"
                                    style="
                                      height: 28vh;
                                      width: 80%;

                                      margin: 0px auto;
                                    "
                                  ></VCharts>
                                </div>
                              </div>
                            </div>
                            <div class="three_bottom boder"
                              ><div
                                class="bg3"
                                style="height: 25.7vh; margin-top: 1.5vh"
                              >
                                <VCharts
                                  :option="option7"
                                  style="
                                    height: 26vh;
                                    width: 100%;
                                    padding-top: 1vh;
                                    margin: 0px auto;
                                  "
                                ></VCharts>
                              </div>
                            </div>
                            <div class="three_bottom boder"
                              ><div
                                class="bg3"
                                style="height: 25.7vh; margin-top: 1.5vh"
                              >
                                <VCharts
                                  :option="option8"
                                  style="
                                    height: 24vh;
                                    width: 80%;
                                    padding-top: 1vh;
                                    margin: 0px auto;
                                  "
                                ></VCharts>
                              </div>
                            </div>
                          </div>
                        </a-col>
                      </a-row>
                    </a-space>
                  </div>
                </div>
              </div>
              <!-- </a-row>
    </a-card> -->
            </a-spin>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, reactive, onBeforeMount } from 'vue';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';
  import { Getorg } from '@/api/kanbandevicea';
  import VCharts from 'vue-echarts';
  // import { useI18n } from 'vue-i18n';
  import useUserStore from '@/store/modules/user/index';
  import router from '@/router';
  import {
    GetDepartmentNameByUserId,
    GetCzgAndSzz,
    GetTT,
    GetTAaccepted,
    GetIETHTList,
    GetWORKQTY,
    GetFINISHQTY,
    GetMonthWORKQTY,
    GetBadTOP3,
    GetIERATE,
    GetDNGData,
    GetWorkHourRecords,
    GetHourlyProduction,
    GetLineBalance,
    GetLinePassRate,
    GetNoticeList,
  } from '@/api/LevelMeeting';
  import { Alert } from '@arco-design/web-vue';
  import waterCircle from './components/waterCircle.vue';

  const userStore = useUserStore();
  const generateFormModel = () => {
    return {
      selectorg: '1001',
      selectdate: ['2023-05-01', '2023-05-09'],
    };
  };
  const { loading } = useLoading();
  const orgList = ref<any>([]);
  const formModel = ref(generateFormModel());
  const localdate = ref<any>([]);
  const timeNow = ref('');
  const option1 = ref<any>([]);
  const option2 = ref<any>([]);
  const option3 = ref<any>([]);
  const option4 = ref<any>([]);
  const option5 = ref<any>([]);
  const option6 = ref<any>([]);
  const option7 = ref<any>([]);
  const option8 = ref<any>([]);
  const searchDate = ref<any>([]);
  const searchDates = ref<any>([]);
  const GroupName = ref<any>([]);
  const Czg = ref<any>([]);
  const Szz = ref<any>([]);
  const TT = ref<any>([]);
  const TAaccepted = ref<any>([]);
  const WORKQTY = ref<any>([]);
  const FINISHQTY = ref<any>([]);
  const MonthWORKQTY = ref<any>([]);
  const MonthFINISHQTY = ref<any>([]);
  const BadName = ref<any>([]);
  const BadQty = ref<any>([]);
  const IERATE = ref<any>([]);
  const DNG = ref<any>([]);
  const WorkHour = ref<any>([]);
  const WorkHourName = ref<any>([]);
  const HourS = ref<any>([]);
  const THourlyProduction = ref<any>([]);
  const FHourlyProduction = ref<any>([]);
  const LineBalanceT = ref<any>([]);
  const LineBalanceF = ref<any>([]);
  const ART = ref<any>([]);
  const bofang = ref(true);
  const Notice = ref('');
  const LinePassRate = ref<any>([]);

  // ART.value = [
  //   { ART_NAME: 'DROP STEP LOW(6)', THT: 1651.2 },
  //   { ART_NAME: 'DROP STEP LOW(6)', THT: 1651.2 },
  // ];

  const errorMessage = ref('');

  const timer2 = setInterval(() => {
    // timeNow.value = new Date().toString();
    const year1 = new Date().getFullYear();
    const Month1 = new Date().getMonth() + 1;
    const day1 = new Date().getDate();
    const Hour1 =
      new Date().getHours().toLocaleString().length > 1
        ? new Date().getHours()
        : `${new Date().getHours()}`;
    const Minute1 =
      new Date().getMinutes().toLocaleString().length > 1
        ? new Date().getMinutes()
        : `0${new Date().getMinutes()}`;
    const Second1 =
      new Date().getSeconds().toLocaleString().length > 1
        ? new Date().getSeconds()
        : `0${new Date().getSeconds()}`;
    timeNow.value = `${year1}年${Month1}月${day1}日 ${Hour1}:${Minute1}:${Second1}`;
  }, 1000);

  const timenow = new Date();
  const yyyy = timenow.getFullYear();
  const m = timenow.getMonth() + 1;
  const mm = m < 10 ? `0${m}` : m;
  const d = timenow.getDate();
  const dd = d < 10 ? `0${d}` : d;
  const today = `${yyyy}/${mm}/${dd}`;
  const todays = `${yyyy}年${mm}月${dd}日`;

  const timenow2 = new Date();
  timenow2.setDate(timenow2.getDate() - 1);
  const yyyy2 = timenow2.getFullYear();
  const m2 = timenow2.getMonth() + 1;
  const mm2 = m2 < 10 ? `0${m2}` : m2;
  const d2 = timenow2.getDate();
  const dd2 = d2 < 10 ? `0${d2}` : d2;
  const yesterday = `${yyyy2}/${mm2}/${dd2}`;
  const yesterdays = `${yyyy2}年${mm2}月${dd2}日`;

  searchDate.value = yesterday;
  searchDates.value = yesterdays;

  const element = document.documentElement;
  element.requestFullscreen();

  onMounted(() => {
    // 读取缓存数据
    const getLocalorg = window.sessionStorage.getItem('org_code');
    const getLocaldate = window.sessionStorage.getItem('selectdate');
    console.log(getLocaldate);
    if (getLocalorg != null && getLocaldate != null) {
      formModel.value.selectorg = getLocalorg;
      localdate.value = JSON.parse(getLocaldate);
      formModel.value.selectdate = localdate.value;
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
      formModel.value.selectdate = range.value;
      // console.log(range);
    }
  });

  onMounted(async () => {
    search2();
    search();
  });

  let timerlist: any = 1;
  timerlist = window.setInterval(() => {
    console.log('定时器。');
    // window.clearInterval(timerlist);
    search();
  }, 30000);

  const getorglist = async () => {
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  };
  getorglist();
  function setLocal() {
    // 缓存条件在浏览器
    window.sessionStorage.setItem('org_code', formModel.value.selectorg);
    window.sessionStorage.setItem(
      'selectdate',
      JSON.stringify(formModel.value.selectdate)
    );
  }
  const { setLoading } = useLoading();
  const search = async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      setLocal();

      const departmentData = await GetDepartmentNameByUserId();
      GroupName.value = departmentData.list[0].GROUP_NAME;

      const CzgAndSzzData = await GetCzgAndSzz(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      if (CzgAndSzzData != null && CzgAndSzzData.list.length > 0) {
        Czg.value = CzgAndSzzData.list[0].CZG;
        Szz.value = CzgAndSzzData.list[0].SZZ;
        // console.log(Czg.value);
      } else {
        Czg.value = 0;
        Szz.value = 0;
      }

      const TTData = await GetTT(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      TT.value = TTData.TT;

      const acceptedData = await GetTAaccepted(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      TAaccepted.value = acceptedData.TAaccepted;

      const ARTData: any = await GetIETHTList(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(ARTData.list);
      ART.value = ARTData.list;
      // option7.value.series[0].data = DNG.value;

      const MonthWORKQTYData: any = await GetMonthWORKQTY(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(MonthWORKQTYData.list.Ylist1);
      // console.log(MonthWORKQTYData.list.Ylist2);
      MonthWORKQTY.value = MonthWORKQTYData.list.Ylist1;
      option6.value.series[0].data = MonthWORKQTY.value;
      MonthFINISHQTY.value = MonthWORKQTYData.list.Ylist2;
      option6.value.series[1].data = MonthFINISHQTY.value;

      const LinePassRateData: any = await GetLinePassRate(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(LinePassRateData.LinePassRate);
      LinePassRate.value = LinePassRateData.LinePassRate;

      const BadTOP3Data: any = await GetBadTOP3(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(BadTOP3Data.list.Xlist);
      // console.log(BadTOP3Data.list.Ylist);
      BadName.value = BadTOP3Data.list.Ylist;
      option2.value.yAxis.data = BadName.value;
      BadQty.value = BadTOP3Data.list.Xlist;
      option2.value.series[0].data = BadQty.value;

      const IERATEData = await GetIERATE(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      IERATE.value = IERATEData.IERATE;

      const DNGData: any = await GetDNGData(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(DNGData.list);
      DNG.value = DNGData.list;
      option7.value.series[0].data = DNG.value;

      const WorkHourRecordsData: any = await GetWorkHourRecords(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(WorkHourRecordsData.list.Xlist);
      // console.log(WorkHourRecordsData.list.Ylist);
      WorkHourName.value = WorkHourRecordsData.list.Xlist;
      WorkHour.value = WorkHourRecordsData.list.Ylist;
      option5.value.xAxis.data = WorkHourName.value;
      option5.value.series[0].data = WorkHour.value;

      const HourlyProductionData: any = await GetHourlyProduction(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(HourlyProductionData.list.Xlist);
      // console.log(HourlyProductionData.list.Ylist1);
      HourS.value = HourlyProductionData.list.Xlist;
      FHourlyProduction.value = HourlyProductionData.list.Ylist1;
      THourlyProduction.value = HourlyProductionData.list.Ylist2;
      option1.value.xAxis.data = HourS.value;
      option1.value.series[0].data = THourlyProduction.value;
      option1.value.series[1].data = FHourlyProduction.value;

      const LineBalanceData: any = await GetLineBalance(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      // console.log(LineBalanceData.list.Ylist1);
      // console.log(LineBalanceData.list.Ylist2);
      LineBalanceT.value = LineBalanceData.list.Ylist1;
      LineBalanceF.value = LineBalanceData.list.Ylist2;
      option8.value.series[0].data = LineBalanceT.value;
      option8.value.series[1].data = LineBalanceF.value;

      const WORKQTYData = await GetWORKQTY(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      WORKQTY.value = parseFloat(WORKQTYData.WORKQTY);

      const FINISHQTYData = await GetFINISHQTY(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      FINISHQTY.value = parseFloat(FINISHQTYData.FINISHQTY);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search2 = async () => {
    setLoading(true);
    try {
      setLocal();
      const departmentData = await GetDepartmentNameByUserId();
      const NoticeData: any = await GetNoticeList(
        departmentData.list[0].STAFF_DEPARTMENT,
        searchDate.value
      );
      console.log('88888888888888888888888888888888');
      console.log(NoticeData);
      Notice.value = NoticeData.list;
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  function FunIsbofang() {
    // console.log('123456');
    bofang.value = !bofang.value;
    // console.log(bofang.value);
  }

  // 组件卸载时，清除定时器
  onUnmounted(() => {
    window.clearInterval(timerlist);
    window.clearInterval(timer2);
  });
  option1.value = {
    title: {
      text: '每小时生产信息',
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
      left: 'left',
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: HourS.value,
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
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
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
    series: [
      {
        name: '每小时平均目标产量',
        type: 'line',
        data: THourlyProduction.value,
        itemStyle: {
          normal: { label: { show: true, color: '#00d3ee' } },
        },
        showSymbol: false,
        endLabel: {
          show: true,
          fontSize: 18,
          color: '#00d3ee',
        },
        lineStyle: { width: 2, type: 'dotted', color: '#00d3ee' },
      },
      {
        name: '实际产量',
        type: 'line',
        smooth: true,
        data: FHourlyProduction.value,
        itemStyle: {
          normal: { label: { show: true, color: 'greenyellow', distance: 10 } },
        },
        lineStyle: { width: 2 },
      },
    ],
  };
  option2.value = {
    title: {
      text: '不良TOP3',
      left: 'center',
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
    legend: {
      show: false,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: BadName.value,
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: BadQty.value,
        itemStyle: {
          normal: {
            color: (params: any) => {
              // 某一个数据项的颜色。
              const colorList = ['#FF6600', '#FF66CC', '#FF0000'];
              return colorList[params.dataIndex];
            },
          },
        },
        label: {
          show: true,
        },
      },
    ],
  };
  option3.value = {
    title: {
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
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
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          rotate: 'tangential',
          show: false,
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
        },
        detail: {
          fontSize: 40,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter(value: any) {
            return `${Math.round(value * 100)}`;
          },
          color: 'inherit',
        },
        data: [
          {
            value: IERATE,
          },
        ],
      },
    ],
  };

  option5.value = {
    title: {
      text: '工时记录',
      left: 'center',
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
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: WorkHourName,
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
        type: 'bar',
        barWidth: '60%',
        data: WorkHour.value,
        color: '#00d3ee',
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
    ],
  };
  option6.value = {
    title: {
      text: '月产量',
      left: 'center',
      textStyle: {
        color: '#fff',
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
        data: [''],
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
        data: MonthWORKQTY.value,
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
      {
        name: '实际',
        type: 'bar',
        barWidth: '30%',
        data: MonthFINISHQTY.value,
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
    ],
  };

  option7.value = {
    title: {
      text: '多能工',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: 'item',
    },

    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
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
        data: DNG.value,
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
                  params.percent === undefined ? 0 : params.percent
                }%)`;
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

  option8.value = {
    title: {
      text: '线平衡',
      left: 'center',
      textStyle: {
        color: '#fff',
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
        data: [''],
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
        data: LineBalanceT.value,
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
      {
        name: '实际',
        type: 'bar',
        barWidth: '30%',
        data: LineBalanceF.value,
        itemStyle: {
          normal: { label: { show: true, color: '#fff', position: 'top' } },
        },
      },
    ],
  };

  function SearchToday() {
    const btnSearchYesToday = document.getElementById(
      'SearchYesToday'
    ) as HTMLButtonElement;
    btnSearchYesToday.className = 'button  button2';
    const btnSearchToday = document.getElementById(
      'SearchToday'
    ) as HTMLButtonElement;
    btnSearchToday.className = 'button  button1';
    searchDate.value = today;
    searchDates.value = todays;
    search();
  }

  function SearchYesToday() {
    const btnSearchYesToday = document.getElementById(
      'SearchYesToday'
    ) as HTMLButtonElement;
    btnSearchYesToday.className = 'button  button1';
    const btnSearchToday = document.getElementById(
      'SearchToday'
    ) as HTMLButtonElement;
    btnSearchToday.className = 'button  button2';
    searchDate.value = yesterday;
    searchDates.value = yesterdays;
    search();
  }

  function linkToIssueTracking() {
    router.push({
      path: '../production_management/IssueTrackingDashboard',
    });
  }

  function toList() {
    document.exitFullscreen();
    console.log('进入了主页');
    router.push({
      name: 'Workplace',
      query: {
        // selectdate: formModel.value.selectdate,
        // selectorg: formModel.value.selectorg,
      },
    });
  }
</script>

<script lang="ts">
  export default {
    name: 'KanbanDeviceA',
  };
</script>

<style lang="less" scoped>
  h1 {
    color: white;
  }
  .margin_10 {
    margin: 10px;
  }
  .txt_center {
    text-align: center;
  }
  .container {
    background-size: cover;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/images/pageBg.png');
  }
  .bg,
  .bg3 {
    background: rgba(0, 0, 0, 0.1);
  }
  .container_outside {
    background-image: url('@/assets/images/bgmain.png');
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .insercolor {
    background: rgba(17, 120, 128, 0.301);
    width: 100%;
    height: 100%;
  }
  .two .card_content {
    background: #0000ff00;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  ::v-deep .arco-card {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
    border: none;
    background: rgba(96, 191, 243, 0.1);
  }
  ::v-deep .arco-card-header {
    // color: white;
    border: none;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .tit {
    text-align: center;
    padding-top: 20px;
    // color: rgb(247, 133, 34);
    padding-bottom: 10px;
    width: 300px;
    margin: 0px auto;
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
  .card-demo {
    margin-left: 24px;
    transition-property: all;
  }
  .grid-demo .arco-col {
    text-align: center;
  }
  .grid-demo-background {
    margin-top: 10px;
  }

  a-link {
    display: block;
    height: 100%;
    line-height: 100%;
    text-align: right;
  }

  ::v-deep .one .arco-card-size-medium .arco-card-body {
    background-size: cover;
    border: none;
  }

  ::v-deep .arco-card-header-title {
    color: white;
    font-size: 22px;
  }
  .one_top {
    margin-top: 60px;
  }
  .one_top .table1 td {
    width: 50%;
    border: 1px solid rgb(120, 120, 233);
    font-size: 15px;
    color: white;
  }
  .three {
    // margin-top: 10px;
    // border: 1px solid red;
  }
  ::v-deep .one .one_top .arco-card-size-medium .arco-card-body {
    height: 50vh;
  }
  ::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
    height: 31.5vh;
  }
  ::v-deep .three .arco-card-size-medium .arco-card-body {
    // background-image: url('@/assets/images/bg.png');
    background-size: cover;
    height: 21.8vh;
  }

  .one .card_content {
    height: 95%;
    text-align: center;
    margin: 0px auto;
  }
  .one .card_content div {
    text-align: center;
    margin: 0px auto;
    margin-left: 13px;
    margin-top: 5px;
  }
  .two .card_content {
    height: 83.5vh;
    // background-color: rgb(251, 249, 249);
    overflow: hidden;
    color: white;
    margin-top: 10px;
  }
  ::v-deep .arco-table-body {
    background-color: transparent;
  }
  ::v-deep .arco-table-td {
    // border: 1px solid red;
    overflow: hidden;
    font-size: 13px;
    background-color: transparent;
    color: white;
  }
  ::v-deep .arco-table-tr {
    height: 45px;
    overflow: hidden;
    white-space: nowrap;
  }
  ::v-deep .arco-table-header {
    background-color: transparent;
  }
  ::v-deep .arco-table-border .arco-table-container {
    border: none;
  }
  ::v-deep .arco-table-th {
    white-space: normal;
    background-color: transparent;
    color: white;
  }

  ::v-deep .arco-table-tr:hover {
    white-space: normal;
  }
  ::v-deep .arco-table-tr:hover td {
    color: black;
    border-color: blue;
  }
  ::v-deep .arco-pagination-item {
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
  .box-shadow-4 {
    box-shadow: rgb(82, 150, 246) 0px 0px 10px inset;
    border-radius: 20px;
    // background: rgba(55, 55, 200, 0.2);
  }
  ::v-deep .arco-link {
    color: rgb(164, 164, 156);
  }
  ::v-deep .arco-btn-primary,
  .arco-btn-primary[type='button'],
  .arco-btn-primary[type='submit'] {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 5px;
  }
  ::v-deep .arco-picker {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 5px;
  }
  ::v-deep .arco-select-view-single {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    color: white;
    border-radius: 5px;
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
  }
  .lunbotu-out {
    display: flex;
    height: 100%;
    width: 100%;
    // border: 1px solid greenyellow;
  }
  .lunbotu-in {
    flex: 1;
    width: 50%;
    height: 100%;
    text-align: center;
    color: white;
    list-style: none;
    margin-top: -1px;
    // border: 1px dashed greenyellow;
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
  .time {
    position: relative;
    color: transparent;
    // font-style: italic;
    // font-weight: 900;
    // letter-spacing: 0.1vw;
    background: linear-gradient(183deg, #fff 35%, #3fb4ff);
    background-clip: text;
    -webkit-background-clip: text;
  }
  .button {
    background: rgba(17, 120, 128, 0.301);
    border-radius: 6px;
    width: 100px;
    height: 34px;
    // margin-top: 7px;
    position: relative;
    border: none;
    font-size: 16px;
    color: #ffffff;
    padding: 8px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    margin-right: 1px;
  }

  .button:after {
    content: '';
    background-color: rgb(70, 153, 204);
    background: #90ee90;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.2s;
  }

  .button:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
  .button1 {
    // background: rgba(243, 244, 244, 0.5);
    // margin-left: 2px;
    background-color: rgb(70, 153, 204);
    border: none;
    // color: black;
    // border: 1px solid #d0c4c4;
  }

  .button1:hover {
    background-color: rgb(70, 153, 204);
    border: none;
    // background-color: #4caf50;
    // box-shadow: rgb(255, 255, 255) 0px 0px 5px inset;
    // color: white;
  }

  .button2 {
    background: rgba(17, 120, 128, 0.301);
    border: none;
    // background-color: #e4d9d9;
    // color: black;
    // border: 1px solid #f4f3f3;
  }

  .button2:hover {
    border: none;
    background-color: rgb(70, 153, 204);
    // color: white;
  }
  .button4 {
    background-color: rgba(96, 191, 243, 0.1);
    color: black;
  }

  .button4:hover {
    background-color: transparent;
    color: white;
  }
  .tip {
    width: 140%;
    height: 7vh;
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: center;
    // background-color: #594b09;
    margin: -4.1vh -10vh;
    color: rgb(255, 255, 255);
    font-size: 22px;
  }
  .text {
    font-size: 1.8rem;
    color: black;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
      1px 1px 0 white;
  }
  ::v-deep .arco-statistic-content .arco-statistic-value-integer {
    font-size: 45px;
    color: white;
  }
  .boder {
    background-color: transparent;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    color: white;
    border-radius: 5px;
  }

  .waterQualitySpan {
    display: inline-block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  .targetNum {
    color: #12f4ff;
    font-size: 30px;
  }
  .hh {
    animation: blinker 5s linear infinite;
  }

  @keyframes blinker {
    // 50% {
    //   color: pink;
    // }
    // 60% {
    //   color: gold;
    // }
  }
  .boder:hover {
    background-color: transparent;
    box-shadow: rgb(255, 255, 255) 0px 0px 10px;
    color: white;
    border-radius: 10px;
  }
  .bg:hover {
    background-color: transparent;
    box-shadow: rgb(255, 255, 255) 0px 0px 10px inset;
    color: white;
    border-radius: 8px;
  }
  .two .card_content:hover {
    background-color: transparent;
    box-shadow: transparent 0px 0px 10px inset;
    color: white;
    border-radius: 8px;
  }
</style>
