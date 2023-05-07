<template>
  <div class="flex">
    <font-awesome-icon
      icon="fa-solid fa-bars"
      class="z-20 my-auto text-3xl"
      :class="{ navHidden: !isShown, navShown: isShown }"
    />
    <div
      class="bg-white w-1/2 h-full fixed right-0 -mt-2 z-10 shadow-purple-600 shadow-lg"
      :hidden="!isShown"
    >
      <span class="absolute ml-4 text-black mt-24">
        <h4 class="text-lg font-semibold">Account number</h4>
        <p class="text-purple-600 mb-12">{{ accNum }}</p>
        <a
          href="/login"
          @click="handleLogout()"
          class="text-white p-2 rounded-full bg-purple-600 hover:element-hover-color"
        >
          Logout
        </a>
      </span>
    </div>
    <span
      class="w-full h-full left-0 fixed bg-black -mt-2 opacity-60 z-0"
      :hidden="!isShown"
    ></span>
  </div>
</template>

<script setup>
import { logout } from "../helper/Logout"
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isShown: {
    type: Boolean,
    required: true,
    default: false,
  },

  accNum: {
    type: String,
    required: true,
    default: "",
  },
})

function handleLogout() {
  console.log("logout")
  logout()
}
</script>

<style lang="scss" scoped>
.navHidden {
  @apply mr-10 ml-auto;
}

.navShown {
  @apply pl-4 transition-all;
}
</style>
