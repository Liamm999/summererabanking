<template>
  <div
    class="w-full h-72 bg-white rounded-2xl text-black py-14 px-10 z-20 left-0 right-0 ml-auto mr-auto"
  >
    <span
      class="w-full flex flex-row justify-between border-slate-500 border-b-2 leading-9"
    >
      <InputText
        class="w-full"
        placeholder="Enter account number"
        :value="accNumber"
        @update-input="setAccountValue"
      />
      <p class="text-purple-600 cursor-pointer" @click="handleCheckUserAcc">
        Check
      </p>
    </span>
    <span class="checkText">
      <p v-if="!isFilled" class="warning text-red-500 text-sm">
        Please enter beneficiary account number then check that account
      </p>
      <p v-else class="text-purple-500 font-semibold">{{ beneficiaryName }}</p>
    </span>

    <Button
      class="w-full flex justify-end mt-16"
      :class="{ disabled: !isChecked }"
      placeholder="Continue"
      :is-grad="isChecked"
      :is-disabled="!isChecked"
      @clicked="handleContinue"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import InputText from "../general/InputText.vue"
import Button from "../general/Button.vue"
import { computed } from "@vue/reactivity"

const accNumber = ref("")
const emit = defineEmits(["continueTransfer", "checkUserAccount"])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  },

  beneficiaryName: {
    type: String,
    default: "",
  },
})

const isFilled = computed(() => {
  if (accNumber.value === "") {
    return false
  }
  return true
})

// check if the bank acc is valid => continue the process
function handleContinue() {
  emit("continueTransfer")
}

function setAccountValue(newAccount) {
  console.log(newAccount)
  accNumber.value = newAccount
}

// TODO: Check account name
function handleCheckUserAcc() {
  emit("checkUserAccount", accNumber.value)
}
</script>

<style lang="scss" scoped></style>
