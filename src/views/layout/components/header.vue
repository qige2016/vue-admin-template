<template>
  <div>
    <div class="header-wrapper">
      <div class="left">
        <span class="web-title">后台管理平台</span>
      </div>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <div class="dropdown-link">
            <img :src="avatar" class="role-img" />
            <div>
              <div class="role">{{role}}</div>
              <div class="username">{{userName}}</div>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-if="resetVisible">
      <el-dialog
      class="modify-password"
      title="修改密码"
      width="460px"
      :visible.sync="resetVisible"
      @close="resetPwdClose">
        <el-form
          label-width="100px"
          label-position="right："
          ref="userModify"
          :model="userModify" :rules="rules">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="userName" disabled></el-input>
          </el-form-item>
          <el-form-item label="原始密码：" prop="oldPassword">
            <el-input type="password" v-model="userModify.oldPassword" placeholder="请输入原始密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword">
            <el-input type="password" v-model="userModify.newPassword" placeholder="请输入新密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="userModify.checkPass" placeholder="请再次输入新密码" clearable></el-input>
          </el-form-item>
          <div class="txt-center">
            <el-button size="small" @click="resetPwdClose()">取消</el-button>
            <el-button size="small" type="primary"  @click="comfirmReset('userModify')">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { modifyPassword } from '@/api/login'
import RULE from '@/utils/validate'
export default {
  name: 'headerComp',
  data () {
    /* 检查两次密码输入是否一致 */
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userModify.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      resetVisible: false,
      avatar: require('@/assets/images/avatar.png'),
      userModify: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [
          { message: '请输入原始密码', trigger: 'blur', required: true },
          { validator: RULE.checkOTAPass, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: RULE.checkOTAPass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'resetPwd') {
        this.resetVisible = true
      } else if (command === 'logout') {
        this.logout()
      }
    },
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('handleLogOut')
      })
    },
    resetPwdClose () {
      this.$refs['userModify'].resetFields()
      this.resetVisible = false
    },
    comfirmReset (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            newPassword: this.userModify.newPassword,
            oldPassword: this.userModify.oldPassword
          }
          modifyPassword(data).then(res => {
            this.$message({
              type: 'success',
              showClose: true,
              message: '修改密码成功,请重新登录！'
            })
            this.resetVisible = false
            this.$store.dispatch('handleLogOut')
          })
        }
      })
    }
  },
  computed: {
    role () { return this.$store.getters.operatorBean.roleType },
    userName () { return this.$store.getters.operatorBean.name }
  }
}
</script>
<style lang="scss" scoped>
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    height: 62px;
    padding: 0 20px 0 36px;
    background: #1D2B36;
    .left {
      line-height: 62px;
      .logo {
        vertical-align: 0;
      }
      .web-title {
        font-size: 23px;
        font-family: MicrosoftYaHeiUI-Bold;
        font-weight: bold;
        color: #fff;
        margin-left: 40px;
        letter-spacing: 1px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .btn-wrapper {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 14px;
        border-radius: 4px;
        background: #2F70F7;
        cursor: pointer;
        .text {
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          padding-left: 10px;
        }
      }
      .btn-wrapper:hover {
        opacity: 0.8;
      }
      .dropdown-link {
        display: flex;
        align-items: center;
        font-size: 12px;
        .role-img {
          width: 40px;
          max-width: 100%;
          margin: 0 12px 0 40px;
        }
        .role {
          font-family: MicrosoftYaHeiUI-Bold;
          font-weight: bold;
          color: #249AFF;
        }
        .username {
          font-family: MicrosoftYaHeiUI;
          color: #FFFFFF;
        }
      }
    }
  }
  // 修改密码
  .txt-center {
    text-align: center;
  }
</style>
