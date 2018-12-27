<template>
  <div class="wrap">
    <the-header/>
    <div class="wrap-view">
      <div class="wrap-view-cnt">
        <div>
          <router-view/>
        </div>
      </div>
    </div>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

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
    display: flex;
    height: 100%;
    flex-direction: column;
    .wrap-view{
      flex: 1;
      overflow: auto;
      background: #f7f7f7;
      .wrap-view-cnt{
        display: flex;
        min-height: 100%;
        max-width :1366px;
        margin: 0px auto;
        >div{
          flex: 1;
          margin: 10px;
          background: #fff;
        }
      }
    }
  }
</style>
