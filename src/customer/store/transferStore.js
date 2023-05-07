import { defineStore } from "pinia"
import { ref } from "vue"

export const useTransferStore = defineStore("transfer", () => {
  const transferData = ref({})
  const toAccount = ref("")
  const toUsername = ref("")

  function initTransferData(data) {
    transferData.value = data
  }
  function getTransferData() {
    return transferData
  }

  return {
    transferData,
    toAccount,
    initTransferData,
    getTransferData,
    toUsername,
  }
})
