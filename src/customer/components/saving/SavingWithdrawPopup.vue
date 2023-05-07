<template>
  <div
    class="fixed flex w-full h-full justify-center align-middle items-center z-10"
  >
    <span
      class="flex flex-col bg-white md:w-2/3 md:h-2/5 md:p-20 p-10 gap-8 rounded-xl justify-between shadow-md text-black"
    >
      <InputMoney
        class="w-full border-slate-500 border-b-2 leading-9 mb-1"
        placeholder="How much you want to withdraw ?"
        :value="amountMoney"
        @updateInput="setAmountMoney"
        @formatMoney="parsedMoney"
        @formatOriginal="returnOriginalMoney"
      />
      <span class="flex flex-row justify-between">
        <Button :is-grad="true" placeholder="Confirm" @clicked="confirm" />
        <Button :is-grad="true" placeholder="Cancel" @clicked="cancel" />
      </span>
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Button from "../general/Button.vue"
import InputMoney from "../general/InputMoney.vue"

const amountMoney = ref()
const originalMoney = ref(0)

function setAmountMoney(value) {
  amountMoney.value = value
  originalMoney.value = Number(value)
}

function parsedMoney(value) {
  amountMoney.value = value
}

function returnOriginalMoney(value) {
  if (value > 0) {
    amountMoney.value = value
  } else {
    amountMoney.value = 0
  }
}

const emit = defineEmits(["confirm"])

function confirm() {
  emit("confirm", originalMoney.value)
}

function cancel() {
  location.reload()
}
</script>

<style lang="scss" scoped></style>
