<template>
  <div class="layout">
    <el-row>
      <el-col :span="24" class="header">
        <header-comp></header-comp>
      </el-col>
      <el-col :span="24" class="main">
        <div class="menu-comp">
          <!-- 左侧菜单组件 -->
          <menu-comp></menu-comp>
        </div>
        <div class="content">
          <transition name="fade" mode="out-in">
            <!-- 右侧内容区入口 -->
            <router-view></router-view>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import headerComp from './components/header'
import menuComp from './components/menu'
export default {
  name: 'layout',
  components: { headerComp, menuComp }
}
</script>
<style lang="scss" scoped>
  .layout {
    .main {
      display: flex;
    }
  }
</style>
