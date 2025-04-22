<template>
  <dv-full-screen-container class="full">
    <VScaleScreen width="1920" height="1080" :full-screen="true">
      <div class="container">
        <div class="container_outside">
          <div class="feedbackContainer">
            <!-- 头部 -->
            <Vheader
              :title-msg="title"
              :pageIndex="pageIndex"
              @changepageIndex="changepageIndex"
            ></Vheader>
            <div class="content" v-if="!pageIndex">
              <!-- 搜索框 -->
              <div class="searchContainer">
                <div class="searchbox">
                  <a-form :model="form">
                    <a-row :gutter="16">
                      <a-col :span="6">
                        <a-form-item
                          field="category"
                          label="Category"
                          label-col-flex="100px"
                        >
                          <a-input
                            v-model="form.category"
                            placeholder="请输入Category"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="6">
                        <a-form-item
                          field="shoesType"
                          label="鞋型名称"
                          label-col-flex="80px"
                        >
                          <a-input
                            v-model="form.shoesType"
                            placeholder="请输入鞋型名称"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="6">
                        <a-form-item
                          field="art"
                          label="ART"
                          label-col-flex="80px"
                        >
                          <a-input v-model="form.art" placeholder="请输入ART" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="6">
                        <a-form-item
                          field="noShshoes"
                          label="新鞋/旧鞋 "
                          label-col-flex="100px"
                        >
                          <a-select
                            v-model="form.noShshoes"
                            placeholder="请选择活动区域"
                          >
                            <a-option label="全部" value="全部"></a-option>
                            <a-option label="新鞋" value="新鞋"></a-option>
                            <a-option label="旧鞋" value="旧鞋"></a-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="6">
                        <a-form-item
                          field="returnReason"
                          label="主要退货原因"
                          label-col-flex="100px"
                        >
                          <a-input
                            v-model="form.returnReason"
                            placeholder="请输入主要退货原因"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="6">
                        <a-form-item
                          field="productDate"
                          label="生产月份"
                          label-col-flex="80px"
                        >
                          <a-month-picker
                            placeholder="选择日期"
                            v-model="form.productDate"
                            format="YYYY-MM"
                            style="width: 100%"
                          ></a-month-picker>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="退货月份" required>
                          <a-col :span="11">
                            <a-month-picker
                              placeholder="----年~月"
                              v-model="form.returnDate1"
                              field="returnDate1"
                              format="YYYY-MM"
                              style="width: 100%"
                              :rules="{
                                required: true,
                                message: '退货日期不能为空',
                                trigger: 'blur',
                              }"
                            ></a-month-picker>
                          </a-col>
                          <a-col
                            class="line"
                            :span="2"
                            style="display: flex; justify-content: center"
                            >-</a-col
                          >
                          <a-col :span="11">
                            <!-- <a-date-picker></a-date-picker> -->
                            <a-month-picker
                              placeholder="----年~月"
                              v-model="form.returnDate2"
                              field="returnDate2"
                              format="YYYY-MM"
                              style="width: 100%"
                            ></a-month-picker>
                          </a-col>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>
                <div class="searchButton">
                  <a-button
                    type="primary"
                    style="width: 140px; height: 40px"
                    @click="getMainContent()"
                    >查询</a-button
                  >
                  <a-button
                    type="primary"
                    style="width: 140px; height: 40px"
                    @click="reSet"
                    >重置查询</a-button
                  >
                </div>
              </div>
              <!-- 内容 -->
              <div class="contentBox">
                <!-- 第一列图表 -->
                <div class="contentLeft common common1">
                  <div
                    class="leftTop commontitle"
                    @click="GotoMainDetail(1, '退货主要原因明细')"
                  >
                    <div class="headtitle commonflex">退货主要原因</div>
                    <div class="common">
                      <dv-border-box-13 class="dv-border-box-12">
                        <dv-scroll-board
                          :config="config"
                          class="board-info"
                          style="height: 240px"
                        ></dv-scroll-board>
                      </dv-border-box-13>
                    </div>
                  </div>
                  <div class="leftMid commontitle">
                    <div class="headtitle commonflex">退货Catergory占比</div>
                    <div class="common">
                      <dv-border-box-13 class="dv-border-box-12 commonflex">
                        <VCharts
                          :option="returnOption"
                          style="width: 100%; height: 240px"
                        ></VCharts>
                      </dv-border-box-13>
                    </div>
                  </div>
                  <div
                    class="leftBottom commontitle"
                    @click="GotoMainDetail(2, '退货ART明细')"
                  >
                    <div class="headtitle commonflex">退货前十ART</div>
                    <div class="common">
                      <dv-border-box-13 class="dv-border-box-12 commonflex">
                        <VCharts
                          :option="reaturnLead"
                          style="width: 100%; height: 240px"
                        ></VCharts>
                      </dv-border-box-13>
                    </div>
                  </div>
                </div>
                <!-- 中间的图表 -->
                <div class="contentMid common1">
                  <div class="midT">
                    <VCharts
                      :option="reaturnProOption"
                      style="width: 100%; height: 570px"
                    ></VCharts>
                  </div>
                  <div class="midB">
                    <div class="midL common commontitle">
                      <div class="headtitle commonflex">厂区退货数量</div>
                      <div class="common">
                        <dv-border-box-13 class="dv-border-box-12">
                          <VCharts
                            :option="factoryoption"
                            style="width: 100%; height: 240px"
                          ></VCharts>
                        </dv-border-box-13>
                      </div>
                    </div>
                    <div class="midR common commontitle">
                      <div class="headtitle commonflex">新旧鞋占比</div>
                      <div class="common">
                        <dv-border-box-13 class="dv-border-box-12 commonflex">
                          <div class="midrL commonflex common">
                            <VCharts
                              :option="newShoeProOption"
                              style="width: 100%; height: 240px"
                            ></VCharts>
                          </div>
                          <div class="midrR commonflex common">
                            <VCharts
                              :option="oldShoeProOption"
                              style="width: 100%; height: 240px"
                            ></VCharts>
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
                    @click="GotoMainDetail(3, '生产线退货明细')"
                  >
                    <div class="headtitle commonflex">生产线退货数量</div>

                    <div class="common">
                      <dv-border-box-13 class="dv-border-box-12 cmmon1">
                        <div>
                          <div
                            style="
                              width: 380px;
                              height: 20px;
                              background-color: rgb(0, 186, 255);
                            "
                            class="tablerow"
                          >
                            <p>排名</p>
                            <p>组别</p>
                            <p>数量和占比</p>
                          </div>

                          <dv-scroll-ranking-board
                            :config="reproConfig"
                            class="ranking-info"
                            style="width: 350px; height: 220px"
                          />
                        </div>
                      </dv-border-box-13>
                    </div>
                  </div>
                  <div
                    class="rightTopMid common commontitle"
                    @click="GotoMainDetail(4, '鞋型退货明细')"
                  >
                    <div class="headtitle commonflex">鞋型退货数量</div>
                    <div class="common">
                      <dv-border-box-13 class="dv-border-box-12">
                        <div>
                          <div
                            style="
                              width: 380px;
                              height: 20px;
                              background-color: rgb(0, 186, 255);
                            "
                            class="tablerow"
                          >
                            <p>排名</p>
                            <p>鞋型</p>
                            <p>数量和占比</p>
                          </div>
                          <dv-scroll-ranking-board
                            :config="shoesTypeConfig"
                            class="ranking-info midRanking"
                            style="width: 350px; height: 220px"
                          />
                        </div>
                      </dv-border-box-13>
                    </div>
                  </div>
                  <div
                    class="rightTopBottom common commontitle"
                    @click="GotoMainDetail(5, '鞋型退货率')"
                  >
                    <div class="headtitle commonflex">鞋型退货率</div>
                    <div class="common">
                      <dv-border-box-13 class="dv-border-box-12">
                        <div>
                          <div
                            style="
                              width: 380px;
                              height: 20px;
                              background-color: rgb(0, 186, 255);
                            "
                            class="tablerow"
                          >
                            <p>排名</p>
                            <p>鞋型</p>
                            <p>占比</p>
                          </div>
                          <dv-scroll-ranking-board
                            :config="shoesTypepro"
                            class="ranking-info BotRanking"
                            style="width: 350px; height: 220px"
                          />
                        </div>
                      </dv-border-box-13>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="returnDetail" v-if="pageIndex">
              <div class="content">
                <a-table
                  :columns="headlist"
                  :data="tableData"
                  :pagination="false"
                  :default-page-size="17"
                  :hoverable="false"
                  :bordered="false"
                  :row-class="tableRowClassName"
                  style="width: 100%"
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
  import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
  import VCharts from 'vue-echarts';
  import axios from 'axios';
  import defaultSettings from '@/config/settings.json';
  import { GetContent, GetYearReturn, GetDetailContent } from '@/api/aeqs';
  import Vheader from './compents/compoents/Vheader.vue';

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1，并确保两位数格式
    return `${year}-${month}`;
  }
  function getCurrentMonth() {
    const today = new Date();
    return formatDate(new Date(today.getFullYear(), today.getMonth())); // 返回当前月份的第一天
  }
  const title = ref<string>('中国市场退货分析');
  let shoesReturnCount = 0;

  const form = ref({
    category: '',
    shoesType: '',
    art: '',
    noShshoes: '全部',
    returnReason: '',
    productDate: '',
    detail_type: '',
    title: '',
    returnDate1: formatDate(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() - new Date().getMonth()
      )
    ),
    returnDate2: getCurrentMonth(),
  });
  const pageIndex = ref<boolean>(false);
  const config = reactive({
    header: ['退货原因', '退货数量'],
    indexHeader: '序号',
    index: true,
    evenRowBGC: '#0A2732',
    oddRowBGC: '#0A2732',
    headerHeight: 20,
    columnWidth: [50, 240],
    align: ['center', 'center', 'center'],
    data: [],
  });
  const returnOption = reactive({
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return params.data.name;
      },
    },
    legend: {
      pageTextStyle: {
        color: 'white',
      },
      pageIconInactiveColor: 'white',
      type: 'scroll',
      icon: 'square',
      right: 0,
      orient: 'vertical',
      top: 'middle',
      textStyle: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '90%'],
        center: ['30%', '50%'],
        itemStyle: {
          borderRadius: 1,
        },
        data: [],
        label: {
          normal: {
            show: true,
            position: 'center',
            color: 'white',
            formatter: '退货数量\n50%',
          },
          emphasis: {
            show: true,
          },
        },
      },
    ],
  });
  const reaturnLead = reactive<any>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      formatter: (params: any) => {
        return `${params[0].name} :${params[0].value}`;
      },
      textStyle: {
        fontSize: 12,
      },
    },
    xAxis: {
      data: [''],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: 'white',
        fontSize: 12,
        overflow: 'truncate',
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    color: ['#f76636'],
    grid: {
      y: 20,
      y2: 20,
    },
    series: [
      {
        label: {
          show: true,
          position: 'top',
          fontSize: 20,
          opacity: 1,
          formatter: (params: any) => {
            let color;
            switch (params.dataIndex) {
              case 0:
                color = 'red';
                break;
              case 1:
                color = 'orange';
                break;
              case 2:
                color = 'yellow';
                break;
              default:
                color = 'white';
            }
            return `{${color}|${params.value}}`;
          },
          rich: {
            red: { color: 'red' },
            orange: { color: 'orange' },
            yellow: { color: 'yellow' },
            white: { color: 'white' },
          },
        },
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',

        itemStyle: {
          opacity: 0.7,
        },
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },

        data: [],
        z: 10,
      },
    ],
  });

  const reaturnProOption = reactive<any>({
    title: {
      text: '年退货数量',
      left: 'center',
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: '15px',
        fontWeight: 'normal',
        color: 'white',
        height: 100,
      },
    },
    darkMode: true,
    grid: {
      x: 130,
      x2: 70,
      y2: 140,
      borderWidth: 1,
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
        color: 'white',
        fontSize: '13px',
        fontWeight: 'normal',
        fontFamily: 'Microsoft YaHei',
      },
      bottom: 15,
      left: 0,
      data: [
        '去年退货数量',
        '今年退货数量',
        '去年中国区占比',
        '今年中国区占比',
      ],
    },
    xAxis: [
      {
        type: 'category',
        max: 11,
        interval: Math.ceil(11) / 11,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'white',
            fontSize: '13px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
        data: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 25, // 向下偏移，使分组文字显示位置不与原x轴重叠
        // axisLine: {
        //   show: false // 隐藏分组x轴的轴线
        // },
        axisTick: {
          length: -130, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: 'white' }, // 非必须，仅为了演示，明显标示出分组刻度线
          // interval: function(index, value) {
          //   return index === 0 || index === 2 || index === 5; // 在0、5、6处各画一条刻度线
          // }
          // interval: 1,
        },
        // min: -30,
        max: 11,
        interval: 1,
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

        interval: Math.ceil(11) / 11,
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
        max: 11,

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
            color: 'white',
            fontSize: '13px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
        data: [22, 18, 50, 26, 80, 40, 33, 10, 12, 55, 11, 60],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 75, // 向下偏移，使分组文字显示位置不与原x轴重叠
        max: 11,
        interval: Math.ceil(12) / 12,
        axisTick: {
          length: 0, // 延长刻度线做分组线
          inside: true, // 使刻度线相对轴线在上面与原x轴相接，默认在轴线下方
          lineStyle: { color: '#000' }, // 非必须，仅为了演示，明显标示出分组刻度线
        },
        axisLabel: {
          inside: true, // 使刻度名称相对轴线在上面与原x轴相接，默认在轴线下方
          interval: 0, // 强制显示全部刻度名
          textStyle: {
            color: 'white',
            fontSize: '13px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
        data: [11.5, 10, 22, 20, 30, 40, 30, 44, 55, 60, 60, 0],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 105, // 向下偏移，使分组文字显示位置不与原x轴重叠
        max: 11,
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
            color: 'white',
            fontSize: '13px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
        data: [],
      },
      {
        position: 'bottom', // 将分组x轴位置定至底部，不然默认在顶部
        offset: 130, // 向下偏移，使分组文字显示位置不与原x轴重叠
        max: 11,
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
            color: 'white',
            fontSize: '13px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
        data: [],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：双',
        nameTextStyle: {
          color: 'white',
        },
        min: 0,
        max: 100,
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
          formatter: '{value}',
          textStyle: {
            color: 'white',
            fontSize: '14px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
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
            color: 'white',
            fontSize: '14px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
      },
    ],
    series: [
      {
        name: '去年退货数量',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: any) => {
            return `${value}双`;
          },
        },
        data: [],
        itemStyle: {
          color: '#b5d2ec',
        },
      },
      {
        name: '今年退货数量',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: any): string => {
            return `${value}双`;
          },
        },
        data: [12.5, 10, 22, 20, 30, 40, 30, 44, 55, 60, 60, 0],
        itemStyle: {
          color: '#f4b183',
        },
      },
      {
        name: '去年中国区占比',
        yAxisIndex: 1,
        type: 'line',
        tooltip: {
          valueFormatter: (value: any): string => {
            return `${value}双`;
          },
        },
        data: [],
        itemStyle: {
          color: '#70ad47',
        },
        lineStyle: {
          width: 5,
        },
      },
      {
        name: '今年中国区占比',
        type: 'line',
        tooltip: {
          valueFormatter: (value: any): string => {
            return `${value}%`;
          },
        },
        yAxisIndex: 1,
        data: [],
        itemStyle: {
          color: '#fcbe01',
        },
        lineStyle: {
          width: 5,
          dashOffset: 5,
        },
      },
    ],
  });
  const newShoeProOption = reactive<any>({
    color: ['#0c2968', '#ff3399'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '95%'],
        avoidLabelOverlap: false,

        labelLine: {
          show: false,
        },
        data: [
          { value: 0, name: '旧鞋' },
          { value: 0, name: '新鞋' },
        ],
        emphasis: {
          label: {
            show: false,
          },
        },
        label: {
          normal: {
            show: true,
            position: 'center',
            fontSize: 15,
            color: 'white',
            formatter: '新鞋\n0%',
          },
          emphasis: {
            show: true,
          },
        },
      },
    ],
  });
  const oldShoeProOption = reactive<any>({
    color: ['#ff3399', '#0c2968'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '95%'],
        avoidLabelOverlap: false,

        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 0, name: '旧鞋' },
          { value: 0, name: '新鞋' },
        ],
        label: {
          normal: {
            show: true,
            position: 'center',
            fontSize: 15,
            color: 'white',
            formatter: '旧鞋\n0%',
          },
          emphasis: {
            show: true,
          },
        },
      },
    ],
  });
  let factoryoption = reactive<any>({
    tooltip: {
      trigger: 'item', // 触发类型，默认为数据项触发
      formatter: (info: any) => {
        // 返回提示框显示的内容
        return info.name;
      },
    },
    levels: [
      // 设置最底层（叶子节点）的样式
      {
        minSize: 120, // 设置最小节点的最小尺寸，单位为px
      },
    ],
    series: [
      {
        type: 'treemap',
        width: '98%',
        height: '98%',
        label: {
          show: true,
        },
        breadcrumb: {
          show: false,
        },

        data: [
          {
            children: [],
          },
        ],
      },
    ],
  });
  const reproConfig = reactive<any>({
    data: [],
    valueFormatter: ({ value }: any) => {
      let sum = 0;
      sum = shoesReturnCount;
      if (sum !== 0) {
        return `${value}  ${parseFloat(((value / sum) * 100).toFixed(2))}%`;
      }

      return '数据有误';
    },
  });
  const shoesTypeConfig = reactive<any>({
    sort: false,
    data: [],
    valueFormatter: ({ value }: any) => {
      let sum = 0;
      sum = shoesReturnCount;
      if (sum !== 0) {
        return `${value}  ${parseFloat(((value / sum) * 100).toFixed(2))}%`;
      }

      return '数据有误';
    },
  });
  const shoesTypepro = reactive<any>({
    sort: false,
    data: [],
    unit: '%',
  });
  const type = ref(1);

  const fullscreenLoading = ref<boolean>(true);

  const currentPage = ref(1);
  const pagesize = ref(17);
  const headlist = ref<any[]>([]);
  const detailList = ref([]);
  const tableData = ref([]);
  const dataTotal = ref(0);

  function convertJsonToArray(jsonData: any) {
    const keys = Object.keys(jsonData[0]);
    const result: any = [];
    jsonData.forEach((item: any) => {
      const row = [...keys.map((key) => item[key])];
      result.push(row);
    });

    return result;
  }

  function toLowerCaseKeys(obj: any) {
    if (typeof obj !== 'object' || obj === null) {
      throw new Error('Input must be an object.');
    }

    const newObj: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      newObj[key.toLowerCase()] = obj[key];
    });
    return newObj;
  }

  function generateUniqueRandomColors(length: any) {
    const colors: any[] = [];
    while (colors.length < length) {
      // 生成随机的 RGB 值
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      // 将 RGB 转换为十六进制颜色
      const color = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(
        b
      )}`;

      // 检查颜色是否已存在
      if (!colors.includes(color)) {
        colors.push(color);
      }
    }

    return colors;
    function componentToHex(c: any) {
      const hex = c.toString(16);
      return `${(() => (hex.length === 1 ? `0${hex}` : hex))()}`;
    }
  }
  function reSet() {
    form.value = {
      category: '',
      shoesType: '',
      art: '',
      noShshoes: '全部',
      returnReason: '',
      productDate: '',
      detail_type: '',
      title: '',
      returnDate1: formatDate(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() - new Date().getMonth()
        )
      ),
      returnDate2: getCurrentMonth(),
    };
    getYearReturn();
    getMainContent();
  }
  function generateMonthsBetween(startStr: any, endStr: any) {
    // 将字符串转换为 Date 对象
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);

    const months = [];

    // 循环生成每个月份
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // 获取年份和月份
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');

      // 构建年月份字符串
      months.push(`${year}-${month}`);

      // 增加一个月
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  }

  async function getMaindetail(formparm: any) {
    type.value = formparm.detail_type;
    title.value = formparm.title;
    currentPage.value = 1;
    pagesize.value = 17;
    const result = await GetDetailContent(formparm);
    setTimeout(() => {
      fullscreenLoading.value = false;
    }, 500);

    let months: any[] = [];
    months = generateMonthsBetween(
      form.value.returnDate1,
      form.value.returnDate2
    );
    console.log(months);
    let maindetial = [];
    maindetial = result.data.detialList;
    dataTotal.value = maindetial.length ? maindetial.length : 0;
    if (dataTotal.value) {
      if (String(form.value.detail_type) !== '5') {
        maindetial.map((item: any, indexI: any) => {
          item.RETURNCOUNT = item.RETURN_MONTH.includes(',')
            ? item.RETURNCOUNT.split(', ')
            : [item.RETURNCOUNT];
          item.RETURN_MONTH = item.RETURN_MONTH.includes(',')
            ? item.RETURN_MONTH.split(', ')
            : [item.RETURN_MONTH];
          item.RETURN_MONTH.forEach((month: any, index: any) => {
            item[month] = item.RETURNCOUNT[index];
          });
          return item;
        });
        maindetial.map((item: any) => {
          item.total = 0;
          months.forEach((monthitem) => {
            if (!(monthitem in item)) {
              item[monthitem] = 0;
            }
            item.total += Number(item[monthitem]);
          });
          return item;
        });
        let headlistdt = [];
        headlist.value = [];
        headlistdt = Object.keys(maindetial[0]).filter(
          (item) =>
            item !== 'RETURNCOUNT' &&
            item !== 'RETURN_MONTH' &&
            item !== 'total'
        );
        headlistdt.forEach((item: any) => {
          const headobj = {
            title: item,
            dataIndex: item,
            ellipsis: true,
            tooltip: true,
            width: 100,
            minWidth: 60,
          };

          headlist.value.push(headobj);
        });

        const sortedHeadlist = [...headlist.value];

        // 提取需要排序的部分
        const toSort = sortedHeadlist.slice(1);

        // 对提取的部分进行排序
        toSort.sort((a: any, b: any) => {
          // 将字符串转换为 Date 对象进行比较

          const dateA = new Date(a.title);
          const dateB = new Date(b.title);
          return Number(dateA) - Number(dateB);
        });
        // 将排序后的部分重新放回原数组中
        sortedHeadlist.splice(1, toSort.length, ...toSort);

        const totalObj = {
          title: '合计',
          dataIndex: 'total',
          width: 100,
          minWidth: 60,
        };
        const indexObg = {
          title: '序号',
          dataIndex: '序号',
          width: 60,
          minWidth: 40,
        };
        sortedHeadlist.unshift(indexObg);
        sortedHeadlist.push(totalObj);

        headlist.value = sortedHeadlist;
      } else {
        headlist.value = [];
        maindetial.map((item: any, index: any) => {
          item['序号'] = index + 1;
          item['退货率'] = `${item['退货率']}%`;
          return item;
        });
        let headlistdt = [];

        headlistdt = Object.keys(maindetial[0]).filter((item) => item);
        const serialNumberIndex = headlistdt.indexOf('序号');
        if (serialNumberIndex > -1) {
          // 移除 'serialNumber' 然后在头部插入
          headlistdt.splice(serialNumberIndex, 1);
          headlistdt.unshift('序号');
        }
        headlistdt.forEach((item: any) => {
          const headobj = {
            title: item,
            dataIndex: item,
          };

          headlist.value.push(headobj);
        });
      }
    }
    if (String(form.value.detail_type) === '1') {
      let sortedMaindetail: any[] = [];
      sortedMaindetail = maindetial;
      sortedMaindetail.sort((a: any, b: any) => {
        const isMainAEmpty = a['主要原因'] === null || a['主要原因'] === '';
        const isMainBEmpty = b['主要原因'] === null || b['主要原因'] === '';
        // 首先检查mainReason是否为空
        if (isMainAEmpty && !isMainBEmpty) return 1;
        // 如果 b.mainReason 为空而 a.mainReason 不为空，则 b 放在 a 后面
        if (!isMainAEmpty && isMainBEmpty) return -1;
        return b.total - a.total;
      });

      maindetial = sortedMaindetail;
      maindetial.forEach((item, index) => {
        item['序号'] = index + 1;
      });
    }
    if (String(form.value.detail_type) === '2') {
      let sortedMaindetail: any[] = [];
      sortedMaindetail = maindetial;
      sortedMaindetail.sort((a: any, b: any) => {
        const isMainAEmpty = a.ART === null || a.ART === '';
        const isMainBEmpty = b.ART === null || b.ART === '';
        if (isMainAEmpty && !isMainBEmpty) return 1;

        if (!isMainAEmpty && isMainBEmpty) return -1;
        return b.total - a.total;
      });
      maindetial = sortedMaindetail;
      maindetial.forEach((item, index) => {
        item['序号'] = index + 1;
      });
    }
    if (String(form.value.detail_type) === '3') {
      let sortedMaindetail: any[] = [];
      sortedMaindetail = maindetial;
      sortedMaindetail.sort((a: any, b: any) => {
        const isMainAEmpty =
          a['厂线代码'] === null ||
          a['厂线代码'] === '' ||
          a['厂线代码'] === '其它';
        const isMainBEmpty =
          b['厂线代码'] === null ||
          b['厂线代码'] === '' ||
          b['厂线代码'] === '其它';
        if (isMainAEmpty && !isMainBEmpty) return 1;
        if (!isMainAEmpty && isMainBEmpty) return -1;

        return b.total - a.total;
      });
      let headlistdt = [];
      headlist.value = [];
      headlistdt = Object.keys(maindetial[0]).filter(
        (item) =>
          item !== 'RETURNCOUNT' && item !== 'RETURN_MONTH' && item !== 'total'
      );
      headlistdt.forEach((item: any) => {
        const headobj = {
          title: item,
          dataIndex: item,
          ellipsis: true,
          tooltip: true,
          width: 100,
          minWidth: 60,
        };

        headlist.value.push(headobj);
      });

      const sortedHeadlist = [...headlist.value];

      // 提取需要排序的部分
      const toSort = sortedHeadlist.slice(1);

      // 对提取的部分进行排序
      toSort.sort((a: any, b: any) => {
        // 将字符串转换为 Date 对象进行比较

        const dateA = new Date(a.title);
        const dateB = new Date(b.title);
        return Number(dateA) - Number(dateB);
      });
      // 将排序后的部分重新放回原数组中
      sortedHeadlist.splice(1, toSort.length, ...toSort);

      const totalObj = {
        title: '合计',
        dataIndex: 'total',
        width: 100,
        minWidth: 60,
      };
      const indexObg = {
        title: '序号',
        dataIndex: '序号',
        width: 60,
        minWidth: 40,
      };
      sortedHeadlist.unshift(indexObg);
      sortedHeadlist.push(totalObj);

      headlist.value = sortedHeadlist;
      maindetial = sortedMaindetail;
      maindetial.forEach((item, index) => {
        item['序号'] = index + 1;
      });
      console.log(maindetial);
    }
    if (String(form.value.detail_type) === '4') {
      let sortedMaindetail: any[] = [];
      sortedMaindetail = maindetial;
      sortedMaindetail.sort((a: any, b: any) => {
        const isMainAEmpty = a['鞋型'] === null || a['鞋型'] === '';
        const isMainBEmpty = b['鞋型'] === null || b['鞋型'] === '';
        if (isMainAEmpty && !isMainBEmpty) return 1;

        if (!isMainAEmpty && isMainBEmpty) return -1;
        return b.total - a.total;
      });

      maindetial = sortedMaindetail;
      maindetial.forEach((item, index) => {
        item['序号'] = index + 1;
      });
    }

    detailList.value = maindetial;
    getPageInfo();
  }
  async function getMainContent() {
    const result = await GetContent(form.value);
    let otherTotal = 0;
    if (!form.value.returnDate1 || !form.value.returnDate2) {
      return;
    }

    if (result.data.mainreason.length > 0) {
      let maindt = result.data.mainreason;
      maindt.map((item: any, index: any) => {
        if (index === 0) {
          item.RETURNCOUNT = `<span style="color:#ce202d;">${item.RETURNCOUNT}</span>`;
        }
        if (index === 1) {
          item.RETURNCOUNT = `<span style="color:#e5822f;">${item.RETURNCOUNT}</span>`;
        }
        if (index === 2) {
          item.RETURNCOUNT = `<span style="color:#ddd221;">${item.RETURNCOUNT}</span>`;
        }
        return item;
      });

      if (maindt.length > 9) {
        for (let i = 9; i <= maindt.length - 1; i += 1) {
          otherTotal += maindt[i].RETURNCOUNT;
        }
        const otherobj = { ADRETURN_REASON: '其它', RETURNCOUNT: otherTotal };
        maindt = maindt.filter((_: any, index: any) => index <= 8);
        maindt.push(otherobj);
      }
      const mainresult = convertJsonToArray(maindt);
      config.data = mainresult;
    } else {
      config.data = [];
    }
    let catetrgorysum = 0; /* *退货Category */
    if (result.data.catetrgory.length > 0) {
      returnOption.series[0].data = result.data.catetrgory.map((item: any) => {
        item.NAME = `${item.NAME}  ${item.VALUE}`;
        catetrgorysum += Number(item.VALUE);
        return toLowerCaseKeys(item);
      });
      returnOption.series[0].label.normal.formatter = `退货数量\n${catetrgorysum}`;
    } else {
      returnOption.series[0].data = [];
    }
    /*
     *退货前十ART
     */
    let artdt: any[] = [];
    artdt = result.data.art;
    const artX: any[] = [];
    const artY: any[] = [];
    if (artdt.length > 0) {
      artdt.forEach((item: any) => {
        artX.push(item.ART);
        artY.push(item.RETURNCOUNT);
      });
    }
    reaturnLead.xAxis.data = artX;
    reaturnLead.series[0].data = artY;
    /*
     * 厂区退货数量
     */
    let facConfig = reactive({ ...factoryoption });
    let facdt: any[] = [];
    facdt = result.data.facctory;

    if (facdt.length > 0) {
      let colors: any[] = [];
      colors = [
        '#e69a03',
        '#e65c2f',
        '#06c7e8',
        '#0268e5',
        '#008be7',
        '#8b665c',
        '#aa938c',
        '#5cb8b9',
      ];

      if (facdt.length - colors.length > 0) {
        colors.push([
          ...generateUniqueRandomColors(facdt.length - colors.length),
        ]);
      }

      facConfig.series[0].data[0].children = facdt.map(
        (item: any, index: any) => ({
          name: `${item.UDF05}: ${item.RETURNCOUNT}`,
          value: item.RETURNCOUNT,
          itemStyle: {
            color: colors[index],
          },
        })
      );
      factoryoption = facConfig;
    } else {
      facConfig = reactive({ ...factoryoption });
      facConfig.series[0].data[0].children = [];

      factoryoption = facConfig;
    }
    /*
     *新旧鞋占比
     */
    const newoldt = reactive({ ...result.data.newold[0] });

    const newObj = reactive({ value: newoldt.NEWSUM, name: '新鞋' });
    const oldObj = reactive({ value: newoldt.OLDSUM, name: '旧鞋' });
    const newold: any[] = [];
    newold.push(oldObj);
    newold.push(newObj);
    newShoeProOption.series[0].data = newold;
    if (newoldt.RETURNCOUNT !== 0) {
      newShoeProOption.color = ['#0c2968', '#ff3399'];
      oldShoeProOption.color = ['#ff3399', '#0c2968'];
      oldShoeProOption.series[0].label.normal.formatter = `旧鞋\n${Math.round(
        (newoldt.OLDSUM / (newoldt.OLDSUM + newoldt.NEWSUM)) * 100
      )}%`;
      newShoeProOption.series[0].label.normal.formatter = `新鞋\n${Math.round(
        (newoldt.NEWSUM / (newoldt.OLDSUM + newoldt.NEWSUM)) * 100
      )}%`;
    } else {
      newShoeProOption.color = ['#0c2968', '#0c2968'];
      oldShoeProOption.color = ['#0c2968', '#0c2968'];
      oldShoeProOption.series[0].label.normal.formatter = `暂无数据`;
      newShoeProOption.series[0].label.normal.formatter = `暂无数据`;
    }

    oldShoeProOption.series[0].data = newold;

    /*
     *鞋型退货数量
     */
    let shoesReturnsum = 0;
    shoesReturnsum = newoldt.OLDSUM + newoldt.NEWSUM;
    shoesReturnCount = shoesReturnsum;
    if (shoesReturnsum > 0) {
      let shoestypedt = {};
      shoestypedt = result.data.shoesType.map((item: any) => ({
        name: item.SHOSE_NAME,
        value: item.RETURNCOUNT,
      }));

      shoesTypeConfig.data = shoestypedt;
    } else {
      shoesTypeConfig.data = [];
    }
    /*
     *生产线退货数量
     */
    let fact = {};
    fact = result.data.production.map((item: any) => ({
      name: item.DEPARTMENT_NAME,
      value: item.RETURNCOUNT,
    }));
    reproConfig.data = fact;

    /*
     *鞋型退货率
     */

    let shoesprodt = [];
    shoesprodt = result.data.shoesSeries.map((item: any) => ({
      name: item.SHOSE_NAME,
      value: item.TOTAL_SHIPPING_QTY
        ? parseFloat(
            ((item.RETURNCOUNT / item.TOTAL_SHIPPING_QTY) * 100).toFixed(2)
          )
        : (0).toFixed(2),
    }));
    console.log(shoesprodt);
    shoesprodt.sort((a: any, b: any) => b.value - a.value);
    shoesTypepro.data = shoesprodt;
  }

  async function getYearReturn() {
    const result = await GetYearReturn(form.value);

    let lastdt: any[] = [];
    lastdt = result.data.lastdt;
    let lastsumdt: any[] = [];
    lastsumdt = result.data.lastsum;
    let lastreturnNum: any[] = [];
    let nowdt: any[] = [];
    nowdt = result.data.nowdt;
    let nowsumdt: any[] = [];
    nowsumdt = result.data.nowsum;
    let returnNumbers: any[] = [];
    let returnNumberspro: string[] = [];

    lastdt.forEach((item: any) => {
      returnNumbers.push(item.RETURN_NUMBER);
    });
    lastsumdt.forEach((item: any) => {
      lastreturnNum.push(item.RETURN_NUMBER);
    });
    const maxLastReturnNumber = ref(0);
    maxLastReturnNumber.value = Math.max(...returnNumbers);
    reaturnProOption.series[0].data = returnNumbers;

    returnNumbers.forEach((item, index) => {
      return returnNumberspro.push(
        lastreturnNum[index]
          ? parseFloat(
              ((item / lastreturnNum[index]) * 100).toString()
            ).toFixed(2)
          : parseFloat(parseFloat(lastreturnNum[index]).toString()).toFixed(2)
      );
    });
    reaturnProOption.xAxis[3].data = returnNumbers;
    reaturnProOption.series[2].data = returnNumberspro;
    reaturnProOption.xAxis[5].data = returnNumberspro.map((item) => {
      return `${item}%`;
    });

    returnNumbers = [];
    lastreturnNum = [];
    returnNumberspro = [];
    nowdt.forEach((item: any) => {
      returnNumbers.push(item.RETURN_NUMBER);
    });

    nowsumdt.forEach((item: any) => {
      lastreturnNum.push(item.RETURN_NUMBER);
    });

    returnNumbers.forEach((item, index) => {
      return returnNumberspro.push(
        lastreturnNum[index]
          ? parseFloat(
              ((item / lastreturnNum[index]) * 100).toString()
            ).toFixed(2)
          : parseFloat(parseFloat(lastreturnNum[index]).toString()).toFixed(2)
      );
    });

    reaturnProOption.series[1].data = returnNumbers;
    reaturnProOption.xAxis[4].data = returnNumbers;
    reaturnProOption.series[3].data = returnNumberspro;
    reaturnProOption.xAxis[6].data = returnNumberspro.map((item) => {
      return `${item}%`;
    });
    const maxnowReturnNumber = ref(0);
    maxnowReturnNumber.value = Math.max(...returnNumbers);
    const maxy = ref(0);
    maxy.value = Math.max(maxnowReturnNumber.value, maxLastReturnNumber.value);
    reaturnProOption.yAxis[0].max = maxy.value + 10;
    reaturnProOption.yAxis[0].interval = Math.ceil((maxy.value + 10) / 10);
  }
  // 获得当前页
  function getPageInfo() {
    tableData.value = [];
    for (
      let i = (currentPage.value - 1) * pagesize.value;
      i < dataTotal.value;
      i += 1
    ) {
      tableData.value.push(detailList.value[i]);

      if (tableData.value.length === pagesize.value) break;
    }
  }
  function handleSizeChange(val: any) {
    console.log(`每页 ${val} 条`);
    pagesize.value = val;
    getPageInfo();
  }
  function handleCurrentChange(val: any) {
    console.log(`当前页: ${val}`);
    currentPage.value = val;
    getPageInfo();
  }
  function GotoMainDetail(typeparm: any, titleparm: any) {
    form.value.detail_type = typeparm;
    form.value.title = titleparm;
    title.value = titleparm;

    getMaindetail(form.value);
    pageIndex.value = true;
  }
  function changepageIndex(padgeindex: any) {
    pageIndex.value = padgeindex;
    fullscreenLoading.value = true;
    title.value = '中国市场退货分析';
  }

  function tableRowClassName(row: any, rowIndex: any) {
    if (rowIndex % 2 === 0) {
      return 'warning-row';
    }
    return 'success-row';
  }
  function InsertReportLog(param: any) {
    const data = {
      DllName: 'SJ_KanBanAPI',
      ClassName: 'SJ_KanBanAPI.Common',
      Method: 'InsertReportLog',
      IP4: '',
      MAC: 'MAC',
      IsRasRequst: false,
      IsRasResult: false,
      RasResultKey: '',
      UserToken: localStorage.getItem('token') as string,
      Data: param,
    };
    const base = defaultSettings.api_url.substring(
      0,
      defaultSettings.api_url.indexOf('CommonCall')
    );
    const apiurl = `${base}Log/InsertLog`;
    console.log(apiurl);
    const result = axios.post(apiurl, data);
    console.log(result);
  }
  onMounted(() => {
    getMainContent();
    getYearReturn();
    const dic = {
      platform: navigator.appVersion,
      report_name: 'chinaReturn',
      type: 'created',
    };
    InsertReportLog(dic);
  });
  onBeforeUnmount(() => {
    const dic = {
      platform: navigator.appVersion,
      report_name: 'chinaReturn',
      type: 'destroyed',
    };
    InsertReportLog(dic);
  });
</script>
<style lang="less" scoped>
  .full {
    background-image: linear-gradient(to top, #000e1c, #083a52);
    background-size: cover;
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
    padding-left: 40px;
    padding-right: 40px;

    .searchContainer {
      display: flex;
      font-size: 17px;
      align-items: flex-start;
      margin-top: 17px;

      .searchbox {
        width: 75%;
        margin-right: 20px;

        :deep(.arco-form-item-label-col > .arco-form-item-label) {
          color: white;
        }

        :depp(input.arco-input.arco-input-size-medium) {
          color: white;
        }

        :deep(.arco-select-view-single) {
          background-color: transparent;
          border: 1px solid #015478;
          color: white;
        }

        :deep(.arco-icon) {
          color: white;
        }

        :deep(.arco-picker) {
          background-color: transparent;
          border: 1px solid #015478;
        }

        :deep(.arco-input-wrapper) {
          background-color: transparent;
          color: white;
          border: 1px solid #015478;
        }

        :depp(.arco-select-view-value) {
          color: white;
        }

        :deep(.arco-picker input) {
          color: white;
        }
      }

      .searchButton {
        display: flex;
        width: 18%;
        justify-content: space-between;

        :deep(.arco-btn-primary, .arco-btn-primary[type='button'], .arco-btn-primary[type='submit']) {
          background-color: #66b1ff;
          border-radius: 3px;
        }
      }
    }
  }

  .contentBox {
    width: 100%;
    height: 770px;
    display: flex;
    flex-direction: row;
    font-size: 13px;
  }

  .common {
    flex: 1;
    //border: 1px solid black;
  }

  .common1 {
    display: flex;
    flex-direction: column;
  }

  .commontitle {
    display: flex;
    height: 100%;
    flex-direction: column;

    .headtitle {
      margin: 0;
      font-size: 13px;
    }
  }

  .commonflex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dv-border-box-12 {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;

    .board-info {
      box-sizing: border-box;
      width: 93%;
      margin-top: 5px;
      height: 100%;

      :deep(.header-item) {
        font-size: 13px;
      }

      :deep(.rows .index) {
        background-color: transparent !important;
      }

      :deep(.rows .row-item) {
        font-size: 15px !important;
      }
    }
  }

  .contentMid {
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 100%;

    .midT {
      height: 580px;
      padding-bottom: 10px;
    }

    .midB {
      display: flex;
      height: 33%;
      flex-direction: row;
      font-size: 0.3rem;
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

        .midrR {
        }
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

    :deep(.row-item .ranking-info .info-name) {
      //color: orange;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    // :deep(.row-item:nth-of-type(3) .ranking-info .ranking-value) {
    //   color: yellow;

    // }

    :deep(.row-item .ranking-column) {
      margin: 0;
      border-bottom: 0px;
      margin-top: 8px;
      border-radius: 0px;
    }

    :deep(.row-item .ranking-column .inside-column) {
      height: 15px;
      margin-bottom: 0;
      background-image: linear-gradient(to right, #d199a4, #83e5e8);
    }
  }

  .midRanking {
    :deep(.row-item .ranking-column .inside-column) {
      background-image: linear-gradient(to right, #39a6ff, #5ae6ff);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      transform: skewX(30deg);
      /* 减少斜切角度并相应地调整平移距离 */
    }
  }

  .BotRanking {
    :deep(.row-item .ranking-column .inside-column) {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      transform: skewX(30deg);
      /* 减少斜切角度并相应地调整平移距离 */
      background-image: linear-gradient(to right, #8080ff, #70caff);
    }
  }

  .commonflex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-message--error {
    top: 80px !important;
  }

  // /deep/.el-message {
  //   padding: 0 !important
  // }
  .returnDetail {
    display: flex;
    justify-content: center;

    .content {
      display: flex;
      width: 95%;
      padding-top: 40px;
      justify-content: center;
      direction: row;
      text-align: center;
    }

    :deep(.arco-table-border .arco-table-container) {
      border: 0px;
    }

    :deep(.el-table .el-table__cell) {
      text-align: center;
    }

    :deep(.arco-table-th) {
      background: #0c244d;
      color: white;
    }

    :deep(tr.arco-table-tr .success-row) {
      background: #0a2732;
      color: white;
    }

    :deep(.arco-table-tr .warning-row) {
      background: #003b51;
      color: white;
    }

    :deep(.el-table__row td) {
      border: none;
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
    }

    :deep(.el-table th.is-leaf) {
      border: none;
    }

    :deep(.el-table::before) {
      height: 0;
    }

    ::v-deep
      .el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td.el-table__cell {
      background-color: transparent;
    }

    .pagechange {
      position: absolute;
      bottom: 40px;
      right: 50px;
    }

    ::v-deep .arco-pagination-total {
      color: white;
    }

    ::v-deep .arco-pagination-list {
      color: black;
      background: white;
    }

    :deep(.arco-pagination-jumper-text-goto, .arco-pagination-jumper-prepend) {
      color: white;
    }

    :deep(.arco-table-td) {
      background-color: transparent;
      color: white;
      border-bottom: 0px;
      height: 50px;
    }
  }

  .tablerow {
    line-height: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
  }

  :deep(.dv-border-box-13 .border-box-content) {
    display: flex;
    justify-content: center;
    padding-top: 0.1rem;
  }

  :deep(tr.arco-table-tr.warning-row) {
    background: #0a2732;
    color: white;
  }

  :deep(tr.arco-table-tr.success-row) {
    background: #003b51;
    color: white;
  }
</style>
