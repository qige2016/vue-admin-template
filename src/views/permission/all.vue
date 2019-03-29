<template>
 <div>
  <div>所有权限都能访问</div>
  <div style="margin-top:30px;">
    <div v-permission="['SUPER_ADMIN']" class="permission-alert">
      <el-tag class="permission-tag" size="small">超级管理员</el-tag> 能看到
    </div>
    <div v-permission="['ADMIN']" class="permission-alert">
      <el-tag class="permission-tag" size="small">管理员</el-tag> 能看到
    </div>
    <div v-permission="['SUPER_ADMIN','ADMIN']" class="permission-alert">
      <el-tag class="permission-tag" size="small">超级管理员</el-tag> 和
      <el-tag class="permission-tag" size="small">管理员</el-tag> 能看到
    </div>
  </div>
  <el-tabs type="border-card" style="width:500px;margin-top:30px;">
    <el-tab-pane v-if="checkPermission(['SUPER_ADMIN'])" label="Admin">超级管理员能看到</el-tab-pane>
    <el-tab-pane v-if="checkPermission(['ADMIN'])" label="Editor">管理员能看到</el-tab-pane>
    <el-tab-pane v-if="checkPermission(['SUPER_ADMIN','ADMIN'])" label="Admin-OR-Editor">所有权限能看到</el-tab-pane>
  </el-tabs>
 </div>
</template>
<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'all',
  directives: { permission },
  methods: {
    checkPermission
  }
}
</script>
<style lang="scss" scoped>

</style>
