<template>
  <CardFrame title="Deposite Information">
    <template #cardContent>
      <div
        class="flex flex-col md:flex-row w-full justify-between align-middle"
      >
        <span class="w-full md:w-1/2">
          <InputMoney
            class="w-full border-slate-500 border-b-2 leading-9"
            placeholder="How much you want to save ?"
            :value="amountMoney"
            @updateInput="setAmountMoney"
            @formatMoney="parsedMoney"
            @formatOriginal="returnOriginalMoney"
          />
          <p class="text-red-500 text-md md:mb-12">min 1.000.000 VND</p>
        </span>
        <InputOption
          label="Choose rate:"
          class="mt-2 mb-12 md:m-0"
          :values="values"
          @choose="setRate"
        />
      </div>
      <Button
        placeholder="Continue"
        :is-grad="true"
        @clicked="handleContinue"
      />
    </template>
  </CardFrame>
</template>

<script setup>
import { ref } from "vue"
import CardFrame from "../general/CardFrame.vue"
import InputMoney from "../general/InputMoney.vue"
import Button from "../general/Button.vue"
import InputOption from "../general/InputOption.vue"
import { useDepositeStore } from "@/customer/store/depositeStore"
import { getCurrentDate } from "@/customer/helper/getCurrentDate"

const depositeStore = useDepositeStore()

const amountMoney = ref()
const originalMoney = ref(0)
const depositeData = ref({
  depositeAmount: 0,
  rate: 0,
  duration: 0,
  startDate: "",
})

function setAmountMoney(value) {
  amountMoney.value = value
  originalMoney.value = Number(value)
}

function parsedMoney(value) {
  amountMoney.value = value
}

function returnOriginalMoney(value) {
  if (value) {
    amountMoney.value = value
  } else {
    amountMoney.value = 0
  }
}

const values = ref([
  {
    rate: 9,
    month: 12,
  },
  {
    rate: 10,
    month: 18,
  },
  {
    rate: 11,
    month: 24,
  },
  {
    rate: 12,
    month: 30,
  },
  {
    rate: 13,
    month: 36,
  },
])

function setRate(value) {
  const rateAndMonth = values.value.find((item) => item.rate === Number(value))
  depositeData.value.rate = rateAndMonth.rate
  depositeData.value.duration = rateAndMonth.month
}

function handleContinue() {
  if (originalMoney.value < 1000000) {
    alert("Min amount is 1.000.000 VND")
  } else if (depositeData.value.rate < 9) {
    alert("Please choose the rate to continue")
  } else {
    depositeData.value.depositeAmount = originalMoney.value
    depositeData.value.startDate = getCurrentDate()
    depositeStore.initDepositeData(depositeData.value)
  }
}
</script>

<style lang="scss" scoped></style>
