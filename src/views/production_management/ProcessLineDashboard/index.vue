<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <Header
        :title="pageTitle"
        line-color="rgba(14,228,249, 1)"
        :center-style="{ color: '#0EE4F9', fontSize: '40px' }"
        :right-style="{ color: 'white' }"
      ></Header>
      <div style="position: fixed; left: 15px; top: 75px; z-index: 9999">
        <div class="selector-title">
          <span style="margin-left: 5px"
            >{{ $t('ProcessLineDashboard.center.title1') }}：</span
          >
          <a-select
            v-model="productionGroup"
            size="large"
            :style="{ width: '240px' }"
            @change="handleChangeProGroup"
          >
            <a-option
              v-for="item in productionGroupOptions"
              :key="item.value"
              :value="item.value"
              style="font-size: 20px"
              >{{ item.name }}
            </a-option>
          </a-select>
          <a-button
            v-show="showPageBtn"
            type="primary"
            size="large"
            class="page-button"
            @click="handlePrevPage"
          >
            上一页
          </a-button>
          <a-button
            v-show="showPageBtn"
            type="primary"
            size="large"
            class="page-button"
            @click="handleNextPage"
          >
            下一页
          </a-button>
          <a-button
            v-show="showPageBtn"
            type="primary"
            status="success"
            size="large"
            class="page-button"
            @click="refreshData"
          >
            刷新
          </a-button>
          <span style="margin-left: 15px; color: #fd2104; margin-top: 6px">{{
            errorMsg
          }}</span>
        </div>
      </div>
      <div class="button-float" @click="handleStop">
        <div class="button-wrap">{{ modelName }}</div>
      </div>
      <div class="container">
        <!-- 第一页 -->
        <template v-if="showPage === 1">
          <a-row class="container-row" :gutter="24">
            <!-- 左边 -->
            <a-col :span="6" class="padding-leftright-0">
              <!-- 生产线基本信息 -->
              <dv-border-box-12 :color="borderColor" class="page-one-box-1">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.left.title1')
                }}</div>
                <div class="person-container">
                  <div class="person-slide" :style="personStyle">
                    <div class="person-item">
                      <div>
                        <div class="person-item-label">组长</div>
                        <div class="person-item-value">{{
                          leaderInfo.zzName
                        }}</div>
                      </div>
                      <div>
                        <div class="person-item-label">联系电话</div>
                        <div class="person-item-value">{{
                          leaderInfo.zzPhone
                        }}</div>
                      </div>
                      <img :src="leaderInfo.zzImage" />
                    </div>
                    <div class="person-item">
                      <div>
                        <div class="person-item-label">部长</div>
                        <div class="person-item-value">{{
                          leaderInfo.bzName
                        }}</div>
                      </div>
                      <div>
                        <div class="person-item-label">联系电话</div>
                        <div class="person-item-value">{{
                          leaderInfo.bzPhone
                        }}</div>
                      </div>
                      <img :src="leaderInfo.bzImage" />
                    </div>
                    <div class="person-item">
                      <div>
                        <div class="person-item-label">经副理</div>
                        <div class="person-item-value">{{
                          leaderInfo.flName
                        }}</div>
                      </div>
                      <div>
                        <div class="person-item-label">联系电话</div>
                        <div class="person-item-value">{{
                          leaderInfo.flPhone
                        }}</div>
                      </div>
                      <img :src="leaderInfo.flImage" alt="" />
                    </div>
                  </div>
                </div>
              </dv-border-box-12>
              <!-- PPH -->
              <dv-border-box-12 :color="borderColor" class="page-one-box-3">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.left.title2')
                }}</div>
                <div class="box-content">
                  <div class="flex-row">
                    <div class="flex-1">
                      <div class="box-title">月实际PPH</div>
                      <div class="border-1 flex-center flex-item">
                        <a-statistic
                          :value="dayAndMonthPPHOption.monthPPH"
                          :value-from="0"
                          :precision="1"
                          class="pph-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="box-title">日实际PPH</div>
                      <div class="border-1 flex-center flex-item">
                        <a-statistic
                          :value="dayAndMonthPPHOption.dayPPH"
                          :value-from="0"
                          :precision="1"
                          class="pph-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-12>
            </a-col>
            <!-- 中间 -->
            <a-col :span="18" style="padding-left: 10px">
              <!-- 相关产量指标信息 -->
              <dv-border-box-12 :color="borderColor" class="page-one-box-4">
                <div class="production-box">
                  <div class="sub">
                    <a-statistic
                      title="产量日目标"
                      :value="productionInfo.workQty"
                      :value-from="0"
                      :value-style="{ color: '#ffffff' }"
                      class="production-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                    <div class="mark"></div>
                  </div>
                  <div class="sub">
                    <a-statistic
                      title="实际日产量"
                      :value="productionInfo.labelQty"
                      :value-from="0"
                      :value-style="{ color: '#0AF60A' }"
                      class="production-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                    <div class="mark"></div>
                  </div>
                  <div class="sub">
                    <a-statistic
                      title="生产达成率"
                      :value="productionInfo.percentRate"
                      :value-from="0"
                      :precision="1"
                      :value-style="{
                        color: productionAchievementRateColor,
                      }"
                      class="production-info"
                      animation
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <div class="mark"></div>
                  </div>
                  <div class="sub" style="margin-right: 0">
                    <a-statistic
                      title="日 RFT"
                      :value="productionInfo.rft"
                      :value-from="0"
                      :precision="1"
                      :value-style="{ color: dayRFTColor }"
                      class="production-info"
                      animation
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <div class="mark"></div>
                  </div>
                </div>
              </dv-border-box-12>
              <!-- 每小时生产达成率 -->
              <dv-border-box-12 :color="borderColor" class="page-one-box-5">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.center.title2')
                }}</div>
                <dv-scroll-board
                  :config="productionRate"
                  class="production-rate"
                />
              </dv-border-box-12>
            </a-col>
          </a-row>
        </template>
        <!-- 第二页 -->
        <template v-else-if="showPage === 2">
          <a-row class="container-row2" :gutter="24">
            <!-- 退货信息 -->
            <dv-border-box-12 :color="borderColor" class="page-two-box-0">
              <div style="height: 51.5px; display: flex">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.center.title4')
                }}</div>
                <div class="vertical-line" style="left: 1120px">{{
                  $t('ProcessLineDashboard.center.title5')
                }}</div>
              </div>
              <div class="page-two-box-1">
                <dv-scroll-board
                  ref="returnTotalRef"
                  :config="returnTotal"
                  class="quality-info"
                  style="width: 230px; height: 380px"
                />
                <dv-scroll-board
                  ref="returnDetailRef"
                  :config="returnDetail"
                  class="return-detail"
                />
                <dv-scroll-ranking-board
                  ref="returnRateRef"
                  :config="returnRateOption"
                  class="return-rate"
                />
              </div>
            </dv-border-box-12>
          </a-row>

          <a-row class="container-row2" :gutter="24">
            <!-- 左边 -->
            <a-col :span="16" class="padding-leftright-0">
              <!-- 品质管理 -->
              <dv-border-box-12 :color="borderColor" class="page-two-box-3">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.center.title3')
                }}</div>
                <dv-scroll-board
                  ref="qualityRef"
                  :config="qualityManagement"
                  style="width: 100%; height: 380px"
                  class="quality-info"
                />
              </dv-border-box-12>
            </a-col>
            <!-- 右边 -->
            <a-col :span="8" style="padding-left: 10px">
              <!--组别人员-->
              <dv-border-box-12 :color="borderColor" class="page-two-box-4">
                <div class="vertical-line">{{
                  $t('ProcessLineDashboard.right.title1')
                }}</div>
                <div class="member-container">
                  <VCharts
                    :option="skillWorkerOption"
                    autoresize
                    style="width: 100%; height: 195px"
                  ></VCharts>
                  <VCharts
                    :option="multiWorkerption"
                    autoresize
                    style="width: 100%; height: 195px"
                  ></VCharts>
                  <VCharts
                    :option="normalWorkerOption"
                    autoresize
                    style="width: 100%; height: 195px"
                  ></VCharts>
                  <VCharts
                    :option="waterSpiderOption"
                    autoresize
                    style="width: 100%; height: 195px"
                  ></VCharts>
                </div>
              </dv-border-box-12>
            </a-col>
          </a-row>
        </template>
        <!-- 第三页 -->
        <template v-else-if="showPage === 3">
          <a-row class="container-row" :gutter="24">
            <dv-border-box-12 :color="borderColor" class="page-three-box-0">
              <div class="vertical-line">{{ currentOrgName }}面底排单信息</div>
              <div class="data-box">
                <div class="data1">
                  <div class="qiu bg1">
                    <a-statistic
                      :value="factoryAreaOrderOption.workQty"
                      :value-from="0"
                      class="order-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                  </div>
                  <div class="title">目标量</div>
                </div>
                <div class="data1">
                  <div class="qiu bg2">
                    <a-statistic
                      :value="factoryAreaOrderOption.scheduleQty"
                      :value-from="0"
                      class="order-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                  </div>
                  <div class="title">排单量</div>
                </div>
                <div class="data1">
                  <div class="qiu bg3">
                    <a-statistic
                      :value="factoryAreaOrderOption.orderRate"
                      :value-from="0"
                      :value-style="{ color: orderRateColor }"
                      class="order-info"
                      animation
                      show-group-separator
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                  </div>
                  <div class="title">排单达成率</div>
                </div>
                <div class="data1">
                  <div class="qiu bg4">
                    <a-statistic
                      :value="factoryAreaOrderOption.moveQty"
                      :value-from="0"
                      class="order-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                  </div>
                  <div class="title">面底已发料数</div>
                </div>
                <div class="data1">
                  <div class="qiu bg4">
                    <a-statistic
                      :value="factoryAreaOrderOption.stocQty"
                      :value-from="0"
                      class="order-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                  </div>
                  <div class="title">面底库存数</div>
                </div>
                <div class="data1">
                  <div class="qiu bg5">
                    <a-statistic
                      :value="factoryAreaOrderOption.nextScheduleQty"
                      :value-from="0"
                      class="order-info"
                      animation
                      show-group-separator
                    >
                    </a-statistic>
                  </div>
                  <div class="title">下日排单数</div>
                </div>
              </div>
            </dv-border-box-12>
            <dv-border-box-12 :color="borderColor" class="page-three-box-1">
              <div class="vertical-line"
                >{{ currentOrgName }}加工线排单信息</div
              >
              <dv-scroll-board
                :config="factoryAreaOrderInfo"
                class="table-info1"
                style="width: 100%; height: 120px"
              />
              <dv-scroll-board
                ref="factoryAreaOrderRef2"
                :config="factoryAreaOrderInfo2"
                :class="factoryAreaOrderInfoClass2"
                style="width: 100%; height: 410px"
              />
            </dv-border-box-12>
          </a-row>
        </template>
        <!-- 第四页 -->
        <template v-else-if="showPage === 4">
          <a-row class="container-row" :gutter="24">
            <a-col :span="17" class="padding-leftright-0">
              <dv-border-box-12 :color="borderColor" class="page-four-box-1">
                <div class="vertical-line">组别配套排单订单</div>
                <dv-scroll-board
                  ref="lineOrderInfoRef"
                  :config="lineOrderInfo"
                  :class="lineOrderInfoClass"
                  style="width: 100%; height: 405px"
                  @click="handleClickLine"
                />
              </dv-border-box-12>
              <dv-border-box-12 :color="borderColor" class="page-four-box-2">
                <div class="vertical-line">订单尺码排单明细</div>
                <dv-scroll-board
                  ref="sizeOrderInfoRef"
                  :config="sizeOrderInfo"
                  :class="sizeOrderInfoClass"
                  style="width: 100%; height: 355px"
                />
              </dv-border-box-12>
            </a-col>
            <a-col :span="7" style="padding-left: 10px">
              <dv-border-box-12 :color="borderColor" class="page-four-box-3">
                <div class="vertical-line">{{ shoeTypeName }}</div>
                <img :src="shoeImageUrl" />
              </dv-border-box-12>
            </a-col>
          </a-row>
        </template>
      </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import Header from '@/components/header/index.vue';
  import { ref, onMounted, reactive, onBeforeUnmount, nextTick } from 'vue';
  import defaultSettings from '@/config/settings.json';
  import VCharts from 'vue-echarts';
  import VScaleScreen from 'v-scale-screen';
  import NoPersonIcon from '@/assets/images/no_person.png';
  import {
    LoadDepartment,
    LoadDeptGroup,
    getEmployeeLeader,
    getProductionLineInfo,
    getHourProductionInfo,
    getGroupMembers,
    getPPH,
    queryReturnInfo,
    getQualityManagement,
    GetScheduleInfo,
    GetLineScheduleInfo,
    GetLineOrderInfo,
    GetSizeOrderInfo,
  } from '@/api/ProcessLineDashboard';
  import { getStringLen, pushEmptyRow } from '@/utils/util';
  import { isNullOrEmptyStr } from '@/utils/is';
  import { formatNowDate, addDays } from '@/utils/date';

  // 顶部-标题
  const pageTitle = ref<any>('加工线生产看板');
  // 顶部-生产组别
  const productionGroupOptions = ref<any>([]);
  const productionGroup = ref<any>('');
  const errorMsg = ref<any>('');
  // 第一页-左边-部门领导信息
  const leaderInfo = ref<any>({});
  const personStyle = ref({ transform: 'translateX(0)' });
  let personIndex = 0;
  // 第一页-右边-产量信息
  const productionInfo = ref<any>({});
  const productionAchievementRateColor = ref<any>('#FD2104');
  const dayRFTColor = ref<any>('#FD2104');
  // 第一页-右边-每小时生产达成率
  const productionRate = ref<any>({});
  // 第一页-左边-PPH
  const dayAndMonthPPHOption = ref<any>({ monthPPH: 0, dayPPH: 0 });
  // 第二页-左边-当日前五大不良原因
  const qualityManagement = ref<any>({});
  // 第二页-左边-退货总数
  const returnTotal = ref<any>({});
  // 第二页-左边-退货明细
  const returnDetail = ref<any>({});
  // 第二页-左边-退货占比
  const returnRateOption = ref<any>({});
  // 第二页-右边-组别人员
  const skillWorkerOption = ref<any>({});
  const waterSpiderOption = ref<any>({});
  const multiWorkerption = ref<any>({});
  const normalWorkerOption = ref<any>({});
  // 第三页-顶部-厂区配套排单信息
  const currentOrgCode = ref<string>('');
  const currentOrgName = ref<string>('');
  const factoryAreaOrderOption = ref<any>({
    workQty: 0,
    scheduleQty: 0,
    orderRate: 0,
    moveQty: 0,
    stocQty: 0,
    nextScheduleQty: 0,
  });
  const orderRateColor = ref<any>('#FD2104');
  // 第三页-底部-厂区加工线排单信息
  const factoryAreaOrderInfo = ref<any>({});
  const factoryAreaOrderInfo2 = ref<any>({});
  const factoryAreaOrderInfoClass2 = ref<any>(['table-info2']);
  let nextWorkDay = addDays(1, 'MM/dd');
  // 第四页-顶部-组别配套排单订单
  const lineOrderInfo = ref<any>({});
  const lineOrderInfoClass = ref<any>(['table-info']);
  // 第四页-底部-订单尺码排单明细
  const sizeOrderInfo = ref<any>({});
  const sizeOrderInfoClass = ref<any>(['table-info']);
  const shoeTypeName = ref<any>('');
  const shoeImageUrl = ref<any>('');
  let currentRowIndex = 0;
  let rowCount = 0;
  // 刷新数据定时器
  let kanbanTimer: any = 0;
  let pageTimer: any = 0;
  let pictureTimer: any = 0;
  let idTimer: any = 0;
  let orderTimer: any = 0;
  let changeRowTimer: any = 0;
  // 刷新频率 5分钟
  const kanbanInterval = 5 * 60 * 1000;
  // 切换页面 1分钟
  const pageInterval1 = 1 * 60 * 1000;
  // 切换页面 4分钟
  const pageInterval2 = 4 * 60 * 1000;
  // 切换图片 5秒钟
  const pictureInterval = 5 * 1000;
  // 查询厂区配套排单信息频率 30秒
  const orderInterval = 30 * 1000;
  // 组别配套排单行切换频率 40秒
  const changeRowInterval = 40 * 1000;
  // 切换页面 1分钟
  let pageInterval = pageInterval1;
  // 查询参数
  const queryParam = { departmentCode: '' };
  // 显示第几页面
  const showPage = ref<number>(1);
  // 顶部-显示切换页面按钮
  const showPageBtn = ref<boolean>(false);
  const modelName = ref<any>('手动模式');
  // 边框颜色
  const borderColor = ref<any>(['#2E6099', '#0EE4F9']);

  const returnTotalRef = ref<InstanceType<any>>(null);
  const returnDetailRef = ref<InstanceType<any>>(null);
  const returnRateRef = ref<InstanceType<any>>(null);
  const qualityRef = ref<InstanceType<any>>(null);
  const factoryAreaOrderRef2 = ref<InstanceType<any>>(null);
  const lineOrderInfoRef = ref<InstanceType<any>>(null);
  const sizeOrderInfoRef = ref<InstanceType<any>>(null);

  // 公共-取消定时加载数据
  function cancelLoadData() {
    if (kanbanTimer) {
      clearInterval(kanbanTimer);
      kanbanTimer = 0;
    }
  }

  // 公共-取消定时查询厂区配套排单信息
  function cancelOrderTimer() {
    if (orderTimer) {
      clearTimeout(orderTimer);
      orderTimer = 0;
    }
  }

  // 公共-取消定时组别配套排单行切换
  function cancelChangeRowTimer() {
    if (changeRowTimer) {
      clearTimeout(changeRowTimer);
      changeRowTimer = 0;
    }
  }

  // 公共-取消定时切换页面
  function cancelChangePage() {
    if (pageTimer) {
      clearTimeout(pageTimer);
      pageTimer = 0;
    }
    if (idTimer) {
      clearTimeout(idTimer);
      idTimer = 0;
    }
  }

  // 公共-取消定时切换图片
  function cancelChangePicture() {
    if (pictureTimer) {
      clearInterval(pictureTimer);
      pictureTimer = 0;
    }
  }

  // 公共-设置ScrollBoard行颜色
  function setScrollBoardRowColor(
    scrollBoard: any,
    rowIndex: number,
    length: number
  ) {
    nextTick(() => {
      if (scrollBoard.value) {
        const rows = lineOrderInfoRef.value.$el.querySelectorAll('.row-item');
        if (rows) {
          rows.forEach((row: any, index: number) => {
            const dataIndexStr = row.getAttribute('data-index');
            if (isNullOrEmptyStr(dataIndexStr)) {
              return;
            }
            const dataIndex = parseInt(dataIndexStr, 10);
            if (dataIndex === rowIndex || rowIndex + length === dataIndex) {
              row.classList.add('highlight');
            } else {
              row.classList.remove('highlight');
            }
          });
        }
      }
    });
  }

  // 公共-设置ScrollBoard行号
  function setScrollBoardRowIndex(scrollBoard: any) {
    nextTick(() => {
      if (scrollBoard.value) {
        const container = scrollBoard.value.$el.querySelector('.rows');
        if (container) {
          const rows = container.children;
          Array.from(rows).forEach((row: any, index: number) => {
            row.setAttribute('data-index', index);
          });
        }
      }
    });
  }

  // 公共-停止定时器
  function stopInterval() {
    cancelChangePicture();
    cancelLoadData();
    cancelOrderTimer();
    cancelChangeRowTimer();
    cancelChangePage();
  }

  // 公共-判断当前时间在某个时间范围内
  function timeMoreThan(date: Date, startTimeStr: string) {
    // 解析传入的时间字符串HH:mm
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);
    const startTime = new Date();
    startTime.setDate(date.getDate());
    startTime.setHours(startHour, startMinute, 0, 0);
    return date >= startTime;
  }

  // 公共-判断字符串是否为null或者undefined
  function isNull(val: any) {
    return val === null || val === undefined;
  }

  // 第一页-左边-获取生产线基本信息
  // 第一页-左边-获取部门领导信息
  const getLeaderInfo = async () => {
    cancelChangePicture();
    leaderInfo.value = reactive({
      zzName: '',
      zzPhone: '',
      zzImage: '',
      bzName: '',
      bzPhone: '',
      bzImage: '',
      flName: '',
      flPhone: '',
      flImage: '',
    });
    const result = await getEmployeeLeader(queryParam);
    // console.log(result.data);
    let zzName = '';
    let bzName = '';
    let flName = '';
    let zzPhone = '';
    let bzPhone = '';
    let flPhone = '';
    let zzImage = NoPersonIcon;
    let bzImage = NoPersonIcon;
    let flImage = NoPersonIcon;
    if (result.data && result.data.length > 0) {
      const leader = result.data[0];
      const picUrl = defaultSettings.pic_url;
      zzName = isNull(leader.ZZ_NAME) ? '' : leader.ZZ_NAME.trim();
      bzName = isNull(leader.BZ_NAME) ? '' : leader.BZ_NAME.trim();
      flName = isNull(leader.FL_NAME) ? '' : leader.FL_NAME.trim();
      zzPhone = isNull(leader.ZZ_PHONE) ? '' : leader.ZZ_PHONE.trim();
      bzPhone = isNull(leader.BZ_PHONE) ? '' : leader.BZ_PHONE.trim();
      flPhone = isNull(leader.FL_PHONE) ? '' : leader.FL_PHONE.trim();
      if (!isNull(leader.ZZ_IMAGE)) {
        zzImage = `${picUrl}${leader.ZZ_IMAGE}`;
      }
      if (!isNull(leader.BZ_IMAGE)) {
        bzImage = `${picUrl}${leader.BZ_IMAGE}`;
      }
      if (!isNull(leader.FL_IMAGE)) {
        flImage = `${picUrl}${leader.FL_IMAGE}`;
      }
    }
    leaderInfo.value.zzName = zzName;
    leaderInfo.value.zzPhone = zzPhone;
    leaderInfo.value.zzImage = zzImage;
    leaderInfo.value.bzName = bzName;
    leaderInfo.value.bzPhone = bzPhone;
    leaderInfo.value.bzImage = bzImage;
    leaderInfo.value.flName = flName;
    leaderInfo.value.flPhone = flPhone;
    leaderInfo.value.flImage = flImage;
    const slideWidth = 448;
    personIndex = 0;
    let transformX = -1 * personIndex * slideWidth;
    let side = 1;
    personStyle.value = { transform: `translateX(${transformX}px)` };
    pictureTimer = setInterval(() => {
      personIndex += side * 1;
      if (personIndex > 2) {
        personIndex = 1;
        side = -1;
      } else if (personIndex < 0) {
        personIndex = 1;
        side = 1;
      }
      transformX = -1 * personIndex * slideWidth;
      personStyle.value = { transform: `translateX(${transformX}px)` };
    }, pictureInterval);
  };

  // 第一页-右边-获取日产量达成率颜色
  function getRateColor(percentRate: any) {
    let color = '#FFFFFF';
    // 达成率＞90% 绿色字体，达成率60%~90% 黄色字体，达成率＜60% 红色字体
    if (percentRate > 90) {
      color = '#0AF60A';
    } else if (percentRate >= 60 && percentRate <= 90) {
      color = '#FFFF00';
    } else {
      color = '#FD2104';
    }
    return color;
  }

  // 第一页-右边-获取产量信息
  const getProductionInfo = async () => {
    productionInfo.value = reactive({
      workQty: 0,
      labelQty: 0,
      percentRate: 0,
      rft: 0,
    });
    const result = await getProductionLineInfo(queryParam);
    // console.log(result);
    if (result.data) {
      // 产量日目标:
      productionInfo.value.workQty = result.data.workQty;
      // 实际日产量
      productionInfo.value.labelQty = result.data.labelQty;
      // 生产达成率
      productionInfo.value.percentRate = result.data.percentRate;
      // 日rft
      productionInfo.value.rft = result.data.rft;
      // 日产量达成率颜色
      productionAchievementRateColor.value = getRateColor(
        result.data.percentRate
      );
      // dayRFTColor.value = result.data.rft >= 100 ? '#0AF60A' : '#FD2104';
      // 日rft颜色 2024-09-29 改成白色
      dayRFTColor.value = '#ffffff';
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
  };

  // 第一页-左边-获取PPH
  const getDayAndMonthPPH = async () => {
    const result = await getPPH(queryParam);
    // console.log(result);
    if (result.data) {
      dayAndMonthPPHOption.value.dayPPH = result.data.day_pph;
      dayAndMonthPPHOption.value.monthPPH = result.data.month_pph;
    }
  };

  // 顶部-生产组别
  const getProductionGroup = async () => {
    productionGroupOptions.value = [];
    const userDept = await LoadDepartment();
    if (!userDept.status) {
      errorMsg.value = userDept.msg;
      return;
    }
    // console.log(userDept);
    const result = await LoadDeptGroup();
    const options: any = [];
    if (result.data) {
      let title = '';
      result.data.forEach((item: any) => {
        options.push({
          value: item.DEPARTMENT_CODE,
          name: item.DEPARTMENT_NAME,
          orgCode: item.ORG_CODE,
          orgName: item.ORG_NAME,
        });
        if (userDept.data === item.DEPARTMENT_CODE) {
          currentOrgCode.value = item.ORG_CODE;
          currentOrgName.value = item.ORG_NAME;
          title = item.DEPARTMENT_NAME;
        }
      });
      productionGroupOptions.value = options;
      productionGroup.value = userDept.data;
      queryParam.departmentCode = userDept.data;
      if (title) {
        pageTitle.value = `${title}看板`;
      }
      loadData();
      timedChangePage();
    }
  };

  // 第一页-右边-获取每小时生产达成率
  productionRate.value = reactive({
    header: [
      '时间',
      '目标产量',
      '实际产量',
      'TQC不良数',
      'RFT%',
      '产量达成率%',
      '操作人时',
      'PPH',
      '停线时长',
    ],
    data: [],
    index: false,
    columnWidth: [215, 160, 160, 160, 135, 175, 140, 140, 140],
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
    rowNum: [10],
    indexHeader: ['序号'],
    waitTime: 3000000000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });

  // 第一页-右边-获取每小时生产达成率
  const getHourProductionRate = async () => {
    productionRate.value.data = [];
    const result = await getHourProductionInfo(queryParam);
    const data: any = [];
    if (result.data && result.data.length > 0) {
      result.data.forEach((item: any) => {
        let defaultColor = '#ffffff';
        let actualColor = '#0AF60A';
        let doneColor = getRateColor(item.completion_percentage);
        if (!timeMoreThan(new Date(), item.start)) {
          defaultColor = '#8A8785';
          actualColor = '#8A8785';
          doneColor = '#8A8785';
        }
        const times = `<span style="color:${defaultColor}">${item.start}~${item.end}</span>`;
        const targetOutput = `<span style="color:${defaultColor}">${item.target_output}</span>`;
        const actualOutput = `<span style="color:${actualColor}">${item.actual_output}</span>`;
        const defectiveQty = `<span style="color:${defaultColor}">${item.defective_qty}</span>`;
        const rft = `<span style="color:${defaultColor}">${item.rft}</span>`;
        const doneRate = `<span style="color:${doneColor}">${item.completion_percentage}</span>`;
        const operatorPersonHour = `<span style="color:${defaultColor}">${item.operator_person_hour}</span>`;
        const pph = `<span style="color:${defaultColor}">${item.pph}</span>`;
        const stopLineMinutes = `<span style="color:${defaultColor}">${item.stop_line_minutes}</span>`;
        data.push([
          times,
          targetOutput,
          actualOutput,
          defectiveQty,
          rft,
          doneRate,
          operatorPersonHour,
          pph,
          stopLineMinutes,
        ]);
      });
    }
    productionRate.value.data = data;
  };

  // 第二页-左边-获取品质管理-当日前五大不良原因
  qualityManagement.value = reactive({
    header: ['检验项目', '不良数', '不良占比%'],
    data: [],
    index: false,
    columnWidth: [770, 230, 230],
    align: ['center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 5000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 50,
  });
  // 第二页-左边-获取品质管理-当日前五大不良原因
  const getQualityManagements = async () => {
    qualityManagement.value.data = [];
    const fiveReasonData: any = [];
    const result = await getQualityManagement(queryParam);
    // console.log(result);
    if (result.data) {
      const fiveReasonsDefects = result.data.five_reasons_defects;
      if (fiveReasonsDefects && fiveReasonsDefects.length > 0) {
        let index = 1;
        fiveReasonsDefects.forEach((item: any) => {
          let name = item.INSPECTION_NAME;
          let num = item.NUM;
          let rate = item.RATE;
          if (index <= 3) {
            name = `<span style="color:#FD2104">${name}</span>`;
            num = `<span style="color:#FD2104">${num}</span>`;
            rate = `<span style="color:#FD2104">${rate}</span>`;
          }
          fiveReasonData.push([name, num, rate]);
          index += 1;
        });
        if (qualityRef.value) {
          // 此处可以传第二个参数 index，指定下次滚动的起始行
          qualityRef.value.updateRows(fiveReasonData[0], 0);
        }
      }
    }
    pushEmptyRow(fiveReasonData, 5, 3);
    qualityManagement.value.data = fiveReasonData;
  };

  // 第二页-左边-退货总数
  returnTotal.value = reactive({
    header: ['月份', '退货总数'],
    data: [],
    index: false,
    columnWidth: [80, 150],
    align: ['center', 'center'],
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 5000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 50,
  });
  // 第二页-左边-退货总数
  function getReturnTotalInfo(datas: any) {
    const returnTotalDatas: any = [];
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach((item: any) => {
        returnTotalDatas.push([item.month, `${item.total}双`]);
      });
      if (returnTotalRef.value) {
        // 此处可以传第二个参数 index，指定下次滚动的起始行
        returnTotalRef.value.updateRows(returnTotalDatas[0], 0);
      }
    }
    pushEmptyRow(returnTotalDatas, 5, 2);
    returnTotal.value.data = returnTotalDatas;
  }

  // 第二页-左边-退货明细
  returnDetail.value = reactive({
    header: ['月份', '退货原因', '退货数', '退货占比%'],
    data: [],
    index: false,
    columnWidth: [80, 665, 130, 165],
    align: ['center', 'center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 5000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 50,
  });
  // 第二页-左边-退货明细
  function getReturnDetailInfo(datas: any) {
    const returnDetailDatas: any = [];
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach((item: any) => {
        const len = getStringLen(
          34,
          'Microsoft YaHei',
          item.PROBLEM_POINT_DESC
        );
        let desc = item.PROBLEM_POINT_DESC;
        if (len > 634) {
          desc = `<span class="move-left">${item.PROBLEM_POINT_DESC}</span><span class="move-right">${item.PROBLEM_POINT_DESC}</span>`;
        }
        returnDetailDatas.push([item.MONTH, desc, item.TOTAL, item.RATE]);
      });
      if (returnDetailRef.value) {
        // 此处可以传第二个参数 index，指定下次滚动的起始行
        returnDetailRef.value.updateRows(returnDetailDatas[0], 0);
      }
    }
    pushEmptyRow(returnDetailDatas, 5, 4);
    returnDetail.value.data = returnDetailDatas;
  }

  // 第二页-右边-退货占比
  returnRateOption.value = reactive({
    data: [],
    rowNum: [4],
    waitTime: 5000,
    fontSize: 28,
    color: '#0272FC',
    unit: '%',
  });

  // 第二页-左边-退货占比
  function getReturnRateInfo(datas: any) {
    const returnRateDatas: any = [];
    if (Array.isArray(datas) && datas.length > 0) {
      datas.forEach((item: any) => {
        const len = getStringLen(
          28,
          'Microsoft YaHei',
          item.PROBLEM_POINT_DESC
        );
        let desc = item.PROBLEM_POINT_DESC;
        if (len > 482) {
          desc = `<span class="marquee-left">${item.PROBLEM_POINT_DESC}</span><span class="marquee-right">${item.PROBLEM_POINT_DESC}</span>`;
        }
        returnRateDatas.push({
          name: desc,
          value: item.RATE,
        });
      });
    }
    returnRateOption.value.data = returnRateDatas;
  }

  // 第二页-左边-获取退货信息
  const getReturnInfo = async () => {
    returnTotal.value.data = [];
    returnDetail.value.data = [];
    returnRateOption.value.data = [];
    const result = await queryReturnInfo(queryParam);
    if (result.data) {
      getReturnTotalInfo(result.data.left);
      getReturnDetailInfo(result.data.middle);
      getReturnRateInfo(result.data.right);
    }
  };

  // 第二页-右边-获取组别人员
  // 第二页-右边-获取组别人员-技能工
  skillWorkerOption.value = reactive({
    color: ['#FAC858', '#E9E9E9'],
    title: [
      {
        text: '',
        top: '30%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 40,
        },
      },
      {
        text: '技能工',
        top: '51%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 32,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        selectedMode: 'single',
        selectedOffset: 5,
        data: [],
      },
    ],
  });
  // 第二页-右边-获取组别人员-多能工
  multiWorkerption.value = reactive({
    color: ['#91CC75', '#E9E9E9'],
    title: [
      {
        text: '',
        top: '30%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 40,
        },
      },
      {
        text: '多能工',
        top: '51%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 32,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        selectedMode: 'single',
        selectedOffset: 5,
        data: [],
      },
    ],
  });
  // 第二页-右边-获取组别人员-普通工
  normalWorkerOption.value = reactive({
    color: ['#B8B8EA', '#E9E9E9'],
    title: [
      {
        text: '',
        top: '30%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 40,
        },
      },
      {
        text: '普通工',
        top: '51%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 32,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        selectedMode: 'single',
        selectedOffset: 5,
        data: [],
      },
    ],
  });
  // 第二页-右边-获取组别人员-水蜘蛛
  waterSpiderOption.value = reactive({
    color: ['#3491FA', '#E9E9E9'],
    title: [
      {
        text: '',
        top: '30%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 40,
        },
      },
      {
        text: '水蜘蛛',
        top: '51%',
        textAlign: 'center',
        left: '48%',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 32,
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        selectedMode: 'single',
        selectedOffset: 5,
        data: [],
      },
    ],
  });
  // 第二页-右边-获取组别人员
  const getGroupMemberInfo = async () => {
    skillWorkerOption.value.title[0].text = '0';
    skillWorkerOption.value.series[0].data = [];
    multiWorkerption.value.title[0].text = '0';
    multiWorkerption.value.series[0].data = [];
    normalWorkerOption.value.title[0].text = '0';
    normalWorkerOption.value.series[0].data = [];
    waterSpiderOption.value.title[0].text = '0';
    waterSpiderOption.value.series[0].data = [];
    const result = await getGroupMembers(queryParam);
    // console.log(result);
    if (result.data) {
      const {
        multiSkillCount,
        noSkillCount,
        singleSkillCount,
        waterSpiderCount,
      } = result.data;
      const totalNum =
        singleSkillCount + multiSkillCount + waterSpiderCount + noSkillCount;
      // 技能工
      const skillWorkerdata: any = [];
      skillWorkerdata.push({ name: '技能工', value: singleSkillCount });
      skillWorkerdata.push({
        name: '其他',
        value: totalNum - singleSkillCount,
      });
      skillWorkerOption.value.title[0].text = `${singleSkillCount}`;
      skillWorkerOption.value.series[0].data = skillWorkerdata;
      // 多能工
      const multiWorkerdata: any = [];
      multiWorkerdata.push({ name: '多能工', value: multiSkillCount });
      multiWorkerdata.push({ name: '其他', value: totalNum - multiSkillCount });
      multiWorkerption.value.title[0].text = `${multiSkillCount}`;
      multiWorkerption.value.series[0].data = multiWorkerdata;
      // 普通工
      const normalWorkerdata: any = [];
      normalWorkerdata.push({ name: '普通工', value: noSkillCount });
      normalWorkerdata.push({ name: '其他', value: totalNum - noSkillCount });
      normalWorkerOption.value.title[0].text = `${noSkillCount}`;
      normalWorkerOption.value.series[0].data = normalWorkerdata;
      // 水蜘蛛
      const waterSpiderdata: any = [];
      waterSpiderdata.push({ name: '水蜘蛛', value: waterSpiderCount });
      waterSpiderdata.push({
        name: '其他',
        value: totalNum - waterSpiderCount,
      });
      waterSpiderOption.value.title[0].text = `${waterSpiderCount}`;
      waterSpiderOption.value.series[0].data = waterSpiderdata;
    }
  };

  // 第三页-顶部-厂区排单信息
  const queryFactoryAreaOrderOption = async () => {
    // 达成率＞90% 绿色，达成率60%~90% 黄色，达成率＜60% 红色
    factoryAreaOrderOption.value.workQty = 0;
    factoryAreaOrderOption.value.scheduleQty = 0;
    factoryAreaOrderOption.value.orderRate = 0;
    factoryAreaOrderOption.value.moveQty = 0;
    factoryAreaOrderOption.value.stocQty = 0;
    factoryAreaOrderOption.value.nextScheduleQty = 0;
    const result = await GetScheduleInfo(currentOrgCode.value);
    if (result.data && result.data.length > 0) {
      factoryAreaOrderOption.value.workQty = result.data[0].WORK_QTY;
      factoryAreaOrderOption.value.scheduleQty = result.data[0].SCHEDULE_QTY;
      factoryAreaOrderOption.value.orderRate = result.data[0].ORDER_RATE;
      factoryAreaOrderOption.value.moveQty = result.data[0].MOVE_QTY;
      factoryAreaOrderOption.value.stocQty = result.data[0].STOC_QTY;
      factoryAreaOrderOption.value.nextScheduleQty =
        result.data[0].NEXT_SCHEDULE_QTY;
      orderRateColor.value = getRateColor(result.data[0].ORDER_RATE);
    }
  };

  // 第三页-顶部-定时厂区排单信息
  function getFactoryAreaOrderOption() {
    queryFactoryAreaOrderOption();
    orderTimer = setTimeout(getFactoryAreaOrderOption, orderInterval);
  }

  // 第三页-底部-厂区加工线排单信息
  factoryAreaOrderInfo.value = reactive({
    header: [
      '加工组别',
      '目标量',
      '面底配套排单数',
      '排单达成率',
      '面底已发料数',
      '仓库配套库存数',
      `<div><div>下一日目标量</div><div>(${nextWorkDay})</div></div>`,
      `<div><div>下一日排单数</div><div>(${nextWorkDay})</div></div>`,
    ],
    data: [],
    index: false,
    columnWidth: [310, 220, 220, 210, 220, 220, 220, 220],
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
    rowNum: [1],
    indexHeader: ['序号'],
    waitTime: 5000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 70,
  });
  factoryAreaOrderInfo2.value = reactive({
    data: [],
    index: false,
    columnWidth: [310, 220, 220, 210, 220, 220, 220, 220],
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
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 5000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 70,
  });
  // 第三页-底部-厂区加工线排单信息
  const getFactoryAreaOrderInfo = async (isRrefesh: boolean) => {
    let datas1: any = [];
    let datas2: any = [];
    if (isRrefesh) {
      const result = await GetLineScheduleInfo(
        productionGroup.value,
        currentOrgCode.value
      );
      if (result.data) {
        nextWorkDay = result.data.next_work_day;
        if (result.data.dt1.length > 0) {
          const row = result.data.dt1[0];
          const color = getRateColor(row.ORDER_RATE);
          datas1.push([
            row.DEPT_NAME,
            row.WORK_QTY,
            row.SCHEDULE_QTY,
            `<span style="color:${color}">${row.ORDER_RATE}%</span>`,
            row.MOVE_QTY,
            row.STOC_QTY,
            row.NEXT_WORK_QTY,
            row.NEXT_SCHEDULE_QTY,
          ]);
        }
        if (result.data.dt2.length > 0) {
          result.data.dt2.forEach((row: any) => {
            const color = getRateColor(row.ORDER_RATE);
            datas2.push([
              row.DEPT_NAME,
              row.WORK_QTY,
              row.SCHEDULE_QTY,
              `<span style="color:${color}">${row.ORDER_RATE}%</span>`,
              row.MOVE_QTY,
              row.STOC_QTY,
              row.NEXT_WORK_QTY,
              row.NEXT_SCHEDULE_QTY,
            ]);
          });
        }
      }
    } else {
      datas1 = [...factoryAreaOrderInfo.value.data];
      datas2 = [...factoryAreaOrderInfo2.value.data];
    }
    if (datas2.length > 0 && factoryAreaOrderRef2.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      factoryAreaOrderRef2.value.updateRows(datas2[0], 0);
    }
    let rowNum = 7;
    if (showPageBtn.value && datas2.length > rowNum) {
      rowNum = datas2.length;
      factoryAreaOrderInfoClass2.value = ['table-info2', 'scroll-board-info3'];
    } else {
      factoryAreaOrderInfoClass2.value = ['table-info2'];
    }
    pushEmptyRow(datas2, rowNum, 8);
    factoryAreaOrderInfo2.value.rowNum = [rowNum];
    factoryAreaOrderInfo.value.data = [];
    factoryAreaOrderInfo2.value.data = [];
    setTimeout(() => {
      factoryAreaOrderInfo.value.data = datas1;
      factoryAreaOrderInfo2.value.data = datas2;
    }, 10);
  };

  // 第四页-顶部-组别配套排单订单
  lineOrderInfo.value = reactive({
    header: [
      '排单生产日期',
      'PO',
      'ART',
      '楦头编号',
      '排单数',
      '面底发料数',
      '实际生产数',
      '未生产数',
    ],
    data: [],
    index: false,
    columnWidth: [180, 270, 140, 165, 130, 150, 150, 130],
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
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: changeRowInterval,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 55,
  });

  // 第三页-顶部-组别配套排单表格切换行颜色
  function timeChangeRowColor() {
    if (currentRowIndex >= rowCount) {
      currentRowIndex = 0;
    }
    setScrollBoardRowColor(lineOrderInfoRef, currentRowIndex, rowCount);
    getSizeOrderInfo(true);
    if (!showPageBtn.value && rowCount > 1) {
      currentRowIndex += 1;
      changeRowTimer = setTimeout(timeChangeRowColor, changeRowInterval);
    }
  }

  // 第三页-顶部-组别配套排单订单
  const getLineOrderInfo = async (isRrefesh: boolean) => {
    let datas: any = [];
    if (isRrefesh) {
      const result = await GetLineOrderInfo(productionGroup.value);
      if (result.data && result.data.length > 0) {
        result.data.forEach((row: any) => {
          datas.push([
            row.ORDER_SCHEDULE_DATE,
            row.PO,
            row.ART_NO,
            row.LAST_NAME,
            row.SCHEDULE_QTY,
            row.MOVE_QTY,
            row.FINISHED_QTY,
            row.NOT_FINISHED_QTY,
          ]);
        });
        rowCount = result.data.length;
      }
    } else {
      datas = [...lineOrderInfo.value.data];
    }
    if (datas.length > 0 && lineOrderInfoRef.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      lineOrderInfoRef.value.updateRows(datas[0], 0);
    }
    let rowNum = 5;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      lineOrderInfoClass.value = ['table-info', 'scroll-board-info3'];
    } else {
      lineOrderInfoClass.value = ['table-info'];
    }
    pushEmptyRow(datas, rowNum, 8);
    lineOrderInfo.value.rowNum = [rowNum];
    lineOrderInfo.value.data = [];
    setTimeout(() => {
      lineOrderInfo.value.data = datas;
      if (rowCount > 0) {
        setScrollBoardRowIndex(lineOrderInfoRef);
        if (!showPageBtn.value) {
          currentRowIndex = 0;
        }
        timeChangeRowColor();
      }
    }, 10);
  };

  // 第四页-底部-尺码排单明细
  sizeOrderInfo.value = reactive({
    header: [
      '排单生产尺码',
      '尺码排单数',
      '面底发料数',
      '实际生产数',
      '实际生产进度',
    ],
    data: [],
    index: false,
    columnWidth: [240, 255, 255, 255, 305],
    align: ['center', 'center', 'center', 'center', 'center'],
    rowNum: [4],
    indexHeader: ['序号'],
    waitTime: 5000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 55,
  });

  const createProgressBar = (value: number) => {
    const FULL_COLOR = '#09C4CA';
    const EMPTY_COLOR = '#8F95B2';
    // 计算进度条状态
    function getBarStatus() {
      const minValue = Math.min(100, Math.max(0, value));
      return {
        fullBars: Math.floor(minValue / 10),
        partialPercent: (minValue % 10) * 10,
      };
    }

    // 获取单个进度条样式
    function getBarStyle(index: number) {
      const barStatus = getBarStatus();
      if (index < barStatus.fullBars) {
        return FULL_COLOR;
      }
      if (index === barStatus.fullBars && barStatus.partialPercent > 0) {
        return `linear-gradient(90deg,${FULL_COLOR} ${barStatus.partialPercent}%,${EMPTY_COLOR} ${barStatus.partialPercent}%)`;
      }
      return EMPTY_COLOR;
    }

    return `<div class="progress-container""><div class="progress-bars" data-value="${value}">
      ${Array(10)
        .fill(0)
        .map(
          (item, i) =>
            `<div class="progress-bar" style="
            background:${getBarStyle(i)}" data-index="${i}"></div>`
        )
        .join('')}
    </div><div>${value}%</div></div>`;
  };

  // 第四页-底部-尺码排单明细
  async function getSizeOrderInfo(isRrefesh: boolean) {
    let datas: any = [];
    if (isRrefesh) {
      if (lineOrderInfo.value.data.length > 0) {
        const row = lineOrderInfo.value.data[currentRowIndex];
        const result = await GetSizeOrderInfo(
          productionGroup.value,
          row[0],
          row[1],
          row[2]
        );
        // console.log(result);
        if (result.data) {
          shoeTypeName.value = result.data.shoe_name;
          shoeImageUrl.value = defaultSettings.pic_url + result.data.file_url;
          result.data.dt.forEach((item: any) => {
            datas.push([
              item.SPEC_SIZE,
              item.SCHEDULE_QTY,
              item.MOVE_QTY,
              item.FINISHED_QTY,
              createProgressBar(item.PROCESS),
            ]);
          });
        }
      }
    } else {
      datas = [...sizeOrderInfo.value.data];
    }
    if (datas.length > 0 && sizeOrderInfoRef.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      sizeOrderInfoRef.value.updateRows(datas[0], 0);
    }
    let rowNum = 4;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      sizeOrderInfoClass.value = ['table-info', 'scroll-board-info3'];
    } else {
      sizeOrderInfoClass.value = ['table-info'];
    }
    pushEmptyRow(datas, rowNum, 8);
    sizeOrderInfo.value.rowNum = [rowNum];
    sizeOrderInfo.value.data = [];
    setTimeout(() => {
      sizeOrderInfo.value.data = datas;
    }, 10);
  }

  // 定时加载数据
  function timedLoadData() {
    if (showPageBtn.value) {
      kanbanTimer = setInterval(() => {
        if (showPage.value === 1) {
          getLeaderInfo();
          getProductionInfo();
          getDayAndMonthPPH();
          getHourProductionRate();
        } else if (showPage.value === 2) {
          getQualityManagements();
          getReturnInfo();
          getGroupMemberInfo();
        } else if (showPage.value === 3) {
          getFactoryAreaOrderOption();
          getFactoryAreaOrderInfo(true);
        } else if (showPage.value === 4) {
          getLineOrderInfo(true);
        }
      }, kanbanInterval);
    }
  }

  // 加载数据
  function loadData() {
    if (showPage.value === 1) {
      getLeaderInfo();
      getProductionInfo();
      getDayAndMonthPPH();
      getHourProductionRate();
    } else if (showPage.value === 2) {
      getQualityManagements();
      getReturnInfo();
      getGroupMemberInfo();
    } else if (showPage.value === 3) {
      getFactoryAreaOrderOption();
      getFactoryAreaOrderInfo(true);
    } else if (showPage.value === 4) {
      getLineOrderInfo(true);
    }
    // timedLoadData();
  }

  // 刷新数据
  function refreshData() {
    errorMsg.value = '';
    currentRowIndex = 0;
    cancelChangePicture();
    cancelOrderTimer();
    cancelChangeRowTimer();
    cancelLoadData();
    loadData();
  }

  // 顶部-2-改变切换页面频率
  function changePageInterval(pageIndex: number) {
    if (pageIndex === 4) {
      pageInterval = pageInterval2;
    } else {
      pageInterval = pageInterval1;
    }
  }

  // 顶部-2-获取上个页面
  function getPrevPage() {
    let index = 1;
    if (showPage.value <= 1) {
      index = 4;
    } else {
      index = showPage.value - 1;
    }
    changePageInterval(index);
    return index;
  }

  // 顶部-2-切换上一个页面
  function handlePrevPage() {
    showPage.value = getPrevPage();
    refreshData();
  }

  // 顶部-2-获取上个页面
  function getNextPage() {
    let index = 1;
    if (showPage.value >= 4) {
      index = 1;
    } else {
      index = showPage.value + 1;
    }
    changePageInterval(index);
    return index;
  }

  // 顶部-2-切换下一个页面
  function handleNextPage() {
    showPage.value = getNextPage();
    refreshData();
  }

  function repeatLater(fn: any, delay: number) {
    function loop() {
      fn();
      if (pageInterval > 0) {
        pageTimer = setTimeout(loop, pageInterval);
      }
    }
    idTimer = setTimeout(loop, delay);
  }

  // 顶部-2-定时切换页面
  function timedChangePage() {
    changePageInterval(showPage.value);
    repeatLater(handleNextPage, pageInterval);
  }

  // 顶部-2-停止滚动
  function handleStop() {
    showPageBtn.value = !showPageBtn.value;
    if (showPageBtn.value) {
      modelName.value = '自动模式';
      // 取消定时切换页面
      cancelChangePage();
      // 定时刷新数据
      // timedLoadData();
    } else {
      modelName.value = '手动模式';
      // 定时切换页面
      timedChangePage();
      // 取消定时刷新数据
      // cancelLoadData();
    }
    // 停止或者恢复页面滚动
    if (showPage.value === 1) {
      // 不需要处理
    } else if (showPage.value === 2) {
      //  第二页
    } else if (showPage.value === 3) {
      if (showPageBtn.value) {
        cancelOrderTimer();
      } else {
        getFactoryAreaOrderOption();
      }
      getFactoryAreaOrderInfo(false);
    } else if (showPage.value === 4) {
      if (showPageBtn.value) {
        cancelChangeRowTimer();
      }
      getLineOrderInfo(false);
      // getSizeOrderInfo(false);
    }
  }

  // 第三页-顶部-组别配套排单订单行点击事件
  function handleClickLine(val: any) {
    if (showPageBtn.value) {
      currentRowIndex = val.rowIndex;
      timeChangeRowColor();
    }
  }

  // 组件事件
  // 中间-生产组别选择事件
  function handleChangeProGroup(val: any) {
    queryParam.departmentCode = productionGroup.value;
    const obj = productionGroupOptions.value.find((item: any) => {
      return item.value === productionGroup.value;
    });
    currentOrgCode.value = obj.orgCode;
    currentOrgName.value = obj.orgName;
    pageTitle.value = `${obj.name}看板`;
    errorMsg.value = '';
    refreshData();
  }

  onMounted(() => {
    getProductionGroup();
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
    top: 125px;
    width: 1920px;
    height: 985px;
    background-color: black;
    padding-left: 11px;
    padding-right: 15px;
  }

  .container-row {
    height: 985px;
    padding: 0 !important;
    margin: 0 !important;
  }

  .container-row2 {
    height: 462px;
    padding: 0 !important;
    margin: 0 0 15px 0 !important;
  }

  :deep(.header-center-decoration) {
    margin-top: 36px !important;
  }

  :deep(.header-left-decoration) {
    margin-top: 15px !important;
  }

  :deep(.header-right-decoration) {
    margin-top: 15px !important;
  }

  :deep(.hd-right-time) {
    font-size: 30px !important;
  }

  .flex-1 {
    flex: 1;
  }

  .vertical-line {
    position: relative;
    padding-left: 12px;
    margin-bottom: 15px;
    color: #0ee4f9;
    font-size: 32px;
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

  .padding-15 {
    padding: 15px;
  }

  .padding-leftright-0 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .page-one-box-1 {
    margin-bottom: 15px;
    width: 476px;
    height: 558px;
    padding: 15px;
  }

  .page-one-box-2 {
    margin-bottom: 15px;
    width: 476px;
    height: 335px;
    padding: 15px;
    :deep(.dv-digital-flop) {
      height: 60px !important;
    }

    :deep(.active-ring-name) {
      height: 36px !important;
    }
  }

  .page-one-box-3 {
    margin-bottom: 15px;
    width: 476px;
    height: 370px;
    padding: 15px;
    .box-content {
      height: 285px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .box-title {
      color: #0bf8fe;
      font-size: 36px;
      text-align: center;
      margin-bottom: 18px;
    }

    .border-1 {
      width: 200px;
      height: 200px;
      background: url(@/assets/images/circle1.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .page-one-box-4 {
    margin-bottom: 15px;
    width: 1408px;
    height: 208px;
    padding: 15px;
  }

  .page-one-box-5 {
    margin-bottom: 15px;
    width: 1408px;
    height: 720px;
    padding: 15px;
  }

  .page-two-box-0 {
    width: 1898px;
    height: 465px;
    padding: 15px;
  }

  .page-two-box-1 {
    display: flex;
  }

  .page-two-box-2 {
    width: 625px;
    height: 465px;
    padding: 15px 15px 15px 0;
  }

  .page-two-box-3 {
    width: 1263px;
    height: 465px;
    padding: 15px;
  }

  .page-two-box-4 {
    width: 626px;
    height: 465px;
    padding: 15px;
  }

  .page-three-box-0 {
    // margin-bottom: 15px;
    width: 1898px;
    height: 315px;
    padding: 15px;

    .data-box {
      margin-top: 25px;
      display: flex;
      justify-content: space-evenly;

      .data1 {
        color: #fff;
        text-align: center;
        width: 220px;
        height: 220px;
        background: url(@/assets/images/di.png) no-repeat bottom center;
        background-size: contain;
        box-sizing: border-box;

        .qiu {
          position: relative;
          width: 170px;
          height: 170px;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
        }

        .qiu::before {
          content: '';
          display: block;
          width: 170px;
          height: 170px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.5);
          animation: expand 2s linear infinite;
        }

        .bg1 {
          background: url(@/assets/images/cicle5.png) no-repeat center;
          background-size: 100%;
        }

        .bg2 {
          background: url(@/assets/images/cicle3.png) no-repeat center;
          background-size: 100%;
        }

        .bg3 {
          background: url(@/assets/images/cicle4.png) no-repeat center;
          background-size: 100%;
        }

        .bg4 {
          background: url(@/assets/images/cicle2.png) no-repeat center;
          background-size: 100%;
        }

        .bg5 {
          background: url(@/assets/images/cicle3.png) no-repeat center;
          background-size: 100%;
        }

        .title {
          margin-top: 7px;
          font-size: 28px;
        }
      }

      .order-info {
        :deep(.arco-statistic-title) {
          color: #0efff8;
          font-size: 18px;
          margin-top: 5px;
          margin-bottom: 0;
        }

        :deep(.arco-statistic-value) {
          text-align: center;
          font-weight: bold;
          color: #ffffff;
        }

        :deep(.arco-statistic-value-integer),
        :deep(.arco-statistic-value-decimal) {
          font-size: 42px;
        }
      }
    }
  }

  .page-three-box-1 {
    margin-bottom: 30px;
    width: 1898px;
    height: 615px;
    padding: 15px;

    .table-info1,
    .table-info2 {
      :deep(.header-item) {
        line-height: unset !important;
        font-size: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      :deep(.ceil) {
        padding: 0 2px;
        font-size: 36px;
      }
    }

    .table-info1 {
      :deep(.row-item) {
        color: #27bc9c;
        font-weight: bold;
      }
    }
  }

  .page-four-box-1 {
    margin-bottom: 10px;
    width: 100%;
    height: 490px;
    padding: 15px;
    .table-info {
      :deep(.header-item) {
        line-height: unset !important;
        font-size: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      :deep(.ceil) {
        padding: 0 2px;
        font-size: 30px;
      }

      :deep(.highlight) {
        color: #00ffff;
      }
    }
  }

  .page-four-box-2 {
    width: 100%;
    height: 440px;
    padding: 15px;
    .table-info {
      :deep(.header-item) {
        line-height: unset !important;
        font-size: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      :deep(.ceil) {
        padding: 0 2px;
        font-size: 36px;
      }

      :deep(.progress-container) {
        display: flex;
        align-items: center;
      }

      :deep(.progress-bars) {
        display: flex;
        gap: 3px;
        height: 50px;
        padding: 4px 0;
        margin-right: 5px;
      }

      :deep(.progress-bar) {
        // flex: 1;
        width: 15px;
        height: 100%;
        border-radius: 4px;
        background: #8f95b2;
        transition: background 0.3s;
      }
    }
  }

  .page-four-box-3 {
    margin-bottom: 30px;
    width: 100%;
    height: 940px;
    padding: 15px;

    img {
      width: 500px;
      height: auto;
      object-fit: cover;
      margin-top: 15px;
      max-height: 920px;
    }
  }

  .circle3 {
    width: 35rem;
    height: 35rem;
    background: url(@/assets/images/circle.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    top: 20%;
    left: 50%;
    transform-style: preserve-3d;
    transform: translateX(-50%) rotateX(75deg);
    animation: rotate3 20s linear infinite;
  }

  @keyframes rotate3 {
    0% {
      transform: translateX(-50%) rotateX(75deg) rotateZ(0);
    }
    100% {
      transform: translateX(-50%) rotateX(75deg) rotateZ(360deg);
    }
  }

  .scroll-board-info3 {
    :deep(.rows) {
      overflow-y: auto;
    }

    :deep(.rows::-webkit-scrollbar) {
      width: 10px; /* 滚动条宽度 */
    }

    :deep(.rows::-webkit-scrollbar-thumb) {
      background-color: rgba(0, 250, 253, 0.7); /* 滚动条滑块的颜色 */
      border-radius: 4px;
    }

    :deep(.rows::-webkit-scrollbar-track) {
      background-color: #ffffff; /* 滚动条轨道的颜色 */
    }
  }

  .scroll-board-info3 {
    :deep(.row-item) {
      height: 57px !important;
      line-height: 57px !important;
    }
  }

  .return-rate {
    width: 620px;
    height: 380px;
    border: 1px solid #2e6099;
    padding: 10px;

    :deep(.rank) {
      display: none;
    }
    :deep(.inside-column) {
      border-radius: 5px !important;
      margin-bottom: 0 !important;
      height: 22px !important;
    }

    :deep(.ranking-column) {
      border-bottom: 0;
      border-radius: 5px;
      background-color: #263949;
    }

    :deep(.info-name) {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      position: relative;
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-item {
    margin-left: 10px;
    margin-right: 10px;
  }

  .border-title {
    color: #0efff8;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .border-value {
    font-size: 36px;
    color: white;
    text-align: center;
    font-weight: bold;
  }

  .selector-title {
    color: white;
    font-size: 30px;
    display: flex;
    :deep(.arco-select-view-value) {
      font-size: 20px !important;
    }
  }

  .page-button {
    width: 68px;
    height: 44px;
    padding: 0 23px;
    font-size: 18px;
    margin-left: 10px;
  }

  .button-float {
    position: absolute;
    z-index: 999999;
    top: 64px;
    right: 0px;
    filter: drop-shadow(2px 3px 5px rgba(99, 100, 100, 0.9));

    .button-wrap {
      width: 124px;
      height: 36px;
      line-height: 36px;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      overflow: hidden;
      letter-spacing: 4px;
      cursor: default;
      transform: translateX(86px);
      transition: all 0.3s ease-in-out;
      background: linear-gradient(to left, #0430a1, #00fafd);
      // clip-path: polygon(10% 0%, 90% 0%, 90% 100%, 10% 100%, 0 50%);
      clip-path: polygon(0 20px, 10px 0, 124px 0, 124px 36px, 10px 36px);
    }

    .button-wrap:hover {
      transform: translateX(10px);
      cursor: pointer;
    }
  }

  .person-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    color: white;
    text-align: center;
    height: 63px;
    line-height: 63px;
    font-size: 40px;

    div {
      flex: 1;
      background-color: #0c244d;
    }
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
      background: #0d2742;
      margin-right: 15px;
      overflow: hidden;
      position: relative;
      border: 1px solid #0e94eb;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .production-info {
    line-height: 1.5;
    :deep(.arco-statistic-title) {
      color: #0efff8;
      font-size: 38px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    :deep(.arco-statistic-value) {
      font-weight: bold;
    }

    :deep(.arco-statistic-value-integer),
    :deep(.arco-statistic-value-decimal) {
      font-size: 58px;
    }

    :deep(.arco-statistic-suffix) {
      font-size: 38px;
    }
  }

  .pph-info {
    :deep(.arco-statistic-title) {
      color: #0efff8;
      font-size: 18px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    :deep(.arco-statistic-value) {
      text-align: center;
      font-weight: bold;
      color: #ffffff;
    }

    :deep(.arco-statistic-value-integer),
    :deep(.arco-statistic-value-decimal) {
      font-size: 48px;
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

  .production-rate {
    width: 100%;
    height: 636px;
    :deep(.header-item) {
      padding: 0 2px;
      font-size: 28px;
    }
    :deep(.ceil) {
      padding: 0 2px;
      font-size: 34px;
    }
  }

  .quality-info {
    :deep(.header-item) {
      padding: 0 2px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.ceil) {
      padding: 0 2px;
      font-size: 34px;
    }
  }

  .return-detail {
    width: 1000px;
    height: 380px;
    margin-left: 15px;
    margin-right: 15px;

    :deep(.header-item) {
      padding: 0 2px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.ceil) {
      padding: 0 2px;
      font-size: 34px;
    }

    :deep(.ceil:nth-of-type(2)) {
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }
  }

  .member-container {
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: repeat(2, 50%);
    height: 390px;
  }

  .person-container {
    width: 448px;
    height: 475px;
    position: relative;
    overflow: hidden;

    .person-slide {
      display: flex;
      flex-direction: row;
      position: relative;
      width: 1344px;
      height: 475px;
      transition: transform 0.5s ease-in-out;
      will-change: transform;

      .person-item {
        background: #0c244d;
        color: white;
        text-align: center;
        .person-item-label {
          width: 172px;
          float: left;
          height: 63px;
          line-height: 63px;
          font-size: 40px;
        }

        .person-item-value {
          width: 274px;
          float: left;
          height: 63px;
          line-height: 63px;
          font-size: 40px;
        }

        img {
          margin-top: 7px;
          width: 340px;
          height: 340px;
        }
      }
    }
  }

  :deep(.move-left) {
    display: inline-block;
    animation: move 5s linear infinite;
  }

  :deep(.move-right) {
    display: inline-block;
    position: absolute;
    margin-left: 3%;
    animation: move 5s linear infinite;
  }

  :deep(.marquee-left) {
    display: inline-block;
    animation: marquee 8s linear infinite;
  }

  :deep(.marquee-right) {
    display: inline-block;
    position: absolute;
    margin-left: 3%;
    animation: marquee 8s linear infinite;
  }

  @keyframes move {
    0% {
      transform: translateX(3%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-103%);
    }
  }

  // 扩散动画
  @keyframes expand {
    0% {
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }
</style>
