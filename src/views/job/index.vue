<template>
  <div class="resume">
    <div class="resume-search">
      <el-input
        size="small"
        placeholder="请输入内容"
        clearable
        @keyup.enter.native="handleSearch"
        v-model="search">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button
      class="small-button"
      icon="el-icon-plus"
      round size="small">发布新职位
      </el-button>
    </div>
    <!--简历收件箱-->
    <div class="resume-table" v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleTab">
        <el-tab-pane label="在线中职位" name="first">
          <ResumeTable @rowOperate="rowOperates" :tableData="onlineData" :tabIndex="activeName"/>
        </el-tab-pane>
        <el-tab-pane label="已下线职位" name="second">
          <ResumeTable @rowOperate="rowOperates" :tableData="offlineData"  :tabIndex="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--详细信息-->
    <div class="resume-detail animated fadeInDown"></div>
  </div>
</template>
<!--JavaScript-->
<script>
import ResumeTable from '@/components/resume/ResumeTable.vue';

export default {
  name: 'job',
  data() {
    return {
      loading: false,
      activeName: 'first',
      search: '',
      onlineData: [],
      offlineData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.getResumeTable();
    },
    // 获取招聘管理数据
    getResumeTable() {
      this.$http.get(this.$http.joTable)
        .then((data) => {
          if (data.type) {
            this.onlineData = data.data || [];
            this.offlineData = data.job || [];
          }
        }).finally(() => {
          this.loading = false;
        });
    },
    handleTab(tab, event) {
      console.log(tab);
    },
    // 条件搜索
    handleSearch() {
      if (!this.search) { return false; }
      this.$notify({
        title: '成功',
        message: `搜索关键字：${this.search}`,
        type: 'success',
      });
    },
    // 子组件触发父组件
    rowOperates(str) {
      alert(str);
      event.cancelBubble = true;
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
  components: { ResumeTable },
};
</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  .resume{
    position: relative;
    height: 100%;
    .small-button {
      padding: 0px 15px;
    }
    .resume-search{
      position: absolute;
      display: flex;
      top:20px;
      right: 20px;
      z-index: 10;
      /deep/ .el-button{
        margin-left: 10px;
        color: #fff;
        background: #57C3EB;;
        border: 1px solid #57C3EB;;
      }
    }
    .resume-table{
      padding: 10px;
      /deep/ .el-tabs__active-bar{
        background-color: #508FD8;
      }
      /deep/ .el-tabs__item{
        width: 108px;
        color: #666666;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        &.is-active{
          height:3px;
          color: #508FD8;
        }
      }
      /deep/ .el-tabs__nav-wrap::after{
        height: 0px;
      }
    }
    .resume-detail{
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      transition: all ease-in .3s;
      @include test;
      background: #fff;
      z-index: 10;
      display: none;
    }
  }
</style>
