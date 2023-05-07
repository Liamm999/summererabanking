<template>
  <div class="flex flex-row">
    <input
      id="inputCheckbox"
      class="mr-2"
      v-model="isChecked"
      type="checkbox"
      @input="handleInput()"
    />
    <label for="inputCheckbox">Save this contact ?</label>
  </div>
</template>

<script setup>
import { ref } from "vue"
// eslint-disable-next-line no-undef, no-unused-vars
const emit = defineEmits(["updateInput"])

const isChecked = ref(false)

function handleInput() {
  emit("updateInput", !isChecked.value)
}
</script>

<style lang="scss" scoped></style>
