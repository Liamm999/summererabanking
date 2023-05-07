<template>
  <Loading :is-hidden="!isLoading" class="z-10" />
  <Layout>
    <template #content>
      <Breadcum :routes="routes" :name="nameOfPage" />
      <div v-if="!isLoanExisted">
        <span class="relative">
          <div
            class="absolute w-full h-full bg-black opacity-60 z-10"
            :class="{ hidden: !isNext }"
          ></div>
          <Container class="mb-12 z-0" />
        </span>
        <LoanConfirmation
          class="mb-16"
          v-if="isNext"
          @confirm="handleConfirm()"
        />
      </div>
      <LoanSecondary
        v-else
        class="mb-12"
        :loan-data="loanData"
        :due-data="dueData"
        @pay="handlePay"
      />
    </template>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import Breadcum from "@/customer/components/general/Breadcum.vue"
import Layout from "@/customer/layout/Default.vue"
import Container from "@/customer/components/Loan/Container.vue"
import LoanConfirmation from "./LoanConfirmation.vue"
import { useLoanStore } from "@/customer/store/loanStore"
import LoanSecondary from "./LoanSecondary.vue"
import axios from "axios"
import Loading from "@/shared/components/Loading.vue"

// setup breadcum
const routes = ref(["Loan"])
const nameOfPage = ref("Money loan")

const loanStore = useLoanStore()
const isLoading = ref(false)
const loanData = ref({})
const dueData = ref({})

const isLoanExisted = ref(false)

const isNext = computed(() => {
  return loanStore.getLoanAmount() > 0
})

onMounted(async () => {
  if (await getCurrentLoan()) {
    checkDue()
  }
})

// TODO: call api to get loan if loan is existed (set isLoanExisted)
async function getCurrentLoan() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/loan/my_loan`,
      withCredentials: true,
    })

    let data = res.data
    loanData.value = data

    isLoading.value = false
    isLoanExisted.value = true
    return data
  } catch (error) {
    isLoanExisted.value = false
    isLoading.value = false
    console.log(error.response)
    return error.response
  }
}

// TODO: call api to check due if have loan
async function checkDue() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/loan/check_date`,
      withCredentials: true,
    })

    let data = res.data
    dueData.value = data
    isLoading.value = false
    return data
  } catch (error) {
    return error.response
  }
}

// TODO: call api to confirm loan
async function handleConfirm() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "POST",
      url: `${process.env.VUE_APP_ROOT_API}/user/loan`,
      withCredentials: true,
      data: {
        inMoney: loanStore.getLoanAmount(),
        duration: loanStore.getLoanMonth(),
        rate: loanStore.getLoanRate(),
      },
    })

    let data = res.data
    isLoading.value = false
    alert(data.message)
    location.reload()
    return data
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}

// TODO: call api to pay interest
async function handlePay() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "POST",
      url: `${process.env.VUE_APP_ROOT_API}/loan/pay`,
      withCredentials: true,
    })
    let data = res.data
    isLoading.value = false
    console.log(data)
    return data
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}
</script>

<style lang="scss" scoped></style>
