<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <div class="container">
        <div class="container_outside">
          <div class="feedbackContainer">
            <!-- 头部 -->
            <Vheader
              :title-msg="title"
              :page-index="pageIndex"
              @changepageIndex="changepageIndex"
            ></Vheader>
            <!-- 内容 -->
            <div v-if="!pageIndex" class="content">
              <!-- 搜索框 -->
              <div class="searchContainer">
                <div class="searchbox">
                  <a-descriptions size="large" :column="4" border>
                    <a-descriptions-item :label="'Factory'">
                      <dia-table
                        ref="diaTable"
                        top="5vh"
                        :head="headORG"
                        :value="searchFrom[0].value"
                        api-name="GeCQListDataAsc"
                        @comfirm="GeCQListData"
                      ></dia-table>
                    </a-descriptions-item>
                    <a-descriptions-item :label="'Inspector'">
                      <dia-table
                        ref="diaTable"
                        top="5vh"
                        :head="headWORK"
                        :value="searchFrom[1].value"
                        api-name="GetAQLInspector"
                        @comfirm="GetAQLInspector"
                      ></dia-table>
                    </a-descriptions-item>
                    <a-descriptions-item :label="'Shipping Country'">
                      <dia-table
                        ref="diaTable"
                        top="5vh"
                        :head="CountryList"
                        :value="searchFrom[2].value"
                        api-name="GetGJistData"
                        @comfirm="GetCountryListData"
                      ></dia-table>
                    </a-descriptions-item>
                    <a-descriptions-item :label="'Seri'">
                      <dia-table
                        ref="diaTable"
                        top="5vh"
                        :head="DevSeriesList"
                        :value="searchFrom[3].value"
                        api-name="GetDevelopmentSeries"
                        @comfirm="GetDevSeriesListData"
                      ></dia-table>
                    </a-descriptions-item>
                    <a-descriptions-item :label="'Level'">
                      <a-select
                        v-model="searchFrom[4].value"
                        placeholder="Please select"
                        size="large"
                        style="width: 260px"
                      >
                        <a-option
                          v-for="item in optionsSelect"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </a-option>
                      </a-select>
                    </a-descriptions-item>
                    <a-descriptions-item :label="'Inspection date'">
                      <template #label>
                        <span style="color: red">* </span>
                        <span>Inspection date</span>
                      </template>
                      <span class="inspectionPicker">
                        <a-date-picker
                          v-model="searchFrom[5].value"
                          show-time
                          :timepicker-props="{ defaultValue: '09:09:06' }"
                          :placeholder="'选择时间'"
                          format="YYYY-MM-DD HH:mm:ss"
                          size="large"
                          required
                        ></a-date-picker>
                      </span>
                      <span>&nbsp;&nbsp;~&nbsp;&nbsp; </span>
                      <span class="inspectionPicker">
                        <a-date-picker
                          v-model="searchFrom[6].value"
                          :placeholder="'选择时间'"
                          show-time
                          :timepicker-props="{ defaultValue: '09:09:06' }"
                          format="YYYY-MM-DD HH:mm:ss"
                          size="large"
                          required
                        ></a-date-picker>
                      </span>
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
                <div class="search" style="text-align: right">
                  <a-button
                    type="primary"
                    size="large"
                    style="margin-right: 10px"
                    @click="search"
                  >
                    <template #icon>
                      <icon-search />
                    </template>

                    <template #default>Search</template>
                  </a-button>
                  <a-button size="large" @click="reload">
                    <template #icon>
                      <icon-refresh />
                    </template>

                    <template #default>Reset</template>
                  </a-button>
                </div>
              </div>
              <div class="contentBox">
                <!-- 第一列图表 -->
                <div class="contentLeft common common1">
                  <div
                    class="leftTop commontitle"
                    style="height: 320px; border: 1px"
                    @click="GotoMainDetail('1', 'PODD Inspection Analysis')"
                  >
                    <div class="headtitle commonflex">PODD Inspection Analysis</div>
                    <div class="common">
                      <dv-border-box-13
                        class="dv-border-box-12"
                        :color="['#0bc0c4', '#0bc0c4']"
                      >
                        <dv-scroll-board
                          :config="POddconfig"
                          class="board-info"
                          style="width: 436px; height: 270px"
                        />
                      </dv-border-box-13>
                    </div>
                  </div>
                  <div class="leftMid common commontitle">
                    <div class="headtitle commonflex">Top 10 Problem</div>
                    <div class="common">
                      <dv-border-box-13
                        class="dv-border-box-12"
                        :color="['#0bc0c4', '#0bc0c4']"
                      >
                        <a-table
                          :columns="columns"
                          :pagination="false"
                          :hoverable="false"
                          :bordered="false"
                          :row-class="tableRowClassName"
                          :data="proDatabledata"
                          size="large"
                        >
                        </a-table>
                      </dv-border-box-13>
                    </div>
                  </div>
                </div>
                <!-- 中间的图表 -->
                <div class="contentMid common1">
                  <div class="midT">
                    <div class="chartTitle">
                      <div
                        :style="[MonthYear ? commoncheck : '']"
                        @click="changeMonthYear(1)"
                      >
                      Monthly Inspection Analysis</div
                      >
                      <div class="midgap"></div>
                      <div
                        :style="[!MonthYear ? commoncheck : '']"
                        @click="changeMonthYear(2)"
                      >
                      Annual Inspection Analysis</div
                      >
                    </div>
                    <!-- 年月度分析表 -->
                    <div style="width: 900px" class="midchart">
                      <div
                        v-if="MonthYear"
                        style="width: 900px; height: 100%"
                        @click="GotoMainDetail('2', '月度验货分析')"
                      >
                        <VCharts
                          ref="monthChart"
                          :option="optionMonth"
                          style="width: 100%; height: 530px"
                        >
                        </VCharts>
                      </div>
                      <div
                        v-if="!MonthYear"
                        style="width: 900px; height: 100%"
                        @click="GotoMainDetail('3', '年度验货分析')"
                      >
                        <VCharts
                          ref="yearChart"
                          :option="yearOption"
                          style="width: 100%; height: 530px"
                        >
                        </VCharts>
                      </div>
                    </div>
                  </div>
                  <div class="midB">
                    <div
                      class="midL common commontitle"
                      @click="GotoMainDetail('4', 'Inspector Analysis')"
                    >
                      <div class="headtitle commonflex">Inspector Analysis</div>
                      <div class="common">
                        <dv-border-box-13
                          class="dv-border-box-12 checkpeople"
                          :color="['#0bc0c4', '#0bc0c4']"
                        >
                          <div>
                            <div
                              style="width: 420px; height: 20px"
                              class="tablerow"
                            >
                              <!-- <p>验货员</p> -->
                              <div
                                style="
                                  display: flex;
                                  flex-direction: row;
                                  justify-content: center;
                                  align-items: center;
                                  margin-right: 10px;
                                "
                              >
                                <div
                                  style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #2aa02e;
                                  "
                                >
                                </div>
                                <p> Qualified </p>
                              </div>
                              <div
                                style="
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                "
                              >
                                <div
                                  style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #f65e52;
                                  "
                                >
                                </div>
                                <p> Fail </p>
                              </div>
                            </div>
                            <dv-scroll-board
                              :config="checkPeople"
                              class="board-info"
                              style="width: 432px; height: 210px"
                            />
                          </div>
                        </dv-border-box-13>
                      </div>
                    </div>
                    <div
                      class="midR common commontitle"
                      @click="GotoMainDetail('5', 'Shipping Country Analysis')"
                    >
                      <div class="headtitle commonflex">Shipping Country Analysis</div>

                      <div class="common">
                        <dv-border-box-13
                          class="dv-border-box-12 checkpeople"
                          :color="['#0bc0c4', '#0bc0c4']"
                        >
                          <div>
                            <div
                              style="width: 420px; height: 20px"
                              class="tablerow"
                            >
                              <!-- <p>国家名</p> -->
                              <div
                                style="
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  margin-right: 10px;
                                "
                              >
                                <div
                                  style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #2aa02e;
                                  "
                                >
                                </div>
                                <p> Qualified </p>
                              </div>
                              <div
                                style="
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                "
                              >
                                <div
                                  style="
                                    width: 10px;
                                    height: 10px;
                                    background-color: #f65e52;
                                  "
                                >
                                </div>
                                <p> Fail </p>
                              </div>
                            </div>

                            <dv-scroll-board
                              :config="checkcountry"
                              class="board-info"
                              style="width: 432px; height: 210px"
                            />
                          </div>
                        </dv-border-box-13>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 右边的图表 -->
                <div class="contentRight common common1">
                  <div
                    class="rightTop common commontitle"
                    @click="GotoMainDetail('6', 'Order Analysis Month')"
                  >
                    <div class="headtitle commonflex">Order Analysis Month</div>
                    <div class="common">
                      <dv-border-box-13
                        class="dv-border-box-12 cmmon1"
                        :color="['#0bc0c4', '#0bc0c4']"
                      >
                        <div class="oder-all">
                          <div class="oderanay">
                            <div class="order-top">
                              <P
                                >{{
                                  monthOrder.monthOrderCount
                                    ? monthOrder.monthOrderCount.toLocaleString(
                                        'zh-CN'
                                      )
                                    : 0
                                }}
                                </P
                              >
                              <P>No. Order Month</P>
                            </div>
                            <div class="order-top">
                              <P
                                >{{
                                  monthOrder.monthOrderSeQty
                                    ? monthOrder.monthOrderSeQty.toLocaleString(
                                        'zh-CN'
                                      )
                                    : 0
                                }}
                                </P
                              >
                              <P>Order Month Inspected</P>
                            </div>
                          </div>
                          <div class="oderanay">
                            <div class="order-mid">
                              <P
                                >{{
                                  monthOrder.monthTotalSeQty
                                    ? monthOrder.monthTotalSeQty.toLocaleString(
                                        'zh-CN'
                                      )
                                    : 0
                                }}
                                </P
                              >
                              <P>Total Order Month</P>
                            </div>
                            <div class="order-mid">
                              <P
                                >{{
                                  monthOrder.monthTotalSeQtyInspected
                                    ? monthOrder.monthTotalSeQtyInspected.toLocaleString(
                                        'zh-CN'
                                      )
                                    : 0
                                }}
                                </P
                              >
                              <P>Total Order Month Inspected</P>
                            </div>
                          </div>
                          <div class="oderanay">
                            <div class="order-bottom">
                              <P
                                >{{
                                  monthOrder.monthCNOrderSeQty
                                    ? monthOrder.monthCNOrderSeQty.toLocaleString(
                                        'zh-CN'
                                      )
                                    : 0
                                }}
                                </P
                              >
                              <P>Order Month from China</P>
                            </div>
                            <div class="order-bottom">
                              <P
                                >{{
                                  monthOrder.monthCNOrderSeQtyInspected
                                    ? monthOrder.monthCNOrderSeQtyInspected.toLocaleString(
                                        'zh-CN'
                                      )
                                    : 0
                                }}
                                </P
                              >
                              <P>Order from China Inspected</P>
                            </div>
                          </div>
                        </div>
                      </dv-border-box-13>
                    </div>
                  </div>

                  <div class="rightTopMid common commontitle">
                    <div class="headtitle commonflex">Inspection Overview</div>
                    <div class="common">
                      <dv-border-box-13
                        class="dv-border-box-12"
                        :color="['#0bc0c4', '#0bc0c4']"
                      >
                        <dv-scroll-ranking-board
                          :config="checkGoodsconfig"
                          class="ranking-info rmidrank"
                          style="width: 350px; height: 220px"
                        />
                      </dv-border-box-13>
                    </div>
                  </div>

                  <div
                    class="rightTopBottom common commontitle"
                    @click="GotoMainDetail('7', 'Factory Inspection Analysis')"
                  >
                    <div class="headtitle commonflex">Factory Inspection Analysis</div>
                    <div class="common">
                      <dv-border-box-13
                        class="dv-border-box-12 checkpeople"
                        :color="['#0bc0c4', '#0bc0c4']"
                      >
                        <div>
                          <div
                            style="width: 420px; height: 20px"
                            class="tablerow"
                          >
                            <!-- <p>国家名</p> -->
                            <div
                              style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 10px;
                              "
                            >
                              <div
                                style="
                                  width: 10px;
                                  height: 10px;
                                  background-color: #2aa02e;
                                "
                              >
                              </div>
                              <p> Qualified </p>
                            </div>
                            <div
                              style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              "
                            >
                              <div
                                style="
                                  width: 10px;
                                  height: 10px;
                                  background-color: #f65e52;
                                "
                              >
                              </div>
                              <p> Fail </p>
                            </div>
                          </div>
                          <dv-scroll-board
                            :config="checkfactory"
                            class="board-info"
                            style="width: 436px; height: 210px"
                          />
                        </div>
                      </dv-border-box-13>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 查看详情 -->
            <div v-if="pageIndex" class="returnDetail">
              <div class="content">
                <div v-if="ispodd" class="buttonrow">
                  <a-button
                    :style="[istoday == 1 ? poddButton : '']"
                    size="large"
                    @click="getPoddDteail(1)"
                    >Today</a-button
                  >
                  <a-button
                    :style="[istoday == 2 ? poddButton : '']"
                    size="large"
                    @click="getPoddDteail(2)"
                    >Week</a-button
                  >
                  <a-button
                    :style="[istoday == 3 ? poddButton : '']"
                    size="large"
                    @click="getPoddDteail(3)"
                    >Month</a-button
                  >
                  <a-button
                    type="primary"
                    status="success"
                    @click="exportInventoryDetail"
                    >Export</a-button
                  >
                </div>
                <a-table
                  :columns="headlist"
                  :data="tableData"
                  :pagination="false"
                  :default-page-size="17"
                  :hoverable="false"
                  :bordered="false"
                  size="large"
                  :row-class="tableRowClassName"
                />
              </div>
              <a-pagination
                :total="dataTotal"
                :page-size-options="[5, 10, 17]"
                show-total
                show-jumper
                show-page-size
                :default-page-size="17"
                class="pagechange"
                :current="currentPage"
                :page-size="pageSize"
                @change="handleCurrentChange"
                @page-size-change="handleSizeChange"
              />
            </div>
          </div>
        </div>
      </div>
    </VScaleScreen>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import { Message } from '@arco-design/web-vue';
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
  } from 'vue';
  import VCharts from 'vue-echarts';
  import * as FileSaver from 'file-saver';
  import ExcelJS from 'exceljs';
  import defaultSettings from '@/config/settings.json';
  import {
    GetPODDInfo,
    GetTop10Issues,
    GetMonthInspectionAnalysis,
    GetYearInspectionAnalysis,
    GetInspectorAnalysis,
    GetDescountryAnalysis,
    GetCrrentMonthOrderInfo,
    GetAQLInspectionOverview,
    GetPlantAnalysis,
    GetCrrentMonthOrderDetail,
  } from '@/api/aeqs';
  import { formatDateTime, formatNowDate } from '@/utils/date';
  import Vheader from './compents/compoents/Vheader.vue';

  const title = ref<string>('AQL Dashboard');
  const pageIndex = ref<boolean>(false);
  const fullscreenLoading = ref<boolean>(true);
  const POddconfig = ref();
  const detailtype = ref('1');
  const currentPage = ref(1);
  const dataTotal = ref(0);
  const pageSize = ref(17);
  const detailList = ref<any>([]);
  const headlist = ref<any>([]);
  const tableData = ref<any>([]);
  const detailDatas = ref<any>([]);
  const scroll = {
    x: 2000,
    y: 830,
  };
  const poddButton = ref<any>({});
  poddButton.value = {
    'background': '#169bd5',
    'color': 'white',
    'font-weight': 'bold',
  };
  const istoday = ref(1);
  POddconfig.value = {
    header: ['SO', 'PO', 'Status', 'Inspection'],
    indexHeader: 'Seri',
    index: true,
    headerHeight: 40,
    columnWidth: [50, 105, 105, 50],
    align: ['center', 'center', 'center', 'center', 'center'],
    data: [],
  };
  const MonthYear = ref<boolean>(true);
  const commoncheck = {
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'background': '#5899e6',
    'height': '17px', // 移除了不必要的分号
  };
  const optionMonth = ref<any>({});
  optionMonth.value = {
    color: ['#b0d399', '#ff0000', '#ffc100'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      iconStyle: {
        color: 'white',
        borderColor: 'white',
      },
      // feature: {
      //   dataView: { show: true, readOnly: false },
      //   magicType: { show: true, type: ['line', 'bar'] },
      //   restore: { show: true },
      //   saveAsImage: { show: true }
      // }
    },
    legend: {
      data: ['Pass', 'Fail', 'Rate'],
      top: 'bottom',
      textStyle: {
        color: '#fff',
        fontSize: '13px',
      },
    },
    xAxis: [
      {
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'normal',
          },
        },
        type: 'category',
        data: [],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        splitLine: {
          show: false,
        },
        type: 'value',
        name: '',
        nameTextStyle: {
          color: 'white',
        },
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#f4f4f4',
            fontSize: '15px',

            fontFamily: 'Arial',
          },
        },
      },
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value} %',
          textStyle: {
            color: '#f4f4f4',
            fontSize: '15px',
            fontFamily: 'Arial',
          },
        },
      },
    ],
    series: [
      {
        name: 'Pass',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}`;
          },
        },
        data: [],
      },
      {
        name: 'Fail',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}`;
          },
        },
        data: [],
      },
      {
        name: 'Rate',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}%`;
          },
        },
        data: [],
      },
    ],
  };
  const yearOption = ref<any>({});
  yearOption.value = {
    title: {
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
    darkMode: true,
    grid: {
      x: 130,
      x2: 70,
      y2: 120,
      // borderWidth:1
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: 'white',
        },
      },
    },
    legend: {
      align: 'right',
      itemgap: '10',
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: '13px',
      },
      bottom: 20,
      left: 20,
      data: ['Pass', 'Fail', 'Rate'],
    },
    xAxis: [
      {
        type: 'category',

        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'normal',
          },
        },
        data: [],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 25, // 向下偏移，使分组文字显示位置不与原x轴重叠
        // axisLine: {
        //   show: false // 隐藏分组x轴的轴线
        // },
        axisTick: {
          length: -105, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: 'white' }, // 非必须，仅为了演示，明显标示出分组刻度线
          // interval: function(index, value) {
          //   return index === 0 || index === 2 || index === 5; // 在0、5、6处各画一条刻度线
          // }
          // interval: 1,
        },
        // min: -30,

        axisLabel: {
          inside: true, // 使刻度名称相对轴线在上面与原x轴相接，默认在轴线下方
          interval: 0, // 强制显示全部刻度名
        },
        data: [''],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 25, // 向下偏移，使分组文字显示位置不与原x轴重叠
        max: 1,

        interval: 1,
        axisTick: {
          length: 0, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: 'white' }, // 非必须，仅为了演示，明显标示出分组刻度线
        },
        axisLabel: {
          inside: true, // 使刻度名称相对轴线在上面与原x轴相接，默认在轴线下方
          interval: 0, // 强制显示全部刻度名
        },
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 50, // 向下偏移，使分组文字显示位置不与原x轴重叠
        interval: 1,
        axisTick: {
          length: 0, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: '#000' }, // 非必须，仅为了演示，明显标示出分组刻度线
        },
        axisLabel: {
          inside: true, // 使刻度名称相对轴线在上面与原x轴相接，默认在轴线下方
          interval: 0, // 强制显示全部刻度名
          textStyle: {
            color: '#f4f4f4',
            fontSize: '12px',
            fontWeight: 'normal',
          },
        },
        data: [],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 75, // 向下偏移，使分组文字显示位置不与原x轴重叠
        interval: 1,
        axisTick: {
          length: 0, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: '#000' }, // 非必须，仅为了演示，明显标示出分组刻度线
        },
        axisLabel: {
          inside: true, // 使刻度名称相对轴线在上面与原x轴相接，默认在轴线下方
          interval: 0, // 强制显示全部刻度名
          textStyle: {
            color: '#f4f4f4',
            fontSize: '12px',
            fontWeight: 'normal',
          },
        },
        data: [],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 105, // 向下偏移，使分组文字显示位置不与原x轴重叠

        interval: 1,
        axisTick: {
          length: 0, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: '#000' }, // 非必须，仅为了演示，明显标示出分组刻度线
        },
        axisLabel: {
          inside: true, // 使刻度名称相对轴线在上面与原x轴相接，默认在轴线下方
          interval: 0, // 强制显示全部刻度名
          textStyle: {
            color: '#f4f4f4',
            fontSize: '12px',
            fontWeight: 'normal',
          },
        },
        data: [],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：个',
        nameTextStyle: {
          color: 'white',
        },
        min: 0,
        max: 200,
        interval: 20,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#f4f4f4',
            fontSize: '14px',
          },
        },
      },
      {
        type: 'value',
        name: '',
        min: 0,
        max: 100,
        // splitNumber: 6,
        interval: 10,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: '{value}%',
          textStyle: {
            color: '#f4f4f4',
            fontSize: '14px',
          },
        },
      },
    ],
    series: [
      {
        name: '合格',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}个`;
          },
        },
        data: [],
        itemStyle: {
          color: '#aed887',
        },
      },

      {
        name: '不合格',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}个`;
          },
        },
        data: [],
        itemStyle: {
          color: '#ff1d00',
        },
      },

      {
        name: '合格率',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}%`;
          },
        },
        data: [],
        itemStyle: {
          color: '#f3b801',
        },
        lineStyle: {
          width: 5,
        },
      },
    ],
  };
  const yearChart = ref('');
  const monthChart = ref('');
  const checkPeople = ref<any>({});
  checkPeople.value = {
    columnWidth: [60, 180, 180],
    oddRowBGC: 'transparent',
    evenRowBGC: 'transparent',
    data: [],
  };
  const checkcountry = ref<any>({});
  checkcountry.value = {
    columnWidth: [60, 180, 180],
    oddRowBGC: 'transparent',
    evenRowBGC: 'transparent',
    data: [],
  };
  const countryPeople = ref<any>({});
  countryPeople.value = {
    data: [],
    total: 0,
  };
  const checkfactory = ref<any>({});
  checkfactory.value = {
    columnWidth: [60, 180, 180],
    oddRowBGC: 'transparent',
    evenRowBGC: 'transparent',
    data: [],
  };
  const countryfactory = ref<any>({});
  countryfactory.value = {
    columnWidth: [60, 180, 180],
    oddRowBGC: 'transparent',
    evenRowBGC: 'transparent',
  };
  const checkGoods = ref<any>({});
  checkGoods.value = {
    data: [],
    total: 0,
  };
  const countryGoods = ref<any>({});
  countryGoods.value = {
    data: [],
    total: 0,
  };
  const checksucessconfig = ref<any>({});
  checksucessconfig.value = {
    sort: false,
    data: [],
    rowNum: 5,
    waitTime: 2000,
    valueFormatter: (params: any) => {
      if (params.percent < 20 && params.percent !== 0) {
        params.percent = 20 + params.percent;
      }

      return params.value;
    },
  };
  const checkfailconfig = ref<any>({});
  checkfailconfig.value = {
    sort: false,
    data: [],
    waitTime: 2000,
    valueFormatter: (params: any) => {
      if (params.percent < 10 && params.percent !== 0) {
        params.percent = 10 + params.percent;
      }
      return params.value;
    },
  };
  const countrysucessconfig = ref<any>({});
  countrysucessconfig.value = {
    sort: false,
    data: [],
    waitTime: 2000,
    valueFormatter: (params: any) => {
      if (params.percent < 20 && params.percent !== 0) {
        params.percent = 20 + params.percent;
      }
      return params.value;
    },
  };
  const countryfailconfig = ref<any>({});
  countryfailconfig.value = {
    sort: false,
    data: [],
    waitTime: 2000,
    valueFormatter: (params: any) => {
      // params.percent = params.value / 140 * 100
      if (params.percent < 10 && params.percent !== 0) {
        params.percent = 10 + params.percent;
      }
      return params.value;
    },
  };
  const monthOrder = ref<any>({});
  monthOrder.value = {
    monthCNOrderSeQty: 0,
    monthCNOrderSeQtyInspected: 0,
    monthOrderCount: 0,
    monthOrderSeQty: 0,
    monthTotalSeQty: 0,
    monthTotalSeQtyInspected: 0,
  };
  const checkGoodsconfig = ref<any>({});
  checkGoodsconfig.value = {
    sort: false,

    data: [],
    valueFormatter: (params: any) => {
      if (params.name === '合格率' || params.name === '不合格率') {
        params.percent = params.value;

        return `${params.value}%`;
      }

      return params.value;
    },
  };
  const proDatabledata = ref<any>([]);
  const searchFrom = ref([
    {
      prop: 'plantType',
      label: '厂区类型',
      type: 'select',
      value: '',
      options: [],
    },
    {
      prop: 'inspector',
      label: '检验员',
      type: 'select',
      value: '',
      options: [],
    },
    {
      prop: 'country',
      label: '出货国家',
      type: 'input',
      value: '',
    },
    {
      prop: 'series',
      label: '系列',
      type: 'input',
      value: '',
    },
    {
      prop: 'problemLevel',
      label: '问题级别',
      type: 'input',
      value: '00',
    },
    {
      prop: 'startTime',
      label: '开始时间',
      type: 'date',
      value: getStartOfMonthFormatted(),
    },
    {
      prop: 'endTime',
      label: '结束时间',
      type: 'date',
      value: getEndOfMonthFormatted(),
    },
  ]);
  function changepageIndex(padgeindex: any) {
    pageIndex.value = padgeindex;
    fullscreenLoading.value = true;
    title.value = 'AQL Analysis';
  }
  const columns = ref<any>([]);
  columns.value = [
    { title: 'Seri', dataIndex: 'ID', align: 'center' },
    {
      title: 'Level',
      dataIndex: 'PROBLEM_LEVEL',
      align: 'center',
      with: 110,
    },
    {
      title: 'Name Item',
      dataIndex: 'BAD_ITEM_NAME',
      align: 'center',
      ellipsis: true,
      tooltip: true,
    },
    {
      title: 'Quanlity',
      dataIndex: 'PROBLEM_COUNT',
      align: 'center',
    },
    {
      title: 'Rate',
      dataIndex: 'RATE',
      align: 'center',
    },
  ];
  const ispodd = ref<boolean>(false);
  const factorysucessconfig = ref<any>({});
  factorysucessconfig.value = {
    sort: false,
    data: [],
    waitTime: 2000,
    valueFormatter: (params: any) => {
      // params.percent = params.value / 140 * 100
      if (params.percent < 20 && params.percent !== 0) {
        params.percent = 20 + params.percent;
      }
      return params.value;
    },
  };
  const factoryfailconfig = ref<any>({});
  factoryfailconfig.value = {
    sort: false,
    waitTime: 2000,
    data: [],
    valueFormatter: (params: any) => {
      // params.percent = params.value / 140 * 100
      if (params.percent < 10 && params.percent !== 0) {
        params.percent = 10 + params.percent;
      }
      return params.value;
    },
  };
  function getStartOfMonthFormatted() {
    const today = new Date();
    // 设置为当月第一天，时间为午夜00:00:00
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0); // 确保时间是当天的最开始

    return formatDateTime(startOfMonth);
  }

  function getEndOfMonthFormatted() {
    const today = new Date();
    // 获取下个月的第一天，然后减去一天，即得到本月最后一天
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // 确保时间设置为当天的最后一秒
    lastDay.setHours(23, 59, 59, 999);
    console.log(lastDay);
    return formatDateTime(lastDay);
  }
  const optionsSelect = reactive([
    {
      value: '00',
      label: 'All',
    },
    {
      value: '0',
      label: 'Major',
    },
    {
      value: '1',
      label: 'Minor',
    },
    {
      value: '2',
      label: 'Serious',
    },
  ]);

  const headORG = computed(() => [
    {
      dataIndex: 'UDF05',
      title: 'Factory',
    },
    {
      dataIndex: 'EN',
      title: 'Name Factory',
    },
  ]);

  const headWORK = computed(() => [
    {
      dataIndex: 'CHECKER',
      title: 'Inspector No.',
    },
    {
      dataIndex: 'STAFF_NAME',
      title: 'Inspector Name',
    },
  ]);

  const headTYPEList = computed(() => [
    {
      dataIndex: 'ORG_CODE',
      title: 'Factory Code',
    },
    {
      dataIndex: 'ORG_NAME',
      title: 'Factory Name',
    },
  ]);

  const CountryList = computed(() => [
    {
      dataIndex: 'C_NO',
      title: 'Country Code',
    },
    {
      dataIndex: 'C_NAME',
      title: 'Country Name',
    },
  ]);

  const DevSeriesList = computed(() => [
    {
      dataIndex: 'CODE_NO',
      title: 'Seri No.',
    },
    {
      dataIndex: 'NAME_T',
      title: 'Seri Name',
    },
  ]);
  const GetPARAMData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem.WORKMANSHIP_NAME);
    });
    searchFrom.value[7].value = data.join(',');
  };
  const GetDevSeriesListData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem);
    });
    searchFrom.value[3].value = data.join(',');
  };
  const GetCountryListData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem);
    });
    searchFrom.value[2].value = data.join(',');
  };
  const GetCQTYPEListData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem.ORG_NAME);
    });
    searchFrom.value[0].value = data.join(',');
  };
  const GetAQLInspector = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem);
    });
    searchFrom.value[1].value = data.join(',');
  };
  const GetShoesListData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem.NAME_T);
    });
    searchFrom.value[6].value = data.join(',');
  };
  const GeArtListData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem.PROD_NO);
    });
    searchFrom.value[5].value = data.join(',');
  };
  const GePOListData = (e: any) => {
    const data: any = [];
    e.forEach((eitem: any) => {
      data.push(eitem.MER_PO);
    });
    searchFrom.value[10].value = data.join(',');
  };
  let PoddTableList: any = [];
  const GeCQListData = (e: any) => {
    const data: any = [];

    e.forEach((eitem: any) => {
      data.push(eitem);
    });
    searchFrom.value[0].value = data.join(',');
    console.log(searchFrom.value[0].value);
  };
  function tableRowClassName(row: any, rowIndex: any) {
    if (rowIndex % 2 === 0) {
      return 'warning-row';
    }
    return 'success-row';
  }
  function setCellColor(params: any) {
    if (params.rowIndex === 0 && params.columnIndex === 3) {
      return 'color:#ce202d';
    }
    if (params.rowIndex === 1 && params.columnIndex === 3) {
      return 'color:#e5822f';
    }
    if (params.rowIndex === 2 && params.columnIndex === 3) {
      return 'color:#ddd221';
    }
    return '';
  }
  function reload() {
    searchFrom.value.forEach((e) => {
      if (e.label === '开始时间') {
        e.value = getStartOfMonthFormatted();
      } else if (e.label === '结束时间') {
        e.value = getEndOfMonthFormatted();
      } else if (e.label === '问题级别') {
        e.value = '00';
      } else {
        e.value = '';
      }
    });
    search();
  }
  async function changeMonthYear(val: any) {
    if (val === 1) {
      MonthYear.value = true;
    } else {
      MonthYear.value = false;
    }
  }
  const getCellStyle = (rowIndex: number) => {
    console.log(rowIndex);
    if (rowIndex === 0) {
      return { color: 'red' };
    }
    if (rowIndex === 1) {
      return { color: 'blue' };
    }
    if (rowIndex === 2) {
      return { color: 'yellow' };
    }
    return {};
  };
  /*
   *PODD验货分析
   */
  const getPODDInfo = async (dataMain: any) => {
    const res = await GetPODDInfo(dataMain);
    const podddt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any) => {
      const itemconfig = [];
      itemconfig[0] = item.SE_ID;
      itemconfig[1] = item.MER_PO;

      if (item.STATUS_COLOR === '0') {
        itemconfig[2] = `<span style="color:#ce202d;">${item.STATUS}</span>`;
      }
      if (item.STATUS_COLOR === '1') {
        itemconfig[2] = `<span style="color:green;">${item.STATUS}</span>`;
      }
      if (item.STATUS_COLOR === '2') {
        itemconfig[2] = `<span style="color:#e5822f;">${item.STATUS}</span>`;
      }
      itemconfig[3] = item.INSPECTION_RATE;
      podddt.push(itemconfig);
    });
    POddconfig.value.data = podddt;
    const tabledt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any) => {
      const detailitem = {
        Seri: item.RN,
        SO: item.SE_ID,
        PoGroup: item.MER_PO,
        PO: item.CUSTOMER_PO,
        PODD: item.PODD,
        Status: item.STATUS,
        inspectionRate: item.INSPECTION_RATE,
        inspector: item.INSPECTOR,
      };
      tabledt.push(detailitem);
    });
    detailDatas.value[1] = tabledt;
  };
  /*
   *前十问题点
   */
  const getTop10Issues = async (dataMain: any) => {
    const res = await GetTop10Issues(dataMain);
    proDatabledata.value = res.data.RetData1.dataTable;
    proDatabledata.value.map((item: any, index: any) => {
      item.RATE = `${item.RATE}%`;
      item.ID = index + 1;
      return item;
    });
  };
  /*
   *验货员分析
   */
  const getInspectorAnalysis = async (dataMain: any) => {
    const res = await GetInspectorAnalysis(dataMain);
    const sucessdt: any[] = [];
    const faildat: any[] = [];
    const sucessdata = res.data.RetData1.HisData.bar[0].data;
    const faildata = res.data.RetData1.HisData.bar[1].data;
    const checkdt: any[] = [];
    res.data.RetData1.HisData.x.map((item: any, index: any) => {
      const checkitem = [
        item,
        res.data.RetData1.HisData.bar[0].data[index],
        res.data.RetData1.HisData.bar[1].data[index],
      ];
      const dataitem = { name: item, value: sucessdata[index] };
      const dataitem1 = { name: item, value: faildata[index] };
      sucessdt.push(dataitem);
      faildat.push(dataitem1);
      checkdt.push(checkitem);
      return item;
    });
    checkdt.map((item: any, index: any) => {
      item[0] = `
          <div style="height:20px;
            line-height:20px;
            overflow:hidden;"
          >
            <span style="color:#ffffff">${item[0]}</span></div>       
          `;

      item[1] = `
          <div style="width:180px;
            display: flex;
            justify-content: flex-end;">
              <div style="width:${(item[1] / 180) * 100 + 10}%;
                background-color:#2aa02e;
                height:20px;
                line-height:20px;
                overflow:hidden;">
                <span style="color:#ffffff">${item[1]}</span></div>  
              </div>
          `;

      item[2] = `
          <div style="width:180px;
            display: flex;
            justify-content: flex-start;margin-left:10px">
              <div style="width:${(item[2] / 180) * 100 + 10}%;
                background-color:#f65e52;
                height:20px;
                line-height:20px;
                overflow:hidden"
              >
                <span style="color:#ffffff">${item[2]}</span></div>     
              </div>  
      `;

      return item;
    });
    checkPeople.value.data = checkdt;
    checksucessconfig.value.data = sucessdt;
    checkfailconfig.value.data = faildat;

    const tabledt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any, index: any) => {
      const detailitem = {
        Seri: index + 1,
        Inspector: item.STAFF_NAME,
        Pass: item.ACCEPT_QTY,
        Fail: item.REJECT_QTY,
        Total: item.SUM_QTY,
        Status: `${item.ACCEPT_RATE_PCT}% `,
      };
      tabledt.push(detailitem);
    });
    detailDatas.value[4] = tabledt;
  };

  /*
   * 月度总览
   */
  const getMonthInspectionAnalysis = async (dataMain: any) => {
    const res = await GetMonthInspectionAnalysis(dataMain);
    const alldata = [
      ...res.data.RetData1.HisData.bar[0].data,
      ...res.data.RetData1.HisData.bar[1].data,
    ];
    optionMonth.value.yAxis[0].max = Math.max(...alldata);
    optionMonth.value.yAxis[0].interval = Math.ceil(
      (Math.max(...alldata) + 10) / 10
    );
    optionMonth.value.xAxis[0].data = res.data.RetData1.HisData.x;
    optionMonth.value.series[0].data = res.data.RetData1.HisData.bar[0].data;
    optionMonth.value.series[1].data = res.data.RetData1.HisData.bar[1].data;
    optionMonth.value.series[2].data = res.data.RetData1.HisData.line[0].data;
    const tabledt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any, index: any) => {
      const detailitem = {
        Seri: index + 1,
        Inspector: item.COMMIT_DATE,
        Pass: item.ACCEPT_QTY,
        Fail: item.REJECT_QTY,
        Total: item.SUM_QTY,
        Status: `${item.ACCEPT_RATE_PCT}% `,
      };
      tabledt.push(detailitem);
    });
    detailDatas.value[2] = tabledt;
  };
  /*
   * 年度验货分析
   */
  const getYearInspectionAnalysis = async (dataMain: any) => {
    const res = await GetYearInspectionAnalysis(dataMain);
    const interval = res.data.RetData1.HisData.x.length;
    const alldata = [
      ...res.data.RetData1.HisData.bar[0].data,
      ...res.data.RetData1.HisData.bar[1].data,
    ];
    yearOption.value.yAxis[0].max = Math.max(...alldata);
    yearOption.value.yAxis[0].interval = Math.ceil(
      (Math.max(...alldata) + 10) / 10
    );
    if (interval > 0) {
      yearOption.value.xAxis[0].max = interval - 1;
      yearOption.value.xAxis[0].interval =
        Math.ceil(interval - 1) / (interval - 1);
      yearOption.value.xAxis[1].max = interval - 1;
      yearOption.value.xAxis[1].interval =
        Math.ceil(interval - 1) / (interval - 1);
      yearOption.value.xAxis[0].data = res.data.RetData1.HisData.x;
      yearOption.value.xAxis[3].data = res.data.RetData1.HisData.bar[0].data;
      yearOption.value.xAxis[4].data = res.data.RetData1.HisData.bar[1].data;
      yearOption.value.xAxis[5].data =
        res.data.RetData1.HisData.line[0].data.map((item: any) => {
          return `${item}%`;
        });
      yearOption.value.series[0].data = res.data.RetData1.HisData.bar[0].data;
      yearOption.value.series[1].data = res.data.RetData1.HisData.bar[1].data;
      yearOption.value.series[2].data = res.data.RetData1.HisData.line[0].data;
      const tabledt: any[] = [];
      res.data.RetData1.dataTable.forEach((item: any, index: any) => {
        const detailitem = {
          Seri: index + 1,
          Inspector: item.COMMIT_DATE,
          Pass: item.ACCEPT_QTY,
          Fail: item.REJECT_QTY,
          Total: item.SUM_QTY,
          Status: `${item.ACCEPT_RATE_PCT}% `,
        };
        tabledt.push(detailitem);
      });
      detailDatas.value[3] = tabledt;
    }
  };
  /*
   * 出货国家分析
   */
  const getDescountryAnalysis = async (dataMain: any) => {
    const res = await GetDescountryAnalysis(dataMain);
    const sucessdt: any[] = [];
    const faildat: any[] = [];
    const countrydt: any[] = [];
    const sucessdata = res.data.RetData1.HisData.bar[0].data;
    const faildata = res.data.RetData1.HisData.bar[1].data;
    res.data.RetData1.HisData.x.map((item: any, index: any) => {
      const countryitem = [
        item,
        res.data.RetData1.HisData.bar[0].data[index],
        res.data.RetData1.HisData.bar[1].data[index],
      ];
      const dataitem = { name: item, value: sucessdata[index] };
      const dataitem1 = { name: item, value: faildata[index] };
      sucessdt.push(dataitem);
      faildat.push(dataitem1);
      countrydt.push(countryitem);
      return item;
    });
    countrydt.map((item, index) => {
      item[0] = `
          <div style="height:20px;line-height:20px;overflow:hidden; text-overflow: ellipsis;">
              <span style="color:#ffffff">${item[0]}</span></div>       
          `;

      item[1] = `
          <div style="width:180px;
      display: flex;
        justify-content: flex-end;">
            <div style="width:${
              (item[1] / 180) * 100 + 10
            }%;background-color:#2aa02e;height:20px;line-height:20px;overflow:hidden;">
              <span style="color:#ffffff">${item[1]}</span></div>  
            </div>
               
          `;

      item[2] = `

            <div style="width:180px;
      display: flex;
        justify-content: flex-start;margin-left:10px">
          <div style="width:${
            (item[2] / 180) * 100 + 10
          }%;background-color:#f65e52;height:20px;line-height:20px;overflow:hidden">
              <span style="color:#ffffff">${item[2]}</span></div>     
              </div>  
          `;
      return item;
    });
    checkcountry.value.data = countrydt;
    countrysucessconfig.value.data = sucessdt;
    countryfailconfig.value.data = faildat;
    const tabledt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any, index: any) => {
      const detailitem = {
        Seri: index + 1,
        Country: item.DESCOUNTRY_NAME,
        Pass: item.ACCEPT_QTY,
        Fail: item.REJECT_QTY,
        Total: item.SUM_QTY,
        Status: `${item.ACCEPT_RATE_PCT}% `,
      };
      tabledt.push(detailitem);
    });
    detailDatas.value[5] = tabledt;
  };
  /*
   *本月订单验货分析
   */
  const getCrrentMonthOrderInfo = async (dataMain: any) => {
    const res = await GetCrrentMonthOrderInfo(dataMain);
    monthOrder.value = { ...res.data.RetData1 };
  };
  /*
   *验货总览
   */
  const getAQLInspectionOverview = async (dataMain: any) => {
    const res = await GetAQLInspectionOverview(dataMain);
    const overviewData = res.data.RetData1;
    checkGoodsconfig.value.data = [
      { name: 'Total Task', value: overviewData.taskNum },
      { name: 'Qualified', value: overviewData.acceptNum },
      { name: 'Fail', value: overviewData.rejectNum },
      { name: 'Pass Rate', value: overviewData.acceptanceRate },
      { name: 'Fail Rate', value: overviewData.rejectionRate },
    ];
  };
  /*
   *厂区验货
   */
  const getPlantAnalysis = async (dataMain: any) => {
    const res = await GetPlantAnalysis(dataMain);
    const sucessdt: any[] = [];
    const faildat: any[] = [];
    const factorydt: any[] = [];
    const sucessdata = res.data.RetData1.HisData.bar[0].data;
    const faildata = res.data.RetData1.HisData.bar[1].data;
    res.data.RetData1.HisData.x.map((item: any, index: any) => {
      const factoryitem = [
        item,
        res.data.RetData1.HisData.bar[0].data[index],
        res.data.RetData1.HisData.bar[1].data[index],
      ];
      const dataitem = { name: item, value: sucessdata[index] };
      const dataitem1 = { name: item, value: faildata[index] };
      sucessdt.push(dataitem);
      faildat.push(dataitem1);
      factorydt.push(factoryitem);
      return item;
    });
    factorysucessconfig.value.data = sucessdt;
    factoryfailconfig.value.data = faildat;
    factorydt.map((item, index) => {
      item[0] = `
          <div style="height:20px;line-height:20px;overflow:hidden; text-overflow:ellipsis">
              <span style="color:#ffffff">${item[0]}</span></div>       
          `;

      item[1] = `
          <div style="width:180px;
      display: flex;
        justify-content: flex-end;">
            <div style="width:${
              (item[1] / 180) * 100 + 10
            }%;background-color:#2aa02e;height:20px;line-height:20px;overflow:hidden;display: flex;justify-content: center">
              <span style="color:#ffffff">${item[1]}</span></div>  
            </div>
               
          `;

      item[2] = `

            <div style="width:180px;
      display: flex;
        justify-content: flex-start;margin-left:10px">
          <div style="width:${
            (item[2] / 180) * 100 + 10
          }%;background-color:#f65e52;height:20px;line-height:20px;overflow:hidden;display: flex;justify-content: center">
              <span style="color:#ffffff">${item[2]}</span></div>     
              </div>  
          `;
      return item;
    });
    checkfactory.value.data = factorydt;
    const tabledt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any, index: any) => {
      const detailitem = {
        Seri: index + 1,
        Plant: item.ORG,
        Pass: item.ACCEPT_QTY,
        Fail: item.REJECT_QTY,
        Total: item.SUM_QTY,
        Status: `${item.ACCEPT_RATE_PCT}% `,
      };
      tabledt.push(detailitem);
    });
    detailDatas.value[7] = tabledt;
  };

  /*
   *本月订单明细
   */
  const getCrrentMonthOrderDetail = async (dataMain: any) => {
    const res = await GetCrrentMonthOrderDetail(dataMain);
    dataTotal.value = res.data.RetData1.total;
    const tabledt: any[] = [];
    headlist.value = [];
    res.data.RetData1.dataTable.forEach((item: any, index: any) => {
      const detailItem = {
        Seri: item.RN,
        Destination: item.DESCOUNTRY_NAME,
        'Total of Month': item.TOTAL_QTY,
        'Total Inspected': item.INSPECTED_QTY,
        'Total UnInspected': item.UNINSPECTED_QTY
      };
      tabledt.push(detailItem);
    });
    if (tabledt.length > 0) {
      dataTotal.value = res.data.RetData1.total;
      const detaildt = tabledt;
      const headt = Object.keys(detaildt[0]).filter((item) => item);
      headt.forEach((item, index) => {
        const headtItem = {
          title: item,
          dataIndex: item,
          ellipsis: true,
          tooltip: true,
          width: 120,
          minWidth: 80,
        };
        headlist.value.push(headtItem);
      });

      tableData.value = tabledt;
    }
  };

  /*
*查看详情

*/

  async function GotoMainDetail(type: any, Itemtitle: any) {
    title.value = Itemtitle;
    pageIndex.value = true;
    detailtype.value = type;
    currentPage.value = 1;
    pageSize.value = 17;
    detailList.value = [];
    tableData.value = [];
    headlist.value = [];
    ispodd.value = false;
    if (type === '1') {
      ispodd.value = true;
      istoday.value = 1;
      const dataMain = {
        time: 'day',
        pageSize: 17,
        pageIndex: 1,
      };
      const res = await GetPODDInfo(dataMain);
      dataTotal.value = res.data.RetData1.total;
      const tabledt: any[] = [];
      res.data.RetData1.dataTable.forEach((item: any) => {
        const detailitem = {
          Seri: item.RN,
          SO: item.SE_ID,
          PoGroup: item.MER_PO,
          PO: item.CUSTOMER_PO,
          PODD: item.PODD,
          Status: item.STATUS,
          inspectionRate: item.INSPECTION_RATE,
          inspector: item.INSPECTOR,
        };
        tabledt.push(detailitem);
      });
      detailDatas.value[1] = tabledt;
      detailList.value = tabledt;
      if (detailDatas.value[1].length > 0) {
        dataTotal.value = res.data.RetData1.total;
        const headt = Object.keys(detailDatas.value[1][0]).filter(
          (item) => item
        );
        headt.forEach((item, index) => {
          const headtItem = {
            title: item,
            dataIndex: item,
            ellipsis: true,
            tooltip: true,
            width: 120,
            minWidth: 80,
          };
          headlist.value.push(headtItem);
        });
        getPageInfo();
      }
    } else if (type === '6') {
      const dataMain = {
        pageIndex: 1,
        pageSize: 17,
      };
      getCrrentMonthOrderDetail(dataMain);
    } else {
      dataTotal.value = detailDatas.value[type].length;
      const detaildt = detailDatas.value[type];
      const headt = Object.keys(detaildt[0]).filter((item) => item);
      headt.forEach((item, index) => {
        const headtItem = {
          title: item,
          dataIndex: item,
          ellipsis: true,
          tooltip: true,
          width: 120,
          minWidth: 80,
        };
        headlist.value.push(headtItem);
      });
      detailList.value = detaildt;
      getPageInfo();
    }
  }
  /*
   *podd明细
   */
  async function getPoddDteail(val: any) {
    PoddTableList = [];
    tableData.value = [];
    headlist.value = [];
    istoday.value = val;
    currentPage.value = 1;
    pageSize.value = 17;

    const dataMain = {
      time: '',
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
    };
    const dataMain1 = {
      pageSize: 9999,
      pageIndex: 1,
      time: '',
    };
    if (val === 1) {
      dataMain.time = 'day';
      dataMain1.time = 'day';
    }
    if (val === 2) {
      dataMain.time = 'week';
      dataMain1.time = 'week';
    }
    if (val === 3) {
      dataMain.time = 'month';
      dataMain1.time = 'month';
    }

    const res = await GetPODDInfo(dataMain);
    const res1 = await GetPODDInfo(dataMain1);

    res1.data.RetData1.dataTable.forEach((item: any) => {
      const detailitem = {
        Seri: item.RN,
        SO: item.SE_ID,
        PoGroup: item.MER_PO,
        PO: item.CUSTOMER_PO,
        PODD: item.PODD,
        Status: item.STATUS,
        inspectionRate: item.INSPECTION_RATE,
        inspector: item.INSPECTOR,
      };
      PoddTableList.push(detailitem);
    });
    dataTotal.value = res.data.RetData1.total;
    const tabledt: any[] = [];
    res.data.RetData1.dataTable.forEach((item: any) => {
      const detailitem = {
        Seri: item.RN,
        SO: item.SE_ID,
        PoGroup: item.MER_PO,
        PO: item.CUSTOMER_PO,
        PODD: item.PODD,
        Status: item.STATUS,
        inspectionRate: item.INSPECTION_RATE,
        inspector: item.INSPECTOR,
      };
      tabledt.push(detailitem);
    });
    if (tabledt.length > 0) {
      dataTotal.value = res.data.RetData1.total;
      const detaildt = tabledt;
      const headt = Object.keys(detaildt[0]).filter((item) => item);
      headt.forEach((item, index) => {
        const headtItem = {
          title: item,
          dataIndex: item,
          ellipsis: true,
          tooltip: true,
          width: 120,
          minWidth: 80,
        };
        headlist.value.push(headtItem);
      });
      detailList.value = tabledt;
      getPageInfo();
    }
  }
  const GetCountryList = async (dataMain: any) => {};
  function getPageInfo() {
    tableData.value = [];

    for (
      let i = (currentPage.value - 1) * pageSize.value;
      i < dataTotal.value;
      i += 1
    ) {
      tableData.value.push(detailList.value[i]);
      if (tableData.value.length === pageSize.value) break;
    }
  }
  async function handleSizeChange(val: any) {
    console.log(`每页 ${val} 条`);
    pageSize.value = val;
    const dataMain = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
    };
    const dataMain1 = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      time: '',
    };

    if (detailtype.value === '1') {
      if (istoday.value === 1) {
        dataMain1.time = 'day';
      }
      if (istoday.value === 2) {
        dataMain1.time = 'week';
      }
      if (istoday.value === 3) {
        dataMain1.time = 'month';
      }
      console.log(ispodd.value);
      if (ispodd.value) {
        const res = await GetPODDInfo(dataMain1);
        console.log(res);
        dataTotal.value = res.data.RetData1.total;
        const tabledt: any[] = [];
        res.data.RetData1.dataTable.forEach((item: any) => {
          const detailitem = {
            Seri: item.RN,
            SO: item.SE_ID,
            PoGroup: item.MER_PO,
            PO: item.CUSTOMER_PO,
            PODD: item.PODD,
            Status: item.STATUS,
            inspectionRate: item.INSPECTION_RATE,
            inspector: item.INSPECTOR,
          };
          tabledt.push(detailitem);
        });
        tableData.value = tabledt;
      }
    } else if (detailtype.value === '6') {
      getCrrentMonthOrderDetail(dataMain);
    } else {
      getPageInfo();
    }
  }
  async function handleCurrentChange(val: any) {
    console.log(`当前页: ${val}`);
    currentPage.value = val;

    const dataMain = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
    };
    const dataMain1 = {
      pageIndex: currentPage.value,
      pageSize: pageSize.value,
      time: '',
    };
    if (istoday.value === 1) {
      dataMain1.time = 'day';
    }
    if (istoday.value === 2) {
      dataMain1.time = 'week';
    }
    if (istoday.value === 3) {
      dataMain1.time = 'month';
    }
    if (detailtype.value === '1') {
      if (ispodd.value) {
        const res = await GetPODDInfo(dataMain1);
        console.log(res);
        dataTotal.value = res.data.RetData1.total;
        const tabledt: any[] = [];
        res.data.RetData1.dataTable.forEach((item: any) => {
          const detailitem = {
            Seri: item.RN,
            SO: item.SE_ID,
            PoGroup: item.MER_PO,
            PO: item.CUSTOMER_PO,
            PODD: item.PODD,
            Status: item.STATUS,
            inspectionRate: item.INSPECTION_RATE,
            inspector: item.INSPECTOR,
          };
          tabledt.push(detailitem);
        });
        tableData.value = tabledt;
      }
    } else if (detailtype.value === '6') {
      getCrrentMonthOrderDetail(dataMain);
      console.log('why');
    } else {
      getPageInfo();
    }
  }
  function search() {
    fullscreenLoading.value = true;
    const dataMain: any = {
      endTime: '',
      startTime: '',
      ui_lan_type: 'zh',
    };
    searchFrom.value.forEach((e: any) => {
      dataMain[e.prop] = e.value || '';
      if (e.prop === 'problemLevel' && e.value === '00') {
        dataMain[e.prop] = '';
      }
      if (e.type === 'daterange' && !e.value) dataMain[e.prop] = [];
    });
    if (dataMain.endTime === '' || dataMain.startTime === '') {
      Message.warning({
        content: 'Please select时间范围',
        duration: 1500,
      });
      fullscreenLoading.value = false;
    }
    const start = dataMain.startTime.replace(/-/g, '/');
    const end = dataMain.endTime.replace(/-/g, '/');
    if (Date.parse(start) > Date.parse(end)) {
      Message.warning({
        duration: 1500,
        content: '请正确选择时间范围',
      });
      fullscreenLoading.value = false;
    }

    dataMain.ui_lan_type = 'zh';

    getTop10Issues(dataMain);
    getMonthInspectionAnalysis(dataMain);
    getYearInspectionAnalysis(dataMain);
    getInspectorAnalysis(dataMain);
    getDescountryAnalysis(dataMain);
    getCrrentMonthOrderInfo(dataMain);
    getAQLInspectionOverview(dataMain);
    getPlantAnalysis(dataMain);
  }
  // 导出excel的方法
  function exportToExcel(Pocolumns: any, datas: any, fileName: string) {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook();
    // 添加工作表，名为sheet1
    const sheet1 = workbook.addWorksheet('sheet1');
    // 添加表头列数据
    sheet1.columns = Pocolumns;
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
  function exportInventoryDetail() {
    // 添加表头列数据
    const Poddcolumns = [
      { header: 'Seri', key: 'Seri', width: 10 },
      { header: 'SO', key: 'SO', width: 12 },
      { header: 'PO Group', key: 'PoGroup', width: 15 },
      { header: 'PO', key: 'PO', width: 15 },
      { header: 'PODD', key: 'PODD', width: 50 },
      { header: 'Status', key: 'Status', width: 15 },
      { header: 'Inspection Rate', key: 'inspectionRate', width: 15 },
      { header: 'Inspector', key: 'inspector', width: 20 },
    ];
    // 将时间字符串拼接到文件名中
    const fileName = `PODD Inspection Analysis ${formatNowDate('yyyyMMddHHmmss')}.xlsx`;
    exportToExcel(Poddcolumns, PoddTableList, fileName);
  }
  // function InsertReportLog(param: any) {
  //   const data = {
  //     DllName: 'SJ_KanBanAPI',
  //     ClassName: 'SJ_KanBanAPI.Common',
  //     Method: 'InsertReportLog',
  //     IP4: '',
  //     MAC: 'MAC',
  //     IsRasRequst: false,
  //     IsRasResult: false,
  //     RasResultKey: '',
  //     UserToken: localStorage.getItem('token') as string,
  //     Data: param,
  //   };
  //   const base = defaultSettings.api_url.substring(
  //     0,
  //     defaultSettings.api_url.indexOf('CommonCall')
  //   );
  //   const apiurl = `${base}Log/InsertLog`;
  //   console.log(apiurl);
  //   const result = axios.post(apiurl, data);
  //   console.log(result);
  // }
  onMounted(() => {
    const dataMain = {
      time: 'day',
      pageSize: 9999,
      pageIndex: 1,
    };
    const dic = {
      platform: navigator.appVersion,
      report_name: 'aqlAnalysis',
      type: 'created',
    };
    // InsertReportLog(dic);
    getPODDInfo(dataMain);
    search();
  });

  onBeforeUnmount(() => {
    const dic = {
      platform: navigator.appVersion,
      report_name: 'aqlAnalysis',
      type: 'destroyed',
    };
    // InsertReportLog(dic);
  });
</script>

<style lang="less" scoped>
  .full {
    background-image: linear-gradient(to top, #000e1c, #083a52);
    background-size: cover;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  .container {
    background-size: cover;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, #000e1c, #083a52);
  }

  .container_outside {
    background-image: url(../../../assets/images/bgmain.png);
    position: fixed;
    /* 固定背景，防止滚动 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    /* 图片居中 */
    background-repeat: no-repeat;
    /* 不重复背景图片 */
    background-size: cover;
  }

  .feedbackContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    display: flex;
    flex-direction: column;
    color: #fff;
    height: 100%;
    padding-top: 10px;
    padding-left: 17px;
    padding-right: 17px;
    padding-bottom: 20px;

    .searchContainer {
      display: flex;
      font-size: 15px;
      align-items: flex-start;
      margin-bottom: 15px;
      padding-left: 40px;
      padding-top: 20px;
      padding-right: 20px;

      .searchbox {
        width: 80%;

        :deep(.arco-descriptions-item-label-block) {
          color: white;
          font-size: 15px;
        }

        :deep(.arco-input-wrapper) {
          background-color: transparent;
          border: 1px solid #015478;
          color: white;
          height: 35px;
        }

        :deep(.arco-select-view-single) {
          background-color: transparent;
          border: 1px solid #015478;
          color: white;
        }

        :deep(.arco-picker) {
          background-color: transparent;
          border: 1px solid #015478;
        }

        :deep(.arco-picker input) {
          color: white;
        }

        :deep(.arco-descriptions-item-value-block) {
          color: white;
        }

        .iclass-text-ellipsis {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .searchbox ::v-deep .el-form .el-form-item__label {
      color: #fff;
    }

    .contentBox {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: row;
      font-size: 15px;
      padding-top: 0px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 10px;

      .dv-border-box-12 {
        width: 100%;
        height: 100%;
        padding-top: 17px;
        padding-left: 13px;
        box-sizing: border-box;

        .board-info {
          box-sizing: border-box;

          :deep(.header-item) {
            font-size: 13px;
          }

          :deep(.rows .index) {
            background-color: transparent !important;
          }

          :deep(.rows .row-item) {
            font-size: 13px !important;
            //align-items: end
          }

          :deep(.rows .row-item .ceil) {
            padding: 0 !important;
          }

          :deep(.header .header-item) {
            padding: 0 !important;
            font-weight: bolder;
          }
        }
      }

      :deep(.arco-table-container) {
        width: 96%;
      }

      :deep(.arco-table-th) {
        background-color: #00baff;
        color: white;
        height: 40px;
        font-weight: bolder;
        font-size: 13px;
      }
    }
  }

  .common {
    flex: 1;
    //border: 1px solid black;
  }

  .common1 {
    display: flex;
    flex-direction: column;
  }

  .contentMid {
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 100%;

    .midT {
      height: 67%;

      .chartTitle {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.5rem;
      }

      .midgap {
        width: 3px;
        height: 17px;
        margin-left: 5px;
        margin-right: 5px;
        background-color: #69b0ee;
      }

      .midchart {
        // border: 1px solid white;
        margin-left: 2px;
        height: 11.5rem;
      }
    }

    .midB {
      display: flex;
      height: 33%;
      flex-direction: row;
      font-size: 13px;
      color: white;
      text-align: center;

      .midL {
        display: flex;
        width: 100%;
        line-height: 1;

        .ipBox1 {
          width: 65%;
          height: 95%;

          display: flex;
          flex-direction: column;

          .ipTop {
            height: 70%;

            background: #e69a03;
          }

          .ipBot {
            height: 30%;
            background: #e65c2f;
          }
        }

        .ipBox2 {
          width: 35%;
          display: flex;
          flex-direction: column;
          height: 95%;

          .ipTop2 {
            height: 70%;

            display: flex;
            flex-direction: column;
          }

          .iptop2T {
            height: 50%;

            background: #06c7e8;
          }

          .ipTOp2B {
            width: 100%;
            height: 50%;
            display: flex;

            .ipTop2BL {
              width: 50%;

              background: #0268e5;
            }

            .ipTop2BR {
              width: 50%;
              background: #008be7;
            }
          }

          .ipBot2 {
            display: flex;
            width: 100%;
            height: 30%;
            flex-direction: row;

            .ipBotL {
              background: #8b665c;
            }

            .ipBotM {
              background: #aa938c;
            }

            .ipBotR {
              background: #5cb8b9;
            }
          }
        }
      }

      .midR {
        display: flex;
        width: 100%;
        line-height: 1;

        .midrR {
        }
      }
    }
  }

  .commontitle {
    display: flex;
    height: 100%;
    flex-direction: column;

    .headtitle {
      //height: 10%;
      margin: 0;
      line-height: 1;
      font-size: 13px;
    }
  }

  .commonflex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :deep(tr.arco-table-tr.success-row) {
    background: #0a2732;
    color: white;
  }

  :deep(tr.arco-table-tr.warning-row) {
    background: #003b51;
    color: white;
  }

  :deep(.arco-table-td) {
    background-color: transparent;
    color: white;
    border-bottom: 0px;
  }

  .tablerow {
    line-height: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 13px;
  }

  .midB {
    display: flex;
    height: 33%;
    flex-direction: row;
    font-size: 13px;
    color: white;
    text-align: center;

    .midR {
      display: flex;
      width: 100%;
      line-height: 1;

      .midrR {
      }
    }
  }

  .ranking-info {
    box-sizing: border-box;

    :deep(.row-item .ranking-info) {
      font-size: 13px;
    }

    :deep(.row-item .ranking-info .rank) {
      color: white;
    }

    :deep(.row-item .ranking-info .ranking-value) {
      white-space: pre-wrap;
    }

    // :deep(.row-item:nth-of-type(2) .ranking-info .ranking-value) {
    //   color: orange;

    // }

    // :deep(.row-item:nth-of-type(3) .ranking-info .ranking-value) {
    //   color: yellow;

    // }

    :deep(.row-item .ranking-column) {
      margin: 0;
      border-bottom: 0px;
      margin-top: 5px;
      border-radius: 0px;
    }

    // :deep(.row-item .ranking-column .inside-column) {
    //   height: 0.5rem;
    //   margin-bottom: 0;
    //   background-image: linear-gradient(to right, #d199a4, #83e5e8);
    //   ;

    // }
  }

  .commonranking {
    :deep(.row-item .ranking-column) {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 180px;
      margin-top: -15px;
      margin-left: 50px;
    }

    :deep(.row-item .ranking-info .ranking-value) {
      margin-right: 0.3rem;
    }

    :deep(.row-item .ranking-info) {
      z-index: 1;
    }
  }

  .commonrankingR {
    :deep(.row-item .ranking-column) {
      //display: flex;
      //flex-direction: row;

      width: 180px;
      margin-top: -15px;
      //margin-left: 1.3rem;
      //border: 0.1px solid white;
    }

    :deep(.row-item .ranking-info) {
      z-index: 1;
    }
  }

  .checkpeople {
    width: 100%;
    display: flex;
    flex-direction: column;

    :deep(.row-item .ranking-info) {
      font-size: 13px;
    }

    :deep(.row-item .ranking-column .inside-column) {
      border-radius: 0;
      background-color: #2aa02e;
      height: 20px;
      background-image: linear-gradient(to right, #46df41, #46df41);
    }

    :deep(.row-item .ranking-info .rank) {
      display: none;
    }

    :deep(.row-item .ranking-info .info-name) {
      display: flex;
    }

    .checkR {
      :deep(.row-item .ranking-info .info-name) {
        //visibility: hidden
        display: none;
      }

      :deep(.row-item .ranking-column .inside-column .shine) {
        height: 0rem;
      }

      :deep(.row-item .ranking-column .inside-column) {
        border-radius: 0;
        background-color: #f65e52;
        background-image: linear-gradient(to right, #f65e52, #f65e52);
      }
    }

    .commonc {
      flex: 1;
      //border: 1px solid black;
    }
  }

  .oder-all {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    font-size: 15px;
    font-weight: bolder;

    p {
      margin: 0;
      line-height: 2;
    }

    .oderanay {
      display: flex;
      width: 100%;
      height: 63px;
      align-content: space-around;
      justify-content: space-around;
      flex-direction: row;

      .order-top {
        background: linear-gradient(to bottom right, #87ceeb, #0074d9);
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .order-mid {
        background: linear-gradient(to bottom right, #87ceeb, blue);
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .order-bottom {
        background: linear-gradient(to bottom right, #c5a3a6, #f5af81);
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .rmidrank {
    :deep(.row-item .ranking-info .rank) {
      display: none;
    }

    :deep(.row-item .ranking-info .info-name) {
      display: flex;
    }

    :deep(.row-item .ranking-column .inside-column .shine) {
      height: 0rem;
    }

    :deep(.row-item:nth-of-type(1) .ranking-column .inside-column) {
      height: 15px;
      background-image: linear-gradient(to right, #814bb8, #e0517f);
    }

    :deep(.row-item:nth-of-type(2) .ranking-column .inside-column) {
      height: 15px;
      background-image: linear-gradient(to right, #73b803, #edf601);
    }

    :deep(.row-item:nth-of-type(3) .ranking-column .inside-column) {
      height: 15px;
      background-image: linear-gradient(to right, #990c00, #990c00);
    }

    :deep(.row-item:nth-of-type(4) .ranking-column .inside-column) {
      height: 15px;
      background-image: linear-gradient(to right, #73b803, #edf601);
    }

    :deep(.row-item:nth-of-type(5) .ranking-column .inside-column) {
      height: 15px;
      background-image: linear-gradient(to right, #990c00, #990c00);
    }
  }

  .returnDetail {
    display: flex;
    justify-content: center;

    :deep(.arco-btn-primary.arco-btn-status-success) {
      height: 35px;
      width: 100px;
      margin-left: 10px;
    }

    .buttonrow {
      display: flex;

      :deep(.arco-btn-size-large) {
        height: 35px;
        width: 100px;
        font-weight: bold;
      }

      margin-bottom: 10px;
    }

    :deep(.arco-pagination-list) {
      background-color: white;
    }

    .content {
      display: flex;
      width: 95%;
      padding-top: 40px;
      justify-content: center;
      direction: row;
      height: 100%;
    }

    :deep(.arco-table-th) {
      background-color: #0c244d;
      color: white;
    }

    :deep(.arco-pagination-total) {
      color: white;
    }

    :deep(.arco-table-td) {
      background-color: transparent;
      color: white;
      border-bottom: 0px;
      height: 48px;
    }

    :deep(.arco-pagination-jumper-text-goto, .arco-pagination-jumper-prepend, .arco-pagination-jumper-append) {
      color: white;
    }

    .pagechange {
      position: absolute;
      bottom: 40px;
      right: 100px;
    }
  }

  .leftMid {
    :deep(.arco-table-tr:nth-of-type(1) .arco-table-td:nth-of-type(4)) {
      color: red;
    }

    :deep(.arco-table-tr:nth-of-type(2) .arco-table-td:nth-of-type(4)) {
      color: #c05751;
    }

    :deep(.arco-table-tr:nth-of-type(3) .arco-table-td:nth-of-type(4)) {
      color: yellow;
    }
  }
</style>
