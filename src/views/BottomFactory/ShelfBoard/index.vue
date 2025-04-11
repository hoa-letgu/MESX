<template>
  <dv-full-screen-container class="full" v-show="true" >
  <VScaleScreen
   width="1920"
   height="1080"
   :full-screen="true"
   > 
    <Header
        :title="topTitle"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9' }"
        :right-style="{ color: 'white' }"
        :show-back-button="showBackbutton"
        @on-backbutton-click="handleBackbutton"
        style="height: 50px;"
      >
    
    </Header>

    <a-row  class="grid-demo" style="margin-top: 80px; display: flex;justify-content:flex-end">
      <a-button type="primary" style="background-color: #00baff;" @click="changePage" v-if="btnMsg=='手动模式'?true:false">切换页面</a-button>
      <a-button type="primary" style="background-color: #00baff; margin-left: 5px ;margin-right: 5px ;" @click="autoMode">
        <template #icon>
          <icon-loop />
        </template>
        <template #default>{{ btnMsg }}</template>
      </a-button>
    </a-row>
    <a-row  class="grid-demo" >
        <dv-scroll-board :config="config" class="A1" style="width:1900px;height:950px;margin-top: 10px;margin-left: 10px;" />
        <dv-scroll-board :config="config2" class="A2" style="width:1900px;height:40px;margin-left:10px;margin-bottom: 5px;"/>    
    </a-row>
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
    QueryAllShelf
  } from '@/api/BottomShelfKanBan';
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
 const topTitle = ref<any>('片料仓(A1)货架看板');
  // 顶部-显示返回按钮
  const showBackbutton = ref<boolean>(false);
  // 顶部-显示类型 1：看板 2：热压计量表明细 3：模号达成率明细 
  const dispalyType = ref<number>(1);


  const { loading } = useLoading();
  const formModel = ref(generateFormModel());
  const timeNow = ref('');
  const optionMolds = ref<any>([]);
  const MShows = ref([false, false, false, false, false]); 

  const  columns = ref<any>([]);
  const  config = ref<any>([]);
  const  config2 = ref<any>([]);

  const errorMessage = ref('');

   let MoldPageindex:any;
 
   let timer:any = 1;
  const btnMsg = ref('自动模式');
 
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

  // 动态表格1
  config.value = {  
    header: ['配方', '储位', '批次','生产日期','有效期','库存'],
  data: [
    ['G004', 'E2', '1104063112','2024/5/10','2024/5/10','1,000'],
    ['G004', 'E2', '1104063112','2024/5/10','2024/5/10','1,000'],
    ['G004', 'E2', '1104063112','2024/5/10','2024/5/10','1,000'],
   
  ],
  columnWidth: [300],
  rowNum: 20,
  align: ['center','center','center','center','center','center'],
  carousel: 'single'
}


  // 动态表格2
  config2.value = {  
  data: [
    ['', '', '','','合计','10,000'],
  ],
  columnWidth: [300],
  rowNum: 1,
  align: ['center','center','center','center','center','center'],
  carousel: 'single'}


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
 


  let timerHuojia: any = 1;


  onMounted(async () => {
    await getNoneTimerData();
    await getAllData();
  });
  

// const { currentLocale } = useLocale();
  const { setLoading } = useLoading();

function nextPage() { 
  if (currentPage < totalPages.value - 1) {
    currentPage+= 1;
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
}



// 顶部-返回事件
function handleBackbutton(val: any) {
      console.log(formModel.value)
      topTitle.value = '货架看板';
      showBackbutton.value = !showBackbutton.value;
      dispalyType.value = 1;

  }

  // 组件卸载时，清除定时器
  onUnmounted(() => {
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

const huojia = ref<number>(0);
const AllDatas = ref<any>() 
const tcolor = ref<any>([]);

const shelfCodesArray = ref<any>([]);
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

// 定时器请求
const getAllData = async () => {
    AllDatas.value = await QueryAllShelf("");
    console.warn( '我请求了一次数据');
    const shelfCodes = new Set();

    for (let i = 0; i < AllDatas.value.list.length; i += 1) {
       shelfCodes.add(AllDatas.value.list[i].SHELF_CODE);
    }

     shelfCodesArray.value = Array.from(shelfCodes);
     timerHuojia = window.setInterval(() => {
      console.log('定时器查询。');
      config.value.data = [];
      getDisplayData(AllDatas.value,huojia.value);

    }, 60000);

  };


  
  // 无定时器直接请求
const getNoneTimerData = async () => {
    AllDatas.value = await QueryAllShelf("");
    console.warn( "我请求了一次数据 无定时器");
    
    const shelfCodes = new Set();

    for (let i = 0; i < AllDatas.value.list.length; i += 1) {
       shelfCodes.add(AllDatas.value.list[i].SHELF_CODE);
    }

     shelfCodesArray.value = Array.from(shelfCodes);
      config.value.data = [];
      getDisplayData(AllDatas.value,huojia.value);

  };

  const getDisplayData = async (allLists: any,index: number) => {
    let total = 0;
    for (let i = 0; i < allLists.list.length; i += 1) {  
      if (allLists.list[i].SHELF_CODE === shelfCodesArray.value[index]) {
        const arrShelf = [];
        arrShelf.push( allLists.list[i].FORMULA_NO);
        arrShelf.push( allLists.list[i].SHELF_NO);
        arrShelf.push( allLists.list[i].BATCH_NO);
        arrShelf.push( allLists.list[i].STOC_DATE);
        arrShelf.push( allLists.list[i].EFFE_DATE);
        arrShelf.push( allLists.list[i].STOC_QTY.toLocaleString());
        total+= allLists.list[i].STOC_QTY;
        topTitle.value = `片料仓(${allLists.list[i].SHELF_CODE})货架看板`;
        config.value.data.push(arrShelf);
      }
    }
    total = Number(total.toFixed(4));
    config2.value.data=[["","","","","合计",total.toLocaleString()]];
    console.warn("我是货架：", huojia.value,config.value);

    if(shelfCodesArray.value.length-1 === index){
      huojia.value = 0;
      window.clearTimeout(timerHuojia);
      getAllData();
    }else{
      huojia.value = index+1;
    }
  }


function searchAll()
{ 
  console.log(formModel.value)
  console.log("我进来了吗")
  errorMessage.value = '';
  
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
        name: 'glue_stock',
      });
    }, 300000);

onUnmounted(() => {
    if (timer) {
      window.clearInterval(timer);
    }
  });


  const changePage = (()=>{
    router.push({
      name: 'glue_stock',
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
        name: 'glue_stock',
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
  :deep(.arco-card) {
    background-color: transparent;
    box-shadow: rgb(214, 23, 109) 0px 0px 10px inset;
    border-radius: 10px;
    border: none;
    background: rgba(96, 191, 243, 0.1);
  }
  :deep(.arco-card-header){
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

  .box-shadow-4 {
    box-shadow: rgb(246, 82, 115) 0px 0px 10px inset;
    border-radius: 20px;
    // background: rgba(55, 55, 200, 0.2);
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
  //表头背景
  ::v-deep .arco-table-th {
    background-color: #1d7596; /* 你想要的颜色 */
    color: white; /* 表头文字颜色 */
  }

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
  font-size: 20px !important;
}

.A1 ::v-deep.dv-scroll-board .header-item {
  font-size: 19px !important;
  font-weight: bolder;
}
 
  .A2 ::v-deep.dv-scroll-board .rows .row-item {
  font-size: 19px !important;
  font-weight: bolder;
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
