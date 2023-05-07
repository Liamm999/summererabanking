<template>
  <Layout>
    <template #content>
      <div class="mb-12">
        <Card v-if="isDone"></Card>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Layout from "@/customer/layout/Default.vue"
import Card from "@/customer/components/card/Card.vue"
import { getCurrentTime } from "../helper/getCurrentTime"

const isDone = ref(false)

onMounted(async () => {
  if (localStorage.getItem("currentUser")) {
    isDone.value = true
  }
  const thisTime = getCurrentTime()
  localStorage.setItem("loginTime", thisTime)
})
</script>

<style lang="scss" scoped></style>
