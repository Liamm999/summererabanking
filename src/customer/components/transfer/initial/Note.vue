<template>
  <div
    class="w-2/3 flex flex-col border-slate-500 border-b-2 mx-auto leading-9"
  >
    <p class="font-semibold">Transaction message</p>
    <span class="flex flex-row">
      <InputText
        class="w-full"
        :placeholder="placeholder"
        :value="message"
        @update-input="handleInput"
      />
    </span>
  </div>
</template>

<script setup>
import InputText from "@/customer/components/general/InputText.vue"
import { ref } from "vue"

const emit = defineEmits(["inputMessage"])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  message: {
    type: String,
    require: false,
  },
})

const placeholder = ref("Input your message ")

function handleInput(value) {
  emit("inputMessage", value)
}
</script>

<style lang="scss" scoped></style>
