<template>
  <div class="footer">
    <span class="footer--container">
      © 2018 Winning Health 版权所有
    </span>
  </div>
</template>
<!--JavaScript-->
<script>
export default {
  name: 'theFooter',
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  filters: {
  },
  components: {},
};

</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  .footer{
    background: #ffffff;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    @include m(container){
      padding-right: 20px;
      line-height: 40px;
      font-size: 12px;
      color: #666666;
      opacity: 0.6;
    }
  }
</style>
<!--CSS-RESET-->
<style lang="scss">

</style>
