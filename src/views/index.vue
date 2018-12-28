<template>
  <div class="wrap">
    <the-header></the-header>
    <div class="wrap-inner">
      <div class="wrap-inner__page">
        <div class="wrap-inner__page--content">
          <router-view/>
        </div>
      </div>
    </div>
    <the-footer></the-footer>
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

<style lang="scss" scoped>
  .wrap{
    position: relative;
    width: 100%;
    .wrap-inner{
      margin-top: 60px;
      height: 100%;
      width: 100%;
      @include e(page){
        width: 1366px;
        margin: 0 auto;
        @include m(content){
          flex: 1;
          margin: 10px;
          background: #fff;
        }
      }
    }
  }
</style>
