<template>
  <div class="bg-white rounded-t-2xl p-6 px-10">
    <h3 class="text-slate-400 text-xl">Account</h3>
    <p class="PhoneNumber text-black font-bold">{{ phoneNumber }}</p>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  phoneNumber: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
