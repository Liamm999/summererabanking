<template>
  <div v-for="(saving, index) in savingList" :key="index">
    <span v-if="saving.money > 0">
      <p class="font-bold">Saving balance {{ index + 1 }}:</p>
      <span
        class="w-full flex flex-row items-center border-slate-500 border-b-2 mx leading-9"
      >
        <p class="font-semibold text-purple-600 text-xl">
          {{ formatBalance(saving.money) }}
        </p>
        <span
          class="flex align-middle items-center gap-2 text-lg mr-0 ml-auto hover:text-purple-600"
          @click="handleDeleteSaving(saving.id)"
        >
          <p>Withdraw</p>
          <font-awesome-icon
            icon="fa-solid fa-hand-holding-dollar"
            class="text-2xl"
          />
        </span>
      </span>
      <span
        class="w-full flex flex-col mb-2 sm1:m-0 sm1:flex-row sm1:justify-end"
      >
        <p class="mr-2">Your saving balance for the next day is:</p>
        <p class="sm1:text-purple-600 font-semibold">
          {{ formatIncomingBalance(saving.money) }}
        </p>
      </span>
    </span>
  </div>
</template>

<script setup>
import { formatPrice } from "@/shared/helper/formatPrice"

const emit = defineEmits(["delete"])

function formatBalance(value) {
  return formatPrice(Number(value))
}

function formatIncomingBalance(value) {
  const balance = Number(value)
  return formatPrice(balance + balance * (0.02 / 100))
}

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  savingList: Array,
})

function handleDeleteSaving(id) {
  emit("delete", id)
}
</script>

<style lang="scss" scoped></style>
