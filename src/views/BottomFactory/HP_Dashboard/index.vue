<template>
     <dv-full-screen-container class="full" v-show="true" >
   <VScaleScreen
   width="1920"
   height="1080"
   :full-screen="true"
   >  <Header
        :title="topTitle"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9' }"
        :right-style="{ color: 'white' }"
        :show-back-button="showBackbutton"
        @on-backbutton-click="handleBackbutton"
        style="height: 50px;"
      ></Header>
     
      <div class="container">
                      <a-row class="grid-demo"  style="margin: 90px 0vh;"  v-if="dispalyType === 3" :gutter="24">
                       <a-col class="container-row" :span="24">
                          <div class="selector-title" style="left: 10px;">
                            <span style="margin-right: 10px">模号:</span>
                            <a-select
                              v-model="formModel.mold_no"
                              :style="{ width: '220px', marginRight: '12px' }"
                              @change="handleChangeMold"
                            >
                              <a-option
                                    v-for="item in moldList"
                                    :key="item.MOLD_NO"
                                    :value="item.MOLD_NO"
                                    >{{ item.MOLD_NO }}
                              </a-option
                                  >
                            </a-select>&nbsp;&nbsp;
                            <span style="color: white">班次：</span>
                                <a-select
                                  v-model="formModel.SHIFT_NO_MOLD"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 90px;"
                                  @change="handleChangeMold"
                            
                                >
                                  <a-option
                                    v-for="item in SHIFTlist"
                                    :key="item.code"
                                    :value="item.code"
                                    >{{ item.name }}</a-option
                                  >
                                </a-select>
                          </div>
                          <dv-border-box-12
                            class="table-dv-border-box"
                          >
                            <dv-scroll-board
                              :config="molddetailconfig"
                              style="width: 100%; height: 870px"
                              class="inventory-info2"
                            />
                          </dv-border-box-12>
                        </a-col>
                    </a-row>
                    <a-row  class="grid-demo"  style="margin: 90px 0vh;"  v-if="dispalyType === 2">
                        <a-col class="container-row" :span="24">
                        <dv-border-box-12
                        
                          class="table-dv-border-box"
                        >
                        <dv-scroll-board
                            :config="meteredetailconfig"
                            style="width: 100%; height: 880px"
                            class="inventory-info2"
                          />
                        
                        </dv-border-box-12>
                      </a-col>
                    </a-row >
                    <a-row style="margin: 80px 0vh; padding-bottom: -15px; text-align: center;" v-if="dispalyType === 1">
                       <a-col :span="4" >
                              <div
                                ><span style="color: white">工厂：</span>

                                <a-select
                                  v-model="formModel.org_id"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 220px;"
                                  @change="handleChangeCondition"
                                >
                                  <a-option
                                    v-for="item in orgList"
                                    :key="item.ORG_CODE"
                                    :value="item.ORG_CODE"
                                    >{{ item.ORG_CODE+item.ORG_NAME }}</a-option
                                  >
                                </a-select></div
                              >
                            </a-col>
                            <a-col :span="3" style="padding-right: 48px;">
                              <div
                                ><span style="color: white">班次：</span>
                                <a-select
                                  v-model="formModel.SHIFT_NO"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 90px;"
                                  @change="handleChangeCondition2"
                            
                                >
                                  <a-option
                                    v-for="item in SHIFTlist"
                                    :key="item.code"
                                    :value="item.code"
                                    >{{ item.name }}</a-option
                                  >
                                </a-select>
                              </div>
                            </a-col>
                       
                            <a-col :span="8" >
                              <div style="color: red; margin-left: 30px;  font-size: 20px; text-align: left;">{{
                                    errorMessage
                                  }}</div>
                            </a-col>
                    </a-row >
                      <a-row class="grid-demo" style="margin: -90px 0vh;padding-left: 5px;padding-right: 5px;" v-if="dispalyType === 1">
                        <!-- //第一列 -->
                        <a-col :span="14">
                          
                          <div class="one">
                            <div class="one_top" style="margin: 27px 0px">
                              <dv-border-box-11  class="right-dv-border-box"
                              :color="borderColor2"
                              :title="'热压计量表'" 
                              style="font-size: small;">
                              <div class="right-dv-border-box-son">
                                <dv-scroll-board :config="metereconfig"  style="height:380px;"  ref="scrollBoard"     @click="toAnalysisDataDetail"/>
                              </div>
                              </dv-border-box-11>
                            </div>

                            <div class="one_bottom" style="margin: -1vh 0px">
                              <dv-border-box-11  class="right-dv-border-box"
                              :color="borderColor2"
                              :title="'热压产能'" 
                              style="font-size: small;">
                              <div class="right-dv-border-box-son">
                                <div class="production-box">
                                    <div class="sub" >
                                      <div class="mark"> </div>
                                        <VCharts v-if="MShows[0]"
                                          :option="optionMolds[0]"
                                          style="width: 194px; height: 358px; "
                                          ref="charts"
                                          @click ='handMoldChartClick'
                                        >
                                        </VCharts>
                                       
                                    </div>
                                    <div class="sub">
                                      <div class="mark"></div>
                                       <VCharts v-if="MShows[1]"
                                        :option="optionMolds[1]"
                                          style="width: 194px; height: 358px; "
                                          @click ='handMoldChartClick'
                                        >
                                        </VCharts>
                                    </div>
                                    <div class="sub">
                                      <div class="mark"></div>
                                      <VCharts v-if="MShows[2]"
                                        :option="optionMolds[2]"
                                          style="width: 194px; height: 358px; "
                                          @click ='handMoldChartClick'
                                       >
                                       </VCharts>
                                    </div>
                                    <div class="sub">
                                      <div class="mark"></div>
                                      <VCharts v-if="MShows[3]"
                                        :option="optionMolds[3]"
                                          style="width: 194px; height: 358px; "
                                          @click ='handMoldChartClick'
                                         >
                                        </VCharts>
                                    </div>
                                    <div class="sub" style="margin-right: 0">
                                      <div class="mark"></div>
                                      <VCharts v-if="MShows[4]"
                                        :option="optionMolds[4]"
                                          style="width: 194px; height: 358px; "
                                          @click ='handMoldChartClick'
                                      >
                                       </VCharts>
                                    </div>
                                  </div>
                              </div>
                              </dv-border-box-11>
                            </div>
                          </div>
                        </a-col>
                        <!-- //第二列 -->
                        <a-col :span="6">
                          <div class="two" >
                           
                            <div class="two_top" style="margin: 26px 0px">
                              <dv-border-box-11  class="right-dv-border-box2"
                              :color="borderColor2"
                              :title="'目标达成率'" 
                              style="font-size: small;">
                              <div class="right-dv-border-box-son2">
                                <div class="production-box2">
                                  <div class="sub2">
                                    <div style="padding-bottom: 0px;">
                                      <VCharts 
                                            :option="optionRates[0]"
                                              style="width: 130px; height: 130px; "
                                          >
                                        </VCharts>
                                        <div style="margin-top: -10px;">
                                          <a-statistic
                                          :value=Outputvalues[0]
                                          :value-from="0"
                                          :start="true"
                                          animation
                                          class="numRate"
                                          show-group-separator
                                          >
                                        </a-statistic>
                                          
                                        </div>
                                        <div class="textRate">
                                          <span>今日目标</span>
                                        </div>
                                    </div>
                                  </div>
                                    <div class="sub2">
                                      <div style="padding-bottom: 0px;">
                                            <VCharts 
                                                  :option="optionRates[1]"
                                                    style="width: 130px; height: 130px; "
                                                >
                                              </VCharts>
                                              <div style="margin-top: -10px;">
                                                <a-statistic
                                                :value=Outputvalues[1]
                                                :value-from="0"
                                                :start="true"
                                                animation
                                                class="numRate"
                                                show-group-separator
                                                >
                                              </a-statistic>
                                          
                                            </div>
                                              <div class="textRate">
                                                <span>热压一组目标</span>
                                              </div>
                                          </div>
                                    </div>
                                    <div class="sub2" style="margin-right: 0">
                                      <div style="padding-bottom: 0px;">
                                        <VCharts 
                                              :option="optionRates[2]"
                                                style="width: 130px; height: 130px; "
                                            >
                                          </VCharts>
                                          <div style="margin-top: -10px;">
                                          <a-statistic
                                          :value=Outputvalues[2]
                                          :value-from="0"
                                          :start="true"
                                          animation
                                          class="numRate"
                                          show-group-separator
                                          >
                                        </a-statistic>
                                          
                                        </div>
                                          <div class="textRate">
                                            <span>热压二组目标</span>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                                  <div class="production-box2">
                                    <div class="sub2">
                                      <div style="padding-bottom: 0px;">
                                        <VCharts 
                                              :option="optionRates[3]"
                                                style="width: 130px; height: 130px; "
                                            >
                                          </VCharts>
                                          <div style="margin-top: -10px;">
                                          <a-statistic
                                          :value=Outputvalues[3]
                                          :value-from="0"
                                          :start="true"
                                          animation
                                          class="numRate"
                                          show-group-separator
                                          >
                                        </a-statistic>
                                          
                                        </div>
                                          <div class="textRate">
                                            <span>月目标</span>
                                          </div>
                                      </div>
                                    </div>
                                    <div class="sub2">
                                      <div style="padding-bottom: 0px;">
                                        <VCharts 
                                              :option="optionRates[4]"
                                                style="width: 130px; height: 130px; "
                                            >
                                          </VCharts>
                                          <div style="margin-top: -10px;">
                                          <a-statistic
                                          :value=Outputvalues[4]
                                          :value-from="0"
                                          :start="true"
                                          animation
                                          class="numRate"
                                          show-group-separator
                                          >
                                        </a-statistic>
                                          
                                        </div>
                                          <div class="textRate">
                                            <span>热压一组月目标</span>
                                          </div>
                                      </div>
                                    </div>
                                    <div class="sub2" style="margin-right: 0">
                                      <div style="padding-bottom: 0px;">
                                        <VCharts 
                                              :option="optionRates[5]"
                                                style="width: 130px; height: 130px; "
                                            >
                                          </VCharts>
                                          <div style="margin-top: -10px;">
                                          <a-statistic
                                          :value=Outputvalues[5]
                                          :value-from="0"
                                          :start="true"
                                          animation
                                          class="numRate"
                                          show-group-separator
                                          >
                                        </a-statistic>
                                          
                                        </div>
                                          <div class="textRate">
                                            <span>热压二组月目标</span>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              </dv-border-box-11>
                            </div>
                            <div class="two_bottom" style="margin: -1vh 0px">
                              <dv-border-box-11  class="right-dv-border-box2"
                                    :color="borderColor2"
                                    :title="'其他指标'" 
                                    style="font-size: small;">
                                    <div class="right-dv-border-box-son2">
                                      <div class="production-box3">
                                        <div class="sub3">
                                          <div class="mark"></div>
                                          <a-statistic
                                            title="今日超重重量"
                                            :value=Overweightvalues[0]
                                            :value-from="0"
                                            :precision="2"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                            show-group-separator
                                          >
                                            <template #suffix>g</template>
                                          </a-statistic>
                                        </div>
                                        <div class="sub3">
                                          <div class="mark"></div>
                                          <a-statistic
                                              title="热压一组今日超重"
                                              :value=Overweightvalues[1]
                                              :value-from="0"
                                              :precision="2"
                                              :value-style="{ color: '#12f4ff' }"
                                              class="production-info"
                                              animation
                                              show-group-separator
                                            >
                                              <template #suffix>g</template>
                                            </a-statistic>
                                        </div>
                                        <div class="sub3" style="margin-right: 0">
                                          <div class="mark"></div>
                                          <a-statistic
                                            title="热压二组今日超重"
                                            :value=Overweightvalues[2]
                                            :value-from="0"
                                            :precision="2"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                            show-group-separator
                                          >
                                            <template #suffix>g</template>
                                          </a-statistic>
                                        </div>
                                </div>

                                  <div class="production-box3">
                                        <div class="sub3">
                                          <div class="mark"></div>
                                          <a-statistic
                                                title="月累计超重"
                                                :value=Overweightvalues[3]/1000
                                                :value-from="0"
                                                :precision="2"
                                                :value-style="{ color: '#12f4ff' }"
                                                class="production-info"
                                                animation
                                                show-group-separator
                                              >
                                                <template #suffix>kg</template>
                                              </a-statistic>
                                        </div>

                                      
                                        <div class="sub3">
                                          <div class="mark"></div>
                                          <a-statistic
                                            title="热压一组月累计超重"
                                            :value=Overweightvalues[4]/1000
                                            :value-from="0"
                                            :precision="2"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                            show-group-separator
                                          >
                                            <template #suffix>kg</template>
                                          </a-statistic>
                                        </div>
                                        <div class="sub3" style="margin-right: 0">
                                          <div class="mark"></div>
                                          <a-statistic
                                            title="热压二组月累计超重"
                                            :value=Overweightvalues[5]/1000
                                            :value-from="0"
                                            :precision="2"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                            show-group-separator
                                          >
                                            <template #suffix>kg</template>
                                          </a-statistic>
                                        </div>
                                  </div>
                                    <div class="production-box3">
                                      <div class="sub3">
                                        <div class="mark"></div>
                                          <a-statistic
                                            title="今日不良品数"
                                            :value=Overweightvalues[6]
                                            :value-from="0"
                                            :precision="0"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                          >
                                            <template #suffix> ({{ Overweightvalues[7] }}%)</template>
                                          </a-statistic>
                                      </div>

                                    
                                      <div class="sub3">
                                        <div class="mark"></div>
                                        <a-statistic
                                            title="热压一组今日不良品数"
                                            :value=Overweightvalues[8]
                                            :value-from="0"
                                            :precision="0"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                          >
                                            <template #suffix> ({{ Overweightvalues[9] }}%)</template>
                                          </a-statistic>
                                      </div>
                                      <div class="sub3" style="margin-right: 0">
                                        <div class="mark"></div>
                                        <a-statistic
                                            title="热压二组今日不良品数"
                                            :value=Overweightvalues[10]
                                            :value-from="0"
                                            :precision="0"
                                            :value-style="{ color: '#12f4ff' }"
                                            class="production-info"
                                            animation
                                          >
                                            <template #suffix> ({{ Overweightvalues[11] }}%)</template>
                                          </a-statistic>
                                      </div>
                                    </div>
                                  </div>
                              </dv-border-box-11>
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
    queryReportOtherData,
    queryReportTargetRate,
    queryReportMoldRate,
    queryReportList,
    queryMoldList,
    queryReportDownHot,
    queryReportDownMold,
  } from '@/api/BottomFactory';
import { Alert } from '@arco-design/web-vue';


  const userStore = useUserStore();
  const generateFormModel = () => {
    return {
      org_id: '',
      SHIFT_NO:'',
      meter_no:'',
      mold_no:'',
      SHIFT_NO_MOLD:'',
    };
  };

  // 顶部-标题
 const topTitle = ref<any>('热压生产目视看板');
  // 顶部-显示返回按钮
  const showBackbutton = ref<boolean>(false);
  // 顶部-显示类型 1：看板 2：热压计量表明细 3：模号达成率明细 
  const dispalyType = ref<number>(1);


  const { loading } = useLoading();
  const orgList = ref<any>([]);
  const moldList = ref<any>([]);
  const formModel = ref(generateFormModel());
  const timeNow = ref('');
  const optionMolds = ref<any>([]);
  const Molddata1 = ref<any>([]);
  const Molddata2= ref<any>([]);
  const MolddataX= ref<any>([]);
  const MShows = ref([false, false, false, false, false]); 
  const optionRates = ref<any>([]);
  const Ratevalues = ref<any>([]);
  const Outputvalues = ref<any>([]);

  const metereconfig  = ref<any>([]);
  const meterecord  = ref<any>([]);


  const meteredetailconfig = ref<any>([]);
  const meteredetailrecord  = ref<any>([]);
  const molddetailconfig = ref<any>([]);
  const molddetailrecord  = ref<any>([]);

  const Overweightvalues  = ref<any>([]);

  const SHIFTlist = ref<any>([]);
  const borderColor2 = ref<any>(['#2E6099', '#0EE4F9']);
    const MolddataList= ref<any>([]);

  const errorMessage = ref('');

  let MoldPageindex:any = 1;
 
 
 let currentPage = 0;
 const totalPages =  ref<any>([]);

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
    // const getLocalorg = window.sessionStorage.getItem('org_code');
    // const getLocaldate = window.sessionStorage.getItem('selectdate');
    // console.log(getLocaldate);
    formModel.value.org_id = '';
    formModel.value.SHIFT_NO = '';
    formModel.value.mold_no = '';
    formModel.value.meter_no = '';
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
 
  metereconfig.value = reactive({
  header: ['工厂', '热压计量表', '热压人', '机台号', '目标双数', '良品双数', '达成率%','不良数', '不良率%', '累计超重g', '平均超重g'],
  data:[],
    index: false,
  columnWidth: [80,150,90,100,85,85,80,80,85,100,100],
  align: [
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
    ],
  rowNum:[10],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,
  headerBGC: '#003399',

  
});

meteredetailconfig.value = reactive({
  header: ['热压计量表', '班次','热压人', '机台号',  '模号', 'ART','Size', '目标双数', '标准重量g','良品双数','良品重量kg','不良双数(合计)','不良重量kg(合计)'],
  data: [],
  index: false,
  columnWidth: [150,140,140,140,140,140,140,140,140,140,140,140,140],
  align: [
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
    ],
  rowNum:[30],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,
  headerBGC: '#003399',
});

molddetailconfig.value = reactive({
  header: ['模号', '班次', '热压人', '热压计量表',   'ART','Size', '目标双数','良品双数','达成率%'],
  data: [],
  index: false,
  columnWidth: [200,200,200,200,200,200,200,200,200,200,200,200,200],
  align: [
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
    ],
  rowNum:[30],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,
  headerBGC: '#003399',
});


  let timerlist: any = 1;
  

  const getorglist = async () => {
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  };
  const getSHIFTlist = async () => {
    const SHIFTdata = [
    {
        code:'00',
        name:'全部'
     },
      {
        code:'01',
        name:'白班'
     },
     {
        code:'02',
        name:'夜班'
     }
  ]
    SHIFTlist.value = SHIFTdata;
  };
  const getmoldlist = async () => {
     const MOLDdata: any = await queryMoldList(formModel.value);
    // const MOLDdata = [
    //   {
    //     mold_no:'M1',

    //  },
    //  {
    //   mold_no:'M2',

    //  },
    //  {
    //   mold_no:'M3',

    //  }
    // ]
    moldList.value =  JSON.parse(JSON.stringify(MOLDdata.list));
    console.log(moldList.value)
  };


  onMounted(async () => {
    try {
      getorglist();  
      formModel.value.org_id = '1002';

      getSHIFTlist();
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour >= 7 && currentHour < 19) 
      {
        formModel.value.SHIFT_NO = '01';
      } else {
        formModel.value.SHIFT_NO = '02';
      }

      getmoldlist(); 

    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
    searchAll();

    window.clearInterval(timerlist);
    timerlist = window.setInterval(() => {
    console.log('定时器查询列表1。');
    searchAll()
  }, 60000*3);
  });
  
  function setLocal() {
    // 缓存条件在浏览器
   
   
  }
// const { currentLocale } = useLocale();
  const { setLoading } = useLoading();
  const getMeterList = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const meterecordData = await queryReportList(formModel.value);
      // console.log(meterecordData.list)
      meterecord.value = JSON.parse(JSON.stringify(meterecordData.list));
      // console.log(meterecord.value)
      // meterecord.value = 
      // [
      //   {'工厂':'万邦底厂', '热压人':'张三', '机台号':'MD-FA', '目标双数':'800', '良品双数':'100', '达成率':'75%', '不良数':'5','不良率':'6.5%', '累计超重':'60g', '平均超重':'1g'},
      //   {'工厂':'万邦底厂', '热压人':'李四', '机台号':'CK-FA', '目标双数':'700', '良品双数':'80', '达成率':'95%', '不良数':'5','不良率':'5%', '累计超重':'5g', '平均超重':'2g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人1', '机台号':'A', '目标双数':'750', '良品双数':'600', '达成率':'90%', '不良数':'5','不良率':'5%', '累计超重':'8g', '平均超重':'2g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人2', '机台号':'B', '目标双数':'666', '良品双数':'44', '达成率':'50%', '不良数':'5','不良率':'5%', '累计超重':'15g', '平均超重':'1g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人3', '机台号':'C', '目标双数':'222', '良品双数':'22', '达成率':'78%', '不良数':'1','不良率':'2%', '累计超重':'56g', '平均超重':'2g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人4', '机台号':'D', '目标双数':'800', '良品双数':'100', '达成率':'75%', '不良数':'5','不良率':'6.5%', '累计超重':'60g', '平均超重':'1g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人5', '机台号':'E', '目标双数':'200', '良品双数':'5', '达成率':'5%', '不良数':'0','不良率':'0%', '累计超重':'1g', '平均超重':'0g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人6', '机台号':'F', '目标双数':'551', '良品双数':'80', '达成率':'98%', '不良数':'5','不良率':'5%', '累计超重':'58g', '平均超重':'2g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人7', '机台号':'G', '目标双数':'123', '良品双数':'100', '达成率':'66%', '不良数':'5','不良率':'5%', '累计超重':'15g', '平均超重':'1g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人8', '机台号':'H', '目标双数':'776', '良品双数':'22', '达成率':'78%', '不良数':'1','不良率':'2%', '累计超重':'56g', '平均超重':'2g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人9', '机台号':'TT', '目标双数':'335', '良品双数':'2', '达成率':'5%', '不良数':'300','不良率':'90%', '累计超重':'3g', '平均超重':'2g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人10', '机台号':'OO', '目标双数':'147', '良品双数':'153', '达成率':'99%', '不良数':'5','不良率':'5%', '累计超重':'7g', '平均超重':'1g'},
      //   {'工厂':'万邦底厂', '热压人':'工具人11', '机台号':'PP', '目标双数':'228', '良品双数':'22', '达成率':'78%', '不良数':'1','不良率':'2%', '累计超重':'16.5g', '平均超重':'2g'},
      // ]
      const dt1:any = [];
      meterecord.value.forEach((row: any)=> {
        const dtrow:any = []; 
        Object.keys(row).forEach((key: any) => {
          let value = row[key];
          if (key === '达成率') 
          {  
           const  rate = parseFloat(value);
            if(rate > 100)
            {
              value = "100";
            }
            if (rate <= 90) 
            {
              value = `<span style="background-color: red; display: inline-block; width: 60px; height:20px; line-height: 20px;  text-align: center;">${value}</span>`;
            }       
          }
          if (key === '平均超重') 
          {
            const weight = parseFloat(value);
            if(weight>=10)
            {
              value = `<span style="background-color: red; display: inline-block; width: 60px; height:20px; line-height: 20px;  text-align: center;">${value}</span>`;
            }           
          }

          dtrow.push(value);
        });

        dt1.push(dtrow);
         
      } 
      ); 

      // console.log(dt1.length)
      // console.log(metereconfig.value.data.length)
      metereconfig.value.data = [];
      metereconfig.value.data = dt1;
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };


  const getTargetRateData = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const TargetRateData = await queryReportTargetRate(formModel.value);
     // console.log(TargetRateData.list)
      const TargetRate = JSON.parse(JSON.stringify(TargetRateData.list));
   
      const { rate } = TargetRate;
      const { num } = TargetRate;
      Ratevalues.value = rate;
      Outputvalues.value = num;

      // console.log(Ratevalues.value)
      // console.log(Outputvalues.value)

      for (let i = 0; i < Ratevalues.value.length; i+=1) 
      {
       
        if (Ratevalues.value[i] <= 95) 
        {
          tcolor.value = "#FF0000"; 
        }  
        else 
        {
          tcolor.value = "#00ff74"; 
        }
        optionRates.value[i].series.data =
        [
           {
              value: Ratevalues.value[i],
              itemStyle: {
                normal: {
                  color:tcolor.value
                },
              },
              label: {
                normal: {
                  show: false,
                  
                },
              },
            },
            {
              value: 100 - Math.min(100, Math.max(0, Ratevalues.value[i])),
              name: "占位",
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: "#AAAAAA",
                },
              },
              label: {
                normal: {
                  formatter:`${Ratevalues.value[i]}%`,
                  textStyle: {
                    fontSize: 24,
                    color: tcolor.value
                  },
                },
              },
            },
        ]
        

      }
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

const getMoldRateData = async () => {
    setLoading(true);

    try {

      setLocal();
      window.clearInterval(MoldPageindex);
      const MoldRateData :any= await queryReportMoldRate(formModel.value);
      MolddataList.value =MoldRateData.list
      // Molddata1.value  =  [15,20,25,30,35,40,45,50,55,60,65,70,75];
      // Molddata2.value =   [100,95,90,85,80,75,70,65,60,55,50,45,40];
      // MolddataX.value =  ['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12','M13'];
      // Molddata1.value  =  MoldRateData.list.Ylist1
      // Molddata2.value =   MoldRateData.list.Ylist2
      // MolddataX.value =   MoldRateData.list.Xlist
      totalPages.value = Math.ceil(MolddataList.value.length / 5);
console.log( MolddataList.value)
      currentPage = 0;
      updatePage();

      MoldPageindex =  window.setInterval(() => {
     // console.log(totalPages.value)
        nextPage();
      }, 15000);
      
   }
 catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    
    }
  };

  const getOverweightData = async () => {
    setLoading(true);

    try {

      setLocal();
     
      const OverweightData = await queryReportOtherData(formModel.value);
     // console.log(OverweightData.list)
      const Overweight = JSON.parse(JSON.stringify(OverweightData.list));

      // 定义一个空数组用于存储结果
      const datas: any = [];

      // 从 'one' 中提取数据
      const { one } = Overweight;
      one.forEach(({ TODAY_OVERWEIGHT, TODAY_OVERWEIGHT_WHITE, TODAY_OVERWEIGHT_BLACK }: any) => {
        datas.push(TODAY_OVERWEIGHT, TODAY_OVERWEIGHT_WHITE, TODAY_OVERWEIGHT_BLACK);
      });

      // 从 'two' 中提取数据
      const { two } = Overweight;
      two.forEach(({ TODAY_OVERWEIGHT, TODAY_OVERWEIGHT_WHITE, TODAY_OVERWEIGHT_BLACK }: any) => {
        datas.push(TODAY_OVERWEIGHT, TODAY_OVERWEIGHT_WHITE, TODAY_OVERWEIGHT_BLACK);
      });

      // 从 'third' 中提取数据
      const { third } = Overweight;
      third.forEach(({ TODAY_BAD_NUM, TODAY_BAD_RATE }: any) => {
        datas.push(TODAY_BAD_NUM, TODAY_BAD_RATE);
      });


      // 将新数组赋值给 Overweightvalues.value
      Overweightvalues.value = datas;

     // console.log(Overweightvalues.value); 
    }
    catch (err) {
          errorMessage.value = (err as Error).message;
        } finally {
          setLoading(false);
        }
  };

function nextPage() { 
  if (currentPage < totalPages.value - 1) {
    currentPage+=1;
    updatePage();
  } else {
    currentPage = 0;
    updatePage();
  }
}

function updatePage() {
  // 清除旧的数据
  for (let i = 0; i < 5; i+=1) {
    optionMolds.value[i].title.text = '';
    optionMolds.value[i].legend = {};
    optionMolds.value[i].xAxis.data = [];
    optionMolds.value[i].series = [];
    MShows.value[i] = false;

    
  }
  setTimeout(() => {
    const indexStart = currentPage * 5;
    const indexEnd = Math.min(indexStart + 5, MolddataList.value.length);

    for (let i = indexStart; i < indexEnd; i+=1) {
      const pageIndex = i - indexStart;
      optionMolds.value[pageIndex].title.text = `模号: ${MolddataList.value[i].MOLD_NO}`;

      if(MolddataList.value[i].SHIFT_NO_01 !== null && MolddataList.value[i].SHIFT_NO_02 !== null)
      {
          optionMolds.value[pageIndex].legend = {
          bottom: "70%",
          left: "center",
          data: [`${MolddataList.value[i].MOLD_NO}|白班`,`${MolddataList.value[i].MOLD_NO}|夜班`],
          icon: "none",
          itemWidth: 0, // 设置图例项的宽度为 0
          itemHeight: 0, // 设置图例项的高度为 0
          formatter: (name:any) => {
            const value = name ===`${MolddataList.value[i].MOLD_NO}|白班`? MolddataList.value[i].RATE_01: MolddataList.value[i].RATE_02;
            let colorKey;
            if (value > 75) {
              colorKey = "greenText";
            } else if (value > 50) {
              colorKey = "yellowText";
            } else {
              colorKey = "redText";
            }
            name = name ===`${MolddataList.value[i].MOLD_NO}|白班`? '白班达成率': '夜班达成率';
            const padding = ' '.repeat(8-String(value).length);
            return `{${colorKey}|${name}}\n${padding}{${colorKey}|${value}%}`;
          },
          textStyle: {
            rich,
          },

        };

        optionMolds.value[pageIndex].xAxis.data = [MolddataList.value[i].MOLD_NO];
            optionMolds.value[pageIndex].series = [{
            name: `${MolddataList.value[i].MOLD_NO}|白班`,
            data: [Math.min(MolddataList.value[i].RATE_01, 100)],
            type: "pictorialBar",
            symbol: "rect",
            symbolBoundingData: bodyMax,
            symbolSize: [35, "100%"],
            symbolOffset: ["-118%", -6.5],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 52,
                color:  (params:any) =>{
                  // 根据数值设置颜色
                  const { value } = params; // 解构赋值
                  if (value <= 50) {
                    return "#FF6666"; 
                  } 
                  if (value <= 75) {
                    return "#ed902c";
                  } 
                    return "#00ff67"; 
                  
                },
              },
            },
            stack: "all",
            symbolRepeat: true,
            animationEasing: "elasticOut",
            animationDelay:  (dataIndex : any, params:any)=> {
              return 300+params.index * 60 * 1.1;
            },
            z: 9,
          },
          {
            name: `${MolddataList.value[i].MOLD_NO}|白班占位`,
            type: "pictorialBar",
            // silent: true, // 已经设置为 silent
            symbol: `image://${bgImg}`,
            symbolClip: true,
            symbolBoundingData: bodyMax,
            symbolSize: [45, "100%"],
            symbolOffset: ["-92%", 0],
            barWidth: 10,
            data: maxData,
          },
          {
            name: `${MolddataList.value[i].MOLD_NO}|夜班`,
            data: [Math.min(MolddataList.value[i].RATE_02, 100)],
            type: "pictorialBar",
            symbol: "rect",
            symbolBoundingData: bodyMax,
            symbolSize: [35, "100%"],
            symbolOffset: ["113%", -6.5],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 52,
                color:  (params:any) =>{
                  // 根据数值设置颜色
                  const { value } = params; // 解构赋值
                  if (value <= 50) {
                    return "#FF6666"; 
                  } 
                  if (value <= 75) {
                    return "#ed902c";
                  } 
                    return "#00ff67"; 
                  
                },
              },
            },
            stack: "all",
            symbolRepeat: true,
            animationEasing: "elasticOut",
            animationDelay:  (dataIndex : any, params:any)=> {
              return 300+params.index * 60 * 1.1;
            },
            z: 9,
          },
          {
            name: `${MolddataList.value[i].MOLD_NO}|夜班占位`,
            type: "pictorialBar",
            // silent: true, // 已经设置为 silent
            symbol: `image://${bgImg}`,
            symbolClip: true,
            symbolBoundingData: bodyMax,
            symbolSize: [45, "100%"],
            symbolOffset: ["88%", 0],
            barWidth: 10,
            data: maxData,
          },
        ]
      }
      else if(MolddataList.value[i].SHIFT_NO_01 !== null && MolddataList.value[i].SHIFT_NO_02 === null)
      {
        optionMolds.value[pageIndex].legend = {
          bottom: "70%",
          left: "center",
          data: [`${MolddataList.value[i].MOLD_NO}|白班`],
          icon: "none",
          itemWidth: 0, // 设置图例项的宽度为 0
          itemHeight: 0, // 设置图例项的高度为 0
          formatter: (name:any) => {
            const value = MolddataList.value[i].RATE_01;
            let colorKey;
            if (value > 75) {
              colorKey = "greenText";
            } else if (value > 50) {
              colorKey = "yellowText";
            } else {
              colorKey = "redText";
            }
            name = '白班达成率'
            const padding = ' '.repeat(8-String(value).length);
            return `{${colorKey}|${name}}\n${padding}{${colorKey}|${value}%}`;
          },
          textStyle: {
            rich,
          },

        };

            optionMolds.value[pageIndex].xAxis.data = [MolddataList.value[i].MOLD_NO];
            optionMolds.value[pageIndex].series = [{
            name: `${MolddataList.value[i].MOLD_NO}|白班`,
            data: [Math.min(MolddataList.value[i].RATE_01, 100)],
            type: "pictorialBar",
            symbol: "rect",
            symbolBoundingData: bodyMax,
            symbolSize: [35, "100%"],
            symbolOffset: ["-5%", -6.5],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 52,
                color:  (params:any) =>{
                  // 根据数值设置颜色
                  const { value } = params; // 解构赋值
                  if (value <= 50) {
                    return "#FF6666"; 
                  } 
                  if (value <= 75) {
                    return "#ed902c";
                  } 
                    return "#00ff67"; 
                  
                },
              },
            },
            stack: "all",
            symbolRepeat: true,
            animationEasing: "elasticOut",
            animationDelay:  (dataIndex : any, params:any)=> {
              return 300+params.index * 60 * 1.1;
            },
            z: 9,
          },
          {
            name: `${MolddataList.value[i].MOLD_NO}|白班占位`,
            type: "pictorialBar",
            // silent: true, // 已经设置为 silent
            symbol: `image://${bgImg}`,
            symbolClip: true,
            symbolBoundingData: bodyMax,
            symbolSize: [45, "100%"],
              symbolOffset: ["-5%", 0],
            barWidth: 10,
            data: maxData,
          },
        ]
      }
      else if(MolddataList.value[i].SHIFT_NO_01 === null && MolddataList.value[i].SHIFT_NO_02 !== null)
      {
        optionMolds.value[pageIndex].legend = {
          bottom: "70%",
          left: "center",
          data: [`${MolddataList.value[i].MOLD_NO}|夜班`],
          icon: "none",
          itemWidth: 0, // 设置图例项的宽度为 0
          itemHeight: 0, // 设置图例项的高度为 0
          formatter: (name:any) => {
            const value = MolddataList.value[i].RATE_02;
            let colorKey;
            if (value > 75) {
              colorKey = "greenText";
            } else if (value > 50) {
              colorKey = "yellowText";
            } else {
              colorKey = "redText";
            }
            name = '夜班达成率'
            const padding = ' '.repeat(8-String(value).length);
            return `{${colorKey}|${name}}\n${padding}{${colorKey}|${value}%}`;
          },
          textStyle: {
            rich,
          },

        };

            optionMolds.value[pageIndex].xAxis.data = [MolddataList.value[i].MOLD_NO];
            optionMolds.value[pageIndex].series = [{
            name: `${MolddataList.value[i].MOLD_NO}|夜班`,
            data: [Math.min(MolddataList.value[i].RATE_02, 100)],
            type: "pictorialBar",
            symbol: "rect",
            symbolBoundingData: bodyMax,
            symbolSize: [35, "100%"],
            symbolOffset: ["-5%", -6.5],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 52,
                color:  (params:any) =>{
                  // 根据数值设置颜色
                  const { value } = params; // 解构赋值
                  if (value <= 50) {
                    return "#FF6666"; 
                  } 
                  if (value <= 75) {
                    return "#ed902c";
                  } 
                    return "#00ff67"; 
                  
                },
              },
            },
            stack: "all",
            symbolRepeat: true,
            animationEasing: "elasticOut",
            animationDelay:  (dataIndex : any, params:any)=> {
              return 300+params.index * 60 * 1.1;
            },
            z: 9,
          },
          {
            name: `${MolddataList.value[i].MOLD_NO}|夜班占位`,
            type: "pictorialBar",
            // silent: true, // 已经设置为 silent
            symbol: `image://${bgImg}`,
            symbolClip: true,
            symbolBoundingData: bodyMax,
            symbolSize: [45, "100%"],
              symbolOffset: ["-5%", 0],
            barWidth: 10,
            data: maxData,
          },
        ]
      }

     
      MShows.value[pageIndex] = true;

  }
  }, 100);

}

const getMeterDetailList = async () => {

      const MeterDetaiData = await queryReportDownHot(formModel.value);
     // console.log(meterecordData.list)
      meteredetailrecord.value = JSON.parse(JSON.stringify(MeterDetaiData.list));
     // console.log(formModel.value)
      // meteredetailrecord.value = 
      // [
      //   {'计量表编号':'HP2024090501004', '班次':'白班','热压人':'张三', '机台号':'MD-FA',  '模号':'54489', 'ART':'GV9225', 'Size':'11.5','目标双数':'80',  '标准重量':'200g','良品双数':'10',  '良品重量':'2000g', '不良双数(合计)':'10', '不良重量(合计)':'100g'},
      //   {'计量表编号':'HP2024090501004', '班次':'白班','热压人':'张三', '机台号':'MD-FA',  '模号':'54489', 'ART':'GV9225', 'Size':'7.5','目标双数':'50',  '标准重量':'190','良品双数':'50',  '良品重量':'385g', '不良双数(合计)':'10', '不良重量(合计)':'100g'},
      //   {'计量表编号':'HP2024090501004', '班次':'白班','热压人':'张三', '机台号':'MD-FA',  '模号':'54489', 'ART':'GV9225', 'Size':'5','目标双数':'60',  '标准重量':'200g','良品双数':'30',  '良品重量':'800g', '不良双数(合计)':'10', '不良重量(合计)':'100g'},

      // ]
      const dt1:any = [];
      meteredetailrecord.value.forEach((row: any)=> {
        const dtrow:any = []; 
        Object.keys(row).forEach((key: any) => {
          const value = row[key];
          dtrow.push(value);
        });

        dt1.push(dtrow);
         
      } 
      ); 

      // console.log(dt1.length)
      // console.log(meteredetailconfig.value.data.length)
      meteredetailconfig.value.data = [];
      meteredetailconfig.value.data = dt1;
  };

const getMoldDetailList = async () => {

      const molddetailData = await queryReportDownMold(formModel.value);
     // console.log(meterecordData.list)
      molddetailrecord.value = JSON.parse(JSON.stringify(molddetailData.list));
      // console.log(formModel.value)
      // molddetailrecord.value = 
      // [
      //   { '模号':'54489', '班次':'白班','热压人':'张三', '计量表编号':'HP2024090501001', 'ART':'GV9225', 'Size':'11.5','目标双数':'80',  '良品双数':'40',  '达成率':'50%'},
      //   { '模号':'54489', '班次':'夜班','热压人':'李四', '计量表编号':'HP2024090501002', 'ART':'GV9225', 'Size':'5.5','目标双数':'35',  '良品双数':'35',  '达成率':'100%'},

      // ]
      const dt1:any = [];
      molddetailrecord.value.forEach((row: any)=> {
        const dtrow:any = []; 
        Object.keys(row).forEach((key: any) => {
          const value = row[key];
          dtrow.push(value);
        });

        dt1.push(dtrow);
         
      } 
      ); 

      // console.log(dt1.length)
      // console.log(meteredetailconfig.value.data.length)
      molddetailconfig.value.data = [];
      molddetailconfig.value.data = dt1;
  };

// 顶部-返回事件
function handleBackbutton(val: any) {
      console.log(formModel.value)
      topTitle.value = '热压生产目视看板';
      showBackbutton.value = !showBackbutton.value;
      dispalyType.value = 1;

      window.clearInterval(MoldPageindex);
      MoldPageindex =  window.setInterval(() => {
     // console.log(totalPages.value)
        nextPage();
      }, 15000);

 

  }

function toAnalysisDataDetail(val: any) {
  console.log(val)
    window.clearInterval(MoldPageindex);
    const meterno = val.row[1];
    showBackbutton.value = !showBackbutton.value;
    dispalyType.value = 2;
    topTitle.value = '热压计量表明细';
    formModel.value.meter_no = meterno;
    getMeterDetailList();
  }


function handMoldChartClick(param: any) 
{ 
    if (param.componentType === 'title') 
    {
      window.clearInterval(MoldPageindex);
      const moldno = param.event.target.style.text.replace('模号: ','').trim();
      showBackbutton.value = !showBackbutton.value;
      dispalyType.value = 3;
      topTitle.value = '模号达成率明细';

     formModel.value.mold_no = moldno;
     formModel.value.SHIFT_NO_MOLD = '00';
    
      getMoldDetailList();
    }

    if (param.componentType === 'series') 
    {
      window.clearInterval(MoldPageindex);
      console.log(param.seriesName)

      const moldno = param.seriesName.split('|')[0].trim();
      const shifno = param.seriesName.split('|')[1].substring(0, 2)==='白班' ? '01' : '02';

      showBackbutton.value = !showBackbutton.value;
      dispalyType.value = 3;
      topTitle.value = '模号达成率明细';

      formModel.value.mold_no = moldno;
      formModel.value.SHIFT_NO_MOLD = shifno;
    
      getMoldDetailList();
    }
    
  }

  function handleChangeCondition() {
    searchAll();

    window.clearInterval(timerlist);
    timerlist = window.setInterval(() => {
    console.log('定时器查询列表2。');
    searchAll()
  }, 60000*3);
  }

  function handleChangeCondition2() {console.log(formModel.value)
    getMeterList();

    window.clearInterval(timerlist);
    timerlist = window.setInterval(() => {
    console.log('定时器查询列表2。');
    searchAll()
  }, 60000*3);
  }

  function handleChangeMold() {console.log(formModel.value)
    getMoldDetailList();
  }


  // 组件卸载时，清除定时器
  onUnmounted(() => {
    window.clearInterval(timerlist);   
    window.clearInterval(timer2);
    window.clearInterval(MoldPageindex);
   // document.exitFullscreen();
  });


const bgImg =
"data:image/svg+xml;base64,PHN2ZyBpZD0i5p+x54q2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNSIgaGVpZ2h0PSIyMzYiIHZpZXdCb3g9IjAgMCAzNSAyMzYiPgogIDxtZXRhZGF0YT48P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+PC9tZXRhZGF0YT4KPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzAyMDEwNTsKICAgICAgICBzdHJva2U6ICMyNjQ5Nzg7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAycHg7CiAgICAgICAgb3BhY2l0eTogMC44OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICMxNjJjMzI7CiAgICAgICAgb3BhY2l0eTogMC43OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8cmVjdCBpZD0i55+p5b2iXzE1MDlf5ou36LSdXzMiIGRhdGEtbmFtZT0i55+p5b2iIDE1MDkg5ou36LSdIDMiIGNsYXNzPSJjbHMtMSIgeD0iMSIgeT0iMSIgd2lkdGg9IjMzIiBoZWlnaHQ9IjIzNCIgcng9IjEyIiByeT0iMTIiLz4KICA8cmVjdCBpZD0i55+p5b2iXzE1MDlf5ou36LSdXzMtMiIgZGF0YS1uYW1lPSLnn6nlvaIgMTUwOSDmi7fotJ0gMyIgY2xhc3M9ImNscy0yIiB4PSI3IiB5PSI3IiB3aWR0aD0iMjEiIGhlaWdodD0iMjI0IiByeD0iOCIgcnk9IjgiLz4KPC9zdmc+Cg==";

const color = {
    red: "#fc0752",
    blue: "#3fdaff",
    line: "rgba(53, 153, 196, .5)",
  };

const bodyMax = 110;

const maxData = [bodyMax];

const scale = 1;
// 富文本配置
const rich = {
  yellowText: {
    fontSize: 14,
    color: "#ed902c",
    fontWeight:'600'
    
  },
  greenText: {
    fontSize: 14,
    color: "#00ff67",
    fontWeight:'600'
  },
  redText: {
    fontSize: 14,
    color: "#FF6666", 
    fontWeight:'600'
  },
  blueText: {
    fontSize: 14,
    color: "#0000FF", 
    fontWeight:'600'
  },
  AquaText: {
    fontSize: 14,
    color: "#00FFFF", 
    fontWeight:'600'
  },
};

 optionMolds.value = [{
 
  title: {
    text: '',
    left: "center",
    top: 30, // 调整标题的垂直位置
    textStyle: {
      color: "#24fffe",
      fontSize: 24 * scale,
    },
    triggerEvent: true,
  },
  legend: {

  },
  backgroundColor: 'transparent',

  grid: {
    left: "8%",
    right: "26%",
    bottom: "5%",
    top: 120,
    containLabel: true,
  },
  yAxis: [
    {
      show: false,
      name: "百分比%",
      // nameGap: 20,
      nameTextStyle: {
        color: color.red,
        fontStyle: 14 * scale,
      },
      type: "value",
      max: bodyMax,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        inside: false,
      },
      axisLabel: {
        textStyle: {
          color: color.red,
          fontSize: 12 * scale,
        },
        formatter:  (value : any, index :any) =>{
          return `${value}%`;
        },
      },
    },
  ],
  xAxis: [
    {
      show: false,
      type: "category",
      data: [],
      // boundaryGap: ["20%"],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        //   rotate: 45,
        padding: [15, 0, 0, 0],
        textStyle: {
          fontSize: 16 * scale,
          color: "#3fdaff",
        },
      },
    },
  ],
  series: [],
  
},
{
title: {
    text: '',
    left: "center",
    top: 30, // 调整标题的垂直位置
    textStyle: {
      color: "#24fffe",
      fontSize: 24 * scale,
    },
    triggerEvent: true,
  },
  legend: {
   
  },
  backgroundColor: 'transparent',

  grid: {
    left: "8%",
    right: "26%",
    bottom: "5%",
    top: 120,
    containLabel: true,
  },
  yAxis: [
    {
      show: false,
      name: "百分比%",
      // nameGap: 20,
      nameTextStyle: {
        color: color.red,
        fontStyle: 14 * scale,
      },
      type: "value",
      max: bodyMax,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        inside: false,
      },
      axisLabel: {
        textStyle: {
          color: color.red,
          fontSize: 12 * scale,
        },
        formatter:  (value : any, index :any) =>{
          return `${value}%`;
        },
      },
    },
  ],
  xAxis: [
    {
      show: false,
      type: "category",
      data: [],
      // boundaryGap: ["20%"],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        //   rotate: 45,
        padding: [15, 0, 0, 0],
        textStyle: {
          fontSize: 16 * scale,
          color: "#3fdaff",
        },
      },
    },
  ],
  series: [],
},
{
title: {
    text: '',
    left: "center",
    top: 30, // 调整标题的垂直位置
    textStyle: {
      color: "#24fffe",
      fontSize: 24 * scale,
    },
    triggerEvent: true,
  },
  legend: {
   
  },
  backgroundColor: 'transparent',

  grid: {
    left: "8%",
    right: "26%",
    bottom: "5%",
    top: 120,
    containLabel: true,
  },
  yAxis: [
    {
      show: false,
      name: "百分比%",
      // nameGap: 20,
      nameTextStyle: {
        color: color.red,
        fontStyle: 14 * scale,
      },
      type: "value",
      max: bodyMax,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        inside: false,
      },
      axisLabel: {
        textStyle: {
          color: color.red,
          fontSize: 12 * scale,
        },
        formatter:  (value : any, index :any) =>{
          return `${value}%`;
        },
      },
    },
  ],
  xAxis: [
    {
      show: false,
      type: "category",
      data: [],
      // boundaryGap: ["20%"],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        //   rotate: 45,
        padding: [15, 0, 0, 0],
        textStyle: {
          fontSize: 16 * scale,
          color: "#3fdaff",
        },
      },
    },
  ],
  series: [],
},
{
title: {
    text: '',
    left: "center",
    top: 30, // 调整标题的垂直位置
    textStyle: {
      color: "#24fffe",
      fontSize: 24 * scale,
    },
    triggerEvent: true,
  },
  legend: {
  
  },
  backgroundColor: 'transparent',

  grid: {
    left: "8%",
    right: "26%",
    bottom: "5%",
    top: 120,
    containLabel: true,
  },
  yAxis: [
    {
      show: false,
      name: "百分比%",
      // nameGap: 20,
      nameTextStyle: {
        color: color.red,
        fontStyle: 14 * scale,
      },
      type: "value",
      max: bodyMax,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        inside: false,
      },
      axisLabel: {
        textStyle: {
          color: color.red,
          fontSize: 12 * scale,
        },
        formatter:  (value : any, index :any) =>{
          return `${value}%`;
        },
      },
    },
  ],
  xAxis: [
    {
      show: false,
      type: "category",
      data: [],
      // boundaryGap: ["20%"],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        //   rotate: 45,
        padding: [15, 0, 0, 0],
        textStyle: {
          fontSize: 16 * scale,
          color: "#3fdaff",
        },
      },
    },
  ],
  series: [],
},
{
title: {
    text: '',
    left: "center",
    top: 30, // 调整标题的垂直位置
    textStyle: {
      color: "#24fffe",
      fontSize: 24 * scale,
    },
    triggerEvent: true,
  },
  legend: {
   
  },
  backgroundColor: 'transparent',

  grid: {
    left: "8%",
    right: "26%",
    bottom: "5%",
    top: 120,
    containLabel: true,
  },
  yAxis: [
    {
      show: false,
      name: "百分比%",
      // nameGap: 20,
      nameTextStyle: {
        color: color.red,
        fontStyle: 14 * scale,
      },
      type: "value",
      max: bodyMax,
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        inside: false,
      },
      axisLabel: {
        textStyle: {
          color: color.red,
          fontSize: 12 * scale,
        },
        formatter:  (value : any, index :any) =>{
          return `${value}%`;
        },
      },
    },
  ],
  xAxis: [
    {
      show: false,
      type: "category",
      data: [],
      // boundaryGap: ["20%"],
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: color.line,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        //   rotate: 45,
        padding: [15, 0, 0, 0],
        textStyle: {
          fontSize: 16 * scale,
          color: "#3fdaff",
        },
      },
    },
  ],
  series: [],
}];


const tcolor = ref<any>([]);


optionRates.value = [
  {
// backgroundColor: "#fff",
title: {
    text: '今日目标',
   show : false
   
  },
series: {
  type: "pie",
  radius: ["55", "60"],
 
  hoverAnimation: false,
  label: {
    normal: {
      position: "center",
    },
  },

  data: [],
},
  },
  {
// backgroundColor: "#fff",
title: {
    text: '热压一目标',
   show : false
   
  },
series: {
  type: "pie",
  radius: ["55", "60"],
 
  hoverAnimation: false,
  label: {
    normal: {
      position: "center",
    },
  },

  data: [],
},
  },
  {
// backgroundColor: "#fff",
title: {
    text: '热压二目标',
   show : false
   
  },
series: {
  type: "pie",
  radius: ["55", "60"],
 
  hoverAnimation: false,
  label: {
    normal: {
      position: "center",
    },
  },

  data: [],
},
  },
  {
// backgroundColor: "#fff",
title: {
    text: '月目标',
   show : false
   
  },
series: {
  type: "pie",
  radius: ["55", "60"],
 
  hoverAnimation: false,
  label: {
    normal: {
      position: "center",
    },
  },

  data: [],
},
  },
  {
// backgroundColor: "#fff",
title: {
    text: '热压一月目标',
   show : false
   
  },
series: {
  type: "pie",
  radius: ["55", "60"],
 
  hoverAnimation: false,
  label: {
    normal: {
      position: "center",
    },
  },

  data: [],
},
  },
  {
// backgroundColor: "#fff",
title: {
    text: '热压二月目标',
   show : false
   
  },
series: {
  type: "pie",
  radius: ["55", "60"],
 
  hoverAnimation: false,
  label: {
    normal: {
      position: "center",
    },
  },

  data: [],
},
  },
];


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

function searchAll()
{ 
  console.log(formModel.value)
  errorMessage.value = '';
  getMeterList();
  getTargetRateData();
  getMoldRateData();
  getOverweightData();
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

  .container {
    background-size: cover;
    width: 100%;
    height:100%;
   // background-image: url('@/assets/images/pageBg.png');
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
    height: 30px;
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
.right-dv-border-box {
    width: 1100px;
    height: 455px;
    margin-bottom: 18px;
  }
.right-dv-border-box-son {
    width: 1100px;
    height: 455px;
    padding: 25px;
    padding-top: 55px;
  }

  .right-dv-border-box2 {
    width: 800px;
    height: 455px;
    margin-bottom: 18px;
  }
.right-dv-border-box-son2 {
    width: 800px;
    height: 455px;
    padding: 25px;
    padding-top: 55px;
  }
  .production-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    color: white;
    margin-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    .sub {
      flex: 1;
      text-align: center;
      // background: #0d2742;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
      border: 1px solid #0e94eb;
      height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .production-box2 {
    display: flex;
    flex-direction: row;
    width: 100%;
    color: white;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    .sub2 {
      flex: 1;
      text-align: center;
      // background: #0d2742;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
     // border: 1px solid #0e94eb;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .production-box3 {
    display: flex;
    flex-direction: row;
    width: 100%;
    color: white;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    .sub3 {
      flex: 1;
      text-align: center;
      // background: #0d2742;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
      border: 1px solid #0e94eb;
      height: 115px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .mark {
    background: #f2f2f2;
    width: 3.5rem;
    height: 3rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    line-height: 1.1;
    text-align: center;
    position: absolute;
    top: -1.85rem;
    right: -2.1rem;
    transform: rotate(45deg);
  }

.numRate ::v-deep .arco-statistic-content .arco-statistic-value-integer  {
  text-align: center;
  color: #12f4ff;
  font-size: 22px;
  font-weight: bold;
 
}
.numRate ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
      text-align: center;
  color: #12f4ff;
  font-size: 22px;
  font-weight: bold;
}
.numRate ::v-deep .arco-statistic-content .arco-statistic-value-integer  {
  text-align: center;
  color: #12f4ff;
  font-size: 22px;
  font-weight: bold;
}
.numRate ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
     text-align: center;
  color: #12f4ff;
  font-size: 22px;
  font-weight: bold;
}
.textRate
{
 // color: #12f4ff;
 text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: -5px;

}
.container-row {
    height: 985px;
    padding: 15px !important;
    margin: 0 !important;
  }
  .table-dv-border-box {
    width: 1890px;
    height: 933px;
    padding: 30px 30px;
  }
  .selector-title {
    color: white;
    font-size: 18px;
    padding-left: 5px;
    text-align: left;
    margin-top: -10px;
  }
  .production-info {
    line-height: 1.5;
    :deep(.arco-statistic-title) {
      color: white;
      font-size: 18px;
      margin-top: 5px;
      margin-bottom: 0;
      font-weight: 600;
    }

    :deep(.arco-statistic-value) {
      font-weight: bold;
    }

    :deep(.arco-statistic-value-integer),
    :deep(.arco-statistic-value-decimal) {
      font-size: 30px;
      color: #12f4ff;
    }

    :deep(.arco-statistic-suffix) {
      font-size: 30px;
    }
  }

</style>
