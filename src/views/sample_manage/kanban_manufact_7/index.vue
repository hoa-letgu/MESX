<template>
  <div class="container">
    <div class="container_outside" >
      <div style="color: red;">{{ errorMessage }}</div>
      <!-- <Breadcrumb :items="['menu.list', 'menu.list.Kanban_device_A']" />
    <a-card class="general-card" :title="$t('menu.list.F_PERMISSION_MANGE')">
      <a-row> -->
      <a-spin
        :loading="loading"
        tip="数据加载中...(Loading data...)"
        style="width: 100%"
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
        <div class="" style="margin-top: 0px;">
          <div class="left-side">
            <div class="panel" style="height: 30px;margin: 0 22px;">
              <div style="display: flex;">
                
                <div style="flex: 1;"> <h2 style="color:var(--color-text-1)">{{ timeNow }}</h2></div>
                <div style="flex: 1;text-align: center;margin-top: -20px;"> <h1 style="color:var(--color-text-1)">{{ $t('Kanban.list_manufact_7') }}</h1></div>
                <div style="flex: 1.5;position: relative;">
                  <div style="right: 0;position: absolute;">
                              <a-date-picker 
                                  :disabled="isDisabled"
                                  style="width: 140px; background-color: white;"
                                  value-format="YYYY/MM/DD"
                                  v-model="startdate"
                              />&nbsp; 
                              <button id="searchByDate" @click="searchByDate" class="button  button2">查询</button> &nbsp;&nbsp; 
                <button id="nextpage" @click="nextpage" class="button  button3">下一页</button> &nbsp;&nbsp;
                    <button id="stop" @click="stop" class="button  button1">停止</button> &nbsp;&nbsp;
                     <button id="start" @click="start" class="button  button2">播放</button>&nbsp;&nbsp;
                     <button @click="next"  class="button  button3">下一界面</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid-demo-background" style="margin-top: 20px;">
              <a-space direction="vertical" :size="20" style="display: block">
                <a-row class="grid-demo">
                  <a-col :span="50">
                    <div class="two" style="width: 100%">
                     
                      <div class="card_content">
                        <a-card class="card-demo margin_10"
                          hoverable
                        >
                          <a-table 
                            v-model:selectedKeys="selectedKeys"
                            row-key="name"
                            :columns="columns"
                            :data="cutlist"
                            :pagination="false"      
                     
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
</template>

<script lang="ts" setup>
  import { ref, onMounted,onBeforeUnmount } from 'vue';
  import useLoading from '@/hooks/loading';
  import moment from 'moment';
  import {
    GetTechnologyDetailtList,
    GetTechnologypagecount,
  } from '@/api/kanbansample';
  // import { useI18n } from 'vue-i18n';
  import router from '@/router';
  import { EChartsOption } from 'echarts';
import { Alert } from '@arco-design/web-vue';
import { computed } from 'vue';
import { method } from 'lodash';
import { render } from 'nprogress';


  const datatop = ref<any>([]);
  const data1 = ref<any>([]);
  const { loading } = useLoading();
  const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);
  const pagination = { pageSize: 7 ,};
  const data =ref<any>([]);
  const localdate = ref<any>([]);
  const cutlist = ref<any>([]);
  const scrollbar = ref(true);
  const timeNow = ref('');
  const errorMessage = ref('');
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
    y: 600,
  };
  const columns = [
    {
      title: '课别',
      dataIndex: 'WK_DEPT',
      width: 115,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
     
    },
    {
      title: '类别',
      dataIndex: 'NAME_T',
      width: 130,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '制令号',
      dataIndex: 'SE_ID',
      width: 130,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '季节',
      dataIndex: 'DEVELOP_SEASON',
      width: 80,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '阶段',
      dataIndex: 'ORDER_LEVEL',
      width: 80,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '鞋型',
      dataIndex: 'SHOE_NAME',
      // ellipsis: true,
      // tooltip: true,
      width: 190,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: 'ART',
      dataIndex: 'ART_NO',
      width: 90,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '楦头',
      dataIndex: 'LAST_NO',
      width: 90,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '码数',
      dataIndex: 'BASE_SIZENO',
      width: 90,
      ellipsis: true,
      tooltip: true,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '模号',
      dataIndex: 'MOLD_NO',
      width: 90,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '生产数量(对)',
      dataIndex: 'WK_QTY',
      width: 90,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '完成数量(对)',
      dataIndex: 'CAT_FSQTY',
      width: 90,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '完成比例',
      dataIndex: 'PROPORTION',
      width: 90,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '未完成原因',
      dataIndex: 'ABNL_CAUSE',
      ellipsis: true,
      tooltip: true,
      width: 135,
      bodyCellStyle: (p:any)=>{ // console.log(p.CAT_FSQTY)
        if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
    {
      title: '未完成责任单位',
      dataIndex: 'RESP_VEND',
      ellipsis: true,
      tooltip: true,
      width: 140,
      bodyCellStyle: (p:any)=>{ // console.log(p.rowindex)
         if(p.ABNL_CAUSE!=="" && p.CAT_FSQTY==="0")
        {
          return {
            'color': 'red'
       }
      }
        return {
       

      }
      }
    },
  ];
  let timerlist:any = 1;
  let pageindex:any = 1;
  timerlist =  window.setInterval(() => {

    pageindex +=1;
    search();
  }, 4000);
  onMounted(async () => {
    search();
    const btnstart =  document.getElementById("start") as HTMLButtonElement;
   btnstart.disabled  = true;
   btnstart.className = ''
   const btnnextpage =  document.getElementById("nextpage") as HTMLButtonElement;
      btnnextpage.disabled  = true;
      btnnextpage.className = '';
  const btnsearchByDate =  document.getElementById("searchByDate") as HTMLButtonElement;
  btnsearchByDate.disabled  = true;
  btnsearchByDate.className = '';
    timer =  window.setInterval(() => {
    window.clearInterval(timer);
    router.push({
      name: 'kanban_manufact_2',
    });
  }, 30000);

  

  });
  function setLocal() {
    // 缓存条件在浏览器
  }
  const { setLoading } = useLoading();
  const search = async () => {
    setLoading(true);
    try {
      setLocal();
      const data: any = await GetTechnologypagecount(startdate.value);
      // console.log(data.pagecount)
      if(pageindex>data.pagecount) pageindex = 1
      console.log("T")
      console.log(startdate.value)
      console.log(pageindex)
      const datalist1: any = await GetTechnologyDetailtList(pageindex,startdate.value);
      // console.log(datalist1)
      if (datalist1.list.length > 0 && datalist1 != null) {
        cutlist.value = JSON.parse(JSON.stringify(datalist1.list));
      } else {
        cutlist.value = null;
      }
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  let timer:any = 1;
 
  function stop()
  {
      window.clearInterval(timerlist);
      window.clearInterval(timer);
      const btnstart =  document.getElementById("start") as HTMLButtonElement;
      btnstart.disabled  = false;
      btnstart.className = 'button  button2';
      const btnstop =  document.getElementById("stop") as HTMLButtonElement;
      btnstop.disabled  = true;
      btnstop.className = '';
      const btnnextpage =  document.getElementById("nextpage") as HTMLButtonElement;
      btnnextpage.disabled  = false;
      btnnextpage.className = 'button  button3';
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
  const btnnextpage =  document.getElementById("nextpage") as HTMLButtonElement;
  btnnextpage.disabled  = true;
  btnnextpage.className = '';
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
      name: 'kanban_manufact_2',
    });
  }, 30000);
  timerlist =  window.setInterval(() => {
   // window.clearInterval(timerlist);
    pageindex +=1;
    search();
  }, 4000);
}

function next()
{
  router.push({
      name: 'kanban_manufact_2',
    });
}

function nextpage()
{
  pageindex +=1;
    search();
}


function searchByDate()
{
  pageindex =1;
    search();
}


onBeforeUnmount( () => {

  window.clearInterval(timerlist);
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
    margin: 0,-5px;
  }
  .txt_center {
    text-align: center;
  }
  .container {
    background-size: cover;
    //background-color: #010308;
    //background-image: linear-gradient(to bottom, #05070a, #101011);
    width: 100%;
    height: 1080px;
    //background-image: url('@/assets/images/backgroud-1.png');
    // padding-top: 20px;
  }
  .container_outside {
   // background-image: url('@/assets/images/bgmain.png');
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
    box-shadow: rgb(218, 203, 203) 0px 0px 10px inset;
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
  .button {
    box-shadow: rgb(23, 163, 214) 0px 0px 10px inset;
    border-radius: 10px;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .tit {
    text-align: center;
    padding-top: 0px;
    color: var(--color-text-1);
    padding-bottom: 0px;
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
    margin-top: 60px;
  }
  // .three {
  //   // margin-top: 10px;
  //   // border: 1px solid red;
  // }
  // ::v-deep .one .one_top .arco-card-size-medium .arco-card-body {
  //   height: 300px;
  // }
  // ::v-deep .one .one_bottom .arco-card-size-medium .arco-card-body {
  //   height: 480px;
  // }
  // ::v-deep .three .arco-card-size-medium .arco-card-body {
  //   // background-image: url('@/assets/images/bg.png');
  //   background-size: cover;
  //   height: 700px;
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
  ::v-deep .arco-table-td {
     border: 1px solid olive;
    font-size: 13px;

  }
  // ::v-deep .arco-table-tr {
  //   height: 45px;
  //   overflow: hidden;
  //   white-space: nowrap;
  // }
  // ::v-deep .arco-table{
  //   border-bottom: 1px solid olive;
  // }
  // ::v-deep .arco-table-border .arco-table-container {
  //   border: 1px solid olive;
  // }
  ::v-deep .arco-table-th {
    border: 1px solid olive;
    font-size: 15px;
    font-weight: 1000;
    height: 30px;
  }
  ::v-deep .arco-table-tr {
    white-space: normal;
    border: 1px solid olive;
    height: 50px;
  }

  ::v-deep .arco-table-tr:hover {
    white-space: normal;
  }
  ::v-deep .arco-table-tr:hover td {
    color:var(--color-text-1);
  }
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
