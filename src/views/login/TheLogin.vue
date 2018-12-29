<template>
  <div class="login">
    <div class="login-inner">
      <div class="login-inner-box">
        <!--左边背景图片-->
        <div class="img"></div>
        <!--右边输入框-->
        <div class="main">
          <div class="main-inner">
            <div class="main-inner__input">
              <div class="main-inner__input--default">
                <div :class="{hideTopLabel: !accountFocusFlag}">账号</div>
                <span v-if="!accountFocusFlag">账号</span>
                <input type="text" v-model="userAccount"
                       @focus="accountInputFocus" @blur="accountInputFocus"/>
              </div>
              <div class="main-inner__input--default">
                <div :class="{hideTopLabel: !passwordFocusFlag}">密码</div>
                <span v-if="!passwordFocusFlag">密码</span>
                <input type="password"
                       v-model="userPassword"
                       v-if="!psdVisibleFlag"
                       @focus="passwordInputFocus"
                       @blur="passwordInputFocus"
                       @keyup.enter="loginEntry"/>
                <input type="text"
                       v-model="userPassword"
                       v-if="psdVisibleFlag"
                       @focus="passwordInputFocus"
                       @blur="passwordInputFocus"
                       @keyup.enter="loginEntry">
                <i class="main-inner__input--default--btn"
                   :class="{eyeOpen: psdVisibleFlag}" @click="lookPassword"></i>
              </div>
            </div>
            <div class="main-inner__memory">
              <div class="main-inner__memory--forget" @click="forgetPassword">忘记密码？</div>
            </div>
            <div class="main-inner--msg">{{mistakeTip}}</div>
            <div class="main-inner--button" :class="{active : userPassword.length <= 3}"
                 @click="loginEntry">登录</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// @ is an alias to /src
export default {
  name: 'login',
  data() {
    return {
      userAccount: this.userName, // 账户名
      userPassword: '', // 密码
      mistakeTip: '', // 错误提示
      accountFocusFlag: false, // 账户
      passwordFocusFlag: false, // 密码
      psdVisibleFlag: false, // 密码是否可见
    };
  },
  components: {
  },
  computed: {
    ...mapGetters({
      userName: 'handleUserAccount',
    }),
  },
  watch: {
  },
  created() {
    this.$nextTick(() => {
      this.initAccountInput();
    });
  },
  methods: {
    initAccountInput() {
      // 初始化账户输入框
      if (this.userAccount) {
        this.accountFocusFlag = !this.accountFocusFlag;
      }
    },
    accountInputFocus() {
      // 账户输入事件
      if (!this.userAccount) {
        this.accountFocusFlag = !this.accountFocusFlag;
      }
    },
    passwordInputFocus() {
      // 密码输入事件
      if (!this.userPassword) {
        this.passwordFocusFlag = !this.passwordFocusFlag;
      }
    },
    lookPassword() {
      // 密码是否可见
      this.psdVisibleFlag = !this.psdVisibleFlag;
    },
    forgetPassword() {
      // 忘记密码
      this.$message('请联系管理员获取帮助');
    },
    checkIsEmpty() {
      let isEmpty = true;
      this.mistakeTip = '';
      if (this.userAccount.replace(/\s+/g, '').length <= 0) {
        this.mistakeTip = '请输入账户名';
        isEmpty = false;
      } else if (this.userPassword.replace(/\s+/g, '').length <= 0) {
        this.mistakeTip = '请输入密码';
        isEmpty = false;
      }
      return isEmpty;
    },
    async loginEntry() {
      const isEmpty = this.checkIsEmpty();
      if (isEmpty) {
        const params = {
          name: this.userAccount.replace(/\s+/g, ''),
          password: this.userPassword.replace(/\s+/g, ''),
        };
        const result = await this.$store.dispatch('login/postLogin', params);
        if (result.state) {
          this.$store.commit('getOpenIdUserId', {
            'X-UserId': result.userId,
            'X-OpenId': result.openId,
          });
          this.$store.commit('getUserAccount', params.name);
          this.handleRouter('resume');
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .login {
    height: 100%;
    position: relative;
    background-color: #F3F5F7;
    .login-inner {
      position: relative;
      height: calc(100% - 40px);
      .login-inner-box {
        width: 804px;
        height: 432px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -216px 0 0 -402px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 0 10px 0 #a5c3e7;
        .img {
          float: left;
          width: 300px;
          height: 432px;
          background-image: url("../../assets/images/logo-bg.png");
          background-repeat: no-repeat;
          background-position: center center;
        }
        .main {
          width: 503px;
          height: 433px;
          float: right;
          position: relative;
          .main-inner {
            width: 260px;
            height: 280px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -140px 0 0 -130px;
            overflow: hidden;
            /*输入框部分*/
            @include e(input) {
              width: 260px;
              @include m(default){
                margin-top: 5px;
                position: relative;
                span {
                  top: 22px;
                  left: 0;
                  color: #666;
                  cursor: text;
                  z-index: 1000;
                  font-size: 16px;
                  position: absolute;
                }
                div {
                  font-size: 12px;
                  color: #4f88ff;
                }
                .hideTopLabel {
                  visibility: hidden;
                }
                input {
                  width: 100%;
                  height: 34px;
                  color: #333333;
                  font-size: 14px;
                  border-top: 0;
                  border-left: 0;
                  border-right: 0;
                  position: relative;
                  border-bottom: 1px solid #77a7df;
                  outline: none;
                }
                @include modifier(btn){
                  top: 28px;
                  right: 3px;
                  width: 24px;
                  height: 20px;
                  z-index: 1000;
                  cursor: pointer;
                  position: absolute;
                  background-color: #fff;
                  background-image: url("../../assets/images/eyeClosed.png");
                  background-repeat: no-repeat;
                  background-position: center center;
                  &.eyeOpen {
                    background-image: url("../../assets/images/eyeOpen.png");
                  }
                }
              }
            }
            /*记住我，忘记密码等*/
            @include e(memory) {
              width: 260px;
              height: 32px;
              margin-top: 12px;
              line-height: 32px;
              position: relative;
              @include m(forget){
                float: right;
                color: #4f88ff;
                cursor: pointer;
                font-size: 12px;
              }
            }
            /*信息有误提示信息*/
            @include m(msg) {
              width: 260px;
              color: #D0021B;
              font-size: 12px;
              margin-top: 5px;
              text-align: center;
            }
            /*登录按钮*/
            @include m(button) {
              width: 260px;
              height: 40px;
              color: #FFFFFF;
              font-size: 16px;
              cursor: pointer;
              line-height: 40px;
              margin-top: 17px;
              text-align: center;
              background: #4f88ff;
              border-radius: 2px;
            }
          }
        }
      }
    }
  }
</style>
