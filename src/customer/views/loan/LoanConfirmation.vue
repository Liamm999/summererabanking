<template>
  <CardFrame title="Loan confirmation">
    <template #cardContent>
      <div>
        <span>
          <InforCard class="mb-12" :valueObject="accInfors" />
          <InforCard class="mb-12" :valueObject="loanData" />
          <InforCard class="mb-12" :valueObject="transactionData" />
        </span>
        <span
          class="w-full md:w-2/3 flex flex-row justify-between align-middle mx-auto"
        >
          <Button :is-grad="true" placeholder="cancel" @clicked="cancelLoan" />
          <Button
            :is-grad="true"
            placeholder="Confirm"
            @clicked="confirmLoan"
          />
        </span>
      </div>
    </template>
  </CardFrame>
</template>

<script setup>
import { ref, computed } from "vue"
import CardFrame from "@/customer/components/general/CardFrame.vue"
import InforCard from "@/customer/components/general/InforCard.vue"
import Button from "@/customer/components/general/Button.vue"
import { useLoanStore } from "@/customer/store/loanStore"
import { formatPrice } from "@/customer/helper/formatPrice"

const loanStore = useLoanStore()
const emit = defineEmits(["confirm"])

const currentUser = JSON.parse(localStorage.getItem("currentUser"))

const loanAmount = computed(() => formatPrice(loanStore.getLoanAmount()))
const rateTime = computed(
  () => `${loanStore.getLoanRate()}% paid in ${loanStore.getLoanMonth()} months`
)
const totalPaidAmount = computed(() =>
  formatPrice(loanStore.getTotalPaidAmount())
)
const transactionTime = computed(() => loanStore.transactionTime)

const accInfors = ref([
  {
    tag: "Borrowing account:",
    content: currentUser.username,
    isHighlighted: false,
  },
  {
    tag: "Borrower's name:",
    content: currentUser.name,
    isHighlighted: true,
  },
  {
    tag: "Lending bank:",
    content: "SE2 Banking",
    isHighlighted: true,
  },
])

const loanData = ref([
  {
    tag: "Loan Amount:",
    content: loanAmount.value,
    isHighlighted: true,
  },
  {
    tag: "Rate and Time:",
    content: rateTime.value,
    isHighlighted: true,
  },
  {
    tag: "Total amount to be paid:",
    content: totalPaidAmount.value,
    isHighlighted: true,
  },
])

const transactionData = ref([
  {
    tag: "Transaction Time",
    content: transactionTime.value,
    isHighlighted: true,
  },
])

function confirmLoan() {
  emit("confirm")
}

function cancelLoan() {
  alert("Cancel!")
  location.reload()
}
</script>

<style lang="scss" scoped></style>
