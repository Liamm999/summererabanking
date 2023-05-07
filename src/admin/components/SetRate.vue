<template>
  <div class="bg flex flex-col items-center py-6 px-10" v-show="hidden">
    <div class="flex flex-row">
      <div>Rate:</div>
      <select v-model="selected" class="ml-3 text-black">
        <option disabled value="">Please select one</option>
        <option value="6">6%</option>
        <option value="7">7%</option>
        <option value="8">8%</option>
        <option value="more">More</option>
      </select>
    </div>
    <input
      type="text"
      class="mt-5 text-black"
      v-if="this.selected == 'more'"
      v-model="moreOptions"
    />
    <div
      class="flex flex-row justify-between items-center text-black mt-5 font-medium"
    >
      <button
        @click="handleClick"
        type="button"
        value="Save"
        class="py-1 px-5 bg-yellow-btn mr-5 hover:bg-green-300"
        :id="id"
      >
        Save
      </button>
      <button
        type="button"
        class="py-1 px-5 bg-red-cancle hover:bg-red-400"
        value="Cancel"
        @click="handleClick"
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
    id: String,
    show: Boolean,
  },
  data() {
    return {
      hidden: true,
      form: {
        new: false,
        balance: "",
      },
      selected: "",
      moreOptions: "",
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function (newValue, oldValue) {
        console.log(newValue, oldValue)
      },
    },
  },
  methods: {
    async handleClick(event) {
      console.log("id", event.target.id)
      if (this.selected == "more" && event.target.value == "Save") {
        let rate = this.moreOptions
        await axios
          .post(
            `/admin/savings/${event.target.id}/edit`,
            { rate: rate },
            { withCredentials: true }
          )
          .then(() => {
            console.log("more")
          })
          .catch((error) => {
            console.log(error.message)
          })
        window.location.reload()
        this.hidden = !this.hidden
      } else if (this.selected != "more" && event.target.value == "Save") {
        await axios
          .post(
            `/admin/savings/${event.target.id}/edit`,
            { rate: this.selected },
            { withCredentials: true }
          )
          .then(() => {
            console.log("selected")
          })
          .catch((error) => {
            console.log(error.message)
          })
        window.location.reload()
        this.hidden = !this.hidden
      } else {
        console.log("now" + this.hidden)
        this.hidden = !this.hidden
        console.log("after" + this.hidden)
      }
      // if (event.target.value == "Save") {
      //   await axios
      //     .post(`admin/ ${event.target.id}/setBalance`, this.form)
      //     .then((res) => {
      //       console.log(res.data)
      //     })
      //     .catch((error) => {
      //       console.log(error.message)
      //     })
      //   window.location.reload()
      //   this.hidden = !this.hidden
      // } else if (event.target.value == "Cancel") {
      //   console.log("No")
      //   this.hidden = !this.hidden
      // } else {
      //   console.log("next")
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #443c68be;
}
</style>
