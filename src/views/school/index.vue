<template>
    <div class="school">
      <!--行程列表-->
      <div class="school-page">
        <h2>行程列表</h2>
        <div class="school-page--new">
          <el-button
            icon="el-icon-plus"
            round size="small">新增行程
          </el-button>
        </div>
        <div class="school-page__item">
          <div v-for="(item, index) in pageData"
               :key='index'
               class="school-page__item--inner">
            <i class="iconfont icon-delete"></i>
            <h2>{{ item.aboutTime }}</h2>
            <strong>{{ item.schoolName }}</strong>
            <h5>精彩在线的宣讲会将继续与大家见面</h5>
            <div>
              <span><i class="iconfont icon-didi"></i>{{ item.preachCity }}</span>
              <span><i class="iconfont icon-ximi"></i>{{ item.total }}人</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<!--JavaScript-->
<script>
export default {
  data() {
    return {
      pageData: [],
      pagination: {
        currentPage: 1,
        pageSize: 8,
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.fetchPageDataAsync();
    });
  },
  methods: {
    async fetchPageDataAsync() {
      const params = this.pagination;
      this.pageData = await this.$store.dispatch('campusProcess/getScheduleList', params);
    },
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
  // 状态颜色: 进行中，未开始，已结束
  $underWay:#1DB7AE;
  $notStart:#F29B2C;
  $fineshed:#B2B2B2;
  @mixin stateTag($color,$backColor,$borderColor){
    margin-left: 10px;
    padding: 0 6px;
    font-size: 12px;
    color: $color;
    background: $backColor;
    border-radius: 2px;
    font-weight: normal;
    border: 1px solid $borderColor;
  }
  .school{
    position: relative;
    height: 834px;
    .school-page{
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
        display: flex;
        flex-wrap: wrap;
        @include m(inner){
          position: relative;
          width: 311px;
          height: 230px;
          margin: 0 20px 20px 0;
          box-shadow: 0 0 6px 0 rgba(196,213,247,0.50);
          border-radius: 4px;
          border:1px solid transparent;
          &:nth-child(4n){
            margin-right: 0;
          }
          &:hover{
            cursor: pointer;
            box-shadow: 0 0 16px 0 rgba(153,185,250,0.50);
            i.iconfont{
              visibility: visible;
            }
          }
          >i{
            &.iconfont{
              position: absolute;
              right: 20px;
              top: 20px;
              color: #ccc;
              visibility: visible;
              border: 5px solid transparent;
            }
          }
          &.under-way{
            >h2{
              margin: 20px 0 0 20px;
              font-size: 13px;
              color: #1F9D95;
              font-weight: normal;
              span{
                @include stateTag($underWay,#EDF9F9,#C1EFE8)
              }
            }
            >strong,>h5{
              display: block;
              text-align: center;
              color: $underWay;
            }
            >strong{
              margin-top: 46px;
              font-size: 24px;
            }
            >h5{
              margin-top: 15px;
              font-size: 13px;
            }
            >div{
              margin-top:49px ;
              text-align: center;
              font-size: 13px;
              color: #666666;
              span{
                i{
                  display: inline-block;
                  line-height: 1;
                  vertical-align: baseline;
                  font-size: 14px;
                }
                &:last-child{
                  margin-left: 43px;
                }
              }

            }
          }
          &.not-start{
            >h2{
              margin: 20px 0 0 20px;
              font-size: 13px;
              color: #F29B2C;
              font-weight: normal;
              span{
                @include stateTag($notStart,#F9F5ED,#EFDAC1)
              }
            }
            >strong,>h5{
              display: block;
              text-align: center;
              color: $notStart;
            }
            >strong{
              margin-top: 46px;
              font-size: 24px;
            }
            >h5{
              margin-top: 15px;
              font-size: 13px;
            }
            >div{
              margin-top:49px ;
              text-align: center;
              font-size: 13px;
              color: #666666;
              span{
                i{
                  display: inline-block;
                  line-height: 1;
                  vertical-align: baseline;
                  font-size: 14px;
                }
                &:last-child{
                  margin-left: 43px;
                }
              }

            }
          }
          &.fineshed{
            >h2{
              margin: 20px 0 0 20px;
              font-size: 13px;
              color: #B2B2B2;
              font-weight: normal;
              span{
                @include stateTag($fineshed,#F0F0F0,#D0D0D0);
              }
            }
            >strong,>h5{
              display: block;
              text-align: center;
              color: $fineshed;
            }
            >strong{
              margin-top: 46px;
              font-size: 24px;
            }
            >h5{
              margin-top: 15px;
              font-size: 13px;
            }
            >div{
              margin-top:49px ;
              text-align: center;
              font-size: 13px;
              color: #666666;
              span{
                i{
                  display: inline-block;
                  line-height: 1;
                  vertical-align: baseline;
                  font-size: 14px;
                }
                &:last-child{
                  margin-left: 43px;
                }
              }
            }
          }
        }
      }
    }
    .school-detail{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 60px 100px;
      background: #fff;
      display: none;
      &.show{
        display: block;
      }
      i{
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
      h2{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        span{
          &.under-way{
            @include stateTag($underWay,#EDF9F9,#C1EFE8)
          }
          &.not-start{
            @include stateTag($notStart,#F9F5ED,#EFDAC1)
          }
          &.fineshed{
            @include stateTag($fineshed,#F0F0F0,#D0D0D0);
          }
        }
      }
      .school-detail-item{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 50px;
        >div{
          flex: 0 0 25%;
          font-size: 13px;
          color: #666666;
          margin-bottom: 20px;
          span{
            margin-left: 5px;
            color: #333333;
          }
        }
      }
      .school-detail-row{
        display: flex;
        margin-bottom: 50px;
        >span{
          font-size: 13px;
          color: #666666;
        }
        >div{
          flex: 1;
          font-size: 13px;
          color: #333333;
          line-height: 24px;
        }
      }
      .school-detail-list{
        p{
          margin-bottom: 20px;
          font-size: 13px;
          color: #666666;
        }
      }
    }
    .school-journey{
      .school-journey-form{
      }
      /deep/ .dialog-footer{
        i {
          font-size: 14px;
          color: #fff;
          vertical-align: baseline;
          display: inline-block;
        }
        .el-button--warning{
          border-color: #57C3EB;
          background: #57C3EB;
        }
      }
    }
  }

</style>
