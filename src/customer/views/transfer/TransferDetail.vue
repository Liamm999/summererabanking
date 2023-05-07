<template>
  <Loading :is-hidden="isLoaded" />
  <layout>
    <template #content>
      <div class="z-0">
        <Breadcum :routes="routes" :name="nameOfPage" :select="routes[1]" />
        <div class="relative">
          <span
            class="bg-gray-300 block w-full h-full absolute z-10 opacity-75"
            :class="{ hidden: !isHidden }"
          ></span>
          <InitTransfer
            :username="username"
            @continue="checkData"
            class="mb-12 z-0"
            :is-hidden="isHidden"
          />
        </div>
        <ConfirmTransfer
          ref="confirm"
          :class="{ hidden: !isHidden }"
          class="mb-12"
          @succeeded="handleLoading"
        />
      </div>
    </template>
  </layout>
</template>

<script setup>
import { ref, computed } from "vue"
import Breadcum from "@/customer/components/general/Breadcum.vue"
import Layout from "@/customer/layout/Default.vue"
import InitTransfer from "@/customer/components/transfer/initial/InitTransfer.vue"
import { useTransferStore } from "@/customer/store/transferStore"
import { useRouter } from "vue-router"
import ConfirmTransfer from "@/customer/components/transfer/initial/confirm/ConfirmTransfer.vue"
import { getCurrentTime } from "@/customer/helper/getCurrentTime"
import Loading from "@/shared/components/Loading.vue"

// setup breadcum
const nameOfPage = ref("Transaction Detail")
const transferStore = useTransferStore()
const routes = ref(["Transfer Money", "Detail"])
const router = useRouter()
const isLoaded = ref(true)

const isHidden = ref(false)

// TODO: get needed data
const fromAccount = computed(() => {
  return JSON.parse(localStorage.getItem("currentUser")).username
})

const toAccount = computed(() => {
  return transferStore.toAccount
})

const toUsername = computed(() => {
  return transferStore.toUsername
})

const currentTime = computed(() => {
  return getCurrentTime()
})

function checkData(data) {
  if (data.amountMoney <= 0) {
    alert("The amount of money must greater than 0")
  } else if (toUsername.value === "" || toAccount.value === "") {
    alert("Something is wrong, please try again")
    router.push("/customer/dashboard/transfer")
  } else {
    const transferData = ref({
      fromAccount: fromAccount.value,
      toAccount: toAccount.value,
      toUsername: toUsername.value,
      currentTime: currentTime.value,
      amountMoney: data.amountMoney,
      message: data.message,
      isSaved: data.isSaved,
    })
    transferStore.initTransferData(transferData.value)
    isHidden.value = true
    window.scrollTo(80, 700)
  }
}

function handleLoading(value) {
  isLoaded.value = value
}
</script>

<style lang="scss" scoped></style>
