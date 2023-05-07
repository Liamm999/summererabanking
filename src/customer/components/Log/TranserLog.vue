<template>
  <div
    v-for="(log, index) in logData"
    :key="log.amount"
    class="border-purple-300 border-solid rounded-lg border-2 m-2"
  >
    <span class="flex flex-col my-2 md:my-0 sm1:flex-row justify-between px-8">
      <p class="capitalize" :class="checkIsPlus(index) ? 'plus' : 'minus'">
        {{ formatPrice(log.amount) }}
      </p>
      <span
        class="flex flex-row gap-6 text-sm md:text-base justify-between items-center"
      >
        <p class="font-semibold capitalize text-purple-600">
          {{ log.transactionTime }}
        </p>
      </span>
    </span>
    <span class="flex flex-row flex-wrap w-full break-words px-8 py-1">
      <p class="font-bold mr-2">Information:</p>
      <p v-if="checkIsPlus(index)">
        Receive money from {{ Object(fromUserList[index]).name }}
      </p>
      <p v-else>Send money to {{ Object(toUserList[index]).name }}</p>
    </span>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue"
import { formatPrice } from "@/customer/helper/formatPrice"
import axios from "axios"

const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const fromUserList = ref([])
const toUserList = ref([])

function checkIsPlus(index) {
  return Object(toUserList.value[index]).id === currentUser.id
}

onUpdated(async () => {
  props.logData.forEach((log) => {
    const promiseUser = getFromUser(log.fromUserId)
    promiseUser.then((user) => {
      fromUserList.value.push(user)
    })
  })
  props.logData.forEach((log) => {
    const promiseUser = getToUser(log.toUserId)
    promiseUser.then((user) => {
      toUserList.value.push(user)
    })
  })
})

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  logData: {
    type: Array,
    required: true,
    default: () => [{}],
  },
})

async function getFromUser(id) {
  try {
    let res = await axios({
      method: "get",
      url: `${process.env.VUE_APP_ROOT_API}/user/${id}`,
      withCredentials: true,
    })

    let data = res.data
    return data
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}

async function getToUser(id) {
  try {
    let res = await axios({
      method: "get",
      url: `${process.env.VUE_APP_ROOT_API}/user/${id}`,
      withCredentials: true,
    })

    let data = res.data
    return data
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}
</script>

<style lang="scss" scoped>
.plus {
  @apply text-green-500;
}

.minus {
  @apply text-red-500;
}
</style>
