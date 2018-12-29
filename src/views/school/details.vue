<template>
  <div class="school-details">
    <div class="school-details-inner">
      <i @click="closeDetail" class="el-icon-close"></i>
      <div class="details-title">
        <span>{{detailsObj.name}}</span>
        <span :class="[
                  'details-title--sign', formatSchedule(detailsObj.scheduleState).name]">
                  {{formatSchedule(detailsObj.scheduleState).description}}
                </span>
      </div>
      <div class="detail-item">
        <div>学校名称：<span>{{detailsObj.name}}</span></div>
        <div>详细地址：
          <span>{{detailsObj.place}}</span>
        </div>
        <div>宣讲时间：
          <span>{{detailsObj.startTime}}</span>
        </div>
        <div>简历截止：<span>{{detailsObj.resumeEndTime}}</span></div>
        <div>线上笔试：<span>
          {{detailsObj.writeExamStartTime}} ~ {{detailsObj.writeExamEndTime}}</span></div>
        <div>面试时间：<span>
          {{detailsObj.interviewStartTime}} ~ {{detailsObj.interviewEndTime}}</span></div>
      </div>
      <div class="detail-content">
        <div class="detail-content--label">宣讲内容：</div>
        <div class="detail-content--value">{{detailsObj.content}}</div>
      </div>
      <div class="detail-list">
        <p>报名名单：</p>
        <el-table
          :data="detailsObj.users"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="IDNumber"
            label="身份证">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'schoolDetails',
  data() {
    return {
    };
  },
  props: {
    detailsObj: Object,
  },
  computed: {
    ...mapGetters({
      ScheduleState: 'handleScheduleState',
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
      this.ScheduleState.forEach((value) => {
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
  $End: #B2B2B2;
  $OnGoing: #1DB7AE;
  $NotStart: #F29B2C;
  .school-details{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    .school-details-inner{
      padding: 60px 100px;
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
      .details-title{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        line-height: 25px;
        @include m(sign){
          margin-left: 10px;
          padding: 3px 9px;
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
      .detail-item{
        display: flex;
        flex-wrap: wrap;
        margin: 20px 0 60px 0;
        >div{
          flex: 0 0 33%;
          font-size: 13px;
          color: #666666;
          margin-bottom: 20px;
          span{
            margin-left: 5px;
            color: #333333;
          }
        }
      }
      .detail-content{
        position: relative;
        font-size: 13px;
        margin-bottom: 90px;
        @include m(label){
          color: #666666;
          width: 65px;
          display: inline-block;
          text-align: left;
        }
        @include m(value){
          position: absolute;
          top: 0;
          left: 70px;
          color: #333333;
          max-width: 1050px;
        }
      }
      .detail-list{
        p{
          margin-bottom: 20px;
          font-size: 13px;
          color: #666666;
        }
        .el-table{
          th{
            font-size: 14px;
            color: #666666;
          }
          td{
            font-size: 13px;
            color: #333333;
            padding: 10px 0;
            border-bottom: 1px solid #ECECEC;
          }
        }
      }
    }
  }
</style>
