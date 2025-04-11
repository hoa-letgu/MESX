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
                      >{{ '产量达成率' }}</h1
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
                                <span style="color: white">工厂：</span>

                                <a-select
                                  v-model="formModel.org_id"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px"
                                  @change="searchByOrg"
                                >
                                  <a-option
                                    v-for="item in orgList"
                                    :key="item.ORG_CODE"
                                    :value="item.ORG_CODE"
                                    >{{ item.ORG_NAME }}</a-option
                                  >
                                </a-select> &nbsp;&nbsp;
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
                                <button id="searchByYear" @click="searchByYear"  class="button  button2">年</button> &nbsp;&nbsp; 
                                <button id="searchBySeason" @click="searchBySeason"  class="button  button2">季度</button> &nbsp;&nbsp; 
                                <button id="searchByMonth" @click="searchByMonth"  class="button  button2">月</button> &nbsp;&nbsp; 
                                <button id="searchByWeek" @click="searchByWeek"  class="button  button2">星期</button> &nbsp;&nbsp; 
                                <button id="searchByDay" @click="searchByDay"  class="button  button3">日</button> &nbsp;&nbsp; 
                                <button id="searchOutput" @click="searchOutput"  class="button  button3">产量</button> &nbsp;&nbsp; 
                                <button id="searchRate" @click="searchRate"  class="button  button2">达成率</button> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
                                <!-- <button id="exportData" @click="exportData"  class="button  button2">导出数据</button> &nbsp;&nbsp;  -->
                                <button v-show="exportPlantshow" id="exportPlant" @click="exportPlantData"  class="button  button2" style="position: fixed;right: 970px; top: 155px;z-index: 999; ">导出数据</button>
                                <button v-show="exportDeptshow" id="exportDept" @click="exportDeptData"  class="button  button2" style="position: fixed;right: 970px; top: 635px;z-index: 999; ">导出数据</button>
                                <button v-show="exportGroupshow" id="exportGroup" @click="exportGroupData"  class="button  button2" style="position: fixed;right: 30px; top: 155px;z-index: 999; ">导出数据</button>
                                <!-- <button v-show="exportOutputshow" id="exportOutput" @click="exportData"  class="button  button2" style="position: fixed;right: 30px; top: 635px;z-index: 999; ">导出数据</button> -->
                              </div>
                      <a-row class="grid-demo" style="margin: -30px 0vh;">
                        <a-col :span="24" v-if="cbig">
                          <div class="two_bottom" style="margin: 3vh 0px">
                              <a-card
                                class="card-demo boder margin_10" style="padding-bottom: 10px;"
                              > <button v-show="suoxiao" id="exportGroup" @click="suoxiaoDiv"  class="button  button2" style="position: fixed;right: 30px; top: 155px;z-index: 999; ">缩小</button>
                              <div style="margin: -30px 70px; "  v-if="DayWeekMonthYearOutputShow">
                                      <VCharts
                                        :option="option4"
                                        style="
                                          height: 910px;
                                          width: 2080px;
                                          padding-top: 30px;
                                          margin-left: -200px;
                                        "
                                        
                                      ></VCharts
                                    ></div>
                                    <div style="margin: -30px 70px; "  v-if="DayWeekMonthYearRateShow">
                                      <VCharts
                                        :option="option4Rate"
                                        style="
                                          height: 910px;
                                          width: 2080px;
                                          padding-top: 30px;
                                          margin-left: -200px;
                                        "
                                        
                                      ></VCharts
                                    ></div> 
                                    
                                   
                              </a-card>
                            </div>
                        </a-col>
                        <!-- //第一列 -->
                        <a-col :span="12" v-if="cone">
                          
                          <div class="one">
                        
                            <div class="one_top" style="margin: 27px 0px">
                              <a-card class="card-demo boder margin_10" >
                                <div style="margin: -3vh 7vh; " v-if="PlintOutputShow">
                                      <VCharts 
                                        :option="option1"
                                        style="
                                          height: 470px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                         @click="ClickPlint"  
                                      ></VCharts>
                                </div>
                                <div style="margin: -3vh 7vh; " v-if="PlintRateShow">
                                      <VCharts 
                                        :option="option1R"
                                        style="
                                          height: 470px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                         @click="ClickPlint"  
                                      ></VCharts>
                                    </div>
                              </a-card>
                            </div>
                            <div class="one_bottom" style="margin: -1vh 0px">
                              <a-card
                                class="card-demo boder margin_10">
                                <div style="margin: -30px 70px; "  v-if="DeptOutputShow">
                                      <VCharts
                                        :option="option2"
                                        style="
                                          height: 440px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                          @click="ClickDept"  
                                      ></VCharts
                                    ></div>
                                    <div style="margin: -30px 70px; " v-if="DeptRateShow">
                                      <VCharts
                                        :option="option2R"
                                        style="
                                          height: 410px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                          @click="ClickDept"  
                                      ></VCharts
                                    ></div>
                              </a-card>
                            </div>
                          </div>
                        </a-col>
                        <!-- //第二列 -->
                        <a-col :span="12" v-if="ctwo">
                          <div class="two" >
                           
                            <div class="two_top" style="margin: 27px 0px">
                              <a-card class="card-demo boder margin_10" >
                                <div style="margin: -30px 70px; " v-if="GroupOutputShow">
                                      <VCharts
                                        :option="option3"
                                        style="
                                          height: 470px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                         @click="ClickGroup"  
                                      ></VCharts
                                    ></div>
                                    <div style="margin: -30px 70px; " v-if="GroupRateShow">
                                      <VCharts
                                        :option="option3R"
                                        style="
                                          height: 470px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                         @click="ClickGroup"  
                                      ></VCharts
                                    ></div>
                              </a-card>
                            </div>
                            <div class="two_bottom" style="margin: -1vh 0px">
                              <a-card
                                class="card-demo boder margin_10"
                              ><button v-show="fangda" id="exportGroup" @click="fangdaDiv"  class="button  button2" style="position: fixed;right: 30px; top: 635px;z-index: 999; ">放大</button>
                              <div style="margin: -30px 70px; " v-if="DayWeekMonthYearOutputShow">
                                      <VCharts
                                        :option="option4"
                                        style="
                                          height: 410px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
                                        "
                                        
                                      ></VCharts
                                    ></div>
                                   
                                    <div style="margin: -30px 70px; " v-if="DayWeekMonthYearRateShow">
                                      <VCharts
                                        :option="option4Rate"
                                        style="
                                          height: 410px;
                                          width: 900px;
                                          padding-top: 40px;
                                          margin-left: -70px;
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
  // import * as XLSX from 'xlsx';
  import ExcelJS from "exceljs";
  // import { useI18n } from 'vue-i18n';
  import useUserStore from '@/store/modules/user/index';
  import router from '@/router';
  import { init, SetOptionOpts } from 'echarts/core';

  import {
    GetProcess,
    GetPlantOutputData,
    GetDeptOutputData,
    GetGroupOutputData,
    GetDayOutputByPlint,
    GetDayOutputByDept,
    GetDayOutputByGroup,
    GetWeekOutputByPlint,
    GetWeekOutputByDept,
    GetWeekOutputByGroup,
    GetMonthOutputByPlint,
    GetMonthOutputByDept,
    GetMonthOutputByGroup,
    GetSeasonOutputByPlint,
    GetSeasonOutputByDept,
    GetSeasonOutputByGroup,
    GetYearOutputByPlint,
    GetYearOutputByDept,
    GetYearOutputByGroup,
    GetExportPlantData,
    GetExportDeptData,
    GetExportGroupData,
    // GetDayRateByPlant,
    // GetDayRateByDept,
    // GetDayRateByGroup,
    // GetWeekRateByPlant,
    // GetWeekRateByDept,
    // GetWeekRateByGroup,
    // GetMonthRateByPlant,
    // GetMonthRateByDept,
    // GetMonthRateByGroup,
    // GetSeasonRateByPlant,
    // GetSeasonRateByDept,
    // GetSeasonRateByGroup,
    // GetYearRateByPlant,
    // GetYearRateByDept,
    // GetYearRateByGroup,
  } from '@/api/OutputRateDashboardApi';
  import {
    loadUserInfo,
  } from '@/api/IssueTrackingDashboardApi';
  import {
    GetTodayInOutRecord,
  } from '@/api/BottomFactory';

  const userStore = useUserStore();
  const generateFormModel = () => {
    return {
     startdate: '',
      enddate: '',
      org_id: '',
      PROCESS_NO: '',
      type_Time:'',
      type_OutputRate:'',
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
  const option3 = ref<any>([]);
  const PlintOutputShow = ref<any>([]);
  const PlintRateShow = ref<any>([]);
  const DeptOutputShow = ref<any>([]);
  const DeptRateShow = ref<any>([]);
  const GroupOutputShow = ref<any>([]);
  const GroupRateShow = ref<any>([]);
  const option1R = ref<any>([]);
  const option2R = ref<any>([]);
  const option3R = ref<any>([]);
  const DayWeekMonthYearOutputShow = ref<any>([]);
  const SeasonOutputShow = ref<any>([]);
  const option4 = ref<any>([]);
  const option4R = ref<any>([]);
  const exportPlantshow = ref<any>([]);
  const exportDeptshow = ref<any>([]);
  const exportGroupshow = ref<any>([]);
  const exportOutputshow = ref<any>([]);
  const DayWeekMonthYearRateShow = ref<any>([]);
  const SeasonRateShow = ref<any>([]);
  const option4Rate = ref<any>([]);
  const option4Rate2 = ref<any>([]);
  const suoxiao = ref<any>([]);
  const cbig = ref<any>([]);
  const cone = ref<any>([]);
  const ctwo = ref<any>([]);
  const fangda = ref<any>([]);

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
    
    getorglist();  
    getPROCESSlist();
    formModel.value.org_id="1001";
    formModel.value.PROCESS_NO="L";

    PlintOutputShow.value = true;
    PlintRateShow.value = false;

    const obj = {
      starttime: '',
      endtime: '',
    };
    obj.starttime = moment(
      moment().add(-7, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
    obj.endtime =moment(
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

//  let timerlist: any = 1;
//   timerlist = window.setInterval(() => {
//     console.log('定时器查询列表。');
//     // window.clearInterval(timerlist);
//     searchAll()
//   }, 5000);

// async  function searchAll()
// { 
//   errorMessage.value = '';
   
//   const DeptIndex = hidDeptxAxis.value.indexOf(hidDeptNow.value); // 获取元素在数组中的索引
//   const PlantIndex = hidPlantxAxis.value.indexOf(hidPlantNow.value);

//   if (DeptIndex !== -1) 
//   { // 确保元素存在于数组中
//     if (DeptIndex === hidDeptxAxis.value.length - 1) 
//     {
//       console.log('The desired value is the last element in the array.');
//       hidDeptNow.value="";
//       if(PlantIndex !== -1)
//       {
//         if (PlantIndex === hidPlantxAxis.value.length - 1) 
//         {
//           console.log('The desired value is the last element in the array.');
//           hidPlantNow.value="";
//         }
//         else 
//         {
//           hidPlantNow.value = hidPlantxAxis.value[PlantIndex + 1]; // 获取下一个元素
//           console.log('The desired value is not the last element. The next element is:', hidPlantNow.value);
//         }
//       }
//       else
//       {
//         console.log('The desired value does not exist in the array.');
//       }


//     } 
//     else 
//     {
//       hidDeptNow.value = hidDeptxAxis.value[DeptIndex + 1]; // 获取下一个元素
//       console.log('The desired value is not the last element. The next element is:', hidDeptNow.value);
//     }
//   } 
//   else 
//   {
//     console.log('The desired value does not exist in the array.');
//   }
//   await searchPDG();
  
// }

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

  onMounted(async () => {
    try {
      await searchPDG();
      suoxiao.value = false;
      cbig.value = false;
      cone.value =true;
      ctwo.value = true;
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
   
  });
  
  function setLocal() {
    // 缓存条件在浏览器
   
   
  }
  async function searchPDG() {


    errorMessage.value = '';
    // console.log(formModel.value)
    console.log(111155+formModel.value.org_id)
  
   

    if(formModel.value.type_OutputRate==='Output')
    {
      await searchPlantOutput();
      console.log(111155+formModel.value.Plant)
      console.log(hidPlantxAxis.value)
      console.log(hidPlantNow.value )
      await searchDeptOutput();
      console.log(111155+formModel.value.Dept)
      console.log(hidDeptxAxis.value)
      console.log(hidDeptNow.value )
      await searchGroupOutput();
      console.log(hidGroupxAxis.value)
      console.log(hidgroupNow.value )

      if(clickchart.value === 'Group')
      {
        switch(formModel.value.type_Time)
        {
          case'Day':
            await searchDayOutputByGroup();
            break;
          case'Week':
            await searchWeekOutputByGroup();
            break;
          case'Month':
            await searchMonthOutputByGroup();
            break;
          case'Season':
            await searchSeasonOutputByGroup();
            break;
          case'Year':
            await searchYearOutputByGroup();
            break;
            default:
        }

      }
      else  if(clickchart.value === 'Dept')
      {
        switch(formModel.value.type_Time)
        {
          case'Day':
            await searchDayOutputByDept();
            break;
          case'Week':
            await searchWeekOutputByDept();
            break;
          case'Month':
            await searchMonthOutputByDept();
            break;
          case'Season':
            await searchSeasonOutputByDept();
            break;
          case'Year':
            await searchYearOutputByDept();
            break;
            default:
        }

      }
      else 
      {
        switch(formModel.value.type_Time)
        {
          case'Day':
            await searchDayOutputByPlint();
            break;
          case'Week':
            await searchWeekOutputByPlint();
            break;
          case'Month':
            await searchMonthOutputByPlint();
            break;
          case'Season':
            await searchSeasonOutputByPlint();
            break;
          case'Year':
            await searchYearOutputByPlint();
            break;
            default:
        }

      }
    }
    else if(formModel.value.type_OutputRate==='Rate')
    {
      await searchPlantRate();
      console.log(111155+formModel.value.Plant)
      console.log(hidPlantxAxis.value)
      console.log(hidPlantNow.value )
      await searchDeptRate();
      console.log(111155+formModel.value.Dept)
      console.log(hidDeptxAxis.value)
      console.log(hidDeptNow.value )
      await searchGroupRate();
      console.log(hidGroupxAxis.value)
      console.log(hidgroupNow.value )

      // 右下图新增达成率
      if(clickchart.value === 'Group')
      {
        switch(formModel.value.type_Time)
        {
          case'Day':
            await searchDayRateByGroup();
            break;
          case'Week':
            await searchWeekRateByGroup();
            break;
          case'Month':
            await searchMonthRateByGroup();
            break;
          case'Season':
            await searchSeasonRateByGroup();
            break;
          case'Year':
            await searchYearRateByGroup();
            break;
            default:
        }

      }
      else  if(clickchart.value === 'Dept')
      {
        switch(formModel.value.type_Time)
        {
          case'Day':
            await searchDayRateByDept();
            break;
          case'Week':
            await searchWeekRateByDept();
            break;
          case'Month':
            await searchMonthRateByDept();
            break;
          case'Season':
            await searchSeasonRateByDept();
            break;
          case'Year':
            await searchYearRateByDept();
            break;
            default:
        }

      }
      else 
      {
        switch(formModel.value.type_Time)
        {
          case'Day':
            await searchDayRateByPlant();
            break;
          case'Week':
            await searchWeekRateByPlant();
            break;
          case'Month':
            await searchMonthRateByPlant();
            break;
          case'Season':
            await searchSeasonRateByPlant();
            break;
          case'Year':
            await searchYearRateByPlant();
            break;
            default:
        }

      }
      

    }

   
  }

  const { setLoading } = useLoading();
  const hidPlantxAxis= ref<any>([]);
  const hidPlantNow= ref<any>([]);
  const searchPlantOutput = async () => {
    setLoading(true);

    try {

      setLocal();
      const PlantOutput :any= await GetPlantOutputData(formModel.value);
      if( PlantOutput.list.Xlist.length>0)
      {  
        option1.value.xAxis.data = PlantOutput.list.Xlist;
        hidPlantxAxis.value = PlantOutput.list.Xlist;

        if(hidPlantNow.value.length>0)
        {
          console.log(22+hidPlantNow.value)
          formModel.value.Plant = hidPlantNow.value;
        }
        else
        {
          console.log(11+hidPlantNow.value)
          formModel.value.Plant = JSON.parse(JSON.stringify( PlantOutput.list.Xlist[0]))
          hidPlantNow.value= JSON.parse(JSON.stringify( PlantOutput.list.Xlist[0]))
        }

        option1.value.series[0].data = PlantOutput.list.Ylist1;
        option1.value.series[1].data = PlantOutput.list.Ylist2;
        option1.value.series[2].data = PlantOutput.list.Ylist3;
        option1.value.series[3].data = PlantOutput.list.Ylist4;
        PlintOutputShow.value = true;
        PlintRateShow.value=false;
        if(formModel.value.type_OutputRate==="Rate")
        {
          exportPlantshow.value = false;
          exportDeptshow.value = false;
          exportGroupshow.value = false;
        }
        else if(suoxiao.value===true)
        {
          exportPlantshow.value = false;
          exportDeptshow.value = false;
          exportGroupshow.value = false;
        }
        else
        {
          exportPlantshow.value = true;
          exportDeptshow.value = true;
          exportGroupshow.value = true;
        }
      }
      else
      {
        option1.value.xAxis.data =[];
        hidPlantxAxis.value = '';
        hidPlantNow.value = '';
        formModel.value.Plant = '';

        option1.value.series[0].data = [];
        option1.value.series[1].data = [];
        option1.value.series[2].data = [];
        option1.value.series[3].data = [];
        PlintOutputShow.value = false;
        exportPlantshow.value = false;
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchPlantRate= async () => {
    setLoading(true);

    try {
      exportPlantshow.value = false;
      setLocal();
      const PlantOutput :any= await GetPlantOutputData(formModel.value);
      if( PlantOutput.list.Xlist.length>0)
      { 
        option1R.value.xAxis.data = PlantOutput.list.Xlist;
        hidPlantxAxis.value = PlantOutput.list.Xlist;
        if(hidPlantNow.value.length>0)
        {
          console.log(44+hidPlantNow.value)
          formModel.value.Plant = hidPlantNow.value;
        }
        else
        {
          console.log(33+hidPlantNow.value)
          formModel.value.Plant = JSON.parse(JSON.stringify( PlantOutput.list.Xlist[0]))
          hidPlantNow.value= JSON.parse(JSON.stringify( PlantOutput.list.Xlist[0]))
        }


        option1R.value.series[0].data = PlantOutput.list.Ylist4;
        PlintRateShow.value =true;
        PlintOutputShow.value=false;
      
      }
      else
      {
        option1R.value.xAxis.data = [];
        hidPlantxAxis.value = '';
        hidPlantNow.value = '';
        formModel.value.Plant = '';

        option1R.value.series[0].data = [];
        PlintRateShow.value =false;
       
      }

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const hidDeptxAxis= ref<any>([]);
  const hidDeptNow= ref<any>([]);
  const searchDeptOutput = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptOutput :any= await GetDeptOutputData(formModel.value);
      if(DeptOutput.list.Xlist.length>0)
      {
        option2.value.xAxis.data = DeptOutput.list.Xlist;
        hidDeptxAxis.value = DeptOutput.list.Xlist;

        if(hidDeptNow.value.length>0)
        { 
          console.log(22+hidDeptNow.value)
          formModel.value.Dept = hidDeptNow.value 
        }
        else
        {
          console.log(11+hidDeptNow.value)
          hidDeptNow.value = JSON.parse(JSON.stringify( DeptOutput.list.Xlist[0]))
          formModel.value.Dept = JSON.parse(JSON.stringify( DeptOutput.list.Xlist[0]));
        }
       

        option2.value.series[0].data = DeptOutput.list.Ylist1;
        option2.value.series[1].data = DeptOutput.list.Ylist2;
        option2.value.series[2].data = DeptOutput.list.Ylist3;
        option2.value.series[3].data = DeptOutput.list.Ylist4;
        DeptOutputShow.value = true;
        DeptRateShow.value = false;
        if(formModel.value.type_OutputRate==="Rate")
        {
          exportPlantshow.value = false;
          exportDeptshow.value = false;
          exportGroupshow.value = false;
        }
        else if(suoxiao.value===true)
        {
          exportPlantshow.value = false;
          exportDeptshow.value = false;
          exportGroupshow.value = false;
        }
        else
        {
          exportPlantshow.value = true;
          exportDeptshow.value = true;
          exportGroupshow.value = true;
        }
      }
      else
      {
        option2.value.xAxis.data = [];
        hidDeptxAxis.value = '';
        hidDeptNow.value = ''
        formModel.value.Dept = '';

        option2.value.series[0].data = [];
        option2.value.series[1].data = [];
        option2.value.series[2].data = [];
        option2.value.series[3].data = [];
        DeptOutputShow.value = false;
        exportDeptshow.value = false;
      }
   
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchDeptRate = async () => {
    setLoading(true);

    try {
      exportDeptshow.value = false;
      setLocal();
      const DeptOutput :any= await GetDeptOutputData(formModel.value);
      if(DeptOutput.list.Xlist.length>0)
      {
        option2R.value.xAxis.data = DeptOutput.list.Xlist;
        hidDeptxAxis.value = DeptOutput.list.Xlist;
        
        if( hidDeptNow.value.length>0)
        { 
          console.log(44+hidDeptNow.value)
          formModel.value.Dept = hidDeptNow.value 
        }
        else
        {
          console.log(33+hidDeptNow.value)
          hidDeptNow.value = JSON.parse(JSON.stringify( DeptOutput.list.Xlist[0]))
          formModel.value.Dept = JSON.parse(JSON.stringify( DeptOutput.list.Xlist[0]));
        }

        option2R.value.series[0].data = DeptOutput.list.Ylist4;
        DeptRateShow.value = true;
        DeptOutputShow.value=false;
        
      }
      else
      {
        option2R.value.xAxis.data = [];
        hidDeptxAxis.value = '';
        hidDeptNow.value = '';
        formModel.value.Dept = '';

        option2R.value.series[0].data = [];
        DeptRateShow.value = false;
   
      }
     
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const hidGroupxAxis= ref<any>([]);
  const hidgroupNow= ref<any>([]);
  const searchGroupOutput = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupOutput :any= await GetGroupOutputData(formModel.value);
      if(GroupOutput.list.Xlist.length>0)
      {
        option3.value.xAxis.data = GroupOutput.list.Xlist;
        hidGroupxAxis.value = GroupOutput.list.Xlist;
       
        if( hidgroupNow.value.length>0)
        { 
          console.log(44+hidgroupNow.value)
          formModel.value.Group = hidgroupNow.value 
        }
        else
        {
          console.log(33+hidgroupNow.value)
          hidgroupNow.value = JSON.parse(JSON.stringify( GroupOutput.list.Xlist[0]))
          formModel.value.Group = JSON.parse(JSON.stringify( GroupOutput.list.Xlist[0]));
        }
      
      
      

        option3.value.series[0].data = GroupOutput.list.Ylist1;
        option3.value.series[1].data = GroupOutput.list.Ylist2;
        option3.value.series[2].data = GroupOutput.list.Ylist3;
        option3.value.series[3].data = GroupOutput.list.Ylist4;
        GroupOutputShow.value = true;
        GroupRateShow.value = false;
        if(formModel.value.type_OutputRate==="Rate")
        {
          exportPlantshow.value = false;
          exportDeptshow.value = false;
          exportGroupshow.value = false;
        }
        else if(suoxiao.value===true)
        {
          exportPlantshow.value = false;
          exportDeptshow.value = false;
          exportGroupshow.value = false;
        }
        else
        {
          exportPlantshow.value = true;
          exportDeptshow.value = true;
          exportGroupshow.value = true;
        }
      }
      else
      {
        option3.value.xAxis.data = [];
        hidGroupxAxis.value = '';
        hidgroupNow.value = ''
        formModel.value.Group = '';

        option3.value.series[0].data = [];
        option3.value.series[1].data = [];
        option3.value.series[2].data = [];
        option3.value.series[3].data = [];
        GroupOutputShow.value = false;
        exportGroupshow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  
  const searchGroupRate = async () => {
    setLoading(true);

    try {
      exportGroupshow.value = false;
      setLocal();
      const GroupOutput :any= await GetGroupOutputData(formModel.value);
      if(GroupOutput.list.Xlist.length>0)
      {
        option3R.value.xAxis.data = GroupOutput.list.Xlist;
        hidGroupxAxis.value = GroupOutput.list.Xlist;

      if( hidgroupNow.value.length>0)
        { 
          console.log(44+hidgroupNow.value)
          formModel.value.Group = hidgroupNow.value 
        }
        else
        {
          console.log(33+hidgroupNow.value)
          hidgroupNow.value = JSON.parse(JSON.stringify( GroupOutput.list.Xlist[0]))
          formModel.value.Group = JSON.parse(JSON.stringify( GroupOutput.list.Xlist[0]));
        }
      

        option3R.value.series[0].data = GroupOutput.list.Ylist4;
        GroupRateShow.value = true;
        GroupOutputShow.value = false;
        
      }
      else
      {
        option3R.value.xAxis.data = [];
        hidGroupxAxis.value = '';
        hidgroupNow.value = ''
        formModel.value.Group = '';

        option3R.value.series[0].data = [];
        GroupRateShow.value = false;
       
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  
 
  const searchDayOutputByPlint = async () => {
    setLoading(true);

    try {

      setLocal();
      const PlantDayOutput :any= await GetDayOutputByPlint(formModel.value);
      tt.value.length = 0;
      if(PlantDayOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = PlantDayOutput.list.Xlist;
        option4.value.series[0].data = PlantDayOutput.list.Ylist1;
        option4.value.series[1].data = PlantDayOutput.list.Ylist2;
        option4.value.series[2].data = PlantDayOutput.list.Ylist3;
        option4.value.series[3].data = PlantDayOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = true;
       DayWeekMonthYearRateShow.value = false;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  
  const searchDayOutputByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptDayOutput :any= await GetDayOutputByDept(formModel.value);
      tt.value.length = 0;
      if(DeptDayOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = DeptDayOutput.list.Xlist;
        option4.value.series[0].data = DeptDayOutput.list.Ylist1;
        option4.value.series[1].data = DeptDayOutput.list.Ylist2;
        option4.value.series[2].data = DeptDayOutput.list.Ylist3;
        option4.value.series[3].data = DeptDayOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;

      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchDayOutputByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupDayOutput :any= await GetDayOutputByGroup(formModel.value);
      tt.value.length = 0;
      if(GroupDayOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = GroupDayOutput.list.Xlist;
        option4.value.series[0].data = GroupDayOutput.list.Ylist1;
        option4.value.series[1].data = GroupDayOutput.list.Ylist2;
        option4.value.series[2].data = GroupDayOutput.list.Ylist3;
        option4.value.series[3].data = GroupDayOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchWeekOutputByPlint = async () => {
    setLoading(true);

    try {

      setLocal();
      const PlantWeekOutput :any= await GetWeekOutputByPlint(formModel.value);
      tt.value.length = 0;
      if(PlantWeekOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = PlantWeekOutput.list.Xlist;
        option4.value.series[0].data = PlantWeekOutput.list.Ylist1;
        option4.value.series[1].data = PlantWeekOutput.list.Ylist2;
        option4.value.series[2].data = PlantWeekOutput.list.Ylist3;
        option4.value.series[3].data = PlantWeekOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
        DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  
  const searchWeekOutputByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptWeekOutput :any= await GetWeekOutputByDept(formModel.value);
      tt.value.length = 0;
      if(DeptWeekOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = DeptWeekOutput.list.Xlist;
        option4.value.series[0].data = DeptWeekOutput.list.Ylist1;
        option4.value.series[1].data = DeptWeekOutput.list.Ylist2;
        option4.value.series[2].data = DeptWeekOutput.list.Ylist3;
        option4.value.series[3].data = DeptWeekOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchWeekOutputByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupWeekOutput :any= await GetWeekOutputByGroup(formModel.value);
      tt.value.length = 0;
      if(GroupWeekOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = GroupWeekOutput.list.Xlist;
        option4.value.series[0].data = GroupWeekOutput.list.Ylist1;
        option4.value.series[1].data = GroupWeekOutput.list.Ylist2;
        option4.value.series[2].data = GroupWeekOutput.list.Ylist3;
        option4.value.series[3].data = GroupWeekOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchMonthOutputByPlint = async () => {
    setLoading(true);

    try {

      setLocal();
      const PlantMonthOutput :any= await GetMonthOutputByPlint(formModel.value);
      tt.value.length = 0;
      if(PlantMonthOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = PlantMonthOutput.list.Xlist;
        option4.value.series[0].data = PlantMonthOutput.list.Ylist1;
        option4.value.series[1].data = PlantMonthOutput.list.Ylist2;
        option4.value.series[2].data = PlantMonthOutput.list.Ylist3;
        option4.value.series[3].data = PlantMonthOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  
  const searchMonthOutputByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptMonthOutput :any= await GetMonthOutputByDept(formModel.value);
      tt.value.length = 0;
      if(DeptMonthOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = DeptMonthOutput.list.Xlist;
        option4.value.series[0].data = DeptMonthOutput.list.Ylist1;
        option4.value.series[1].data = DeptMonthOutput.list.Ylist2;
        option4.value.series[2].data = DeptMonthOutput.list.Ylist3;
        option4.value.series[3].data = DeptMonthOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchMonthOutputByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupMonthOutput :any= await GetMonthOutputByGroup(formModel.value);
      tt.value.length = 0;
      if(GroupMonthOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = GroupMonthOutput.list.Xlist;
        option4.value.series[0].data = GroupMonthOutput.list.Ylist1;
        option4.value.series[1].data = GroupMonthOutput.list.Ylist2;
        option4.value.series[2].data = GroupMonthOutput.list.Ylist3;
        option4.value.series[3].data = GroupMonthOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchSeasonOutputByPlint = async () => {
    setLoading(true);

    try {

      setLocal();
      const PlantSeasonOutput :any= await GetSeasonOutputByPlint(formModel.value);
      tt.value.length = 0;
      if(PlantSeasonOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = PlantSeasonOutput.list.Xlist;
        option4.value.series[0].data = PlantSeasonOutput.list.Ylist1;
        option4.value.series[1].data = PlantSeasonOutput.list.Ylist2;
        option4.value.series[2].data = PlantSeasonOutput.list.Ylist3;
        option4.value.series[3].data = PlantSeasonOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchSeasonOutputByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptSeasonOutput :any= await GetSeasonOutputByDept(formModel.value);
      tt.value.length = 0;
      if(DeptSeasonOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = DeptSeasonOutput.list.Xlist;
        option4.value.series[0].data = DeptSeasonOutput.list.Ylist1;
        option4.value.series[1].data = DeptSeasonOutput.list.Ylist2;
        option4.value.series[2].data = DeptSeasonOutput.list.Ylist3;
        option4.value.series[3].data = DeptSeasonOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchSeasonOutputByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupSeasonOutput :any= await GetSeasonOutputByGroup(formModel.value);
      tt.value.length = 0;
      if(GroupSeasonOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = GroupSeasonOutput.list.Xlist;
        option4.value.series[0].data = GroupSeasonOutput.list.Ylist1;
        option4.value.series[1].data = GroupSeasonOutput.list.Ylist2;
        option4.value.series[2].data = GroupSeasonOutput.list.Ylist3;
        option4.value.series[3].data = GroupSeasonOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
//   const searchSeasonOutputByPlint = async () => {
//     setLoading(true);
//     SeasonOutputShow.value = false;

//     try {
//       setLocal();
//       const PlantSeasonOutput :any= await GetSeasonOutputByPlint(formModel.value);
//       tt2.value.length = 0;
//       s.value.length = 0;
//       s.value = [];
//       console.log(s.value)
//       if(PlantSeasonOutput.list.Xlist.length>0)
//       {
//         option4R.value.xAxis.data = PlantSeasonOutput.list.Xlist;
//         tt2.value.push({
//                 text: `${formModel.value.Plant.split('(')[0]}达成量`, // 设置标题文本
//                 x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
//                 y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
//                 textStyle: { // 设置标题文本样式
//                   color: 'orange', // 文本颜色
//                   fontSize: 20, // 字体大小
//                 },

//               },);

//         Object.keys(PlantSeasonOutput.list).forEach((key: any) => {
//         if (key !== 'Xlist')
//           s.value.push({ 
//             name: `${(key)}的总和`,
//             type: 'bar',
//             data: PlantSeasonOutput.list[key],
//             itemStyle: {
//               normal: { 
//                 label: { 
//                   show: true, 
//                   color: '#fff', 
//                   position: 'top' ,
//                   formatter: (params: any) => {
//                   if (params) {
//                     return `${(params.value/1000).toFixed(2)}千`;
//                   }
//                   return '';
//                 },
//                 } 
//               },
//             },
//           });
//       }, );
//          DayWeekMonthYearOutputShow.value = false;
//          DayWeekMonthYearRateShow.value = false;
//          SeasonOutputShow.value = true;
//          SeasonRateShow.value = false;
//       }
//       else
//       {
//         option4R.value.xAxis.data = [];
//         option4R.value.series[0].data = [];
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = false;
//       }
     
     

//    }
//  catch (err) {
//       errorMessage.value = (err as Error).message;
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const searchSeasonOutputByDept = async () => {
//     setLoading(true);
//     SeasonOutputShow.value = false;
//     try {

//       setLocal();
//       const DeptSeasonOutput :any= await GetSeasonOutputByDept(formModel.value);
//       tt2.value.length = 0;
//       s.value.length = 0;
//       if(DeptSeasonOutput.list.Xlist.length>0)
//       {
//         option4R.value.xAxis.data = DeptSeasonOutput.list.Xlist;
//         tt2.value.push({
//                 text: `${formModel.value.Dept.split('(')[0]}达成量`, // 设置标题文本
//                 x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
//                 y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
//                 textStyle: { // 设置标题文本样式
//                   color: 'orange', // 文本颜色
//                   fontSize: 20, // 字体大小
//                 },

//               },);
//         Object.keys(DeptSeasonOutput.list).forEach((key: any) => {
//         if (key !== 'Xlist')
//           s.value.push({
//             name: `${(key)}的总和`,
//             type: 'bar',
//             data: DeptSeasonOutput.list[key],
//             itemStyle: {
//               normal: { 
//                 label: { 
//                   show: true, 
//                   color: '#fff', 
//                   position: 'top' ,
//                   formatter: (params: any) => {
//                   if (params) {
//                     return `${(params.value/1000).toFixed(2)}千`;
//                   }
//                   return '';
//                 },
//                 } 
//               },
//             },
//           });
//       }, console.log(s.value));
//          DayWeekMonthYearOutputShow.value = false;
//          DayWeekMonthYearRateShow.value = false;
//          SeasonOutputShow.value = true;
//          SeasonRateShow.value = false;
//       }
//       else
//       {
//         option4R.value.xAxis.data = [];
//         option4R.value.series[0].data = [];
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = false;
//       }
     
     

//    }
//  catch (err) {
//       errorMessage.value = (err as Error).message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchSeasonOutputByGroup = async () => {
//     setLoading(true);
//     SeasonOutputShow.value = false;
//     try {

//       setLocal();
//       const GroupSeasonOutput :any= await GetSeasonOutputByGroup(formModel.value);
//       tt2.value.length = 0;
//       s.value.length = 0;
//       if(GroupSeasonOutput.list.Xlist.length>0)
//       {
//         option4R.value.xAxis.data = GroupSeasonOutput.list.Xlist;
//         tt2.value.push({
//                 text: `${formModel.value.Group.split('(')[0]}达成量`, // 设置标题文本
//                 x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
//                 y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
//                 textStyle: { // 设置标题文本样式
//                   color: 'orange', // 文本颜色
//                   fontSize: 20, // 字体大小
//                 },

//               },);
//         Object.keys(GroupSeasonOutput.list).forEach((key: any) => {
//         if (key !== 'Xlist')
//           s.value.push({
//             name: `${(key)}的总和`,
//             type: 'bar',
//             data: GroupSeasonOutput.list[key],
//             itemStyle: {
//               normal: { 
//                 label: { 
//                   show: true, 
//                   color: '#fff', 
//                   position: 'top' ,
//                   formatter: (params: any) => {
//                   if (params) {
//                     return `${(params.value/1000).toFixed(2)}千`;
//                   }
//                   return '';
//                 },
//                 } 
//               },
//             },
//           });
//       }, console.log(s.value));
//          DayWeekMonthYearOutputShow.value = false;
//          DayWeekMonthYearRateShow.value = false;
//          SeasonOutputShow.value = true;
//          SeasonRateShow.value = false;
//       }
//       else
//       {
//         option4R.value.xAxis.data = [];
//         option4R.value.series[0].data = [];
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = false;
//       }
     
     

//    }
//  catch (err) {
//       errorMessage.value = (err as Error).message;
//     } finally {
//       setLoading(false);
//     }
//   };


  const searchYearOutputByPlint = async () => {
    setLoading(true);

    try {

      setLocal();
      const PlantYearOutput :any= await GetYearOutputByPlint(formModel.value);
      tt.value.length = 0;
      if(PlantYearOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = PlantYearOutput.list.Xlist;
        option4.value.series[0].data = PlantYearOutput.list.Ylist1;
        option4.value.series[1].data = PlantYearOutput.list.Ylist2;
        option4.value.series[2].data = PlantYearOutput.list.Ylist3;
        option4.value.series[3].data = PlantYearOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  
  const searchYearOutputByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptYearOutput :any= await GetYearOutputByDept(formModel.value);
      tt.value.length = 0;
      if(DeptYearOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = DeptYearOutput.list.Xlist;
        option4.value.series[0].data = DeptYearOutput.list.Ylist1;
        option4.value.series[1].data = DeptYearOutput.list.Ylist2;
        option4.value.series[2].data = DeptYearOutput.list.Ylist3;
        option4.value.series[3].data = DeptYearOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchYearOutputByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupYearOutput :any= await GetYearOutputByGroup(formModel.value);
      tt.value.length = 0;
      if(GroupYearOutput.list.Xlist.length>0)
      {
        option4.value.xAxis.data = GroupYearOutput.list.Xlist;
        option4.value.series[0].data = GroupYearOutput.list.Ylist1;
        option4.value.series[1].data = GroupYearOutput.list.Ylist2;
        option4.value.series[2].data = GroupYearOutput.list.Ylist3;
        option4.value.series[3].data = GroupYearOutput.list.Ylist4;
        tt.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成量`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
         DayWeekMonthYearOutputShow.value = true;
         DayWeekMonthYearRateShow.value = false;
         SeasonOutputShow.value = false;
         SeasonRateShow.value = false;
      }
      else
      {
        option4.value.xAxis.data = [];
        option4.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;
      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchDayRateByPlant = async () => {
    setLoading(true);
    try {

      setLocal();
      const PlantDayRate :any= await GetDayOutputByPlint(formModel.value);
      ttR.value.length = 0;
      if(PlantDayRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = PlantDayRate.list.Xlist;
        option4Rate.value.series[0].data = PlantDayRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchDayRateByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptDayRate :any= await GetDayOutputByDept(formModel.value);
      ttR.value.length = 0;
      if(DeptDayRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = DeptDayRate.list.Xlist;
        option4Rate.value.series[0].data = DeptDayRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchDayRateByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupDayRate :any= await GetDayOutputByGroup(formModel.value);
      ttR.value.length = 0;
      if(GroupDayRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = GroupDayRate.list.Xlist;
        option4Rate.value.series[0].data = GroupDayRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchWeekRateByPlant = async () => {
    setLoading(true);
    try {

      setLocal();
      const PlantWeekRate :any= await GetWeekOutputByPlint(formModel.value);
      ttR.value.length = 0;
      if(PlantWeekRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = PlantWeekRate.list.Xlist;
        option4Rate.value.series[0].data = PlantWeekRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchWeekRateByDept = async () => {
    setLoading(true);

    try {

      setLocal();
      const DeptWeekRate :any= await GetWeekOutputByDept(formModel.value);
      ttR.value.length = 0;
      if(DeptWeekRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = DeptWeekRate.list.Xlist;
        option4Rate.value.series[0].data = DeptWeekRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchWeekRateByGroup = async () => {
    setLoading(true);

    try {

      setLocal();
      const GroupWeekRate :any= await GetWeekOutputByGroup(formModel.value);
      ttR.value.length = 0;
      if(GroupWeekRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = GroupWeekRate.list.Xlist;
        option4Rate.value.series[0].data = GroupWeekRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchMonthRateByPlant = async () => {
    setLoading(true);
    try {

      setLocal();
      const PlantMonthRate :any= await GetMonthOutputByPlint(formModel.value);
      ttR.value.length = 0;
      if(PlantMonthRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = PlantMonthRate.list.Xlist;
        option4Rate.value.series[0].data = PlantMonthRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchMonthRateByDept = async () => {
    setLoading(true);
    try {

      setLocal();
      const DeptMonthRate :any= await GetMonthOutputByDept(formModel.value);
      ttR.value.length = 0;
      if(DeptMonthRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = DeptMonthRate.list.Xlist;
        option4Rate.value.series[0].data = DeptMonthRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchMonthRateByGroup = async () => {
    setLoading(true);
    try {

      setLocal();
      const GroupMonthRate :any= await GetMonthOutputByGroup(formModel.value);
      ttR.value.length = 0;
      if(GroupMonthRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = GroupMonthRate.list.Xlist;
        option4Rate.value.series[0].data = GroupMonthRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const searchSeasonRateByPlant = async () => {
    setLoading(true);
    try {

      setLocal();
      const PlantSeasonRate :any= await GetSeasonOutputByPlint(formModel.value);
      ttR.value.length = 0;
      if(PlantSeasonRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = PlantSeasonRate.list.Xlist;
        option4Rate.value.series[0].data = PlantSeasonRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchSeasonRateByDept = async () => {
    setLoading(true);
    try {

      setLocal();
      const DeptSeasonRate :any= await GetSeasonOutputByDept(formModel.value);
      ttR.value.length = 0;
      if(DeptSeasonRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = DeptSeasonRate.list.Xlist;
        option4Rate.value.series[0].data = DeptSeasonRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchSeasonRateByGroup = async () => {
    setLoading(true);
    try {

      setLocal();
      const GroupSeasonRate :any= await GetSeasonOutputByGroup(formModel.value);
      ttR.value.length = 0;
      if(GroupSeasonRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = GroupSeasonRate.list.Xlist;
        option4Rate.value.series[0].data = GroupSeasonRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

//   const searchSeasonRateByPlant = async () => {
//     setLoading(true);
//     SeasonRateShow.value = false;

//     try {
//       setLocal();
//       const PlantSeasonRate :any= await GetSeasonRateByPlant(formModel.value);
//       tt2R.value.length = 0;
//       s2.value.length = 0;
//       s2.value = [];
//       console.log(s2.value)
//       if(PlantSeasonRate.list.Xlist.length>0)
//       {
//         option4Rate2.value.xAxis.data = PlantSeasonRate.list.Xlist;
//         tt2R.value.push({
//                 text: `${formModel.value.Plant.split('(')[0]}达成率`, // 设置标题文本
//                 x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
//                 y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
//                 textStyle: { // 设置标题文本样式
//                   color: 'orange', // 文本颜色
//                   fontSize: 20, // 字体大小
//                 },

//               },);

//         Object.keys(PlantSeasonRate.list).forEach((key: any) => {
//         if (key !== 'Xlist')
//           s2.value.push({ 
//             name: `${(key)}的达成率`,
//             type: 'bar',
//             data: PlantSeasonRate.list[key],
//             itemStyle: {
//               normal: { 
//                 label: { 
//                   show: true, 
//                   color: '#fff', 
//                   position: 'top' ,
//                   formatter: (params: any) => {
//                   if (params) {
//                     return `${params.value}%`;
//                   }
//                   return '';
//                 },
//                 } 
//               },
//             },
//           });
//       }, );
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = true;
//       }
//       else
//       {
//         option4Rate2.value.xAxis.data = [];
//         option4Rate2.value.series[0].data = [];
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = false;
//       }
     
     

//    }
//  catch (err) {
//       errorMessage.value = (err as Error).message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchSeasonRateByDept = async () => {
//     setLoading(true);
//     SeasonRateShow.value = false;

//     try {
//       setLocal();
//       const DeptSeasonRate :any= await GetSeasonRateByDept(formModel.value);
//       tt2R.value.length = 0;
//       s2.value.length = 0;
//       s2.value = [];
//       console.log(s2.value)
//       if(DeptSeasonRate.list.Xlist.length>0)
//       {
//         option4Rate2.value.xAxis.data = DeptSeasonRate.list.Xlist;
//         tt2R.value.push({
//                 text: `${formModel.value.Dept.split('(')[0]}达成率`, // 设置标题文本
//                 x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
//                 y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
//                 textStyle: { // 设置标题文本样式
//                   color: 'orange', // 文本颜色
//                   fontSize: 20, // 字体大小
//                 },

//               },);

//         Object.keys(DeptSeasonRate.list).forEach((key: any) => {
//         if (key !== 'Xlist')
//           s2.value.push({ 
//             name: `${(key)}的达成率`,
//             type: 'bar',
//             data: DeptSeasonRate.list[key],
//             itemStyle: {
//               normal: { 
//                 label: { 
//                   show: true, 
//                   color: '#fff', 
//                   position: 'top' ,
//                   formatter: (params: any) => {
//                   if (params) {
//                     return `${params.value}%`;
//                   }
//                   return '';
//                 },
//                 } 
//               },
//             },
//           });
//       }, );
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = true;
//       }
//       else
//       {
//         option4Rate2.value.xAxis.data = [];
//         option4Rate2.value.series[0].data = [];
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = false;
//       }
     
     

//    }
//  catch (err) {
//       errorMessage.value = (err as Error).message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchSeasonRateByGroup = async () => {
//     setLoading(true);
//     SeasonRateShow.value = false;

//     try {
//       setLocal();
//       const GroupSeasonRate :any= await GetSeasonRateByGroup(formModel.value);
//       tt2R.value.length = 0;
//       s2.value.length = 0;
//       s2.value = [];
//       console.log(s2.value)
//       if(GroupSeasonRate.list.Xlist.length>0)
//       {
//         option4Rate2.value.xAxis.data = GroupSeasonRate.list.Xlist;
//         tt2R.value.push({
//                 text: `${formModel.value.Group.split('(')[0]}达成率`, // 设置标题文本
//                 x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
//                 y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
//                 textStyle: { // 设置标题文本样式
//                   color: 'orange', // 文本颜色
//                   fontSize: 20, // 字体大小
//                 },

//               },);

//         Object.keys(GroupSeasonRate.list).forEach((key: any) => {
//         if (key !== 'Xlist')
//           s2.value.push({ 
//             name: `${(key)}的达成率`,
//             type: 'bar',
//             data: GroupSeasonRate.list[key],
//             itemStyle: {
//               normal: { 
//                 label: { 
//                   show: true, 
//                   color: '#fff', 
//                   position: 'top' ,
//                   formatter: (params: any) => {
//                   if (params) {
//                     return `${params.value}%`;
//                   }
//                   return '';
//                 },
//                 } 
//               },
//             },
//           });
//       }, );
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = true;
//       }
//       else
//       {
//         option4Rate2.value.xAxis.data = [];
//         option4Rate2.value.series[0].data = [];
//         DayWeekMonthYearOutputShow.value = false;
//         DayWeekMonthYearRateShow.value = false;
//         SeasonOutputShow.value = false;
//         SeasonRateShow.value = false;
//       }
     
     

//    }
//  catch (err) {
//       errorMessage.value = (err as Error).message;
//     } finally {
//       setLoading(false);
//     }
//   };


  const searchYearRateByPlant = async () => {
    setLoading(true);
    try {

      setLocal();
      const PlantYearRate :any= await GetYearOutputByPlint(formModel.value);
      ttR.value.length = 0;
      if(PlantYearRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = PlantYearRate.list.Xlist;
        option4Rate.value.series[0].data = PlantYearRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Plant.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchYearRateByDept = async () => {
    setLoading(true);
    try {

      setLocal();
      const DeptYearRate :any= await GetYearOutputByDept(formModel.value);
      ttR.value.length = 0;
      if(DeptYearRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = DeptYearRate.list.Xlist;
        option4Rate.value.series[0].data = DeptYearRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Dept.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

      }
     
     

   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const searchYearRateByGroup = async () => {
    setLoading(true);
    try {

      setLocal();
      const GroupYearRate :any= await GetYearOutputByGroup(formModel.value);
      ttR.value.length = 0;
      if(GroupYearRate.list.Xlist.length>0)
      {
        option4Rate.value.xAxis.data = GroupYearRate.list.Xlist;
        option4Rate.value.series[0].data = GroupYearRate.list.Ylist4;
        ttR.value.push({
                text: `${formModel.value.Group.split('(')[0]}达成率`, // 设置标题文本
                x: 'center', // 设置标题相对于图表区的位置，可选值：'center' | 'left' | 'right'
                y: 'top', // 设置标题相对于图表区的位置，可选值：'top' | 'bottom'
                textStyle: { // 设置标题文本样式
                  color: 'orange', // 文本颜色
                  fontSize: 20, // 字体大小
                },

              },);
       DayWeekMonthYearOutputShow.value = false;
       DayWeekMonthYearRateShow.value = true;
       SeasonOutputShow.value = false;
       SeasonRateShow.value = false;

      }
      else
      {
        option4Rate.value.xAxis.data = [];
        option4Rate.value.series[0].data = [];
        DayWeekMonthYearOutputShow.value = false;
        DayWeekMonthYearRateShow.value = false;
        SeasonOutputShow.value = false;
        SeasonRateShow.value = false;

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
   // window.clearInterval(timerlist);
  });


  option1.value = {
   
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 20,
      textStyle: {
        color: '#fff',
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
        rotate: 0,
        formatter:  (value:any) => {
      // 在遇到左括号时插入换行符
      return value.replace(/\(/g, '\n(');
    },
    padding: [15, 100],
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
    {
      type: 'value',
      position: 'right',
      axisLabel: {
        interval: 0, // 同样强制显示所有标签
        formatter: (params: any) => {
          if (params) {
            return `${params.toFixed(2)}%`;
          }
          return '';
        },
      },
      max: 120, // 设置最大值为120%
      min:-10,
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
        barWidth:40,
        name: '实际产量的总和',
        type: 'bar',
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
      {
        barWidth:40,
        name: '目标产量的总和',
        type: 'bar',
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
      {
        barWidth:40,
        name: '差额的总和',
        type: 'bar',
        itemStyle: {
          normal: { 
            color: (params: any) => { // 使用回调函数来决定颜色c
          if (params.value <0 ) {
            return 'red'; // 绿色
          } 
          return '#f7cb64'; // 默认颜色
        },
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
      {
        name: '达成率',
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          normal: { 
            label: { 
              show: true, 
              color: '#fff', 
              position: 'bottom' ,
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


  option2.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   legend: {
     top: 20,
     textStyle: {
       color: '#fff',
     },
   },
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
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
       rotate: 0,
       formatter:  (value:any) => {
      // 在遇到左括号时插入换行符
      return value.replace(/\(/g, '\n(');
    },
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
   {
     type: 'value',
     position: 'right',
     axisLabel: {

       formatter: (params: any) => {
         if (params) {
           return `${params.toFixed(2)}%`;
         }
         return '';
       },
     },
     max: 120, // 设置最大值为120%
     min:-10,
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
       name: '实际产量的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
           label: { 
            textStyle: {
                fontSize: 11, // 设置字体大小
                
            },
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
     {
       name: '目标产量的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
           label: { 
            textStyle: {
                fontSize: 11, // 设置字体大小
                
            },
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
     {
       name: '差额的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
          color: (params: any) => { // 使用回调函数来决定颜色c
          if (params.value <0 ) {
            return 'red'; // 绿色
          } 
          return '#f7cb64'; // 默认颜色
        },
           label: { 
            textStyle: {
                fontSize: 11, // 设置字体大小
                
            },
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
     {
       name: '达成率',
       type: 'line',
       yAxisIndex: 1,
       itemStyle: {
         normal: { 
           label: { 
             show: true, 
             color: '#fff', 
             position: 'bottom' ,
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

 option3.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   legend: {
     top: 20,
     textStyle: {
       color: '#fff',
     },
   },
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
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
       rotate: 0,
       formatter:  (value:any) => {
      // 在遇到左括号时插入换行符
      return value.replace(/\(/g, '\n(');
    },
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
   {
     type: 'value',
     position: 'right',
     axisLabel: {

       formatter: (params: any) => {
         if (params) {
           return `${params.toFixed(2)}%`;
         }
         return '';
       },
     },
     min: -10,
						max: 120,
	
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
       name: '实际产量的总和',
       type: 'bar',
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
     {
       name: '目标产量的总和',
       type: 'bar',
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
     {
       name: '差额的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
          color: (params: any) => { // 使用回调函数来决定颜色c
          if (params.value <0 ) {
            return 'red'; // 绿色
          } 
          return '#f7cb64'; // 默认颜色
        },
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
     {
       name: '达成率',
       type: 'line',
       yAxisIndex: 1,
       itemStyle: {
         normal: { 
           label: { 
             show: true, 
             color: '#fff', 
             position: 'bottom' ,
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

 option1R.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   title: {
    text: '厂区达成率', // 设置标题文本
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
       rotate: 0,
       formatter:  (value:any) => {
     // 在遇到左括号时插入换行符
     return value.replace(/\(/g, '\n(');
   },
   padding: [15, 100],
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

 option2R.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   title: {
    text: '部门达成率', // 设置标题文本
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
       rotate: 0,
       formatter:  (value:any) => {
     // 在遇到左括号时插入换行符
     return value.replace(/\(/g, '\n(');
   },
   padding: [15, 100],
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

 option3R.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   title: {
    text: '工作中心达成率', // 设置标题文本
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
       rotate: 0,
       formatter:  (value:any) => {
     // 在遇到左括号时插入换行符
     return value.replace(/\(/g, '\n(');
   },
   padding: [15, 100],
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

 const tt =  ref<any>([]);
 option4.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   legend: {
      top: 25,
      textStyle: {
        color: '#fff',
      },
    },
   title: tt.value,
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
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
   {
     type: 'value',
     position: 'right',
     axisLabel: {

       formatter: (params: any) => {
         if (params) {
           return `${params.toFixed(2)}%`;
         }
         return '';
       },
     },
     min: -10,
						max: 120,
				
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
       name: '实际产量的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
           label: { 
            textStyle: {
                fontSize: 11, // 设置字体大小
                
            },
             show: true, 
             color: '#fff', 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${(params.value/1000).toFixed(2)}千`;
             }
             return '';
           },
           rotate: 45 
           } 
         },
       },
      data: [],
    
     },
     {
       name: '目标产量的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
           label: { 
            textStyle: {
                fontSize: 11, // 设置字体大小
                
            },
             show: true, 
             color: '#fff', 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${(params.value/1000).toFixed(2)}千`;
             }
             return '';
           },
           rotate: 45 
           } 
         },
       },
       data: [],
      
     },
     {
       name: '差额的总和',
       type: 'bar',
       itemStyle: {
         normal: { 
          color: (params: any) => { // 使用回调函数来决定颜色c
          if (params.value <0 ) {
            return 'red'; // 绿色
          } 
          return '#f7cb64'; // 默认颜色
        },
           label: { 
             textStyle: {
                fontSize: 11, // 设置字体大小
                
            },
             show: true, 
             color: '#fff', 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${(params.value/1000).toFixed(2)}千`;
             }
             return '';
           },
           rotate: 45 
           } 
         },
       },
       data: [],
      
     },
     {
       name: '达成率',
       type: 'line',
       yAxisIndex: 1,
       itemStyle: {
         normal: { 
           label: { 
             show: true, 
             color: '#fff', 
             position: 'bottom' ,
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
 

 const tt2 =  ref<any>([]);
 const s =  ref<any>([]);
 option4R.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   legend: {
    left: 20, // 将图例放置在左侧，这里的数值代表距离容器左侧的距离
    top: 20, // 根据需求调整向下偏移的距离
     textStyle: {
       color: '#fff',
     },
   },
   title: tt2.value,
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
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
 series: s,
 };

 const ttR =  ref<any>([]);
 option4Rate.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   title: ttR.value,
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
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

 const tt2R =  ref<any>([]);
 const s2 =  ref<any>([]);
 option4Rate2.value = {
   
   tooltip: {
     trigger: 'axis',
   },
   legend: {
    left: 20, // 将图例放置在左侧，这里的数值代表距离容器左侧的距离
    top: 20, // 根据需求调整向下偏移的距离
     textStyle: {
       color: '#fff',
     },
   },
   title: tt2R.value,
   xAxis: {
     type: 'category',
     boundaryGap: true,
     data: [],
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
 series: s2,
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
  PlintOutputShow.value =true;
  PlintRateShow.value = false;
  DeptOutputShow.value =true;
  DeptRateShow.value = false;
  if(formModel.value.type_OutputRate==="Rate")
    {
      exportPlantshow.value = false;
      exportDeptshow.value = false;
      exportGroupshow.value = false;
    }
    else if(suoxiao.value===true)
    {
      exportPlantshow.value = false;
      exportDeptshow.value = false;
      exportGroupshow.value = false;
    }
    else
    {
      exportPlantshow.value = true;
      exportDeptshow.value = true;
      exportGroupshow.value = true;
    }
  await searchPDG();

}

async function searchRate()
{ 
  errorMessage.value = '';
  const btnRate =  document.getElementById("searchRate") as HTMLButtonElement;
  btnRate.className = 'button  button3';
  const btnOutput =  document.getElementById("searchOutput") as HTMLButtonElement;
  btnOutput.className = 'button  button2'; 
  formModel.value.type_OutputRate = 'Rate';
  PlintOutputShow.value =false;
  PlintRateShow.value = true;
  DeptOutputShow.value =false;
  DeptRateShow.value = true;
  await searchPDG();

}

async function searchByPROCESS(params:any)
{ 
  hidPlantNow.value = '';
  hidDeptNow.value= '';
  hidgroupNow.value=''
  console.log(params)
  errorMessage.value = '';
  formModel.value.PROCESS_NO = params;
  await searchPDG();
}

async function searchByOrg(params:any)
{ 
  console.log(params)
  errorMessage.value = '';
  formModel.value.org_id = params;
  hidPlantNow.value = '';
  console.log(9999+hidPlantNow.value.length)
  hidDeptNow.value= '';
  hidgroupNow.value= '';
  clickchart.value = '';
  await searchPDG();

}

const clickchart = ref<any>([]);
async function searchBystartdate(params:any)
{ 
  if(formModel.value.startdate==='' || formModel.value.startdate===undefined)
  {
    errorMessage.value ="开始日期不能为空";
    return;
  }
  if(formModel.value.enddate==='' || formModel.value.enddate===undefined)
  {
    errorMessage.value ="结束日期不能为空";
    return;
  }
  if(formModel.value.startdate > formModel.value.enddate)
  {
    errorMessage.value ="开始日期不能大于结束日期";
    return;
  }

  console.log(params)
  errorMessage.value = '';
  formModel.value.startdate = params;
  await searchPDG();
  
}

async function searchByenddate(params:any)
{ 
  if(formModel.value.startdate==='' || formModel.value.startdate===undefined)
  {
    errorMessage.value ="开始日期不能为空";
    return;
  }
  if(formModel.value.enddate==='' || formModel.value.enddate===undefined)
  {
    errorMessage.value ="结束日期不能为空";
    return;
  }
  if(formModel.value.startdate > formModel.value.enddate)
  {
    errorMessage.value ="开始日期不能大于结束日期";
    return;
  }

  console.log(params)
  errorMessage.value = '';
  formModel.value.enddate = params;
  await searchPDG();

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
  if(formModel.value.type_OutputRate==='Output')
  {
    if(clickchart.value === 'Group')
    {
      await searchYearOutputByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchYearOutputByDept();
    }
    else 
    {
      await searchYearOutputByPlint();
    }
  }
  else  if(formModel.value.type_OutputRate==='Rate')
  {
    if(clickchart.value === 'Group')
    {
      await searchYearRateByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchYearRateByDept();
    }
    else 
    {
      await searchYearRateByPlant();
    }
  }
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
  if(formModel.value.type_OutputRate==='Output')
  {
    if(clickchart.value === 'Group')
    {
      await searchSeasonOutputByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchSeasonOutputByDept();
    }
    else 
    {
      await searchSeasonOutputByPlint();
    }
  }
  else  if(formModel.value.type_OutputRate==='Rate')
  {
    if(clickchart.value === 'Group')
    {
     await searchSeasonRateByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
       await searchSeasonRateByDept();
    }
    else 
    {
      await searchSeasonRateByPlant();
    }
  }
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
  if(formModel.value.type_OutputRate==='Output')
  {
    if(clickchart.value === 'Group')
    {
      await searchMonthOutputByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchMonthOutputByDept();
    }
    else 
    {
      await searchMonthOutputByPlint();
    }
  }
  else  if(formModel.value.type_OutputRate==='Rate')
  {
    if(clickchart.value === 'Group')
    {
      await searchMonthRateByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchMonthRateByDept();
    }
    else 
    {
      await searchMonthRateByPlant();
    }
  }
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
  if(formModel.value.type_OutputRate==='Output')
  {
    if(clickchart.value === 'Group')
    {
      await searchWeekOutputByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchWeekOutputByDept();
    }
    else 
    {
      await searchWeekOutputByPlint();
    }
  }
  else  if(formModel.value.type_OutputRate==='Rate')
  {
    if(clickchart.value === 'Group')
    {
       await searchWeekRateByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchWeekRateByDept();
    }
    else 
    {
      await searchWeekRateByPlant();
    }
  }
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
  if(formModel.value.type_OutputRate==='Output')
  {
    if(clickchart.value === 'Group')
    {
      await searchDayOutputByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchDayOutputByDept();
    }
    else 
    {
      await searchDayOutputByPlint();
    }
  }
  else  if(formModel.value.type_OutputRate==='Rate')
  {
    if(clickchart.value === 'Group')
    {
      await searchDayRateByGroup();
    }
    else  if(clickchart.value === 'Dept')
    {
      await searchDayRateByDept();
    }
    else 
    {
      await searchDayRateByPlant();
    }
  }
}

// async function exportData()
// { 
  
//     try 
//     {
//         const data = await GetTodayInOutRecord(formModel.value);
//         console.log(data.list)

//         const columnNames = Object.keys(data.list[0]);

//         const twoDimensionalArrayWithHeader = [columnNames];

//         // 将所有行的数据添加到数组中
//         data.list.forEach(row => {
//           twoDimensionalArrayWithHeader.push(Object.values(row));
//         });
//         const workbook = XLSX.utils.book_new();
//         const worksheet = XLSX.utils.aoa_to_sheet(twoDimensionalArrayWithHeader, { cellStyles: true });
//         worksheet['!cols'] = [{ // 设置单元格宽度
//                 wpx: 120
//             }, {
//                 wpx: 100
//             }, {
//                 wpx: 100
//             }]

//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet2');
//         // 获取当前时间并格式化
//         const year1 = new Date().getFullYear();
//         const Month1 = 
//           (new Date().getMonth() + 1).toLocaleString().length > 1
//           ? (new Date().getMonth() + 1)
//             : `0${(new Date().getMonth() + 1)}`;
//         const day1 = 
//           new Date().getDate().toLocaleString().length > 1
//           ? new Date().getDate()
//             : `0${new Date().getDate()}`;
//         const Hour1 =
//           new Date().getHours().toLocaleString().length > 1
//             ? new Date().getHours()
//             : `0${new Date().getHours()}`;
//         const Minute1 =
//           new Date().getMinutes().toLocaleString().length > 1
//             ? new Date().getMinutes()
//             : `0${new Date().getMinutes()}`;
//         const Second1 =
//           new Date().getSeconds().toLocaleString().length > 1
//             ? new Date().getSeconds()
//             : `0${new Date().getSeconds()}`;
//       const formattedDate = `${year1}${Month1}${day1}${Hour1}${Minute1}${Second1}`;
//         // 将时间字符串拼接到文件名中
//         const fileName = `产量报表_${formattedDate}.xlsx`;
//         XLSX.writeFile(workbook, fileName) // 导出

       
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }



async function ClickPlint(params:any)
{
   clickchart.value = 'Plant';
  if(params.name && formModel.value.type_OutputRate==='Output')
  {
    hidPlantNow.value = params.name
    formModel.value.Plant = params.name
    hidDeptNow.value = '';
    await searchDeptOutput();

    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDayOutputByPlint();
        break;
      case'Week':
        await searchWeekOutputByPlint();
        break;
      case'Month':
      await searchMonthOutputByPlint();
      break;
      case'Season':
      await searchSeasonOutputByPlint();
      break;
      case'Year':
      await searchYearOutputByPlint();
      break;
        default:
      
    }
    console.log(hidDeptxAxis.value)
    console.log(hidDeptNow.value )
    await searchGroupOutput();
    console.log(hidGroupxAxis.value)
    console.log(hidgroupNow.value )
  }
  else if(params.name && formModel.value.type_OutputRate==='Rate')
  {
    hidPlantNow.value = params.name
    formModel.value.Plant = params.name
    hidDeptNow.value = '';
    await searchDeptRate();
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDayRateByPlant();
        break;
      case'Week':
        await searchWeekRateByPlant();
        break;
      case'Month':
      await searchMonthRateByPlant();
      break;
      case'Season':
      await searchSeasonRateByPlant();
      break;
      case'Year':
      await searchYearRateByPlant();
      break;
        default:
      
    }
    console.log(hidDeptxAxis.value)
    console.log(hidDeptNow.value )
    await searchGroupRate();
    console.log(hidGroupxAxis.value)
    console.log(hidgroupNow.value )
  }
}

async function ClickDept(params:any)
{
  clickchart.value = 'Dept';
  if(params.name && formModel.value.type_OutputRate==='Output')
  {
    hidDeptNow.value = params.name
    formModel.value.Dept = params.name
    await searchGroupOutput();
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDayOutputByDept();
        break;
      case'Week':
        await searchWeekOutputByDept();
        break;
      case'Month':
      await searchMonthOutputByDept();
      break;
      case'Season':
      await searchSeasonOutputByDept();
      break;
      case'Year':
      await searchYearOutputByDept();
      break;
        default:
      
    }
    console.log(hidGroupxAxis.value)
    console.log(hidgroupNow.value )
  }
  else if(params.name && formModel.value.type_OutputRate==='Rate')
  {
    hidDeptNow.value = params.name
    formModel.value.Dept = params.name
    await searchGroupRate();
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDayRateByDept();
        break;
      case'Week':
        await searchWeekRateByDept();
        break;
      case'Month':
      await searchMonthRateByDept();
      break;
      case'Season':
      await searchSeasonRateByDept();
      break;
      case'Year':
      await searchYearRateByDept();
      break;
        default:
      
    }
    console.log(hidGroupxAxis.value)
    console.log(hidgroupNow.value )
  }
}

async function  ClickGroup(params:any)
{
  clickchart.value = 'Group';
  if(params.name && formModel.value.type_OutputRate==='Output')
  {
    hidgroupNow.value = params.name
    formModel.value.Group = params.name
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDayOutputByGroup();
        break;
      case'Week':
        await searchWeekOutputByGroup();
        break;
      case'Month':
      await searchMonthOutputByGroup();
      break;
      case'Season':
      await searchSeasonOutputByGroup();
      break;
      case'Year':
      await searchYearOutputByGroup();
      break;
        default:
      
    }
    console.log(hidGroupxAxis.value)
    console.log(hidgroupNow.value )
  }
  else if(params.name && formModel.value.type_OutputRate==='Rate')
  {
    hidgroupNow.value = params.name
    formModel.value.Group = params.name
    switch(formModel.value.type_Time)
    {
      case'Day':
        await searchDayRateByGroup();
        break;
      case'Week':
        await searchWeekRateByGroup();
        break;
      case'Month':
      await searchMonthRateByGroup();
      break;
      case'Season':
      await searchSeasonRateByGroup();
      break;
      case'Year':
      await searchYearRateByGroup();
      break;
        default:
      
    }
    console.log(hidGroupxAxis.value)
    console.log(hidgroupNow.value )
  }
}


async function exportPlantData()
{ 
  
    try 
    { 
        const PlantData = await GetExportPlantData(formModel.value);
        console.log(PlantData.list)

        const workbook = new ExcelJS.Workbook();
  // 添加工作表，名为sheet1
  const sheet1 = workbook.addWorksheet("sheet1");
  // 导出数据列表
  const data = PlantData.list
  // 获取表头所有键
  const headers = Object.keys(data[0])
  // 将标题写入第一行
  sheet1.addRow(headers);
  // 将数据写入工作表
  data.forEach((row) => {
    const values = Object.values(row)
    sheet1.addRow(values);
  });
  // 修改所有单元格样式
  // 假设我们要查找的值是 "特定值"
const targetValue = "TOTAL";
const rowsToColor =  ref<any>([]); ; // 用来记录需要改变背景色的行号
  let lastRowNumber = 0; // 用于记录最后一行的行号

// 遍历每一行，并记录最后一行的行号
sheet1.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  lastRowNumber = rowNumber; // 更新最后一行的行号

  let shouldColorRow = false;
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = {
      name: 'Arial',
     };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
    if (cell.text === targetValue) {
      shouldColorRow = true;
    }
  });

  if (shouldColorRow) {
    rowsToColor.value.push(rowNumber);
  }
});

// 遍历需要改变颜色的行号，设置整行背景颜色
rowsToColor.value.forEach((rowNumber:any) => {
  sheet1.getRow(rowNumber).eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '20c5ee' } // 特定值对应的颜色
    };
  });
});

// 单独处理最后一行的背景颜色
sheet1.getRow(lastRowNumber).eachCell({ includeEmpty: true }, (cell) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '00b050' } // 最后一行的颜色，替换为所需颜色代码
  };
});
  // 获取标题行数据
  const titleCell = sheet1.getRow(1);
  // 设置行高为30
  titleCell.height = 30
  // 设置标题行单元格样式
  titleCell.eachCell((cell) => {
    // 设置标题行背景颜色为黄色
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FFFF00'}
    };
    // 设置标题行字体
    cell.font = {
      color: {argb: 'FF0000'}, // 颜色为红色
      bold: true,// 字体粗体
      size: 15 // 设置字体大小为18
    };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
  })
  sheet1.columns.forEach(column => {
   
      column.width = 20;

  });
  const year1 = new Date().getFullYear();
        const Month1 = 
          (new Date().getMonth() + 1).toLocaleString().length > 1
          ? (new Date().getMonth() + 1)
            : `0${(new Date().getMonth() + 1)}`;
        const day1 = 
          new Date().getDate().toLocaleString().length > 1
          ? new Date().getDate()
            : `0${new Date().getDate()}`;
        const Hour1 =
          new Date().getHours().toLocaleString().length > 1
            ? new Date().getHours()
            : `0${new Date().getHours()}`;
        const Minute1 =
          new Date().getMinutes().toLocaleString().length > 1
            ? new Date().getMinutes()
            : `0${new Date().getMinutes()}`;
        const Second1 =
          new Date().getSeconds().toLocaleString().length > 1
            ? new Date().getSeconds()
            : `0${new Date().getSeconds()}`;
      const formattedDate = `${year1}${Month1}${day1}${Hour1}${Minute1}${Second1}`;
        // 将时间字符串拼接到文件名中
        const fileName = `厂区产量报表_${formattedDate}.xlsx`;
  // 导出表格文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    const file = new Blob([buffer], {type: "application/octet-stream"});
    FileSaver.saveAs(file, fileName);
  }).catch(error => console.log('Error writing excel export', error))

       
    } catch (error) {
      errorMessage.value = (error as Error).message;
    }
}

async function exportDeptData()
{ 
  
    try 
    { 
        const DeptData = await GetExportDeptData(formModel.value);
        console.log(DeptData.list)


        const workbook = new ExcelJS.Workbook();
  // 添加工作表，名为sheet1
  const sheet1 = workbook.addWorksheet("sheet1");
  // 导出数据列表
  const data = DeptData.list
  // 获取表头所有键
  const headers = Object.keys(data[0])
  // 将标题写入第一行
  sheet1.addRow(headers);
  // 将数据写入工作表
  data.forEach((row) => {
    const values = Object.values(row)
    sheet1.addRow(values);
  });
  // 修改所有单元格样式
  // 假设我们要查找的值是 "特定值"
const targetValue = "TOTAL";
const rowsToColor =  ref<any>([]); ; // 用来记录需要改变背景色的行号
  let lastRowNumber = 0; // 用于记录最后一行的行号

// 遍历每一行，并记录最后一行的行号
sheet1.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  lastRowNumber = rowNumber; // 更新最后一行的行号

  let shouldColorRow = false;
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = {
      name: 'Arial',
     };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
    if (cell.text === targetValue) {
      shouldColorRow = true;
    }
  });

  if (shouldColorRow) {
    rowsToColor.value.push(rowNumber);
  }
});

// 遍历需要改变颜色的行号，设置整行背景颜色
rowsToColor.value.forEach((rowNumber:any) => {
  sheet1.getRow(rowNumber).eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '20c5ee' } // 特定值对应的颜色
    };
  });
});

// 单独处理最后一行的背景颜色
sheet1.getRow(lastRowNumber).eachCell({ includeEmpty: true }, (cell) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '00b050' } // 最后一行的颜色，替换为所需颜色代码
  };
});
  // 获取标题行数据
  const titleCell = sheet1.getRow(1);
  // 设置行高为30
  titleCell.height = 30
  // 设置标题行单元格样式
  titleCell.eachCell((cell) => {
    // 设置标题行背景颜色为黄色
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FFFF00'}
    };
    // 设置标题行字体
    cell.font = {
      color: {argb: 'FF0000'}, // 颜色为红色
      bold: true,// 字体粗体
      size: 15 // 设置字体大小为18
    };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
  })
  sheet1.columns.forEach(column => {
   
      column.width = 20;

  });
  const year1 = new Date().getFullYear();
        const Month1 = 
          (new Date().getMonth() + 1).toLocaleString().length > 1
          ? (new Date().getMonth() + 1)
            : `0${(new Date().getMonth() + 1)}`;
        const day1 = 
          new Date().getDate().toLocaleString().length > 1
          ? new Date().getDate()
            : `0${new Date().getDate()}`;
        const Hour1 =
          new Date().getHours().toLocaleString().length > 1
            ? new Date().getHours()
            : `0${new Date().getHours()}`;
        const Minute1 =
          new Date().getMinutes().toLocaleString().length > 1
            ? new Date().getMinutes()
            : `0${new Date().getMinutes()}`;
        const Second1 =
          new Date().getSeconds().toLocaleString().length > 1
            ? new Date().getSeconds()
            : `0${new Date().getSeconds()}`;
      const formattedDate = `${year1}${Month1}${day1}${Hour1}${Minute1}${Second1}`;
        // 将时间字符串拼接到文件名中
        const fileName = `部门产量报表_${formattedDate}.xlsx`;
  // 导出表格文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    const file = new Blob([buffer], {type: "application/octet-stream"});
    FileSaver.saveAs(file, fileName);
  }).catch(error => console.log('Error writing excel export', error))
       
    } catch (error) {
      errorMessage.value = (error as Error).message;
    }
}


async function exportGroupData()
{ 
    try 
    { 
        const GroupData = await GetExportGroupData(formModel.value);
        console.log(GroupData.list)


        const workbook = new ExcelJS.Workbook();
  // 添加工作表，名为sheet1
  const sheet1 = workbook.addWorksheet("sheet1");
  // 导出数据列表
  const data = GroupData.list
  // 获取表头所有键
  const headers = Object.keys(data[0])
  // 将标题写入第一行
  sheet1.addRow(headers);
  // 将数据写入工作表
  data.forEach((row) => {
    const values = Object.values(row)
    sheet1.addRow(values);
  });
  // 修改所有单元格样式
  // 假设我们要查找的值是 "特定值"
const targetValue = "TOTAL";
const rowsToColor =  ref<any>([]); ; // 用来记录需要改变背景色的行号
  let lastRowNumber = 0; // 用于记录最后一行的行号

// 遍历每一行，并记录最后一行的行号
sheet1.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  lastRowNumber = rowNumber; // 更新最后一行的行号

  let shouldColorRow = false;
  row.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = {
      name: 'Arial',
     };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
    if (cell.text === targetValue) {
      shouldColorRow = true;
    }
  });

  if (shouldColorRow) {
    rowsToColor.value.push(rowNumber);
  }
});

// 遍历需要改变颜色的行号，设置整行背景颜色
rowsToColor.value.forEach((rowNumber:any) => {
  sheet1.getRow(rowNumber).eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '20c5ee' } // 特定值对应的颜色
    };
  });
});

// 单独处理最后一行的背景颜色
sheet1.getRow(lastRowNumber).eachCell({ includeEmpty: true }, (cell) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '00b050' } // 最后一行的颜色，替换为所需颜色代码
  };
});
  // 获取标题行数据
  const titleCell = sheet1.getRow(1);
  // 设置行高为30
  titleCell.height = 30
  // 设置标题行单元格样式
  titleCell.eachCell((cell) => {
    // 设置标题行背景颜色为黄色
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FFFF00'}
    };
    // 设置标题行字体
    cell.font = {
      color: {argb: 'FF0000'}, // 颜色为红色
      bold: true,// 字体粗体
      size: 15 // 设置字体大小为18
    };
    cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
  })
  sheet1.columns.forEach(column => {
   
      column.width = 20;

  });
  const year1 = new Date().getFullYear();
        const Month1 = 
          (new Date().getMonth() + 1).toLocaleString().length > 1
          ? (new Date().getMonth() + 1)
            : `0${(new Date().getMonth() + 1)}`;
        const day1 = 
          new Date().getDate().toLocaleString().length > 1
          ? new Date().getDate()
            : `0${new Date().getDate()}`;
        const Hour1 =
          new Date().getHours().toLocaleString().length > 1
            ? new Date().getHours()
            : `0${new Date().getHours()}`;
        const Minute1 =
          new Date().getMinutes().toLocaleString().length > 1
            ? new Date().getMinutes()
            : `0${new Date().getMinutes()}`;
        const Second1 =
          new Date().getSeconds().toLocaleString().length > 1
            ? new Date().getSeconds()
            : `0${new Date().getSeconds()}`;
      const formattedDate = `${year1}${Month1}${day1}${Hour1}${Minute1}${Second1}`;
        // 将时间字符串拼接到文件名中
        const fileName = `工作中心产量报表_${formattedDate}.xlsx`;
  // 导出表格文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    const file = new Blob([buffer], {type: "application/octet-stream"});
    FileSaver.saveAs(file, fileName);
  }).catch(error => console.log('Error writing excel export', error))
}

       
    catch (error) {
      errorMessage.value = (error as Error).message;
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

 function suoxiaoDiv()
{
  cbig.value = false;
  cone.value=true;
  ctwo.value=true;
  suoxiao.value=false;
  if(formModel.value.type_OutputRate==="Rate")
    {
      exportPlantshow.value = false;
      exportDeptshow.value = false;
      exportGroupshow.value = false;
    }
    else if(suoxiao.value===true)
    {
      exportPlantshow.value = false;
      exportDeptshow.value = false;
      exportGroupshow.value = false;
    }
    else
    {
      exportPlantshow.value = true;
      exportDeptshow.value = true;
      exportGroupshow.value = true;
    }
}

function fangdaDiv()
{
  cbig.value = true;
  cone.value=false;
  ctwo.value=false;
  suoxiao.value=true;
  if(formModel.value.type_OutputRate==="Rate")
    {
      exportPlantshow.value = false;
      exportDeptshow.value = false;
      exportGroupshow.value = false;
    }
    else if(suoxiao.value===true)
    {
      exportPlantshow.value = false;
      exportDeptshow.value = false;
      exportGroupshow.value = false;
    }
    else
    {
      exportPlantshow.value = true;
      exportDeptshow.value = true;
      exportGroupshow.value = true;
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
