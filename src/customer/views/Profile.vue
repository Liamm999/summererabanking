<template>
  <layout>
    <template #content>
      <Breadcum :name="nameOfPage" :routes="routes" />
      <card
        :img-src="img"
        :acc-num="currentUser.username"
        :username="currentUser.name"
        @clicked="handleLogout()"
      />
    </template>
  </layout>
</template>

<script setup>
import Layout from "@/customer/layout/Default.vue"
import Card from "../components/Profile/Card.vue"
import { ref } from "@vue/reactivity"
import { logout } from "@/shared/helper/Logout"
import Breadcum from "../components/general/Breadcum.vue"

const img = ref(require("@/customer/assets/img/fakeAvt.jpg"))
const routes = ref(["Profile"])
const nameOfPage = ref("Profile")

const currentUser = JSON.parse(localStorage.getItem("currentUser"))

function handleLogout() {
  logout()
}
</script>

<style scoped></style>
