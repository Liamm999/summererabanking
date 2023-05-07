<template>
  <div
    class="flex justify-center align-middle items-center bg-white shadow-lg shadow-purple-900 text-center"
    :class="{ hidden: isHidden }"
  >
    <a :href="href" @click="handleClick">{{ content }}</a>
  </div>
</template>

<script setup>
const emit = defineEmits(["clicked"])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isHidden: {
    type: Boolean,
    required: false,
    default: true,
  },

  content: {
    type: String,
    required: true,
    default: "",
  },

  href: {
    typeof: String,
    default: "",
  },
})

function handleClick() {
  emit("clicked")
}
</script>

<style lang="scss" scoped></style>
