<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.DailyProduction_Output']" />
    <a-card class="general-card" :title="$t('menu.list.DailyProduction_Output')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('DailyProduction_Output.form.se_id')"
                >
                  <a-input
                    v-model="formModel.se_id"
                    :placeholder="$t('DailyProduction_Output.form.se_id.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('DailyProduction_Output.form.order_no')">
                  <a-input
                    v-model="formModel.order_no"
                    :placeholder="$t('DailyProduction_Output.form.order_no.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('DailyProduction_Output.form.art')">
                  <a-input
                    v-model="formModel.art"
                    :placeholder="$t('DailyProduction_Output.form.art.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('DailyProduction_Output.form.company')">
                  <a-input
                    v-model="formModel.company"
                    :placeholder="$t('DailyProduction_Output.form.company.placeholder')"
                  />
                </a-form-item>
              </a-col>

              <!-- <a-col :span="8">
                <a-form-item
                  field="filterType"
                  :label="$t('DailyProduction_Output.form.filterType')"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    :placeholder="$t('DailyProduction_Output.form.selectDefault')"
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('DailyProduction_Output.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('DailyProduction_Output.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('DailyProduction_Output.form.selectDefault')"
                  />
                </a-form-item>
              </a-col> -->
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('DailyProduction_Output.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('DailyProduction_Output.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <!-- <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('DailyProduction_Output.operation.download') }}
          </a-button> -->
          <a-tooltip :content="$t('DailyProduction_Output.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('DailyProduction_Output.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('DailyProduction_Output.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="handleChange($event, item as TableColumnData, index)"
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #contentType="{ record }">
          <a-space>
            <a-avatar
              v-if="record.contentType === 'img'"
              :size="16"
              shape="square"
            >
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar
              v-else-if="record.contentType === 'horizontalVideo'"
              :size="16"
              shape="square"
            >
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar v-else :size="16" shape="square">
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            {{ $t(`DailyProduction_Output.form.contentType.${record.contentType}`) }}
          </a-space>
        </template>
        <template #filterType="{ record }">
          {{ $t(`DailyProduction_Output.form.filterType.${record.filterType}`) }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'offline'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`DailyProduction_Output.form.status.${record.status}`) }}
        </template>
        <template #operations>
          <a-button v-permission="['admin']" type="text" size="small">
            {{ $t('DailyProduction_Output.columns.operations.view') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { PolicyParams } from '@/api/list';
  import { PolicyRecord,DeliyProductionQuery }  from  '@/api/report_api';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      se_id: '',
      order_no: '',
      art: '', 
      company: '',
      createdTime: [], 
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const densityList = computed(() => [
    {
      name: t('DailyProduction_Output.size.mini'),
      value: 'mini',
    },
    {
      name: t('DailyProduction_Output.size.small'),
      value: 'small',
    },
    {
      name: t('DailyProduction_Output.size.medium'),
      value: 'medium',
    },
    {
      name: t('DailyProduction_Output.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('DailyProduction_Output.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('DailyProduction_Output.columns.SUPPLIERS_NAME'),
      dataIndex: 'SUPPLIERS_NAME',
    },
    {
      title: t('DailyProduction_Output.columns.WORKCENTER'),
      dataIndex: 'WORKCENTER',
    },
    {
      title: t('DailyProduction_Output.columns.DEPARTMENT_NAME'),
      dataIndex: 'DEPARTMENT_NAME',
    },
    {
      title: t('DailyProduction_Output.columns.INSERT_DATE'),
      dataIndex: 'INSERT_DATE',
    },
    {
      title: t('DailyProduction_Output.columns.QTY'),
      dataIndex: 'QTY',
    },
    {
      title: t('DailyProduction_Output.columns.SALES_ORDER'),
      dataIndex: 'SALES_ORDER',
    },
    {
      title: t('DailyProduction_Output.columns.ART_NO'),
      dataIndex: 'ART_NO',
    },
    {
      title: t('DailyProduction_Output.columns.SIZE1'),
      dataIndex: 'SIZE1',
    },
    {
      title: t('DailyProduction_Output.columns.ORDER_NO'),
      dataIndex: 'ORDER_NO',
    } 
  ]);
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const  data:any = await DeliyProductionQuery(params,formModel.value);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };
  
  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'DailyProduction_Output',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
