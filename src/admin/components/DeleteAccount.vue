<template>
  <div
    class="bg flex flex-col py-6 px-10 max-sm:py-2 max-sm:px-2"
    v-show="hidden"
  >
    <div>Delete account "{{ username }}"</div>
    <div
      class="flex flex-row justify-between max-sm:justify-around items-center text-black mt-5 font-medium"
    >
      <button
        @click="handleClick"
        type="button"
        value="Yes"
        class="py-1 px-5 bg-white mr-5 hover:bg-green-300"
        :id="id"
      >
        Yes
      </button>
      <button
        type="button"
        class="py-1 px-5 bg-white hover:bg-red-400"
        value="No"
        @click="handleClick"
      >
        No
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "delete account",
  props: {
    username: String,
    id: String,
    url: String,
  },
  data() {
    return {
      hidden: true,
      customers: [],
      saving: [],
      loan: [],
      userLoan: "",
    }
  },
  methods: {
    handleClick(event) {
      console.log(this.$route.path)

      if (event.target.value == "Yes") {
        console.log(event.target.id)
        this.checkSaving(event.target.id)
        this.checkLoan(event.target.id)
        if (this.saving.length != 0 && this.userLoan != null) {
          alert("Cant't delete. This account is having a saving or a loan")
        } else {
          axios
            .delete(`${this.url}/${event.target.id}`, { withCredentials: true })
            .then((res) => {
              console.log(res.data)
              location.reload()
            })
        }

        // if (this.$route.path == "/admin/saving/details") {
        //   window.location.reload()
        // } else if (this.$route.path != "/admin/dashboard") {
        //   this.$router.push("/admin/dashboard")
        // } else {
        //   window.location.reload()
        // }
        console.log("có saving")
      } else if (event.target.value == "No") {
        console.log("No")
        this.hidden = !this.hidden
      }
    },
    checkSaving(id) {
      axios
        .get(`/admin/saving_user/${id}`, { withCredentials: true })
        .then((res) => {
          this.saving = res.data.allSaving
          console.log(this.saving.length)
          if (this.saving.length > 0) {
            alert(
              "Saving: Cant't delete. This account is having a saving or a loan"
            )
            location.reload()
          }
        })
        .catch((err) => {
          console.log("error:" + err.message)
        })
    },

    checkLoan(id) {
      axios
        .get(`/user/all_loan`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          this.loan = res.data.allLoan
          for (let i = 0; i < res.data.allLoan.length; i++) {
            if (id == res.data.allLoan[i].userId) {
              this.userLoan = "1"
            }
          }
          if (this.saving.length === 0 && this.userLoan != "") {
            alert(
              "Loan: Cant't delete. This account is having a saving or a loan"
            )
            location.reload()
          }

          console.log(this.userLoan)
        })
        .catch((err) => {
          console.log("error:" + err.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  background-color: #443c68be;
}
</style>
