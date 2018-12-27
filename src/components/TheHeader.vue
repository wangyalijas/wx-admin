<!--
 * @Module 菜单
 * @Author jinxl
 -->

<template>
  <div class="header-contianer">
    <div class="header">
      <a href="#" class="logo">卫宁招聘管理系统</a>
      <div class="head-menu">
        <el-menu
          mode="horizontal"
          router
          :default-active="activeIndex"
          @select="handleSelect"
          background-color="#3171B8"
          text-color="#fff"
          active-text-color="#fff">
          <el-menu-item index="1" :route="{ name:'resume' }">简历管理</el-menu-item>
          <el-menu-item index="2" :route="{ name:'job' }">招聘管理</el-menu-item>
          <el-menu-item index="3" :route="{ name:'school' }">校招管理</el-menu-item>
          <el-menu-item index="4" :route="{ name:'bloc' }">集团信息管理</el-menu-item>
        </el-menu>
      </div>
      <div class="head-user">
        <span>卫宁健康，您好</span>
        <div @click="viewMessage"><i class="iconfont icon-tozh"></i><span>99+</span></div>
      </div>
      <div @click="loginOut"
           class="header-info">[退出]
      </div>
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
export default {
  data() {
    return {
      activeIndex: sessionStorage.getItem('activeIndex') || '1',
    };
  },
  methods: {
    // 设置当前菜单
    handleSelect(key, keyPath) {
      this.activeIndex = key.toString();
      sessionStorage.setItem('activeIndex', this.activeIndex);
    },
    // 退出
    loginOut() {
      this.$router.push({ name: 'login' });
      sessionStorage.removeItem('login');
    },
    // 查看消息
    viewMessage() {
      this.$message({
        message: '恭喜你，这是99+条成功消息',
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
  components: {},
};
</script>
<!--CSS-PAGE-->
<style lang="scss" scoped>
  .header-contianer{
    background: #3270B8;
    .header{
      display :flex;
      max-width: 1366px;
      height :50px;
      margin :0 auto;
      padding-left: 10px;
      font-size: 16px;
      /deep/ .el-menu-item{
        width: 116px;
        height :50px;
        margin-left: 40px;
        line-height: 50px;
        text-align: center;
      }
      /deep/ .el-submenu__title{
        height :50px;
        line-height :50px;
      }
      /deep/ .el-submenu__title{
        i{
          color :#fff;
        }
      }
      a{
        margin-right: 100px;
        color: #fff;
        line-height :50px;
        text-decoration :none;
      }
      .head-menu{
        flex: 1;
        overflow: hidden;
      }
      .head-user{
        position: relative;
        margin-right: 70px;
        padding-right: 20px;
        line-height: 50px;
        color: #fff;
        font-size: 13px;
        span{
          margin-right:10px ;
        }
        div{
          position: relative;
          display: inline-block;
          padding: 0 5px;
          height: 50px;
          line-height: 50px;
          cursor: pointer;
          span{
            position: absolute;
            top: 9px;
            left: 16px;
            padding: 1px 3px;
            line-height: normal;
            border-radius: 10px;
            background: #de5252;
            transform: scale(0.8);
          }
        }
      }
      .header-info{
        padding-right: 10px;
        color: #fff;
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
</style>
<!--CSS-RESET-->
<style lang="scss">
</style>
