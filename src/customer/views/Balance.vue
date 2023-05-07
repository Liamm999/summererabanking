<template>
  <Loading :is-hidden="isLoading" />
  <Layout>
    <template #content>
      <Breadcum :name="nameOfPage" :routes="routes" />
      <span class="container flex flex-row justify-end px-8 mb-5">
        <button
          class="bg-white text-black p-3 px-4 rounded-full"
          @click="getCurrentUser()"
        >
          <font-awesome-icon class="text-lg" icon="fa-solid fa-arrows-rotate" />
        </button>
      </span>
      <Container
        :all-balances="allBalances"
        :total-balance="totalBalance"
      ></Container>
    </template>
  </Layout>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeMount, onUpdated } from "vue"
import Loading from "@/shared/components/Loading.vue"
import Breadcum from "../components/general/Breadcum.vue"
import Container from "../components/balance/Container.vue"
import Layout from "../layout/Default.vue"
import axios from "axios"
import {
  currentLoan,
  allDeposit,
  allSaving,
  availableBalance,
  getTotalBalance,
} from "../helper/getBalance"

// setup breadcum
const routes = ref(["View Balance"])
const nameOfPage = ref("Balance")
const currentUser = ref({})
const isLoading = ref()
const totalBalance = ref()
const allBalances = ref([])

onBeforeMount(async () => {
  isLoading.value = false
  getTotalBalance()
})

onMounted(async () => {
  isLoading.value = true
  await getCurrentUser()
})

onUpdated(() => {
  totalBalance.value = getTotalBalance()
  allBalances.value = [
    {
      balanceType: "Available balance (include original balance + loan)",
      amount: availableBalance,
    },
    {
      balanceType: "Original balance",
      amount: availableBalance - currentLoan,
    },
    {
      balanceType: "Loan",
      amount: currentLoan,
    },
    {
      balanceType: "Deposits",
      amount: allDeposit,
    },
    {
      balanceType: "Savings",
      amount: allSaving,
    },
  ]
})

async function getCurrentUser() {
  isLoading.value = false
  const currentUserId = Number(JSON.parse(localStorage.getItem("loginUser")).id)
  try {
    let res = await axios({
      method: "get",
      url: `${process.env.VUE_APP_ROOT_API}/user/${currentUserId}`,
      withCredentials: true,
    })

    let data = res.data
    currentUser.value = data
    isLoading.value = true
    return data
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}

watch(
  () => currentUser.value.balance,
  (balance) => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
    console.log(balance)
  }
)
</script>

<style lang="scss" scoped></style>
