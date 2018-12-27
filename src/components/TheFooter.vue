<!--
 * @Module 底部版权
 * @Author jinxl
 -->

<template>
  <div class="footer-container">
    <div class="footer">
      © 2018 Winning Health 版权所有
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
export default {
  data() {
    return {
      initData: {},
    };
  },
  created() {

  },
  methods: {
    getUserName() {

    },
  },
  computed: {
    reversedMessage() {
      return '';
    },
  },
  watch: {
    message() {
    },
  },
  filters: {
    subString() {
    },
  },
  components: {},
};

</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  .footer-container{
    background: #f7f7f7;
    -webkit-box-shadow: 0px 0px 3px rgba(179,179,179,.75);
    box-shadow: 0px 0px 3px rgba(179,179,179,.75);
    .footer{
      display: flex;
      justify-content :flex-end;
      max-width: 1366px;
      height: 40px;
      margin: 0 auto;
      padding-right: 10px;
      line-height: 40px;
      color: #999;
    }
  }
</style>
<!--CSS-RESET-->
<style lang="scss">

</style>
