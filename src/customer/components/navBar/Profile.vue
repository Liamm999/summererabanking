<template>
  <div class="flex flex-col items-end">
    <div class="flex items-end">
      <div class="text flex flex-col items-end mr-5">
        <h4 class="text-sm font-semibold">Hello</h4>
        <h3 class="text-lg">{{ username }}</h3>
      </div>
      <div @click="toProfile()" class="image cursor-pointer">
        <img class="w-16 h-16 rounded-full" :src="imgSrc" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
    default: () => require("@/customer/assets/img/fakeAvt.jpg"),
  },

  username: {
    type: String,
    required: true,
    default: "",
  },
})

function toProfile() {
  router.push({ name: "Profile" })
}
</script>

<style lang="scss" scoped>
/**
.popup {
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;
}

@keyframes growDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
}
*/
</style>
