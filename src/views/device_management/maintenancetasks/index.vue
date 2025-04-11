<template>
  <div class="">
    <dv-full-screen-container class="full">
      <VScaleScreen width="1920" height="1080" :full-screen="true">
        <!-- <Breadcrumb :items="['menu.list', 'menu.list.repairDetails']" />
    <a-card class="general-card" :title="$t('menu.list.repairDetails')">
      <a-row> -->

        <div class="container"
          ><div class="bg">
            <a-spin
              :loading="loading"
              tip="数据加载中...(Loading data...)"
              style="width: 100%; height: auto"
            >
              <div class="left-side">
                <div class="panel">
                  <h1 class="tit">设备数位化管理看板</h1>
                  <div style="color: red">{{ errorMessage }}</div>
                </div>
                <div>
                  <img
                    src="@/assets/images/back.png"
                    style="width: 40px; margin-left: 20px"
                    @click="toList"
                /></div>
                <div class="grid-demo-background">
                  <a-space
                    direction="vertical"
                    :size="16"
                    style="display: block"
                  >
                    <a-row class="grid-demo">
                      <!-- <button @click="toList">点击返回列表</button>
                  <div>传递参数：{{ byList }}</div> -->
                      <div class="box">
                        <div class="box1">
                          <a-space
                            direction="vertical"
                            :size="16"
                            style="display: block"
                          >
                            <!-- //第一行 -->
                            <a-row class="grid-demo">
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('repairDetails.form.daterange')
                                    }}：</span
                                  ><a-range-picker
                                    v-model="formModel.selectdate"
                                    style="width: 254px"
                                /></div>
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.bystatus')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.by_status"
                                    :style="{ width: '160px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsbystatus')
                                    "
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 254px"
                                  >
                                    <a-option
                                      v-for="item in bystatus"
                                      :key="item.value"
                                      :value="item.value"
                                      >{{ item.name }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.devorg')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.selectorg"
                                    :style="{ width: '160px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsorg')
                                    "
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 254px"
                                    @change="FunGetfactory"
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
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><a-button style="width: 254px" @click="reset"
                                    >重置</a-button
                                  ></div
                                >
                              </a-col>
                            </a-row>
                            <!-- 第二行 -->
                            <a-row class="grid-demo" style="margin-top: -16px">
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.devname')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.devname"
                                    :style="{ width: '160px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsdevname')
                                    "
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 254px"
                                  >
                                    <a-option
                                      v-for="item in devlist"
                                      :key="item.VALUE"
                                      :value="item.VALUE"
                                      >{{ item.TEXT }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.bylevel')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.by_level"
                                    :style="{ width: '160px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsbylevel')
                                    "
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 254px"
                                  >
                                    <a-option
                                      v-for="item in bylevel"
                                      :key="item.value"
                                      :value="item.value"
                                      >{{ item.name }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.devfactory')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.factory_area"
                                    :style="{ width: '160px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsfactory')
                                    "
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 254px"
                                    @change="FunGetPosition"
                                  >
                                    <a-option
                                      v-for="item in factoryareaList"
                                      :key="item.CODE"
                                      :value="item.CODE"
                                      >{{ item.ORG }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                            </a-row>
                            <!-- //第三行 -->
                            <a-row class="grid-demo" style="margin-top: -16px">
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.sn')
                                    }}：</span
                                  >
                                  <!-- <a-auto-complete
                              :data="snlist"
                              :style="{ width: '254px' }"
                              placeholder="请输入设备编号"
                            /> -->
                                  <a-input
                                    v-model="formModel.sn"
                                    :style="{ width: '254px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plssn')
                                    "
                                    allow-clear
                                  />

                                  <!-- <input
                              v-model="formModel.sn"
                              type="text"
                              placeholder="请输入设备编号"
                              style="width: 254px; font-size: 15px"
                            /> -->
                                </div>
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.orgfloor')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.floor"
                                    :style="{ width: '160px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsfloor')
                                    "
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="width: 254px"
                                  >
                                    <a-option
                                      v-for="item in floorlist"
                                      :key="item.VALUE"
                                      :value="item.VALUE"
                                      >{{ item.TEXT }}</a-option
                                    >
                                  </a-select></div
                                >
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('maintenancetasks.form.devdept')
                                    }}：</span
                                  >

                                  <a-auto-complete
                                    v-model="formModel.position"
                                    :data="deptlist"
                                    :style="{ width: '254px' }"
                                    :placeholder="
                                      $t('maintenancetasks.form.plsdept')
                                    "
                                    :allow-clear="true"
                                    strict
                                  />
                                </div>
                              </a-col>
                              <a-col :span="6" class="a-col-demo">
                                <div
                                  ><a-button
                                    type="primary"
                                    style="width: 254px"
                                    @click="search"
                                    >{{
                                      $t('repairDetails.form.search')
                                    }}</a-button
                                  ></div
                                >
                              </a-col>
                            </a-row>
                          </a-space>
                        </div>
                        <div class="box2">
                          <div style="text-align: center"
                            ><h2>{{
                              $t('maintenancetasks.form.bydetails')
                            }}</h2></div
                          >
                          <div>
                            <table
                              class="table"
                              cellspacing="0"
                              border="1"
                              cellpadding="0"
                            >
                              <tr>
                                <th>{{
                                  $t('maintenancetasks.form.bystatus')
                                }}</th>
                                <th>{{ $t('maintenancetasks.form.dept') }}</th>
                                <th>{{
                                  $t('maintenancetasks.form.devname')
                                }}</th>
                                <th>{{ $t('maintenancetasks.form.sn') }}</th>
                                <th>{{ $t('maintenancetasks.form.level') }}</th>
                                <th>{{ $t('maintenancetasks.form.body') }}</th>
                                <th>{{ $t('maintenancetasks.form.item') }}</th>
                                <th>{{ $t('maintenancetasks.form.tool') }}</th>
                                <th>{{
                                  $t('maintenancetasks.form.finishdate')
                                }}</th>
                              </tr>

                              <tr v-for="item in listbox" :key="item.KEY">
                                <td
                                  :class="
                                    item.BY_STATUS == '0' ? 'red' : 'green'
                                  "
                                  >{{ item.BY_STATUS_NAME }}</td
                                >
                                <td>{{ item.ADDRESS }}</td>
                                <td>{{ item.DEVICE_NAME }}</td>
                                <td>{{ item.SNID }}</td>
                                <td>{{ item.LEVEL_NAME }}</td>
                                <td>{{ item.BODY_PART }}</td>
                                <td>{{ item.ITEM }}</td>
                                <td class="tool">{{ item.TOOL }}</td>
                                <td>{{ item.PLAN_FINISHDATE }}</td>
                              </tr>
                            </table>
                            <div style="margin-top: 8px">
                              <a-pagination
                                :total="total"
                                :pagesize="vPagesize"
                                :current="vCurrent"
                                show-total
                                show-page-size
                                :page-size-options="[5, 10, 11, 12]"
                                @change="onPageChange"
                                @page-size-change="onpageSizeChange"
                            /></div>
                          </div>
                        </div>
                      </div>
                    </a-row>
                  </a-space>
                </div>
              </div>
            </a-spin>
          </div>
        </div>
      </VScaleScreen>
    </dv-full-screen-container>
    <!-- </a-row>
    </a-card> -->
  </div>
</template>

<script lang="ts" setup>
  import {
    Getorg,
    Getfactory,
    GetMaintenanceTask,
    GetLoadData,
    GetfactoryByOrgid,
    GetPositionList,
  } from '@/api/kanbandevicea';
  import router from '@/router';
  import { ref, onMounted, onUnmounted } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import moment from 'moment';

  const { loading, setLoading } = useLoading(true);
  const generateFormModel = () => {
    return {
      selectorg: '1001',
      selectdate: ['2023-05-01', '2023-05-09'],
      factory_area: '',
      by_status: '0',
      by_level: '',
      floor: '',
      position: '',
      sn: '',
      devname: '',
    };
  };
  const errorMessage = ref('');
  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const byList = ref<any>([]);
  const listbox = ref<any>([]);
  const localdate = ref<any>([]);
  const vPagesize = ref(10);
  const vCurrent = ref(1);
  const total = ref(300);
  const deptlist = ref<any>([]);
  const devlist = ref<any>([]);
  const floorlist = ref<any>([]);
  const bystatus = [
    { value: '0000', name: '全部' },
    { value: '0', name: '未保养' },
    { value: '1', name: '已保养' },
  ];
  const bylevel = [
    { value: '0000', name: '全部' },
    { value: '01', name: '一级保养' },
    { value: '02', name: '二级保养' },
  ];

  onMounted(() => {
    // 最大化
    const element = document.documentElement;
    element.requestFullscreen();
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
      obj.starttime = moment(moment().startOf('day').valueOf()).format(
        'YYYY-MM-DD'
      );
      obj.endtime = moment(moment().valueOf()).format('YYYY-MM-DD');
      range.value.push(obj.starttime);
      range.value.push(obj.endtime);
      formModel.value.selectdate = range.value;
      // console.log(range);
    }
  });

  function toList() {
    router.go(-1);
  }
  const getorglist = async () => {
    setLoading(true);
    try {
      const orgdata: any = await Getorg();
      orgList.value = JSON.parse(JSON.stringify(orgdata.list));
      await FunGetfactory();
      const loaddata: any = await GetLoadData();
      const list: any = JSON.parse(JSON.stringify(loaddata.list));
      
      devlist.value = list.dt_devname;
      devlist.value.unshift({ VALUE: '0000', TEXT: '全部' });
      floorlist.value = list.dt_floor;
      floorlist.value.unshift({ VALUE: '0000', TEXT: '全部' });
     
      search();
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
  getorglist();
  const search = async () => {
    setLoading(true);
    try {
      const data1: any = await GetMaintenanceTask(formModel.value);
      byList.value = JSON.parse(JSON.stringify(data1.list));
      total.value = byList.value.length;
      onPageChange(1);
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };

  const FunGetfactory = async () => {
  // setLoading(true);
  try { console.log(formModel.value.selectorg);console.log('Getfactory');
    formModel.value.factory_area = '0000';
    const factoryareadata: any = await GetfactoryByOrgid(formModel.value);
    factoryareaList.value = JSON.parse(JSON.stringify(factoryareadata.list));
    factoryareaList.value.unshift({ CODE: '0000', ORG: '全部' });
    FunGetPosition();
    
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // setLoading(false);
  }
};
 const FunGetPosition = async () => {
  // setLoading(true);
  try { 
    formModel.value.position = '';
    const Positiondata: any = await GetPositionList(formModel.value);
    const dtposition: any  = JSON.parse(JSON.stringify(Positiondata.list));
    deptlist.value = [];
      dtposition.forEach((item: any) => {
        deptlist.value.push(item.ADDRESS_NAME);
      });
      // search();
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // setLoading(false);
  }
};


  function reset() {
    formModel.value.factory_area = '';
    formModel.value.by_level = '';
    formModel.value.by_status = '0';
    formModel.value.position = '';
    formModel.value.devname = '';
    formModel.value.floor = '';
    formModel.value.sn = '';
  }
  const onPageChange = (current: number) => {
    vCurrent.value = current;
    paging();
  };
  const onpageSizeChange = (pageSize: number) => {
    vPagesize.value = pageSize;
    paging();
  };
  function paging() {
    const current = vCurrent.value;
    const pageSize = vPagesize.value;
    console.log(`${current}---------${pageSize}`);
    listbox.value = [];
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageList = byList.value.slice(startIndex, endIndex);
    // .filter((item: any) => item.value !== undefined);
    // console.log(pageList);
    listbox.value = pageList;
  }
  onUnmounted(() => {
    // document.exitFullscreen();
  });
</script>

<script lang="ts">
  export default {
    name: 'Maintenancetasks',
  };
</script>

<style scoped lang="less">
  h1 {
    // color: var(--color-neutral-10);
    color: white;
  }
  .margin_10 {
    margin: 20px;
  }
  .txt_center {
    text-align: center;
  }
  .boder {
    border: 1px solid var(--color-neutral-4);
  }
  .container {
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/images/pageBg.png');
    // padding-top: 20px;
  }
  .bg {
    background: rgba(40, 66, 198, 0.2);
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
  .table {
    width: 100%;
    font-size: 16px;
    // margin-top: 30px;
    // color: rgb(198, 190, 190);
    background: rgba(253, 253, 253, 0.1);
  }
  .table td,
  .table th {
    border: 1px solid rgba(254, 254, 254, 0.2);
    height: 50px;
  }
  .table th {
    background: rgba(40, 66, 198, 0.2);
  }
  .table td {
    // background: rgba(253, 253, 253, 0.2);
  }
  .table tr:nth-child(2n) {
    // background: rgba(49, 58, 232, 0.1);
  }
  .table tr:nth-child(2n-1) {
    //background: rgba(235, 238, 239, 0.4);
  }
  .red {
    background: rgba(234, 14, 14, 0.4);
    color: white;
  }
  .green {
    background: rgba(12, 158, 68, 0.4);
    color: white;
  }
  .tool {
    background: rgba(223, 243, 72, 0.4);
    // color: rgb(193, 183, 183);
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
  .a-col-demo {
    // border: 1px solid gray;
    padding: 8px 0px;
  }
  .grid-demo {
    margin-bottom: 0px;
  }
  ::v-deep .arco-input-wrapper,
  ::v-deep .arco-picker,
  ::v-deep .arco-select-view-single {
    background-color: transparent;
    border: 1px solid rgb(137, 132, 132);
    // background: rgba(235, 238, 239, 0.4);
    color: white;
  }
  ::v-deep .arco-input-wrapper:hover,
  ::v-deep .arco-picker:hover,
  ::v-deep .arco-select-view-single:hover {
    // background-color: transparent;
    background: rgba(49, 174, 232, 0.4);
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
    color: white;
  }
</style>
