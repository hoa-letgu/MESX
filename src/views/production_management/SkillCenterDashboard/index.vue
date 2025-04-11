<template>
  <div class="full-screen-container">
    <!-- <dv-full-screen-container class="full"> -->
    <VScaleScreen
      width="1920"
      height="1080"
      :full-screen="true"
      :class="scrollClass"
    >
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
      ></Header>
      <div class="error-msg">
        <span>{{ errorMsg }}</span>
      </div>
      <!-- 顶部-查询条件 -->
      <div class="search-condition">
        <div class="selector-title">
          <span style="margin-right: 5px">工厂: </span>
          <a-select
            v-model="factoryCode"
            size="large"
            :style="{
              width: '150px',
              marginRight: '10px',
            }"
            @change="handleChangeOrg"
          >
            <a-option
              v-for="item in factoryList"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}
            </a-option>
          </a-select>
          <span v-if="dispalyPage == 2" style="margin-right: 5px">厂区: </span>
          <a-select
            v-if="dispalyPage == 2"
            v-model="PlantCode"
            size="large"
            :style="{
              width: '100px',
              marginRight: '10px',
            }"
            @change="handleChangeheadPlant"
          >
            <a-option
              v-for="item in factoryareaList"
              :key="item.CODE"
              :value="item.CODE"
              >{{ item.NAME }}
            </a-option>
          </a-select>

          <!-- <div
              v-for="item in factoryList"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}
            </div> -->
          <span style="margin-right: 10px">日期:</span>
          <a-date-picker
            v-model="selectDate"
            size="large"
            :allow-clear="false"
            format="YYYY/MM/DD"
            :style="{
              width: '130px',
              marginRight: '10px',
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
      <div class="container">
        <a-row class="container-row" :gutter="24">
          <!-- 第一页 -->
          <template v-if="dispalyPage === 1">
            <a-col :span="24">
              <!-- 第一行 -->
              <a-row
                class="grid-demo"
                :gutter="[24, 12]"
                style="color: white"
                :row-gap="12"
              >
                <!-- 第一行第一列 -->
                <a-col :span="7">
                  <div>
                    <div demo-bg>
                      <dv-border-box12>
                        <div dv-bg style="height: 500px; position: relative">
                          <div style="padding: 10px">工厂加工实际人数</div>
                          <div>
                            <bg
                              style="
                                width: 600px;
                                height: 600px;
                                margin: 0px auto;
                                padding: 0px;
                                position: absolute;
                                top: 1;
                                margin-top: -73px;
                                margin-left: -40px;
                              "
                            >
                            </bg>
                            <div
                              style="
                                display: flex;
                                width: 300px;
                                position: absolute;
                                margin-top: 110px;
                                margin-left: 80px;
                                /* border: 1px solid white; */
                              "
                            >
                              <div
                                style="
                                  flex: 1;
                                  margin-top: 55px;
                                  text-align: center;
                                "
                              >
                                <ul>
                                  <li>总实际人数</li>
                                  <li>
                                    <div small-bg>
                                      <a-statistic
                                        title=""
                                        :value="AllpersonCount"
                                        :precision="0"
                                        :value-from="0"
                                        :start="true"
                                        show-group-separator
                                        animation
                                        :value-style="{ color: '#FE7007' }"
                                      />
                                      <!-- <a-statistic
                                          title=""
                                          :value="AllpersonCount"
                                          :precision="0"
                                          :value-from="0"
                                          :start="true"
                                          :value-style="{ color: '#FE7007' }"
                                          animation
                                        ></a-statistic> -->
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div style="flex: 1">
                                <ul
                                  class="two-li"
                                  style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    border: 1px solid black;
                                    border-radius: 50%;
                                    height: 200px;
                                  "
                                >
                                  <li
                                    style="display: flex; align-items: center"
                                    v-for="(item, index) in personCount"
                                    :key="index"
                                  >
                                    <!-- {{ item.PLAN_NAME }} -->
                                    <div
                                      style="
                                        text-align: right;
                                        font-size: 16px;
                                        border: 1px solid black;
                                        width: 100px;
                                      "
                                      >{{ item.PLAN_NAME }}</div
                                    >
                                    <div style="margin-top: 2px">
                                      <div small-bg>
                                        <!-- <a-statistic
                                            title=""
                                            :value="item.Qty"
                                            show-group-separator
                                            animation
                                            :value-style="{
                                              color: '#FE7007',
                                              fontSize: '16',
                                            }"
                                          />  -->
                                        <a-statistic
                                          title=""
                                          :value="item.QTY"
                                          :precision="0"
                                          :value-from="0"
                                          :start="true"
                                          show-group-separator
                                          animation
                                          :value-style="{
                                            color: '#FE7007',
                                            fontSize: '16',
                                          }"
                                        /> </div
                                    ></div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </dv-border-box12>
                    </div>
                  </div>
                </a-col>
                <!-- 第一行第二列 -->
                <a-col :span="10">
                  <div>
                    <div demo-bg>
                      <dv-border-box12>
                        <div dv-bg style="height: 500px">
                          <div style="display: flex; padding: 10px">
                            <div @click="clickAllPlant1()"
                              >厂区加工当日调配人数（人）</div
                            >
                            <div
                              style="
                                width: 20px;
                                height: 15px;
                                background-color: #cdbfe8;
                                margin-left: 30px;
                                border-radius: 3px;
                              "
                            ></div
                            >调入
                            <div
                              style="
                                width: 20px;
                                height: 15px;
                                margin-left: 10px;
                                background-color: #8ec9f4;
                                border-radius: 3px;
                              "
                            ></div
                            >调出
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              margin-left: 6px;

                              /* height: 250px; */
                            "
                          >
                            <VCharts
                              v-for="item in OptionCircle"
                              :key="item.Name"
                              :option="item.Option"
                              autoresize
                              style="
                                width: 261px;
                                height: 250px;
                                margin-top: -12px;
                                /* border: 1px solid white; */
                              "
                              @click="Circleclick(item.Name)"
                            ></VCharts>
                          </div>
                        </div>
                      </dv-border-box12>
                    </div>
                  </div>
                </a-col>
                <!-- //第一行第三列 -->
                <a-col :span="7">
                  <div>
                    <div demo-bg>
                      <dv-border-box12>
                        <div dv-bg style="height: 500px">
                          <div style="padding: 10px" @click="clickAllPlant2()"
                            >本月截止至上一工作日调配时数（H）</div
                          >
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              margin: auto 10px;
                            "
                          >
                            <a-col
                              :span="12"
                              v-for="(item, index) in PlanHourList"
                              :key="index"
                              @click="Planclick(item.CODE)"
                              class="point"
                            >
                              <div
                                style="
                                  border: 1px solid dodgerblue;
                                  display: flex;
                                  line-height: 25px;
                                  background-color: rgba(12, 33, 50, 1);
                                "
                              >
                                <div style="flex-grow: 1">
                                  <h3 style="width: 90%; margin: auto">{{
                                    item.ORG
                                  }}</h3>
                                  <p
                                    style="
                                      border: 1px solid dodgerblue;
                                      padding: 5px 0px;
                                      text-align: center;
                                      width: 90%;
                                      margin: auto;
                                    "
                                    >总调入</p
                                  >
                                  <p
                                    style="
                                      border: 1px solid dodgerblue;
                                      padding: 5px 0px;
                                      text-align: center;
                                      width: 90%;
                                      margin: auto;
                                      margin-top: 20px;
                                      margin-bottom: 10px;
                                    "
                                    >总调出</p
                                  ></div
                                >
                                <div style="flex-grow: 2">
                                  <div
                                    style="
                                      position: relative;
                                      padding: 5px 0px;
                                      text-align: center;
                                      margin: 11px 5px 15px 5px;
                                      top: 0px;
                                    "
                                  >
                                    <div class="threenumber">
                                      <!-- {{ item.INHOURS }} -->
                                      <div small-bg>
                                        <a-statistic
                                          title=""
                                          :precision="2"
                                          :value="item.INHOURS"
                                          show-group-separator
                                          animation
                                          :value-style="{ color: '#ffffff' }"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style="
                                        border-left: 2px solid dodgerblue;
                                        border-top: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        top: 0;
                                      "
                                    ></div>
                                    <div
                                      style="
                                        border-right: 2px solid dodgerblue;
                                        border-top: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        top: 0;
                                        right: 0;
                                      "
                                    ></div>
                                    <div
                                      style="
                                        border-right: 2px solid dodgerblue;
                                        border-bottom: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        bottom: 0;
                                        right: 0;
                                      "
                                    ></div>
                                    <div
                                      style="
                                        border-left: 2px solid dodgerblue;
                                        border-bottom: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                      "
                                    ></div>
                                  </div>
                                  <div
                                    style="
                                      position: relative;
                                      padding: 5px 0px;
                                      text-align: center;
                                      margin: 0px 5px 10px 5px;
                                      top: 0px;
                                    "
                                  >
                                    <div class="threenumber">
                                      <!-- {{ item.OUTHOURS }} -->
                                      <div small-bg>
                                        <a-statistic
                                          title=""
                                          :precision="2"
                                          :value="item.OUTHOURS"
                                          show-group-separator
                                          animation
                                          :value-style="{ color: '#ffffff' }"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style="
                                        border-left: 2px solid dodgerblue;
                                        border-top: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        top: 0;
                                      "
                                    ></div>
                                    <div
                                      style="
                                        border-right: 2px solid dodgerblue;
                                        border-top: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        top: 0;
                                        right: 0;
                                      "
                                    ></div>
                                    <div
                                      style="
                                        border-right: 2px solid dodgerblue;
                                        border-bottom: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        bottom: 0;
                                        right: 0;
                                      "
                                    ></div>
                                    <div
                                      style="
                                        border-left: 2px solid dodgerblue;
                                        border-bottom: 2px solid dodgerblue;
                                        width: 10px;
                                        height: 10px;
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                      "
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </a-col>
                          </div>
                        </div>
                      </dv-border-box12>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <!-- 第二行 -->
              <a-row
                class="grid-demo"
                :gutter="[24, 12]"
                style="color: white"
                :row-gap="12"
              >
                <a-col :span="24">
                  <div>
                    <div demo-bg>
                      <dv-border-box12>
                        <div dv-bg style="height: 450px">
                          <div style="display: flex">
                            <!-- //第二行第一列 -->
                            <div
                              style="
                                flex: 1;
                                border: 1px solid dodgerblue;
                                margin: 10px 5px 0 10px;
                                /* width: 100%; */
                              "
                            >
                              <div style="height: 427px">
                                <div style="display: flex; padding: 10px">
                                  <div>本日人员调配明细（人）</div>
                                  <div
                                    style="
                                      width: 20px;
                                      height: 15px;
                                      background-color: #ea7f8c;
                                      margin-left: 30px;
                                      border-radius: 3px;
                                    "
                                  ></div
                                  >调入
                                  <div
                                    style="
                                      width: 20px;
                                      height: 15px;
                                      margin-left: 10px;
                                      background-color: #00a7fd;
                                      border-radius: 3px;
                                    "
                                  ></div
                                  >调出
                                </div>
                                <div style="margin-left: 0px" class="four-box">
                                  <div
                                    w50rem
                                    h20rem
                                    p5
                                    flex="~ col"
                                    justify-center
                                    items-center
                                    bg-dark
                                  >
                                    <div pt5>
                                      <dv-scroll-board
                                        ref="scrollBoard"
                                        :config="metereconfig1"
                                        style="height: 380px; margin-top: 10px"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- 第二行第二列 -->
                            <div
                              style="
                                flex: 3;
                                border: 1px solid dodgerblue;
                                margin: 10px 10px 0 0px;
                              "
                            >
                              <div style="display: flex">
                                <div style="padding: 10px; margin-top: 3px"
                                  >厂区月/周调入生产工序占比</div
                                >
                                <div style="margin-left: 10px; margin-top: 5px"
                                  ><button
                                    id="SearchToMonth"
                                    class="button button1"
                                    @click="SearchToMonth"
                                    >月</button
                                  ></div
                                >
                                <div style="margin-left: 10px; margin-top: 5px"
                                  ><button
                                    id="SearchToWeek"
                                    class="button button2"
                                    @click="SearchToWeek"
                                    >周</button
                                  ></div
                                >
                                <div style="margin-left: 10px; margin-top: 14px"
                                  >年月
                                </div>
                                <div
                                  class="Month"
                                  style="margin-left: 10px; margin-top: 5px"
                                  ><a-month-picker
                                    v-model="MonthDate"
                                    style="width: 200px"
                                    @change="MonthDataChange"
                                /></div>
                                <div
                                  style="margin-left: 10px; margin-top: 14px"
                                  v-show="!IsMonth"
                                  >厂区
                                </div>
                                <div
                                  class="Month"
                                  v-show="!IsMonth"
                                  style="margin-left: 10px; margin-top: 5px"
                                  ><a-select
                                    v-model="factoryareaCode"
                                    :style="{ width: '200px' }"
                                    placeholder=""
                                    :trigger-props="{
                                      autoFitPopupMinWidth: true,
                                    }"
                                    style="
                                      width: 200px;
                                      /* margin-top: 1px; */
                                      height: 30px;
                                      line-height: 25px;
                                    "
                                    @change="handleChangePlant"
                                  >
                                    <a-option
                                      style="line-height: 25px; height: 25px"
                                      v-for="item in factoryareaList"
                                      :key="item.CODE"
                                      :value="item.CODE"
                                      >{{ item.NAME }}</a-option
                                    >
                                  </a-select></div
                                >
                              </div>
                              <div v-if="IsMonth">
                                <div
                                  ref="chartRef1"
                                  style="
                                    width: 100%;
                                    height: 380px;
                                    /* border: 1px solid red; */
                                  "
                                ></div>
                              </div>
                              <div v-else class="Week">
                                <div
                                  style="
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    margin: auto;
                                  "
                                >
                                  <div
                                    v-for="(item, index) in NineList"
                                    :key="index"
                                    style="
                                      border: 1px solid #1972c9;
                                      padding: 10px;
                                      margin: 10px;
                                      margin-top: 20px;
                                      background-color: #0c2132;
                                      flex: 1;
                                    "
                                  >
                                    <div
                                      style="
                                        background-color: white;
                                        color: black;
                                        padding: 5px 10px;
                                        width: 80px;
                                        text-align: center;
                                        border-radius: 10px;
                                      "
                                      >第{{ item.name }}周</div
                                    >
                                    <dv-scroll-ranking-board
                                      :config="item.data"
                                      style="width: 100%; height: 300px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </dv-border-box12>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </template>
          <!-- 第二页 -->
          <template v-if="dispalyPage === 3">
            <a-col :span="24">
              <!-- 第二页第一行 -->
              <a-row
                class="grid-demo"
                :gutter="[24, 12]"
                style="color: white"
                :row-gap="11"
              >
                <!-- 第一行第一列 -->
                <a-col :span="24">
                  <div>
                    <div demo-bg>
                      <dv-border-box12>
                        <div dv-bg style="height: 500px; position: relative">
                          <div style="display: flex">
                            <div style="padding: 10px; margin-top: 3px"
                              >日调入生产工序占比</div
                            >
                            <div>
                              <div class="Month"
                                ><span style="color: white">厂区：</span>

                                <a-select
                                  v-model="factoryareaCode"
                                  :style="{ width: '150px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="
                                    width: 150px;
                                    margin-top: 10px;
                                    height: 25px;
                                    line-height: 25px;
                                  "
                                  @change="handleChangePlant"
                                >
                                  <a-option
                                    style="line-height: 25px; height: 25px"
                                    v-for="item in factoryareaList"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.NAME }}</a-option
                                  >
                                </a-select></div
                              ></div
                            >
                            <div>
                              <div class="Month"
                                ><span style="color: white; margin-left: 10px"
                                  >工作中心：</span
                                >

                                <a-select
                                  v-model="groupCode"
                                  :style="{ width: '150px' }"
                                  placeholder=""
                                  :trigger-props="{
                                    autoFitPopupMinWidth: true,
                                  }"
                                  style="
                                    width: 150px;
                                    margin-top: 10px;
                                    height: 25px;
                                    line-height: 25px;
                                  "
                                  @change="handleChangeDept"
                                >
                                  <a-option
                                    v-for="item in grouplist"
                                    :key="item.CODE"
                                    :value="item.CODE"
                                    >{{ item.CODE }}</a-option
                                  >
                                </a-select></div
                              ></div
                            >
                          </div>
                          <div>
                            <!-- <VCharts
                              :option="barOption"
                              autoresize
                              style="1
                                width: 100%;
                                height: 450px;
                                margin: 0px auto;
                                padding: 0px;
                              "
                            ></VCharts> -->
                            <div
                              ref="chartRef2"
                              style="
                                width: 100%;
                                height: 440px;
                                /* border: 1px solid red; */
                              "
                            ></div>
                          </div>
                        </div>
                      </dv-border-box12>
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-row
                class="grid-demo"
                :gutter="[24, 12]"
                style="color: white"
                :row-gap="13"
              >
                <a-col :span="24">
                  <div class="table-box">
                    <div
                      w50rem
                      h20rem
                      p5
                      flex="~ col"
                      justify-center
                      items-center
                      bg-dark
                    >
                      <div pt5>
                        <dv-scroll-board
                          ref="scrollBoard"
                          :config="skillconfig"
                          style="height: 420px"
                        />
                      </div>
                    </div>
                  </div>
                </a-col> </a-row
            ></a-col>
          </template>
          <template v-if="dispalyPage === 2">
            <a-col :span="24">
              <div>
                <div
                  style="
                    flex: 3;
                    /* border: 1px solid dodgerblue; */
                    /* margin: 10px 10px 0 0px; */
                  "
                >
                  <div
                    w50rem
                    h20rem
                    p5
                    flex="~ col"
                    justify-center
                    items-center
                    bg-dark
                  >
                    <div pt5>
                      <dv-scroll-board
                        ref="scrollBoard"
                        :config="metereconfig"
                        style="height: 940px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </template>
        </a-row>
      </div>
    </VScaleScreen>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script lang="ts" setup>
  import Header from '@/components/header/index.vue';
  import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
  import * as echarts from 'echarts';
  import { formatNowDate, formatDateTime } from '@/utils/date';
  import VCharts from 'vue-echarts';
  import VScaleScreen from 'v-scale-screen';
  import { LoadOrgId } from '@/api/FaceStocDashboard';
  import {
    GerPersonCountByPlan,
    GetTranOutInCountByPlan,
    GetTranOutInCountByDept,
    GetTranOutInHoursByMonth,
    GetTranOutInMonthHoursByPlan,
    GetStaffTranInSkillByDay,
    GetStaffTranInSkillPercentByDay,
    GetPlantTranInSkillCountByMonth,
    GetPlantTranInSkillCountByWeek,
    Getplantlist,
    Getgrouplist,
  } from '@/api/SkillCenterDashboardApi';
  import { over, round } from 'lodash';
  import bg from './components/bg.vue';

  // 顶部-标题
  const topTitle = ref<any>('人力调配中心看板');
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
  const factoryareaList = ref<any>([]);
  const factoryareaCode = ref<any>('');
  const PlantCode = ref<any>('');
  const grouplist = ref<any>([]);
  const groupCode = ref<any>('');
  const IsMonth = ref<any>(true);
  // 顶部-2-日期formatNowDate('yyyy-MM')
  const selectDate = ref<any>(formatNowDate('yyyy/MM/dd'));
  const MonthDate = ref<any>(formatNowDate('yyyy-MM'));
  const scrollClass = ref<any>('hidden');
  // 刷新数据定时器
  const kanbanTimer = ref<any>();
  // 切换页面频率
  const pageInterva = 1 * 60 * 1000;
  const personCount = ref<any>([]);
  const AllpersonCount = ref(40);
  const headList5 = ref<any>([]);
  const bodyList5 = ref<any>([]);
  const headList6 = ref<any>([]);
  const bodyList6 = ref<any>([]);
  const skillconfig = ref<any>([]);
  const barOption = ref<any>([]);
  const NineList = ref<any>([]);
  const metereconfig = ref<any>([]);
  // 使用 ref 来创建响应式数据，echarts.init()
  const start = ref(0);
  const end = ref(70);
  const dataLength = ref(10); // data长度
  const Showcount = ref(10); // 显示数量
  const chartRef1 = ref<HTMLElement | null>(null);
  let myChart: echarts.ECharts | null = null;
  const chartRef2 = ref<HTMLElement | null>(null);
  let myChart2: echarts.ECharts | null = null;
  let intervalId: any | null;
  metereconfig.value = reactive({
    header: [],
    data: [],
    // index: true,
    columnWidth: [100, 80],
    align: ['center', 'center', 'center'],
    rowNum: [22],
    indexHeader: ['序号'],
    hoverPause: true,
    headerBGC: '#5A7A8F',
    evenRowBGC: '#0C2132',
    oddRowBGC: '#0C2132',
    headerHeight: 45,
    waitTime: 2000,
    // rowHeight: 30,
    // rowBGC: '#f9f9f9'
  });
  const metereconfig1 = ref<any>([]);
  metereconfig1.value = reactive({
    header: ['调出', '组别', '调入'],
    data: [],
    // index: true,
    columnWidth: [180, 100, 180],
    align: ['right', 'center', 'left'],
    rowNum: [11],
    indexHeader: ['序号'],
    hoverPause: true,
    headerBGC: '#5A7A8F',
    evenRowBGC: 'transparent',
    oddRowBGC: 'transparent',
    headerHeight: 0,
    waitTime: 3000,
    // rowHeight: 30,
    // rowBGC: '#f9f9f9'
  });
  const OptionCircle = ref<any>({});
  // 设置颜色列表...
  const colorList = ['#CDBFE8', '#8EC9F4'];
  const PlanHourList = ref<any>([]);
  let labels = ['一厂:10\n二厂:8\n五厂:1\n客制化:10\n贴底:12'];
  let option1 = {
    tooltip: {
      trigger: 'none',
    },
    legend: {
      show: false,
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      top: '30%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 14,
        rotate: 0, // 可根据需要调整角度
        interval: 0,
        formatter(value: any) {
          // 自定义标签格式化函数，可以根据值做不同的展示逻辑
          return `${value}`;
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '',
        axisLabel: {
          // color: '#cbeaf6', // 坐标轴label文字颜色
          show: false,
        },
        axisLine: {
          lineStyle: {
            show: false,
            // color: '#cbeaf6', // y坐标轴线颜色
          },
        },
        splitLine: {
          // 网格线
          lineStyle: {
            // type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
            // color: '#395367',
          },
          show: false, // 隐藏或显示
        },
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        bottom: '0%',
        start: start.value,
        end: end.value,
        show: showPageBtn.value,
        backgroundColor: '#0C2132',
        dataBackground: {
          lineStyle: {
            color: '#01A0F2',
          },
          areaStyle: {
            color: '#01A0F2',
          },
        },
        fillerColor: 'rgba(54,133,254,0.2)',
        handleColor: '#5470c6',
        textStyle: {
          fontSize: 12,
          color: '#333',
        },
        borderColor: '#5470c6',
        borderWidth: 1,
        height: 12,
      },
      {
        type: 'inside', // 内置型 dataZoom 组件，无需额外空间
        xAxisIndex: 0,
        start: start.value,
        end: end.value,
        // 注意：这里不需要设置 show 属性，除非你有特殊需求
      },
    ],

    series: [
      {
        name: '技能工序',
        type: 'bar',
        barWidth: 50,
        stack: '分类',
        data: [],

        itemStyle: {
          // color: '#4992FF',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0BBFC7', // 渐变起始颜色 (底部)
              },
              {
                offset: 1,
                color: '#029EF8', // 渐变结束颜色 (顶部)
              },
            ],
            global: false, // 缺省为 false
          },
          borderWidth: 1, // 设置边框宽度，可以根据需要调整
          barBorderRadius: [10, 10, 0, 0], // 圆角边框
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 16,
          position: 'top',
          formatter(value: any) {
            // 自定义标签格式化函数，可以根据值做不同的展示逻辑
            return `${value.value}人`;
          },
        },
      },
      {
        name: 'label',
        type: 'bar',
        barWidth: 50,
        stack: '分类',
        color: '#FFF',
        itemStyle: {
          color: 'rgba(0,0,0,0)', // 设置柱子的颜色为透明
        },
        data: [],
        label: {
          show: true,
          color: '#fff',
          fontSize: 11,
          position: 'top',
          lineHeight: 16, // 设置行高
          // align: 'left', // 整体对齐方式

          formatter(params: any) {
            // 根据数据项的索引来决定显示的文本
            return labels[params.dataIndex];
          },
          rich: {
            name: {
              fontSize: 14,
              color: '#333',
              align: 'left', // 确保这部分内容左对齐
              padding: [5, 0],
            },
            value: {
              fontSize: 16,
              color: '#000',
              align: 'left', // 确保这部分内容左对齐
              padding: [5, 0],
            },
          },
        },
      },
    ],
  };
  const FunGetgrouplist = async () => {
    groupCode.value = '';
    try {
      const vdata = await Getgrouplist(
        factoryCode.value,
        factoryareaCode.value
      );
      grouplist.value = JSON.parse(JSON.stringify(vdata.list));
      grouplist.value.unshift({ CODE: '全部', NAME: '全部' });
    } catch (err) {
      errorMsg.value = (err as Error).message;
    }
  };

  const FunGetplantlist = async () => {
    factoryareaCode.value = '';
    try {
      console.log('factoryCode.value', factoryCode.value);
      // setLoading(true); // 如果需要显示加载状态，请取消注释
      const vdata = await Getplantlist(factoryCode.value);
      factoryareaList.value = JSON.parse(JSON.stringify(vdata.list));
      factoryareaList.value.unshift({ CODE: '全部', NAME: '全部' });
      // factoryareaCode.value = '1P';
      await FunGetgrouplist();
    } catch (err) {
      errorMsg.value = (err as Error).message;
    } finally {
      // setLoading(false); // 如果需要关闭加载状态，请取消注释
    }
  };

  // 顶部-2-工厂列表
  const getFactoryList = async () => {
    const factoryDatas: any = [];
    // factoryCode.value = '';
    const result = await LoadOrgId();
    if (Array.isArray(result.data) && result.data.length > 0) {
      let i: any = 0;
      result.data.forEach((item: any) => {
        i += 1;
        // if (!factoryCode.value && i === 1) {
        //   factoryCode.value = item.ORG_CODE;
        // }
        const obj = {
          value: item.ORG_CODE,
          name: item.ORG_NAME,
        };
        factoryDatas.push(obj);
      });
      factoryCode.value = '1001';
    }
    factoryList.value = factoryDatas;
    await FunGetplantlist();
    await loadData();
    // timedChangePage();
  };

  // 工产加工实际人数
  const FunOne = async () => {
    const result = await GerPersonCountByPlan(
      factoryCode.value,
      selectDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;
      AllpersonCount.value = Data.allQty;
      personCount.value = Data.detailDt;
    }
  };
  // 厂区加工实际调配人数
  const FunTwo = async () => {
    const result = await GetTranOutInCountByPlan(
      factoryCode.value,
      selectDate.value
    );
    errorMsg.value = result.msg;
    OptionCircle.value = [];
    if (result.status) {
      console.log('result.data', result.data);
      const Data = result.data;
      Data.Dt.forEach((item: any) => {
        const option = {
          title: {
            text: item.ORG,
            left: 'center',
            top: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
            },
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            top: '5%',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
            icon: 'circle',
            show: false,
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['32%', '56%'],
              label: {
                fontSize: 18,
                color: '#fff',
                fontWeight: 'bold',
                overflow: 'none',
                formatter: '{c}',
              },
              // itemStyle: {
              //   borderWidth: 2, // 全局边框宽度
              //   borderColor: '#fff', // 全局边框颜色
              // },
              labelLine: {
                show: true,
                length: 8, // 第一段线的长度，默认是15
                length2: 12, // 第二段线的长度，默认是20
                lineStyle: {
                  width: 1, // 线宽
                  color: '#fff', // 线条颜色
                },
              },
              data: [
                {
                  value: item.OUTQTY,
                  name: '调出',
                  itemStyle: { color: '#8EC9F4' },
                },
                {
                  value: item.INQTY,
                  name: '调入',
                  itemStyle: { color: '#CDBFE8' },
                },
              ],
            },
          ],
        };
        OptionCircle.value.push({ Name: item.CODE, Option: option });
      });
    }
  };
  // 本月截止至上一工作日调配时数（H）
  const FunThree = async () => {
    // console.log('FunThree');
    const result = await GetTranOutInMonthHoursByPlan(
      factoryCode.value,
      selectDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;
      PlanHourList.value = Data.Dt;
      console.log('PlanHourList.value', PlanHourList.value);
    }
  };
  // 本日人员调配数量
  const FunFour = async (plant: any) => {
    // console.log('FunFour');
    const result = await GetTranOutInCountByDept(
      factoryCode.value,
      plant,
      selectDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data.Dt;
      const t1 = ref<any>([]);
      t1.value = [];
      // 使用 forEach 正确填充 t1.valuen
      Data.forEach((item: any, index: any) => {
        const moveleft = 100 - item.VALUEIN - 9;
        const moveright = 100 - item.VALUEOUT - 9;
        // t1.value.push([index, '1', '1']);

        t1.value.push([
          `<div style="display:flex;">
            <div style="width:90%;line-height:24px;flex:1; text-align: right;font-size:13px;margin-left:${moveleft}%">${item.INQTY}&nbsp;&nbsp;</div>
            <div style="width: ${item.VALUEIN}%;flex:2; background-color: #EA7F8C; height: 24px;box-shadow: 0px 0px 0px #ccc;border-top-left-radius: 5px;border-bottom-left-radius: 5px;line-height:24px"></div>
            </div>`,
          `<div style="line-height:24px">${item.DEPARTMENT_CODE}</div>`,
          `<div style="display:flex;">
            <div style="width: ${item.VALUEOUT}%;flex:2; background-color: #00A7FD; height: 24px;box-shadow: 0px 0px 0px #ccc;border-top-right-radius: 5px;border-bottom-right-radius: 5px;line-height:24px"></div>
           <div style="width:90%;flex:1; text-align: left;line-height:24px;font-size:13px;margin-right:${moveright}%">&nbsp;&nbsp;${item.OUTQTY}</div>
            </div>`,
        ]);
      });
      metereconfig1.value.data = t1.value;
    }
  };

  // 本月部门调配明细
  const FunFive = async () => {
    const result = await GetTranOutInHoursByMonth(
      factoryCode.value,
      PlantCode.value,
      selectDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;

      console.log('FunFive', Data);
      headList5.value = Data.headList;
      metereconfig.value.header = headList5.value;
      const t1 = ref<any>([]);
      const t2 = ref<any>([]);
      Data.Dt.forEach((row: any, rowIndex: any) => {
        t2.value = [];
        let i: any = 0;
        Object.keys(row).forEach((key) => {
          i += 1;
          let color: any = '#ffffff';
          if (i > 2 && row[key] >= 44) {
            color = '#E80E29';
          } else if (i > 2 && row[key] < 0) {
            color = '#04F01C';
          } else {
            color = '#FDFDFD';
          }
          if (row[key] === null) {
            row[key] = '-';
          }
          t2.value.push(`<span style="color: ${color};">${row[key]}</span>`);
        });
        t1.value.push(t2.value);
      });
      bodyList5.value = t1.value;
      metereconfig.value.data = bodyList5.value;
    }
  };
  // 本日部门调入技能明细
  const FunSix = async () => {
    const result = await GetStaffTranInSkillByDay(
      factoryCode.value,
      factoryareaCode.value,
      groupCode.value,
      selectDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;
      headList6.value = Data.headList;
      skillconfig.value.header = headList6.value;
      const t1 = ref<any>([]);
      const t2 = ref<any>([]);
      Data.Dt.forEach((row: any, rowIndex: any) => {
        t2.value = [];
        let i: any = 0;
        let bgcolor: any = '#F0BDC3';
        let color: any = 'black';
        let fontWeight: any = '600';

        Object.keys(row).forEach((key) => {
          i += 1;
          if (i > 2 && row[key] > 0) {
            bgcolor = 'transparent';
            color = '#ffffff';
            fontWeight = '500';
          }
        });
        i = 0;
        Object.keys(row).forEach((key) => {
          i += 1;
          if (i > 2 && row[key] > 0) {
            t2.value.push(
              `<div class="circle"><div class="circle0"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div></div></div>`
            );
          } else if (i > 2 && row[key] <= 0) {
            t2.value.push('<span></span>');
          } else if (i === 2) {
            t2.value.push(
              `<span style=" background-color:${bgcolor};color:${color};padding:0px 5px;font-weight:${fontWeight}">${row[key]}</span>`
            );
          } else if (i === 1) {
            t2.value.push(`<span>${row[key]}</span>`);
          }
        });
        t1.value.push(t2.value);
      });
      bodyList6.value = t1.value;
      skillconfig.value.data = bodyList6.value;
    }
  };
  // 本日部门调入技能占比
  const FunSeven = async () => {
    const result = await GetStaffTranInSkillPercentByDay(
      factoryCode.value,
      factoryareaCode.value,
      groupCode.value,
      selectDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;
      // console.log(Data.Dt);
      const t1 = ref<any>([]);
      const t2 = ref<any>([]);
      Data.Dt.forEach((row: any, rowIndex: any) => {
        t1.value.push(row.QTY);
        t2.value.push(row.PERCENT);
      });
      dataLength.value = t1.value.length;
      Showcount.value = 15;
      // 第二页显示数据
      start.value = 0;
      end.value = round((Showcount.value / dataLength.value) * 100, 2);

      barOption.value = {
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
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ['使用数', '技能占比'],
          textStyle: {
            color: '#FFF', // 设置图例文本的颜色为红色
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          top: '15%',
          containLabel: true,
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            bottom: '0%',
            start: start.value,
            end: end.value,
            show: showPageBtn.value,
            backgroundColor: '#0C2132',
            dataBackground: {
              lineStyle: {
                color: '#01A0F2',
              },
              areaStyle: {
                color: '#01A0F2',
              },
            },
            fillerColor: 'rgba(54,133,254,0.2)',
            handleColor: '#5470c6',
            textStyle: {
              fontSize: 12,
              color: '#333',
            },
            borderColor: '#5470c6',
            borderWidth: 1,
            height: 12,
          },
          {
            type: 'inside', // 内置型 dataZoom 组件，无需额外空间
            xAxisIndex: 0,
            start: start.value,
            end: end.value,
            // 注意：这里不需要设置 show 属性，除非你有特殊需求
          },
        ],
        xAxis: [
          {
            type: 'category',
            data: Data.headList,
            axisPointer: {
              type: 'shadow',
            },
            axisLine: { show: false }, // 隐藏轴线
            axisTick: { show: false }, // 隐藏刻度
            axisLabel: {
              show: true, // 显示标签
              color: '#fff', // 设置标签颜色（可选）
              fontSize: 14, // 设置标签字体大小（可选）
              rotate: 0, // 可根据需要调整角度
              interval: 0,
              formatter(value: any) {
                // 自定义标签格式化函数，可以根据值做不同的展示逻辑
                return `${value}`;
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位/人',
            min: 0,
            // max: 250,
            interval: 50,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff', // 设置刻度线的颜色
              },
            }, // 显示 Y 轴线
            axisTick: {
              show: true,
              lineStyle: {
                color: '#fff', // 设置刻度线的颜色
              },
            }, // 显示 Y 轴刻度
            axisLabel: {
              formatter: '{value}',
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: 'value',
            name: '技能占比',
            min: 0,
            // max: 100,
            interval: 5,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff', // 设置刻度线的颜色
              },
            }, // 显示 Y 轴线
            axisTick: {
              show: true,
              lineStyle: {
                color: '#fff', // 设置刻度线的颜色
              },
            }, // 显示 Y 轴刻度
            axisLabel: {
              formatter: '{value} %',
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '使用数',
            type: 'bar',
            tooltip: {
              valueFormatter(value: any) {
                return `${value}人`;
              },
            },
            barWidth: '50%', // 柱子宽度为每个类目间隔的一半
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0BBFC7', // 渐变起始颜色 (底部)
                  },
                  {
                    offset: 1,
                    color: '#029EF8', // 渐变结束颜色 (顶部)
                  },
                ],
                global: false, // 缺省为 false
              },
              barBorderRadius: [10, 10, 10, 10], // 正确地设置柱子的圆角
            },
            label: {
              show: true,
              color: '#ffffff', // 标签文字颜色
              distance: 10, // 标签与图形的距离
              position: 'inside',
              fontSize: 14, // 可选：设置标签字体大小
              formatter(params: any) {
                return `${params.value}人`; // 或者根据 params 进行更复杂的逻辑处理
              },
            },
            data: t1.value, // 只保留7个数据点
          },

          {
            name: '技能占比',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter(value: any) {
                return `${value}%`;
              },
            },
            symbolSize: 15,
            itemStyle: {
              color: '#ffffff', // 设置数据点颜色
              borderColor: '#ffffff', // 如果需要设置边框颜色
              borderWidth: 3, // 如果需要设置边框宽度
            },
            label: {
              show: true,
              color: 'gold', // 标签文字颜色
              distance: 10, // 标签与图形的距离
              fontSize: 14, // 可选：设置标签字体大小
              formatter(params: any) {
                return `${params.value}%`; // 或者根据 params 进行更复杂的逻辑处理
              },
            },
            lineStyle: {
              width: 3,
              color: '#FEFE00', // 折线的颜色
            },
            smooth: true,
            data: t2.value, // 只保留7个数据点
          },
        ],
      };
      initChart();
    }
  };
  // 本月各技能占比
  const FunEight = async () => {
    const result = await GetPlantTranInSkillCountByMonth(
      factoryCode.value,
      MonthDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;
      const dataList = Data.dataList.split(',');
      const headList = Data.headList.split(',');
      labels = [];
      const t1: any = [];
      const data1length = dataList.length;
      dataLength.value = headList.length;
      Showcount.value = 13;
      start.value = 0;
      end.value = round((Showcount.value / dataLength.value) * 100, 2);
      console.log(data1length, Data.dataList);
      if (Data.dataList !== '') {
        for (let i = 0; i < data1length; i += 1) {
          t1.push(1);
        }
      }

      Data.labelList.forEach((item: any) => {
        labels.push(item.NAME);
      });
      option1 = {
        tooltip: {
          trigger: 'none',
        },
        legend: {
          show: false,
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '8%',
          top: '30%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: headList,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 14,
            rotate: 0, // 可根据需要调整角度
            interval: 0,
            formatter(value: any) {
              // 自定义标签格式化函数，可以根据值做不同的展示逻辑
              return `${value}`;
            },
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              // color: '#cbeaf6', // 坐标轴label文字颜色
              show: false,
            },
            axisLine: {
              lineStyle: {
                show: false,
                // color: '#cbeaf6', // y坐标轴线颜色
              },
            },
            splitLine: {
              // 网格线
              lineStyle: {
                // type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
                // color: '#395367',
              },
              show: false, // 隐藏或显示
            },
          },
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            bottom: '0%',
            start: start.value,
            end: end.value,
            show: showPageBtn.value,
            backgroundColor: '#0C2132',
            dataBackground: {
              lineStyle: {
                color: '#01A0F2',
              },
              areaStyle: {
                color: '#01A0F2',
              },
            },
            fillerColor: 'rgba(54,133,254,0.2)',
            handleColor: '#5470c6',
            textStyle: {
              fontSize: 12,
              color: '#333',
            },
            borderColor: '#5470c6',
            borderWidth: 1,
            height: 12,
          },
          {
            type: 'inside', // 内置型 dataZoom 组件，无需额外空间
            xAxisIndex: 0,
            start: start.value,
            end: end.value,
            // 注意：这里不需要设置 show 属性，除非你有特殊需求
          },
        ],

        series: [
          {
            name: '技能工序',
            type: 'bar',
            barWidth: 50,
            stack: '分类',
            data: dataList,

            itemStyle: {
              // color: '#4992FF',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0BBFC7', // 渐变起始颜色 (底部)
                  },
                  {
                    offset: 1,
                    color: '#029EF8', // 渐变结束颜色 (顶部)
                  },
                ],
                global: false, // 缺省为 false
              },
              borderWidth: 1, // 设置边框宽度，可以根据需要调整
              barBorderRadius: [10, 10, 0, 0], // 圆角边框
            },
            label: {
              show: true,
              color: '#fff',
              fontSize: 16,
              position: 'inside',
              formatter(value: any) {
                // 自定义标签格式化函数，可以根据值做不同的展示逻辑
                return `${value.value}人`;
              },
            },
          },
          {
            name: 'label',
            type: 'bar',
            barWidth: 50,
            stack: '分类',
            color: '#FFF',
            itemStyle: {
              color: 'rgba(0,0,0,0)', // 设置柱子的颜色为透明
            },
            data: t1,
            label: {
              show: true,
              color: '#fff',
              fontSize: 11,
              position: 'top',
              lineHeight: 16, // 设置行高
              // align: 'left', // 整体对齐方式

              formatter(params: any) {
                // 根据数据项的索引来决定显示的文本
                return labels[params.dataIndex];
              },
              rich: {
                name: {
                  fontSize: 14,
                  color: '#333',
                  align: 'left', // 确保这部分内容左对齐
                  padding: [5, 0],
                },
                value: {
                  fontSize: 16,
                  color: '#000',
                  align: 'left', // 确保这部分内容左对齐
                  padding: [5, 0],
                },
              },
            },
          },
        ],
      };
      initChart();
    }
  };
  // 本月各周调入技能占比
  const FunNine = async () => {
    NineList.value = [];
    console.log(MonthDate.value);
    const result = await GetPlantTranInSkillCountByWeek(
      factoryCode.value,
      factoryareaCode.value,
      MonthDate.value
    );
    errorMsg.value = result.msg;
    if (result.status) {
      const Data = result.data;
      Data.Dt.forEach((item: any) => {
        const week = item.WEEK;
        const t1 = item.SKILL_NAME.split(',');
        const t2 = item.CT.split(',');
        const list = [];
        let sumct = 0;
        // console.log('CTCTCTTCT', t2);
        for (let i = 0; i < t1.length; i += 1) {
          sumct += Number(t2[i]);
          const str = `${t1[i]}-${t2[i]}人`;
          list.push({
            name: str,
            value: Number(t2[i]),
          });
        }
        // console.log(sumct);
        let wTime = 2000;
        if (showPageBtn.value) {
          wTime = 2000000000;
        }
        const config = reactive({
          data: list,
          unit: '人',
          waitTime: wTime,
          sort: false,
          rowNum: 6,
          valueFormatter(value: any) {
            const reverseNumber = round((value.value / sumct) * 100, 2);
            return `${reverseNumber}%`;
          },
        });
        console.log(config.data);
        NineList.value.push({
          name: week,
          data: config,
        });
      });
    }
  };
  function MonthDataChange() {
    console.log(MonthDate.value);
    if (IsMonth.value) {
      FunEight();
    } else {
      FunNine();
    }
    FunEight();
  }
  function Planclick(org: any) {
    factoryareaCode.value = org;
    FunNine();
    // alert(org);
  }
  function Circleclick(org: any) {
    // scrollClass.value = 'hidden';
    FunFour(org);
    // alert(org);
  }
  function clickAllPlant1() {
    FunFour('全部');
  }
  function clickAllPlant2() {
    factoryareaCode.value = '全部';
    FunNine();
  }
  // 刷新数据
  function refreshData() {
    errorMsg.value = '';
    loadData();
  }
  function convertDateFormat(dateStr: string): string {
    // 使用正则表达式匹配并替换斜杠为连字符
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}`;
    }
    throw new Error('Invalid date format');
  }
  // 顶部-1-日期选择事件
  function handleChangeDate() {
    try {
      const convertedDate = convertDateFormat(selectDate.value);
      MonthDate.value = convertedDate;
      refreshData();
    } catch (err) {
      alert(err);
    }
  }
  // 顶部-1-工厂选择事件
  function handleChangeOrg() {
    refreshData();
    FunGetplantlist();
  }
  function handleChangeheadPlant() {
    refreshData();
  }
  // 顶部-1-工作中心选择事件
  function handleChangeDept() {
    refreshData();
  }
  // 顶部-1-厂区选择事件
  function handleChangePlant(e: any) {
    console.log(e);
    FunGetgrouplist();
    handleChangeDept();
  }
  // 顶部-2-切换上一个页面
  function handlePrevPage() {
    dispalyPage.value = ChangePage(-1);
    refreshData();
  }
  // 函数切换页面
  function ChangePage(addnum: any) {
    let index = dispalyPage.value;
    index += addnum;
    if (index > 3) {
      index = 1;
    }
    if (index < 1) {
      index = 3;
    }
    return index;
  }
  // 顶部-2-切换下一个页面
  function handleNextPage() {
    dispalyPage.value = ChangePage(1);
    refreshData();
  }

  // 顶部-2-停止滚动
  function handleStop() {
    showPageBtn.value = !showPageBtn.value;
    if (showPageBtn.value) {
      modelName.value = '自动模式';
      metereconfig.value.waitTime = 20000000;
      metereconfig1.value.waitTime = 20000000;
      skillconfig.value.waitTime = 20000000;
      stopTimer(); // 组件卸载前停止定时器
      NineList.value.forEach((item: any) => {
        item.data.waitTime = 20000000;
      });
      scrollClass.value = 'scroll';
      if (myChart) {
        option1.dataZoom[0].show = true;
        myChart.setOption(option1);
      }
      if (myChart2) {
        barOption.value.dataZoom[0].show = true;
        myChart2.setOption(barOption.value);
      }
    } else {
      if (myChart) {
        option1.dataZoom[0].show = false;
        myChart.setOption(option1);
      }
      if (myChart2) {
        barOption.value.dataZoom[0].show = false;
        myChart2.setOption(barOption.value);
      }
      modelName.value = '手动模式';
      scrollClass.value = 'hidden';
      startTimer();
      metereconfig.value.waitTime = 2000;
      metereconfig1.value.waitTime = 2000;
      skillconfig.value.waitTime = 2000;
      NineList.value.forEach((item: any) => {
        item.data.waitTime = 2000;
      });
    }
  }
  getFactoryList();

  skillconfig.value = reactive({
    header: [],
    data: [],
    // index: true,
    columnWidth: [100, 100],
    align: ['center'],
    rowNum: [11],
    indexHeader: ['序号'],
    hoverPause: true,
    headerBGC: '#014EB8',
    evenRowBGC: '#376B7E',
    oddRowBGC: '#072730',
    // headerHeight: 45,
    waitTime: 2000,
    // rowHeight: 30,
    // rowBGC: '#f9f9f9'
  });
  function SearchToMonth() {
    const btnSearchToMonth = document.getElementById(
      'SearchToMonth'
    ) as HTMLButtonElement;
    btnSearchToMonth.className = 'button  button1';
    const btnSearchToWeek = document.getElementById(
      'SearchToWeek'
    ) as HTMLButtonElement;
    btnSearchToWeek.className = 'button  button2';
    IsMonth.value = true;
    FunEight();
  }

  function SearchToWeek() {
    const btnSearchToMonth = document.getElementById(
      'SearchToMonth'
    ) as HTMLButtonElement;
    btnSearchToMonth.className = 'button  button2';
    const btnSearchToWeek = document.getElementById(
      'SearchToWeek'
    ) as HTMLButtonElement;
    btnSearchToWeek.className = 'button  button1';
    IsMonth.value = false;
    FunNine();
  }

  // let intervalId2: any | null;
  // 定义一个函数用于更新dataZoom的位置
  function updateDataZoom() {
    const leng: any = Number(dataLength.value);
    console.log('leng:', leng);
    if (leng > 0) {
      const i = round((1 / leng) * 100, 2);
      // alert(i);
      // 每次调用时增加start和end的值
      start.value += Number(i);
      end.value += Number(i);
      // 如果end超过了100，则重置start和end到初始值
      if (end.value > 100) {
        start.value = 0;
        end.value = round((Showcount.value / leng) * 100, 2);
      }
      // console.log('myChart:', myChart, 'myChart2:', myChart2);
      // 更新图表1的 dataZoom 配置
      if (myChart) {
        option1.dataZoom[0].start = start.value;
        option1.dataZoom[0].end = end.value;
        myChart.setOption(option1);
      }
      // 更新图表1的 dataZoom 配置
      if (myChart2) {
        barOption.value.dataZoom[0].start = start.value;
        barOption.value.dataZoom[0].end = end.value;
        myChart2.setOption(barOption.value);
      }
    }
  }
  // 开始定时器
  function startTimer() {
    intervalId = setInterval(updateDataZoom, 2000); // 每2秒调用一次updateDataZoom
    kanbanTimer.value = setInterval(handleNextPage, pageInterva); // 切换页面
  }
  // 停止定时器
  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
    if (kanbanTimer.value) {
      clearInterval(kanbanTimer.value);
      intervalId = kanbanTimer.value;
    }
  }

  // 初始化图表
  function initChart() {
    // 确保在重新初始化之前销毁旧的图表实例
    if (myChart) {
      myChart.dispose();
    }
    if (myChart2) {
      myChart2.dispose();
    }
    // console.log('初始化BOM元素1', chartRef1.value);
    if (chartRef1.value) {
      // console.log('初始化图表1');
      myChart = echarts.init(chartRef1.value);
      myChart.setOption(option1);
    }
    // console.log('初始化BOM元素2', chartRef2.value);
    if (chartRef2.value) {
      // console.log('初始化图表2');
      myChart2 = echarts.init(chartRef2.value);
      myChart2.setOption(barOption.value);
    }
  }
  // 加载数据
  function loadData() {
    // console.log('loadData');
    if (dispalyPage.value === 1) {
      FunOne();
      FunTwo();
      FunThree();
      FunFour('');
      FunEight();
      FunNine();
      FunFive();
    } else if (dispalyPage.value === 3) {
      FunSix();
      FunSeven();
    } else if (dispalyPage.value === 2) {
      // FunFour();
      FunFive();
      FunSix();
      FunSeven();
    }
  }
  onMounted(() => {
    initChart();
    startTimer();
  });
  onBeforeUnmount(() => {
    stopTimer(); // 组件卸载前停止定时器
    if (myChart) {
      myChart.dispose(); // 销毁图表实例
    }
    if (myChart2) {
      myChart2.dispose(); // 销毁图表实例
    }
  });
</script>

<style lang="less" scoped>
  ::v-deep .circle {
    position: relative;
    width: 30px;
    height: 30px;
    background-image: url('@/assets/images/person.png');
    background-size: cover;
    margin: 0px auto;
    // background-color: transparent;
  }
  ::v-deep .circle0 {
    width: 30px;
    height: 30px;
    /* border: 1px solid rgba(162, 0, 255, 0.2); */
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: -6px;
    margin-right: -7px;
    /* position: relative; */
  }
  ::v-deep .circle1 {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fefe00;
    right: 10px;
    bottom: 10px;
    position: absolute;
  }
  ::v-deep .circle2 {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    margin: 0px auto;
    right: 5px;
    bottom: 5px;
    animation-name: changeColor2;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  ::v-deep .circle3 {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    animation-name: changeColor3;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  @keyframes changeColor2 {
    0% {
      background-color: rgba(255, 255, 0, 0.4); /* 半透明黄色 */
    }
    50% {
      background-color: rgba(255, 255, 0, 0.4); /* 半透明黄色 */
    }
    100% {
      background-color: transparent;
    }
  }
  @keyframes changeColor3 {
    0% {
      background-color: transparent;
    }
    50% {
      background-color: rgba(255, 255, 0, 0.2); /* 半透明黄色 */
    }
    100% {
      background-color: transparent;
    }
  }
  li {
    line-height: 35px;
    list-style: none;
    font-size: 18px;
  }
  .two-li li div:last-child {
    text-align: left;
    // border: 1px solid red;
    margin-left: 5px;
    margin-top: -3px;
  }
  .two-li {
    margin-left: -50px;
    // border: 1px solid red;
    font-size: 18px;
  }
  .two-li li div {
    flex: 1;
  }
  ::v-deep .two-li .arco-statistic-value-integer {
    font-size: 21px;
  }
  ::v-deep .threenumber .arco-statistic-value-integer {
    font-size: 21px;
    margin: 0px auto;
  }
  ::v-deep .arco-statistic-content .arco-statistic-value-decimal {
    font-size: 21px;
    margin: 0px auto;
  }
  ::v-deep .dv-scroll-board .rows .row-item {
    font-size: 14px;
  }
  ::v-deep .dv-scroll-board .rows .ceil {
    padding: 0px 0px;
    text-align: center;
  }
  ::v-deep .dv-scroll-board .header .header-item {
    padding: 0px 0px;
    text-align: center;
  }
  ::v-deep .table-box .dv-scroll-board .header .header-item {
    // width: 200px; /* 设置容器宽度 */
    // border: 1px solid #ccc; /* 可选：添加边框以便可视化容器 */
    padding: 5px; /* 可选：添加内边距 */
    word-wrap: break-word; /* 允许长单词或 URL 地址换行到下一行 */
    white-space: normal; /* 默认值，允许文本换行 */
    overflow-wrap: break-word; /* 确保长单词可以在合适的地方断开 */
    line-height: 20px !important;
    height: auto !important;
    // color: #029ff6;
    font-size: 14px;
    border: 1px solid gray;
  }
  ::v-deep .dv-scroll-board .header {
    // border: 1px solid white;
  }
  ::v-deep
    .arco-select-view-single.arco-select-view-size-medium
    .arco-select-view-value {
    min-height: auto;
  }
  .button {
    position: relative;
    background-color: #4caf50;
    border: none;
    font-size: 16px;
    color: #ffffff;
    padding: 8px;
    width: 60px;
    height: 30px;
    line-height: 10px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
  }

  .button:after {
    content: '';
    background: #01a0f2;
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
  .button1 {
    background-color: #01a0f2;
    color: white;
    // border: 2px solid #af4c4c;
  }

  .button1:hover {
    background-color: #01a0f2;
    color: white;
  }

  .button2 {
    background-color: #e4d9d9;
    color: black;
    // border: 2px solid #af4c4c;
  }

  .button2:hover {
    background-color: white;
    color: black;
  }
  ::v-deep .Month .arco-picker {
    background-color: transparent;
    border: 1px solid #01a0f2;
    color: white;
  }

  ::v-deep .Month .arco-picker input,
  ::v-deep .Month .arco-picker-start-time {
    color: white;
  }
  ::v-deep .Month .arco-picker-suffix-icon {
    color: white;
  }
  ::v-deep .Month .arco-select-view-single {
    background-color: transparent;
    color: white;
    border: 1px solid #01a0f2;
  }
  ::v-deep .Month .arco-icon {
    color: white;
  }
  ::v-deep .Week .dv-scroll-ranking-board .ranking-info .rank {
    display: none;
  }
  // .scroll {
  //   ::v-deep .dv-scroll-board .rows,
  //   .dv-scroll-ranking-board {
  //     overflow-y: scroll;
  //     scrollbar-width: thin; /* 或 'auto' | 'none' */
  //     scrollbar-color: #01a0f2 #0c2132; /* 滑块颜色 | 轨道颜色 */
  //   }
  // }
  /* 基础样式 */
  .scroll ::v-deep .dv-scroll-board .rows,
  .scroll ::v-deep .dv-scroll-ranking-board {
    overflow-y: scroll;
  }

  /* Firefox 支持 */
  .scroll ::v-deep .dv-scroll-board .rows,
  .scroll ::v-deep .dv-scroll-ranking-board {
    scrollbar-width: thin; /* 设置滚动条宽度 */
    scrollbar-color: #01a0f2 #0c2132; /* 滑块颜色 | 轨道颜色 */
  }

  /* WebKit/Blink (Chrome, Safari, Edge) 支持 */
  .scroll ::v-deep .dv-scroll-board .rows::-webkit-scrollbar {
    width: 8px; /* 设置滚动条宽度 */
  }

  .scroll ::v-deep .dv-scroll-board .rows::-webkit-scrollbar-thumb {
    background-color: #01a0f2; /* 滑块颜色 */
    border-radius: 4px; /* 圆角 */
  }

  .scroll ::v-deep .dv-scroll-board .rows::-webkit-scrollbar-track {
    background-color: #0c2132; /* 轨道颜色 */
  }

  /* 同样为.dv-scroll-ranking-board添加WebKit/Blink滚动条样式 */
  .scroll ::v-deep .dv-scroll-ranking-board::-webkit-scrollbar {
    width: 8px;
  }

  .scroll ::v-deep .dv-scroll-ranking-board::-webkit-scrollbar-thumb {
    background-color: #01a0f2;
    border-radius: 4px;
  }

  .scroll ::v-deep .dv-scroll-ranking-board::-webkit-scrollbar-track {
    background-color: #0c2132;
  }
  .hidden {
    ::v-deep .dv-scroll-board .rows,
    .dv-scroll-ranking-board {
      overflow: hidden;
    }
  }
  ::v-deep canvas {
    width: 1600px;
  }
  // ::v-deep .arco-col-7 {
  //   padding: 5px 0px !important;
  //   // margin: 0px !important;
  // }
  // ::v-deep .arco-col-24 {
  //   padding: 5px 3px !important;
  // }
  ::v-deep .arco-col {
    padding: 5px 5px !important;
  }
  :deep(.header-item) {
    // font-size: 26px;
    display: flex;
    padding: 0 5px;
    align-items: center;
    justify-content: center;
    // background: linear-gradient(to right, #0430a1, #00fafd);
    // clip-path: polygon(0 0, 133px 0, 143px 13px, 143px 45px, 0 45px);
  }
  .full {
    background-color: rgb(35, 21, 239);
    background-size: cover;
    z-index: 1;
  }
  .full-screen-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff; /* 根据需要设置背景色 */
    z-index: 999; /* 确保它在其他元素之上 */
  }

  .container {
    position: fixed;
    top: 105px;
    width: 1920px;
    height: 975px;
    // background-image: url('@/assets/images/pageBg.png');
    background-color: black;
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
  .point {
    cursor: pointer;
  }
  ::v-deep .four-box .dv-scroll-board .rows .row-item {
    height: 34.545px;
    line-height: 34.545px;
  }
  // ::deep x-vue-echarts {
  //   display: none;
  // }
</style>
