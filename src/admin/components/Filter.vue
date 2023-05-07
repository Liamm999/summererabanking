<template>
  <option>{{ data }}</option>
</template>

<script>
export default {
  name: "Filter",
  props: {
    data: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
