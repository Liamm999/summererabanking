<template>
  <div
    class="bg-element-purple rounded-2xl p-6 sm1:hover:element-hover-color hover:cursor-pointer"
    @click="routingClickHandle"
  >
    <font-awesome-icon class="text-5xl mb-4" :icon="classIcon" />
    <h4 class="text-xl font-semibold">{{ elementName }}</h4>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { computed } from "@vue/reactivity"

const router = useRouter()

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },

  elementName: {
    type: String,
    required: true,
  },

  route: {
    type: String,
    required: true,
  },
})

const classIcon = computed(() => {
  return `fa-solid ${props.icon}`
})

function routingClickHandle() {
  router.push(`dashboard/${props.route}`)
}
</script>

<style lang="scss" scoped></style>
