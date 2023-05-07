<template>
  <div>
    <div class="w-2/3 rounded-xl p-3 bg-gray-300 mx-auto">
      <InputCheckbox @update-input="getCheck" />
    </div>
  </div>
</template>

<script setup>
import InputCheckbox from "@/customer/components/general/InputCheckbox.vue"

const emit = defineEmits(["inputCheck"])

function getCheck(value) {
  emit("inputCheck", value)
}
</script>

<style lang="scss" scoped></style>
