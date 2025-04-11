<template>

  <dv-full-screen-container class="full">
    <VScaleScreen
 width="1920"
 height="1080"
 :full-screen="true"
 >
    <div class="container">
      <div class="bg">
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
                          <a-link @click="full" class="button4"  style="position: fixed;right: 0; top: 0; ">
                <img
                  src="@/assets/images/full.png"
                  style="width: 40px;  "
                  @click="full"
                /> </a-link>
            </div>
            <div class="" style="margin: 0 20px">
              <div class="left-side">
                <div class="panel">
                  <h1 class="tit">{{ $t('menu.list.Kanban_device_A') }}</h1>
                </div>
                <div style="color: red">{{ errorMessage }}</div>
                <div class="grid-demo-background">
                  <a-space
                    direction="vertical"
                    :size="16"
                    style="display: block"
                  >
                    <a-row class="grid-demo">
                      <!-- //第一列 -->
                      <a-col :span="8">
                        <div class="one">
                          <div class="one_top">
                            <a-card
                              class="card-demo boder margin_10"
                              :title="
                                $t('Kanban_device_A.form.devMaintenance')
                              "
                              hoverable
                            >
                              <template #extra>
                                <a-link @click="handleClick1">{{
                                  $t('Kanban_device_A.form.detail')
                                }}</a-link>
                              </template>
                              <div class="card_content" style="display: flex">
                                <div style="flex-grow: 1">
                                  <categoriesPpercent
                                    :mask="baoyangonerate"
                                    style="color: white"
                                    :title="
                                      $t('Kanban_device_A.form.onefinishrate')
                                    "
                                /></div>

                                <div style="flex-grow: 1">
                                  <categoriesPpercent
                                    style="color: white"
                                    :mask="baoyangtworate"
                                    :title="
                                      $t('Kanban_device_A.form.twofinishrate')
                                    "
                                  />
                                </div>
                              </div>
                            </a-card>
                          </div>
                          <div class="one_bottom">
                            <a-card
                              class="card-demo boder margin_10"
                              :title="$t('Kanban_device_A.form.devrepair')"
                              hoverable
                            >
                              <template #extra>
                                <a-link @click="handleClick2">{{
                                  $t('Kanban_device_A.form.detail')
                                }}</a-link>
                              </template>
                              <div class="card_content">
                                <div style="display: flex">
                                  <div style="flex-grow: 1">
                                    <categoriesPpercent
                                      :mask="finishedrate"
                                      style="color: white"
                                      :title="
                                        $t('Kanban_device_A.form.repairOk')
                                      "
                                    />
                                  </div>
                                  <div style="flex-grow: 1">
                                    <categoriesPpercent
                                      :mask="repairingrate"
                                      style="color: white"
                                      :title="
                                        $t('Kanban_device_A.form.repairing')
                                      "
                                    />
                                  </div>
                                </div>
                                <div
                                  style="
                                    margin-top: 200px;
                                    margin-left: 150px;
                                  "
                                >
                                  <categoriesPpercent
                                    :mask="waitrate"
                                    style="color: white"
                                    :title="
                                      $t('Kanban_device_A.form.waitrepair')
                                    "
                                  />
                                </div>
                              </div>
                            </a-card>
                          </div>
                        </div>
                      </a-col>
                      <!-- //第二列 -->
                      <a-col :span="8">
                        <div class="two">
                          <div style="display: flex">
                            <div style="flex-grow: 1">
                              <span style="color: white"
                                >{{ $t('Kanban_device_A.form.org') }}：</span
                              >

                              <a-select
                                v-model="formModel.selectorg"
                                :style="{ width: '160px' }"
                                placeholder="Select"
                                :trigger-props="{
                                  autoFitPopupMinWidth: true,
                                }"
                                @change="FunGetAddreslist"
                              >
                                <a-option
                                  v-for="item in orgList"
                                  :key="item.ORG_CODE"
                                  :value="item.ORG_CODE"
                                  >{{ item.ORG_NAME }}</a-option
                                >
                              </a-select>
                            </div>
                            <div style="flex-grow: 2">
                              <span style="color: white"
                                >{{
                                  $t('Kanban_device_A.form.daterange')
                                }}：</span
                              ><a-range-picker
                                v-model="formModel.selectdate"
                                style="width: 254px; margin-bottom: 15px"
                              />
                            </div>
                            <div style="flex-grow: 1">
                              <a-button type="primary" @click="search">{{
                                $t('Kanban_device_A.form.search')
                              }}</a-button>
                            </div>
                          </div>
                          <div class="card_content">
                            <div style="padding-top: 4vh">
                              <h2>{{
                                $t(
                                  'Kanban_device_A.form.devicestatusPiechart'
                                )
                              }}</h2>
                              <a-spin style="width: 100%" :loading="loading">
                                <Chart height="350px" :option="chartOption" />
                              </a-spin>
                            </div>
                            <!-- <div>---------------orgList-------</div> -->
                            <div style="margin-top: 5vh">
                              <h2>{{
                                $t(
                                  'Kanban_device_A.form.diagnosiscausesRanking'
                                )
                              }}</h2>
                              <div style="margin-top: -2vh">
                                <div>
                                  <a-spin
                                    style="width: 100%"
                                    :loading="loading"
                                  >
                                    <onebottomone
                                      :option="option"
                                    ></onebottomone>
                                  </a-spin>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a-col>
                      <!-- //第三列 -->
                      <a-col :span="8">
                        <div class="three">
                        
                          <div
                            style="
                              width: 500px;
                              text-align: left;
                              position: fixed;
                              top: 0;
                              right: 0;
                              margin: 70px 30px 0 0;
                              flex-grow: 1
                            "
                            >
                            <div style="display: flex">
                          <div style="flex-grow: 1;margin-top: 15px; margin-left: -60px;">
                              <span style="color: white"
                                > 位置：</span
                              >

                              <a-select
                                v-model="formModel.selectaddress"
                                :style="{ width: '170px' }"
                                placeholder="Select"
                                :trigger-props="{
                                  autoFitPopupMinWidth: true,
                                }"
                               @change="FunGetMaintenanceByAddres"
                              >
                                <a-option
                                  v-for="item in addressList"
                                  :key="item.CODE"
                                  :value="item.CODE"
                                  >{{ item.NAME }}</a-option
                                >
                              </a-select>
                          
                          </div>
                          <div style="flex-grow: 1;"> <h2 class="time">{{ timeNow }}</h2>   
                          </div>
                            
                          </div>
                          </div>
                       
                          <div class="three_top">
                            <a-card
                              class="card-demo margin_10"
                              :title="
                                $t('Kanban_device_A.form.Maintenancetasks')
                              "
                              hoverable
                            >
                              <template #extra>
                                <a-link @click="handleClick3">{{
                                  $t('Kanban_device_A.form.detail')
                                }}</a-link>
                              </template>
                              <a-table
                                v-model:selectedKeys="selectedKeys"
                                row-key="name"
                                :columns="columns"
                                :data="baoyanglist"
                                :pagination="pagination"
                                :table-layout-fixed="true"
                                :scroll="scroll"
                                :scrollbar="scrollbar"
                              />
                            </a-card>
                          </div>
                          <div class="three_bottom">
                            <a-card
                              class="card-demo margin_10"
                              :title="$t('Kanban_device_A.form.repairtasks')"
                              hoverable
                            >
                              <template #extra>
                                <a-link @click="handleClick4">{{
                                  $t('Kanban_device_A.form.detail')
                                }}</a-link>
                              </template>
                              <a-table
                                v-model:selectedKeys="selectedKeys"
                                row-key="name"
                                :columns="columns1"
                                :data="repairlist"
                                :pagination="pagination"
                                :table-layout-fixed="true"
                                :scroll="scroll"
                                :scrollbar="scrollbar"
                              />
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

</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import useChartOption from '@/hooks/chart-option';
import useLoading from '@/hooks/loading';
import moment from 'moment';
import {
  Getorg,
  GetMaintenanceList,
  RepairList,
  DevicestatusRate,
  MaintenanceCompletionRate,
  RepairCompletionRate,
  GetToplist,
  GetAddreslist,
} from '@/api/kanbandevicea';
import {
  GetNowTime
} from '@/api/General';
// import { useI18n } from 'vue-i18n';
import router from '@/router';
import { EChartsOption } from 'echarts';
import categoriesPpercent from './components/categories-percent.vue';
import onebottomone from './components/onebottomone.vue';

const generateFormModel = () => {
  return {
    selectorg: '1001',
    selectdate: ['2023-05-01', '2023-05-09'],
    selectaddress:'',
  };
};
const datatop = ref<any>([]);
const data1 = ref<any>([]);
const { loading } = useLoading();
const orgList = ref<any>([]);
const addressList = ref<any>([]);
const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);
const pagination = { pageSize: 5 };
const formModel = ref(generateFormModel());
const percentdate = ref<any>([]);
const data = ref<any>([]);
const localdate = ref<any>([]);
const baoyanglist = ref<any>([]);
const repairlist = ref<any>([]);
const baoyangRata = ref<any>([]);
const repairRata = ref<any>([]);
const baoyangonerate = ref<number>(0);
const baoyangtworate = ref<number>(0);
const waitrate = ref<number>(0);
const repairingrate = ref<number>(0);
const finishedrate = ref<number>(0);
const scrollbar = ref(true);
const timeNow = ref('');
const errorMessage = ref('');
const timer2 = setInterval(async () => {
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
const scroll = {
  y: 250,
};
const columns = [
  {
    title: '位置',
    dataIndex: 'ADDRESS',
        width: 115,
  },
  {
    title: '设备编码',
    dataIndex: 'SNID',
    width: 115,
  },
  {
    title: '设备名称',
    dataIndex: 'DEVICE_NAME',
    width: 80,
  },
  {
    title: '级别',
    dataIndex: 'LEVEL_NAME',
  },
  {
    title: '待保养',
    dataIndex: 'QTY',
  },
  {
    title: '计划完成日期',
    dataIndex: 'PLAN_FINISHDATE',
    width: 100,
  },
];
const columns1 = [
  {
    title: '位置',
    dataIndex: 'ADDRESS',
    width: 100,
  },
  {
    title: '设备编码',
    dataIndex: 'SNID',
    width: 115,
  },
  {
    title: '设备名称',
    dataIndex: 'DEVICE_NAME',
    width: 80,
  },
  {
    title: '报障内容',
    dataIndex: 'BZ_REMARK',
  },
  {
    title: '报障员',
    dataIndex: 'BZ_USER',
    width: 60,
  },
  {
    title: '报障日期',
    dataIndex: 'BZ_DATE',
    width: 100,
  },
];

onMounted(() => {
  // 最大化
  const element = document.documentElement;
  element.requestFullscreen();
  // 读取缓存数据
  const getLocalorg =  window.sessionStorage.getItem('org_code');
  const getLocaldate = window.sessionStorage.getItem('selectdate');
  const getaddress= window.sessionStorage.getItem('address');
  console.log('读取缓存数据')
  console.log(getLocaldate);
  console.log(getLocalorg);
  console.log(getaddress);
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
   FunGetAddreslist();// console.log('我是111');
   if (getaddress != null) {
    formModel.value.selectaddress = getaddress;
  } 
});
onMounted(async () => {
  const date: any = await GetNowTime(); // console.log('onMounted');
  formModel.value.selectdate[0] = date.list.replace('年','-').replace('月','-').split('日')[0].toString();
  formModel.value.selectdate[1] = date.list.replace('年','-').replace('月','-').split('日')[0].toString();
  search();
});

let timerlist: any = 1;
timerlist = window.setInterval(() => {
  reLoadDate();
  // window.clearInterval(timerlist);
}, 600*1000);


const reLoadDate = async () => {
  // setLoading(true);
  try {
    const date: any = await GetNowTime();
    if(date.list.split(' ')[1].substring(0,2)==="01")
    {

      // if(date.list.replace('年','-').replace('月','-').split('日')[0].toString() !== formModel.value.selectdate[1])
      // {
      // formModel.value.selectdate[0] = date.list.replace('年','-').replace('月','-').split('日')[0].toString();
      // formModel.value.selectdate[1] = date.list.replace('年','-').replace('月','-').split('日')[0].toString();
      // }
   
      formModel.value.selectdate[0] = date.list.replace('年','-').replace('月','-').split('日')[0].toString();
      formModel.value.selectdate[1] = date.list.replace('年','-').replace('月','-').split('日')[0].toString();
      
    }
   
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // setLoading(false);
  }
};
const { chartOption } = useChartOption((isDark) => {
  return {
    legend: {
      left: 'center',
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      itemStyle: {
        borderWidth: 0,
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '40%',
          style: {
            text: '设备状态',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 16,
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '50%',
          style: {
            text: '占比%',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 16,
            fontWeight: 500,
          },
        },
      ],
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: '#fff',
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        data: data.value,
      },
    ],
  };
});
const option = ref<EChartsOption>();
option.value = {
  dataset: {
    source: datatop.value,
  },
  tooltip: {
    show: true,
    trigger: 'item',
  },
  grid: { containLabel: true },
  xAxis: [
    {
      name: '数量',
      axisLabel: {
        color: '#fff',
        fontSize: 13,
      },
      axisLine: { lineStyle: { color: '#fff' } },
    },
  ],
  yAxis: [
    {
      type: 'category',
      axisLabel: {
        color: '#fff',
        fontSize: 13,
      },
    },
  ],
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    min: 0,
    max: 100,
    text: ['%', '百分比'],
    dimension: 0,
    inRange: {
      color: ['#65B581', '#FFCE34', '#FD665F'],
    },
    textStyle: { color: '#fff' },
  },
  series: [
    {
      type: 'bar',
      label: {
        formatter: '{d}%',
        fontSize: 14,
        color: '#fff',
      },
      encode: {
        // Map the "amount" column to X axis.
        x: 'qty',
        // Map the "product" column to Y axis
        y: 'product',
      },
    },
  ],
};
const getorglist = async () => {// console.log('getorglist');
  const orgdata: any = await Getorg();
  orgList.value = JSON.parse(JSON.stringify(orgdata.list));
};
getorglist();


const FunGetAddreslist = async () => {
  // setLoading(true);
  try { console.log(formModel.value.selectorg);console.log('FunGetAddreslist');
    formModel.value.selectaddress = '0000';
    const vdata: any = await GetAddreslist(formModel.value);
    addressList.value = JSON.parse(JSON.stringify(vdata.list));
    addressList.value.unshift({ CODE: '0000', NAME: '全部' });
    search();
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // setLoading(false);
  }
};

const FunGetMaintenanceByAddres = async () => {
  // setLoading(true);
  try { // console.log('我是选位置');
    setLocal()

    const datalist1: any = await GetMaintenanceList(formModel.value);
    if (datalist1.list.length > 0 && datalist1 != null) {
      baoyanglist.value = JSON.parse(JSON.stringify(datalist1.list));
    } else {
      baoyanglist.value = null;
    }
 
    const datalist2: any = await RepairList(formModel.value);
    repairlist.value = JSON.parse(JSON.stringify(datalist2.list));

  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // setLoading(false);
  }
};


function setLocal() {
  // 缓存条件在浏览器
  window.sessionStorage.setItem('org_code', formModel.value.selectorg);
  window.sessionStorage.setItem(
    'selectdate',
    JSON.stringify(formModel.value.selectdate)
  );
 // console.log(formModel.value.selectaddress);
  window.sessionStorage.setItem('address', formModel.value.selectaddress);
}
const { setLoading } = useLoading();
const search = async () => {
  setLoading(true);
  try {// console.log('我是搜索');
    errorMessage.value = '';
    setLocal();
    console.log(formModel.value.selectdate);
    const datalist1: any = await GetMaintenanceList(formModel.value);
    if (datalist1.list.length > 0 && datalist1 != null) {
      baoyanglist.value = JSON.parse(JSON.stringify(datalist1.list));
    } else {
      baoyanglist.value = null;
    }
 
    const datalist2: any = await RepairList(formModel.value);
    repairlist.value = JSON.parse(JSON.stringify(datalist2.list));

    // console.log(datalist2);

    const datalist3: any = await DevicestatusRate(formModel.value);
    percentdate.value = JSON.parse(JSON.stringify(datalist3.list));
    data.value = percentdate.value;

    const datalist4: any = await MaintenanceCompletionRate(formModel.value);
    baoyangRata.value = JSON.parse(JSON.stringify(datalist4.list));
    baoyangRata.value.forEach((item: any) => {
      baoyangonerate.value = Number(item.onerate);
      baoyangtworate.value = Number(item.tworate);
    });

    const datalist5: any = await RepairCompletionRate(formModel.value);
    repairRata.value = JSON.parse(JSON.stringify(datalist5.list));
    repairRata.value.forEach((item: any) => {
      waitrate.value = Number(item.waitrate);
      repairingrate.value = Number(item.repairingrate);
      finishedrate.value = Number(item.finishedrate);
    });

    const datalist: any = await GetToplist();
    data1.value = JSON.parse(JSON.stringify(datalist.list));
    data1.value.forEach((item: any) => {
      datatop.value.push(item);
    });
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
};

function handleClick1() {
  router.push({
    name: 'maintenanceDetails',
    query: {
      selectdate: formModel.value.selectdate,
      selectorg: formModel.value.selectorg,
    },
  });
}
function handleClick2() {
  router.push({
    name: 'repairDetails',
    query: {
      selectdate: formModel.value.selectdate,
      selectorg: formModel.value.selectorg,
    },
  });
}
function handleClick3() {
  router.push({
    name: 'maintenancetasks',
    query: {
      selectdate: formModel.value.selectdate,
      selectorg: formModel.value.selectorg,
    },
  });
}
function handleClick4() {
  router.push({
    name: 'repairTasks',
    query: {
      selectdate: formModel.value.selectdate,
      selectorg: formModel.value.selectorg,
    },
  });
}
function toList() {
  document.exitFullscreen();
  router.push({
    name: 'Workplace',
    query: {
      // selectdate: formModel.value.selectdate,
      // selectorg: formModel.value.selectorg,
    },
  });
}
const timer = setInterval(() => {
  search();
}, 30000);
// 页面销毁时，清除定时器
onUnmounted(() => {
  clearInterval(timer);
  clearInterval(timer2);
   window.clearInterval(timerlist);
});
function full() {
  toggleFullScreen();  
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
.margin_10 {
  margin: 20px;
}
.txt_center {
  text-align: center;
}
.container {
  background-size: cover;
  background-color: #031a5a;
  background-image: linear-gradient(to bottom, #031a5a, #4c0c76);
  width: 100%;
  height: 100%;
  // height: 1080px;
  background-image: url('@/assets/images/pageBg.png');
  // padding-top: 20px;
}
.bg {
  background: rgba(40, 66, 198, 0.2);
  width: 100%;
  height: 100%;
}
.container_outside {
  background-image: url('@/assets/images/bgmain.png');
  width: 100%;
  height: 100%;
  background-size: cover;
  // border: 1px solid red;
  // box-shadow: rgb(213, 210, 113) 0px 0px 30px inset;
  // border-radius: 20px;
}
.two .card_content {
  background: rgba(96, 191, 243, 0.1);
  box-shadow: rgb(23, 163, 214) 0px 0px 6px inset;
  border-radius: 10px;
  height: 900px;
  // background-color: rgb(251, 249, 249);
  overflow: hidden;
  color: white;
  margin-top: 10px;
}
::v-deep .arco-card {
  background-color: transparent;
  box-shadow: rgb(23, 163, 214) 0px 0px 6px inset;
  border-radius: 10px;
  border: none;
  background: rgba(96, 191, 243, 0.1);
}
::v-deep .arco-card-header {
  // color: white;
  border: none;
  box-shadow: rgb(23, 163, 214) 0px 0px 6px inset;
  border-radius: 10px;
}
.button {
  box-shadow: rgb(23, 163, 214) 0px 0px 6px inset;
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
}
.one_top {
  margin-top: 57px;
}
.three {
  margin-top: 57px;
  // border: 1px solid red;
}
::v-deep .one .one_top .arco-card-size-medium .arco-card-body {
  height: 300px;
}
::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
  height: 480px;
}
::v-deep .three .arco-card-size-medium .arco-card-body {
  // background-image: url('@/assets/images/bg.png');
  background-size: cover;
  height: 390px;
}

.one .card_content {
  height: 95%;
  text-align: center;
  margin: 0px auto;
}
.one .card_content div {
  text-align: center;
  margin: 0px auto;
  // margin-left: 13px;
  margin-top: 0.8vh;
}
::v-deep .arco-table-body {
  background-color: transparent;
}
::v-deep .arco-table-td {
  // border: 1px solid red;
  overflow: hidden;
  font-size: 1.3vh;
  background-color: transparent;
  color: white;
}
::v-deep .arco-table-tr {
  height: 4.5vh;
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
  font-size: 1.3vh;
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
</style>
