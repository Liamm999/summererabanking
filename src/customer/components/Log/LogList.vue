<template>
  <div class="container w-full bg-gray-300 mx-auto rounded-xl p-3 mb-6">
    <TranserLog :log-data="transferLogList" />
    <SavingLog v-if="savingLogList" :log-data="savingLogList" />
    <DepositLog v-if="depositLogList" :log-data="depositLogList" />
    <LoanLog v-if="loanLogList" :log-data="loanLogList" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import TranserLog from "./TranserLog.vue"
import SavingLog from "./SavingLog.vue"
import DepositLog from "./DepositLog.vue"
import LoanLog from "./LoanLog.vue"

const props = defineProps({
  allTransactionLog: Array,
})

const transferLogList = computed(() => {
  console.log(props.allTransactionLog.filter((log) => log.type === "TRANSFER"))
  return props.allTransactionLog.filter((log) => log.type === "TRANSFER")
})

const savingLogList = computed(() => {
  return props.allTransactionLog.filter((log) => log.type === "SAVING")
})

const depositLogList = computed(() => {
  return props.allTransactionLog.filter((log) => log.type === "DEPOSIT")
})

const loanLogList = computed(() => {
  return props.allTransactionLog.filter((log) => log.type === "LOAN")
})
</script>

<style lang="scss" scoped>
.plus {
  @apply text-green-500;
}

.minus {
  @apply text-red-500;
}
</style>
