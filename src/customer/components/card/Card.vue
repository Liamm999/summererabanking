<template>
  <div
    class="container sm:w-full sm1:w-2/3 z-20 left-0 right-0 ml-auto mr-auto mt-16"
  >
    <Header class="hidden sm1:block" :phone-number="phoneNumber"></Header>
    <div
      class="content-container grid gap-12 sm:grid-cols-1 sm1:grid-cols-2 lg:grid-cols-3 sm1:bg-slate-400 rounded-b-2xl py-16 px-10"
    >
      <Element
        v-for="element in iconArr"
        :key="element"
        :element-name="element.elName"
        :icon="element.icon"
        :route="element.route"
        class="text-center"
      ></Element>
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue"
import Element from "./Element.vue"
import { ref, computed } from "vue"

const phoneNumber = computed(() => {
  return JSON.parse(localStorage.getItem("currentUser")).username
})

const iconArr = ref([
  {
    elName: "Transfer money",
    icon: "fa-money-bill-transfer",
    route: "transfer",
  },

  {
    elName: "Deposite money",
    icon: "fa-money-bill",
    route: "deposite",
  },

  {
    elName: "View balance",
    icon: "fa-scale-balanced",
    route: "balance",
  },

  {
    elName: "Money saving",
    icon: "fa-piggy-bank",
    route: "saving",
  },

  {
    elName: "Money loan",
    icon: "fa-landmark",
    route: "loan",
  },

  {
    elName: "Transaction Log",
    icon: "fa-clock-rotate-left",
    route: "log",
  },
])
</script>

<style lang="scss" scoped></style>
