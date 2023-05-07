<template>
  <Loading :is-hidden="!isLoading" class="z-10" />
  <DepositePopup @confirm="commit" :class="{ hidden: !isCommit }" />
  <Layout>
    <template #content>
      <Breadcum :routes="routes" :name="nameOfPage"></Breadcum>
      <SourceAccount
        class="mb-12"
        :deposite-list="depositeList"
        @handle-withdraw="withdraw"
      />
      <div class="relative">
        <span
          class="absolute w-full h-full bg-black opacity-60 z-10"
          :class="{ hidden: !isShown }"
        ></span>
        <DepositeDetail class="mb-12 z-0" />
      </div>
      <DepositeConfirmation
        class="mb-16"
        :class="{ hidden: !isShown }"
        @confirm-deposite="confirmDeposite"
      />
    </template>
  </Layout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import Layout from "@/customer/layout/Default.vue"
import Breadcum from "@/customer/components/general/Breadcum.vue"
import SourceAccount from "@/customer/components/deposite/SourceAccount.vue"
import DepositeDetail from "@/customer/components/deposite/DepositeDetail.vue"
import DepositeConfirmation from "./DepositeConfirmation.vue"
import { useDepositeStore } from "@/customer/store/depositeStore"
import Loading from "@/shared/components/Loading.vue"
import axios from "axios"
import DepositePopup from "@/customer/components/deposite/DepositePopup.vue"

// setup breadcum
const routes = ref(["Deposite"])
const nameOfPage = ref("Deposite")
const isShown = ref(false)
const isLoading = ref(false)
const isCommit = ref(false)
const chosenDepositeId = ref()

// test data
const depositeList = ref([])

const depositeStore = useDepositeStore()

watch(
  () => depositeStore.getDepositeAmount(),
  (amount) => {
    if (amount >= 1000000) {
      isShown.value = true
      window.scrollTo(0, 600)
    }
  }
)

onMounted(async () => {
  await loadDeposite()
})

// TODO: call api to withdraw deposite here
function withdraw(id) {
  isCommit.value = true
  chosenDepositeId.value = id
}

// // TODO: call api to withdraw Saving here
async function commit() {
  try {
    isLoading.value = true
    let res = await axios({
      method: "post",
      url: `${process.env.VUE_APP_ROOT_API}/user/deposit/${chosenDepositeId.value}/withdraw`,
      withCredentials: true,
    })

    let data = res.data
    console.log(data)
    isLoading.value = false
    alert("Withdraw successfully")
    location.reload()
    return data
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

// TODO: api load deposite
async function loadDeposite() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/deposits`,
      withCredentials: true,
    })
    let data = res.data
    depositeList.value = data.allDeposit
    console.log(data)
    isLoading.value = false
    return data
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}

// TODO: call api to confirm deposite
async function confirmDeposite() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "POST",
      url: `${process.env.VUE_APP_ROOT_API}/make_deposit`,
      withCredentials: true,
      data: {
        money: depositeStore.getDepositeAmount(),
        startDate: depositeStore.getStartDate(),
        rate: depositeStore.getDepositeRate(),
        duration: depositeStore.getDepositeDuration(),
        endDate: depositeStore.getEndDate(),
        totalMoney: depositeStore.getTotalMoneyWhenDue(),
      },
    })
    let data = res.data
    console.log(data)
    isLoading.value = false
    alert("Create deposit successfully")
    location.reload()
    return data
  } catch (error) {
    isLoading.value = false
    console.log(error)
    alert("Not enough money")
    location.reload()
  }
}
</script>

<style lang="scss" scoped></style>
