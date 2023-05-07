import { defineStore } from "pinia"
import { ref } from "vue"

export const useDepositeStore = defineStore("deposite", () => {
  const depositeData = ref({
    depositeAmount: 0,
    rate: 0,
    duration: 0,
    startDate: "",
  })

  const transactionTime = ref("")

  function initDepositeData(data) {
    depositeData.value.depositeAmount = data.depositeAmount
    depositeData.value.rate = data.rate
    depositeData.value.duration = data.duration
    depositeData.value.startDate = data.startDate
  }

  function getDepositeAmount() {
    return depositeData.value.depositeAmount
  }

  function getDepositeRate() {
    return depositeData.value.rate
  }

  function getDepositeDuration() {
    return depositeData.value.duration
  }

  function getStartDate() {
    return depositeData.value.startDate
  }

  function getEndDate() {
    const starDate = new Date(getStartDate())
    const endDate = new Date()
    endDate.setDate(starDate.getDate() + getDepositeDuration() * 30)
    return (
      endDate.getDate().toString().padStart(2, "0") +
      "/" +
      (endDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      endDate.getFullYear()
    )
  }

  function getTotalMoneyWhenDue() {
    return (
      getDepositeAmount() *
      Math.pow(1 + getDepositeRate() / 100, getDepositeDuration() / 12)
    )
  }

  return {
    initDepositeData,
    getDepositeAmount,
    getDepositeDuration,
    getDepositeRate,
    getTotalMoneyWhenDue,
    transactionTime,
    getStartDate,
    getEndDate,
  }
})
