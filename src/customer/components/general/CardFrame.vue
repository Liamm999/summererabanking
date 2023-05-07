<template>
  <div class="content-container relative grid bg-white rounded-2xl py-10 px-10">
    <div class="absolute w-full bg-white rounded-t-2xl p-6 px-10">
      <h3 class="text-black text-xl">{{ title }}</h3>
    </div>
    <div class="container mt-16 text-black">
      <slot class="" name="cardContent"></slot>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
})
</script>

<style lang="scss" scoped></style>
