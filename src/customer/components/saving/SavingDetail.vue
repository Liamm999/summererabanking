<template>
  <CardFrame title="Information">
    <template #cardContent>
      <InputMoney
        class="w-full border-slate-500 border-b-2 leading-9 mb-1"
        placeholder="How much you want to save ?"
        :value="amountMoney"
        @updateInput="setAmountMoney"
        @formatMoney="parsedMoney"
        @formatOriginal="returnOriginalMoney"
      />
      <p class="text-red-500 text-md mb-12">
        Interest is: 7.3% a year (min 100.000 VND)
      </p>
      <Button
        placeholder="Continue"
        :is-grad="true"
        @clicked="handleContinue"
      />
    </template>
  </CardFrame>
</template>

<script setup>
import { ref } from "vue"
import CardFrame from "../general/CardFrame.vue"
import InputMoney from "../general/InputMoney.vue"
import Button from "../general/Button.vue"
import { useSavingStore } from "@/customer/store/savingStore"
import { getCurrentDate } from "@/customer/helper/getCurrentDate"

const amountMoney = ref()
const originalMoney = ref(0)
const savingStore = useSavingStore()

function setAmountMoney(value) {
  amountMoney.value = value
  originalMoney.value = Number(value)
}

function parsedMoney(value) {
  amountMoney.value = value
}

function returnOriginalMoney(value) {
  if (value) {
    amountMoney.value = value
  } else {
    amountMoney.value = 0
  }
}

function handleContinue() {
  const savingData = {
    savingAmount: Number(originalMoney.value),
    startDate: getCurrentDate(),
  }
  if (savingData.savingAmount < 100000) {
    alert("Minimum saving amount is 100.000 VND")
  } else {
    savingStore.initSavingData(savingData)
  }
}
</script>

<style lang="scss" scoped></style>
