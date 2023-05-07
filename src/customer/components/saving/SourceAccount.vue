<template>
  <CardFrame title="Source Account">
    <template #cardContent>
      <div class="mb-2">
        <p>Account Number:</p>
        <p
          class="font-semibold text-purple-600 text-xl border-slate-500 border-b-2 mx leading-9"
        >
          {{ accNumber }}
        </p>
        <span class="w-full flex flex-row md:justify-end">
          <p class="mr-2">Available Balance:</p>
          <p class="text-purple-600 font-semibold">{{ availBalance }}</p>
        </span>
      </div>
      <SavingList :saving-list="savingList" @delete="handleDelete" />
    </template>
  </CardFrame>
</template>

<script setup>
import { onBeforeMount, onUpdated, ref } from "vue"
import CardFrame from "../general/CardFrame.vue"
import { formatPrice } from "@/customer/helper/formatPrice"
import { computed } from "vue"
import { availableBalance, getTotalBalance } from "@/customer/helper/getBalance"
import SavingList from "./SavingList.vue"

onBeforeMount(() => {
  getTotalBalance()
})

onUpdated(() => {
  availBalance.value = formatPrice(availableBalance)
})

const availBalance = ref()

const curentUser = JSON.parse(localStorage.getItem("currentUser"))
const accNumber = computed(() => curentUser.username)
const emit = defineEmits(["handleDelete"])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  savingList: Array,
})

function handleDelete(id) {
  emit("handleDelete", id)
}
</script>

<style lang="scss" scoped></style>
