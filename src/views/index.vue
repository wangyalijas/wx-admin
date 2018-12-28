<template>
  <div class="wrap">
    <the-header></the-header>
    <div class="wrap-inner">
      <el-scrollbar style="height: 100%">
        <div class="wrap-inner__page">
          <div class="wrap-inner__page--content">
            <router-view/>
          </div>
        </div>
        <the-footer></the-footer>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'home',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss">
  .el-scrollbar{
    .el-scrollbar__wrap{
      overflow-x: hidden;
      .el-scrollbar__view{
        height: 100%;
      }
    }
  }
  .wrap{
    position: relative;
    width: 100%;
    height: 100%;
    .wrap-inner{
      margin-top: 60px;
      height: calc(100% - 50px);
      width: 100%;
      @include e(page){
        width: 1366px;
        margin: 0 auto;
        @include m(content){
          margin: 0 10px 10px 10px;
          background: #fff;
        }
      }
    }
  }
</style>
