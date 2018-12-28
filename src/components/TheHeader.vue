<template>
  <div class="header">
    <div class="header-inner">
      <a class="header-inner--logo" @click="handleRouter('resume')">卫宁招聘管理系统</a>
      <div class="header-inner__menu">
        <el-menu
          mode="horizontal"
          router
          :default-active="$route.path"
          background-color="#3171B8"
          text-color="#fff"
          active-text-color="#fff">
          <el-menu-item
            :index="`/index/${item.route}`"
            :key="index"
            :route="{ name: item.route }"
            v-for="(item, index) in menuData">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
      <div class="header-inner__user">
        <span class="header-inner__user--title">卫宁健康，您好</span>
        <div @click="viewMessageFunc" class="header-inner__user--msg">
          <i class="iconfont icon-tozh"></i>
          <span>99+</span></div>
      </div>
      <div @click="loginOutFunc" class="header-inner--out">[退出]</div>
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
export default {
  data() {
    return {
      menuData: [{
        name: '简历管理',
        route: 'resume',
        index: '0',
      }, {
        name: '招聘管理',
        route: 'job',
        index: '1',
      }, {
        name: '校招管理',
        route: 'school',
        index: '2',
      }, {
        name: '集团信息管理',
        route: 'company',
        index: '3',
      }],
    };
  },
  computed: {
  },
  watch: {},
  filters: {
  },
  components: {},
  created() {
    this.$nextTick(() => {
    });
  },
  methods: {
    // 退出
    loginOutFunc() {
      this.$router.push({ name: 'login' });
    },
    // 查看消息
    viewMessageFunc() {
      this.$message({
        message: '恭喜你，这是99+条成功消息',
        type: 'success',
      });
    },
  },
};
</script>
<!--CSS-PAGE-->
<style lang="scss">
  .header{
    width: 100%;
    background: #3270B8;
    top: 0;
    position: fixed;
    z-index: 100;
    .header-inner{
      display: flex;
      width: 1366px;
      height :50px;
      margin :0 auto;
      font-size: 16px;
      @include m(logo){
        margin: 0 180px 0 20px;
        background: url("../assets/images/logo.png") no-repeat left;
        padding-left: 35px;
        color: #fff;
        line-height :50px;
        text-decoration :none;
        cursor: pointer;
      }
      @include e(menu){
        flex: 1;
        overflow: hidden;
        .el-menu--horizontal{
          .el-menu-item{
            width: 116px;
            height :50px;
            margin-right: 70px;
            line-height: 50px;
            text-align: center;
            &.is-active{
              background: #78AAE8 !important;
              border-bottom: none;
            }
            &:hover{
              background: #78AAE8 !important;
            }
            &:last-child{
              margin-right: 0;
            }
          }
        }
      }
      @include e(user){
        position: relative;
        margin-right: 70px;
        padding-right: 20px;
        line-height: 50px;
        color: #fff;
        font-size: 13px;
        @include m(title){
          margin-right:10px ;
        }
        @include m(msg){
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
      @include m(out){
        margin-right: 20px;
        color: #fff;
        font-size: 13px;
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
</style>
<!--CSS-RESET-->
<style lang="scss">
</style>
