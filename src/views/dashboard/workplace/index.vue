<template>
  <div class="container">
    <!-- <div class="left-side">
      <div class="panel">
        <Banner />
        <DataPanel />
        <ContentChart />
      </div>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <PopularContent />
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }"
        >
          <CategoriesPercent />
        </a-grid-item>
      </a-grid>
    </div>
    <div class="right-side">
      <a-grid :cols="24" :row-gap="16">
        <a-grid-item :span="24">
          <div class="panel moduler-wrap">
            <QuickOperation />
            <RecentlyVisited />
          </div>
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Carousel />
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Announcement />
        </a-grid-item>
        <a-grid-item class="panel" :span="24">
          <Docs />
        </a-grid-item>
      </a-grid>
    </div> -->
    <!-- <img :src="bannerImage" style="position: absolute" class="imgs" />
     <CategoriesPercent />
    <h1 style="position: relative" class="h11">
      <p>{{ timeNow }}</p>
    </h1 > -->
  </div>
</template>

<script lang="ts" setup>
  import bannerImage from '@/assets/images/shouye.png';
  import { ref } from 'vue';
  import Banner from './components/banner.vue';
  import DataPanel from './components/data-panel.vue';
  import ContentChart from './components/content-chart.vue';
  import PopularContent from './components/popular-content.vue';
  import CategoriesPercent from './components/categories-percent.vue';
  import RecentlyVisited from './components/recently-visited.vue';
  import QuickOperation from './components/quick-operation.vue';
  import Announcement from './components/announcement.vue';
  import Carousel from './components/carousel.vue';
  import Docs from './components/docs.vue';


</script>

<script lang="ts"></script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-1);
    padding: 16px 20px;
    padding-bottom: 0;
    // display: flex;
    background-image: url('@/assets/images/shouye.png');
    background-repeat: no-repeat;
    // background-position: -20px -50px;
    background-size: cover;
    // border: 1px solid red;
  }
  .imgs {
    width: 87%;
    height: 85%;
    opacity: 0.6;
    object-fit: contain;
  }
  .h11 {
    color: goldenrod;
    margin-left: 3%;
    text-align: center;
  }

  // .left-side {
  //   flex: 1;
  //   overflow: auto;
  // }

  // .right-side {
  //   width: 280px;
  //   margin-left: 16px;
  // }

  // .panel {
  //   background-color: var(--color-bg-2);
  //   border-radius: 4px;
  //   overflow: auto;
  // }
  // :deep(.panel-border) {
  //   margin-bottom: 0;
  //   border-bottom: 1px solid rgb(var(--gray-2));
  // }
  // .moduler-wrap {
  //   border-radius: 4px;
  //   background-color: var(--color-bg-2);
  //   :deep(.text) {
  //     font-size: 12px;
  //     text-align: center;
  //     color: rgb(var(--gray-8));
  //   }

  //   :deep(.wrapper) {
  //     margin-bottom: 8px;
  //     text-align: center;
  //     cursor: pointer;

  //     &:last-child {
  //       .text {
  //         margin-bottom: 0;
  //       }
  //     }
  //     &:hover {
  //       .icon {
  //         color: rgb(var(--arcoblue-6));
  //         background-color: #e8f3ff;
  //       }
  //       .text {
  //         color: rgb(var(--arcoblue-6));
  //       }
  //     }
  //   }

  //   :deep(.icon) {
  //     display: inline-block;
  //     width: 32px;
  //     height: 32px;
  //     margin-bottom: 4px;
  //     color: rgb(var(--dark-gray-1));
  //     line-height: 32px;
  //     font-size: 16px;
  //     text-align: center;
  //     background-color: rgb(var(--gray-1));
  //     border-radius: 4px;
  //   }
  // }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
</style>
