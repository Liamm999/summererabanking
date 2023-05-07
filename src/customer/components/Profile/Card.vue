<template>
  <div
    class="container text-black flex flex-col items-center left-0 right-0 ml-auto mr-auto mt-16 sm:w-full sm1:w-2/3 bg-slate-400 rounded-2xl py-16 px-10"
  >
    <img class="w-24 h-24 rounded-full mb-3" :src="imgSrc" />
    <h4 class="font-semibold">{{ username }}</h4>
    <p class="text-sm font-semibold mb-10">Account: {{ accNum }}</p>
    <p class="text-xs text-gray-500 font-semibold mb-16">
      Last login at {{ loginTime }}
    </p>
    <a
      href="/login"
      class="text-purple-600 underline cursor-pointer font-semibold"
      @click="handleLogout"
    >
      Logout
    </a>
  </div>
</template>

<script setup>
const emit = defineEmits(["clicked"])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    default: "",
  },

  accNum: {
    type: String,
    require: true,
    default: "",
  },
})

const loginTime = localStorage.getItem("loginTime")

function handleLogout() {
  emit("clicked")
}

// const handleLogout = () => {
//   logout()
//   console.log("logout")
// }
</script>

<style lang="scss" scoped></style>
