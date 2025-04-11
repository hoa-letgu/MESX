<template>
  <div class="container">
    <div class="container_outside">
      <div style="color: red">{{ errorMessage }}</div>
      <!-- <Breadcrumb :items="['menu.list', 'menu.list.Kanban_device_A']" />
    <a-card class="general-card" :title="$t('menu.list.F_PERMISSION_MANGE')">
      <a-row> -->
      <a-spin
        :loading="loading"
        tip="数据加载中...(Loading data...)"
        style="width: 100%"
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="" style="margin: 0 20px">
          <div class="left-side">
            <div class="panel" style="height: 30px;margin: 0 22px;">
              <div style="display: flex;">        
                <div style="flex: 1;"> <h2 style="color:var(--color-text-1)">{{ timeNow }}</h2></div>
                <div style="flex: 1;text-align: center; margin-top: -20px;"> <h1 style="color:var(--color-text-1)">{{ $t('Kanban.list_manufact_2') }}</h1></div>
                <div style="flex: 1.5;position: relative;">
                  <div style="right: 0;position: absolute;">
                              <a-date-picker 
                                  :disabled="isDisabled"
                                  style="width: 140px; background-color: white;"
                                  value-format="YYYY/MM/DD"
                                  v-model="startdate"
                              />&nbsp; 
                      <button id="searchByDate" @click="searchByDate" class="button  button2">查询</button> &nbsp;&nbsp; 
                <button id="stop" @click="stop" class="button  button1">停止</button> &nbsp;&nbsp;
                     <button id="start" @click="start" class="button  button2">播放</button>&nbsp;&nbsp;
                     <button @click="next"  class="button  button3">下一界面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid-demo-background" style="margin-top: 20px;">
              <a-space direction="vertical" :size="16" style="display: block;">
                <a-row class="grid-demo">
                  <a-col  :span="10" style="margin-left: -230px;">
                    <div class="one">
                      <div class="one_top">
                        <a-card
                          class="card-demo boder margin_10"
                          :title="'加工(MACHINETIME)'"
                          hoverable
                          style="width: 130%"
                        >    
                          <div class="card_content" style="display: flex">
                            <div style="flex-grow: 1;">
                              <Chart width="100%" height="530px"   :option="chartOption" />
                            </div>

                           
                          </div>
                        </a-card>
                      </div>
                      <div >
                        <a-card
                          class="card-demo margin_10"
                          style="height: 200px; width: 130%;"
                          hoverable
                        >
                        <table style="width:100%; height:170px;" >
                          <tr style="width: 100%; height: 33%;">
                            <td style="width: 35%;" colspan="3"><div>当前样品计划完成双数</div>
                            PLANNED QTY. OF SAMPLE PROD.</td> 
                            <td style="width: 15%;">{{TOTALQTY1===""? 0 : TOTALQTY1}}</td> 
                          </tr>
                          <tr style="width: 100%;">
                            <td style="width: 35%;"><div>实际完成数量</div>FINISHED QTY.</td> 
                            <td style="width: 15%;">{{TOTALFSQTY1}}</td>
                            <td style="width: 35%;"><div>完成比例(%)</div>PERCENTAGE OF FINISH(%)</td> 
                            <td style="width: 15%;">{{FSP1}}%</td> 
                          </tr>
                          <tr style="width: 100%;">
                            <td style="width: 35%;"><div>RFT目标(%)</div>RFT TARGET(%)</td> 
                            <td style="width: 15%;">91%</td>
                            <td style="width: 35%;"><div>RFT实际达成(%)</div>RFT ACTUAL(%)</td> 
                            <td style="width: 15%;">{{PASSP1}}%</td> 
                          </tr>
                        </table>
                        </a-card>
                      </div>
                    </div>
                  </a-col> <a-col :span="4"></a-col>
                  <a-col :span="10" >
                    <div class="one">
                      <div class="one_top">
                        <a-card
                          class="card-demo boder margin_10"
                          :title="'工艺(TECHNOLOGY)'"
                          hoverable
                          style="width: 130%;"
                        >
                        <div class="card_content" style="display: flex">
                            <div style="flex-grow: 1">
                              <Chart width="100%" height="530px" :option="chartOption2" />
                            </div>

                           
                          </div>
                        </a-card>
                      </div>
                      <div >
                        <a-card
                          class="card-demo margin_10"
                          style="height: 200px; width: 130%;"
                          hoverable
                        >
                        <table style="width:100%; height:170px;" >
                          <tr style="width: 100%; height: 33%;">
                            <td style="width: 35%;" colspan="3"><div>当前样品计划完成双数</div>
                            PLANNED QTY. OF SAMPLE PROD.</td> 
                            <td style="width: 15%;">{{TOTALQTY2===""? 0 : TOTALQTY2}}</td> 
                          </tr>
                          <tr style="width: 100%;">
                            <td style="width: 35%;"><div>实际完成数量</div>FINISHED QTY.</td> 
                            <td style="width: 15%;">{{TOTALFSQTY2}}</td>
                            <td style="width: 35%;"><div>完成比例(%)</div>PERCENTAGE OF FINISH(%)</td> 
                            <td style="width: 15%;">{{FSP2===""? 0 : FSP2}}%</td> 
                          </tr>
                          <tr style="width: 100%;">
                            <td style="width: 35%;"><div>RFT目标(%)</div>RFT TARGET(%)</td> 
                            <td style="width: 15%;">98%</td>
                            <td style="width: 35%;"><div>RFT实际达成(%)</div>RFT ACTUAL(%)</td> 
                            <td style="width: 15%;">{{PASSP2===""? 0 : PASSP2}}%</td> 
                          </tr>
                        </table>
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
</template>

<script lang="ts" setup>
  import { ref,onBeforeMount, onMounted,onBeforeUnmount } from 'vue';
  import useChartOption from '@/hooks/chart-option';
  import useChartOption2 from '@/hooks/chart-option';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';
  import {
    Getdatapie,
    Getdatatable,
    GetTechnologydatapie,
    GetTechnologydatatable

  } from '@/api/kanbansample';
  // import { useI18n } from 'vue-i18n';
  import router from '@/router';
  import { EChartsOption } from 'echarts';
  import categoriesPpercent from './components/categories-percent.vue';
  import onebottomone from './components/onebottomone.vue';


  const generateFormModel = () => {
    return {
      selectorg: '1001',
      selectdate: ['2023-05-01', '2023-05-09'],
    };
  };
  const datatop = ref<any>([]);
  const data1 = ref<any>([]);
  const data2 = ref<any>([]);
  const { loading } = useLoading();
  const orgList = ref<any>([]);
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
  const TOTALQTY1 = ref<any>([]);
  const TOTALFSQTY1 = ref<any>([]);
  const FSP1 = ref<any>([]);
  const PASSP1 = ref<any>([]);
  const TOTALQTY2 = ref<any>([]);
  const TOTALFSQTY2 = ref<any>([]);
  const FSP2 = ref<any>([]);
  const PASSP2 = ref<any>([]);
  const TOTALQTY3 = ref<any>([]);
  const TOTALFSQTY3 = ref<any>([]);
  const FSP3 = ref<any>([]);
  const PASSP3 = ref<any>([]);
  const isDisabled = ref(true);
  const startdate = ref<any>([]);

  isDisabled.value=true;
    startdate.value = moment(
      moment().add(0, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
  setInterval(() => {
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
  const scroll = {
    y: 225,
  };

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
      obj.starttime = moment(
        moment().week(moment().week()).startOf('week').add(1, 'days').valueOf()
      ).format('YYYY-MM-DD');
      obj.endtime = moment(
        moment().week(moment().week()).endOf('week').add(1, 'days').valueOf()
      ).format('YYYY-MM-DD');
      range.value.push(obj.starttime);
      range.value.push(obj.endtime);
      formModel.value.selectdate = range.value;
      // console.log(range);
    }
  });
  const { chartOption } = useChartOption((isDark) => {
    return {
      label: {
          formatter: (params:any) => {
            if (params) {
              return `${params.percent === undefined ? 0 : params.percent}%`
            }
            return ''
          },
            fontSize: 16,
            color:"black",
          },
        tooltip: {
          trigger: 'item'
        },
      legend: {
        orient: 'horizontal',
        left: 'left',
        textStyle:{
          color:"black",
          fontSize: 16,
        },
        
      },
      color : ['#006400','#C0C0C0','#FF0000'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: 
        data.value
       ,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
      },


    }
  ]
    };
  });

  const {chartOption2}  = useChartOption((isDark) => {
    return {
      label: {
          formatter: (params:any) => {
            if (params) {
              return `${params.percent === undefined ? 0 : params.percent}%`
            }
            return ''
          },
            fontSize: 16,
            color:"black",
          },
        tooltip: {
          trigger: 'item'
        },
      legend: {
        orient: 'horizontal',
        left: 'left',
        textStyle:{
          color:"black",
          fontSize: 16,
        },
        
      },
      color : ['#006400','#C0C0C0','#FF0000'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data:  data1.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
      },


    }
  ]
    };
  });

  const { chartOption3 } = useChartOption((isDark) => {
    return {
      label: {
            formatter: '{d}%',
            fontSize: 14,
            color:"orange",
          },
        tooltip: {
          trigger: 'item'
        },
      legend: {
        orient: 'horizontal',
        left: 'left',
        textStyle:{
          color:"orange",
        },
        
      },
      color : ['#006400','#C0C0C0','#FF0000'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: 
        data2.value
       ,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
      },


    }
  ]
    };
  });

 
  onMounted(async () => {
    search();
   const btnstart =  document.getElementById("start") as HTMLButtonElement;
   btnstart.disabled  = true;
   btnstart.className = ''
   const btnsearchByDate =  document.getElementById("searchByDate") as HTMLButtonElement;
  btnsearchByDate.disabled  = true;
  btnsearchByDate.className = '';
     timer =  window.setInterval(() => {
      window.clearInterval(timer);
      router.push({
      name: 'kanban_manufact_1',
    });
  }, 30000);
  });
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
    try {
      setLocal();
      console.log(startdate.value)
      const datalist1: any = await Getdatapie("E",startdate.value);
      data.value = datalist1.list;
      // console.log(   datalist1.list )

      const datatable1: any = await Getdatatable("E",startdate.value);
      TOTALQTY1.value = datatable1.list[0].TOTALQTY
      TOTALFSQTY1.value = datatable1.list[0].TOTALFSQTY
      FSP1.value = datatable1.list[0].FSP
      PASSP1.value = datatable1.list[0].PASSP
      // console.log(  TOTALQTY1.value )

      const datalist2: any = await GetTechnologydatapie(startdate.value);
      data1.value = datalist2.list;
      // console.log(   datalist2.list )

      const datatable2: any = await GetTechnologydatatable(startdate.value);
      TOTALQTY2.value = datatable2.list[0].TOTALQTY
      TOTALFSQTY2.value = datatable2.list[0].TOTALFSQTY
      FSP2.value = datatable2.list[0].FSP
      PASSP2.value = datatable2.list[0].PASSP
      // console.log(  TOTALQTY2.value )


     } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }

 
  };


  let timer:any = 1;
  function stop()
  {
      window.clearInterval(timer);
      const btnstart =  document.getElementById("start") as HTMLButtonElement;
      btnstart.disabled  = false;
      btnstart.className = 'button  button2';
      const btnstop =  document.getElementById("stop") as HTMLButtonElement;
      btnstop.disabled  = true;
      btnstop.className = '';
      const btnsearchByDate =  document.getElementById("searchByDate") as HTMLButtonElement;
      btnsearchByDate.disabled  = false;
      btnsearchByDate.className = 'button  button3';
      isDisabled.value=false;
  }

function start()
{
  const btnstart =  document.getElementById("start") as HTMLButtonElement;
  btnstart.disabled  = true;
  btnstart.className = '';
  const btnstop =  document.getElementById("stop") as HTMLButtonElement;
  btnstop.disabled  = false;
  btnstop.className = 'button  button1';
  const btnsearchByDate =  document.getElementById("searchByDate") as HTMLButtonElement;
  btnsearchByDate.disabled  = true;
  btnsearchByDate.className = '';
  isDisabled.value=true;
  startdate.value = moment(
    moment().add(0, 'days').startOf('day').valueOf()
  ).format('YYYY/MM/DD');
  search();
  
  timer =  window.setInterval(() => {
  window.clearInterval(timer);
  router.push({
      name: 'kanban_manufact_1',
    });
  }, 30000);
}

function next()
{
  router.push({
      name: 'kanban_manufact_1',
    });
}

function searchByDate()
  {
      search();
  }


onBeforeUnmount( () => {

    window.clearInterval(timer);

  });
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
    // background-size: cover;
    // background-color: #031a5a;
    // background-image: linear-gradient(to bottom, #031a5a, #4c0c76);
    width: 100%;
    height: 1080px;
    //background-image: url('@/assets/images/backgroud-1.png');
    // padding-top: 20px;
  }
  .container_outside {
    //background-image: url('@/assets/images/bgmain.png');
    width: 100%;
    height: 100%;
    background-size: cover;
    // border: 1px solid red;
    // box-shadow: rgb(213, 210, 113) 0px 0px 30px inset;
    // border-radius: 20px;
  }
  // .two .card_content {
  //   background: rgba(96, 191, 243, 0.1);
  //   box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
  //   border-radius: 10px;
  // }
  ::v-deep .arco-card {
    background-color: transparent;
    box-shadow: rgba(20, 20, 20, 0.692) 0px 0px 10px inset;
    border-radius: 10px;
    border: none;
    background:var(--color-text-5);
  }
  ::v-deep .arco-card-header {
    // color: white;
    border: none;
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .button {
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .tit {
    text-align: center;
    padding-top: 20px;
    color: var(--color-text-1);
    padding-bottom: 10px;
    // box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    // border-radius: 10px;
    width: 300px;
    margin: 0px auto;
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
    margin-left: 230px;
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

  // ::v-deep .arco-card-header-title {
  //   color: white;
  // }
  .one_top {
    margin-top: 2px;
  }
  .three {
    // margin-top: 10px;
    // border: 1px solid red;
  }
  ::v-deep .one .one_top .arco-card-size-medium .arco-card-body {
    height: 480px;
  }
  ::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
    height: 480px;
  }
  // ::v-deep .three .arco-card-size-medium .arco-card-body {
  //   // background-image: url('@/assets/images/bg.png');
  //   background-size: cover;
  //   height: 388.5px;
  // }

  // .one .card_content {
  //   height: 95%;
  //   text-align: center;
  //   margin: 0px auto;
  // }
  // .one .card_content div {
  //   text-align: center;
  //   margin: 0px auto;
  //   margin-left: 13px;
  //   margin-top: 5px;
  // }
  // .two .card_content {
  //   height: 890px;
  //   // background-color: rgb(251, 249, 249);
  //   overflow: hidden;
  //   color: white;
  //   margin-top: 10px;
  // }
  // ::v-deep .arco-table-body {
  //   background-color: transparent;
  // }
  // ::v-deep .arco-table-td {
  //   // border: 1px solid red;
  //   overflow: hidden;
  //   font-size: 13px;
  //   background-color: transparent;
  //   color: white;
  // }
  // ::v-deep .arco-table-tr {
  //   height: 45px;
  //   overflow: hidden;
  //   white-space: nowrap;
  // }
  // ::v-deep .arco-table-header {
  //   background-color: transparent;
  // }
  // ::v-deep .arco-table-border .arco-table-container {
  //   border: none;
  // }
  // ::v-deep .arco-table-th {
  //   white-space: normal;
  //   background-color: transparent;
  //   color: white;
  // }

  // ::v-deep .arco-table-tr:hover {
  //   white-space: normal;
  // }
  // ::v-deep .arco-table-tr:hover td {
  //   color: black;
  //   border-color: blue;
  // }
  // ::v-deep .arco-pagination-item {
  //   color: white;
  // }
  // ::v-deep .arco-pagination-item:hover {
  //   // color: blue;
  //   background-color: rgb(var(--arcoblue-3));
  // }
  // ::v-deep .arco-pagination-item-active,
  // .arco-pagination-item-active:hover {
  //   background-color: rgb(var(--arcoblue-3));
  // }
  // .box-shadow-4 {
  //   box-shadow: rgb(82, 150, 246) 0px 0px 10px inset;
  //   border-radius: 20px;
  //   // background: rgba(55, 55, 200, 0.2);
  // }
  // ::v-deep .arco-link {
  //   color: rgb(164, 164, 156);
  // }
  // ::v-deep .arco-btn-primary,
  // .arco-btn-primary[type='button'],
  // .arco-btn-primary[type='submit'] {
  //   background-color: transparent;
  //   box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
  //   border-radius: 5px;
  // }
  // ::v-deep .arco-picker {
  //   background-color: transparent;
  //   box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
  //   border-radius: 5px;
  // }
  // ::v-deep .arco-select-view-single {
  //   background-color: transparent;
  //   box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
  //   color: white;
  //   border-radius: 5px;
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
  // }
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
  table {
        width: 400px;
        margin: 0 auto;
        border: 1px solid #000000;
        border-collapse: collapse;
    }
    
    th,
    td {
        border: 1px solid #000000;
        text-align: center;
    }

    .button {
    position: relative;
    background-color: #4CAF50;
    border: none;
    font-size: 12px;
    color: #FFFFFF;
    padding: 8px;
    width: 50px;
    height: 30px;
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
    background-color: white; 
    color: black; 
    border: 2px solid #f5e50cfb;
    width: 100px;
    height: 35px;
}
 
.button3:hover {
    background-color: #f5e50cfb;
    color: white;
}
</style>
