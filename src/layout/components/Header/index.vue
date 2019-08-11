<template>
  <div class="header-wrapper">
    <div class="left">
      <span class="web-title">管理平台</span>
    </div>
    <div class="right">
      <el-dropdown
        class="right-item"
        @command="handleCommand"
      >
        <div class="avatar-wrapper">
          <img
            src="@/assets/images/avatar.png"
            class="role-img"
          >
        </div>
        <!-- <div>
          <div class="role">
            {{ roleFormat(operatorBean.roleType) }}
          </div>
          <div class="username">
            {{ operatorBean.userName }}
          </div>
        </div> -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">
            账号信息
          </el-dropdown-item>
          <el-dropdown-item command="modifyPassword">
            密码修改
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <UserInfo :outer-visible.sync="userInfoOuterVisible" />
    <ModifyPassword
      v-if="modifyPasswordOuterVisible"
      :outer-visible.sync="modifyPasswordOuterVisible"
    />
  </div>
</template>

<script>
import UserInfo from './UserInfo'
import ModifyPassword from './ModifyPassword'
export default {
  name: 'Header',
  components: { UserInfo, ModifyPassword },
  data () {
    return {
      userInfoOuterVisible: false,
      modifyPasswordOuterVisible: false
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'userInfo') {
        this.userInfoOuterVisible = true
      } else {
        this.modifyPasswordOuterVisible = true
      }
    },
    logout () {
      this.$confirm('确认要退出登录吗?', {
        type: 'warning',
        showClose: false
      }).then(() => {
        this.$store.dispatch('manager/handleLogOut').then(() => {
          this.$router.push('/login')
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  height: 62px;
  overflow: hidden;
  position: relative;
  background: #1D2B36;
  .left {
    display: inline-block;
    height: 100%;
    line-height: 62px;
    .web-title {
      font-size: 23px;
      color: #fff;
      margin-left: 66px;
      letter-spacing: 1px;
      line-height: 1;
      vertical-align: middle;
    }
  }
  .right {
    float: right;
    .avatar-wrapper {
      height: 100%;
      line-height: 62px;
      .role-img {
        vertical-align: middle;
      }
    }
  }
}
</style>
