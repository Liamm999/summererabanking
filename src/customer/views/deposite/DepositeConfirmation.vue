<template>
  <CardFrame title="Deposite confirmation">
    <template #cardContent>
      <div>
        <span>
          <InforCard class="mb-12" :valueObject="accountInfors" />
          <InforCard class="mb-12" :valueObject="depositeInfors" />
          <InforCard class="mb-12" :valueObject="notes" />
        </span>
        <span
          class="w-full md:w-2/3 flex flex-row justify-between align-middle mx-auto"
        >
          <Button
            :is-grad="true"
            placeholder="cancel"
            @clicked="cancelDeposite"
          />
          <Button
            :is-grad="true"
            placeholder="Confirm"
            @clicked="confirmDeposite"
          />
        </span>
      </div>
    </template>
  </CardFrame>
</template>

<script setup>
import { computed } from "vue"
import { formatPrice } from "@/customer/helper/formatPrice"
import { useDepositeStore } from "@/customer/store/depositeStore"
import CardFrame from "@/customer/components/general/CardFrame.vue"
import InforCard from "@/customer/components/general/InforCard.vue"
import Button from "@/customer/components/general/Button.vue"

const currentuser = JSON.parse(localStorage.getItem("currentUser"))
const depositeStore = useDepositeStore()
const emit = defineEmits(["confirmDeposite"])

const accountInfors = computed(() => [
  {
    tag: "Deposite account:",
    content: currentuser.username,
    isHighlighted: true,
  },
  {
    tag: "Deposite user:",
    content: currentuser.name,
    isHighlighted: false,
  },
])

const depositeInfors = computed(() => [
  {
    tag: "Deposite amount:",
    content: formatPrice(depositeStore.getDepositeAmount()),
    isHighlighted: true,
  },
  {
    tag: "Deposite rate:",
    content: `${depositeStore.getDepositeRate()}% in ${depositeStore.getDepositeDuration()} months`,
    isHighlighted: true,
  },
  {
    tag: "Total money when due:",
    content: formatPrice(depositeStore.getTotalMoneyWhenDue()),
    isHighlighted: true,
  },
])

const notes = computed(() => [
  {
    tag: "Start deposite from:",
    content: depositeStore.getStartDate(),
  },
  {
    tag: "Due date:",
    content: depositeStore.getEndDate(),
    isHighlighted: true,
  },
  {
    tag: "",
    content:
      "If you withdraw your money before the due date, You will lose all interest and being penalized 5% of the principal amount",
  },
])

function confirmDeposite() {
  emit("confirmDeposite")
}

function cancelDeposite() {
  alert("Cancel!")
  location.reload()
}
</script>

<style lang="scss" scoped></style>
