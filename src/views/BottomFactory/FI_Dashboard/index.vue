<template>
     <dv-full-screen-container class="full" v-show="true" >
   <VScaleScreen
   width="1920"
   height="1080"
   :full-screen="true"
   >  <Header
        :title="$t('Kanban.FI_Dashboard')"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9', fontSize: '40px' }"
        :right-style="{ color: 'white' }"
        style="height: 50px;"
      ></Header>
     
      <div class="container">
                    <a-row class="grid-demo"  style="margin: 90px 0vh;">
                        <a-col :span="12.5">
                          <div style="display: flex;">
                          <div style="text-align: left;margin-left: 20px;margin-top:  -10px;"
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
                                    >{{ item.ORG_NAME }}</a-option
                                  >
                                </a-select>
                          </div>
                          <div style="color: red; margin-left: 30px; margin-top: -15px;  font-size: 20px; text-align: left;">{{
                                    errorMessage
                                  }}</div>
                          </div>
                            <div  style="margin: -10px 0px;">
                              <dv-border-box-11  class="right-dv-border-box"
                                :title="'今日产能(双)'" 
                                :color="borderColor2"
                                    style="font-size: small;">
                              <div class="right-dv-border-box-son">
                                <dv-scroll-board :config="config"  style="height:830px;" class="A1" ref="TodayCapacityRef"/>
                                <dv-scroll-board :config="config2"  style="height:50px;" class="A1" ref="scrollBoard"/>
                              </div>
                            </dv-border-box-11>
                            
                          </div>
                        </a-col>
                        <!-- //第二列 -->
                        <a-col :span="11">            
                          <div  style="margin: 12px 0px;">
                              <dv-border-box-11  class="right-dv-border-box2"
                                :title="'在制品分析'" 
                                :color="borderColor2"
                                    style="font-size: small;">
                              <div class="right-dv-border-box-son2">
                                <VCharts
                                        :option="option1"
                                        style="
                                          height: 490px;
                                          width: 970px;
                                          padding-top: 5px; 
                                          margin-left: -45px;
                                          "
                                          
                                      >
                                </VCharts>
                              </div>
                            </dv-border-box-11>
                            <dv-border-box-11  class="right-dv-border-box3"
                                :title="'临期订单'" 
                                :color="borderColor2"
                                    style="font-size: small; margin-top: -8.5px;">
                              <div class="right-dv-border-box-son3">
                                <dv-scroll-board :config="config3"  style="height:345px;" class="A1" ref="ExpiredOrderRef"/>
                              </div>
                            </dv-border-box-11>
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
    GetTodayCapacity,
    GetTodayTotalCapacity,
    GetTodayCapacityTOP10,
    GetExpiredOrder,
  } from '@/api/BottomFactory';


  const userStore = useUserStore();
  const generateFormModel = () => {
    return {
      org_id: '',
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
  const CapacityRecord = ref<any>([]);
  const CapacityTotalRecord = ref<any>([]);
  const ExpiredOrder = ref<any>([]);

  const borderColor2 = ref<any>(['#2E6099', '#0EE4F9']);
  const errorMessage = ref('');
  const TodayCapacityRef = ref<InstanceType<any>>(null);
  const ExpiredOrderRef = ref<InstanceType<any>>(null);

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
  
    // 读取缓存数据
    const getLocalorg = window.sessionStorage.getItem('org_code');
    const getLocaldate = window.sessionStorage.getItem('selectdate');
   // console.log(getLocaldate);
    formModel.value.org_id = '';
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
  header: ['模号', '今日热压', '今日整理', '今日不良品',  '昨日WIP','当前WIP'],
  data:[],
    index: false,
  columnWidth: [200,200,200,200,200,200],
  align: ['center','center','center','center','center','center'],
  rowNum:[20],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,

  
});
config2.value = reactive({
 // header: ['储位', '批次',  '配方号',  '库存数', '单位','状态', '进仓日期', '到期日期'],
  data: [],
  index: false,
  columnWidth: [200,200,200,200,200,200],
  align: ['center','center','center','center','center','center'],
  rowNum:[1],
  indexHeader:['序号'],
  waitTime:3000000,
  hoverPause:false,
  evenRowBGC:'#007538',
})

config3.value = reactive({
  header: ['销售订单',  '模号', '订单数', '已缴数', '剩余未缴数','贴底日期'],
  data:[],
    index: false,
  columnWidth: [200,200,200,200,200,200],
  align: ['center','center','center','center','center','center'],
  rowNum:[10],
  indexHeader:['序号'],
  waitTime:3000,
  hoverPause:false,

  
});

  let timerlist: any = 1;
  timerlist = window.setInterval(() => {
    console.log('定时器查询列表。');
    // window.clearInterval(timerlist);
    searchAll()
  }, 3 * 60 * 1000);

  const getorglist = async () => {
    const orgdata: any = await Getorg();
    orgList.value = JSON.parse(JSON.stringify(orgdata.list));
  };

  onMounted(async () => {
    try {
      getorglist();  
      formModel.value.org_id = '1002';
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

  function handleChangeCondition() {
    searchAll();

    window.clearInterval(timerlist);
    timerlist = window.setInterval(() => {
    console.log('定时器查询列表2。');
    searchAll()
  }, 60000*3);
  }

  const { setLoading } = useLoading();
  const search = async () => {
    setLoading(true);

    try {
      setLocal();
     
      const todayCapacityrecord = await GetTodayCapacity(formModel.value);
     // console.log(todayinoutrecord.list)
      CapacityRecord.value = JSON.parse(JSON.stringify(todayCapacityrecord.list));
      
      // CapacityRecord.value = 
      // [
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      //   {'模号':'0001', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
      // ]
      
      // console.log(InOutRecord.value)
      const dt1:any = [];
      CapacityRecord.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow:any = [];
          Object.keys(row).forEach((key: any) => {
   
            if(key==='LASTMONTH_WIP'||key==='HP_QTY'||key==='FI_QTY'|| key==='D_QTY'|| key==='TODAY_WIP')
            {
              dtrow.push(`<span">${parseFloat(row[key]).toLocaleString('en-US')}</span>`)
            }
            else{
              dtrow.push(row[key])
            }
        
          }
          );
          dt1.push(dtrow)
         
      } 
      ); 

      // console.log(dt1.length)
      // console.log(config.value.data.length)
      config.value.data = [];
      config.value.data = dt1;

      if (TodayCapacityRef.value && dt1.length > 0) {
          // 此处可以传第二个参数 index，指定下次滚动的起始行
          TodayCapacityRef.value.updateRows(dt1[0], 0);
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

      const todayCapacityTotalRecord = await GetTodayTotalCapacity(formModel.value);
     // console.log(todaystockrecord.list)
     CapacityTotalRecord.value = JSON.parse(JSON.stringify(todayCapacityTotalRecord.list));  
    //  CapacityTotalRecord.value = 
    //   [
    //     {'模号':'合计', '上月WIP':'100', '今日热压':'100', '今日整理':'100', '今日不良品':'100', '当前WIP':'100'},
    //   ]
      const dt2:any = [];
      CapacityTotalRecord.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow2:any = [];
          Object.keys(row).forEach((key: any) => {
         
            if(key==='LASTMONTH_WIP'||key==='HP_QTY'||key==='FI_QTY'|| key==='D_QTY'|| key==='TODAY_WIP')
            {
              dtrow2.push(`<span">${parseFloat(row[key]).toLocaleString('en-US')}</span>`)
            }
            else{
              dtrow2.push(row[key])
            }
          }
          );
          dt2.push(dtrow2)
         
      } 
      ); 
     
      // console.log(dt2.length)
      // console.log(config2.value.data.length)
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
     
      const todayCapacityTotalTOP10Record :any= await GetTodayCapacityTOP10(formModel.value);
      option1.value.xAxis.data = todayCapacityTotalTOP10Record.list.Xlist;
      option1.value.series[0].data = todayCapacityTotalTOP10Record.list.Ylist1;
      // option1.value.xAxis.data = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
      // option1.value.series[0].data = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310];
      
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
     
      const pExpiredOrder = await GetExpiredOrder(formModel.value);
      // console.log(todayinoutrecord2.list)
      ExpiredOrder.value = JSON.parse(JSON.stringify(pExpiredOrder.list));
      
      // CapacityRecord.value = 
      // [
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      //   {'销售订单':'0001', '模号':'0002', '订单数':'100', '已缴数':'100', '剩余未缴数':'100', '贴底日期':'100'},
      // ]
      
      // console.log(Expired.value)
      const dt1:any = [];
      ExpiredOrder.value.forEach((row: any)=> {
          // console.log(row)
          const dtrow:any = [];
          Object.keys(row).forEach((key: any) => {
            let value = row[key];

            if(key==='SE_QTY'||key==='FI_QTY'|| key==='N_QTY')
            {
              value = `<span">${parseFloat(value).toLocaleString('en-US')}</span>`;
            }
         
            if (key === 'TSTART_DATE') 
            {  
              const date = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // 将时间部分设置为0，仅比较日期

              if (date <= today) {
                  value = `<span style="background-color: red; display: inline-block; width: 100px; height:20px; line-height: 20px; text-align: center;">${value}</span>`;
              }
            }

            dtrow.push(value);
          }
          );
          dt1.push(dtrow)
         
      } 
      ); 

      // console.log(dt1.length)
      // console.log(config3.value.data.length)
      config3.value.data = [];
      config3.value.data = dt1;

      if (ExpiredOrderRef.value &&dt1.length > 0) {
          // 此处可以传第二个参数 index，指定下次滚动的起始行
          ExpiredOrderRef.value.updateRows(dt1[0], 0);
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
    window.clearInterval(timerlist);   
    window.clearInterval(timer2);
   // document.exitFullscreen();
  });


  option1.value = {
   
    tooltip: {
      trigger: 'axis',
    },
  
    xAxis: {
      name:'型体',
      nameLocation :'end',
      nameTextStyle:
      {
        color:'#00d3ee',
        fontSize:16,
        fontWeight:'bold',

      },
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
       // rotate: 45,
       fontSize: 14,
        formatter: (params: any) => {
          if (params) {
            return params;
          }
          return '';
        },
      },
    },
    yAxis: {
      name:'在制品:双',
      nameLocation :'end',
      nameTextStyle:
      {
        color:'#00d3ee',
        fontSize:16,
        fontWeight:'bold',

      },
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        fontSize: 14,
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
        name: '在制品:双',
        type: 'bar',
        smooth: true,
       // data: ['300','400','500','200','600','480','856','222','300','400','500','435','600','480','333','777','300','400','500','200','600','480','333','222','300','400','500','200','600','480','333'],
       data: [],
       itemStyle: {
        normal: { 
            color: (params: any) => { // 使用回调函数来决定颜色c
            // if (params.value > 80) {
            //   return '#00CC00'; // 绿色
            // } 
              return '#00d3ee'; // 默认颜色
            },
            label: { 
             show: true, 
             fontSize: 14,
             color: ('#fff'), 
             position: 'top' ,
             formatter: (params: any) => {
             if (params) {
               return `${parseFloat(params.value).toLocaleString('en-US')}`;
             }
             return '';
           },
           } ,
           borderRadius: [15, 15, 0, 0],
          
         }
        },
        barMaxWidth:30,

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

 
async function searchAll()
{ 
    errorMessage.value = '';
    search();
    search2();
    search3();
    search4();
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
  //  background-image: url('@/assets/images/pageBg.png');
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
.right-dv-border-box {
    width: 1000px;
    height: 950px;
    margin-bottom: 18px;
  }
.right-dv-border-box-son {
    width: 1000px;
    padding: 25px;
    padding-top: 55px;
  }

  .right-dv-border-box2 {
    width: 920px;
    height: 525px;
    margin-bottom: 18px;
  }
.right-dv-border-box-son2 {
    width: 920px;
    padding: 25px;
    padding-top: 55px;
  }

  .right-dv-border-box3 {
    width: 920px;
    height: 415px;
    margin-bottom: 18px;
  }
.right-dv-border-box-son3 {
    width: 920px;
    padding: 25px;
    padding-top: 55px;
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

  
  
  .A1 ::v-deep.dv-scroll-board .rows .row-item {
  font-size: 14px !important;
}

.A1 ::v-deep.dv-scroll-board .header-item {
  font-size: 14px !important;
  font-weight: bolder;
  background-color: #3272d0;
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
