<template>
  <div class="container mx-auto mt-10 mb-16 ml-6 sm1:ml-0 xl:ml-10">
    <div class="flex items-baseline">
      <font-awesome-icon
        icon="fa-solid fa-chevron-left"
        @click="handleBackOneRoute"
        class="hover:text-purple-600 cursor-pointer text-xl mr-4"
      />
      <div class="direction">
        <h3 class="mb-2">{{ name }}</h3>
        <span class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-house" />
          <p
            class="hover:text-purple-600 cursor-pointer opacity-50"
            @click="handleBackToDashboard"
          >
            Dashboard
          </p>
          <p>/</p>
          <span
            class="direction flex"
            :class="{ chosen: isSelected(index) }"
            v-for="(route, index) in routes"
            :key="index"
            @click="handleBackward(index)"
          >
            <p
              class="hover:text-purple-600 opacity-50"
              :class="{ pointer: !isSelected(index) }"
            >
              {{ route }}
            </p>
            <p :class="{ hidden: isSelected(index) }">&nbsp;/</p>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
// import { computed } from "@vue/reactivity"

const router = useRouter()
// eslint-disable-next-line no-unused-vars
const route = useRoute()

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  routes: {
    type: Array,
    require: true,
  },

  name: {
    type: String,
    require: true,
    default: "",
  },
  select: {
    typeof: String,
    require: true,
    default: "",
  },
})

function isSelected(index) {
  return props.routes[index].includes(props.select)
}

function handleBackward(index) {
  console.log(index)
  if (!isSelected(index)) {
    router.go((index + 1) * -1)
  }
}

function handleBackToDashboard() {
  router.push("/customer/dashboard")
}

function handleBackOneRoute() {
  window.history.length > 1 ? router.go(-1) : router.push("/")
}
</script>

<style lang="scss" scoped>
.chosen {
  @apply opacity-100 text-purple-600 cursor-default;
}

.pointer {
  @apply cursor-pointer;
}
</style>
