<template>
  <div class="resume">
    <div class="resume-search">
      <el-input
        size="small"
        placeholder="按关键字检索"
        clearable
        @keyup.enter.native="handleSearch"
        v-model="search">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!--简历收件箱-->
    <div class="resume-table" v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleTab">
        <el-tab-pane label="简历收件箱" name="first">
          <ResumeTable :tableData="inboxData" :tabIndex="activeName"/>
        </el-tab-pane>
        <el-tab-pane label="简历人才库" name="second">
          <ResumeTable :tableData="talentData"  :tabIndex="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--详细信息-->
    <div class="resume-detail"></div>
  </div>
</template>
<!--JavaScript-->
<script>
import ResumeTable from '@/components/resume/ResumeTable.vue';

export default {
  data() {
    return {
      loading: false,
      activeName: 'first',
      search: '',
      inboxData: [{
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }, {
        name: 'sdvgsdf',
        state: '1',
      }],
      talentData: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.getResumeTable();
    });
  },
  methods: {
    // 获取简历管理数据
    getResumeTable() {
    },
    handleTab(tab) {
      console.log(tab);
    },
    // 条件搜索
    handleSearch() {
      this.$notify({
        title: '成功',
        message: `搜索关键字：${this.search}`,
        type: 'success',
      });
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
  components: {
    ResumeTable,
  },
};
</script>
<!--CSS-PAGE-->
<style lang="scss">
  .resume{
    position: relative;
    height: 100%;
    .resume-search{
      position: absolute;
      top:20px;
      right: 20px;
      z-index: 10;
    }
    .resume-table{
      padding: 10px 30px 10px 10px;
      .el-tabs{
        .el-tabs__active-bar{
          background-color: #508FD8;
        }
        .el-tabs__item{
          width: 108px;
          color: #666666;
          font-size: 15px;
          text-align: center;
          font-weight: bold;
          &.is-active{
            height:3px;
            color: #508FD8;
          }
        }
        .el-tabs__nav-wrap::after{
          height: 0;
        }
      }
    }
  }
</style>
