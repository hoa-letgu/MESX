<template>
  <div class="">
    <dv-full-screen-container class="full">
      <VScaleScreen width="1920" height="1080" :full-screen="true">
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
                </div>
                <div style="color: red">{{ errorMessage }}</div>
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
                  <div>传递参数：{{ repairList }}</div> -->
                      <div class="box">
                        <div class="box1">
                          <a-space
                            direction="vertical"
                            :size="16"
                            style="display: block"
                          >
                            <a-row class="grid-demo">
                              <a-col :span="6">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('repairDetails.form.daterange')
                                    }}：</span
                                  ><a-range-picker
                                    v-model="formModel.selectdate"
                                    style="width: 254px; margin-bottom: 20px"
                                /></div>
                              </a-col>
                              <a-col :span="6">
                                <div
                                  ><span style="color: white"
                                    >{{ $t('repairDetails.form.org') }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.selectorg"
                                    :style="{ width: '160px' }"
                                    placeholder="Select"
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
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
                              <a-col :span="6">
                                <div
                                  ><span style="color: white"
                                    >{{
                                      $t('repairDetails.form.factoryarea')
                                    }}：</span
                                  >

                                  <a-select
                                    v-model="formModel.factory_area"
                                    :style="{ width: '160px' }"
                                    placeholder="Select"
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
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
                              <a-col :span="6">
                                <div
                                  ><a-button
                                    type="primary"
                                    style="width: 200px"
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
                          <div style="text-align: left"
                            ><h2
                              >{{ $t('repairDetails.form.repairstatus') }}：</h2
                            ></div
                          >
                          <div>
                            <table
                              class="table"
                              cellspacing="0"
                              border="1"
                              cellpadding="0"
                            >
                              <tr>
                                <th
                                  v-for="item in repairList"
                                  :key="item.code"
                                  :value="item.code"
                                  >{{ item.name }}</th
                                >
                              </tr>

                              <tr>
                                <td
                                  v-for="item in repairList"
                                  :key="item.code"
                                  :value="item.code"
                                  >{{ item.repaired }}</td
                                >
                              </tr>
                              <tr>
                                <td
                                  v-for="item in repairList"
                                  :key="item.code"
                                  :value="item.code"
                                  >{{ item.repairing }}</td
                                >
                              </tr>
                              <tr>
                                <td
                                  v-for="item in repairList"
                                  :key="item.code"
                                  :value="item.code"
                                  >{{ item.waitrepair }}</td
                                >
                              </tr>
                            </table>
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
  </div>
</template>

<script lang="ts" setup>
  import { Getorg, Getfactory, GetRepairDetail ,GetfactoryByOrgid, } from '@/api/kanbandevicea';
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
    };
  };
  const formModel = ref(generateFormModel());
  const orgList = ref<any>([]);
  const factoryareaList = ref<any>([]);
  const repairList = ref<any>([]);
  const localdate = ref<any>([]);
  const errorMessage = ref('');

  onMounted(() => {
    // 最大化
    const element = document.documentElement;
    element.requestFullscreen();
    // 读取缓存数据
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
    try {
      const orgdata: any = await Getorg();
      orgList.value = JSON.parse(JSON.stringify(orgdata.list));
      await FunGetfactory();
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
      const data1: any = await GetRepairDetail(formModel.value);
      repairList.value = JSON.parse(JSON.stringify(data1.list));
    } catch (err) {
      // you can report use errorHandler or other
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
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    // setLoading(false);
  }
};

  onUnmounted(() => {
    // document.exitFullscreen();
  });
</script>

<script lang="ts">
  export default {
    name: 'MaintenanceDetails',
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
    background-image: url('@/assets/images/backgroud-1.png');
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
    margin-top: 100px;
  }
  .table {
    width: 100%;
    font-size: 18px;
    margin-top: 10px;
  }
  .table td,
  .table th {
    border: 1px solid gray;
    height: 100px;
  }
  .table tr:nth-child(1) {
    background: rgba(231, 232, 231, 0.4);
  }
  .table tr:nth-child(2) {
    background: rgba(62, 245, 12, 0.2);
  }
  .table tr:nth-child(3) {
    background: rgba(49, 174, 232, 0.4);
  }
  .table tr:nth-child(4) {
    background: rgba(235, 238, 239, 0.4);
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
