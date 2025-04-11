<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <Header
        :title="topTitle"
        line-color="rgba(14,228,249, 1)"
        :center-style="{
          'color': '#0EE4F9',
          'letter-spacing': '1px',
          'fontSize': '40px',
          'top': '10px',
        }"
        :right-style="{ color: 'white' }"
        :class="dispalyPage === 3 ? (theme ? 'in-out-header' : '') : ''"
      ></Header>
      <div class="error-msg">
        <span>{{ errorMsg }}</span>
      </div>
      <!-- 顶部-查询条件 -->
      <div class="search-condition">
        <div class="selector-title">
          <span v-show="dispalyPage <= 2" style="margin-right: 10px"
            >工厂:
          </span>
          <a-select
            v-model="factoryCode"
            size="large"
            :style="{
              width: '200px',
              marginRight: '10px',
              display: dispalyPage <= 2 ? 'inline-flex' : 'none',
            }"
            @change="handleChangeFactory"
          >
            <a-option
              v-for="item in factoryList"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}
            </a-option>
          </a-select>
          <span v-show="dispalyPage === 2" style="margin-right: 10px"
            >日期:</span
          >
          <a-date-picker
            v-model="selectDate"
            size="large"
            :allow-clear="false"
            format="YYYY/MM/DD"
            :style="{
              width: '130px',
              marginRight: '10px',
              display: dispalyPage === 2 ? 'inline-flex' : 'none',
            }"
            @change="handleChangeDate"
          />
          <a-button
            v-show="showPageBtn"
            type="primary"
            size="large"
            style="margin-right: 10px; width: 60px"
            @click="handlePrevPage"
          >
            上一页
          </a-button>
          <a-button
            v-show="showPageBtn"
            type="primary"
            size="large"
            style="width: 60px"
            @click="handleNextPage"
          >
            下一页
          </a-button>
        </div>
      </div>
      <div class="button-float" @click="handleStop">
        <div class="button-wrap">{{ modelName }}</div>
      </div>
      <div
        class="container"
        :style="{
          background: dispalyPage === 3 ? (theme ? '#FFFFE1' : '#000') : '#000',
        }"
      >
        <a-row class="container-row" :gutter="24">
          <!-- 第三页 -->
          <template v-if="dispalyPage === 3">
            <div class="pg3-box">
              <!-- 一厂 -->
              <dv-border-box-10
                v-for="item in workShopDepts"
                :key="item.ORG_CODE"
                style="height: auto; box-shadow: none"
                :class="theme ? 'pg3-dv-border-box' : 'pg3-dv-border-box2'"
              >
                <div class="dv-scan-box">
                  <div class="scan-box-title">{{ item.ORG_NAME }}</div>
                  <div class="scan-box-content">
                    <div
                      v-for="subItem in item.data"
                      :key="subItem.DEPARTMENT_CODE"
                      class="group-item"
                    >
                      <div class="item-title">
                        {{ subItem.DEPARTMENT_NAME }}
                      </div>
                      <div class="item-content">
                        <div class="item-content-left">
                          <div class="item-content-sub">
                            <div>A</div>
                            <div :class="subItem.A"></div>
                          </div>
                          <div class="item-content-sub">
                            <div>B</div>
                            <div :class="subItem.B"></div>
                          </div>
                        </div>
                        <div class="item-content-right">
                          <div class="timer-image"></div>
                          <div>{{ subItem.TIME }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
            </div>
          </template>
          <!-- 第二页 -->
          <template v-else-if="dispalyPage === 2">
            <!-- 第二页-左边 -->
            <a-col class="pl15" :span="7">
              <!-- 第二页-左边-1-面底当日入库数 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 375px"
              >
                <div class="vertical-line">面底当日入库数</div>
                <div class="pg2-fb-box">
                  <div class="pg2-fb-box-content">
                    <div class="pg2-fb-face-self">
                      <a-statistic
                        title="鞋面-本厂"
                        :value="currentDayFbStocIn.faceSelfNum"
                        :value-from="0"
                        class="fb-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                    <div class="pg2-fb-face-manu">
                      <a-statistic
                        title="鞋面-厂商"
                        :value="currentDayFbStocIn.faceManuNum"
                        :value-from="0"
                        class="fb-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                  </div>
                  <div class="pg2-fb-box-content">
                    <div class="pg2-fb-bottom-self">
                      <a-statistic
                        title="本底-本厂"
                        :value="currentDayFbStocIn.bottomSelfNum"
                        :value-from="0"
                        class="fb-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                    <div class="pg2-fb-bottom-manu">
                      <a-statistic
                        title="本底-厂商"
                        :value="currentDayFbStocIn.bottomManuNum"
                        :value-from="0"
                        class="fb-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
              <!-- 第二页-左边-2-厂商面底当日入库数 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 559px"
              >
                <div class="vertical-line">厂商面底当日入库数</div>
                <dv-scroll-board
                  ref="manufacturerDayInStocRef"
                  :config="manufacturerDayInStoc"
                  :class="manufacturerDayInStocClass"
                />
              </dv-border-box-10>
            </a-col>
            <!-- 第二页-中间 -->
            <a-col class="pl0" :span="9">
              <!-- 第二页-中间-1-当日总排单量 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 400px"
              >
                <div class="pg2-order-box">
                  <div class="pg2-order-box-content1">
                    <a-statistic
                      title="当日总排单量"
                      :value="currentDayOrderTotal.totalNum"
                      :value-from="0"
                      :value-style="{ color: '#00B2FF' }"
                      class="order-total"
                      animation
                      show-group-separator
                    >
                      <template #suffix>双</template>
                    </a-statistic>
                  </div>
                  <div class="pg2-order-box-content2">
                    <div class="pg2-order-box-left">
                      <a-statistic
                        title="面底配套已发料"
                        :value="currentDayOrderTotal.sendNum"
                        :value-from="0"
                        :value-style="{ color: '#04F01C' }"
                        class="order-send"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                    <div class="pg2-order-box-right">
                      <a-statistic
                        title="面底配套未发料"
                        :value="currentDayOrderTotal.notSendNum"
                        :value-from="0"
                        :value-style="{ color: '#F59A23' }"
                        class="order-not-send"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
              <!-- 第二页-中间-2-当日面底配套排单明细 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 534px"
              >
                <div class="vertical-line">当日面底配套排单明细</div>
                <dv-scroll-board
                  ref="factBottomOrderDetailRef"
                  :config="factBottomOrderDetail"
                  :class="factBottomOrderDetailClass"
                />
              </dv-border-box-10>
            </a-col>
            <!-- 第二页-右边 -->
            <a-col class="pl0 pr15" :span="8">
              <!-- 第二页-右边-1-1014仓面底库存明细 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 400px"
              >
                <div class="vertical-line">1014仓底部件库存明细</div>
                <dv-scroll-board
                  ref="factBottomDetailRef1014"
                  :config="factBottomDetail1014"
                  :class="factBottomDetailClass1014"
                />
              </dv-border-box-10>
              <!-- 第二页-右边-2-3003仓鞋型面底库存明细 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 534px"
              >
                <div class="vertical-line">3003仓鞋型面底库存明细</div>
                <dv-scroll-board
                  ref="factBottomShoeDetailRef"
                  :config="factBottomShoeDetail"
                  :class="factBottomShoeDetailClass"
                />
              </dv-border-box-10>
            </a-col>
          </template>
          <!-- 第一页 -->
          <template v-else>
            <!-- 第一页-左边 -->
            <a-col class="pl15" :span="7">
              <!-- 第一页-左边-1-RTL -->
              <dv-border-box-10 :color="borderColor" class="dv-box">
                <div class="vertical-line">RTL</div>
                <div class="pg1-rtl-box">
                  <!-- 总RTL -->
                  <div class="pg1-rtl-content">
                    <div class="pg1-rtl-title"> 总RTL </div>
                    <div class="pg1-rtl-text">
                      <a-statistic
                        title=""
                        :value="rtlCountNum.rtlNum"
                        :value-from="0"
                        :precision="1"
                        :value-style="{ color: '#FFFFFF' }"
                        class="rtl-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>天</template>
                      </a-statistic>
                      <div class="pg1-rtl-line"></div>
                    </div>
                  </div>
                  <!-- 可配套数 -->
                  <div class="pg1-rtl-content">
                    <div class="pg1-rtl-title"> 可配套数 </div>
                    <div class="pg1-rtl-text">
                      <a-statistic
                        title=""
                        :value="rtlCountNum.matchNum"
                        :value-from="0"
                        :value-style="{ color: '#FFFFFF' }"
                        class="rtl-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                      <div class="pg1-rtl-line"></div>
                    </div>
                  </div>
                  <!-- 日计划产量 -->
                  <div class="pg1-rtl-content">
                    <div class="pg1-rtl-title"> 日计划产量 </div>
                    <div class="pg1-rtl-text">
                      <a-statistic
                        title=""
                        :value="rtlCountNum.planNum"
                        :value-from="0"
                        :value-style="{ color: '#FFFFFF' }"
                        class="rtl-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                      <div class="pg1-rtl-line"></div>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
              <!-- 第一页-左边-2-排单达成率 -->
              <dv-border-box-10 :color="borderColor" class="dv-box">
                <div class="vertical-line">排单达成率</div>
                <VCharts
                  :option="faceBottomRateOpt"
                  autoresize
                  style="width: 100%; height: 416px"
                ></VCharts>
              </dv-border-box-10>
            </a-col>
            <!-- 第一页-右边 -->
            <a-col class="pl0 pr15" :span="17">
              <!-- 第一页-右边-1-面底库存 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 210px"
              >
                <div class="dv-box-content">
                  <div class="pg1-fb-box">
                    <div class="pg1-fb-box-title">
                      <p class="box-line">
                        <span class="left-line"></span>
                      </p>
                      <p>
                        <span class="box-text"> 面底总库存数(3003+1014) </span>
                      </p>
                      <p class="box-line">
                        <span class="right-line"></span>
                      </p>
                    </div>
                    <div class="pg1-fb-box-content">
                      <div
                        v-for="(item, index) in faceBottomNum.totalNum"
                        :key="index"
                      >
                        <div
                          v-if="item === ',' || item === '.'"
                          class="flip-comma"
                        >
                          {{ item }}
                        </div>
                        <div v-else class="flip-box">
                          <div class="digital" :style="flipStyle">
                            {{ item }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pg1-fb-box2">
                    <div class="pg1-fb-box2-content">
                      <div class="hexagon-title">
                        <span>鞋面</span>
                      </div>
                      <div class="hexagon-content">
                        <a-statistic
                          title=""
                          :value="faceBottomNum.faceNum"
                          :value-from="0"
                          :value-style="{ color: '#FFFFFF' }"
                          class="stoc-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                      <div class="hexagon-title">
                        <span> 本底 </span>
                      </div>
                      <div class="hexagon-content">
                        <a-statistic
                          title=""
                          :value="faceBottomNum.bottomNum"
                          :value-from="0"
                          :value-style="{ color: '#FFFFFF' }"
                          class="stoc-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                    </div>
                    <div class="pg1-fb-box2-content">
                      <div class="hexagon-title">
                        <span> 大底 </span>
                      </div>
                      <div class="hexagon-content">
                        <a-statistic
                          title=""
                          :value="faceBottomNum.bigNum"
                          :value-from="0"
                          :value-style="{ color: '#FFFFFF' }"
                          class="stoc-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                      <div class="hexagon-title">
                        <span> 中底 </span>
                      </div>
                      <div class="hexagon-content">
                        <a-statistic
                          title=""
                          :value="faceBottomNum.middleNum"
                          :value-from="0"
                          :value-style="{ color: '#FFFFFF' }"
                          class="stoc-info"
                          animation
                          show-group-separator
                        >
                        </a-statistic>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
              <!-- 第一页-右边-2-厂区配套率 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 329px"
              >
                <div class="vertical-line" @click="handleAreaClick('')"
                  >厂区配套率</div
                >
                <a-date-picker
                  v-model="factoryAreaDate"
                  size="medium"
                  :allow-clear="false"
                  format="YYYY/MM/DD"
                  style="
                    width: 130px;
                    margin-right: 10px;
                    position: absolute;
                    top: 12px;
                    right: 10px;
                  "
                  @change="handleChangeDate2"
                />
                <div class="dv-box-content pl10 pr10">
                  <!-- 图表1-厂区配套率 -->
                  <div
                    v-for="item in factoryAreas"
                    :key="item.ORG_CODE"
                    class="pg1-chart-box"
                    @click="handleAreaClick(item.ORG_CODE)"
                  >
                    <div class="pg1-chart-content">
                      <dv-decoration-9
                        class="pg1-chart-size"
                        :color="item.colors"
                      >
                        <div style="color: #ffffff; font-size: 28px">
                          {{ item.MATCH_RATE + '%' }}
                        </div>
                      </dv-decoration-9>
                    </div>
                    <div class="pg1-chart-title1">{{ item.ORG_NAME }}</div>
                    <div class="pg1-chart-title2">
                      <a-statistic
                        title="日计划量"
                        :value="item.WORK_QTY"
                        :value-from="0"
                        :value-style="{ color: '#FFFFFF' }"
                        class="factory-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                      <a-statistic
                        title="排单量"
                        :value="item.SCHEDULE_QTY"
                        :value-from="0"
                        :value-style="{ color: '#FFFFFF' }"
                        class="factory-info"
                        animation
                        show-group-separator
                      >
                        <template #suffix>双</template>
                      </a-statistic>
                    </div>
                  </div>
                </div>
              </dv-border-box-10>
              <!-- 第一页-右边-3-厂区加工组别配套率 -->
              <dv-border-box-10
                :color="borderColor"
                class="dv-box"
                style="height: 380px; margin-bottom: 0"
              >
                <div class="vertical-line">厂区加工组别配套率</div>
                <dv-scroll-board
                  ref="factoryGroupRateRef"
                  :config="factoryGroupRate"
                  :class="factoryGroupRateClass"
                />
              </dv-border-box-10>
            </a-col>
          </template>
        </a-row>
      </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import Header from '@/components/header/index.vue';
  import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
  import { formatNowDate } from '@/utils/date';
  import { isNullOrEmptyStr } from '@/utils/is';
  import VCharts from 'vue-echarts';
  import VScaleScreen from 'v-scale-screen';
  import {
    LoadOrgId,
    GetRtl,
    GetShoeupperRoleMatchRate,
    GetShoeupperRoleStoc,
    GetFactoryAreaInfo,
    GetFactoryAreaDetail,
    GetShoeupperRoleInStoc,
    GetFactoryShoeupperRoleInStoc,
    GetShoeupperRoleTotalOrder,
    GetShoeupperRoleOrderDetail,
    GetFaceBottomStocDetail,
    GetShoeupperRoleStocDetail,
    GetMatchDeptList,
    GetDeptStatus,
  } from '@/api/FaceStocDashboard';
  import { getStringLen, pushEmptyRow } from '@/utils/util';

  // 顶部-标题
  const topTitle = ref<any>('3003仓面底配套库存看板');
  // 顶部-显示页面
  const dispalyPage = ref<number>(1);
  // 顶部-显示切换页面按钮
  const showPageBtn = ref<boolean>(false);
  const modelName = ref<any>('手动模式');
  const theme = ref<boolean>(true);
  // 错误信息
  const errorMsg = ref<any>('');
  // 顶部-1-工厂列表
  const factoryList = ref<any>([]);
  const factoryCode = ref<any>('');
  // 顶部-2-日期
  const selectDate = ref<any>(formatNowDate('yyyy/MM/dd'));
  // 第一页-左边-1-rtl
  const rtlCountNum = ref<any>({ rtlNum: 0.0, matchNum: 0, planNum: 0 });
  // 第一页-左边-2-排单达成率
  const faceBottomRateOpt = ref<any>({});
  // 第一页-右边-1-面底库存
  const faceBottomNum = ref<any>({
    totalNum: '',
    faceNum: 0,
    bottomNum: 0,
    middleNum: 0,
    bigNum: 0,
  });
  const flipStyle = ref<any>({});
  // 第一页-右边-2-厂区配套率
  const factoryAreas = ref<any>([]);
  //  第一页-右边-2-日期
  const factoryAreaDate = ref<any>(formatNowDate('yyyy/MM/dd'));
  // 第一页-右边-2-厂区配套率-厂区代码
  let areaCode = '';
  // 第一页-右边-3-厂区加工组别配套率
  const factoryGroupRate = ref<any>({});
  const factoryGroupRateClass = ref<any>(['dv-board-info']);
  // 第二页-左边-1-面底当日入库数
  const currentDayFbStocIn = ref<any>({
    faceSelfNum: 0,
    faceManuNum: 0,
    bottomSelfNum: 0,
    bottomManuNum: 0,
  });
  // 第二页-左边-2-厂商面底当日入库数
  const manufacturerDayInStoc = ref<any>({});
  const manufacturerDayInStocClass = ref<any>(['dv-board-info2']);
  // 第二页-中间-1-当日总排单量
  const currentDayOrderTotal = ref<any>({
    totalNum: 0,
    sendNum: 0,
    notSendNum: 0,
  });
  // 第二页-中间-2-当日面底配套排单明细
  const factBottomOrderDetail = ref<any>({});
  const factBottomOrderDetailClass = ref<any>(['dv-board-info3']);
  // 第二页-右边-1-1014仓面底库存明细
  const factBottomDetail1014 = ref<any>({});
  const factBottomDetailClass1014 = ref<any>(['dv-board-info5']);
  // 第二页-右边-2-3003仓鞋型面底库存明细
  const factBottomShoeDetail = ref<any>({});
  const factBottomShoeDetailClass = ref<any>(['dv-board-info4']);
  // 第三页-车间加工组页面绑定对象
  const workShopDepts = ref<any>([]);
  let workShoptDeptDatas: any = [];

  // 刷新数据定时器
  let kanbanTimer: any = 0;
  let pageTimer: any = 0;
  let idTimer: any = 0;
  let deptStatusTimer: any = 0;
  // 刷新频率 1分钟
  const kanbanInterval = 2 * 60 * 1000;
  // 切换页面 2分钟
  const pageInterval1 = 2 * 60 * 1000;
  // 切换页面 5分钟
  const pageInterval2 = 5 * 60 * 1000;
  // 切换页面
  let pageInterval = pageInterval1;
  // 查询加工组状态频率 5秒
  const statusInterval = 5 * 1000;
  // 边框颜色
  const borderColor = ref<any>(['#2E6099', '#0EE4F9']);

  const factoryGroupRateRef = ref<InstanceType<any>>(null);
  const manufacturerDayInStocRef = ref<InstanceType<any>>(null);
  const factBottomOrderDetailRef = ref<InstanceType<any>>(null);
  const factBottomDetailRef1014 = ref<InstanceType<any>>(null);
  const factBottomShoeDetailRef = ref<InstanceType<any>>(null);

  const regex = /\s+\b(\d{4,})\b(?=[,(\s*]|$)/;

  // 提取数字的函数
  function extractNumber(str: string) {
    const match = str.match(regex);
    return match ? match[1] : null;
  }

  // 公共-取消定时加载数据
  function cancelLoadData() {
    clearInterval(kanbanTimer);
    kanbanTimer = 0;
  }

  // 公共-取消定时切换页面
  function cancelChangePage() {
    // clearInterval(pageTimer);
    if (pageTimer) {
      clearTimeout(pageTimer);
      pageTimer = null;
    }
    if (idTimer) {
      clearTimeout(idTimer);
      idTimer = null;
    }
  }

  // 公共-取消定时查询加工组状态
  function cancelDeptStatus() {
    if (deptStatusTimer) {
      clearTimeout(deptStatusTimer);
      deptStatusTimer = null;
    }
  }

  // 公共-停止定时器
  function stopInterval() {
    cancelLoadData();
    cancelChangePage();
    cancelDeptStatus();
  }

  // 顶部-2-工厂列表
  const getFactoryList = async () => {
    const factoryDatas: any = [];
    factoryCode.value = '';
    const result = await LoadOrgId();
    if (Array.isArray(result.data) && result.data.length > 0) {
      result.data.forEach((item: any) => {
        if (!factoryCode.value) {
          factoryCode.value = item.ORG_CODE;
        }
        const obj = {
          value: item.ORG_CODE,
          name: item.ORG_NAME,
        };
        factoryDatas.push(obj);
      });
    }
    factoryList.value = factoryDatas;
    loadData();
    timedChangePage();
  };

  // 第一页-右边-1-rtl统计
  const getRtlData = async () => {
    const result = await GetRtl(factoryCode.value);
    if (Array.isArray(result.data) && result.data.length > 0) {
      // 总RTL
      rtlCountNum.value.rtlNum = result.data[0].RTL;
      // 可配套数
      rtlCountNum.value.matchNum = result.data[0].MATCH_QTY;
      // 日计划产量
      rtlCountNum.value.planNum = result.data[0].WORK_QTY;
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
  };

  // 第一页-左边-2-排单达成率
  faceBottomRateOpt.value = reactive({
    series: [
      {
        type: 'gauge',
        data: [],
        center: ['50%', '55%'],
        radius: '100%',
        axisLabel: {
          formatter: '{value}%',
          distance: 30,
          color: '#fff',
          fontSize: 20,
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.5, '#FD2104'],
              [2, '#0AF60A'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          lineStyle: {
            color: '#fff',
          },
        },
        title: {
          color: '#fff',
          fontSize: 30,
          offsetCenter: [0, 80],
        },
        detail: {
          valueAnimation: true,
          fontSize: 50,
          color: '#fff',
          offsetCenter: [0, 130],
          formatter: '{value}%',
        },
      },
    ],
  });
  // 第一页-左边-2-排单达成率
  const getFaceBottomRate = async () => {
    const result = await GetShoeupperRoleMatchRate(
      factoryCode.value,
      factoryAreaDate.value
    );
    const datas: any = [];
    if (Array.isArray(result.data) && result.data.length > 0) {
      // 达成率
      datas.push({ name: '达成率', value: result.data[0].MATCH_RATE });
    }
    faceBottomRateOpt.value.series[0].data = datas;
  };

  // 第一页-右边-1-面底库存
  const getFaceBottomStoc = async () => {
    let faceNum = 0;
    let bottomNum = 0;
    let middleNum = 0;
    let bigNum = 0;
    let totalNum = 0;
    flipStyle.value = {
      transition: 'none',
      transform: 'none',
    };
    const result = await GetShoeupperRoleStoc(factoryCode.value);
    if (Array.isArray(result.data) && result.data.length > 0) {
      // 配套率
      faceNum = Math.trunc(result.data[0].FACE);
      bottomNum = Math.trunc(result.data[0].BOTTOM);
      middleNum = Math.trunc(result.data[0].MIDDLE);
      bigNum = Math.trunc(result.data[0].BIG);
      totalNum = faceNum + bottomNum + middleNum + bigNum;
    }
    const stocNums = totalNum.toLocaleString('en-US');
    faceBottomNum.value.faceNum = faceNum;
    faceBottomNum.value.bottomNum = bottomNum;
    faceBottomNum.value.middleNum = middleNum;
    faceBottomNum.value.bigNum = bigNum;
    faceBottomNum.value.totalNum = stocNums;
    setTimeout(() => {
      flipStyle.value = {
        transition: 'all 1.5s ease-in-out',
        transform: 'rotateX(360deg)',
      };
    }, 100);
  };

  // 第一页-右边-2-厂区配套率
  const getFactoryAreaData = async () => {
    const result = await GetFactoryAreaInfo(
      factoryCode.value,
      factoryAreaDate.value
    );
    const datas: any = [];
    if (Array.isArray(result.data) && result.data.length > 0) {
      // datas = result.data;
      result.data.forEach((item: any) => {
        let colors = ['#F72707', '#F72707'];
        if (item.MATCH_RATE >= 100) {
          colors = ['#0AF60A', '#0AF60A'];
        } else if (item.MATCH_RATE >= 90 && item.MATCH_RATE < 100) {
          colors = ['#FFFF00', '#FFFF00'];
        }
        datas.push({ ...item, colors });
      });
    }
    factoryAreas.value = datas;
  };

  // 第一页-右边-3-厂区加工组别配套率
  factoryGroupRate.value = reactive({
    header: [
      '加工组别',
      '组别当日配套率',
      '组别当日排单量',
      '组别当日目标产量',
    ],
    data: [],
    index: false,
    // columnWidth: [770, 230, 230],
    align: ['center', 'center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });
  // 第一页-右边-3-厂区加工组别配套率
  const getFactoryAreaDetail = async (isRrefesh: boolean) => {
    let datas: any = [];
    if (isRrefesh) {
      const result = await GetFactoryAreaDetail(
        factoryCode.value,
        areaCode,
        factoryAreaDate.value
      );
      if (Array.isArray(result.data) && result.data.length > 0) {
        result.data.forEach((item: any) => {
          let color = '#F72707';
          if (item.MATCH_RATE >= 100) {
            color = '#0AF60A';
          } else if (item.MATCH_RATE >= 90 && item.MATCH_RATE < 100) {
            color = '#FFFF00';
          }
          const matchRate = `<div style="color:${color}">${item.MATCH_RATE}%</div>`;
          datas.push([
            item.DEPARTMENT_NAME,
            matchRate,
            item.SCHEDULE_QTY,
            item.WORK_QTY,
          ]);
        });
      }
    } else {
      datas = [...factoryGroupRate.value.data];
    }
    if (datas.length > 0 && factoryGroupRateRef.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      factoryGroupRateRef.value.updateRows(datas[0], 0);
    }
    let rowNum = 5;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      factoryGroupRateClass.value = ['dv-board-info', 'scroll-board-info'];
    } else {
      factoryGroupRateClass.value = ['dv-board-info'];
    }
    pushEmptyRow(datas, rowNum, 4);
    factoryGroupRate.value.rowNum = [rowNum];
    factoryGroupRate.value.data = [];
    setTimeout(() => {
      factoryGroupRate.value.data = datas;
    }, 10);
  };

  // 第二页-左边-1-面底当日入库数
  const getFaceBottomDayInStoc = async () => {
    const result = await GetShoeupperRoleInStoc(
      factoryCode.value,
      selectDate.value
    );
    if (Array.isArray(result.data) && result.data.length > 0) {
      currentDayFbStocIn.value.faceSelfNum = result.data[0].LOCAL_FACE;
      currentDayFbStocIn.value.faceManuNum = result.data[0].FACTORY_FACE;
      currentDayFbStocIn.value.bottomSelfNum = result.data[0].LOCAL_BOTTOM;
      currentDayFbStocIn.value.bottomManuNum = result.data[0].FACTORY_BOTTOM;
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
  };

  // 第二页-左边-2-厂商面底当日入库数
  manufacturerDayInStoc.value = reactive({
    header: ['类型', '厂商名称', '当日入库数'],
    data: [],
    index: false,
    columnWidth: [126, 245, 150],
    align: ['center', 'center', 'center'],
    rowNum: [9],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });
  // 第二页-左边-2-厂商面底当日入库数
  const getManufacturerDayInStoc = async (isRrefesh: boolean) => {
    let datas: any = [];
    if (isRrefesh) {
      const result = await GetFactoryShoeupperRoleInStoc(
        factoryCode.value,
        selectDate.value
      );
      if (Array.isArray(result.data) && result.data.length > 0) {
        result.data.forEach((item: any) => {
          datas.push([item.ITEM_TYPE, item.VEND_NAME, item.RCPT_QTY]);
        });
      }
    } else {
      datas = [...manufacturerDayInStoc.value.data];
    }
    if (datas.length > 0 && manufacturerDayInStocRef.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      manufacturerDayInStocRef.value.updateRows(datas[0], 0);
    }
    let rowNum = 9;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      manufacturerDayInStocClass.value = [
        'dv-board-info2',
        'scroll-board-info2',
      ];
    } else {
      manufacturerDayInStocClass.value = ['dv-board-info2'];
    }
    pushEmptyRow(datas, rowNum, 3);
    manufacturerDayInStoc.value.rowNum = [rowNum];
    manufacturerDayInStoc.value.data = [];
    setTimeout(() => {
      manufacturerDayInStoc.value.data = datas;
    }, 10);
  };

  // 第二页-中间-2-当日面底配套排单明细
  const getFactBottomTotalOrder = async () => {
    const result = await GetShoeupperRoleTotalOrder(
      factoryCode.value,
      selectDate.value
    );
    if (Array.isArray(result.data) && result.data.length > 0) {
      currentDayOrderTotal.value.totalNum = result.data[0].ORDER_QTY;
      currentDayOrderTotal.value.sendNum = result.data[0].FINISH_QTY;
      currentDayOrderTotal.value.notSendNum = result.data[0].NOT_FINISH_QTY;
    }
  };

  // 第二页-中间-2-当日面底配套排单明细
  factBottomOrderDetail.value = reactive({
    header: ['工作中心', '当日排单量', '已发料数', '未发料数'],
    data: [],
    index: false,
    columnWidth: [253, 144, 144, 144],
    align: ['center', 'center', 'center', 'center'],
    rowNum: [8],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });
  // 第二页-中间-2-当日面底配套排单明细
  const getFactBottomOrderDetail = async (isRrefesh: boolean) => {
    let datas: any = [];
    if (isRrefesh) {
      const result = await GetShoeupperRoleOrderDetail(
        factoryCode.value,
        selectDate.value
      );
      if (Array.isArray(result.data) && result.data.length > 0) {
        result.data.forEach((item: any) => {
          let deptName = item.DEPT_NAME;
          let orderQty = item.ORDER_QTY;
          let finishQty = item.FINISH_QTY;
          let notFinishQty = item.NOT_FINISH_QTY;
          let color = '';
          if (item.FINISH_QTY === 0) {
            color = '#FD2104';
          } else if (item.FINISH_QTY === item.ORDER_QTY) {
            color = '#04F01C';
          }
          if (color !== '') {
            deptName = `<span style="color:${color}">${item.DEPT_NAME}</span>`;
            orderQty = `<span style="color:${color}">${item.ORDER_QTY}</span>`;
            finishQty = `<span style="color:${color}">${item.FINISH_QTY}</span>`;
            notFinishQty = `<span style="color:${color}">${item.NOT_FINISH_QTY}</span>`;
          }
          datas.push([deptName, orderQty, finishQty, notFinishQty]);
        });
      }
    } else {
      datas = [...factBottomOrderDetail.value.data];
    }
    if (datas.length > 0 && factBottomOrderDetailRef.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      factBottomOrderDetailRef.value.updateRows(datas[0], 0);
    }
    let rowNum = 8;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      factBottomOrderDetailClass.value = [
        'dv-board-info3',
        'scroll-board-info3',
      ];
    } else {
      factBottomOrderDetailClass.value = ['dv-board-info3'];
    }
    pushEmptyRow(datas, rowNum, 4);
    factBottomOrderDetail.value.rowNum = [rowNum];
    factBottomOrderDetail.value.data = [];
    setTimeout(() => {
      factBottomOrderDetail.value.data = datas;
    }, 10);
  };

  // 第二页-右边-1-1014仓面底库存明细
  factBottomDetail1014.value = reactive({
    header: ['物料模号', '物料尺码', '物料库存'],
    data: [],
    index: false,
    columnWidth: [200, 200, 200],
    align: ['center', 'center', 'center'],
    rowNum: [5],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });
  // 第二页-右边-1-1014仓面底库存明细
  const getFactBottomDetail1014 = async (isRrefesh: boolean) => {
    let datas: any = [];
    if (isRrefesh) {
      const result = await GetFaceBottomStocDetail(factoryCode.value);
      if (Array.isArray(result.data) && result.data.length > 0) {
        result.data.forEach((item: any) => {
          let itemMode = extractNumber(item.NAME_T);
          if (isNullOrEmptyStr(itemMode) && !isNullOrEmptyStr(item.BASE_MODE)) {
            itemMode = item.BASE_MODE;
          }
          if (isNullOrEmptyStr(itemMode)){
            console.log(item.NAME_T)
          }
          datas.push([
            // `<div class='scroll-text' data-text='${item.NAME_T}'>${item.NAME_T}</div>`,
            itemMode,
            item.MATERIAL_SPECIFICATIONS,
            item.STOC_QTY,
          ]);
        });
      }
    } else {
      datas = [...factBottomDetail1014.value.data];
    }
    if (datas.length > 0 && factBottomDetailRef1014.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      factBottomDetailRef1014.value.updateRows(datas[0], 0);
    }
    let rowNum = 5;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      factBottomDetailClass1014.value = [
        'dv-board-info5',
        'scroll-board-info5',
      ];
    } else {
      factBottomDetailClass1014.value = ['dv-board-info5'];
    }
    pushEmptyRow(datas, rowNum, 5);
    factBottomDetail1014.value.rowNum = [rowNum];
    factBottomDetail1014.value.data = [];
    setTimeout(() => {
      factBottomDetail1014.value.data = datas;
    }, 10);
  };

  // 第二页-右边-2-3003仓鞋型面底库存明细
  factBottomShoeDetail.value = reactive({
    header: ['鞋型名称', '鞋面库存', '鞋面占比', '本底库存', '本底占比'],
    data: [],
    index: false,
    columnWidth: [180, 105, 105, 105, 105],
    align: ['left', 'center', 'center', 'center', 'center'],
    rowNum: [8],
    indexHeader: ['序号'],
    waitTime: 3000,
    hoverPause: false,
    headerBGC: '#0C244D',
    headerHeight: 45,
  });
  // 第二页-右边-2-003仓鞋型面底库存明细
  const getFactBottomShoeDetail = async (isRrefesh: boolean) => {
    let datas: any = [];
    if (isRrefesh) {
      const result = await GetShoeupperRoleStocDetail(factoryCode.value);
      if (Array.isArray(result.data) && result.data.length > 0) {
        result.data.forEach((item: any) => {
          // let shoeName = item.SHOE_NAME;
          // const len = getStringLen(27, 'Microsoft YaHei', shoeName);
          // console.log(`${shoeName}:${len}`);
          // if (len > 162) {
          //   shoeName = `<span class="move-left">${shoeName}</span><span class="move-right">${shoeName}</span>`;
          // }
          datas.push([
            item.SHOE_NAME,
            item.FACE_QTY,
            `${item.FACE_RATE}%`,
            item.BOTTOM_QTY,
            `${item.BOTTOM_RATE}%`,
          ]);
        });
      }
    } else {
      datas = [...factBottomShoeDetail.value.data];
    }
    if (datas.length > 0 && factBottomShoeDetailRef.value) {
      // 此处可以传第二个参数 index，指定下次滚动的起始行
      factBottomShoeDetailRef.value.updateRows(datas[0], 0);
    }
    let rowNum = 8;
    if (showPageBtn.value && datas.length > rowNum) {
      rowNum = datas.length;
      factBottomShoeDetailClass.value = [
        'dv-board-info4',
        'scroll-board-info4',
      ];
    } else {
      factBottomShoeDetailClass.value = ['dv-board-info4'];
    }
    pushEmptyRow(datas, rowNum, 5);
    factBottomShoeDetail.value.rowNum = [rowNum];
    factBottomShoeDetail.value.data = [];
    setTimeout(() => {
      factBottomShoeDetail.value.data = datas;
    }, 10);
  };

  // 第三页-查询加工组的状态
  const queryDeptStatus = async (item: any) => {
    errorMsg.value = '';
    const result = await GetDeptStatus(item.DEPARTMENT_CODE);
    if (Array.isArray(result.data) && result.data.length > 0) {
      const status = result.data[0];
      const orgItem: any = workShopDepts.value.find(
        (org: any) => org.ORG_CODE === item.ORG_CODE
      );
      if (orgItem && orgItem.data) {
        const groupItem = orgItem.data.find(
          (group: any) => group.DEPARTMENT_CODE === item.DEPARTMENT_CODE
        );
        if (groupItem) {
          groupItem.A = status.STOC_STATUS1 === 1 ? 'green-light' : 'red-light';
          groupItem.B = status.STOC_STATUS2 === 1 ? 'green-light' : 'red-light';
          groupItem.TIME = `${status.WAIT_HOURS1.toFixed(2)}h`;
        }
      }
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
  };

  // 第三页-定时查询加工组状态
  function timedDeptStatus() {
    if (Array.isArray(workShoptDeptDatas) && workShoptDeptDatas.length > 0) {
      workShoptDeptDatas.forEach((item: any) => {
        queryDeptStatus(item);
      });
    }
    deptStatusTimer = setTimeout(timedDeptStatus, statusInterval);
  }

  // 第三页-查询加工线列表
  const queryDeptList = async () => {
    cancelDeptStatus();
    workShoptDeptDatas = [];
    const result = await GetMatchDeptList('1001');
    let datas: any = [];
    if (Array.isArray(result.data) && result.data.length > 0) {
      datas = result.data.reduce((acc: any, curr: any) => {
        const existingOrg: any = acc.find(
          (org: any) => org.ORG_NAME === curr.ORG_NAME
        );
        const groupItem = {
          DEPARTMENT_CODE: curr.DEPARTMENT_CODE,
          DEPARTMENT_NAME: curr.DEPARTMENT_NAME,
          A: 'green-light',
          B: 'green-light',
          TIME: '0h',
        };
        if (existingOrg) {
          // 如果已存在该组织，则将部门添加到其 data 数组中
          existingOrg.data.push(groupItem);
        } else {
          // 如果不存在该组织，则创建一个新的对象并添加到结果数组中
          acc.push({
            ORG_CODE: curr.ORG_CODE,
            ORG_NAME: curr.ORG_NAME,
            data: [groupItem],
          });
        }
        return acc;
      }, []);
      workShoptDeptDatas = result.data;
    }
    if (!result.status) {
      errorMsg.value = result.msg;
    }
    workShopDepts.value = datas;
    timedDeptStatus();
  };

  // 定时加载数据
  function timedLoadData() {
    if (showPageBtn.value && dispalyPage.value < 3) {
      kanbanTimer = setInterval(() => {
        if (dispalyPage.value === 1) {
          getRtlData();
          getFaceBottomRate();
          getFaceBottomStoc();
          getFactoryAreaData();
          getFactoryAreaDetail(true);
        } else if (dispalyPage.value === 2) {
          getFaceBottomDayInStoc();
          getManufacturerDayInStoc(true);
          getFactBottomTotalOrder();
          getFactBottomOrderDetail(true);
          getFactBottomDetail1014(true);
          getFactBottomShoeDetail(true);
        }
      }, kanbanInterval);
    }
  }

  // 加载数据
  function loadData() {
    if (dispalyPage.value === 1) {
      getRtlData();
      getFaceBottomRate();
      getFaceBottomStoc();
      getFactoryAreaData();
      getFactoryAreaDetail(true);
    } else if (dispalyPage.value === 2) {
      getFaceBottomDayInStoc();
      getManufacturerDayInStoc(true);
      getFactBottomTotalOrder();
      getFactBottomOrderDetail(true);
      getFactBottomDetail1014(true);
      getFactBottomShoeDetail(true);
    } else if (dispalyPage.value === 3) {
      queryDeptList();
    }
    timedLoadData();
  }

  // 刷新数据
  function refreshData() {
    errorMsg.value = '';
    cancelLoadData();
    cancelDeptStatus();
    loadData();
  }

  // 组件事件
  // 顶部-1-工厂选择事件
  function handleChangeFactory() {
    refreshData();
  }

  // 顶部-1-日期选择事件
  function handleChangeDate() {
    refreshData();
  }

  // 顶部-2-改变切换页面频率
  function changePageInterval(pageIndex: number) {
    if (pageIndex === 3) {
      pageInterval = pageInterval2;
    } else {
      pageInterval = pageInterval1;
    }
    // console.log(
    //   `now:${formatNowDate()},pageIndex=${pageIndex},pageInterval=${pageInterval}`
    // );
  }

  // 顶部-2-获取上个页面
  function getPrevPage() {
    let index = 1;
    if (dispalyPage.value <= 1) {
      index = 3;
    } else {
      index = dispalyPage.value - 1;
    }
    changePageInterval(index);
    return index;
  }
  // 顶部-2-切换上一个页面
  function handlePrevPage() {
    dispalyPage.value = getPrevPage();
    refreshData();
  }

  // 顶部-2-获取上个页面
  function getNextPage() {
    let index = 1;
    if (dispalyPage.value >= 3) {
      index = 1;
    } else {
      index = dispalyPage.value + 1;
    }
    changePageInterval(index);
    return index;
  }
  // 顶部-2-切换下一个页面
  function handleNextPage() {
    dispalyPage.value = getNextPage();
    refreshData();
  }

  // 顶部-2-定时切换页面
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
    repeatLater(handleNextPage, pageInterval);
  }

  // 顶部-2-停止滚动
  function handleStop() {
    showPageBtn.value = !showPageBtn.value;
    const isThreePage = dispalyPage.value === 3;
    if (showPageBtn.value) {
      modelName.value = '自动模式';
      // 取消定时切换页面
      cancelChangePage();
      // 第三页不需要处理
      if (!isThreePage) {
        // 定时刷新数据
        timedLoadData();
      }
    } else {
      modelName.value = '手动模式';
      // 定时切换页面
      timedChangePage();
      if (!isThreePage) {
        // 取消定时刷新数据
        cancelLoadData();
      }
    }
    // 停止或者恢复页面滚动
    if (dispalyPage.value === 1) {
      // 第一页
      getFactoryAreaDetail(false);
    } else if (dispalyPage.value === 2) {
      //  第二页
      getManufacturerDayInStoc(false);
      getFactBottomOrderDetail(false);
      getFactBottomDetail1014(false);
      getFactBottomShoeDetail(false);
    }
  }

  // 第一页-右边-2-厂区点击事件
  function handleAreaClick(code: string) {
    areaCode = code;
    getFactoryAreaDetail(true);
  }

  // 第一页-右边-2-日期选择事件
  function handleChangeDate2() {
    getFaceBottomRate();
    getFactoryAreaData();
    handleAreaClick('');
  }

  // 切换颜色
  function handleChangeTheme() {
    theme.value = !theme.value;
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
    top: 105px;
    width: 1920px;
    height: 975px;
    background: black;
  }

  .container-row {
    height: 975px;
    padding: 0 !important;
    margin: 0 !important;
    padding-top: 10px !important;
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

  .error-msg {
    position: absolute;
    z-index: 9999;
    top: 69px;
    right: 50px;
    span {
      color: #fd2104;
      font-size: 28px;
    }
  }

  .search-condition {
    position: absolute;
    z-index: 999999;
    top: 70px;
    left: 12px;
  }

  .button-control {
    position: absolute;
    z-index: 999999;
    top: 72px;
    right: 12px;

    :deep(.arco-btn-secondary[type='button']) {
      color: #ffffff;
      background-color: #193757;
      font-size: 18px;
    }
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

  :deep(.arco-tag-close-btn) {
    display: none !important;
  }

  .vertical-line {
    position: relative;
    padding-top: 12px;
    padding-left: 12px;
    margin-bottom: 10px;
    color: #0cdaf1;
    font-size: 28px;
    font-weight: bold;
  }

  .dv-box {
    width: 100%;
    height: 467px;
    margin-bottom: 15px;
  }

  .dv-box-content {
    display: flex;
    width: 1340px;
    align-items: center;
    justify-content: center;
  }

  .pg1-rtl-box {
    width: 533px;
    padding: 0 15px;
    margin-top: 36px;

    .pg1-rtl-content {
      display: flex;
      margin-bottom: 20px;

      .pg1-rtl-title {
        width: 210px;
        height: 100px;
        color: #0cdaf1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-weight: 600;
      }

      .pg1-rtl-text {
        margin-left: 15px;
        display: flex;
        align-items: center;

        .rtl-info {
          :deep(.arco-statistic-title) {
            color: #ffffff;
            font-size: 28px;
            margin-top: 0px;
            margin-bottom: 0;
          }

          :deep(.arco-statistic-value-integer),
          :deep(.arco-statistic-value-decimal) {
            font-size: 52px;
          }

          :deep(.arco-statistic-suffix) {
            font-size: 30px;
            position: absolute;
            right: 30px;
            margin-top: 20px;
          }
        }

        .pg1-rtl-line {
          height: 4px;
          width: 268px;
          background: #0cdaf1;
          position: absolute;
          margin-top: 80px;
        }

        .pg1-rtl-line::after {
          content: '';
          position: absolute;
          right: -5px;
          top: -0.2em;
          width: 10px;
          height: 10px;
          background-color: #0cdaf1;
          border-radius: 50%;
        }
      }
    }
  }

  .pg1-fb-box {
    width: 670px;

    .pg1-fb-box-title {
      display: flex;
      width: 100%;
      justify-content: center;
      padding-top: 10px;

      .box-text {
        color: white;
        font-size: 28px;
      }

      .box-line {
        display: flex;
        width: 84px;
        align-items: center;
        .left-line {
          height: 2px;
          width: 84px;
          background: linear-gradient(to right, #064b59, #03d8f9);
        }

        .right-line {
          height: 2px;
          width: 84px;
          background: linear-gradient(to left, #064b59, #03d8f9);
        }
      }
    }

    .pg1-fb-box-content {
      width: 100%;
      height: 140px;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      .flip-box {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 120px;
        line-height: 100px;
        border: solid 1px#000;
        border-radius: 5px;
        background: #082671;
        font-size: 92px;
        color: #fff;
        text-align: center;
        font-family: 'Helvetica Neue';
        margin-right: 5px;

        .digital {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .digital:before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          z-index: -1;
          top: 50%;
          border: solid 1px #000000;
        }
      }

      .flip-comma {
        height: 120px;
        font-size: 86px;
        color: #ffffff;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
        font-weight: 700;
        font-style: normal;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: end;
      }
    }
  }

  .pg1-fb-box2 {
    width: 650px;

    .pg1-fb-box2-content {
      width: 100%;
      height: 95px;
      display: flex;
      align-items: center;

      .hexagon-title {
        position: relative;
        width: 86px;
        height: 76px;
        background: #5a646f;
        clip-path: polygon(
          25% 0%,
          75% 0%,
          100% 50%,
          75% 100%,
          25% 100%,
          0% 50%
        );

        span {
          color: white;
          position: absolute;
          left: 15px;
          top: 21px;
          font-size: 28px;
        }
      }

      .hexagon-title::before {
        content: '';
        position: absolute;
        top: 3px; /* 边框宽度 */
        left: 3px; /* 边框宽度 */
        right: 3px; /* 边框宽度 */
        bottom: 3px; /* 边框宽度 */
        background: #082671;
        clip-path: polygon(
          25% 0%,
          75% 0%,
          100% 50%,
          75% 100%,
          25% 100%,
          0% 50%
        );
      }

      .hexagon-content {
        position: relative;
        background: #082671;
        height: 76px;
        width: 265px;
        margin-left: -25px;
        // margin-right: 15px;
        clip-path: polygon(0 0, 240px 0, 255px 38px, 240px 76px, 0px 76px);
        display: flex;
        align-items: center;
        padding-left: 30px;
        z-index: -1;

        .stoc-info {
          :deep(.arco-statistic-value-integer),
          :deep(.arco-statistic-value-decimal) {
            font-size: 45px;
          }

          :deep(.arco-statistic-suffix) {
            font-size: 38px;
          }
        }
      }
    }
  }

  .pg1-chart-box {
    width: 300px;

    .pg1-chart-content {
      width: 100%;
      display: flex;
      justify-content: center;

      .pg1-chart-size {
        width: 145px;
        height: 145px;
      }
    }

    .pg1-chart-title1 {
      color: white;
      font-size: 28px;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 6px;
    }

    .pg1-chart-title2 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      .factory-info {
        :deep(.arco-statistic-title) {
          color: #ffffff;
          font-size: 20px;
          margin-top: 0px;
          margin-bottom: 0;
        }

        :deep(.arco-statistic-value) {
          text-align: center;
        }

        :deep(.arco-statistic-value-integer),
        :deep(.arco-statistic-value-decimal) {
          font-size: 30px;
          margin-right: 3px;
        }

        :deep(.arco-statistic-suffix) {
          font-size: 18px;
        }
      }
    }
  }

  .pg2-fb-box {
    width: 533px;
    margin-top: 15px;

    .pg2-fb-box-content {
      width: 533px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;

      .fb-info,
      .face-self,
      .face-manu {
        line-height: 1.3;

        :deep(.arco-statistic-title) {
          color: #ffffff;
          font-size: 30px;
          font-weight: 550;
          margin-top: 0px;
          margin-bottom: 0;
          padding-left: 5px;
        }

        :deep(.arco-statistic-value-integer),
        :deep(.arco-statistic-value-decimal) {
          font-size: 55px;
          font-weight: 600;
          color: #ffffff;
        }

        :deep(.arco-statistic-suffix) {
          font-size: 25px;
          color: #ffffff;
          margin-left: 5px;
        }
      }

      .pg2-fb-face-self,
      .pg2-fb-bottom-self,
      .pg2-fb-face-manu,
      .pg2-fb-bottom-manu {
        width: 242px;
        border-radius: 5px;
        padding: 10px 0 10px 10px;
      }

      .pg2-fb-face-self,
      .pg2-fb-bottom-self {
        margin-right: 15px;
      }

      .pg2-fb-face-manu,
      .pg2-fb-bottom-manu {
        margin-right: 0;
      }

      .pg2-fb-face-self,
      .pg2-fb-face-manu {
        background: linear-gradient(to right, #01a7fe, #396bcb);
      }

      .pg2-fb-bottom-self,
      .pg2-fb-bottom-manu {
        background: linear-gradient(to right, #feb178, #c1a2a4);
      }
    }
  }

  .pg2-order-box {
    width: 702px;

    .pg2-order-box-content1 {
      width: 702px;
      height: 210px;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      .order-total {
        line-height: 1.3;

        :deep(.arco-statistic-title) {
          color: #ffffff;
          font-size: 40px;
          font-weight: 550;
          margin-top: 0px;
          margin-bottom: 0;
          text-align: center;
        }

        :deep(.arco-statistic-content) {
          text-align: center;
        }

        :deep(.arco-statistic-value-integer),
        :deep(.arco-statistic-value-decimal) {
          font-size: 90px;
          font-weight: 600;
          letter-spacing: 8px;
        }

        :deep(.arco-statistic-suffix) {
          font-size: 30px;
          color: #ffffff;
          margin-left: 5px;
        }
      }
    }

    .pg2-order-box-content2 {
      width: 702px;
      height: 190px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 25px;

      .order-send,
      .order-not-send {
        line-height: 1.3;

        :deep(.arco-statistic-title) {
          color: #ffffff;
          font-size: 30px;
          font-weight: 550;
          margin-top: 0px;
          margin-bottom: 0;
        }

        :deep(.arco-statistic-content) {
          text-align: center;
        }

        :deep(.arco-statistic-value-integer),
        :deep(.arco-statistic-value-decimal) {
          font-size: 70px;
          font-weight: 600;
        }

        :deep(.arco-statistic-suffix) {
          font-size: 30px;
          color: #ffffff;
          margin-left: 5px;
        }
      }

      .pg2-order-box-left {
        padding-bottom: 5px;
        padding-right: 20px;
        border-right: 1px solid #2287e6;
        border-bottom: 2px solid #2287e6;
      }

      .pg2-order-box-right {
        padding-bottom: 5px;
        padding-left: 20px;
        border-left: 1px solid #2287e6;
        border-bottom: 2px solid #2287e6;
      }
    }
  }

  .dv-board-info {
    width: 100%;
    height: 310px;
    padding: 0 12px;

    :deep(.header-item) {
      font-size: 26px;
      display: flex;
      padding: 0 5px;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, #0430a1, #00fafd);
      clip-path: polygon(0 0, 319px 0, 329px 13px, 329px 45px, 0 45px);
    }

    :deep(.ceil) {
      padding: 0 5px;
      font-size: 32px;
    }
  }

  .scroll-board-info,
  .scroll-board-info2,
  .scroll-board-info3,
  .scroll-board-info4,
  .scroll-board-info5 {
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

  .scroll-board-info {
    :deep(.row-item) {
      height: 53px !important;
      line-height: 53px !important;
    }
  }

  .dv-board-info2 {
    width: 100%;
    height: 489px;
    padding: 0 12px;

    :deep(.header-item) {
      font-size: 26px;
      display: flex;
      padding: 0 5px;
      align-items: center;
      justify-content: center;
    }

    :deep(.header-item:nth-of-type(1)) {
      background: linear-gradient(to right, #0430a1, #00fafd);
      clip-path: polygon(0 0, 115px 0, 125px 13px, 125px 45px, 0 45px);
    }

    :deep(.header-item:nth-of-type(2)) {
      background: linear-gradient(to right, #0430a1, #00fafd);
      clip-path: polygon(0 0, 228px 0, 238px 13px, 238px 45px, 0 45px);
    }

    :deep(.header-item:nth-of-type(3)) {
      background: linear-gradient(to right, #0430a1, #00fafd);
      clip-path: polygon(0 0, 139px 0, 149px 13px, 149px 45px, 0 45px);
    }

    :deep(.ceil) {
      padding: 0 5px;
      font-size: 28px;
    }
  }

  .scroll-board-info2 {
    :deep(.row-item) {
      height: 49.1111px !important;
      line-height: 49.1111px !important;
    }
  }

  .dv-board-info3 {
    width: 100%;
    height: 464px;
    padding: 0 12px;

    :deep(.header-item) {
      font-size: 26px;
      display: flex;
      padding: 0 5px;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, #0430a1, #00fafd);
      clip-path: polygon(0 0, 133px 0, 143px 13px, 143px 45px, 0 45px);
    }

    :deep(.header-item:nth-of-type(1)) {
      clip-path: polygon(0 0, 242px 0, 252px 13px, 252px 45px, 0 45px);
    }

    :deep(.ceil) {
      padding: 0 5px;
      font-size: 28px;
    }
  }

  .scroll-board-info3 {
    :deep(.row-item) {
      height: 51.5px !important;
      line-height: 51.5px !important;
    }
  }

  .dv-board-info4 {
    width: 100%;
    height: 464px;
    padding: 0 12px;

    :deep(.header-item) {
      font-size: 23px;
      display: flex;
      padding: 0 3px;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, #0430a1, #00fafd);
      clip-path: polygon(0 0, 95px 0, 105px 13px, 105px 45px, 0 45px);
    }

    :deep(.header-item:nth-of-type(1)) {
      clip-path: polygon(0 0, 170px 0, 180px 13px, 180px 45px, 0 45px);
    }

    :deep(.ceil) {
      padding: 0 3px;
      font-size: 24px;
    }

    :deep(.ceil:nth-of-type(1)) {
      font-size: 22px;
    }

    :deep(.ceil:nth-of-type(1)) {
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }
  }

  .scroll-board-info4 {
    :deep(.row-item) {
      height: 51.5px !important;
      line-height: 51.5px !important;
    }
  }

  .dv-board-info5 {
    width: 100%;
    height: 330px;
    padding: 0 12px;

    :deep(.header-item) {
      font-size: 23px;
      display: flex;
      padding: 0 3px;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, #0430a1, #00fafd);
    }

    :deep(.header-item) {
      clip-path: polygon(0 0, 190px 0, 200px 13px, 200px 45px, 0 45px);
    }

    :deep(.ceil) {
      padding: 0 3px;
      font-size: 27px;
    }

    :deep(.ceil:nth-of-type(1)) {
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }

    :deep(.scroll-text) {
      position: relative;
      white-space: nowrap;
      display: inline-block;
      padding-right: 30px; /* 防止截断 */
      animation: scroll-left 5s linear infinite;
    }

    :deep(.scroll-text::after) {
      content: attr(data-text);
      position: absolute;
      left: 100%;
      top: 0;
      padding-left: 30px;
    }
  }

  .scroll-board-info5 {
    :deep(.row-item) {
      height: 51.6875px !important;
      line-height: 51.6875px !important;
    }
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(calc(-100% - 30px));
    }
  }

  .pg3-box {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    padding: 0 15px;

    &::-webkit-scrollbar {
      width: 8px; /* 滚动条宽度 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(154, 155, 158, 0.7); /* 滚动条滑块的颜色 */
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: #ffffff; /* 滚动条轨道的颜色 */
    }
  }

  .in-out-header {
    background: #ffffe1 !important;

    :deep(.hd-center) {
      color: #000 !important;
    }

    :deep(.hd-right-time) {
      color: #000 !important;
    }

    :deep(.arco-link) {
      background: #000;
    }

    :deep(polyline) {
      stroke: #000;
    }
  }

  .in-out-header2 {
    background: #003b51 !important;
  }

  .pg3-dv-border-box {
    :deep(.left-top),
    :deep(.right-top),
    :deep(.right-bottom),
    :deep(.left-bottom) {
      display: none;
    }

    .dv-scan-box {
      border: 1px solid #adada9;
      border-bottom: 0;
    }
  }

  .pg3-dv-border-box:last-of-type {
    .dv-scan-box {
      border-bottom: 1px solid #adada9;
    }
  }

  .pg3-dv-border-box2 {
    :deep(.left-top),
    :deep(.right-top),
    :deep(.right-bottom),
    :deep(.left-bottom) {
      display: none;
    }

    .dv-scan-box {
      border: 1px solid #adada9;
      border-bottom: 0;
      color: #fff;

      .scan-box-title {
        background: #1493ed;
      }

      .scan-box-content {
        .group-item {
          background: #4f4e50;
          .timer-image {
            background: url(/src/assets/images/timer.png) no-repeat !important;
            background-size: 100% 100% !important;
          }
        }
      }
    }
  }

  .pg3-dv-border-box2:last-of-type {
    .dv-scan-box {
      border-bottom: 1px solid #adada9;
    }
  }

  .dv-scan-box {
    width: 100%;
    margin: 0;
    display: flex;
    color: #000;

    .scan-box-title {
      width: 55px;
      text-align: center;
      font-size: 33px;
      font-weight: 600;
      display: flex;
      align-items: center;
      background: #f0f0f0;
      margin-right: 17px;
    }

    .scan-box-content {
      width: 1825px;
      display: flex;
      flex-wrap: wrap;
      padding-top: 12px;

      .group-item {
        width: 212px;
        margin: 0 14px 14px 0;
        border-radius: 4px;
        background: #f0f0f0;
        padding-top: 6px;
        padding-bottom: 4px;
        border: 1px solid #aeae9e;

        &:hover {
          background: rgba(157, 155, 159, 0.7);
        }

        .item-title {
          font-size: 23px;
          font-weight: 550;
          text-align: center;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
        }

        .item-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .item-content-left {
            width: 150px;
            height: 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 28px;

            .item-content-sub {
              display: flex;
              align-items: center;
            }

            .red-light,
            .green-light {
              width: 28px;
              height: 28px;
              margin-left: 10px;
            }

            .red-light {
              background: url(@/assets/images/red_light.png) no-repeat;
              background-size: 100% 100%;
            }

            .green-light {
              background: url(@/assets/images/green_light.png) no-repeat;
              background-size: 100% 100%;
            }
          }

          .item-content-right {
            height: 37px;
            width: 170px;
            display: flex;
            align-items: center;
            font-size: 28px;
            margin-left: 16px;

            .timer-image {
              width: 28px;
              height: 28px;
              margin-right: 10px;
              background: url(@/assets/images/timer2.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }

  .pl0 {
    padding-left: 0 !important;
  }

  .pl10 {
    padding-left: 10px !important;
  }

  .pl15 {
    padding-left: 15px !important;
  }

  .pr9 {
    padding-right: 9px !important;
  }

  .pr10 {
    padding-right: 10px !important;
  }

  .pr15 {
    padding-right: 15px !important;
  }

  .selector-title {
    color: white;
    font-size: 18px;
    padding-left: 5px;
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

  @keyframes move {
    0% {
      transform: translateX(3%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
