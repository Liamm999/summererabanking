<template>
  <CardFrame title="Confirm your transaction">
    <template #cardContent>
      <div class="flex flex-col">
        <InforCard :valueObject="accountInfors" class="mb-12" />
        <InforCard :valueObject="amountMoney" class="mb-12" />
        <InforCard :valueObject="timeAndMessage" class="mb-12" />
        <span class="flex flex-row">
          <Button
            placeholder="Cancel"
            :is-grad="true"
            class="mx-auto"
            @clicked="cancelTransaction()"
          />
          <Button
            placeholder="Confirm"
            :is-grad="true"
            class="mx-auto"
            @clicked="confirmTransaction()"
          />
        </span>
      </div>
    </template>
  </CardFrame>
</template>

<script setup>
import { computed } from "vue"
import CardFrame from "@/customer/components/general/CardFrame.vue"
import Button from "@/customer/components/general/Button.vue"
import InforCard from "@/customer/components/general/InforCard.vue"
import { useTransferStore } from "@/customer/store/transferStore"
import { useRouter } from "vue-router"
import { formatPrice } from "@/customer/helper/formatPrice"
import axios from "axios"

const transferStore = useTransferStore()
const router = useRouter()

const emit = defineEmits(["succeeded"])

const accountInfors = computed(() => {
  const toAccount = transferStore.toAccount
  const toUsername = transferStore.toUsername
  const fromAccount = transferStore.getTransferData().value.fromAccount
  return [
    {
      tag: "From account:",
      content: fromAccount,
      isHighlighted: false,
    },
    {
      tag: "To account:",
      content: toAccount,
      isHighlighted: true,
    },
    {
      tag: "Beneficiary's username:",
      content: toUsername,
      isHighlighted: true,
    },
  ]
})

const amountMoney = computed(() => {
  const amount = transferStore.getTransferData().value.amountMoney
  return [
    {
      tag: "Transaction amount:",
      content: formatPrice(Number(amount)),
      isHighlighted: true,
    },
  ]
})

const timeAndMessage = computed(() => {
  const time = transferStore.getTransferData().value.currentTime
  const message = transferStore.getTransferData().value.message
  return [
    {
      tag: "Transaction time:",
      content: time,
      isHighlighted: false,
    },
    {
      tag: "Transaction message:",
      content: message,
      isHighlighted: false,
    },
  ]
})

// TODO: call api to do transaction here
async function confirmTransaction() {
  emit("succeeded", false)
  try {
    let res = await axios({
      method: "post",
      url: `${process.env.VUE_APP_ROOT_API}/transaction/`,
      withCredentials: true,
      data: {
        fromUserUsername: transferStore.getTransferData().value.fromAccount,
        toUserUsername: transferStore.getTransferData().value.toAccount,
        amount: Number(transferStore.transferData.amountMoney),
        transactionTime: transferStore.transferData.currentTime,
      },
    })
    let data = res.data
    console.log(data)
    emit("succeeded", true)
    alert(data.message)
    router.push("/customer/dashboard/transfer")
  } catch (error) {
    emit("succeeded", true)
    alert("You do not have enough money to transfer")
    router.push("/customer/dashboard/transfer")
    return error.response
  }
}

function cancelTransaction() {
  alert("Cancel Transaction!")
  router.push("/customer/dashboard/transfer")
}
</script>

<style lang="scss" scoped></style>
