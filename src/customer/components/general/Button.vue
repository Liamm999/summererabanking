<template>
  <div>
    <button
      type="submit"
      @click="handleClick"
      :class="`${isGrad ? 'gradBtn' : ''} ${style}`"
      class="p-3 px-10 text-center uppercase rounded-lg block disabled:bg-gray-400"
      :disabled="isDisabled"
    >
      {{ placeholder }}
      <font-awesome-icon :icon="`fa-solid ${icon}`" v-if="icon" />
    </button>
  </div>
</template>

<script setup>
// import { computed } from "@vue/reactivity"
const emit = defineEmits(["clicked"])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  placeholder: {
    type: String,
    require: false,
    default: "",
  },

  icon: {
    type: String,
    require: false,
  },

  style: {
    type: String,
    require: false,
    default: "",
  },

  isGrad: {
    type: Boolean,
    require: false,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    require: false,
    default: false,
  },
})

function handleClick() {
  emit("clicked")
}
</script>

<style lang="scss" scoped></style>
