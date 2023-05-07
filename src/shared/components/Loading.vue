<template>
  <div
    class="fixed flex flex-row items-center justify-center align-middle w-full h-full z-10 bg-slate-400 opacity-50"
    :class="{ hidden: isHidden }"
  >
    <img class="w-14 h-14" src="../assets/images/money_loading.gif" alt="" />
    <img class="w-14 h-14" src="../assets/images/money_loading.gif" alt="" />
    <img class="w-14 h-14" src="../assets/images/money_loading.gif" alt="" />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isHidden: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped></style>
