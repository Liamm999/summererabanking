<template>
  <div
    class="container flex flex-row justify-between items-center bg-white rounded-t-2xl text-black p-6 sm1:px-36 sm1:py-2"
  >
    <span
      ><h4 class="text-xl font-semibold">Account in VND</h4>
      <span>
        <p class="inline mr-1">Total balance:</p>
        <p class="inline font-semibold text-purple-600">
          {{ formatPrice(total) }}
        </p>
      </span>
    </span>
    <button
      class="rounded-full text-lg bg-white w-10 h-10 shadow-black shadow-2xl drop-shadow-2xl"
      @click="handleClickBtn()"
    >
      <font-awesome-icon v-if="!isDropped" icon="fa-solid fa-caret-down" />
      <font-awesome-icon v-else icon="fa-solid fa-caret-up" />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { formatPrice } from "@/customer/helper/formatPrice"

const emit = defineEmits(["dropButtonClicked"])
const isDropped = ref(false)

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  // this total balance is the total money from available balance + deposit + saving money
  total: {
    type: Number,
    required: true,
    default: 0,
  },
})

function handleClickBtn() {
  if (isDropped.value === false) {
    isDropped.value = true
  } else {
    isDropped.value = false
  }
  emit("dropButtonClicked", isDropped.value)
}
</script>

<style lang="scss" scoped></style>
