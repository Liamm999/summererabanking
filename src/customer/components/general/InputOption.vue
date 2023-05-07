<template>
  <div>
    <select
      id="items"
      name="items"
      class="border-slate-500 border-b-2 py-2 px-4 leading-9"
      @change="handleChooseOption($event)"
    >
      <option value="" disabled selected hidden>
        {{ label }}
      </option>
      <option v-for="value in values" :key="value.rate" :value="value.rate">
        {{ value.rate }}% in {{ value.month }} months
      </option>
    </select>
  </div>
</template>

<script setup>
const emit = defineEmits(["choose"])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  label: {
    type: String,
    required: true,
  },

  values: {
    type: Array,
    required: true,
    default: () => [
      {
        rate: 0,
        month: 0,
      },
    ],
  },
})

function handleChooseOption(event) {
  emit("choose", event.target.value)
}
</script>

<style lang="scss" scoped></style>
