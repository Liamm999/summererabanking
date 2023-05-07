<template>
  <CardFrame title="Transaction information">
    <template #cardContent>
      <div class="flex flex-col">
        <MoneyInput @inputMoney="getMoney" />
        <Note
          :message="data.message"
          @input-message="getMessage"
          class="mt-12"
        />
        <SaveContact @input-check="getCheck" class="mt-12" />
        <Button
          placeholder="Continue"
          :is-grad="true"
          @clicked="handleContinue()"
          class="mx-auto mt-12"
          :class="{ hidden: isHidden }"
        />
      </div>
    </template>
  </CardFrame>
</template>

<script setup>
import { ref } from "vue"
import CardFrame from "@/customer/components/general/CardFrame.vue"
import MoneyInput from "@/customer/components/transfer/initial/MoneyInput.vue"
import Note from "@/customer/components/transfer/initial/Note.vue"
import SaveContact from "@/customer/components/transfer/initial/SaveContact.vue"
import Button from "@/customer/components/general/Button.vue"

const emit = defineEmits(["continue"])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  username: {
    type: String,
    required: true,
  },

  isHidden: {
    type: Boolean,
    default: false,
  },
})

// TODO: get current username
const username = JSON.parse(localStorage.getItem("currentUser")).name

const data = ref({
  amountMoney: ref(0),
  message: ref(`${username} sent money`),
  isSaved: ref(false),
})

// TODO: return the current username
function getMoney(value) {
  data.value.amountMoney = value
  console.log(data.value.amountMoney)
}

function getMessage(value) {
  data.value.message = value
  console.log(data.value.message)
}

function getCheck(value) {
  data.value.isSaved = value
  console.log(data.value.isSaved)
}

function handleContinue() {
  emit("continue", data.value)
}
</script>

<style lang="scss" scoped></style>
