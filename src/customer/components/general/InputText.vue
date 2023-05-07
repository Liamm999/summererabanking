<template>
  <div>
    <input
      class="w-full focus:outline-none bg-transparent"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput($event)"
    />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef, no-unused-vars
const emit = defineEmits(["updateInput"])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
    default: "",
  },

  value: {
    type: String,
    require: true,
  },
})

function handleInput(event) {
  emit("updateInput", event.target.value)
}
</script>

<style lang="scss" scoped></style>
