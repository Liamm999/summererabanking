<template>
  <CardFrame title="Loan information">
    <template #cardContent>
      <div class="flex flex-col justify-center align-middle">
        <span
          class="flex flex-col md:flex-row justify-between align-middle mb-24"
        >
          <span class="w-full md:w-2/3">
            <InputMoney
              class="w-full border-slate-500 border-b-2 leading-9"
              placeholder="How much you want to borrow ?"
              :value="amountMoney"
              @updateInput="setAmountMoney"
              @formatMoney="parsedMoney"
              @formatOriginal="returnOriginalMoney"
            />
            <p class="text-red-500 text-sm">(Min: 1m VND, Max: 100m VND)</p>
          </span>
          <InputOption
            class="mt-12 md:mt-0"
            label="Choose rate:"
            :values="values"
            @choose="setRate"
          />
        </span>
        <Button
          :isGrad="true"
          placeholder="Continue"
          @clicked="handleContinue"
          class="mx-auto"
        />
      </div>
    </template>
  </CardFrame>
</template>

<script setup>
import { ref } from "vue"
import InputOption from "../general/InputOption.vue"
import CardFrame from "../general/CardFrame.vue"
import InputMoney from "../general/InputMoney.vue"
import Button from "../general/Button.vue"
import { useLoanStore } from "../../store/loanStore"
import { getCurrentTime } from "@/customer/helper/getCurrentTime"

const loanStore = useLoanStore()
const amountMoney = ref()
const originalMoney = ref(0)

const loanData = ref({
  loanAmount: "",
  rate: "",
  month: "",
})

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

function setRate(rate) {
  const month = getMonthByRate(Number(rate))
  loanData.value.rate = Number(rate)
  loanData.value.month = Number(month)
}

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

function handleContinue() {
  if (originalMoney.value < 1000000 || originalMoney.value > 100000000) {
    alert(
      "You just can borrow in range 1m - 100m VND. If you want to borrow outside the range, please come to the bank offline"
    )
  } else if (!loanData.value.rate) {
    alert("Please choose the rate")
  } else {
    loanData.value.loanAmount = Number(originalMoney.value)
    loanStore.initLoanData(loanData.value)
    loanStore.transactionTime = getCurrentTime()
    window.scrollTo(80, 800)
  }
}

function getMonthByRate(rate) {
  const value = values.value.find((item) => item.rate === rate)
  return value.month
}
</script>

<style lang="scss" scoped></style>
