<template>
  <div class="news">
    <!--集团动态-->
    <div class="news-page">
      <h2>集团动态</h2>
      <div class="news-page--new">
        <el-button
          icon="el-icon-plus"
          round size="small">新增新闻
        </el-button>
      </div>
      <div class="news-page__item">
        <div class="news-page__item--inner"
             @click="handleViewDetails(item)"
             v-for="(item, index) in objData.rows"
             :key="index">
          <img class="news-page__item--inner--img" :src="item.cover"/>
          <div class="news-page__item--inner--content">
            <div class="news-page__item--inner--content--title">
              <span>{{item.name}}</span>
              <span :class="['sign', formatNewsType(item.newsType).name]">
                {{formatNewsType(item.newsType).description}}</span>
            </div>
            <div class="news-page__item--inner--content--value">
              {{item.simpleContent | formatContent}}
            </div>
          </div>
        </div>
      </div>
      <div class="news-page__pagination clearfix">
        <el-pagination
          background
          :current-page.sync="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="prev, pager, next"
          :total="objData.count"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
    <transition name="news">
      <news-details v-if="detailsFlag"
                    @handle-click="handleClose"
                    :detailsObj="detailsObj"></news-details>
    </transition>
  </div>
</template>
<!--JavaScript-->
<script>
import { mapGetters } from 'vuex';
import NewsDetails from './details';

export default {
  name: 'news',
  data() {
    return {
      objData: [],
      pagination: {
        currentPage: 1,
        pageSize: 4,
      },
      detailsFlag: false,
      detailsObj: {},
    };
  },
  computed: {
    ...mapGetters({
      NewsType: 'handleNewsType',
    }),
  },
  filters: {
    formatContent(value) {
      // 计算字节数
      if (value.replace(/[^\x00-\xff]/g, 'xx').length >= 330) {
        return `${value.slice(0, 165)}...`;
      }
      return value;
    },
  },
  created() {
    this.$nextTick(() => {
      this.fetchPageDataAsync();
    });
  },
  methods: {
    formatNewsType(id) {
      let result = '';
      this.NewsType.forEach((value) => {
        if (value.id === id) {
          result = value;
        }
      });
      return result;
    },
    async fetchPageDataAsync() {
      // 初始化数据
      const params = {
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage,
        type: 'admin',
        newsType: 1,
      };
      this.objData = await this.$store.dispatch('news/getNewsList', params);
    },
    handlePage(val) {
      // 翻页
      this.$set(this.pagination, 'currentPage', val);
      this.fetchPageDataAsync();
    },
    async handleViewDetails(item) {
      // 查看详情
      const params = {
        id: item.id,
      };
      const result = await this.$store.dispatch('news/getNews', params);
      if (result) {
        this.detailsObj = result;
        this.detailsFlag = !this.detailsFlag;
      }
    },
    handleClose() {
      // 详情$emit
      this.detailsFlag = !this.detailsFlag;
    },
  },
  watch: {
  },
  components: {
    NewsDetails,
  },
};
</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  $End: #B2B2B2;
  $OnGoing: #1DB7AE;
  $NotStart: #F29B2C;
  .news-enter-active{
    transition: all 0.5s ease;
  }
  .news-leave-active{
    transition: all 0.5s cubic-bezier(.42, 0, .58, 1);
  }
  .news-enter, .news-leave-to{
    transform: translateX(50%);
    opacity: 0;
  }
  .news{
    position: relative;
    min-height: 834px;
    .news-page{
      padding: 0 20px;
      >h2{
        padding: 20px 0 10px 0;
        font-size: 18px;
        color: #333333;
        @include bold;
      }
      @include m(new){
        padding: 0 20px 20px 0;
        text-align: right;
        /deep/ .el-button{
          background: #57C3EB;
          border-radius: 16px;
          color: #fff;
          padding: 7px 21px;
          border: none;
        }
      }
      @include e(item){
        position: relative;
        @include m(inner){
          padding: 30px 20px;
          overflow: hidden;
          cursor: pointer;
          @include modifier(img){
            float: left;
            width: 120px;
            height: 100px;
            margin-right: 20px;
          }
          @include modifier(content){
            float: left;
            @include modifier(title){
              margin: 10px 0;
              font-size: 16px;
              color: #4A4A4A;
              .sign{
                padding: 4px 9px;
                margin-left: 15px;
                font-size: 12px;
                border-radius: 2px;
                &.School{
                  color: #d65724;
                  background: #fff2e770;
                  border: 1px solid #cc692669;
                }
                &.Welfare{
                  background: #E7FEFF;
                  border: 1px solid #CBFFF3;
                  color: #19BFBD;
                }
                &.Dynamics{
                  background: #E7ECFF;
                  border: 1px solid #CBCBFF;
                  color: #516CFF;
                }
                &.Introduction{
                  background: #FFF8E7;
                  border: 1px solid #FFEECB;
                  color: #FFB036;
                }
                &.Activity{
                  color: #1B99E2;
                  background: #E7F5FF;
                  border: 1px solid #CBEBFF;
                }
              }
            }
            @include modifier(value){
              font-size: 13px;
              color: #9B9B9B;
              line-height: 24px;
              word-wrap: break-word;
              width: 1120px;
            }
          }
          &:hover{
            background: #F6FBFF;
          }
        }
      }
      @include e(pagination){
        padding: 20px 0 20px 0;
        position: relative;
        .el-pagination{
          float: right;
        }
      }
    }
  }
</style>
<style lang="scss">
  .el-dialog__wrapper{
    .school-journey-wrapper{
      .el-dialog__body{
        .school-journey-form{
          .el-form-item{
            margin-bottom: 25px;
            .el-form-item__label{
              margin-right: 20px;
            }
            .el-form-item__content{
              margin-left: 100px !important;
              .el-input__inner{
                width: 500px;
              }
              .el-form-item__error{
                padding-top: 5px;
              }
            }
          }
          .el-row{
            .el-form-item{
              .el-input__inner{
                width: 186px;
              }
            }
          }
        }
      }
      .el-button{
        padding: 8px 31px;
        &.el-button--primary{
          background: #57C3EB;
          border-radius: 2px;
          border: 1px solid #57C3EB;
        }
        .iconfont{
          margin-right: 5px;
        }
      }
    }
  }
</style>
