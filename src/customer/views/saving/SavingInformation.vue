<template>
  <SavingWithdrawPopup :class="{ hidden: !isCommit }" @confirm="commit" />
  <Loading :is-hidden="!isLoading" class="z-10" />
  <Layout>
    <template #content>
      <Breadcum :routes="routes" :name="nameOfPage"></Breadcum>
      <SourceAccount
        class="mb-12"
        :saving-list="savingList"
        @handle-delete="withdraw"
      />
      <div class="relative">
        <span
          class="absolute w-full h-full bg-black opacity-60 z-10"
          :class="{ hidden: !isShown }"
        ></span>
        <SavingDetail class="mb-12 z-0" />
      </div>
      <SavingConfirmation
        class="mb-16"
        :class="{ hidden: !isShown }"
        @confirm="confirmSaving()"
      />
    </template>
  </Layout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import Layout from "@/customer/layout/Default.vue"
import Breadcum from "@/customer/components/general/Breadcum.vue"
import SourceAccount from "@/customer/components/saving/SourceAccount.vue"
import SavingDetail from "@/customer/components/saving/SavingDetail.vue"
import SavingConfirmation from "./SavingConfirmation.vue"
import { useSavingStore } from "@/customer/store/savingStore"
import Loading from "@/shared/components/Loading.vue"
import axios from "axios"
import SavingWithdrawPopup from "@/customer/components/saving/SavingWithdrawPopup.vue"

// setup breadcum
const routes = ref(["Saving"])
const nameOfPage = ref("Money Saving")
const isShown = ref(false)

const savingStore = useSavingStore()
const isLoading = ref(false)

const isCommit = ref(false)
const chosenSavingId = ref()

const savingList = ref([])

watch(
  () => savingStore.getSavingAmount(),
  (amount) => {
    if (amount >= 100000) {
      isShown.value = true
      window.scrollTo(0, 600)
    }
  }
)

onMounted(async () => {
  await getSavingList()
})

// TODO: get saving balance and set isShown (update saving balance here too)
async function getSavingList() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/savings`,
      withCredentials: true,
    })

    let data = res.data
    savingList.value = data.allSaving
    console.log(data)
    isLoading.value = false
    return data
  } catch (error) {
    isLoading.value = false
    return error.response
  }
}

// TODO: call api to create saving
async function confirmSaving() {
  isLoading.value = true
  try {
    let res = await axios({
      method: "POST",
      url: `${process.env.VUE_APP_ROOT_API}/make_saving`,
      withCredentials: true,
      data: {
        money: savingStore.getSavingAmount(),
        startDate: savingStore.getStartDate(),
        rate: savingStore.getRate(),
      },
    })

    let data = res.data
    console.log(data)
    isLoading.value = false
    alert("Saving successfully")
    location.reload()
    return data
  } catch (error) {
    isLoading.value = false
    console.log(error)
    alert("Not enough money")
    location.reload()
  }
}

function withdraw(id) {
  isCommit.value = true
  chosenSavingId.value = id
}

// TODO: call api to delete Saving here
async function commit(withdrawAmount) {
  try {
    isLoading.value = true
    let res = await axios({
      method: "post",
      url: `${process.env.VUE_APP_ROOT_API}/user/savings/${chosenSavingId.value}/withdraw`,
      withCredentials: true,
      data: {
        money: withdrawAmount,
      },
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
</script>

<style lang="scss" scoped></style>
