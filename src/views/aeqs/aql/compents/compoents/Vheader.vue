<template>
    <div class="contenthead">
        <div class="headLeft common">
            <img src="../../../../../assets/images/back.png" style="width: 40px;" @click="goBack" v-if="!pageIndex" />
            <button class="gradient-button" @click="gobackMain" v-else>Return</button>
            <!-- <p v-if="!pageIndex" style="font-size: 17px;"> Last used : {{ lastOpenTime }}</p> -->
        </div>

        <div class="headMId common">
            <h1>{{ titleMsg }}</h1>
        </div>

        <div class="headRight common">
            <div class="rightL">
                <p>{{ dateTime }}</p>
            </div>

            <div class="RightR">
                <button class="gradient-button" @click="toFullOrExit">{{ fullText }}</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GetLastOpenTime } from '@/api/aeqs';
import { ref, onMounted, onBeforeUnmount, PropType } from 'vue';

const props = defineProps({
    titleMsg: {
        type: String,
        required: false,
        default: 'AQL Analysis',
    },
    changeColor: {
        type: Function as PropType<() => void>,
        required: false,
    },
    pageIndex: {
        type: Boolean as PropType<boolean>,
        required: false,
        default: false,
    },
    
})

const dateTime = ref<string>('');
const fullText = ref<string>('Fullscreen');
const lastOpenTime = ref<string>('');
const isFull = ref<boolean>(false);
let timeId: any = 0;

function formatNumber(num: number) {
    return String(num).padStart(2, '0');
}

function getTimes() {
    // 创建一个 Date 对象，表示当前时间
    const now = new Date();
    // 获取年
    const year = now.getFullYear();
    // 获取月，月份是从0开始的，所以需要加1
    const month = now.getMonth() + 1;
    // 获取日
    const day = now.getDate();
    // 获取星期几，星期是从0开始的，0代表星期天，6代表星期六
    const weekDay = now.getDay();
    // 获取时
    const hours = formatNumber(now.getHours());
    // 获取分
    const minutes = formatNumber(now.getMinutes());
    // 获取秒
    const seconds = formatNumber(now.getSeconds());
    // 星期几的中文表示
    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const weekDayName = weekDays[weekDay];
    return `${year}/${month}/${day} - ${weekDayName} ${hours}:${minutes}:${seconds}`;
}

const changepageIndex=defineEmits(['changepageIndex'])

const updateTime = () => {
    dateTime.value = getTimes();
};



// Start updating the time



onBeforeUnmount(() => {
    if (timeId) clearInterval(timeId);
});


const requestFullScreen = () => {
    const de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    }
};

const exitFullscreen = () => {
    const de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    }
};

const toFullOrExit = () => {
    isFull.value = !isFull.value;
    if (isFull.value) {
        fullText.value = 'UnFullscreen';
        requestFullScreen();
    } else {
        fullText.value = 'Fullscreen';
        exitFullscreen();
    }
};

const goBack = () => {
    if (isFull.value) {
        exitFullscreen();
    }
    window.history.go(-1);
};
async function getOpentime() {
    const opentime = await GetLastOpenTime('aqlAnalysis');
    console.log(opentime)
    lastOpenTime.value = opentime.data

}
const gobackMain = () => {  
    changepageIndex('changepageIndex',!props.pageIndex)
};

onMounted(() => {
    timeId = setInterval(updateTime, 1000);
    getOpentime()
    toFullOrExit()
 
});
</script>

<style lang="less" scoped>
.contenthead {
    height: 50px;
    display: flex;
    justify-content: space-around;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

    .headMId {
        color: white;
        font-size: 18px;
        display: flex;
        justify-content: center;
        line-height: 1px;
    }

    .headLeft {
        display: flex;
        justify-content: space-between;
        padding: 1px;

        .gradient-button {
            display: inline-block;
            text-align: center;
            line-height: 50%;
            width: auto;
            height: 33px;
            margin-left: 12px;
            margin-top: 8px;
            font-size: 16px;
            border: 0;
            color: white;
            background-image: linear-gradient(to right, #3f51b5, #2196f3);
            /* 蓝色渐变 */
            border-radius: 4px;
            text-align: center;
        }

        p {
            color: white;
            font-size: 13px;
        }

    }

    .headRight {
        display: flex;
        justify-content: space-around;
        font-size: 17px;

        color: white;

        .rightM {

            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 0;
            //font-size: 10px;

        }

        .RightR {

            .gradient-button {
                display: inline-block;
                text-align: center;

                width: 100px;
                height: 40px;
                font-size: 15px;
                border: 0;
                margin-top: 10px;
                color: white;
                background-image: linear-gradient(to right, #3f51b5, #2196f3);
                /* 蓝色渐变 */
                border-radius: 10px;
                text-align: center;
            }
        }
    }
}


.common {
    flex: 1;
    //border: 1px solid black;

}
</style>