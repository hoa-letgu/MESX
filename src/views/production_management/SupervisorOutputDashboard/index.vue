<template>
  <div class="" >
    <dv-full-screen-container class="full" v-show="true" >
      <VScaleScreen
   width="1920"
   height="1080"
   :full-screen="true"
   >
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
                <div style="left: 0; top: 0; color: red; margin-left: 360px; margin-top: -20px; font-size: 20px;">{{
                  errorMessage
                }}</div>
              </div>
              <div class="" style="margin: 0 20px;">
                <div class="left-side">
                  <div class="panel" style="margin: -0.8vh 0vh">
                    <h1 class="tit"
                      >姓名：{{ SupervisorName}}     &nbsp; &nbsp;职务：{{ SupervisorPost }}</h1
                    >
                  </div>
                     <div
                              style="
                                text-align: left;
                                margin: 1.5px 30px;
                                height: 30px;
                              "
                            >
                              <div
                                style="
                                  width: 380px;
                                  text-align: left;
                                  position: fixed;
                                  top: 0;
                                  right: 0;
                                  margin: 10px 30px 0 0;
                                "
                                ><h2 class="time" >{{ timeNow }}</h2>
                              
                                <a-link @click="full" class="button4"  style="position: fixed;right: 0; top: 0; ">
                  <img
                    src="@/assets/images/full.png"
                    style="width: 40px;  "
                    @click="full"
                  />
                </a-link>
                              </div>
                            </div>
                  <!-- <div style="color: red">{{ errorMessage }}</div> -->
                  <div class="grid-demo-background">
                    <a-space
                      direction="vertical"
                      :size="16"
                      style="display: block"
                    >
                 
                              <div class="row text-inputs" style="margin-left: 2vh;"
                                >
                                <span style="color: white">日期：</span
                                ><a-date-picker
                                  v-model="formModel.startdate"
                                  style="width: 220px"
                                  value-format="YYYY/MM/DD"
                                  @change="searchBystartdate"
                              />
                              <span style="color: white">&nbsp;至&nbsp;</span
                                ><a-date-picker
                                  v-model="formModel.enddate"
                                  style="width: 220px"
                                  value-format="YYYY/MM/DD"
                                  @change="searchByenddate"
                              />&nbsp;&nbsp; &nbsp;
                                <span style="color: white">员工号：</span>

                                
                                <a-input
                                  v-model="formModel.UserCode"
                                  :style="{ width: '100px' }"
                                  allow-clear
                                />&nbsp; &nbsp;
                                <span style="color: white">制程：</span>
                                <a-select
                                  v-model="formModel.PROCESS_NO"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 100px"
                                  @change="searchByPROCESS"
                                >
                                  <a-option
                                    v-for="item in PROCESSList"
                                    :key="item.PROCESS_NO"
                                    :value="item.PROCESS_NO"
                                    >{{ item.PROCESS_NAME }}</a-option
                                  >
                                </a-select>&nbsp;&nbsp; &nbsp;&nbsp; 
                                <button id="search" @click="search"  class="button  button2">查询</button> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
                                <button id="searchByYear" @click="searchByYear"  class="button  button2">年</button> &nbsp;&nbsp; 
                                <button id="searchBySeason" @click="searchBySeason"  class="button  button2">季度</button> &nbsp;&nbsp; 
                                <button id="searchByMonth" @click="searchByMonth"  class="button  button2">月</button> &nbsp;&nbsp; 
                                <button id="searchByWeek" @click="searchByWeek"  class="button  button2">星期</button> &nbsp;&nbsp; 
                                <button id="searchByDay" @click="searchByDay"  class="button  button3">日</button> &nbsp;&nbsp; 
                                <button id="searchOutput" @click="searchOutput"  class="button  button3">产量</button> &nbsp;&nbsp; 
                                <button id="searchRate" @click="searchRate"  class="button  button2">达成率</button> 
                               
                             </div>
                      <a-row class="grid-demo" style="margin: -30px 0vh;">
                        <!-- //第一列 -->
                        <a-col :span="24">
                          
                          <div class="one">
                        
                            <div class="one_top" style="margin: 27px 0px">
                              <a-card class="card-demo boder margin_10" >
                                <div style="margin: -40px 0px; " v-if="SupervisorOutputShow">
                                      <VCharts 
                                        :option="option1"
                                        style="
                                          height: 470px;
                                          width: 2000px;
                                          padding-top: 40px;
                                          margin-left: -90px;
                                        "
                                    @click="ClickSupervisorTime"  
                                      ></VCharts>
                                </div>
                                <div style="margin: -40px 0px;  " v-if="SupervisorRateShow">
                                      <VCharts 
                                        :option="option1R"
                                        style="
                                          height: 470px;
                                          width: 2000PX;
                                          padding-top: 40px;
                                          margin-left: -90px;
                                        "
                                   @click="ClickSupervisorTime"  
                                      ></VCharts>
                                    </div>
                              </a-card>
                            </div>
                            <div class="one_bottom" style="margin: -1vh 0px">
                              <a-card
                                class="card-demo boder margin_10">
                                <div style="margin: -40px 0px; "  v-if="GroupOutputShow">
                                      <VCharts
                                        :option="option2"
                                        style="
                                          height: 440px;
                                          width: 2000px;
                                          padding-top: 40px;
                                          margin-left: -90px;
                                        "
                                      ></VCharts
                                    ></div>
                                    <div style="margin: -40px 0px;  " v-if="GroupRateShow">
                                      <VCharts
                                        :option="option2R"
                                        style="
                                          height: 440px;
                                          width: 2000px;
                                          padding-top: 40px;
                                          margin-left: -90px;
                                        "
                                      ></VCharts
                                    ></div>
                              </a-card>
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
      </VScaleScreen>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, reactive, onBeforeMount } from 'vue';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';
  import { Getorg } from '@/api/kanbandevicea';
  import VCharts from 'vue-echarts';
  import * as FileSaver from 'file-saver';
  import * as XLSX from 'xlsx';
  // import { useI18n } from 'vue-i18n';
  import useUserStore from '@/store/modules/user/index';
  import router from '@/router';
  import { init, SetOptionOpts } from 'echarts/core';

  import {
    GetProcess,
    GetSupervisorinfo,
    GetDaySupervisorOutputData,
    GetDayGroupOutputData,
    GetDaySupervisorRateData,
    GetDayGroupRateData,
    GetWeekSupervisorOutputData,
    GetWeekGroupOutputData,
    GetWeekSupervisorRateData,
    GetWeekGroupRateData,
    GetMonthSupervisorOutputData,
    GetMonthGroupOutputData,
    GetMonthSupervisorRateData,
    GetMonthGroupRateData,
    GetSeasonSupervisorOutputData,
    GetSeasonGroupOutputData,
    GetSeasonSupervisorRateData,
    GetSeasonGroupRateData,
    GetYearSupervisorOutputData,
    GetYearGroupOutputData,
    GetYearSupervisorRateData,
    GetYearGroupRateData,
  } from '@/api/OutputRateDashboardApi';
  import {
    loadUserInfo,
  } from '@/api/IssueTrackingDashboardApi';

  const userStore = useUserStore();
  const generateFormModel = () => {
    return {
     startdate: '',
      enddate: '',
      org_id: '',
      PROCESS_NO: '',
      type_Time:'',
      type_OutputRate:'',
      Day:'',
      Week: '',
      Month:'',
      Season:'',
      Year:'',
      UserCode:'',
      Plant:'',
      Dept: '',
      Group:'',
    };
  };
  const { loading } = useLoading();
  const orgList = ref<any>([]);
  const formModel = ref(generateFormModel());
  const localdate = ref<any>([]);
  const timeNow = ref('');
  const option1 = ref<any>([]);
  const PROCESSList = ref<any>([]);
  const option2 = ref<any>([]);
  const GroupOutputShow = ref<any>([]);
  const GroupRateShow = ref<any>([]);
  const option1R = ref<any>([]);
  const option2R = ref<any>([]);
  const SupervisorOutputShow = ref<any>([]);
  const SupervisorRateShow = ref<any>([]);
  const SupervisorName = ref<any>('');
  const SupervisorPost = ref<any>('');
  const XlistGroup = ref<any>([]);
  const Xlistline = ref<any>([]);
  const XlistGroupLable =  ref<any>([]);
  const element = document.documentElement;
  element.requestFullscreen();

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
    const dayOfWeek = "日一二三四五六".charAt(new Date().getDay());
    timeNow.value = `${year1}年${Month1}月${day1}日 ${Hour1}:${Minute1}:${Second1} 星期${dayOfWeek}`;
  }, 1000);



   onMounted(() => {
    

    getPROCESSlist();

    formModel.value.PROCESS_NO="L";

    SupervisorOutputShow.value = false;
    SupervisorRateShow.value = false;
    GroupOutputShow.value = false;
    GroupRateShow.value = false;

    const obj = {
      starttime: '',
      endtime: '',
    };
    obj.starttime = moment(
      moment().add(-7, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
    obj.endtime = moment(
      moment().add(-1, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
    formModel.value.startdate = obj.starttime;
    formModel.value.enddate = obj.endtime;
    formModel.value.type_OutputRate='Output';
    formModel.value.type_Time='Day';
      // console.log(range);
    
    }
  );
 
 

  const getorglist = async () => {
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  
  };


  const getPROCESSlist = async () => {
    // setLoading(true);
    try {
      const PROCESSdata: any = await GetProcess();
      PROCESSList.value = JSON.parse(JSON.stringify(PROCESSdata.list));
    
      // console.log(PROCESSList.value);
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
      }

    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };

  // onMounted(async () => {
  //   try {

  //   } catch (err) {
  //     errorMessage.value = (err as Error).message;
  //   } finally {
  //     // setLoading(false);
  //   }
   
  // });
  
  function setLocal() {
    // 缓存条件在浏览器
   
   
  }
  

  const { setLoading } = useLoading();


  const searchSupervisorinfo= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {

      setLocal();
      const Supervisorinfo :any= await GetSupervisorinfo(formModel.value);
      if (Supervisorinfo.list.length > 0) {
        SupervisorName.value = Supervisorinfo.list[0].EMP_NAME;
        SupervisorPost.value = Supervisorinfo.list[0].WORK_NAME;
      }
      else
      {
        SupervisorName.value = '';
        SupervisorPost.value = '';
      }
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const hidDayNow= ref<any>([]);
  const searchDaySupervisorOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {

      setLocal();
      const DaySupervisorOutput :any= await GetDaySupervisorOutputData(formModel.value);
      if( DaySupervisorOutput.list.Xlist.length>0)
      { 
        option1.value.xAxis.data = DaySupervisorOutput.list.Xlist;
        if(hidDayNow.value.length>0)
        {
          console.log(22+hidDayNow.value)
          formModel.value.Day = hidDayNow.value;
        }
        else
        {
          console.log(11+hidDayNow.value)
          formModel.value.Day = JSON.parse(JSON.stringify( DaySupervisorOutput.list.Xlist[0]))
          hidDayNow.value= JSON.parse(JSON.stringify( DaySupervisorOutput.list.Xlist[0]))
        }


        option1.value.series[0].data = DaySupervisorOutput.list.Ylist1;
        SupervisorOutputShow.value =true;
        SupervisorRateShow.value=false;
      }
      else
      {
        option1.value.xAxis.data = [];
        option1.value.series[0].data = [];
        SupervisorOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchDayGroupOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      tt.value.length = 0;
      setLocal();
      const DayGroupOutput :any= await GetDayGroupOutputData(formModel.value);
      if( DayGroupOutput.list.Xlist.length>0)
      { 
        option2.value.xAxis[0].data = DayGroupOutput.list.Xlist;
        option2.value.series[0].data = DayGroupOutput.list.Ylist1;
        XlistGroup.value =  DayGroupOutput.list.XGroup;
        Xlistline.value =  DayGroupOutput.list.Xlistline;
        XlistGroupLable.value =  DayGroupOutput.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Day.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = true;
        GroupRateShow.value = false;
      }
      else
      {
        option2.value.xAxis.data = [];
        option2.value.series[0].data = [];
        GroupOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchDaySupervisorRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      console.log(formModel.value)
      setLocal();
      const DaySupervisorRate :any= await GetDaySupervisorRateData(formModel.value);
      if( DaySupervisorRate.list.Xlist.length>0)
      { 
        option1R.value.xAxis.data = DaySupervisorRate.list.Xlist;
        if(hidDayNow.value.length>0)
        {
          console.log(22+hidDayNow.value)
          formModel.value.Day = hidDayNow.value;
        }
        else
        {
          console.log(11+hidDayNow.value)
          formModel.value.Day = JSON.parse(JSON.stringify( DaySupervisorRate.list.Xlist[0]))
          hidDayNow.value= JSON.parse(JSON.stringify( DaySupervisorRate.list.Xlist[0]))
        }


        option1R.value.series[0].data = DaySupervisorRate.list.Ylist1;
        SupervisorOutputShow.value =false;
        SupervisorRateShow.value=true;
      }
      else
      {
        option1R.value.xAxis.data = [];
        option1R.value.series[0].data = [];
        SupervisorRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchDayGroupRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    GroupRateShow.value = false;
    try {
      tt.value.length = 0;
      setLocal();
      const DayGroupRate :any= await GetDayGroupRateData(formModel.value);
      if( DayGroupRate.list.Xlist.length>0)
      { 
        option2R.value.xAxis[0].data = DayGroupRate.list.Xlist;
        option2R.value.series[0].data = DayGroupRate.list.Ylist1;
        XlistGroup.value =  DayGroupRate.list.XGroup;
        Xlistline.value =  DayGroupRate.list.Xlistline;
        XlistGroupLable.value =  DayGroupRate.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Day.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = false;
        GroupRateShow.value = true;
      }
      else
      {
        option2R.value.xAxis.data = [];
        option2R.value.series[0].data = [];
        GroupRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

async function ClickSupervisorTime(params:any)
{
  if(params.name && formModel.value.type_OutputRate==='Output')
  {
   
    switch(formModel.value.type_Time)
    {
      case'Day':
        hidDayNow.value = params.name;
        formModel.value.Day = params.name;
        await searchDayGroupOutput();
        break;
      case'Week':
        hidWeekNow.value = params.name;
        formModel.value.Week = params.name;
        await searchWeekGroupOutput();
        break;
      case'Month':
        hidMonthNow.value = params.name;
        formModel.value.Month = params.name;
        await searchMonthGroupOutput();
        break;
      case'Season':
        hidSeasonNow.value = params.name;
        formModel.value.Season = params.name;
        await searchSeasonGroupOutput();
        break;
      case'Year':
        hidYearNow.value = params.name;
        formModel.value.Year = params.name;
        await searchYearGroupOutput();
        break;
        default:
      
    }
  }
  else if(params.name && formModel.value.type_OutputRate==='Rate')
  {

    switch(formModel.value.type_Time)
    {
      case'Day':
        hidDayNow.value = params.name;
        formModel.value.Day = params.name
        await searchDayGroupRate();
        break;
      case'Week':
        hidWeekNow.value = params.name;
        formModel.value.Week = params.name;
        await searchWeekGroupRate();
        break;
      case'Month':
        hidMonthNow.value = params.name;
        formModel.value.Month = params.name;
        await searchMonthGroupRate();
        break;
      case'Season':
        hidSeasonNow.value = params.name;
        formModel.value.Season = params.name;
        await searchSeasonGroupRate();
        break;
      case'Year':
        hidYearNow.value = params.name;
        formModel.value.Year = params.name;
        await searchYearGroupRate();
        break;
        default:
      
    }
  }
}

const hidWeekNow= ref<any>([]);
  const searchWeekSupervisorOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {

      setLocal();
      const WeekSupervisorOutput :any= await GetWeekSupervisorOutputData(formModel.value);
      if( WeekSupervisorOutput.list.Xlist.length>0)
      { 
        option1.value.xAxis.data = WeekSupervisorOutput.list.Xlist;
        if(hidWeekNow.value.length>0)
        {
          console.log(22+hidWeekNow.value)
          formModel.value.Week = hidWeekNow.value;
        }
        else
        {
          console.log(11+hidWeekNow.value)
          formModel.value.Week = JSON.parse(JSON.stringify( WeekSupervisorOutput.list.Xlist[0]))
          hidWeekNow.value= JSON.parse(JSON.stringify( WeekSupervisorOutput.list.Xlist[0]))
        }


        option1.value.series[0].data = WeekSupervisorOutput.list.Ylist1;
        SupervisorOutputShow.value =true;
        SupervisorRateShow.value=false;
      }
      else
      {
        option1.value.xAxis.data = [];
        option1.value.series[0].data = [];
        SupervisorOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchWeekGroupOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      tt.value.length = 0;
      setLocal();
      const WeekGroupOutput :any= await GetWeekGroupOutputData(formModel.value);
      if( WeekGroupOutput.list.Xlist.length>0)
      { 
        option2.value.xAxis[0].data = WeekGroupOutput.list.Xlist;
        option2.value.series[0].data = WeekGroupOutput.list.Ylist1;
        XlistGroup.value =  WeekGroupOutput.list.XGroup;
        Xlistline.value =  WeekGroupOutput.list.Xlistline;
        XlistGroupLable.value =  WeekGroupOutput.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Week.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = true;
        GroupRateShow.value = false;
      }
      else
      {
        option2.value.xAxis.data = [];
        option2.value.series[0].data = [];
        GroupOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchWeekSupervisorRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      console.log(formModel.value)
      setLocal();
      const WeekSupervisorRate :any= await GetWeekSupervisorRateData(formModel.value);
      if( WeekSupervisorRate.list.Xlist.length>0)
      { 
        option1R.value.xAxis.data = WeekSupervisorRate.list.Xlist;
        if(hidWeekNow.value.length>0)
        {
          console.log(22+hidWeekNow.value)
          formModel.value.Week = hidWeekNow.value;
        }
        else
        {
          console.log(11+hidWeekNow.value)
          formModel.value.Week = JSON.parse(JSON.stringify( WeekSupervisorRate.list.Xlist[0]))
          hidWeekNow.value= JSON.parse(JSON.stringify( WeekSupervisorRate.list.Xlist[0]))
        }


        option1R.value.series[0].data = WeekSupervisorRate.list.Ylist1;
        SupervisorOutputShow.value =false;
        SupervisorRateShow.value=true;
      }
      else
      {
        option1R.value.xAxis.data = [];
        option1R.value.series[0].data = [];
        SupervisorRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchWeekGroupRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    GroupRateShow.value = false;
    try {
      tt.value.length = 0;
      setLocal();
      const WeekGroupRate :any= await GetWeekGroupRateData(formModel.value);
      if( WeekGroupRate.list.Xlist.length>0)
      { 
        option2R.value.xAxis[0].data = WeekGroupRate.list.Xlist;
        option2R.value.series[0].data = WeekGroupRate.list.Ylist1;
        XlistGroup.value =  WeekGroupRate.list.XGroup;
        Xlistline.value =  WeekGroupRate.list.Xlistline;
        XlistGroupLable.value =  WeekGroupRate.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Week.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = false;
        GroupRateShow.value = true;
      }
      else
      {
        option2R.value.xAxis.data = [];
        option2R.value.series[0].data = [];
        GroupRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const hidMonthNow= ref<any>([]);
  const searchMonthSupervisorOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {

      setLocal();
      const MonthSupervisorOutput :any= await GetMonthSupervisorOutputData(formModel.value);
      if( MonthSupervisorOutput.list.Xlist.length>0)
      { 
        option1.value.xAxis.data = MonthSupervisorOutput.list.Xlist;
        if(hidMonthNow.value.length>0)
        {
          console.log(22+hidMonthNow.value)
          formModel.value.Month = hidMonthNow.value;
        }
        else
        {
          console.log(11+hidMonthNow.value)
          formModel.value.Month = JSON.parse(JSON.stringify( MonthSupervisorOutput.list.Xlist[0]))
          hidMonthNow.value= JSON.parse(JSON.stringify( MonthSupervisorOutput.list.Xlist[0]))
        }


        option1.value.series[0].data = MonthSupervisorOutput.list.Ylist1;
        SupervisorOutputShow.value =true;
        SupervisorRateShow.value=false;
      }
      else
      {
        option1.value.xAxis.data = [];
        option1.value.series[0].data = [];
        SupervisorOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchMonthGroupOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      tt.value.length = 0;
      setLocal();
      const MonthGroupOutput :any= await GetMonthGroupOutputData(formModel.value);
      if( MonthGroupOutput.list.Xlist.length>0)
      { 
        option2.value.xAxis[0].data = MonthGroupOutput.list.Xlist;
        option2.value.series[0].data = MonthGroupOutput.list.Ylist1;
        XlistGroup.value =  MonthGroupOutput.list.XGroup;
        Xlistline.value =  MonthGroupOutput.list.Xlistline;
        XlistGroupLable.value =  MonthGroupOutput.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Month.split('(')[0]}月达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = true;
        GroupRateShow.value = false;
      }
      else
      {
        option2.value.xAxis.data = [];
        option2.value.series[0].data = [];
        GroupOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchMonthSupervisorRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      console.log(formModel.value)
      setLocal();
      const MonthSupervisorRate :any= await GetMonthSupervisorRateData(formModel.value);
      if( MonthSupervisorRate.list.Xlist.length>0)
      { 
        option1R.value.xAxis.data = MonthSupervisorRate.list.Xlist;
        if(hidMonthNow.value.length>0)
        {
          console.log(22+hidMonthNow.value)
          formModel.value.Month = hidMonthNow.value;
        }
        else
        {
          console.log(11+hidMonthNow.value)
          formModel.value.Month = JSON.parse(JSON.stringify( MonthSupervisorRate.list.Xlist[0]))
          hidMonthNow.value= JSON.parse(JSON.stringify( MonthSupervisorRate.list.Xlist[0]))
        }


        option1R.value.series[0].data = MonthSupervisorRate.list.Ylist1;
        SupervisorOutputShow.value =false;
        SupervisorRateShow.value=true;
      }
      else
      {
        option1R.value.xAxis.data = [];
        option1R.value.series[0].data = [];
        SupervisorRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchMonthGroupRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    GroupRateShow.value = false;
    try {
      tt.value.length = 0;
      setLocal();
      const MonthGroupRate :any= await GetMonthGroupRateData(formModel.value);
      if( MonthGroupRate.list.Xlist.length>0)
      { 
        option2R.value.xAxis[0].data = MonthGroupRate.list.Xlist;
        option2R.value.series[0].data = MonthGroupRate.list.Ylist1;
        XlistGroup.value =  MonthGroupRate.list.XGroup;
        Xlistline.value =  MonthGroupRate.list.Xlistline;
        XlistGroupLable.value =  MonthGroupRate.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Month.split('(')[0]}月达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = false;
        GroupRateShow.value = true;
      }
      else
      {
        option2R.value.xAxis.data = [];
        option2R.value.series[0].data = [];
        GroupRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const hidSeasonNow= ref<any>([]);
  const searchSeasonSupervisorOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {

      setLocal();
      const SeasonSupervisorOutput :any= await GetSeasonSupervisorOutputData(formModel.value);
      if( SeasonSupervisorOutput.list.Xlist.length>0)
      { 
        option1.value.xAxis.data = SeasonSupervisorOutput.list.Xlist;
        if(hidSeasonNow.value.length>0)
        {
          console.log(22+hidSeasonNow.value)
          formModel.value.Season = hidSeasonNow.value;
        }
        else
        {
          console.log(11+hidSeasonNow.value)
          formModel.value.Season = JSON.parse(JSON.stringify( SeasonSupervisorOutput.list.Xlist[0]))
          hidSeasonNow.value= JSON.parse(JSON.stringify( SeasonSupervisorOutput.list.Xlist[0]))
        }


        option1.value.series[0].data = SeasonSupervisorOutput.list.Ylist1;
        SupervisorOutputShow.value =true;
        SupervisorRateShow.value=false;
      }
      else
      {
        option1.value.xAxis.data = [];
        option1.value.series[0].data = [];
        SupervisorOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchSeasonGroupOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      tt.value.length = 0;
      setLocal();
      const SeasonGroupOutput :any= await GetSeasonGroupOutputData(formModel.value);
      if( SeasonGroupOutput.list.Xlist.length>0)
      { 
        option2.value.xAxis[0].data = SeasonGroupOutput.list.Xlist;
        option2.value.series[0].data = SeasonGroupOutput.list.Ylist1;
        XlistGroup.value =  SeasonGroupOutput.list.XGroup;
        Xlistline.value =  SeasonGroupOutput.list.Xlistline;
        XlistGroupLable.value =  SeasonGroupOutput.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Season.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = true;
        GroupRateShow.value = false;
      }
      else
      {
        option2.value.xAxis.data = [];
        option2.value.series[0].data = [];
        GroupOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchSeasonSupervisorRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      console.log(formModel.value)
      setLocal();
      const SeasonSupervisorRate :any= await GetSeasonSupervisorRateData(formModel.value);
      if( SeasonSupervisorRate.list.Xlist.length>0)
      { 
        option1R.value.xAxis.data = SeasonSupervisorRate.list.Xlist;
        if(hidSeasonNow.value.length>0)
        {
          console.log(22+hidSeasonNow.value)
          formModel.value.Season = hidSeasonNow.value;
        }
        else
        {
          console.log(11+hidSeasonNow.value)
          formModel.value.Season = JSON.parse(JSON.stringify( SeasonSupervisorRate.list.Xlist[0]))
          hidSeasonNow.value= JSON.parse(JSON.stringify( SeasonSupervisorRate.list.Xlist[0]))
        }


        option1R.value.series[0].data = SeasonSupervisorRate.list.Ylist1;
        SupervisorOutputShow.value =false;
        SupervisorRateShow.value=true;
      }
      else
      {
        option1R.value.xAxis.data = [];
        option1R.value.series[0].data = [];
        SupervisorRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchSeasonGroupRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    GroupRateShow.value = false;
    try {
      tt.value.length = 0;
      setLocal();
      const SeasonGroupRate :any= await GetSeasonGroupRateData(formModel.value);
      if( SeasonGroupRate.list.Xlist.length>0)
      { 
        option2R.value.xAxis[0].data = SeasonGroupRate.list.Xlist;
        option2R.value.series[0].data = SeasonGroupRate.list.Ylist1;
        XlistGroup.value =  SeasonGroupRate.list.XGroup;
        Xlistline.value =  SeasonGroupRate.list.Xlistline;
        XlistGroupLable.value =  SeasonGroupRate.list.XlistGroupLable;
        console.log( XlistGroupLable.value)
        tt.value.push({
                text: `${formModel.value.Season.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = false;
        GroupRateShow.value = true;
      }
      else
      {
        option2R.value.xAxis.data = [];
        option2R.value.series[0].data = [];
        GroupRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const hidYearNow= ref<any>([]);
  const searchYearSupervisorOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {

      setLocal();
      const YearSupervisorOutput :any= await GetYearSupervisorOutputData(formModel.value);
      if( YearSupervisorOutput.list.Xlist.length>0)
      { 
        option1.value.xAxis.data = YearSupervisorOutput.list.Xlist;
        if(hidYearNow.value.length>0)
        {
          console.log(22+hidYearNow.value)
          formModel.value.Year = hidYearNow.value;
        }
        else
        {
          console.log(11+hidYearNow.value)
          formModel.value.Year = JSON.parse(JSON.stringify( YearSupervisorOutput.list.Xlist[0]))
          hidYearNow.value= JSON.parse(JSON.stringify( YearSupervisorOutput.list.Xlist[0]))
        }


        option1.value.series[0].data = YearSupervisorOutput.list.Ylist1;
        SupervisorOutputShow.value =true;
        SupervisorRateShow.value=false;
      }
      else
      {
        option1.value.xAxis.data = [];
        option1.value.series[0].data = [];
        SupervisorOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchYearGroupOutput= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      tt.value.length = 0;
      setLocal();
      const YearGroupOutput :any= await GetYearGroupOutputData(formModel.value);
      if( YearGroupOutput.list.Xlist.length>0)
      { 
        option2.value.xAxis[0].data = YearGroupOutput.list.Xlist;
        option2.value.series[0].data = YearGroupOutput.list.Ylist1;
        XlistGroup.value =  YearGroupOutput.list.XGroup;
        Xlistline.value =  YearGroupOutput.list.Xlistline;
        XlistGroupLable.value =  YearGroupOutput.list.XlistGroupLable;
        tt.value.push({
                text: `${formModel.value.Year.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = true;
        GroupRateShow.value = false;
      }
      else
      {
        option2.value.xAxis.data = [];
        option2.value.series[0].data = [];
        GroupOutputShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchYearSupervisorRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    try {
      console.log(formModel.value)
      setLocal();
      const YearSupervisorRate :any= await GetYearSupervisorRateData(formModel.value);
      if( YearSupervisorRate.list.Xlist.length>0)
      { 
        option1R.value.xAxis.data = YearSupervisorRate.list.Xlist;
        if(hidYearNow.value.length>0)
        {
          console.log(22+hidYearNow.value)
          formModel.value.Year = hidYearNow.value;
        }
        else
        {
          console.log(11+hidYearNow.value)
          formModel.value.Year = JSON.parse(JSON.stringify( YearSupervisorRate.list.Xlist[0]))
          hidYearNow.value= JSON.parse(JSON.stringify( YearSupervisorRate.list.Xlist[0]))
        }


        option1R.value.series[0].data = YearSupervisorRate.list.Ylist1;
        SupervisorOutputShow.value =false;
        SupervisorRateShow.value=true;
      }
      else
      {
        option1R.value.xAxis.data = [];
        option1R.value.series[0].data = [];
        SupervisorRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchYearGroupRate= async () => {
    setLoading(true);
    errorMessage.value = '';
    GroupRateShow.value = false;
    try {
      tt.value.length = 0;
      setLocal();
      const YearGroupRate :any= await GetYearGroupRateData(formModel.value);
      if( YearGroupRate.list.Xlist.length>0)
      { 
        option2R.value.xAxis[0].data = YearGroupRate.list.Xlist;
        option2R.value.series[0].data = YearGroupRate.list.Ylist1;
        XlistGroup.value =  YearGroupRate.list.XGroup;
        Xlistline.value =  YearGroupRate.list.Xlistline;
        XlistGroupLable.value =  YearGroupRate.list.XlistGroupLable;
        console.log( XlistGroupLable.value)
        tt.value.push({
                text: `${formModel.value.Year.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        GroupOutputShow.value = false;
        GroupRateShow.value = true;
      }
      else
      {
        option2R.value.xAxis.data = [];
        option2R.value.series[0].data = [];
        GroupRateShow.value =false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  // 组件卸载时，清除定时器
  onUnmounted(() => {
   
  });


  option1.value = {
   
    tooltip: {
      trigger: 'axis',
    },
    title: {
    text: '产量', // 设置标题文本
    x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
    y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
    textStyle: { // 设置标题文本样式
      color: 'orange', // 文本颜色
      fontSize: 20, // 字体大小
    },

  },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: [],
   // ,'2024/01/02','2024/01/13','2024/01/14','2024/01/15','2024/01/16','2024/01/17','2024/01/18','2024/01/19','2024/01/20','2024/01/21','2024/01/22'
   // ,'2024/01/23','2024/01/24','2024/01/25','2024/01/26','2024/01/27','2024/01/28','2024/01/29','2024/01/30','2024/01/31'],
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
    yAxis: [
      {
      position: 'left',
      nameTextStyle:
      {
        color:'#00d3ee',
        fontSize:14,

      },
      type: 'value',
      
      axisLabel: {
        formatter: (params: any) => {
          if (params) {
            return `${params/1000}千`;
          }
          return `${params}千`;
        },
        interval: 0, // 同样强制显示所有标签
        
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

  ],
    series: [
      {
        barMaxWidth:100,
        name: '产量',
        type: 'bar',
         color: '#00d3ee',
        itemStyle: {
          normal: { 
            label: { 
              show: true, 
              color: '#fff', 
              position: 'top' ,
              formatter: (params: any) => {
              if (params) {
                return `${(params.value/1000).toFixed(2)}千`;
              }
              return '';
            },
            } 
          },
        },
       data: [],
     
      },
     
    ],
  };

  const tt =  ref<any>([]);
  option2.value = {
    title: tt.value,
   tooltip: {
     trigger: 'axis',
   },

   xAxis: [{
     type: 'category',
     boundaryGap: true,
     data: [],
     axisLabel: {
        
        color:"#fff"
      },
   },
   {
      type: 'category',
      position: 'bottom',
      data: XlistGroup,
      axisLabel: {
        margin: 40,
        align: 'center',
        show: true,
        interval: (index: any,value:any) => { 
          if (XlistGroupLable.value[index]) {
            return value;
          }
          return '';
        },
        color:"#fff"
      },
      
      axisLine: {
        lineStyle: {
          width: 1,
          color:"#fff"
        }
      },
      axisTick: {
        interval: (index: any,value:any) => { 
         
          if (Xlistline.value[index]) {
            return value;
          }
          return '';
        },
        length: 60
      }
    }

  
  ],
   yAxis: [
     {
     position: 'left',
     nameTextStyle:
     {
       color:'#00d3ee',
       fontSize:14,

     },
     type: 'value',
     
     axisLabel: {
       formatter: (params: any) => {
         if (params) {
          return `${params/1000}千`;
         }
         return `${params}千`;
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
   
 ],
   series: [
     {
      barMaxWidth:100,
       name: '产量',
       type: 'bar',
       color: '#00d3ee',
       itemStyle: {
         normal: { 
           label: { 
             show: true, 
             color: '#fff', 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${(params.value/1000).toFixed(2)}千`;
             }
             return '';
           },
           } 
         },
       },
      data: [],
    
     },
     
   ],
 };

 

 option1R.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   title: {
    text: '达成率', // 设置标题文本
    x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
    y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
    textStyle: { // 设置标题文本样式
      color: 'orange', // 文本颜色
      fontSize: 20, // 字体大小
    },

  },
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
  // ,'2024/01/02','2024/01/13','2024/01/14','2024/01/15','2024/01/16','2024/01/17','2024/01/18','2024/01/19','2024/01/20','2024/01/21','2024/01/22'
  // ,'2024/01/23','2024/01/24','2024/01/25','2024/01/26','2024/01/27','2024/01/28','2024/01/29','2024/01/30','2024/01/31'],
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
   yAxis: [
    
   {
     type: 'value',
     position: 'left',
     axisLabel: {
       interval: 0, // 同样强制显示所有标签
       formatter: (params: any) => {
         if (params) {
           return `${params}%`;
         }
          return `${params}%`;
       },
     },
     
     max: 120, // 设置最大值为120%

     axisLine: {
       lineStyle: {
         color: '#fff',
       },
     },
     splitLine: {
       show: false,
     },
   },
 ],
   series: [
   
     {
      barMaxWidth:100,
       name: '达成率',
       type: 'bar',
       color: '#00d3ee',
       itemStyle: {
         normal: { 
          color: (params: any) => { // 使用回调函数来决定颜色c
          if (params.value > 80) {
            return '#00CC00'; // 绿色
          } 
          return '#00d3ee'; // 默认颜色
        },
           label: { 
             show: true, 
             color: ('#fff'), 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${params.value}%`;
             }
             return '';
           },
           } ,
           
         },
       },
       data: [],
      
     },
   ],
 };
 const tt2 =  ref<any>([]);

 option2R.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   title: tt.value,
   xAxis: [{
    position: 'bottom',
     type: 'category',
     boundaryGap: true,
     data: [],
     axisLabel: {
        
        color:"#fff"
      },
  
   },
   {
      type: 'category',
      position: 'bottom',
      data: XlistGroup,
      axisLabel: {
        margin: 40,
        align: 'center',
        show: true,
        interval: (index: any,value:any) => { 
          if (XlistGroupLable.value[index]) {
            return value;
          }
          return '';
        },
        color:"#fff"
      },
      
      axisLine: {
        lineStyle: {
          width: 1,
          color:"#fff"
        }
      },
      axisTick: {
        interval: (index: any,value:any) => { 
         
          if (Xlistline.value[index]) {
            return value;
          }
          return '';
        },
        length: 60
      }
    }

  
  ],
   yAxis: [
    
   {
     type: 'value',
     position: 'left',
     axisLabel: {
       interval: 0, // 同样强制显示所有标签
       formatter: (params: any) => {
         if (params) {
           return `${params}%`;
         }
          return `${params}%`;
       },
     },
     
     max: 120, // 设置最大值为120%

     axisLine: {
       lineStyle: {
         color: '#fff',
       },
     },
     splitLine: {
       show: false,
     },
   },
 ],
   series: [
   
     {
      barMaxWidth:100,
       name: '达成率',
       type: 'bar',
       color: '#00d3ee',
       itemStyle: {
         normal: { 
          color: (params: any) => { // 使用回调函数来决定颜色c
          if (params.value > 80) {
            return '#00CC00'; // 绿色
          } 
          return '#00d3ee'; // 默认颜色
        },
           label: { 
             show: true, 
             color: '#fff', 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${params.value}%`;
             }
             return '';
           },
           } 
         },
       },
       data: [],
      
     },
   ],
 };

 

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

  function full() {
    toggleFullScreen();  
  }
 

  async function searchOutput()
{ 
  errorMessage.value = '';
  const btnOutput =  document.getElementById("searchOutput") as HTMLButtonElement;
  btnOutput.className = 'button  button3';
  const btnRate =  document.getElementById("searchRate") as HTMLButtonElement;
  btnRate.className = 'button  button2'; 
  formModel.value.type_OutputRate = 'Output';
  SupervisorOutputShow.value =true;
  SupervisorRateShow.value = false;
  GroupOutputShow.value =true;
  GroupRateShow.value = false;
  await search();

}

async function searchRate()
{ 
  errorMessage.value = '';
  const btnRate =  document.getElementById("searchRate") as HTMLButtonElement;
  btnRate.className = 'button  button3';
  const btnOutput =  document.getElementById("searchOutput") as HTMLButtonElement;
  btnOutput.className = 'button  button2'; 
  formModel.value.type_OutputRate = 'Rate';
  SupervisorOutputShow.value =false;
  SupervisorRateShow.value = true;
  GroupOutputShow.value =false;
  GroupRateShow.value = true;
  await search();


}

async function searchByPROCESS(params:any)
{ 

  console.log(params)
  errorMessage.value = '';
  formModel.value.PROCESS_NO = params;
  await search();
 
}



async function searchBystartdate(params:any)
{ 
  hidDayNow.value ='';
  hidWeekNow.value ='';
  hidMonthNow.value ='';
  hidSeasonNow.value ='';
  hidYearNow.value ='';
  console.log(params)
  errorMessage.value = '';
  formModel.value.startdate = params;
  await search();
 
}

async function searchByenddate(params:any)
{ 
  hidDayNow.value ='';
  hidWeekNow.value ='';
  hidMonthNow.value ='';
  hidSeasonNow.value ='';
  hidYearNow.value ='';
  console.log(params)
  errorMessage.value = '';
  formModel.value.enddate = params;
  await search();
  
}


async function searchByYear()
{ 
  errorMessage.value = '';
  const btnYear =  document.getElementById("searchByYear") as HTMLButtonElement;
  btnYear.className = 'button  button3';
  const btnSeason =  document.getElementById("searchBySeason") as HTMLButtonElement;
  btnSeason.className = 'button  button2'; 
  const btnMonth =  document.getElementById("searchByMonth") as HTMLButtonElement;
  btnMonth.className = 'button  button2'; 
  const btnWeek =  document.getElementById("searchByWeek") as HTMLButtonElement;
  btnWeek.className = 'button  button2'; 
  const btnDay =  document.getElementById("searchByDay") as HTMLButtonElement;
  btnDay.className = 'button  button2'; 
  formModel.value.type_Time = 'Year';
  await search();
}

async function searchBySeason()
{ 
  errorMessage.value = '';
  const btnYear =  document.getElementById("searchByYear") as HTMLButtonElement;
  btnYear.className = 'button  button2';
  const btnSeason =  document.getElementById("searchBySeason") as HTMLButtonElement;
  btnSeason.className = 'button  button3'; 
  const btnMonth =  document.getElementById("searchByMonth") as HTMLButtonElement;
  btnMonth.className = 'button  button2'; 
  const btnWeek =  document.getElementById("searchByWeek") as HTMLButtonElement;
  btnWeek.className = 'button  button2'; 
  const btnDay =  document.getElementById("searchByDay") as HTMLButtonElement;
  btnDay.className = 'button  button2'; 
  formModel.value.type_Time = 'Season';
  await search();
 
}

async function searchByMonth()
{ 
  errorMessage.value = '';
  const btnYear =  document.getElementById("searchByYear") as HTMLButtonElement;
  btnYear.className = 'button  button2';
  const btnSeason =  document.getElementById("searchBySeason") as HTMLButtonElement;
  btnSeason.className = 'button  button2'; 
  const btnMonth =  document.getElementById("searchByMonth") as HTMLButtonElement;
  btnMonth.className = 'button  button3'; 
  const btnWeek =  document.getElementById("searchByWeek") as HTMLButtonElement;
  btnWeek.className = 'button  button2'; 
  const btnDay =  document.getElementById("searchByDay") as HTMLButtonElement;
  btnDay.className = 'button  button2';
  formModel.value.type_Time = 'Month';
  await search();
}

async function searchByWeek()
{ 
  errorMessage.value = '';
  const btnYear =  document.getElementById("searchByYear") as HTMLButtonElement;
  btnYear.className = 'button  button2';
  const btnSeason =  document.getElementById("searchBySeason") as HTMLButtonElement;
  btnSeason.className = 'button  button2'; 
  const btnMonth =  document.getElementById("searchByMonth") as HTMLButtonElement;
  btnMonth.className = 'button  button2'; 
  const btnWeek =  document.getElementById("searchByWeek") as HTMLButtonElement;
  btnWeek.className = 'button  button3'; 
  const btnDay =  document.getElementById("searchByDay") as HTMLButtonElement;
  btnDay.className = 'button  button2'; 
  formModel.value.type_Time = 'Week';
  await search();
}

async function searchByDay()
{ 
  errorMessage.value = '';
  const btnYear =  document.getElementById("searchByYear") as HTMLButtonElement;
  btnYear.className = 'button  button2';
  const btnSeason =  document.getElementById("searchBySeason") as HTMLButtonElement;
  btnSeason.className = 'button  button2'; 
  const btnMonth =  document.getElementById("searchByMonth") as HTMLButtonElement;
  btnMonth.className = 'button  button2'; 
  const btnWeek =  document.getElementById("searchByWeek") as HTMLButtonElement;
  btnWeek.className = 'button  button2'; 
  const btnDay =  document.getElementById("searchByDay") as HTMLButtonElement;
  btnDay.className = 'button  button3'; 
  formModel.value.type_Time = 'Day';
  await search();
}

async function search()
{  

  await searchSupervisorinfo();
  if(formModel.value.type_OutputRate==='Output')
  {
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDaySupervisorOutput();
        await searchDayGroupOutput();
        break;
      case'Week':
        await searchWeekSupervisorOutput();
        await searchWeekGroupOutput();
        break;
      case'Month':
        await searchMonthSupervisorOutput();
        await searchMonthGroupOutput();
        break;
      case'Season':
        await searchSeasonSupervisorOutput();
        await searchSeasonGroupOutput();
        break;
      case'Year':
        await searchYearSupervisorOutput();
        await searchYearGroupOutput();
        break;
        default:
      
    }
  }
  else if(formModel.value.type_OutputRate==='Rate')
  {
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDaySupervisorRate();
        await searchDayGroupRate();
        break;
      case'Week':
        await searchWeekSupervisorRate();
        await searchWeekGroupRate();
        break;
      case'Month':
        await searchMonthSupervisorRate();
        await searchMonthGroupRate();
        break;
      case'Season':
        await searchSeasonSupervisorRate();
        await searchSeasonGroupRate();
        break;
      case'Year':
        await searchYearSupervisorRate();
        await searchYearGroupRate();
        break;
        default:
      
    }
  }
}






function toggleFullScreen() {
  if (document.fullscreenElement ) { 
    // 如果页面当前处于全屏状态，则退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } 
  } 
  else if ( document.documentElement.requestFullscreen) {
    // 如果页面当前不在全屏状态，则尝试进入全屏
    document.documentElement.requestFullscreen();

  }
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

  .full {
    background-color: black;
    background-size: cover;
  }
  .margin_10 {
    // margin: -10px;
  }
  .txt_center {
    text-align: center;
  }
  .container {
    background-size: cover;
    width: 100%;
    height: 100%;
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
    width: 1000px;
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
    margin-left: 1.5vh;
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
    color: #00ffff;
    font-size: 20px;
    font-weight: bolder;
  }
  .one_top {
    // margin-top: 60px;
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
    height: 460px;
  }
  ::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
    height: 420px;
  }

  ::v-deep .two .two_top .arco-card-size-medium .arco-card-body {
    height: 460px;
  }
  ::v-deep .two .two_bottom .arco-card-size-medium .arco-card-body {
    height: 420px;
  }
  ::v-deep .three .arco-card-size-medium .arco-card-body {
    // background-image: url('@/assets/images/bg.png');
    background-size: cover;
    height: 220px;
  }

  .one .card_content {
    height: 95%;
    text-align: center;
    margin: 0px auto;
  }
  .one .card_content div {
    text-align: center;
    margin: 0px auto;
    margin-left: 5px;
    // margin-top: 5px;
  }
  .two .card_content {
    height: 83.5vh;
    // background-color: rgb(251, 249, 249);
    overflow: hidden;
    color: white;
    // margin-top: 10px;
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
    background-color: #31b7fb;
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
     font-weight: 900;
    // letter-spacing: 0.1vw;
    background: linear-gradient(183deg, #fff 35%, #3fb4ff);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 21px;
  }
  .button {
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .button {
    position: relative;
    background-color: #4CAF50;
    border: none;
    font-size: 13px;
    color: #FFFFFF;
    padding: 8px;
    width: 72px;
    height: 40px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
}

.button:after {
    content: "";
    background: #90EE90;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px!important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s
}

.button:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
}

.button1 {
    background-color: white; 
    color: black; 
    border: 2px solid #af4c4c;
}
 
.button1:hover {
    background-color: #af4c4c;
    color: white;
}
 
.button2 {
    background-color: white; 
    color: black; 
    border: 2px solid #4CAF50;
}
 
.button2:hover {
    background-color: #4CAF50;
    color: white;
}
 
.button3 {
    background-color: rgb(84, 194, 41); 
    color: black; 
    border: 2px solid #f5e50cfb;

}
 
.button3:hover {
    background-color: #f5e50cfb;
    color: white;
}
  .tip {
    width: 140%;
    height: 70px;
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
  @keyframes blink {
  0% { opacity: 1; }
  25% { opacity: 1; }
  50% { opacity: 0; }
  75% { opacity: 1; }
  100% { opacity: 1;}
}

h3 {
  animation: blink 3s infinite;
}
  .boder:hover {
    // background-color: transparent;
    // box-shadow: rgb(255, 255, 255) 0px 0px 10px;
    // color: white;
    // border-radius: 10px;
  }
  .bg:hover {
    
  }
  .two .card_content:hover {
    background-color: transparent;
    box-shadow: transparent 0px 0px 10px inset;
    color: white;
    border-radius: 8px;
  }
  
  .A1 ::v-deep.dv-scroll-board .rows .row-item {
  font-size: 12px !important;
}

.A1 ::v-deep.dv-scroll-board .header-item {
  font-size: 13.5px !important;
  font-weight: bolder;
}
 
  .A2 ::v-deep.dv-scroll-board .rows .row-item {
  font-size: 10px !important;
}

.A2 ::v-deep.dv-scroll-board .header-item {
  font-size: 13.5px !important;
  font-weight: bolder;
}

::v-deep .arco-statistic-content .arco-statistic-value-integer  {
    font-size: 35px;
    color: white;
}
::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    font-size: 35px;
    color: white;
}

.B1 ::v-deep .arco-statistic-content .arco-statistic-value-integer  {
    font-size: 22px;
    color: white;
}
.B1 ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    font-size: 22px;
    color: white;
}
.B1 ::v-deep .arco-statistic-content .arco-statistic-value-integer  {
    font-size: 28px;
    color: white;
}
.B1 ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    font-size: 28px;
    color: white;
}

.C1 ::v-deep .arco-statistic-content .arco-statistic-value-integer  {
    color: rgb(207, 162, 14);
    font-size: 28px;
}
.C1 ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    color:rgb(207, 162, 14);
    font-size: 28px;
}
.C2 ::v-deep .arco-statistic-content .arco-statistic-value-integer  {
    color: rgb(247, 6, 6);
    font-size: 28px;
}
.C2 ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    color:rgb(247, 6, 6);
    font-size: 28px;
}

.button55 {
    position: relative;
    background-color: #31b7fb;
    border: none;
    font-size: 16px;
    color: #ffffff;
    padding: 8px;
    width: 80px;
    height: 30px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
  }

  .button55:after {
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

  .button55:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
  ::v-deep .arco-input-wrapper {
    display: inline-flex;
    box-sizing: border-box;
    width: 100%;
    padding-right: 12px;
    padding-left: 12px;
    color: white;
    font-size: 14px;
    background-color: transparent;
    border: 1px solid #16566e;
    border-radius: var(--border-radius-small);
    cursor: text;
    transition: color 0.1s cubic-bezier(0, 0, 1, 1), border-color 0.1s cubic-bezier(0, 0, 1, 1), background-color 0.1s cubic-bezier(0, 0, 1, 1);
}


::v-deep .arco-input-wrapper:focus-within.arco-input-wrapper.arco-input-focus
{
  background-color:transparent;
}
</style>  async   async 
