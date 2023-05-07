<template>
  <div class="px-4 sm1:px-8 mx-auto">
    <Heading :total="totalBalance" @drop-button-clicked="handleDropdown" />
    <div
      class="container bg-gray-200 rounded-b-2xl sm1:px-36 py-16"
      :class="isShow ? 'show' : 'hide'"
    >
      <Card :balances="allBalances" :acc-num="accNum" class="" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity"
import Heading from "./Heading.vue"
import Card from "./Card.vue"

const isShow = ref(false)
const currentUser = JSON.parse(localStorage.getItem("currentUser"))

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  totalBalance: {
    type: Number,
    default: 0,
  },

  allBalances: Array,
})

const accNum = computed(() => {
  return currentUser.username
})

function handleDropdown(value) {
  if (value === true) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}
</script>

<style lang="scss" scoped>
.show {
  @apply block;
}

.hide {
  @apply hidden;
}
</style>
