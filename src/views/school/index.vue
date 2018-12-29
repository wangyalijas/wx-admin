<template>
    <div class="school">
      <!--行程列表-->
      <div class="school-page">
        <h2>行程列表</h2>
        <div class="school-page--new">
          <el-button
            @click="journeyVisible = true"
            icon="el-icon-plus"
            round size="small">新增行程
          </el-button>
        </div>
        <div class="school-page__item">
          <div v-for="(item, index) in objData.rows"
               :key='index'
               @click="handleViewDetails(item)"
               class="school-page__item--inner">
            <div class="school-page__item--inner--title">
              <span :class="formatSchedule(item.scheduleState).name">
                {{item.startTime}}</span>
              <span :class="[
                  'sign', formatSchedule(item.scheduleState).name]">
                  {{formatSchedule(item.scheduleState).description}}
                </span>
            </div>
            <span :class="[
                'school-page__item--inner--name',
                formatSchedule(item.scheduleState).name]">
              {{ item.name }}</span>
            <span :class="[
                'school-page__item--inner--content',
                formatSchedule(item.scheduleState).name]">
              精彩在线的宣讲会将继续与大家见面</span>
            <div class="school-page__item--inner--sign">
              <span><i class="iconfont icon-didi"></i>{{ item.place }}</span>
              <span><i class="iconfont icon-ximi"></i>{{ item.count }}人</span>
            </div>
          </div>
        </div>
        <div class="school-page__pagination clearfix">
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
      <transition name="details">
        <school-details v-if="detailsFlag"
                        @handle-click="handleClose"
                        :detailsObj="detailsObj"></school-details>
      </transition>
      <!--新增行程-->
      <div class="school-journey">
        <el-dialog
          title="新增行程"
          width="35%"
          custom-class="school-journey-wrapper"
          :visible.sync="journeyVisible">
          <div class="school-journey-form">
            <el-form ref="journeyForm"
                     :model="journeyForm"
                     :rules='rules'
                     label-width="80px"
                     size="small">
              <el-form-item label="宣讲城市" prop="preachCity">
                <el-input v-model="journeyForm.preachCity"></el-input>
              </el-form-item>
              <el-form-item label="学校名称" prop="schoolName">
                <el-input v-model="journeyForm.schoolName"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" prop="detailAddress">
                <el-input v-model="journeyForm.detailAddress"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="宣讲时间" prop="aboutTime">
                    <el-date-picker type="date"
                                    placeholder="宣讲时间"
                                    style="width: 100%"
                                    value-format="yyyy/MM/dd"
                                    v-model="journeyForm.aboutTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="简历截止" prop="resumeStop">
                    <el-date-picker type="date"
                                    placeholder="简历截止"
                                    style="width: 100%"
                                    value-format="yyyy/MM/dd"
                                    v-model="journeyForm.resumeStop">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="线上笔试" prop="writtenTime">
                <el-date-picker
                  value-format="yyyy/MM/dd"
                  v-model="journeyForm.writtenTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="面试时间" prop="interviewTime">
                <el-date-picker
                  value-format="yyyy/MM/dd"
                  v-model="journeyForm.interviewTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="宣讲内容" prop="preachContent">
                <el-input type="textarea"
                          :rows="4"
                          placeholder="最多填写100字"
                          v-model="journeyForm.preachContent"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="releaseJourney"
                       type="primary"
                       icon="iconfont icon-faso">发布</el-button>
            <el-button>取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>
<!--JavaScript-->
<script>
import { mapGetters } from 'vuex';
import SchoolDetails from './details';

export default {
  name: 'school',
  data() {
    return {
      detailsFlag: false,
      objData: [],
      pagination: {
        currentPage: 1,
        pageSize: 8,
      },
      journeyVisible: false,
      journeyForm: {
        preachCity: '',
        schoolName: '',
        detailAddress: '',
        aboutTime: '',
        resumeStop: '',
        writtenTime: '',
        interviewTime: '',
        preachContent: '',
      },
      rules: {
        preachCity: [{
          required: true,
          message: '请输入宣讲城市',
          trigger: 'blur',
        }],
        schoolName: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur',
        }],
        detailAddress: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur',
        }],
        aboutTime: [{
          required: true,
          message: '请输入宣讲时间',
          trigger: 'blur',
        }],
        resumeStop: [{
          required: true,
          message: '请选择简历截止时间',
          trigger: 'blur',
        }],
        writtenTime: [{
          required: true,
          message: '请选择线上笔试时间',
          trigger: 'blur',
        }],
        interviewTime: [{
          required: true,
          message: '请选择面试时间',
          trigger: 'blur',
        }],
        preachContent: [{
          required: true,
          message: '请输入宣讲内容',
          trigger: 'blur',
        }],
      },
      detailsObj: {},
    };
  },
  computed: {
    ...mapGetters({
      ScheduleState: 'handleScheduleState',
    }),
  },
  created() {
    this.$nextTick(() => {
      this.fetchPageDataAsync();
    });
  },
  methods: {
    formatSchedule(id) {
      let result = '';
      this.ScheduleState.forEach((value) => {
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
      };
      this.objData = await this.$store.dispatch('campusProcess/getScheduleList', params);
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
        type: 'admin',
      };
      const result = await this.$store.dispatch('campusProcess/getSchedule', params);
      if (result) {
        this.detailsObj = result;
        this.detailsFlag = !this.detailsFlag;
      }
    },
    handleClose() {
      // 详情$emit
      this.detailsFlag = !this.detailsFlag;
    },
    releaseJourney(formName) {
      console.log(formName);
    },
  },
  watch: {
  },
  filters: {
  },
  components: {
    SchoolDetails,
  },
};
</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  $End: #B2B2B2;
  $OnGoing: #1DB7AE;
  $NotStart: #F29B2C;
  .details-enter-active{
    transition: all 0.5s ease;
  }
  .details-leave-active{
    transition: all 0.5s cubic-bezier(.42, 0, .58, 1);
  }
  .details-enter, .details-leave-to{
    transform: translateX(50%);
    opacity: 0;
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
          background: #FFFFFF;
          box-shadow: 0 0 6px 0 rgba(196,213,247,0.50);
          border-radius: 4px;
          &:nth-child(4n){
            margin-right: 0;
          }
          &:hover{
            cursor: pointer;
            box-shadow: 0 0 16px 0 rgba(153,185,250,0.50);
          }
          .End{
            color: $End;
          }
          .OnGoing{
            color: $OnGoing;
          }
          .NotStart{
            color: $NotStart;
          }
          @include modifier(title){
            margin: 20px 0 45px 20px;
            font-size: 13px;
            .sign{
              margin-left: 10px;
              padding: 3px 7px;
              border-radius: 2px;
              font-size: 12px;
              &.End{
                color: $End;
                background: #F0F0F0;
                border: 1px solid #D0D0D0;
              }
              &.OnGoing{
                background: #EDF9F9;
                border: 1px solid #C1EFE8;
                color: $OnGoing;
              }
              &.NotStart{
                background: #F9F5ED;
                border: 1px solid #EFDAC1;
                color: $NotStart;
              }
            }
          }
          @include m(name){
            text-align: center;
            display: block;
            font-size: 24px;
            color: #1DB7AE;
            margin-bottom: 5px;
          }
          @include m(content){
            display: block;
            font-size: 13px;
            color: #1DB7AE;
            text-align: center;
            margin-bottom: 50px;
          }
          @include m(sign){
            text-align: center;
            font-size: 13px;
            color: #666666;
            span{
              .iconfont{
                margin-right: 5px;
              }
              &:first-child{
                margin-right: 40px;
              }
            }
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
              .el-textarea__inner{
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
