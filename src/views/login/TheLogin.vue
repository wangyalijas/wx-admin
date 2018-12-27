<!--
 * @Module 登录
 * @Author jinxl
 -->

<template>
  <div class="page-container">
    <div id="loginBox">
      <!--左边背景图片-->
      <div class="loginImg"></div>
      <!--右边输入框-->
      <div class="login">
        <div class="login-inner">
          <div class="inputBox">
            <div class="account ">
              <div class="visable">账号</div>
              <span class="visable">账号</span>
              <input type="text"
                     v-model="form.username"
                     placeholder="用户名">
              <i class="visable"></i>
            </div>
            <div class="password">
              <div class="visable">密码</div>
              <span class="visable">密码</span>
              <input class="passwordInput"
                     v-model="form.password"
                     type="password"
                     placeholder="密码">
              <input class="replaceInput" style="display: none" type="text">
              <i class="lookPassword visable"></i>
            </div>
          </div>
          <div class="memory visable">
            <div class="remember ">
              <input class="ordinary-check" id="remember" type="checkbox">
              <label for="remember">记住我</label>
            </div>
            <div class="forget">忘记密码？</div>
            <div class="help hidden-block">请联系系统管理员获取帮助<i></i></div>
          </div>
          <div class="misinput">用户名或密码错误，请重新输入</div>
          <div id="entry" @click="login">登录</div>
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
      form: {
        username: '',
        password: '',
      },
    };
  },
  created() {

  },
  methods: {
    login() {
      this.$http.post(
        { url: 'user/signup' },
        this.form,
      ).then((data) => {
        if (data.type) {
          sessionStorage.setItem('login', 'winn');
          this.$message({
            duration: 1000,
            message: data.msg,
            type: 'success',
          });
          setTimeout(() => {
            this.$router.push({ name: 'index' });
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: '用户名或密码错误',
            type: 'error',
          });
        }
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

  /*1660*/
  @media screen and (max-width: 1660px) {
  }
  /*1366*/
  @media screen and (max-width: 1366px){
  }
</style>
<!--CSS-RESET-->
<style lang="scss">
</style>
