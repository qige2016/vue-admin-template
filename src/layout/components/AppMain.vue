<template>
  <section>
    <Breadcrumb v-show="$route.path !== '/index'" />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: { Breadcrumb }
}
</script>
