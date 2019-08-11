<template>
  <div class="login-wrap">
    <Form
      class="login-form"
      label-position="top"
      :ref-obj.sync="ref"
      :form="loginForm"
      :form-items="loginFormItems"
      :rules="loginRules"
      @keyup.enter.native="submitForm"
    >
      <template slot="authCode">
        <el-input
          v-model="loginForm.authCode"
          class="authCode"
          :maxlength="4"
          placeholder="验证码"
        />
        <img
          class="code"
          :src="authCodeSrc"
          @click="createCode"
        >
      </template>
      <template slot="submit">
        <el-button
          :loading="loading"
          type="primary"
          @click="submitForm"
        >
          登录
        </el-button>
      </template>
    </Form>
  </div>
</template>

<script>
import Form from '@/components/Form'
export default {
  name: 'Login',
  components: { Form },
  props: {},
  data () {
    return {
      authCodeSrc: '',
      ref: null,
      loginForm: {},
      loginFormItems: [
        { type: 'input', label: '账号', value: 'account', clearable: true },
        { type: 'password', label: '密码', value: 'password', clearable: true },
        { type: 'slot', label: '验证码', value: 'authCode' },
        { type: 'slot', value: 'submit' }
      ],
      loginRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { max: 4, min: 4, message: '请输入4位验证码', trigger: 'blur' }
        ]
      },
      time: '',
      loading: false
    }
  },
  created () {
    this.createCode()
  },
  methods: {
    createCode () {
      this.time = new Date().getTime()
      const authCodeApi = '/api/v0/authcode' // 获取图片验证码
      this.authCodeSrc = `${authCodeApi}?uuid=${this.time}`
    },
    submitForm () {
      this.ref.validate(valid => {
        if (valid) {
          this.loading = true
          const data = { ...this.loginForm, 'authCodeUUID': this.time }
          this.$store.dispatch('manager/handleLogin', data)
            .then(res => {
              this.$router.push('/index')
              this.loading = false
            })
            .catch(() => {
              this.createCode()
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid #ccc;
    .authCode {
      width: 60%;
    }
    .code {
      float: right;
    }
  }
}
</style>
