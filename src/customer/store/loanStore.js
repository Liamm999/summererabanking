import { defineStore } from "pinia"
import { ref } from "vue"
import { getTotalLoan } from "../helper/getTotalLoan"

export const useLoanStore = defineStore("loan", () => {
  const loanData = ref({
    loanAmount: 0,
    rate: 0,
    month: 0,
  })

  const transactionTime = ref("")

  function initLoanData(data) {
    loanData.value.loanAmount = data.loanAmount
    loanData.value.rate = data.rate
    loanData.value.month = data.month
  }

  function getLoanAmount() {
    return loanData.value.loanAmount
  }

  function getLoanRate() {
    return loanData.value.rate
  }

  function getLoanMonth() {
    return loanData.value.month
  }

  function getTotalPaidAmount() {
    return getTotalLoan(
      loanData.value.loanAmount,
      loanData.value.rate,
      loanData.value.month
    )
  }

  return {
    initLoanData,
    getLoanAmount,
    getLoanMonth,
    getLoanRate,
    getTotalPaidAmount,
    transactionTime,
  }
})
