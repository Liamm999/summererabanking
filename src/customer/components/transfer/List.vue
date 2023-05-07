<template>
  <div>
    <span
      class="picker bg-gray-100 rounded-full flex flex-row justify-between text-xs px-2 py-2"
    >
      <h6
        v-for="(tab, index) in tabs"
        :key="index"
        @click="handleChooseTab($event, index)"
        :class="{ chosenTab: tabIndex === index }"
        class="font-semibold px-5 cursor-pointer"
      >
        {{ tab }}
      </h6>
    </span>
    <div class="listValue">
      <div class="contacts" v-if="tabIndex === 0">
        <span
          v-for="(contact, index) in contacts"
          :key="index"
          class="value flex flex-row gap-2 mt-8 align-top"
        >
          <img
            :src="contact.img"
            alt="user's avatar"
            class="w-11 h-11 rounded-full"
          />
          <span class="textValue p-0">
            <h6 class="name font-semibold">{{ contact.name }}</h6>
            <p class="bankAcc text-xs">{{ contact.acc }}</p>
          </span>
        </span>
      </div>
      <div class="recents" v-else>
        <span
          v-for="(recent, index) in recents"
          :key="index"
          class="value flex flex-row gap-2 mt-8 align-top"
        >
          <img
            :src="recent.img"
            alt="user's avatar"
            class="w-11 h-11 rounded-full"
          />
          <span class="textValue p-0">
            <h6 class="name font-semibold">{{ recent.name }}</h6>
            <p class="bankAcc text-xs">{{ recent.acc }}</p>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const tabIndex = ref(0)

const emit = defineEmits(["tabUpdate"])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tabs: {
    type: Array,
    required: false,
    default: () => ["Contacts", "Recently"],
  },

  contacts: {
    type: Array,
    required: false,
    default: () => [
      {
        img: require("@/customer/assets/img/vu.jpg"),
        name: "LA MINH VU",
        acc: "0123456789",
      },

      {
        img: require("@/customer/assets/img/vu.jpg"),
        name: "Test (Sorry we didn't developed this feature yet)",
        acc: "0123456789",
      },
    ],
  },

  recents: {
    type: Array,
    required: true,
    default: () => [
      {
        img: require("@/customer/assets/img/vu.jpg"),
        name: "LA MINH VU",
        acc: "0123456789",
      },
    ],
  },
})

function handleChooseTab(event, index) {
  tabIndex.value = index
  emit("tabUpdated", event.target.value)
}
</script>

<style lang="scss" scoped>
.chosenTab {
  @apply bg-white rounded-full text-purple-600;
}
</style>
