<template>
  <div class="news-details">
    <div class="news-details-inner">
      <i @click="closeDetail" class="el-icon-close"></i>
      <div class="main-title">{{detailsObj.name}}</div>
      <div class="main-content">{{detailsObj.content}}</div>
      <div class="main-img">
        <img :src="detailsObj.bannerCover"/>
      </div>
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'newsDetails',
  data() {
    return {
    };
  },
  props: {
    detailsObj: Object,
  },
  computed: {
    ...mapGetters({
      NewsType: 'handleNewsType',
    }),
  },
  created() {
    this.$nextTick(() => {
    });
  },
  methods: {
    closeDetail() {
      this.$emit('handle-click');
    },
    formatSchedule(id) {
      let result = '';
      this.NewsType.forEach((value) => {
        if (value.id === id) {
          result = value;
        }
      });
      return result;
    },
  },
  watch: {
  },
  filters: {
  },
  components: {},
};
</script>
<!--CSS-PAGE-->
<style lang="scss">
  .news-details{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    .news-details-inner{
      overflow: hidden;
      .el-icon-close{
        position: absolute;
        right: 20px;
        top: 20px;
        color: #ccc;
        font-size: 20px;
        cursor: pointer;
        transition: all ease-in .5s;
        border:5px solid transparent;
        &:hover{
          transform: rotate(180deg);
        }
      }
      .main-title{
        margin: 40px 0 30px 80px;
        font-size: 24px;
        color: #333333;
      }
      .main-content{
        margin: 40px 0 30px 80px;
        font-size: 13px;
        color: #333333;
        text-align: justify;
        line-height: 24px;
      }
      .main-img{
        margin: 10px 80px;
        img{
          height: 100%;
          width: 100%;
        }
      }
    }
  }
</style>
