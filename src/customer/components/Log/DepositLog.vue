<template>
  <div
    v-for="log in logData"
    :key="log.amount"
    class="border-purple-300 border-solid rounded-lg border-2 m-2"
  >
    <span class="flex flex-col my-2 md:my-0 sm1:flex-row justify-between px-8">
      <p class="capitalize" :class="isPlus ? 'plus' : 'minus'">
        {{ formatPrice(getDeposiMoneyById(log.depositId)) }}
      </p>
      <span
        class="flex flex-row gap-6 text-sm md:text-base justify-between items-center"
      >
        <p class="font-semibold capitalize text-purple-600">
          {{ log.startDate }}
        </p>
      </span>
    </span>
    <span class="flex flex-row flex-wrap w-full break-words px-8 py-1">
      <p class="font-bold mr-2">Information:</p>
      <p>Deposite money</p>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { formatPrice } from "@/customer/helper/formatPrice"

const isPlus = ref(false)
const depositList = ref([])

onMounted(async () => {
  await loadDeposite()
})

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  logData: {
    type: Array,
    required: true,
    default: () => [
      {
        depositId: 0,
        startDate: "",
      },
    ],
  },
})

function getDeposiMoneyById(id) {
  const deposit = depositList.value.find((deposite) => deposite.id === id)
  return deposit.id
}

async function loadDeposite() {
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/deposits`,
      withCredentials: true,
    })
    let data = res.data
    depositList.value = data.allDeposit
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
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
