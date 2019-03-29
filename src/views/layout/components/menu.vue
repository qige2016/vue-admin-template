<template>
  <div class="menu-wrapper">
    <!--导航菜单-->
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#303C47"
      text-color="#909399"
      active-text-color="#C1E5FF"
      :default-active="$route.path"
      :router="true"
      :collapse="isCollapse">
      <!--展开折叠开关-->
      <div class="collapse-btn" @click="collapseMenu">
        <div class="btn-item"></div>
        <div class="btn-item center"></div>
        <div class="btn-item"></div>
      </div>
      <template v-for="item in routes">
        <template v-if="!item.hidden">
          <!-- 有子菜单 -->
          <el-submenu v-if="item.children.length > 1" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :index="`${item.path}/${child.path}`"
              :key="child.path">
              <template slot="title">
                <!-- 子菜单图标 -->
                <i :class="child.meta.icon"></i>
                <span slot="title">{{child.meta.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 没有子菜单 -->
          <el-menu-item
            v-if="item.children.length === 1"
            :index="`/${item.children[0].path}`"
            :key="item.children[0].path">
            <i :class="item.children[0].meta.icon"></i>
            <span slot="title"> {{item.children[0].meta.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'menuComp',
  methods: {
    // 菜单折叠
    collapseMenu () {
      this.$store.commit('TOGGLE_MENU', !this.isCollapse)
    },
    // 屏幕宽度 <= 1366 菜单默认折叠
    toggleMenuCollapse () {
      if (window.innerWidth <= 1366) {
        this.$store.commit('TOGGLE_MENU', true)
      } else {
        this.$store.commit('TOGGLE_MENU', false)
      }
    }
  },
  computed: {
    routes () { return this.$store.getters.routes },
    isCollapse () { return this.$store.getters.isCollapse }
  },
  mounted () {
    this.toggleMenuCollapse()
    window.addEventListener('resize', this.toggleMenuCollapse)
  }
}
</script>
<style lang="scss">
  .menu-wrapper {
    // 重置element样式
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
    }
    .el-submenu__title,
    .el-menu-item,
    .el-tooltip {
      padding: 0 15px !important;
    }
    .el-menu-vertical-demo {
      height: calc(100vh - 62px);
    }
    .el-submenu .el-menu-item {
      min-width: 0;
    }
    // 折叠展开按钮样式
    .collapse-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 60px;
      background: #131B22;
      cursor: pointer;
      .btn-item {
        width: 24px;
        height: 2px;
        background: #4582FF;
      }
      .center {
        margin: 4px 0;
      }
    }
    .iconfont {
      text-align: center;
      font-size: 32px;
      color: #93C5E9;
    }
  }
</style>
