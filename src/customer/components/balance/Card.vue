<template>
  <div class="container w-full bg-white rounded-2xl text-black px-16 py-4">
    <div class="flex flex-row items-center mb-5">
      <h4 class="text-base font-semibold mr-2">{{ accNum }}</h4>
      <p
        class="bg-purple-600 text-white inline rounded-full px-2 mt-1 text-xs font-semibold"
      >
        Default
      </p>
    </div>
    <div class="mx-auto grid lg:grid-cols-2 gap-3">
      <div v-for="balance in balances" :key="balance.balanceType">
        <p class="mr-1 mt-5 lg:mt-0">{{ balance.balanceType }}</p>
        <p class="font-semibold">{{ formatPrice(balance.amount) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from "@/customer/helper/formatPrice"
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  balances: {
    type: Array,
    default: () => [
      {
        balanceType: String,
        amount: Number,
      },
    ],
  },

  accNum: {
    type: String,
    required: true,
    default: "",
  },
})
</script>

<style lang="scss" scoped></style>
