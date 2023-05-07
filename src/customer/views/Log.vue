<template>
  <Loading :is-hidden="!isLoading" class="z-10" />
  <Layout>
    <template #content>
      <Breadcum :routes="routes" :name="nameOfPage"></Breadcum>
      <CardFrame title="Transaction History">
        <template #cardContent>
          <LogList :allTransactionLog="logList" />
        </template>
      </CardFrame>
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue"
import LogList from "../components/Log/LogList.vue"
import CardFrame from "../components/general/CardFrame.vue"
import Layout from "../layout/Default.vue"
import Breadcum from "../components/general/Breadcum.vue"
import Loading from "@/shared/components/Loading.vue"
import axios from "axios"

// setup breadcum
const routes = ref(["Log"])
const nameOfPage = ref("Transaction Log")

const isLoading = ref(false)
const logList = ref([])

onMounted(async () => {
  await loadAllLogs()
})

// TODO: call api to get the transaction data here:
async function loadAllLogs() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/transaction/log/all`,
      withCredentials: true,
    })
    let data = res.data
    logList.value = data.allTransactionLog
    console.log(data)
    isLoading.value = false
    return data
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<style lang="scss" scoped></style>
