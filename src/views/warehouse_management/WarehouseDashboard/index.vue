<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <Header
        :title="topTitle"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9' }"
        :right-style="{ color: 'white' }"
        :show-back-button="showBackbutton"
        @on-backbutton-click="handleBackbutton"
      ></Header>
      <div class="error-msg"
        ><span>{{ errorMsg }}</span></div
      >
      <div class="container">
        <a-row class="container-row" :gutter="24">
          <!-- 库存储位明细 -->
          <template v-if="dispalyType === 6">
            <a-col class="container-row" :span="24">
              <div class="selector-title">
                <span style="margin-right: 10px">工厂:</span>
                <a-select
                  v-model="locationFactoryName"
                  :style="{ width: '180px' }"
                  @change="handleChangeLocationFactory"
                >
                  <a-option
                    v-for="item in locationFactoryList"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.name }}
                  </a-option>
                </a-select>
                <span style="margin-left: 10px; margin-right: 10px">仓库:</span>
                <a-select
                  v-model="locationWarehouseName"
                  :style="{ width: '280px' }"
                  @change="handleChangeLocationWarehouse"
                >
                  <a-option
                    v-for="item in locationWarehouseList"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.name }}
                  </a-option>
                </a-select>
                <span style="margin-left: 10px; margin-right: 10px">批次:</span>
                <a-input
                  v-model="locationBatchNo"
                  :style="{ width: '180px' }"
                  placeholder=""
                  allow-clear
                />
                <span style="margin-left: 10px; margin-right: 10px">储位:</span>
                <a-select v-model="locationShelf" :style="{ width: '180px' }">
                  <a-option
                    v-for="item in locationShelfList"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.name }}
                  </a-option>
                </a-select>
                <span style="margin-left: 10px; margin-right: 10px">料号:</span>
                <a-input
                  v-model="locationItemNo"
                  :style="{ width: '180px' }"
                  placeholder=""
                  allow-clear
                />
                <a-checkbox v-model="isStocQty" class="my-checkbox"
                  >加载大于0库存</a-checkbox
                >
                <a-button type="primary" @click="getLocationDetailList"
                  >查询</a-button
                >
                <a-button
                  type="primary"
                  status="success"
                  style="margin-left: 12px"
                  @click="exportLocationDetail"
                  >导出</a-button
                >
              </div>
              <dv-border-box-12
                :color="borderColor1"
                class="table-dv-border-box"
              >
                <template v-if="loading">
                  <div class="loading-div">
                    <a-spin :size="36" tip="加载中..." />
                  </div>
                </template>
                <template v-else>
                  <dv-scroll-board
                    :config="locationDetailList"
                    style="width: 100%; height: 900px"
                    class="inventory-info2"
                  />
                </template>
              </dv-border-box-12>
            </a-col>
          </template>
          <!-- 销售订单明细 -->
          <template v-else-if="dispalyType === 5">
            <a-col class="container-row" :span="24">
              <div class="selector-title">
                <span style="margin-right: 10px">领料单号:</span>
                <a-input
                  v-model="pickNoCtrl"
                  :style="{ 'width': '320px', 'margin-right': '10px' }"
                  placeholder=""
                  allow-clear
                />
                <a-button type="primary" @click="getOrderDetailList"
                  >查询</a-button
                >
                <a-button
                  type="primary"
                  status="success"
                  style="margin-left: 12px"
                  @click="exportOrderDetail"
                  >导出</a-button
                >
              </div>
              <dv-border-box-12
                :color="borderColor1"
                class="table-dv-border-box"
              >
                <dv-scroll-board
                  :config="orderDetailList"
                  style="width: 100%; height: 900px"
                  class="inventory-info2"
                />
              </dv-border-box-12>
            </a-col>
          </template>
          <!-- 过期材明细 -->
          <template v-else-if="dispalyType === 4">
            <a-col class="container-row" :span="24">
              <div class="selector-title">
                <span style="margin-right: 10px">库存分类:</span>
                <a-select
                  v-model="expireClassName"
                  :style="{ width: '220px', marginRight: '12px' }"
                  @change="handleChangeExpiredClass"
                >
                  <a-option
                    v-for="item in expireClassList"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.name }}
                  </a-option>
                </a-select>
                <a-button
                  type="primary"
                  status="success"
                  style="margin-right: 20px; float: right"
                  @click="exportExpireDetail"
                  >导出</a-button
                >
              </div>
              <dv-border-box-12
                :color="borderColor1"
                class="table-dv-border-box"
              >
                <template v-if="loading">
                  <div class="loading-div">
                    <a-spin :size="36" tip="加载中..." />
                  </div>
                </template>
                <template v-else>
                  <dv-scroll-board
                    :config="expireDmaterialDetails"
                    style="width: 100%; height: 900px"
                    class="inventory-info2"
                  />
                </template>
              </dv-border-box-12>
            </a-col>
          </template>
          <!-- 领料需求明细 -->
          <template v-else-if="dispalyType === 3">
            <a-col class="container-row" :span="24">
              <div class="selector-title">
                <span style="margin-right: 10px">料号:</span>
                <a-input
                  v-model="partNumber"
                  :style="{ 'width': '320px', 'margin-right': '10px' }"
                  placeholder=""
                  allow-clear
                />
                <a-button type="primary" @click="getAnalysisDataDetailList"
                  >查询</a-button
                >
                <a-button
                  type="primary"
                  status="success"
                  style="margin-left: 12px"
                  @click="exportRequestDetail"
                  >导出</a-button
                >
              </div>
              <dv-border-box-12
                :color="borderColor1"
                class="table-dv-border-box"
              >
                <dv-scroll-board
                  :config="analysisDataDetailList"
                  style="width: 100%; height: 900px"
                  class="inventory-info2"
                  @click="toOrderDetail"
                />
              </dv-border-box-12>
            </a-col>
          </template>
          <!-- 每日异动明细 -->
          <template v-else-if="dispalyType === 2">
            <a-col class="container-row" :span="24">
              <div class="selector-title">
                <span style="margin-right: 10px">库存分类:</span>
                <a-select
                  v-model="inventoryClassName"
                  :style="{ width: '220px', marginRight: '12px' }"
                  @change="handleChangeInventory"
                >
                  <a-option
                    v-for="item in inventoryClassList"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.name }}
                  </a-option>
                </a-select>
                <a-button
                  type="primary"
                  status="success"
                  @click="exportInventoryDetail"
                  >导出</a-button
                >
              </div>
              <dv-border-box-12
                :color="borderColor1"
                class="table-dv-border-box"
              >
                <dv-scroll-board
                  :config="abnormalInventoryList"
                  style="width: 100%; height: 900px"
                  class="inventory-info2"
                />
              </dv-border-box-12>
            </a-col>
          </template>
          <!-- 看板 -->
          <template v-else>
            <!-- 左边 -->
            <a-col class="padding-left-0 padding-right-0" :span="14">
              <div style="margin-bottom: 12px">
                <div class="selector-title">
                  <span style="margin-right: 10px">工厂:</span>
                  <a-select
                    v-model="factoryName"
                    :style="{ width: '220px' }"
                    @change="handleChangeFactory"
                  >
                    <a-option
                      v-for="item in factoryList"
                      :key="item.value"
                      :value="item.value"
                      >{{ item.name }}
                    </a-option>
                  </a-select>
                  <span style="margin-left: 20px; margin-right: 10px"
                    >仓库:</span
                  >
                  <a-select
                    v-model="warehouseName"
                    :style="{ width: '300px' }"
                    :max-tag-count="1"
                    multiple
                    @popup-visible-change="visiableChangeWarehouse"
                  >
                    <a-option
                      v-for="item in warehouseList"
                      :key="item.value"
                      :value="item.value"
                      >{{ item.name }}
                    </a-option>
                  </a-select>
                </div>
                <dv-border-box-12
                  :color="borderColor1"
                  style="width: 1111px; height: 440px"
                >
                  <div class="padding-15" style="width: 1111px; height: 440px">
                    <div class="vertical-line">每日异动库存</div>
                    <VCharts
                      :option="abnormalInventoryOption"
                      autoresize
                      style="width: 100%; height: 380px"
                      @click="toInventoryDetail"
                    ></VCharts>
                  </div>
                </dv-border-box-12>
              </div>
              <div style="margin-bottom: 12px">
                <dv-border-box-12
                  :color="borderColor1"
                  style="width: 1111px; height: 483px"
                >
                  <div style="width: 1111px; height: 483px; padding: 15px">
                    <div class="flex-space-between" style="margin-bottom: 10px">
                      <div class="flex">
                        <div class="vertical-line">领料需求分析</div>
                        <div style="color: white">
                          <span style="margin-left: 20px; margin-right: 10px"
                            >库存分类:</span
                          >
                          <a-select
                            v-model="analysisClassName"
                            :style="{ width: '130px', marginRight: '12px' }"
                            @change="handleChangeAnalysisClass"
                          >
                            <a-option
                              v-for="item in analysisClassList"
                              :key="item.value"
                              :value="item.value"
                              >{{ item.name }}
                            </a-option>
                          </a-select>
                          <span style="margin-right: 10px">差额:</span>
                          <a-select
                            v-model="diffName"
                            :style="{ width: '130px' }"
                            @change="handleChangeAnalysisDiff"
                          >
                            <a-option value="all"> 全部 </a-option>
                            <a-option value="-1"> 小于0 </a-option>
                            <a-option value="1"> 大于等于0 </a-option>
                          </a-select>
                        </div>
                      </div>
                      <div class="tabs">
                        <div class="tab-pane">
                          <input
                            id="tab01"
                            type="radio"
                            name="tab"
                            :checked="timeCheck1"
                            @click="changeTab('近一周')"
                          />
                          <label class="tab-item" for="tab01">近一周</label>
                        </div>
                        <div class="tab-pane">
                          <input
                            id="tab02"
                            type="radio"
                            name="tab"
                            :checked="timeCheck2"
                            @click="changeTab('近一月')"
                          />
                          <label class="tab-item" for="tab02">近一月</label>
                        </div>
                        <div class="tab-pane">
                          <input
                            id="tab03"
                            type="radio"
                            name="tab"
                            :checked="timeCheck3"
                            @click="changeTab('近三月')"
                          />
                          <label class="tab-item" for="tab03">近三月</label>
                        </div>
                      </div>
                    </div>
                    <dv-scroll-board
                      ref="analysisRef"
                      :config="analysisData"
                      style="width: 100%; height: 405px"
                      class="inventory-info2"
                      @click="toAnalysisDataDetail"
                    />
                  </div>
                </dv-border-box-12>
              </div>
            </a-col>
            <!-- 右边 -->
            <a-col class="padding-right-0" :span="10">
              <dv-border-box-11
                :color="borderColor2"
                title="材料库存分析"
                class="right-dv-border-box"
              >
                <div class="right-dv-border-box-son">
                  <VCharts
                    :option="materialInventoryOption"
                    autoresize
                    style="width: 100%; height: 100%"
                    @click="toLocationDetail"
                  ></VCharts>
                </div>
              </dv-border-box-11>
              <dv-border-box-11
                :color="borderColor2"
                title="过期材料库存分类"
                class="right-dv-border-box"
              >
                <div class="right-dv-border-box-son">
                  <VCharts
                    :option="expireDmaterialInventoryOption"
                    autoresize
                    style="width: 100%; height: 100%"
                  ></VCharts>
                </div>
              </dv-border-box-11>
              <dv-border-box-11
                :color="borderColor2"
                title="过期材料明细"
                class="right-dv-border-box"
              >
                <div class="right-dv-border-box-son">
                  <dv-scroll-board
                    :config="expireDmaterialList"
                    style="width: 100%; height: 100%"
                    class="inventory-info2"
                    @click="toExpiredDataDetail"
                  />
                </div>
              </dv-border-box-11>
            </a-col>
          </template>
        </a-row>
      </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import Header from '@/components/header/index.vue';
  import { ref, onMounted, onUnmounted, reactive, onBeforeUnmount } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { formatNowDate, formatDateTime } from '@/utils/date';
  import { isNullOrEmptyStr } from '@/utils/is';
  import * as FileSaver from 'file-saver';
  import ExcelJS from 'exceljs';
  import VCharts from 'vue-echarts';
  import VScaleScreen from 'v-scale-screen';
  import {
    LoadOrgId,
    GetWarehouseList,
    GetDayChangeStock,
    GetDayChangeStockDetail,
    GetStoreType,
    GetItemNeedWeek,
    GetItemNeedMonth,
    GetItemNeedThreeMonth,
    GetItemNeedDetailWeek,
    GetItemNeedDetailMonth,
    GetItemNeedDetailThreeMonth,
    GetOrdersByPickNo,
    GetStoreAnalysis,
    GetExpireStocItem,
    GetExpireStocDetail,
    GetStocLocationDetail,
    LoadShelfList,
  } from '@/api/WarehouseDashboard';

  // 顶部-标题
  const topTitle = ref<any>('仓库数位化管理看板');
  // 顶部-显示返回按钮
  const showBackbutton = ref<boolean>(false);
  // 顶部-显示类型 1：看板 2：每日异动明细 3：领料需求分析明细 4：过期材料明细 5：销售订单明细 6：库存储位明细
  const dispalyType = ref<number>(1);
  // 错误信息
  const errorMsg = ref<any>('');
  // 看板-顶部-1-工厂列表
  const factoryList = ref<any>([]);
  const factoryName = ref<any>('');
  // 看板-顶部-2-仓库列表
  const warehouseList = ref<any>([]);
  const warehouseName = ref<any>({});
  let warehouseCodes: any = [];
  // 看板-左边-1-每日异动库存
  const abnormalInventoryOption = ref<any>({});
  const abnormalInventoryPageSize = 12;
  let abnormalInventoryName: any = [];
  let abnormalInventoryData: any = [];
  let abnormalInventoryInData: any = [];
  let abnormalInventoryOutData: any = [];
  let abnormalInventoryPageIndex = 1;
  // 看板-左边-1-每日异动库存-每日异动明细-库存分类列表
  const inventoryClassList = ref<any>([]);
  const inventoryClassName = ref<any>('');
  // 看板-左边-1-每日异动库存-每日异动明细-异动库存明细列表
  const abnormalInventoryList = ref<any>({});
  let abnormalInventorys: any = [];
  // 看板-左边-2-领料需求分析
  const analysisData = ref<any>({});
  const timeCheck1 = ref<boolean>(true);
  const timeCheck2 = ref<boolean>(false);
  const timeCheck3 = ref<boolean>(false);
  // 看板-左边-2-领料需求分析-领料需求分析明细-库存分类列表
  const analysisClassList = ref<any>([]);
  const analysisClassName = ref<any>('');
  const diffName = ref<any>('');
  // 看板-左边-2-领料需求分析-领料需求分析明细-料号
  const partNumber = ref<any>('');
  // 看板-左边-2-领料需求分析-领料需求分析明细-明细列表
  const analysisDataDetailList = ref<any>({});
  // 看板-左边-2-领料需求分析-领料需求分析明细-料号
  const pickNoCtrl = ref<any>('');
  // 看板-左边-2-领料需求分析-领料需求分析明细-销售订单明细-明细列表
  const orderDetailList = ref<any>({});
  // 看板-右边-1-材料库存分析
  const materialInventoryOption = ref<any>({});
  // 看板-右边-1-材料库存分析-库存储位明细
  const locationDetailList = ref<any>({});
  // 看板-右边-1-材料库存分析-库存储位明细-工厂列表
  const locationFactoryList = ref<any>([]);
  const locationFactoryName = ref<any>('');
  // 看板-右边-1-材料库存分析-库存储位明细-仓库列表
  const locationWarehouseList = ref<any>([]);
  const locationWarehouseName = ref<any>('');
  // 看板-右边-1-材料库存分析-库存储位明细-批次列表
  const locationBatchNo = ref<any>('');
  // 看板-右边-1-材料库存分析-库存储位明细-储位列表
  const locationShelfList = ref<any>([]);
  const locationShelf = ref<any>('');
  const isStocQty = ref<any>(true);
  const locationItemNo = ref<any>('');
  let locationDetails: any = [];
  // 看板-右边-2-过期材料库存分类
  const expireDmaterialInventoryOption = ref<any>({});
  const expireDmaterialPageSize = 10;
  let expireDmaterialName: any = [];
  let expireDmaterialData: any = [];
  let expireDmaterialValue: any = [];
  let expireDmaterialPageIndex = 1;
  let expireDetails: any = [];
  let analysisDataDetails: any = [];
  let orderDataDetails: any = [];
  // 看板-右边-3-过期材料明细
  const expireDmaterialList = ref<any>({});
  const expireDmaterialDetails = ref<any>({});
  const loading = ref<boolean>(false);
  // 看板-右边-3-过期材料明细-库存分类列表
  const expireClassList = ref<any>([]);
  const expireClassName = ref<any>('');
  // 刷新数据定时器
  let kanbanTimer: any = 0;
  let moveTimer: any = 0;
  let expireTimer: any = 0;
  // 刷新频率 60分钟
  const kanbanInterval = 60 * 60 * 1000;
  // 柱图切换页面频率 10秒
  const pageInterval = 10000;
  // 查询参数
  const queryParam = { orgId: '', wareHouseCode: '' };
  // 领料需求分析-时间类型
  let timeType = '近一周';
  // 边框颜色
  const borderColor1 = ref<any>(['#127A88', '#0EE4F9']);
  const borderColor2 = ref<any>(['#2E6099', '#0EE4F9']);

  const analysisRef = ref<InstanceType<any>>(null);

  // 公共-停止定时器
  function stopInterval() {
    clearInterval(moveTimer);
    clearInterval(expireTimer);
    clearInterval(kanbanTimer);
    moveTimer = 0;
    expireTimer = 0;
    kanbanTimer = 0;
  }

  // 看板-左边-2-领料需求分析-领料需求分析明细(跳转页面)
  analysisDataDetailList.value = reactive({
    header: [
      '仓库',
      '默认储位',
      '库存分类',
      '料名',
      '料号',
      '厂商',
      '部门',
      '领料单号',
      '需求数量',
      '已领数量',
      '未领数量',
      '库存',
      '单位',
      '开单日期',
    ],
    data: [],
    index: false,
    columnWidth: [
      110, 110, 110, 290, 130, 110, 140, 130, 130, 130, 130, 130, 100, 120,
    ],
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
      'center',
    ],
    rowNum: [20],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });
  // 看板-左边-2-领料需求分析-领料需求分析明细(跳转页面)
  const getAnalysisDataDetailList = async () => {
    const itemNo = partNumber.value as string;
    if (!itemNo || itemNo.trim().length === 0) {
      Message.warning({
        content: '请输入料号',
        duration: 5 * 1000,
      });
      return;
    }
    analysisDataDetailList.value.data = [];
    const searchParam = { ...queryParam, itemNo: partNumber.value };
    let result: any = {};
    if (timeType === '近一周') {
      result = await GetItemNeedDetailWeek(searchParam);
    } else if (timeType === '近一月') {
      result = await GetItemNeedDetailMonth(searchParam);
    } else if (timeType === '近三月') {
      result = await GetItemNeedDetailThreeMonth(searchParam);
    }
    // console.log(result);
    const datas: any = [];
    if (result.data && result.data.length > 0) {
      analysisDataDetails = result.data;
      result.data.forEach((item: any) => {
        datas.push([
          item.STOC_NO,
          item.LOCATION_CODE,
          item.C_TYPE,
          item.ITEM_NAME,
          item.ITEM_NO,
          item.VEND_NAME,
          item.DEPT_NAME,
          item.PICK_NO,
          item.REQ_QTY,
          item.FINISH_QTY,
          item.NOT_FINISH_QTY,
          item.STOC_QTY,
          item.UNIT,
          item.INSERT_DATE,
        ]);
      });
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
    analysisDataDetailList.value.data = datas;
  };

  // 看板-左边-2-领料需求分析-领料需求分析明细-销售订单明细(跳转页面)
  orderDetailList.value = reactive({
    header: [
      '仓库',
      '默认储位',
      '库存分类',
      '料名',
      '料号',
      '厂商',
      '部门',
      '领料单号',
      '销售订单号',
      '需求数量',
      '已领数量',
      '未领数量',
      '库存',
      '单位',
      '开单日期',
    ],
    data: [],
    index: false,
    columnWidth: [
      100, 100, 110, 180, 140, 100, 140, 140, 140, 130, 120, 130, 130, 110, 100,
    ],
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
      'center',
      'center',
    ],
    rowNum: [18],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });
  // 看板-左边-2-领料需求分析-领料需求分析明细-销售订单明细(跳转页面)
  const getOrderDetailList = async () => {
    const pickNo = pickNoCtrl.value as string;
    if (!pickNo || pickNo.trim().length === 0) {
      Message.warning({
        content: '请输入领料单号',
        duration: 5 * 1000,
      });
      return;
    }
    orderDetailList.value.data = [];
    const searchParam = {
      ...queryParam,
      itemNo: partNumber.value,
      pickNo: pickNoCtrl.value,
    };
    const result = await GetOrdersByPickNo(searchParam);
    // console.log(result);
    const datas: any = [];
    if (result.data && result.data.length > 0) {
      orderDataDetails = result.data;
      result.data.forEach((item: any) => {
        datas.push([
          item.STOC_NO,
          item.LOCATION_CODE,
          item.C_TYPE,
          item.ITEM_NAME,
          item.ITEM_NO,
          item.VEND_NAME,
          item.DEPT_NAME,
          item.PICK_NO,
          item.SALES_ORDER,
          item.REQ_QTY,
          item.FINISH_QTY,
          item.NOT_FINISH_QTY,
          item.STOC_QTY,
          item.UNIT,
          item.INSERT_DATE,
        ]);
      });
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
    orderDetailList.value.data = datas;
  };

  // 看板-左边-1-每日异动明细-库存分类列表
  // 看板-左边-1-领料需求分析-库存分类列表
  const getInventoryClassList = async () => {
    analysisClassList.value = [];
    inventoryClassList.value = [];
    expireClassList.value = [];
    const analysisClass = [{ value: 'all', name: '全部' }];
    const inventoryClass = [{ value: 'all', name: '全部' }];
    const expireClass = [{ value: 'all', name: '全部' }];
    const result = await GetStoreType(queryParam);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        analysisClass.push({ value: item.C_TYPE, name: item.C_TYPE });
        inventoryClass.push({ value: item.C_TYPE, name: item.C_TYPE });
        expireClass.push({ value: item.C_TYPE, name: item.C_TYPE });
      });
    }
    analysisClassList.value = analysisClass;
    inventoryClassList.value = inventoryClass;
    expireClassList.value = expireClass;
    analysisClassName.value = 'all';
    diffName.value = 'all';
    expireClassName.value = 'all';
  };

  // 看板-左边-1-每日异动明细-异动库存明细列表(跳转页面)
  abnormalInventoryList.value = reactive({
    header: [
      '类型',
      '仓库',
      '默认储位',
      '库存分类',
      '料名',
      '料号',
      '厂商',
      '数量',
      '单位',
      '批次',
    ],
    data: [],
    index: false,
    columnWidth: [100, 110, 110, 120, 690, 150, 200, 150, 110, 130],
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
    ],
    rowNum: [20],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });
  // 看板-左边-1-每日异动明细-异动库存明细列表(跳转页面)
  const getAbnormalInventoryList = async () => {
    abnormalInventoryList.value.data = [];
    const searchParam = { ...queryParam, storeType: '' };
    const storeType = inventoryClassName.value;
    searchParam.storeType = storeType === 'all' ? '' : storeType;
    const result = await GetDayChangeStockDetail(searchParam);
    // console.log(result);
    const datas: any = [];
    abnormalInventorys = [];
    if (result.data && result.data.length > 0) {
      abnormalInventorys = result.data;
      abnormalInventorys.forEach((item: any) => {
        const inOutColor = item.FFF === '进仓' ? ' #33FF8D' : ' #FFFF00';
        const fff = `<span style="color:${inOutColor}">${item.FFF}</span>`;
        datas.push([
          fff,
          item.STOC_NO,
          item.LOCATION_CODE,
          item.C_TYPE,
          item.NAME_T,
          item.ITEM_NO,
          item.VEND_NAME,
          item.TRANS_QTY,
          item.UNIT,
          item.BATCH_NO,
        ]);
      });
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
    abnormalInventoryList.value.data = datas;
  };

  //  看板-右边-3-过期材料明细-明细列表(跳转页面)
  expireDmaterialDetails.value = reactive({
    header: [
      '仓库',
      '默认储位',
      '库存分类',
      '料名',
      '料号',
      '厂商',
      '库存数量',
      '单位',
      '最后异动日期',
      '最后进仓日期',
      '过期时间',
    ],
    data: [],
    index: false,
    columnWidth: [110, 110, 110, 620, 140, 110, 140, 130, 140, 140, 120],
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
    rowNum: [20],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });
  //  看板-右边-3-过期材料明细-明细列表(跳转页面)
  const getExpireDmaterialDetails = async () => {
    expireDmaterialDetails.value.data = [];
    const searchParam = { ...queryParam, page: '2', storeType: '' };
    if (expireClassName.value !== 'all') {
      searchParam.storeType = expireClassName.value;
    }
    const result = await GetExpireStocDetail(searchParam);
    // console.log(result);
    const datas: any = [];
    if (result.data && result.data.length > 0) {
      expireDetails = result.data;
      result.data.forEach((item: any) => {
        const color = item.OUT_DATE === '3个月' ? '#F59A23' : '#FF4333';
        const outDate = `<span style="color:${color}">${item.OUT_DATE}</span>`;
        datas.push([
          item.STOC_NO,
          item.LOCATION_CODE,
          item.ITEM_TYPE,
          item.ITEM_NAME,
          item.ITEM_NO,
          item.VEND_NAME,
          item.STOC_QTY,
          item.UNIT,
          item.LAST_DATE,
          item.LAST_IN_DATE,
          outDate,
        ]);
      });
    }
    loading.value = false;
    expireDmaterialDetails.value.data = datas;
  };

  // 看板-顶部-1-仓库列表
  const getWarehouseist = async (
    param: any,
    isPageOne: boolean,
    isFirstLoad: boolean
  ) => {
    const warehouseDatas: any = [];
    const locationWarehouseDatas: any = [];
    const result = await GetWarehouseList(param);
    warehouseCodes = [];
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        const obj = {
          value: item.WAREHOUSE_CODE,
          name: item.WAREHOUSE_CODE + item.WAREHOUSE_NAME,
        };
        warehouseCodes.push(item.WAREHOUSE_CODE);
        if (isPageOne) {
          warehouseDatas.push(obj);
        }
        locationWarehouseDatas.push(obj);
      });
    }
    if (isPageOne) {
      warehouseList.value = warehouseDatas;
      queryParam.wareHouseCode = warehouseCodes.join();
      if (isFirstLoad) {
        warehouseName.value = warehouseCodes;     
      }
    }
    locationWarehouseList.value = locationWarehouseDatas;
  };

  // 看板-顶部-2-工厂列表
  const getFactoryList = async () => {
    const factoryDatas: any = [];
    const locationFactoryDatas: any = [];
    warehouseName.value = [];
    factoryName.value = '';
    const result = await LoadOrgId();
    // console.log(result);
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        if (!factoryName.value) {
          factoryName.value = item.ORG_CODE;
        }
        const obj = {
          value: item.ORG_CODE,
          name: item.ORG_CODE + item.ORG_NAME,
        };
        factoryDatas.push(obj);
        locationFactoryDatas.push(obj);
      });
      queryParam.orgId = factoryName.value;
      queryParam.wareHouseCode = '';
    }
    factoryList.value = factoryDatas;
    locationFactoryList.value = locationFactoryDatas;
    await getWarehouseist(queryParam, true, true);
    getInventoryClassList();
    loadData();
  };

  // 看板-左边-获取每日异动库存
  abnormalInventoryOption.value = reactive({
    grid: {
      top: '10%',
      bottom: '1%',
      left: '2%',
      right: '2%',
      containLabel: true,
    },
    legend: {
      data: ['进仓', '出仓'],
      textStyle: {
        color: '#ffffff',
      },
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        color: '#ffffff',
        // rotate: 30,
      },
      axisTick: {
        show: false,
      },
      triggerEvent: true,
    },
    yAxis: {
      name: '种类',
      type: 'value',
      axisLabel: {
        color: '#ffffff',
      },
      splitLine: {
        lineStyle: {
          color: '#353A46',
        },
      },
      nameTextStyle: {
        color: '#ffffff',
      },
    },
    label: {
      show: true,
    },
    series: [
      {
        name: '进仓',
        data: [],
        type: 'bar',
        // stack: 'bar',
        label: {
          normal: {
            show: true,
            color: '#ffffff',
            fontSize: 15,
            position: 'top',
            formatter(param: any) {
              return param.data === 0 ? '' : param.data;
            },
          },
        },
      },
      {
        name: '出仓',
        data: [],
        type: 'bar',
        // stack: 'bar',
        label: {
          normal: {
            show: true,
            color: '#ffffff',
            fontSize: 15,
            position: 'top',
            formatter(param: any) {
              return param.data === 0 ? '' : param.data;
            },
          },
        },
      },
    ],
  });
  // 看板-左边-获取每日异动库存-清空数据
  function clearAbnormalInventoryData() {
    abnormalInventoryName = [];
    abnormalInventoryInData = [];
    abnormalInventoryOutData = [];
  }
  // 看板-左边-获取每日异动库存-赋值数据
  function getPartAbnormalInventorys() {
    clearAbnormalInventoryData();
    const maxPage =
      abnormalInventoryData.length % abnormalInventoryPageSize === 0
        ? abnormalInventoryData.length / abnormalInventoryPageSize
        : abnormalInventoryData.length / abnormalInventoryPageSize + 1;
    if (abnormalInventoryPageIndex > maxPage) {
      abnormalInventoryPageIndex = 1;
    }
    const len = abnormalInventoryPageIndex * abnormalInventoryPageSize;
    const start = (abnormalInventoryPageIndex - 1) * abnormalInventoryPageSize;
    const end =
      len > abnormalInventoryData.length ? abnormalInventoryData.length : len;
    for (let i = start; i < end; i += 1) {
      const item = abnormalInventoryData[i];
      abnormalInventoryName.push(item.ITEM_TYPE);
      abnormalInventoryInData.push(item.IN_ITEM);
      abnormalInventoryOutData.push(item.OUT_ITEM);
    }
    abnormalInventoryOption.value.xAxis.data = abnormalInventoryName;
    abnormalInventoryOption.value.series[0].data = abnormalInventoryInData;
    abnormalInventoryOption.value.series[1].data = abnormalInventoryOutData;
    abnormalInventoryPageIndex += 1;
  }
  // 看板-左边-获取每日异动库存
  const getAbnormalInventorys = async () => {
    clearInterval(moveTimer);
    clearAbnormalInventoryData();
    abnormalInventoryData = [];
    abnormalInventoryPageIndex = 1;
    abnormalInventoryOption.value.xAxis.data = [];
    abnormalInventoryOption.value.series[0].data = [];
    abnormalInventoryOption.value.series[1].data = [];
    const result = await GetDayChangeStock(queryParam);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      abnormalInventoryData = result.data;
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
    getPartAbnormalInventorys();
    if (abnormalInventoryData.length > abnormalInventoryPageSize) {
      moveTimer = setInterval(() => {
        getPartAbnormalInventorys();
      }, pageInterval);
    }
  };

  // 看板-左边-2-领料需求分析
  analysisData.value = reactive({
    header: [
      '仓库',
      '库存分类',
      '料名',
      '料号',
      '需求数量',
      '库存',
      '差额',
      '单位',
    ],
    data: [],
    index: false,
    columnWidth: [80, 80, 380, 130, 110, 110, 110, 80],
    align: [
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
      'center',
    ],
    rowNum: [8],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });
  // 看板-左边-2-领料需求分析
  const getAnalysisData = async () => {
    analysisData.value.data = [];
    let result: any = {};
    const searchParam = { ...queryParam, storeType: '', diff: '' };
    if (analysisClassName.value !== 'all') {
      searchParam.storeType = analysisClassName.value;
    }
    if (diffName.value !== 'all') {
      searchParam.diff = diffName.value;
    }
    if (timeType === '近一周') {
      result = await GetItemNeedWeek(searchParam);
    } else if (timeType === '近一月') {
      result = await GetItemNeedMonth(searchParam);
    } else if (timeType === '近三月') {
      result = await GetItemNeedThreeMonth(searchParam);
    }
    // console.log(result);
    const datas: any = [];
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        const diff =
          item.DIFF < 0
            ? `<span style="color:#FD2104">${item.DIFF}</span>`
            : item.DIFF;
        datas.push([
          item.STOC_NO,
          item.C_TYPE,
          item.ITEM_NAME,
          item.ITEM_NO,
          item.REQ_QTY,
          item.STOC_QTY,
          diff,
          item.UNIT,
        ]);
      });
      if (analysisRef.value) {
        // 此处可以传第二个参数 index，指定下次滚动的起始行
        analysisRef.value.updateRows(datas[0], 0);
      }
    }
    analysisData.value.data = datas;
  };

  // 看板-右边-1-材料库存分析
  materialInventoryOption.value = reactive({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}',
    },
    legend: {
      // orient: 'vertical',
      orient: 'horizontal',
      top: '18%',
      bottom: 0,
      left: '39%',
      data: [],
      textStyle: {
        color: '#ffffff',
        fontSize: 15,
      },
    },
    series: [
      {
        name: '材料库存',
        type: 'pie',
        radius: '80%',
        center: ['25%', '50%'],
        data: [],
        label: {
          show: false,
        },
      },
    ],
  });
  // 看板-右边-1-材料库存分析
  const getMaterialInventory = async () => {
    materialInventoryOption.value.legend.data = [];
    materialInventoryOption.value.series[0].data = [];
    const names: any = [];
    const datas: any = [];
    const result = await GetStoreAnalysis(queryParam);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        const legendName = `${item.Q_UNIT}:${item.STOC_QTY}`;
        names.push(legendName);
        datas.push({ name: legendName, value: item.STOC_QTY });
      });
    }
    materialInventoryOption.value.legend.data = names;
    materialInventoryOption.value.series[0].data = datas;
  };

  // 看板-顶部-1-库存储位明细-储位列表
  const getShelfList = async (param: any) => {
    const datas: any = [{ value: 'all', name: '全部' }];
    const result = await LoadShelfList(param);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        datas.push({
          value: item.LOCATION_CODE,
          name: item.LOCATION_NAME,
        });
      });
    }
    locationShelfList.value = datas;
  };

  // 看板-右边-1-材料库存分析-库存储位明细
  locationDetailList.value = reactive({
    header: [
      '工厂代号',
      '仓库代码',
      '仓库名称',
      '批次号',
      '库存储位',
      '储位名称',
      '料号',
      '料名',
      '单位',
      '库存数',
      '最后移动时间',
    ],
    data: [],
    index: false,
    columnWidth: [110, 110, 140, 110, 110, 128, 140, 595, 130, 130, 155],
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
    rowNum: [20],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });

  // 看板-右边-1-材料库存分析-库存储位明细
  const getLocationDetailList = async () => {
    const orgId = locationFactoryName.value;
    const wareHouseCode = locationWarehouseName.value;
    const batchNo = locationBatchNo.value;
    const locationNo = locationShelf.value === 'all' ? '' : locationShelf.value;
    const itemNo = locationItemNo.value;
    const isStocQtyVal = isStocQty.value;
    if (isNullOrEmptyStr(orgId)) {
      Message.warning({
        content: '请选择工厂',
        duration: 5 * 1000,
      });
      return;
    }
    if (isNullOrEmptyStr(wareHouseCode)) {
      Message.warning({
        content: '请选择仓库',
        duration: 5 * 1000,
      });
      return;
    }
    if (!isStocQtyVal) {
      if (isNullOrEmptyStr(itemNo)) {
        Message.warning({
          content: '请输入料号',
          duration: 5 * 1000,
        });
        return;
      }
    }
    loading.value = true;
    locationDetailList.value.data = [];
    const searchParam = {
      orgId,
      wareHouseCode,
      batchNo,
      locationNo,
      itemNo,
      isStocQty: isStocQtyVal ? 'Y' : 'N',
      lastDate: '',
    };
    const result = await GetStocLocationDetail(searchParam);
    // console.log(result);
    const datas: any = [];
    if (result.data && result.data.length > 0) {
      // locationDetails = result.data;
      result.data.forEach((item: any) => {
        const lastDate = formatDateTime(new Date(item.LAST_DATE), 'yyyy/MM/dd');
        datas.push([
          item.ORG_ID,
          item.STOC_NO,
          item.STOC_NAME,
          item.BATCH_NO,
          item.SHELF_NO,
          item.LOCATION_NAME,
          item.ITEM_NO,
          item.ITEM_NAME,
          item.UNIT,
          item.STOC_QTY,
          lastDate,
        ]);
      });
      locationDetails = datas;
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
    loading.value = false;
    locationDetailList.value.data = datas;
  };

  // 看板-右边-2-过期材料库存分类
  expireDmaterialInventoryOption.value = reactive({
    color: ['#62AFFE'],
    grid: {
      top: '12%',
      bottom: '2%',
      right: '2%',
      left: '2%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        color: '#ffffff',
        // rotate: 30,
        // fontSize: 15,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      name: '种类',
      type: 'value',
      axisLabel: {
        color: '#ffffff',
        // fontSize: 15,
      },
      splitLine: {
        lineStyle: {
          color: '#353A46',
        },
      },
      nameTextStyle: {
        color: '#ffffff',
      },
    },
    label: {
      show: true,
      fontSize: 15,
      color: '#ffffff',
      formatter(data: any) {
        return data.value === 0 ? '' : data.value;
      },
    },
    series: [
      {
        name: '材料库存',
        data: [],
        type: 'bar',
      },
    ],
  });
  // 看板-右边-2-过期材料库存分类-清空数据
  function clearExpireDmaterialData() {
    expireDmaterialName = [];
    expireDmaterialValue = [];
  }
  // 看板-右边-2-过期材料库存分类-赋值数据
  function getPartExpireDmaterialInventory() {
    clearExpireDmaterialData();
    const maxPage =
      expireDmaterialData.length % expireDmaterialPageSize === 0
        ? expireDmaterialData.length / expireDmaterialPageSize
        : expireDmaterialData.length / expireDmaterialPageSize + 1;
    if (expireDmaterialPageIndex > maxPage) {
      expireDmaterialPageIndex = 1;
    }
    const len = expireDmaterialPageIndex * expireDmaterialPageSize;
    const start = (expireDmaterialPageIndex - 1) * expireDmaterialPageSize;
    const end =
      len > expireDmaterialData.length ? expireDmaterialData.length : len;
    for (let i = start; i < end; i += 1) {
      const item = expireDmaterialData[i];
      expireDmaterialName.push(item.ITEM_TYPE);
      expireDmaterialValue.push(item.ITEM_COUNT);
    }
    expireDmaterialInventoryOption.value.xAxis.data = expireDmaterialName;
    expireDmaterialInventoryOption.value.series[0].data = expireDmaterialValue;
    expireDmaterialPageIndex += 1;
  }
  // 看板-右边-2-过期材料库存分类
  const getExpireDmaterialInventory = async () => {
    clearInterval(expireTimer);
    clearExpireDmaterialData();
    expireDmaterialData = [];
    expireDmaterialPageIndex = 1;
    expireDmaterialInventoryOption.value.xAxis.data = [];
    expireDmaterialInventoryOption.value.series[0].data = [];
    const result = await GetExpireStocItem(queryParam);
    // console.log(result);
    if (result.data && result.data.length > 0) {
      expireDmaterialData = result.data;
    }
    getPartExpireDmaterialInventory();
    if (expireDmaterialData.length > expireDmaterialPageSize) {
      expireTimer = setInterval(() => {
        getPartExpireDmaterialInventory();
      }, pageInterval);
    }
  };

  // 看板-右边-3-过期材料明细
  expireDmaterialList.value = reactive({
    header: ['仓库', '料名', '料号', '库存数量', '单位', '过期时间'],
    data: [],
    index: false,
    columnWidth: [80, 280, 110, 90, 80, 85],
    align: ['center', 'center', 'center', 'center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
  });
  // 看板-右边-3-过期材料明细
  const getExpireDmaterialList = async () => {
    expireDmaterialList.value.data = [];
    const searchParam = { ...queryParam, page: '1', storeType: '' };
    const result = await GetExpireStocDetail(searchParam);
    // console.log(result);
    const datas: any = [];
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        const color = item.OUT_DATE === '3个月' ? '#F59A23' : '#FF4333';
        const outDate = `<span style="color:${color}">${item.OUT_DATE}</span>`;
        datas.push([
          item.STOC_NO,
          item.ITEM_NAME,
          item.ITEM_NO,
          item.STOC_QTY,
          item.UNIT,
          outDate,
        ]);
      });
    }
    expireDmaterialList.value.data = datas;
  };

  // 加载数据
  function loadData() {
    getAbnormalInventorys();
    getAnalysisData();
    getMaterialInventory();
    getExpireDmaterialInventory();
    getExpireDmaterialList();
    kanbanTimer = setInterval(() => {
      getAbnormalInventorys();
      getAnalysisData();
      getMaterialInventory();
      // getExpireDmaterialInventory();
      // getExpireDmaterialList();
    }, kanbanInterval);
  }

  // 组件事件
  // 看板-顶部-1-工厂选择事件
  async function handleChangeFactory(val: any) {
    warehouseName.value = [];
    queryParam.orgId = factoryName.value;
    queryParam.wareHouseCode = '';
    await getWarehouseist(queryParam, true, false);
    getInventoryClassList();
    stopInterval();
    loadData();
  }

  // 看板-顶部-2-仓库选择事件
  function visiableChangeWarehouse(visiable: boolean) {
    if (!visiable) {
      let wareHouseCode = warehouseName.value.join();
      if (wareHouseCode === '') {
        wareHouseCode = warehouseCodes.join();
      }
      if (wareHouseCode === queryParam.wareHouseCode) {
        return;
      }
      queryParam.wareHouseCode = wareHouseCode;
      getInventoryClassList();
      stopInterval();
      loadData();
    }
  }

  // 看板-左边-1-每日异动库存-跳转每日异动明细事件
  function toInventoryDetail(param: any) {
    if (param.componentType === 'xAxis') {
      inventoryClassName.value = param.value;
    } else if (param.componentType === 'series') {
      inventoryClassName.value = param.name;
    }
    showBackbutton.value = !showBackbutton.value;
    dispalyType.value = 2;
    topTitle.value = '每日异动明细';
    stopInterval();
    getAbnormalInventoryList();
  }

  // 看板-左边-2-领料需求分析-跳转领料需求分析明细事件
  function toAnalysisDataDetail(val: any) {
    // 料号
    const number = val.row[3];
    partNumber.value = number;
    showBackbutton.value = !showBackbutton.value;
    dispalyType.value = 3;
    topTitle.value = '领料需求分析明细';
    stopInterval();
    getAnalysisDataDetailList();
  }

  // 看板-左边-2-领料需求分析-领料需求分析明细-跳转销售订单明细事件
  function toOrderDetail(val: any) {
    // 领料单号
    const pickNo = val.row[7];
    dispalyType.value = 5;
    topTitle.value = '销售订单明细';
    pickNoCtrl.value = pickNo;
    getOrderDetailList();
  }

  // 看板-左边-2-领料需求分析-选择时间事件
  function changeTab(type: any) {
    timeType = type;
    getAnalysisData();
  }

  // 看板-左边-1-材料库存分析-跳转库存储位明细事件
  function toLocationDetail(param: any) {
    if (isNullOrEmptyStr(factoryName.value)) {
      Message.warning({
        content: '请选择工厂',
        duration: 5 * 1000,
      });
      return;
    }
    if (warehouseName.value.length === 0) {
      Message.warning({
        content: '请选择仓库',
        duration: 5 * 1000,
      });
      return;
    }
    showBackbutton.value = !showBackbutton.value;
    dispalyType.value = 6;
    topTitle.value = '库存储位明细';
    locationFactoryName.value = factoryName.value;
    locationWarehouseName.value = warehouseName.value[0] as string;
    locationBatchNo.value = '';
    locationShelf.value = '';
    locationItemNo.value = '';
    isStocQty.value = true;
    getLocationDetailList();
    handleChangeLocationWarehouse(null);
  }

  // 看板-右边-1-材料库存分析-库存储位明细-工厂选择事件
  function handleChangeLocationFactory(val: any) {
    locationWarehouseName.value = '';
    locationBatchNo.value = '';
    locationShelf.value = 'all';
    locationItemNo.value = '';
    locationShelfList.value = [];
    const searchParam = { orgId: locationFactoryName.value, wareHouseCode: '' };
    getWarehouseist(searchParam, false, false);
  }

  // 看板-右边-1-材料库存分析-库存储位明细-工厂选择事件
  function handleChangeLocationWarehouse(val: any) {
    const searchParam = {
      orgId: locationFactoryName.value,
      wareHouseCode: locationWarehouseName.value,
    };
    // getBatchNoList(searchParam);
    locationBatchNo.value = '';
    locationShelf.value = 'all';
    locationItemNo.value = '';
    getShelfList(searchParam);
  }

  // 看板-右边-3-过期材料明细-跳转过期材料明细事件
  function toExpiredDataDetail(val: any) {
    showBackbutton.value = !showBackbutton.value;
    dispalyType.value = 4;
    topTitle.value = '过期材料明细';
    stopInterval();
    loading.value = true;
    expireClassName.value = 'all';
    getExpireDmaterialDetails();
  }

  // 顶部-返回事件
  function handleBackbutton(val: any) {
    if (dispalyType.value === 5) {
      dispalyType.value = 3;
      topTitle.value = '领料需求分析明细';
      getAnalysisDataDetailList();
    } else {
      showBackbutton.value = !showBackbutton.value;
      dispalyType.value = 1;
      topTitle.value = '仓库数位化管理看板';
      if (timeType === '近一周') {
        timeCheck1.value = true;
        timeCheck2.value = false;
        timeCheck3.value = false;
      } else if (timeType === '近一月') {
        timeCheck1.value = false;
        timeCheck2.value = true;
        timeCheck3.value = false;
      } else if (timeType === '近三月') {
        timeCheck1.value = false;
        timeCheck2.value = false;
        timeCheck3.value = true;
      }
      stopInterval();
      loadData();
    }
  }

  // 看板-左边-1-每日异动库存-每日异动明细-库存分类选择事件
  function handleChangeInventory(val: any) {
    getAbnormalInventoryList();
  }

  // 看板-左边-2-领料需求分析-库存分类选择事件
  function handleChangeAnalysisClass(val: any) {
    getAnalysisData();
  }

  // 看板-左边-2-领料需求分析-差额选择事件
  function handleChangeAnalysisDiff(val: any) {
    getAnalysisData();
  }

  // 看板-左边-3-过期分类库存明细-库存分类选择事件
  function handleChangeExpiredClass(val: any) {
    getExpireDmaterialDetails();
  }

  // 导出excel的方法
  function exportToExcel(columns: any, datas: any, fileName: string) {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook();
    // 添加工作表，名为sheet1
    const sheet1 = workbook.addWorksheet('sheet1');
    // 添加表头列数据
    sheet1.columns = columns;
    datas.forEach((item: any) => {
      // 添加内容列数据
      sheet1.addRow(item);
    });
    // 导出表格文件
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const file = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(file, fileName);
      })
      .catch((error) => console.log('Error writing excel export', error));
  }

  // 看板-左边-1-每日异动库存-每日异动明细-导出excel
  function exportInventoryDetail() {
    // 添加表头列数据
    const columns = [
      { header: '类型', key: 'FFF', width: 10 },
      { header: '仓库', key: 'STOC_NO', width: 12 },
      { header: '默认储位', key: 'LOCATION_CODE', width: 15 },
      { header: '库存分类', key: 'C_TYPE', width: 15 },
      { header: '料名', key: 'NAME_T', width: 50 },
      { header: '料号', key: 'ITEM_NO', width: 15 },
      { header: '厂商', key: 'VEND_NAME', width: 15 },
      { header: '数量', key: 'TRANS_QTY', width: 15 },
      { header: '单位', key: 'UNIT', width: 15 },
      { header: '批次', key: 'BATCH_NO', width: 15 },
    ];
    // 将时间字符串拼接到文件名中
    const fileName = `每日异动明细_${formatNowDate('yyyyMMddHHmmss')}.xlsx`;
    exportToExcel(columns, abnormalInventorys, fileName);
  }

  // 看板-左边-2-领料需求分析-领料需求明细-导出excel
  function exportRequestDetail() {
    // 添加表头列数据
    const columns = [
      { header: '仓库', key: 'STOC_NO', width: 15 },
      { header: '默认储位', key: 'LOCATION_CODE', width: 15 },
      { header: '库存分类', key: 'C_TYPE', width: 15 },
      { header: '料名', key: 'ITEM_NAME', width: 50 },
      { header: '料号', key: 'ITEM_NO', width: 15 },
      { header: '厂商', key: 'VEND_NAME', width: 15 },
      { header: '部门', key: 'DEPT_NAME', width: 15 },
      { header: '领料单号', key: 'PICK_NO', width: 15 },
      { header: '需求数量', key: 'REQ_QTY', width: 15 },
      { header: '已领数量', key: 'FINISH_QTY', width: 15 },
      { header: '未领数量', key: 'NOT_FINISH_QTY', width: 15 },
      { header: '库存', key: 'STOC_QTY', width: 15 },
      { header: '单位', key: 'UNIT', width: 15 },
      { header: '开单日期', key: 'INSERT_DATE', width: 15 },
    ];
    // 将时间字符串拼接到文件名中
    const fileName = `领料需求分析明细_${formatNowDate('yyyyMMddHHmmss')}.xlsx`;
    exportToExcel(columns, analysisDataDetails, fileName);
  }

  // 看板-左边-2-领料需求分析-领料需求明细-销售订单明细-导出excel
  function exportOrderDetail() {
    // 添加表头列数据
    const columns = [
      { header: '仓库', key: 'STOC_NO', width: 15 },
      { header: '默认储位', key: 'LOCATION_CODE', width: 15 },
      { header: '库存分类', key: 'C_TYPE', width: 15 },
      { header: '料名', key: 'ITEM_NAME', width: 50 },
      { header: '料号', key: 'ITEM_NO', width: 15 },
      { header: '厂商', key: 'VEND_NAME', width: 15 },
      { header: '部门', key: 'DEPT_NAME', width: 15 },
      { header: '领料单号', key: 'PICK_NO', width: 15 },
      { header: '销售订单号', key: 'SALES_ORDER', width: 15 },
      { header: '需求数量', key: 'REQ_QTY', width: 15 },
      { header: '已领数量', key: 'FINISH_QTY', width: 15 },
      { header: '未领数量', key: 'NOT_FINISH_QTY', width: 15 },
      { header: '库存', key: 'STOC_QTY', width: 15 },
      { header: '单位', key: 'UNIT', width: 15 },
      { header: '开单日期', key: 'INSERT_DATE', width: 15 },
    ];
    // 将时间字符串拼接到文件名中
    const fileName = `销售订单明细_${formatNowDate('yyyyMMddHHmmss')}.xlsx`;
    exportToExcel(columns, orderDataDetails, fileName);
  }

  // 看板-左边-2-材料库存分析-库存储位明细-导出excel
  function exportLocationDetail() {
    // 添加表头列数据
    const columns = [
      { header: '工厂代号', key: 'ORG_ID', width: 15 },
      { header: '仓库代码', key: 'STOC_NO', width: 15 },
      { header: '仓库名称', key: 'STOC_NAME', width: 15 },
      { header: '批次号', key: 'BATCH_NO', width: 15 },
      { header: '库存储位', key: 'SHELF_NO', width: 15 },
      { header: '储位名称', key: 'LOCATION_NAME', width: 15 },
      { header: '料号', key: 'ITEM_NO', width: 15 },
      { header: '料名', key: 'ITEM_NAME', width: 50 },
      { header: '单位', key: 'UNIT', width: 15 },
      { header: '库存数', key: 'STOC_QTY', width: 15 },
      { header: '最后移动时间', key: 'LAST_DATE', width: 20 },
    ];
    // 将时间字符串拼接到文件名中
    const fileName = `库存储位明细_${formatNowDate('yyyyMMddHHmmss')}.xlsx`;
    exportToExcel(columns, locationDetails, fileName);
  }

  // 看板-右边-3-过期材料明细-过期材料明细-导出excel
  function exportExpireDetail() {
    // 添加表头列数据
    const columns = [
      { header: '仓库', key: 'STOC_NO', width: 15 },
      { header: '默认储位', key: 'LOCATION_CODE', width: 15 },
      { header: '库存分类', key: 'ITEM_TYPE', width: 15 },
      { header: '料名', key: 'ITEM_NAME', width: 50 },
      { header: '料号', key: 'ITEM_NO', width: 15 },
      { header: '厂商', key: 'VEND_NAME', width: 15 },
      { header: '库存数量', key: 'STOC_QTY', width: 15 },
      { header: '单位', key: 'UNIT', width: 15 },
      { header: '最后异动日期', key: 'LAST_DATE', width: 15 },
      { header: '最后进仓日期', key: 'LAST_IN_DATE', width: 15 },
      { header: '过期时间', key: 'OUT_DATE', width: 15 },
    ];
    // 将时间字符串拼接到文件名中
    const fileName = `过期材料明细_${formatNowDate('yyyyMMddHHmmss')}.xlsx`;
    exportToExcel(columns, expireDetails, fileName);
  }

  onMounted(() => {
    getFactoryList();
  });

  onBeforeUnmount(() => {
    stopInterval();
  });
</script>

<style lang="less" scoped>
  .full {
    background-color: black;
    background-size: cover;
  }

  .container {
    position: fixed;
    top: 95px;
    width: 1920px;
    height: 985px;
    background-color: black;
    padding: 0px 0px 0px 15px;
  }

  .container-row {
    height: 985px;
    padding: 0 !important;
    margin: 0 !important;
  }

  .error-msg {
    position: absolute;
    z-index: 9999;
    top: 65px;
    left: 0px;
    span {
      margin-left: 15px;
      color: #fd2104;
      font-size: 20px;
    }
  }

  .my-checkbox {
    margin-right: 10px;
    :deep(.arco-checkbox-label) {
      color: white;
    }
  }

  .flex {
    display: flex;
  }

  :deep(.arco-tag-close-btn) {
    display: none !important;
  }

  .vertical-line {
    position: relative;
    padding-left: 12px;
    margin-bottom: 10px;
    color: #0ee4f9;
    font-size: 20px;
    font-weight: bold;
  }

  .vertical-line:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: #0ee4f9;
    border-radius: 5px;
  }

  .right-dv-border-box {
    width: 769px;
    height: 315px;
    margin-bottom: 12px;
  }

  .right-dv-border-box-son {
    width: 769px;
    height: 315px;
    padding: 15px;
    padding-top: 55px;
  }

  .table-dv-border-box {
    width: 1890px;
    height: 933px;
    padding: 15px;
  }

  .padding-15 {
    padding: 15px;
  }

  .padding-left-0 {
    padding-left: 0 !important;
  }

  .padding-right-0 {
    padding-right: 0 !important;
  }

  .selector-title {
    color: white;
    font-size: 18px;
    padding-left: 5px;
  }

  .flex-space-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .loading-div {
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.arco-spin-icon) {
      color: white;
    }

    :deep(.arco-spin-tip) {
      color: white;
    }
  }

  .inventory-info {
    cursor: default;
    :deep(.row-item) {
      height: max-content !important;
    }

    :deep(.ceil) {
      white-space: pre-wrap;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .inventory-info2 {
    cursor: default;
    :deep(.row-item) {
      padding: 0 5px;
    }

    :deep(.ceil) {
      padding: 0 5px;
    }
  }

  .tabs {
    float: right;
    user-select: none;

    > div:last-child {
      border-right: 1px solid #04acc2;
    }

    .tab-pane {
      display: inline-block;
      border: 1px solid #04acc2;
      border-right: 0;
    }

    input[type='radio'] {
      position: absolute;
      clip: rect(0, 0, 0, 0);
    }

    input[type='radio']:checked + .tab-item {
      background: #04acc2;
      color: #fff;
    }

    .tab-item {
      display: block;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      padding: 0 12px;
      color: white;
      float: left;
      background: #1e2269;
    }
  }
</style>
