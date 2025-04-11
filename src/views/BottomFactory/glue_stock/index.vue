<template>
     <dv-full-screen-container class="full" v-show="true" >
   <VScaleScreen
   width="1920"
   height="1080"
   :full-screen="true"
   >  <Header
        :title="$t('Kanban.glue_stock_2')"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9' }"
        :right-style="{ color: 'white' }"
        style="height: 50px; "
      ></Header>
     
      <div class="container">
                    <a-row class="grid-demo"  style="margin: 90px 0vh;">
                    <a-col :span="4"  style="position: relative;">
                              <div
                                ><span style="color: white">工厂：</span>

                                <a-select
                                  v-model="formModel.org_id"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px;"
                                  @change="FunGetStocklist"
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
                            <a-col :span="4" class="a-col-demo">
                              <div
                                ><span style="color: white">仓库：</span>
                                <a-auto-complete
                                  v-model="formModel.WAREHOUSE_CODE"
                                  :data="Stocklist"
                                  :style="{ width: '200px' }"
                                  :allow-clear="true"
                                  strict
                                />
                              </div>
                            </a-col>
                            <a-col :span="3" class="a-col-demo">
                              <div >
                                <a-button
                                  type="primary"
                                  class="button55"
                                  @click="searchAll"                                
                                >
                                  <template #icon>
                                    <icon-search />
                                  </template>
                                  <template #default>搜索</template>
                                </a-button>
                              <a-button  class="button55" style="margin-left: 10px;" type="primary" @click="changePage" v-if="btnMsg=='手动模式'?true:false">切换页面</a-button>
                                
                              </div>
                            </a-col>
                            <a-col :span="7" class="a-col-demo">
                              <div style="color: red; margin-left: 30px;  font-size: 20px; text-align: left;">{{
                                    errorMessage
                                  }}</div>
                            </a-col>
                            <a-col :span="1">
                               <a-button
                                  type="primary"
                                  style="position: absolute;right: 0px"
                                  @click="autoMode"
                                  
                                >
                                  <template #icon>
                                    <icon-loop />
                                  </template>
                                  <div>{{ btnMsg }}</div>
                                </a-button>
                            </a-col>
                    </a-row>
                      <a-row class="grid-demo" style="margin: -105px 0vh;">
                        <!-- //第一列 -->
                        <a-col :span="12">
                          
                          <div class="one">
                        
                           
                           
                            <div class="one_top" style="margin: 27px 0px; display: flex;">
                              <a-card class="card-demo boder margin_10"
                              :title="'仓库库存分析'" 
                              style="font-size: small; width: 400px;">
                              <div demo-bg style="margin: 0 -10px 0 -10px;">
                                <dv-scroll-board :config="config"  style="height:450px;" class="A1" ref="scrollBoard1"/>
                              </div>
                              </a-card>
                              <a-card class="card-demo boder margin_10"
                              :title="'本月领料需求分析'" 
                              style="font-size: small;width: 530px;">
                              <div demo-bg style="margin: 0 -10px 0 -10px;">
                                <dv-scroll-board :config="config3"  style="height:409px;" class="A1" ref="scrollBoard2"/>
                                <dv-scroll-board :config="config4"  style="height:41px;" class="A1" ref="scrollBoard"/>
                              </div>
                            
                              </a-card>
                            </div>
                            <div class="one_bottom" style="margin: -1vh 0px">
                              <a-card
                                class="card-demo boder margin_10"
                                :title="'库存统计分析'" 
                                 style="font-size: small;">
                                 <div style="text-align: left; color: #00d3ee;">单位/KG</div>
                                 <div style="display: flex">
                                <div style="flex: 2">
                                  <div
                                    class="bg"
                                    style="
                                      height: 120px;
                                      width: 100%;
                                      margin: 20px 10px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                    <div style="display: flex">
                                      <div style="flex: 3; margin-left: -20px; margin-top: -3px;">
                                        <img
                                          src="@/assets/images/rk.png"
                                          style="height: 100px; width: 100px; margin: 1vh -5vh"
                                        />
                                      </div>
                                      <div style="flex: 3;margin-left: -30px;" >
                                        <h4 style="color: aquamarine; margin-bottom: 10px; font-size: 14px;">今日入库数</h4>
                                      <a-statistic
                                        title=""
                                        :value=DayInSum
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        class="B1"
                                        show-group-separator
                                      ></a-statistic>
                                      </div>                                    
                                    </div>
                                  </div>
                                  <div
                                    class="bg"
                                    style="
                                      height: 120px;
                                      width: 100%;
                                      margin: 20px 10px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                  <div style="display: flex">
                                      <div style="flex: 3; margin-left: -20px; margin-top: -3px;">
                                        <img
                                          src="@/assets/images/rk.png"
                                          style="height: 100px; width: 100px; margin: 1vh -5vh"
                                        />
                                      </div>
                                      <div style="flex: 3;margin-left: -30px;" >
                                        <h4 style="color: aquamarine; margin-bottom: 10px;font-size: 14px;">本月入库数</h4>
                                      <a-statistic
                                        title=""
                                        :value=MonthInSum
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        class="B1"
                                        show-group-separator
                                      ></a-statistic>
                                      </div>
                                     
                                    </div>
                                  </div>
                                </div>
                                <div style="flex: 2">
                                  <div
                                    class="bg"
                                    style="
                                      height: 120px;
                                      width: 100%;
                                      margin: 20px 30px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                  <div style="display: flex">
                                      <div style="flex: 3; margin-left: -20px; margin-top: -3px;">
                                        <img
                                          src="@/assets/images/ck.png"
                                          style="height: 100px; width: 100px; margin: 1vh -5vh"
                                        />
                                      </div>
                                      <div style="flex: 3;margin-left: -30px;" >
                                        <h4 style="color: aquamarine; margin-bottom: 10px;font-size: 14px;">今日出库数</h4>
                                      <a-statistic
                                        title=""
                                        :value=DayOutSum
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        class="B1"
                                        show-group-separator
                                      ></a-statistic>
                                      </div>
                                     
                                    </div>
                                  </div>
                                  <div
                                    class="bg"
                                    style="
                                      height: 120px;
                                      width: 100%;
                                      margin: 20px 30px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                  <div style="display: flex">
                                      <div style="flex: 3; margin-left: -20px; margin-top: -3px;">
                                        <img
                                          src="@/assets/images/ck.png"
                                          style="height: 100px; width: 100px; margin: 1vh -5vh"
                                        />
                                      </div>
                                      <div style="flex: 3;margin-left: -30px;" >
                                        <h4 style="color: aquamarine; margin-bottom: 10px;font-size: 14px;">本月出库数</h4>
                                      <a-statistic
                                        title=""
                                        :value=MonthOutSum
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        class="B1"
                                        show-group-separator
                                      ></a-statistic>
                                      </div>
                                     
                                    </div>
                                  </div>
                                </div>
                                <div style="flex: 3;width: 100px;">
                                  <div
                                    class="bg"
                                    style="
                                      height: 250px;
                                      width:85%;
                                      margin: 26px 50px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                  <div style="display: flex;">
                                      <div style="flex: 2; margin-left: -20px;" >
                                        <img
                                          src="@/assets/images/kc.png"
                                          style="height: 150px; width: 150px; margin: 30px -50px"
                                        />
                                      </div>
                                      <div style="flex: 2;margin-left: -50px;" >
                                        <h2 style="color: aquamarine; margin: 50px 0;">当前库存数</h2>
                                      <a-statistic
                                        title=""
                                        :value=StockSum
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        show-group-separator
                                      ></a-statistic>
                                      </div>
                                     
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </a-card>
                            </div>
                          </div>
                        </a-col>
                        <!-- //第二列 -->
                        <a-col :span="12">
                          <div class="two" >
                           
                            <div class="two_top" style="margin: 27px 0px">
                              <a-card class="card-demo boder margin_10" 
                              :title="'材料库存状态分析'" 
                              style="font-size: small;">

                              <div style="display: flex">
                               
                                <div style="flex: 9.8;width: 700px;">
                                  <div
                                    class="bg"
                                    style="
                                      height: 42vh;
                                      width: 102%;
                                      background-color: rgba(255,255,255,0);
                                     margin: 0 -10px 0 -10px;
                                    "
                                  >
                                  
                                    <dv-scroll-board :config="config2"  style="height:450px;width: 99%;" class="A2" />
                                 
                                  </div>
                                </div>
                                <div style="flex: 2.2;width: 230px;">
                                  <h3  style="
                                      margin: -5px 5px;color: #00d3ee; font-size: x-large;">实时预警</h3>
                                  <div
                                    class="bg"
                                    style="
                                      height: 140px;
                                      width: 99%;
                                      margin: 5px 5px;
                                      border-radius: 50%;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                    "
                                  >
                                    <div>
                                      <img
                                          src="@/assets/images/yj.png"
                                          style="height: 90px; width: 120px; margin: 20px 0"
                                        />
                                    
                                    </div>
                                  </div>
                                  <div
                                    class="bg"
                                    style="
                                      height: 125px;
                                      width: 95%;
                                      margin: 10px 5px;
                                      margin-bottom: 15px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                    <div>
                                     
                                      <h4 style="color: aquamarine; margin-bottom: 10px; font-size: 16px;" >即将过期材料</h4>
                                      <a-statistic
                                        title=""
                                        :value=Expiring
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        class="C1"
                                        show-group-separator
                                      ></a-statistic>
                                     
                                    </div>
                                  </div>
                                  <div
                                    class="bg"
                                    style="
                                      height: 125px;
                                      width: 95%;
                                      margin: -5px 5px;
                                      border: 2px solid #00baff;
                                      background-color: rgba(255,255,255,0);
                                      border-radius: 10%;
                                    "
                                  >
                                    <div>
                                      <h4 style="color: aquamarine; margin-bottom: 10px;font-size: 16px;" >已过期材料</h4>
                                      <a-statistic
                                        title=""
                                        :value=Expired
                                        :precision="2"
                                        :value-from="0"
                                        :start="true"
                                        animation
                                        class="C2"
                                        show-group-separator
                                      ></a-statistic>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </a-card>
                            </div>
                            <div class="two_bottom" style="margin: -10px 0px">
                              <a-card
                                class="card-demo boder margin_10"
                                :title="'每日进出仓统计分析'" 
                              style="font-size: small;">
                              
                              <div style="margin: -10px 70px; ">
                                      <VCharts
                                        :option="option1"
                                        style="
                                          height: 300px;
                                          width: 900px;
                                          padding-top: 8px;
                                          margin-left: -70px;
                                        "
                                      ></VCharts
                                    ></div>
                              </a-card>
                            </div>
                          </div>
                        </a-col>
                      </a-row>
                    </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, reactive, onBeforeMount } from 'vue';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';
  import { Getorg } from '@/api/kanbandevicea';
  import VCharts from 'vue-echarts';
  import VScaleScreen from 'v-scale-screen';
  // import { useI18n } from 'vue-i18n';
  import useUserStore from '@/store/modules/user/index';
  import router from '@/router';
  import Header from '@/components/header/index.vue';
  import {
    GetTodayInOutRecord,
    GetstockRecord,
    GetWarningData,
    GetDayInOutSum,
    GetMonthInOutSum,
    GetStockSum,
    GetDailyInOutSumData,
    GetStocklist,
    GetMonthPickData,
  } from '@/api/BottomFactory';


  const userStore = useUserStore();
  const generateFormModel = () => {
    return {
      org_id: '',
      WAREHOUSE_CODE:''
    };
  };
  const { loading } = useLoading();
  const orgList = ref<any>([]);
  const formModel = ref(generateFormModel());
  const localdate = ref<any>([]);
  const timeNow = ref('');
  const option1 = ref<any>([]);
  const config  = ref<any>([]);
  const config2 = ref<any>([]);
  const config3 = ref<any>([]);
    const config4 = ref<any>([]);
  const InOutRecord = ref<any>([]);
  const stockrecord = ref<any>([]);
  const Expired = ref<any>([]);
  const Expiring = ref<any>([]);
  const DayOutSum = ref<any>([]);
  const DayInSum = ref<any>([]);
  const MonthOutSum = ref<any>([]);
  const MonthInSum = ref<any>([]);
  const StockSum = ref<any>([]);
  const Stocklist = ref<any>([]);
  const PickData = ref<any>([]);
  const scrollBoard1 = ref<InstanceType<any>>(null);
  const scrollBoard2 = ref<InstanceType<any>>(null);
  const errorMessage = ref('');
  let timer:any = 1;
  const btnMsg = ref('自动模式');

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
    const element = document.documentElement;
     element.requestFullscreen();
    // 读取缓存数据
    const getLocalorg = window.sessionStorage.getItem('org_code');
    const getLocaldate = window.sessionStorage.getItem('selectdate');
    console.log(getLocaldate);
    formModel.value.org_id = '';
    formModel.value.WAREHOUSE_CODE = '';
    const obj = {
      starttime: '',
      endtime: '',
    };
      obj.starttime = moment(moment().startOf('day').valueOf()).format(
        'YYYY-MM-DD'
      );
      obj.endtime = moment(moment().valueOf()).format('YYYY-MM-DD');

      // console.log(range);
    }
  );
 
  config.value = reactive({
  header: ['配方',  '今日进仓', '今日出仓', '库存数'],
  data:[],
    index: false,
  columnWidth: [100,100,100,100],
  align: ['center','center','center','center'],
  rowNum:[10],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,

  
});
config2.value = reactive({
  header: ['储位', '批次',  '配方号',  '库存数', '单位','状态', '进仓日期', '到期日期'],
  data: [],
  index: false,
  columnWidth: [70,118,67,75,70,70,115,115],
  align: ['center','center','center','center','center','center','center','center'],
  rowNum:[10],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,
})

config3.value = reactive({
  header: ['配方',  '工单需求数', '增补需求数', '已领数', '未领数'],
  data:[],
    index: false,
  columnWidth: [88,110,100,110,110],
  align: ['center','center','center','center','center'],
  rowNum:[9],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,

  
});

config4.value = reactive({
 // header: ['配方',  '工单需求数', '增补需求数', '已领数', '未领数'],
  data:[],
    index: false,
  columnWidth: [85,110,100,110,110],
  align: ['center','center','center','center','center'],
  rowNum:[1],
  indexHeader:['序号'],
  waitTime:300000000,
  hoverPause:false,
  evenRowBGC:'#666666',
  
});

  let timerlist: any = 1;
  timerlist = window.setInterval(() => {
    console.log('定时器查询列表。');
    // window.clearInterval(timerlist);
    searchAll()
  }, 5 * 60 * 1000);

  const getorglist = async () => {
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  };
  const FunGetStocklist = async () => {
    // setLoading(true);
    try {
      Stocklist.value.length = 0;
      const vdata: any = await GetStocklist(formModel.value);
      const wdata = JSON.parse(JSON.stringify(vdata.list));
      wdata.forEach((val: any) => {
        const str = `${val.WAREHOUSE_CODE}|${val.WAREHOUSE_NAME}`;
        Stocklist.value.unshift(str);
        // console.log(str);
      });
      formModel.value.WAREHOUSE_CODE = '';
      console.log(Stocklist);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };

  onMounted(async () => {
    try {
      getorglist();  
      formModel.value.org_id = '1002';
      const vdata: any = await GetStocklist(formModel.value);
      const wdata = JSON.parse(JSON.stringify(vdata.list));
      wdata.forEach((val: any) => {
        const str = `${val.WAREHOUSE_CODE}|${val.WAREHOUSE_NAME}`;
        Stocklist.value.unshift(str);
        // console.log(str);
      });
      formModel.value.WAREHOUSE_CODE = '4000|片料仓';    
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
    searchAll()
  });
  
  function setLocal() {
    // 缓存条件在浏览器
   
   
  }

  const { setLoading } = useLoading();
  const search = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const todayinoutrecord = await GetTodayInOutRecord(formModel.value);
      console.log(todayinoutrecord.list)
      InOutRecord.value = JSON.parse(JSON.stringify(todayinoutrecord.list));
      console.log(InOutRecord.value)
      const dt1:any = [];
      InOutRecord.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow:any = [];
          Object.keys(row).forEach((key: any) => {
          // console.log(key)
          // console.log(row[key])
          if(key==='库存数')
          {
            dtrow.push(`<span">${parseFloat(row[key]).toLocaleString('en-US')}</span>`)
          }
          else{
            dtrow.push(row[key])
          }
         
          // console.log(dtrow)
          }
          );
          dt1.push(dtrow)
         
      } 
      ); 


      config.value.data = [];
      config.value.data = dt1;
      
      if (scrollBoard1.value && dt1.length > 0) {
          // 此处可以传第二个参数 index，指定下次滚动的起始行
          scrollBoard1.value.updateRows(dt1[0], 0);
        }
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search2 = async () => {
    setLoading(true);
    try {
      
      setLocal();

      const todaystockrecord = await GetstockRecord(formModel.value);
      console.log(todaystockrecord.list)
      stockrecord.value = JSON.parse(JSON.stringify(todaystockrecord.list));  
      const dt2:any = [];
      stockrecord.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow2:any = [];
          Object.keys(row).forEach((key: any) => {
          // console.log(key)
          // console.log(row[key])
          if(row[key]==='已过期')
          {
            dtrow2.push(`<span style="color: #FF3352;">${row[key]}</span>`)
          }
          else if(row[key]==='临期')
          {
            dtrow2.push(`<span style="color: #FFC433;">${row[key]}</span>`)
          }
          else{
            dtrow2.push(row[key])
          }
        
          // console.log(dtrow)
          }
          );
          dt2.push(dtrow2)
         
      } 
      ); 
     
      console.log(dt2.length)
      console.log(config2.value.data.length)
      config2.value.data = [];
      config2.value.data = dt2;

    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search3 = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const WarningData = await GetWarningData(formModel.value);
      console.log(WarningData.list)
      Expiring.value = WarningData.list[0].STOC_QTY;
      Expired.value = WarningData.list[1].STOC_QTY;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search4 = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const DayInOutSum = await GetDayInOutSum(formModel.value);
      console.log(DayInOutSum.list)
      DayOutSum.value = DayInOutSum.list[0].QTY;
      DayInSum.value = DayInOutSum.list[1].QTY;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search5 = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const MonthInOutSum = await GetMonthInOutSum(formModel.value);
      console.log(MonthInOutSum.list)
      MonthOutSum.value = MonthInOutSum.list[0].QTY;
      MonthInSum.value = MonthInOutSum.list[1].QTY;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search6 = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const StockSumData = await GetStockSum(formModel.value);
      console.log(StockSumData.list)
      StockSum.value = StockSumData.list[0].STOC_QTY;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const search7 = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const DailyInOutSumData :any= await GetDailyInOutSumData(formModel.value);
      option1.value.xAxis.data = DailyInOutSumData.list.Xlist;
      option1.value.series[0].data = DailyInOutSumData.list.Ylist1;
      option1.value.series[1].data = DailyInOutSumData.list.Ylist2;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
 
  const search8 = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const MonthPickData :any= await GetMonthPickData(formModel.value);
     // console.log(MonthPickData.list)
      PickData.value = JSON.parse(JSON.stringify(MonthPickData.list?.dataTable1));
     // console.log(PickData.value)
      const dt1:any = [];
      PickData.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow:any = [];
          Object.keys(row).forEach((key: any) => {
          // console.log(key)
          // console.log(row[key])
          if(key==='工单需求数'||key==='增补需求数'||key==='已领数'|| key==='未领数')
          {
            dtrow.push(`<span">${parseFloat(row[key]).toLocaleString('en-US')}</span>`)
          }
          else{
            dtrow.push(row[key])
          }
         
          // console.log(dtrow)
          }
          );
          dt1.push(dtrow)
         
      } 
      ); 

     // console.log(dt1.length)
     // console.log(config.value.data.length)
      config3.value.data = [];
      config3.value.data = dt1;

      if (scrollBoard2.value && dt1.length > 0) {
          // 此处可以传第二个参数 index，指定下次滚动的起始行
          scrollBoard2.value.updateRows(dt1[0], 0);
        }

      PickData.value = JSON.parse(JSON.stringify(MonthPickData.list?.dataTable2));

      const dt2:any = [];
      PickData.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow:any = [];
          Object.keys(row).forEach((key: any) => {
          // console.log(key)
          // console.log(row[key])
          if(key==='工单需求数总和'||key==='增补需求数总和'||key==='已领数总和'|| key==='未领数总和')
          {
            dtrow.push(`<span">${parseFloat(row[key]).toLocaleString('en-US')}</span>`)
          }
          else{
            dtrow.push(row[key])
          }
         
          // console.log(dtrow)
          }
          );
          dt2.push(dtrow)
         
      } 
      ); 

     // console.log(dt1.length)
     // console.log(config.value.data.length)
      config4.value.data = [];
      config4.value.data = dt2;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
 

  // 组件卸载时，清除定时器
  onUnmounted(() => {
    window.clearInterval(timerlist);   
    window.clearInterval(timer2);
   // document.exitFullscreen();
  });


  option1.value = {
   
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 20,
      left: '80%',
      textStyle: {
        color: '#fff',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
        formatter: (params: any) => {
          if (params) {
            return `${params.substring(5, params.length)}`;
          }
          return '';
        },
      },
    },
    yAxis: {
      name:'单位/KG',
      nameLocation :'end',
      nameTextStyle:
      {
        color:'#00d3ee',
        fontSize:14,

      },
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
        name: '进仓',
        type: 'line',
        smooth: true,
       // data: ['300','400','500','200','600','480','856','222','300','400','500','435','600','480','333','777','300','400','500','200','600','480','333','222','300','400','500','200','600','480','333'],
       data: [],
       itemStyle: {
          normal: { label: { show: false, color: '#00d3ee' } },
        },
       
        lineStyle: { width: 2, color: '#00d3ee', distance: 10 },
      },
      {
        name: '出仓',
        type: 'line',
        smooth: true,
        // data: ['200','300','400','100','444','355','600','111','555','666','200','300','400','100','444','355','444','111','555','666','950','300','400','100','444','355','444','111','555','666','865'],
        data: [],
        itemStyle: {
          normal: { label: { show: false, color: 'greenyellow' } },
        },
        lineStyle: { width: 2,color: 'greenyellow' , distance: 10 },
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
async function searchAll()
{ 
  errorMessage.value = '';
    if (
        formModel.value.org_id === '' ||
        formModel.value.WAREHOUSE_CODE === ''
      ) {
        errorMessage.value =  "请选择工厂和仓库！！";
        return;
      }
      
   await search8();
    search();
    search2(); 
    search3();
    search4();
    search5();
    search6();
    search7();

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

 timer = window.setInterval(() => {
      window.clearInterval(timer);
      router.push({
        name: 'ShelfBoard',
      });
    }, 300000);

onUnmounted(() => {
    if (timer) {
      window.clearInterval(timer);
    }
  });


  const changePage = (()=>{
    router.push({
      name: 'ShelfBoard',
    })
  }
  );
  
// 定义 autoMode 方法
const autoMode = () => {
  console.log('Auto mode triggered');
  if (timer) {
    clearInterval(timer);
    timer = null;
    console.log('Timer paused');
    btnMsg.value = "手动模式";
  } else {
    timer = window.setInterval(() => {
      console.log('Timer running');
      // 添加具体逻辑，例如切换自动模式状态
      window.clearInterval(timer);
      router.push({
        name: 'ShelfBoard',
      });
    }, 300000); // 每5分执行一次
    console.log('Timer started');
    btnMsg.value = "自动模式";
  }
  // 添加具体逻辑，例如切换自动模式状态
};

</script>

<script lang="ts">
  export default {
    name: 'KanbanDeviceA',
  };
</script>

<style lang="less" scoped>

  .container {
    background-size: cover;
    width: 100%;
    height:100%;
  //  background-image: url('@/assets/images/pageBg.png');
  }
  .bg,
  .bg3 {
    background: rgba(0, 0, 0, 0.1);
  }
  .two .card_content {
    background: #0000ff00;
    box-shadow: rgb(214, 23, 109) 0px 0px 10px inset;
    border-radius: 10px;
  }
  ::v-deep .arco-card {
    background-color: transparent;
    box-shadow: rgb(214, 23, 109) 0px 0px 10px inset;
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

    height: 100%;

  }
  ::v-deep  .boder[data-v-ddd0631d] {
    // background-color: transparent;
    box-shadow: #10E4F7 0px 0px 2px 3px inset;
    // color: white;
    border-radius: 5px;

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

  .one_top .table1 td {
    width: 50%;
    border: 1px solid rgb(233, 120, 171);
    font-size: 15px;
    color: white;
  }
 
  ::v-deep .one .one_top .arco-card-size-medium .arco-card-body {
    height: 480px;
  }
  ::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
    height: 330px;
  }

  ::v-deep .two .two_top .arco-card-size-medium .arco-card-body {
    height: 480px;
  }
  ::v-deep .two .two_bottom .arco-card-size-medium .arco-card-body {
    height: 330px;
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
    box-shadow: rgb(246, 82, 115) 0px 0px 10px inset;
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
  font-size: 14px !important;
}

.A1 ::v-deep.dv-scroll-board .header-item {
  font-size: 14px !important;
  font-weight: bolder;
}
 
  .A2 ::v-deep.dv-scroll-board .rows .row-item {
  font-size: 14px !important;
}

.A2 ::v-deep.dv-scroll-board .header-item {
  font-size: 14px !important;
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
</style>
