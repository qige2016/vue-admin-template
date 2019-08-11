<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in $route.matched">
        <el-breadcrumb-item
          v-if="item.path"
          :key="item.path"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbComp'
}
</script>
