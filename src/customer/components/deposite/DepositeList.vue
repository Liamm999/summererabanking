<template>
  <div v-for="(deposit, index) in depositeList" :key="index" class="mb-8">
    <p class="font-bold">Deposite balance {{ index + 1 }}:</p>
    <span
      class="w-full flex flex-row items-center border-slate-500 border-b-2 mx leading-9"
    >
      <p class="font-semibold text-purple-600 text-xl">
        {{ formatBalance(deposit.money) }}
      </p>
      <span
        class="flex align-middle items-center gap-2 text-lg mr-0 ml-auto hover:text-purple-600"
        @click="handleWithdrawDeposite(deposit.id)"
      >
        <p>Withdraw</p>
        <font-awesome-icon
          icon="fa-solid fa-hand-holding-dollar"
          class="text-2xl"
        />
      </span>
    </span>
    <span class="w-full flex flex-col mb-2 sm1:m-0 lg:flex-row lg:justify-end">
      <p class="mr-2">
        Your total money when due date with {{ deposit.rate }}% rate in
        {{ deposit.duration }} months is:
      </p>
      <p class="sm1:text-purple-600 font-semibold">
        {{ formatPrice(deposit.totalMoney) }}
      </p>
    </span>
  </div>
</template>

<script setup>
import { formatPrice } from "@/shared/helper/formatPrice"

const emit = defineEmits(["withdraw"])

function formatBalance(value) {
  return formatPrice(Number(value))
}

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  depositeList: Array,
})

function handleWithdrawDeposite(id) {
  emit("withdraw", id)
}
</script>

<style lang="scss" scoped></style>
