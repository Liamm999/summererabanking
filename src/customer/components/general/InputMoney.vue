<template>
  <div>
    <input
      type="text"
      class="w-full text-black focus:outline-none bg-transparent"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput($event)"
      @focus="returnOriginalMoney()"
      @blur="formatMoney($event)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { formatPrice } from "@/customer/helper/formatPrice"

// eslint-disable-next-line no-undef, no-unused-vars
const emit = defineEmits(["updateInput", "formatMoney", "formatOriginal"])

const originalMoney = ref()

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
    default: "",
  },

  value: {
    type: Number || String,
    require: true,
  },
})

function returnOriginalMoney() {
  if (originalMoney.value > 0) {
    emit("formatOriginal", Number(originalMoney.value))
  }
}

function formatMoney(event) {
  if (event.target.value > 0) {
    const money = formatPrice(Number(event.target.value))
    emit("formatMoney", money)
  } else {
    emit("formatMoney", "")
  }
}

function handleInput(event) {
  originalMoney.value = Number(event.target.value)
  emit("updateInput", originalMoney.value)
}
</script>

<style lang="scss" scoped></style>
