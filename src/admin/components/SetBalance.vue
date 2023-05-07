<template>
  <div class="bg flex flex-col items-center py-6 px-10" v-show="hidden">
    <div>Set initial balance for "{{ username }}"?</div>
    <input class="w-3/4 mt-3 text-black" v-model="balance" />
    <span v-if="msg.balance" class="text-red-500">{{ msg.balance }}</span>
    <div
      class="flex flex-row justify-between items-center text-black mt-5 font-medium"
    >
      <button
        @click="handleClick"
        type="button"
        value="Save"
        class="py-1 px-5 bg-white mr-5 hover:bg-green-300"
        :id="id"
      >
        Save
      </button>
      <button
        type="button"
        class="py-1 px-5 bg-white hover:bg-red-400"
        value="Cancel"
        @click="handleCancel"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "setBalance",
  props: {
    username: String,
    id: String,
  },
  data() {
    return {
      hidden: true,
      msg: [],
      new: false,
      balance: "",
    }
  },
  watch: {
    balance: {
      deep: true,
      handler: function (newValue, oldValue) {
        console.log(newValue, oldValue)
        this.balance = newValue
        this.validateBalance(newValue)
      },
    },
  },
  methods: {
    async handleClick(event) {
      console.log("id", event.target.id)
      const form = {
        new: false,
        balance: this.balance,
      }
      if (event.target.value == "Save") {
        await axios
          .post(`admin/ ${event.target.id}/setBalance`, form)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err.message)
            alert(err.response.data.message)
          })
        window.location.reload()
        this.hidden = !this.hidden
      }
    },
    handleCancel(event) {
      if (event.target.value == "Cancel") {
        console.log("No")
        this.hidden = !this.hidden
      }
    },
    validateBalance(value) {
      value = Number(value)
      if (value == 0) {
        this.msg["balance"] = "Balance must be greater than zero"
      } else if (value < 50000) {
        this.msg["balance"] = "Balance must be greater than 50000"
      } else {
        this.msg["balance"] = ""
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #443c68be;
}
</style>
