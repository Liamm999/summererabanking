<template>
  <router-view></router-view>
</template>
<script>
export default {
  watch: {
    $route: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(to, from) {
        document.title = this.$route.name
      },
    },
  },
}
</script>
<style></style>
