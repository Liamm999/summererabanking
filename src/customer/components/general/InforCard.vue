<template>
  <div class="container w-full md:w-2/3 bg-gray-300 mx-auto rounded-xl p-3">
    <span
      v-for="value in valueObject"
      :key="value.tag"
      class="flex flex-col my-2 sm1:flex-row justify-between px-8"
    >
      <p class="capitalize">{{ value.tag }}</p>
      <p :class="{ highilighted: value.isHighlighted }" class="font-semibold">
        {{ value.content }}
      </p>
    </span>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  valueObject: {
    type: Array,
    required: true,
    default: () => [
      {
        tag: "demo:",
        content: "demo content",
        isHighlighted: true,
      },
    ],
  },
})
</script>

<style lang="scss" scoped>
.highilighted {
  @apply text-purple-600;
}
</style>
