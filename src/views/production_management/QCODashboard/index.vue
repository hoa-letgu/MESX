<template>
  <div class="">
    <dv-full-screen-container class="full" v-show="true">
      <div class="container">
        <div class="border">
          <a-spin
            :loading="loading"
            tip="数据加载中...(Loading data...)"
            style="width: 100%; height: auto"
          >
            <!-- <dv-border-box-11
            style="height: 100vh; width: 100%"
            title="问题追踪看板"
          > -->
            <div v-show="!Isshow" style="color: white; margin: 0px auto"
              ><h1 style="text-align: center">QCO看板</h1
              ><div
                style="
                  position: fixed;
                  right: 0;
                  top: 0;
                  margin-top: 10px;
                  color: white;
                  margin-right: 30px;
                  font-size: 20px;
                "
                >{{ timeNow }}</div
              ></div
            >
            <div v-show="Isshow" class="head" style="padding-top: 30px">
              <div class="grid-demo-background">
                <a-space direction="vertical" :size="16" style="display: block">
                  <a-row class="grid-demo">
                    <div style="position: fixed; margin-left: 30px">
                      <!-- <dv-button @click="toList" border="Border5" color="green"></dv-button>
                     
                      </dv-button> -->
                      <a-link @click="toList">
                        <img
                          src="@/assets/images/back.png"
                          style="width: 40px; margin-left: 20px"
                          @click="toList"
                        />
                      </a-link>
                      <div
                        style="position: fixed; left: 0; top: 1; color: red"
                        >{{ errorMessage }}</div
                      >
                    </div>
                    <div
                      style="
                        position: fixed;
                        right: 0;
                        color: white;
                        margin-right: 30px;
                        font-size: 20px;
                      "
                      >{{ timeNow }}</div
                    >
                    <div class="box">
                      <div class="box1">
                        <a-space
                          direction="vertical"
                          :size="16"
                          style="display: block"
                        >
                          <!-- //第一行 -->
                          <a-row class="grid-demo">
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">工厂：</span>

                                <a-select
                                  v-model="formModel.org_id"
                                  :style="{ width: '160px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 200px"
                                  @change="Funselectorgchange"
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
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">厂区：</span>

                                <a-select
                                  v-model="formModel.plant_id"
                                  :style="{ width: '160px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 200px"
                                  @change="FunselectPlantchange"
                                >
                                  <a-option
                                    v-for="item in factoryareaList"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.NAME }}</a-option
                                  >
                                </a-select></div
                              >
                            </a-col>
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">上级部门：</span>

                                <a-select
                                  v-model="formModel.dept_no"
                                  :style="{ width: '160px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 200px"
                                  @change="Funselectdeptchange"
                                >
                                  <a-option
                                    v-for="item in deptlist"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.NAME }}</a-option
                                  >
                                </a-select></div
                              >
                            </a-col>
                            <a-col :span="6" class="a-col-demo">
                              <div
                                ><span style="color: white">工作中心：</span>

                                <!-- <a-select
                                  v-model="formModel.group_no"
                                  :style="{ width: '160px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="width: 254px"
                                >
                                  <a-option
                                    v-for="item in grouplist"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.NAME }}</a-option
                                  >
                                </a-select> -->
                                <a-auto-complete
                                  v-model="formModel.group_no"
                                  :data="grouplist"
                                  :style="{ width: '200px' }"
                                  :placeholder="
                                    $t('maintenancetasks.form.plsdept')
                                  "
                                  strict
                                />
                              </div>
                            </a-col>
                          </a-row>
                          <!-- 第二行 -->
                          <a-row class="grid-demo" style="margin-top: -16px">
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">转换时间：</span
                                ><a-date-picker
                                  v-model="formModel.startdate"
                                  style="width: 200px"
                                  value-format="YYYY/MM/DD"
                              /></div>
                            </a-col>
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">至：</span>

                                <a-date-picker
                                  v-model="formModel.enddate"
                                  style="width: 200px"
                                  value-format="YYYY/MM/DD"
                              /></div>
                            </a-col>
                            <a-col :span="5" class="a-col-demo">
                              <div
                                ><span style="color: white">ART：</span>

                                <a-input
                                  v-model="formModel.ART"
                                  :style="{ width: '200px' }"
                                  allow-clear
                                />
                              </div>
                            </a-col>
                            <a-col :span="6" class="a-col-demo">
                              <div>
                                <a-button
                                  type="primary"
                                  @click="search"
                                  class="button"
                                >
                                  <template #icon>
                                    <icon-search />
                                  </template>
                                  <template #default>搜索</template>
                                </a-button>
                              </div>
                            </a-col>

                            <!-- <a-col :span="6" class="a-col-demo">
                            <div
                              ><a-button style="width: 254px" @click="reset"
                                >重置</a-button
                              ></div
                            >
                          </a-col> -->
                          </a-row>
                        </a-space>
                      </div>
                      <div> </div>
                    </div>
                  </a-row>
                </a-space>
              </div>
            </div>

            <div
              class="bottom"
              style="text-align: center; color: white; margin-top: 10px"
            >
              <div style="height: 32vh; width: 99%; margin: 0px auto" title="">
                <div style="padding-top: 1vh; margin: 0px auto">
                  <a-scrollbar style="overflow: auto">
                    <table
                      class="table"
                      cellspacing="0"
                      cellpadding="0"
                      @click="ShowChange()"
                      @mouseover="mousehover()"
                      @mouseleave="mouseleave()"
                    >
                      <tr>
                        <th v-for="(v, k, i) in listbox[0]" :key="i">{{
                          k
                        }}</th>
                      </tr>

                      <tr v-for="item in listbox" :key="item.KEY">
                        <template v-for="(v, i) in item" :key="i">
                          <td
                            v-if="v == '逾期'"
                            style="background-color: rgb(194, 61, 41, 0.8)"
                            >{{
                          }}</td>
                          <td
                            v-else-if="v == '未完成'"
                            style="background-color: rgb(216, 159, 27, 0.8)"
                            >{{
                          }}</td>
                          <td
                            v-else-if="v == '已完成'"
                            style="background-color: rgb(35, 138, 35, 0.8)"
                            >{{
                          }}</td>
                          <td
                            v-else-if="v == null"
                            style="background-color: rgb(56, 59, 56)"
                            >{{}}</td
                          >
                          <td v-else>{{ v }}</td>
                        </template>
                      </tr>
                    </table>
                  </a-scrollbar>
                  <div style="margin-top: 8px">
                    <a-pagination
                      :total="total"
                      :pagesize="vPagesize"
                      :current="vCurrent"
                      :default-page-size="vPagesize"
                      show-total
                      show-page-size
                      :page-size-options="vPagesizeLIST"
                      @change="onPageChange"
                      @page-size-change="onpageSizeChange"
                  /></div>
                </div>
              </div>
            </div>
            <!-- </dv-border-box-11> -->
          </a-spin>
        </div></div
      >
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
  import { Getorg, Getfactory } from '@/api/kanbandevicea';
  import {
    Getdeptlist,
    Getgrouplist,
    Getplantlist,
    GetquestionQty,
    loadUserInfo,
    GetQCOData,
    GetplantlistNew,
  } from '@/api/IssueTrackingDashboardApi';
  import {
    GetNowTime
  } from '@/api/General';
  import router from '@/router';
  import { valid } from 'mockjs';
  import VCharts from 'vue-echarts';
  import { ref, onMounted, reactive, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import moment from 'moment';
  import { TEXT_ALIGNS } from '@arco-design/web-vue/es/_utils/constant';
  import { values } from 'lodash';

  const { loading, setLoading } = useLoading(true);
  const generateFormModel = () => {
    return {
      org_id: '',
      plant_id: '',
      startdate: '',
      enddate: '',
      dept_no: '',
      group_no: '',
      ART: '',
    };
  };
  const errorMessage = ref('');
  const timeNow = ref('');
  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const questionList = ref<any>([]);
  const listbox = ref<any>([]);
  const vPagesize = ref(18);
  const vCurrent = ref(1);
  const total = ref(0);
  const deptlist = ref<any>([]);
  const grouplist = ref<any>([]);
  const Isshow = ref(true);
  const vPagesizeLIST = ref<any>([15, 18, 20]);

  document.documentElement.requestFullscreen();

  // if (element.requestFullscreen) {
  //   element.requestFullscreen();
  // } else if (element.mozRequestFullScreen) {
  //   element.mozRequestFullScreen();
  // } else if (element.webkitRequestFullscreen) {
  //   element.webkitRequestFullscreen();
  // } else if (element.msRequestFullscreen) {
  //   element.msRequestFullscreen();
  // }

  onMounted(() => {
    // vPagesize.value = 18;
    questionList.value = [];
    total.value = questionList.value.length;
    vCurrent.value = 1;
    formModel.value.ART = '';
    const obj = {
      starttime: '',
      endtime: '',
    };
    obj.starttime = moment(
      moment().add(0, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
    obj.endtime = moment(
      moment().add(30, 'days').startOf('day').valueOf()
    ).format('YYYY/MM/DD');
    formModel.value.startdate = obj.starttime;
    formModel.value.enddate = obj.endtime;
    Fungetorglist();
    FunGetplantlist();
    FunGetdeptlist();
    FunGetgrouplist();
    FunloadUserInfo();
  });
  const Now1timer = setInterval(async () => {
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
  function toList() {
    router.push({
      name: 'Workplace',
      query: {
        // selectdate: formModel.value.selectdate,
        // selectorg: formModel.value.selectorg,
      },
    });
  }
  const searchtimer = setInterval(() => {
    console.log('定时查询');
    search();
  }, 30000);
  const Fungetorglist = async () => {
    // setLoading(true);
    try {
      const orgdata: any = await Getorg();
      orgList.value = JSON.parse(JSON.stringify(orgdata.list));
      orgList.value.unshift({ ORG_CODE: '0000', ORG_NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetplantlist = async () => {
    // setLoading(true);
    try {
      formModel.value.plant_id = '0000';
      factoryareaList.value.length = 0;
      const vdata: any = await GetplantlistNew(formModel.value);
      factoryareaList.value = JSON.parse(JSON.stringify(vdata.list));
      factoryareaList.value.unshift({ CODE: '0000', NAME: '全部' });
 
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetdeptlist = async () => {
    // setLoading(true);
    try {
      formModel.value.dept_no = '0000';
      deptlist.value.length = 0;
      const vdata: any = await Getdeptlist(formModel.value);
      deptlist.value = JSON.parse(JSON.stringify(vdata.list));
      deptlist.value.unshift({ CODE: '0000', NAME: '全部' });
   
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetgrouplist = async () => {
    // setLoading(true);
    try {
      grouplist.value.length = 0;
      const vdata: any = await Getgrouplist(formModel.value);
      const wdata = JSON.parse(JSON.stringify(vdata.list));
      wdata.forEach((val: any) => {
        const str = `${val.CODE}|${val.NAME}`;
        grouplist.value.unshift(str);
        console.log(str);
      });
      grouplist.value.unshift('|全部');
      formModel.value.group_no = '|全部';
      console.log(grouplist);
      // grouplist.value = JSON.parse(JSON.stringify(vdata.list.CODE));
      // grouplist.value.unshift({ CODE: '0000', NAME: '全部' });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };
  const FunGetQCOData = async () => {
    setLoading(true);
    try {
      const vdata: any = await GetQCOData(formModel.value);
      if (vdata.length === 0) questionList.value = [];
      else questionList.value = JSON.parse(JSON.stringify(vdata.list));

      total.value = questionList.value.length;
      paging();
      // console.log(questionList.value);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  const FunloadUserInfo = async () => {
    // setLoading(true);
    try {
      const vdata: any = await loadUserInfo();
      if (vdata.list.length > 0) {
        formModel.value.org_id = vdata.list[0].ORG_ID;
        formModel.value.plant_id = vdata.list[0].PLANT_ID;
        formModel.value.dept_no = vdata.list[0].DEPT_NO;
        formModel.value.group_no = `${vdata.list[0].DEPARTMENT_CODE}|${vdata.list[0].GROUP_NAME}`;
      }
      search();
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      // setLoading(false);
    }
  };

  function FunselectPlantchange() {
    FunGetdeptlist();
    FunGetgrouplist();
  }
  function Funselectorgchange() {
    FunGetplantlist();
    FunGetdeptlist();
    FunGetgrouplist();
  }
  function Funselectdeptchange() {
    FunGetgrouplist();
  }
  const search = async () => {
    setLoading(true);
    try {
      errorMessage.value = '';
      FunGetQCOData();
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (current: number) => {
    vCurrent.value = current;
    paging();
  };

  const onpageSizeChange = (pageSize: number) => {
    console.log(pageSize);
    vPagesize.value = pageSize;
    paging();
  };
  function paging() {
    const current = vCurrent.value;
    const pageSize = vPagesize.value;
    // console.log(`${current}---------${pageSize}`);
    listbox.value = [];
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageList = questionList.value.slice(startIndex, endIndex);
    if (pageList.length > 0) {
      listbox.value = pageList;
    }
    console.log(listbox.value);
  }
  let recordtimer: any | null = null;
  function startTimer() {
    stopTimer();
    recordtimer = setInterval(() => {
      console.log('----定时器-----');
      const num = vCurrent.value + 1;
      // console.log(`当前页${vCurrent.value}`);
      console.log(`当前页${num}`);
      vCurrent.value = num;
      const pageCount = ref(0);
      if (total.value % vPagesize.value === 0) {
        pageCount.value = total.value / vPagesize.value;
      } else {
        pageCount.value = total.value / vPagesize.value + 1;
      }
      if (vCurrent.value > pageCount.value) vCurrent.value = 1;
      paging();
    }, 10000);
  }
  function stopTimer() {
    if (recordtimer) {
      console.log('585858585858588');
      clearInterval(recordtimer);
      recordtimer = null;
    }
  }
  startTimer();
  function ShowChange() {
    Isshow.value = !Isshow.value;
    console.log(Isshow.value);
  }
  function mousehover() {
    stopTimer();
  }
  function mouseleave() {
    console.log('898989');
    startTimer();
  }
  // 组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(recordtimer);
    clearInterval(Now1timer);
    clearInterval(searchtimer);
    document.exitFullscreen();
  });
</script>

<script lang="ts">
  export default {
    name: 'Maintenancetasks',
  };
</script>

<style scoped lang="less">
  .boder {
    border: 1px solid var(--color-neutral-4);
  }
  .full {
    // background-image: url('@/assets/images/backgroud-1.png');
    background-color: white;
    background-size: cover;
  }
  .container {
    background-color: white;
    // background-image: url('@/assets/images/backgroud-1.png');
    background-size: cover;
    // background-repeat: no-repeat;
    // background-color: #031a5a;
    width: 100%;
    height: 100%;
    // background-position: 0px -70px;
    // overflow: scroll;
    background-image: url('@/assets/images/pageBg.png');
  }
  .border {
    // background: rgba(40, 66, 198, 0.3);
    width: 100%;
    height: 100%;
  }
  .arco-layout-footer footer {
    display: none;
  }
  .tit {
    text-align: center;
    padding-top: 10px;
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
  .box {
    width: 90%;
    margin: 0px auto;
    text-align: center;
  }
  .box1 {
    color: white;
    font-size: 20px;
  }
  .box2,
  .box3 {
    // border: 1px solid red;
    color: white;
    margin-top: 50px;
  }
  .a-col-demo {
    // border: 1px solid gray;
    padding: 10px 0px;
    text-align: right;
  }
  .grid-demo {
    margin-bottom: 0px;
  }
  .head {
    height: 15vh;
  }
  .content {
    // margin: 0px 10px;
    height: 50vh;
    color: white;
  }
  .bottom {
    // margin: -20px 10px;
    height: 40vh;
  }
  .content-middle div {
    // margin: 10px 2px;
    width: 95%;
    margin: 1vh auto;
    // background: rgba(236, 236, 238, 0.3);
    // background-image: url('@/assets/images/bgmain.png');
    background-repeat: no-repeat;
  }
  .content-middle {
    margin-top: -1vh;
  }
  text {
    // margin-top: -20px;
    color: white;
    font-family: 'STHupo';
    font-size: 20px;
    // position: fixed;
  }
  .table {
    width: 100%;
    font-size: 16px;
    // margin-top: 5px;
    // color: rgb(198, 190, 190);
    // background-color: rgb(247, 248, 250);
    cursor: pointer;
  }
  .table td,
  .table th {
    border: 1px solid rgba(254, 254, 254, 0.3);
    height: 4vh;
    width: 150px;
  }
  .table th {
    // background: rgba(35, 28, 238, 0.3);
    height: 5vh;
    // background-color: cornflowerblue;
  }
  .table td {
    // color: black;
  }
  ::v-deep .arco-pagination-item {
    color: white;
  }
  ::v-deep .arco-pagination-total {
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
  ::v-deep .arco-statistic-content .arco-statistic-value {
    color: yellow;
    // font-family: 'STHupo';
    text-align: center;
    // padding-top: 20px;
    // color: rgb(247, 133, 34);
    // padding-bottom: 10px;
    // width: 300px;
  }
  ::v-deep .arco-statistic-content .arco-statistic-value-integer {
    font-size: 60px;
  }

  .button {
    position: relative;
    background-color: #b067ff;
    border: none;
    font-size: 16px;
    color: #ffffff;
    padding: 10px;
    width: 100px;
    height: 40px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
  }

  .button:after {
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

  .button:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
</style>
