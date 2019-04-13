<template>
  <div class="page-container">
    <div class="background" v-if="supportVue">
      <div class="content">
        <el-form
          ref="loginForm"
          class="login-form"
          :model="loginForm"
          :hide-required-asterisk="true"
          label-position="top"
          @keyup.enter.native="submitForm()">
          <h1>登录</h1>
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"><i slot="prefix" class="iconfont icon-Mask3"></i></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"><i slot="prefix" class="iconfont icon-Mask2"></i></el-input>
          </el-form-item>
          <div class="login-button">
            <el-button type="primary" v-if="loginStatus" @click="submitForm()">立即登录</el-button>
            <el-button v-else>登录中...</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 兼容性组件 -->
    <compatible-Component v-else></compatible-Component>
  </div>
</template>
<script>
import { supportVue } from '@/utils/auth'
import compatibleComponent from '@/components/compatible'
export default {
  name: 'login',
  data () {
    return {
      supportVue: supportVue(),
      loginStatus: true,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  components: {compatibleComponent},
  methods: {
    submitForm () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loginStatus = false
          this.$store.dispatch('handleLogin', this.loginForm).then(res => {
            this.$router.push('/index')
          }).catch(() => {
            this.loginStatus = true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-container {
    .background {
      width:100%;
      height:100%;
      min-height: 600px;
      z-index:-10;
      zoom: 1;
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -o-background-size: cover;
      background-position: center 0;
    }
    .content {
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      // width: 37.5rem;
      min-height: 600px;
      background:rgba(0,2,18,0.9);
      box-shadow:0px 0px 4px 0px rgba(0,0,0,0.5);
      h1 {
        font-family:FZLTXHK;
        color:rgba(182,182,182,1);
        // margin-bottom: 2rem;
        margin-top: 0;
      }
      .login-form {
        width: 360px;
        max-width: 100%;
        // margin: 6rem 8rem;
        vertical-align: center;
        .iconfont {
          font-size: 30px;
        }
        .img-wrapper {
          overflow: hidden;
          .auth-code-img {
            width: 100%;
            height: 44px;
            margin-left: -2px;
            margin-top: -2px;
            margin-bottom: 9px;
            cursor: pointer;
          }
          .change-img {
            position: absolute;
            display: block;
            font-size:14px;
            font-family:FZLTHK--GBK1-0;
            font-weight:normal;
            color:rgba(153,160,179,1);
            line-height:16px;
          }
        }
        /* .login-button {
          margin-top: 4rem;
        } */
      }
      .footer {
        width: 100%;
        // margin-left: 8rem;
        line-height: 2em;
        font-size: 12px;
        .footer-link {
          color:#909191;
        }
        .left {
          margin-right: 24px;
        }
        .right {
          display: block;
        }
      }
    }
    .logo {
      position: absolute;
      top: 72px;
      right: 80px;
      width: 270px;
      color:rgba(95,116,201,1);
      .orgName {
        font-size:32px;
        font-family:FZLTCHK--GBK1-0;
        font-weight:normal;
        line-height:32px;
      }
      hr {
        border:1px solid rgba(95,116,201,1);
      }
      .sysName {
        font-size:16px;
        font-family:FZLTHK--GBK1-0;
        font-weight:normal;
        line-height:16px;
      }
    }
  }
</style>
