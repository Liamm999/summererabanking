<template>
  <div
    class="w-2/3 flex flex-col border-slate-500 border-b-2 mx-auto leading-9"
  >
    <p class="font-semibold">Money</p>
    <span class="flex flex-row">
      <InputMoney
        class="text-black"
        placeholder="Enter the money"
        :value="moneyValue"
        @updateInput="setMoneyValue"
        @formatMoney="parsedMoney"
        @formatOriginal="returnOriginalMoney"
      />
      <p class="text-purple-600 text-end mr-0 ml-auto">VND</p>
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue"
import InputMoney from "@/customer/components/general/InputMoney.vue"

const emit = defineEmits(["inputMoney"])
const moneyValue = ref()

function setMoneyValue(value) {
  const money = Number(value)
  if (!isNaN(money)) {
    moneyValue.value = money
    emit("inputMoney", money)
  } else {
    alert("You must provide amount of money in number format")
  }
}

function parsedMoney(value) {
  moneyValue.value = value
}

function returnOriginalMoney(value) {
  if (value) {
    moneyValue.value = value
  } else {
    moneyValue.value = 0
  }
}
</script>

<style lang="scss" scoped></style>
