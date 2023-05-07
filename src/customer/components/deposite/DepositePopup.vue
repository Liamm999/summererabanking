<template>
  <div
    class="fixed flex w-full h-full justify-center align-middle items-center z-10"
  >
    <span
      class="flex flex-col bg-white md:w-2/3 md:h-2/5 md:p-20 p-10 gap-8 rounded-xl justify-between shadow-md text-black"
    >
      <p class="font-bold text-xl">
        If you withdraw your money before the due date, You will lose all
        interest and being penalized 5% of the principal amount
      </p>
      <span class="flex flex-row justify-between">
        <Button :is-grad="true" placeholder="Confirm" @clicked="confirm" />
        <Button :is-grad="true" placeholder="Cancel" @clicked="cancel" />
      </span>
    </span>
  </div>
</template>

<script setup>
import Button from "../general/Button.vue"

const emit = defineEmits(["confirm"])

function confirm() {
  emit("confirm")
}

function cancel() {
  location.reload()
}
</script>

<style lang="scss" scoped></style>
