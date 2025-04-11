<template>
    <div class='diaTable' :style="{ width: hiddenInput ? 0 : width }">
        <div class="inputBox" v-if="!hiddenInput">
            <a-input @focus="focus" @click="handleClick" @clear="clear" ref="inputref" :allow-clear="clearable"
                size="large" :disabled="disabled" v-model="localValue" placeholder="请点击选择" style="width: 260px;">
                <template #prefix>
                    <icon-drag-dot />
                </template>
            </a-input>
        </div>
        <a-modal :destroy-on-close="destroyOnClose" :style="{ marginTop: top }" v-model:visible="dialogVisible"
            class="dia" :mask="false" :width="diaWidth" @ok="multipleComfirm" @cancel="dialogVisible = false">
            <!-- 对话框内容 -->
            <template v-if="$slots.default">
                <slot></slot>
            </template>
            <template v-else>
                <div class="search" v-if="!hiddenSearch">
                    <a-input class="searchInput" v-model="params.KeyWord" placeholder="请输入搜索内容" allow-clear
                        @press-enter="getTableData">
                    </a-input>
                    <a-button class="searchBtn" type="primary" @click="getTableData">
                        搜索
                    </a-button>
                </div>
            </template>
            <div class="table">
                <a-table :row-key="rowKey" :columns="effectiveColumns" :data="tableData" size="small"
                    :row-selection="rowSelect" :pagination="false" :scroll="scroll" :scrollbar="scrollbar"
                    v-model:selectedKeys="selectedKeys" @selection-change="handleSelectionChange" ref="multipleTable" />

                <a-pagination :total="total" show-total show-page-size @change="handleCurrentChange"
                    @page-size-change="handleSizeChange" />
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRaw, watch, } from 'vue';
import { getDataDt } from '@/api/aeqs';
import { Message } from '@arco-design/web-vue';

const selectedKeys = ref<any>([]);
const dialogVisible = ref<boolean>(false);
const loading = ref<boolean>(false);
const total = ref<number>(0);
const scrollbar = ref(true);
const scroll = {
    x: '100%',
    y: 400
};
const multipleTable = ref(null);
// 使用 reactive 定义复杂对象的响应式数据
const tableData = ref<any>([]);
let columns = reactive<Array<any>>([])
const multipleSelection = ref<any>([]);
let retHead = reactive([] as any[]); // 假设表头是字符串数组
const inputref = ref(null);
const emit = defineEmits(['input', 'update:show', 'comfirm']);

interface TableRowSelection {
    type?: 'checkbox' | 'radio';
    showCheckedAll?: boolean;
    onChange?: (selectedRowKeys: any, selectedRows: any) => void;
    getCheckboxProps?: (record: any) => { disabled?: boolean; name?: string };
}
const rowSelect: TableRowSelection = {
    type: 'checkbox',
    showCheckedAll: true

};


// 参数对象
const params = ref<any>({

})
params.value = {
    KeyWord: '' as string,
    Page: 1 as number,
    PageRow: 10 as number,
}
const props = defineProps({
    clearable: {
        type: Boolean,
        default: true,
    },
    value: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'multiple',
    },
    head: {
        type: Array,
        default: () => [],
    },
    show: {
        type: Boolean,
        default: false,
    },
    destroyOnClose: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '100%',
    },
    diaWidth: {
        type: String,
        default: '30%',
    },
    top: {
        type: String,
        default: '15vh',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    hiddenInput: {
        type: Boolean,
        default: false,
    },
    hiddenSearch: {
        type: Boolean,
        default: false,
    },
    hiddenPage: {
        type: Boolean,
        default: false,
    },
    apiName: {
        type: String,
        default: '',
    },
    searchForm: {
        type: Array,
        default: () => [],
    },

})
const effectiveColumns = computed(() => props.head.length ? props.head : retHead);

const rowKey = computed(() => {
    const secondColumn = props.head[1];
    if (secondColumn && typeof secondColumn === 'object' && 'dataIndex' in secondColumn) {
        return (secondColumn as any).dataIndex;
    }
    return '';
});
const focus = () => {
    if (inputref.value) {
        (inputref.value as any).blur();
    };
}
const localValue = ref(props.value)
const clear = () => {
    emit('input', '');
};
const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    console.log(target);
    if (target.classList.contains('arco-icon-close')) return;
    if (!props.disabled) {
        params.value = {
            KeyWord: '' as string,
            Page: 1 as number,
            PageRow: 10 as number,
        }
        dialogVisible.value = true;
    }
};
const getTableData = async () => {
    tableData.value = []
    loading.value = true
    const { apiName } = props;
    const res = await getDataDt(params.value, apiName)
    if (res.IsSuccess) {
        const RetData = res.RetData1 || res.RetData1 || res
        tableData.value = RetData.data || RetData.Data
        tableData.value = tableData.value.map((item: any, index: any) => {

            const { RN, ...rest } = item;

            // 将第一个键作为 key 属性添加到 item 中
            return { ...item, key: RN }; // 或者如果你需要第一个值作为 key: return { ...item, key: firstValue };
        });

        total.value = RetData.total || RetData.Total || 0
        let head:any=[]
         head = RetData.head || RetData.Head || RetData.HEAD || RetData.headData || RetData.headdata
        if (head) {
            if (Array.isArray(head)) {
                retHead = head
            } else {
                retHead = []
                Object.keys(head).forEach(key => {
                    const obj:any = { title: key, dataIndex: head[key] };
                    retHead.push(obj);
                });
                columns = retHead
            }

        }
    } else {
        Message.error(res.ErrMsg || '获取弹窗数据失败')
        total.value = 0
        tableData.value = []
        loading.value = false
    }



}

watch(() => props.show, (newVal, oldVal) => {
    if (props.hiddenInput) {
        dialogVisible.value = newVal;
    }
});
// 监听 dialogVisible 的变化
watch(dialogVisible, (newVal, oldVal) => {
    if (props.hiddenInput) {
        emit('update:show', newVal);
    }
    if (newVal) {
        params.value.Page = 1;
    }
    if (newVal) {
        getTableData();
    }
});
function handleSizeChange(val: any) {
    console.log(`每页 ${val} 条`);
    params.value.PageRow = val
    getTableData()
}

watch(() => props.value, (newValue) => {
    localValue.value = newValue;
});

function handleCurrentChange(val: any) {
    console.log(`当前页: ${val}`);
    params.value.Page = val;
    getTableData()
}
function multipleComfirm() {
    emit('comfirm', [...toRaw(multipleSelection.value)])
    dialogVisible.value = false
    selectedKeys.value = []

}
function handleSelectionChange(val: any) {
    multipleSelection.value = val;

}

</script>

<style lang="less" scoped>
.diaTable {
    :deep(.el-pagination__sizes .el-input .el-input__inner) {
        color: black !important;
    }

    display: inline-block;

    /deep/.inputBox {
        cursor: pointer;

        input {
            cursor: pointer;
        }

        .is-disabled {
            input {
                cursor: not-allowed;
            }
        }
    }
}

.dia {
    .search {
        display: flex;
        align-items: center;

        .searchInput {
            margin-right: 15px;
            width: 200px;
        }
    }

    .table {
        margin-top: 15px;

        .page2 {
            margin-top: 5px;
        }
    }
}


/deep/ .el-table--enable-row-transition .el-table__body td.el-table__cell {
    border: 1px solid #323232 !important;
}

:deep(.el-input .el-input__inner) {
    color: black !important;
}
</style>