<template>
  <div class="layout-demo">
    <a-layout>
      <a-layout-header class="headText">
        <a-row class="HeadTitle">
          <div>{{ $t('menu.rtlKanban.搜索区') }}</div>
        </a-row>
        <a-row :gutter="24" class="HeadContext" :wrap="true">
          <a-col :span="2">
            <div></div>
          </a-col>
          <a-col :span="4">
            <div class="HeadContext">
              <div>{{ $t('menu.rtlKanban.工厂') }}:</div>
              <div>
                <a-select
                  v-model="factCode"
                  :style="{ width: '160px' }"
                  placeholder="全部"
                  :trigger-props="{ autoFitPopupMinWidth: true }"
                  value-key="ORG_CODE"
                >
                  <a-option
                    v-for="item in orgList"
                    :key="item.ORG_CODE"
                    :value="item.ORG_CODE"
                    :label="item.ORG_NAME"
                  ></a-option>
                </a-select>
              </div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="HeadContext">
              <div>{{ $t('menu.rtlKanban.厂区') }}:</div>
              <div>
                <a-select
                  v-model="orgCode"
                  :style="{ width: '160px' }"
                  value-key="CODE"
                  placeholder="全部"
                  :trigger-props="{ autoFitPopupMinWidth: true }"
                >
                  <a-option
                    v-for="item2 in orgList2"
                    :key="item2.CODE"
                    :label="item2.ORG"
                    :value="item2.CODE"
                  >
                  </a-option>
                </a-select>
              </div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="HeadContext">
              <div>{{ $t('menu.rtlKanban.类型') }}:</div>
              <div>
                <a-select
                  v-model="typeDate"
                  :style="{ width: '160px' }"
                  placeholder="全部"
                  :trigger-props="{ autoFitPopupMinWidth: true }"
                >
                  <a-option>1 Day</a-option>
                  <a-option>3 Day</a-option>
                </a-select>
              </div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="HeadContext">
              <div>{{ $t('menu.rtlKanban.日期') }}:</div>
              <div>
                <a-date-picker
                  v-model="startDate"
                  style="width: 200px"
                  value-format="YYYY/MM/DD"
                  @change="onSelect"
                />
              </div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="HeadContext">
              <div>{{ $t('menu.rtlKanban.至') }}:</div>
              <div>
                <a-date-picker
                  v-model="endDate"
                  style="width: 200px"
                  value-format="YYYY/MM/DD"
                />
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row style="line-height: 40px; height: 40px">
          <a-col :span="5" :offset="19">
            <a-space>
              <a-button type="primary" @click="seachBtn">{{
                $t('menu.rtlKanban.查询')
              }}</a-button>
              <a-button type="primary" @click="clearBtn">{{
                $t('menu.rtlKanban.重置查询')
              }}</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-layout-header>

      <a-layout-content v-if="typeDate == '1 Day'">
        <a-row :gutter="24" class="grid-demo">
          <a-col :span="12">
            <a-typography-title style="text-align: center">
              RTL by Plant ALL
            </a-typography-title>
            <div>
              <VCharts
                :option="option"
                style="height: 500px; width: 100%"
              ></VCharts>
            </div>
          </a-col>
          <a-col :span="12">
            <a-typography-title style="text-align: center">
              RTL by Plant ALL
            </a-typography-title>
            <VCharts
              :option="option2"
              style="height: 500px; width: 100%"
            ></VCharts>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-content v-if="typeDate == '1 Day'">
        <a-row
          v-for="(item, index) in ondayItems"
          :key="index"
          :gutter="24"
          class="grid-demo"
        >
          <a-col
            :span="12"
            v-if="item.optionTwo.TextTitls === orgCode || orgCode === 'ALL'"
          >
            <a-typography-title style="text-align: center">
              RTL by Plant {{ item.optionOne.TextTitls }}
            </a-typography-title>
            <div>
              <VCharts
                :option="item.optionOne"
                style="height: 500px; width: 100%"
              ></VCharts>
            </div>
          </a-col>
          <a-col
            :span="12"
            v-if="item.optionTwo.TextTitls === orgCode || orgCode === 'ALL'"
          >
            <a-typography-title style="text-align: center">
              RTL by Plant {{ item.optionTwo.TextTitls }}
            </a-typography-title>
            <VCharts
              :option="item.optionTwo"
              style="height: 500px; width: 100%"
            ></VCharts>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-content v-if="typeDate == '3 Day'">
        <a-row :gutter="24" class="grid-demo">
          <a-col :span="24">
            <a-typography-title style="text-align: center">
              RTL by Plant ThridALL
            </a-typography-title>
            <VCharts
              :option="option3"
              style="height: 500px; width: 100%"
            ></VCharts>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
    <a-layout-content v-if="typeDate == '3 Day'">
      <a-row
        v-for="(item, index) in thridDayItems"
        :key="index"
        :gutter="24"
        class="grid-demo"
      >
        <a-col
          :span="24"
          v-if="item.optionTwo.TextTitls === orgCode || orgCode === 'ALL'"
        >
          <a-typography-title style="text-align: center">
            RTL by Plant {{ item.optionTwo.TextTitls }}
          </a-typography-title>
          <VCharts
            :option="item.optionTwo"
            style="height: 500px; width: 100%"
          ></VCharts>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    ref,
    reactive,
    watch,
    nextTick,
    onMounted,
    provide,
  } from 'vue';
  import { useI18n } from 'vue-i18n';
  import VCharts from 'vue-echarts';
  import {
    Getfactory,
    GetOneDayLeftData,
    GetOneDayItemData,
    GetThridDayAllData,
    GetThridDayItemData,
  } from '@/api/rtlKanban';
  import { Message } from '@arco-design/web-vue';

  const { t } = useI18n();
  const orgList = ref<any>([]);
  const orgList2 = ref<any>([]);

  const factCode = ref<string>('ALL');
  const orgCode = ref<string>('ALL');
  const typeDate = ref<string>();
  typeDate.value = '1 Day';
  const startDate = ref<string>();
  const endDate = ref<string>();

  const option = ref<any>();
  const option2 = ref<any>();

  const option3 = ref<any>();

  const ARTS = ref<any>([]);
  const T_A_ARTS = ref<any>([]);
  const T_I_ARTS = ref<any>([]);

  const ondayItems = ref<any>([]);
  const ondayRightItems = ref<any>([]);

  const thridDayItems = ref<any>([]);
  const planText = ref<string>();

  planText.value = t('menu.rtlKanban.计划目标达成率');

  const getorglist = async () => {
    const orgdata: any = await Getfactory();
    console.warn(orgdata.list, orgdata.org_list, '我是返回数据');
    orgList.value = orgdata.list;
    orgList2.value = orgdata.org_list;
    orgList.value.unshift({ ORG_CODE: 'ALL', ORG_NAME: '全部' });
    orgList2.value.unshift({ ORG: '全部', CODE: 'ALL' });
  };
  onMounted(() => {
    getorglist();
    console.warn('我执行了一次');
  });

  const GetApiLeftDatas = async () => {
    const datas = {
      factCode: factCode.value,
      orgCode: orgCode.value,
      typeDate: typeDate.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };
    const orgdata: any = await GetOneDayLeftData(datas);
    option.value.xAxis.data = orgdata.XList;
    option2.value.xAxis.data = orgdata.XList;
    option.value.series[0].data = orgdata.PLANS;
    option.value.series[1].data = orgdata.RTLS;
    option2.value.series[0].data = orgdata.R_RTLS;
    option2.value.series[1].data = orgdata.MATHS;
    ARTS.value = orgdata.ARTS;
    console.log(option2, 'options2');
  };

  const GetThridDayAllDatas = async () => {
    const datas = {
      factCode: factCode.value,
      orgCode: orgCode.value,
      typeDate: typeDate.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };
    const orgdata: any = await GetThridDayAllData(datas);
    console.log('我已調用');
    option3.value.xAxis.data = orgdata.XList;
    option3.value.series[0].data = orgdata.RTLS;
    option3.value.series[1].data = orgdata.MATHS;
    T_A_ARTS.value = orgdata.ARTS;
  };
  const GetThridDayItemDatas = async () => {
    const datas = {
      factCode: factCode.value,
      orgCode: orgCode.value,
      typeDate: typeDate.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };

    const orgdata: any = await GetThridDayItemData(datas);
    orgdata.value.forEach((item: any) => {
      const optionRightItem: any = {
        tooltip: {
          trigger: 'axis',
          formatter(params: any) {
            console.log(optionRightItem.ARTLIST);
            console.log(optionRightItem.ARTLIST[params[0].dataIndex]);
            const res = `
        <div>
                <span>${params[0].name}</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${`ART`}: ${
              optionRightItem.ARTLIST[params[0].dataIndex]
            }</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${params[0].seriesName}: ${params[0].data}</span>
              </div>
              <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                   background-color:${params[1].color}"
                ></span><span>${params[1].seriesName}: ${params[1].data}</span>
              </div>
        `;
            return res;
          },
        },
        legend: {
          data: ['RTL', '配套数'],
        },
        xAxis: {
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: [
          {
            type: 'value',
            name: 'RTL',
            alignTicks: true,
          },
          {
            type: 'value',
            name: '配套数',
          },
        ],
        series: [
          {
            name: 'RTL',
            type: 'bar',
            data: [],
            label: { show: true, position: 'top' },

            markLine: {
              // symbol: ['none', 'none'],
              data: [
                {
                  yAxis: 1,
                },
              ],
            },
          },
          {
            name: '配套数',
            type: 'line',
            smooth: false,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#a9e38d',
              },
            },
            data: [],
          },
        ],
        ARTLIST: [],
        TextTitls: '',
      };

      const optionTatol: any = {};

      optionRightItem.xAxis.data = item.XList;
      optionRightItem.TextTitls = item.TITLE;
      optionRightItem.series[0].data = item.RTLS;
      optionRightItem.series[1].data = item.MATHS;
      optionRightItem.ARTLIST = item.ARTS;
      T_I_ARTS.value.push(item.ARTS);
      optionTatol.optionTwo = optionRightItem;
      thridDayItems.value.push(optionTatol);
    });
  };

  const GetOneDayItemDatas = async () => {
    const datas = {
      factCode: factCode.value,
      orgCode: orgCode.value,
      typeDate: typeDate.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };

    const orgdata: any = await GetOneDayItemData(datas);
    orgdata.value.forEach((item: any) => {
      const optionItem: any = {
        tooltip: {
          trigger: 'axis',
        },
        label: { show: true, position: 'top' },
        legend: {
          data: ['产出达成率', 'RTL'],
        },
        color: ['#17eecb', '#3aa1ff'],
        xAxis: {
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: {},
        series: [
          {
            name: '产出达成率',
            type: 'bar',
            stack: 'total',
            tooltip: {
              valueFormatter: (value: string) => `${value} %`,
            },
            data: [],
          },
          {
            name: 'RTL',
            type: 'bar',
            tooltip: {
              valueFormatter: (value: string) => `${value} %`,
            },
            stack: 'total',
            data: [],
          },
        ],
        TextTitls: '',
      };
      const optionRightItem: any = {
        tooltip: {
          trigger: 'axis',
          formatter(params: any) {
            const res = `
        <div>
                <span>${params[0].name}</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${`ART`}: ${
              optionRightItem.ARTLIST[params[0].dataIndex]
            }</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${params[0].seriesName}: ${params[0].data}</span>
              </div>
              <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                   background-color:${params[1].color}"
                ></span><span>${params[1].seriesName}: ${params[1].data}</span>
              </div>
        `;
            return res;
          },
        },
        legend: {
          data: ['RTL', '配套数'],
        },
        xAxis: {
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: [
          {
            type: 'value',
            name: 'RTL',
            alignTicks: true,
          },
          {
            type: 'value',
            name: '配套数',
          },
        ],
        series: [
          {
            name: 'RTL',
            type: 'bar',
            label: { show: true, position: 'top' },
            lable: {
              normal: {
                show: true,
                position: 'top',
              },
            },
            markLine: {
              // symbol: ['none', 'none'],
              data: [
                {
                  yAxis: 1,
                },
              ],
            },
            data: [],
          },
          {
            name: '配套数',
            type: 'line',
            smooth: false,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#a9e38d',
              },
            },
            data: [],
          },
        ],
        ARTLIST: [],
      };

      const optionTatol: any = {};
      console.log(item.XList);

      optionItem.xAxis.data = item.XList;
      optionItem.TextTitls = item.TITLE;
      optionRightItem.xAxis.data = item.XList;
      optionRightItem.TextTitls = item.TITLE;

      optionItem.series[0].data = item.PLANS;
      optionItem.series[1].data = item.RTLS;

      optionRightItem.series[0].data = item.R_RTLS;
      optionRightItem.series[1].data = item.MATHS;
      optionRightItem.ARTLIST = item.ARTS;
      console.log(item.ARTS, '第几');
      optionTatol.optionOne = optionItem;
      optionTatol.optionTwo = optionRightItem;

      ondayItems.value.push(optionTatol);
    });
    console.log(ondayItems.value, '加入');
  };

  // 点击查询按钮
  const seachBtn = () => {
    console.log('seachBtn', startDate.value, endDate.value);
    if (startDate.value === undefined || endDate.value === undefined) {
      Message.error('请选择时间！');
      return;
    }
    ondayItems.value = [];
    thridDayItems.value = [];
    if (typeDate.value === '1 Day') {
      GetApiLeftDatas();
      GetOneDayItemDatas();
    } else if (typeDate.value === '3 Day') {
      GetThridDayAllDatas();
      GetThridDayItemDatas();
    }
  };
  const onSelect = (dateString: any, date: any) => {
    console.log('onSelect', dateString, date);
  };
  //
  const clearBtn = () => {
    factCode.value = '';
    orgCode.value = '';
    typeDate.value = '1 Day';
  };

  option.value = {
    tooltip: {
      trigger: 'axis',
    },
    label: { show: true, position: 'top' },
    legend: {
      data: ['产出达成率', 'RTL'],
    },
    color: ['#17eecb', '#3aa1ff'],
    xAxis: {
      data: [],
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: {},
    series: [
      {
        name: '产出达成率',
        type: 'bar',
        stack: 'total',
        tooltip: {
          valueFormatter: (value: string) => `${value} %`,
        },
        data: [],
      },
      {
        name: 'RTL',
        type: 'bar',
        tooltip: {
          valueFormatter: (value: string) => `${value} %`,
        },
        stack: 'total',

        data: [],
      },
    ],
  };

  option2.value = {
    tooltip: {
      trigger: 'axis',
      formatter(params: any) {
        const res = `
        <div>
                <span>${params[0].name}</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    word-wrap: break-word;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${`ART`}: ${
          ARTS.value[params[0].dataIndex]
        }</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${params[0].seriesName}: ${params[0].data}</span>
              </div>
              <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                   background-color:${params[1].color}"
                ></span><span>${params[1].seriesName}: ${params[1].data}</span>
              </div>
        `;
        return res;
      },
    },
    legend: {
      data: ['RTL', '配套数'],
    },
    xAxis: {
      data: [],
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'RTL',
        alignTicks: true,
      },
      {
        type: 'value',
        name: '配套数',
      },
    ],
    series: [
      {
        name: 'RTL',
        type: 'bar',
        data: [],
        label: { show: true, position: 'top' },

        markLine: {
          // symbol: ['none', 'none'],
          data: [
            {
              yAxis: 1,
            },
          ],
        },
      },
      {
        name: '配套数',
        type: 'line',
        smooth: false,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#a9e38d',
          },
        },
        data: [],
      },
    ],
  };

  option3.value = {
    tooltip: {
      trigger: 'axis',
      formatter(params: any) {
        const res = `
        <div>
                <span>${params[0].name}</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${`ART`}: ${
          T_A_ARTS.value[params[0].dataIndex]
        }</span>
              </div>
        <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                    background-color:${params[0].color}"
                ></span><span>${params[0].seriesName}: ${params[0].data}</span>
              </div>
              <div>
                <span
                  style="display:inline-block;
                    margin-right:5px;
                    border-radius:10px;
                    width:10px;
                    height:10px;
                   background-color:${params[1].color}"
                ></span><span>${params[1].seriesName}: ${params[1].data}</span>
              </div>
        `;
        return res;
      },
    },
    legend: {
      data: ['RTL', '配套数'],
    },
    xAxis: {
      data: [],
      axisLabel: {
        interval: 0,
        rotate: 40,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'RTL',
        alignTicks: true,
        minInterval: 1,
      },
      {
        type: 'value',
        name: '配套数',
      },
    ],
    series: [
      {
        name: 'RTL',
        type: 'bar',
        label: { show: true, position: 'top' },
        markLine: {
          data: [
            {
              yAxis: 1,
            },
          ],
        },
        data: [],
      },
      {
        name: '配套数',
        type: 'line',
        smooth: false,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#a9e38d',
          },
        },
        data: [],
      },
    ],
  };
</script>

<script lang="ts">
  export default {
    name: 'rtlDataAnalaze',
  };
</script>

<style scoped>
  .headText {
    font-size: 18px;
    padding: 8px;
  }

  .headText .HeadTitle {
    margin: 20px 0 12px;
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 36px;
  }
  .HeadContext {
    display: flex;
    align-items: center;
  }

  .grid-demo {
    justify: center;
  }
</style>
