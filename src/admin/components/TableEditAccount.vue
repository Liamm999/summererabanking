<template>
  <div class="w-2/3 border border-white rounded-2xl max-lg:w-full max-lg:mx-3">
    <div class="heaeding flex flex-col mt-3">
      <!--Title of the screen-->
      <span class="title text-xl ml-5 font-semibold">EDIT ACCOUNT</span>
      <hr class="mt-3 w-full" />
    </div>
    <div class="max-lg:hidden">
      <form
        class="text-white flex justify-center"
        v-on:submit.prevent="submitForm"
      >
        <div
          class="login w-5/6 p-3 pt-8 pb-5 flex flex-col items-center h-auto mt-1"
        >
          <!--Customer full name-->
          <div class="flex flex-col w-1/2">
            <div class="fullname w-full pt-1 flex justify-between items-center">
              <span class="text-sm max-sm1:text-sx">Phone number: </span>
              <input
                type="text"
                class="w-3/5 h-10 text-black rounded-md text-center"
                :placeholder="form.oldPhone"
                name="fullname"
                v-model="phone"
                required
              />
            </div>
            <span v-if="msg.phone" class="text-red-500 mt-2">{{
              msg.phone
            }}</span>
          </div>

          <!--Customer phone number-->
          <div class="flex flex-col w-1/2">
            <div
              class="fullname mt-2 w-full pt-1 flex justify-between items-center"
            >
              <span class="text-sm">Full name: </span>
              <input
                type="text"
                class="w-3/5 h-10 text-black rounded-md text-center"
                :placeholder="form.oldName"
                name="fullName"
                v-model="name"
                required
              />
            </div>
            <span v-if="msg.name" class="text-red-500 mt-2">{{
              msg.name
            }}</span>
          </div>

          <!--Customer password-->
          <div class="flex flex-col w-1/2">
            <div
              class="fullname mt-2 w-full pt-1 flex justify-between items-center"
            >
              <span class="text-sm">Date of birth: </span>
              <input
                type="text"
                class="w-3/5 h-10 text-black rounded-md text-center"
                name="fullname"
                :placeholder="form.oldDob"
                v-model="dob"
                required
              />
            </div>
            <span v-if="msg.dob" class="text-red-500 mt-2">{{ msg.dob }}</span>
          </div>

          <!--Submit button-->
          <div class="w-3/5 flex justify-evenly items-center mt-6">
            <button
              type="submit"
              class="bg-yellow-btn hover:bg-orange-500 mt-3 py-2 px-10 rounded-lg text-white"
            >
              Save
            </button>
            <button
              type="submit"
              class="bg-red-cancle hover:bg-red-800 mt-3 py-2 px-9 rounded-lg text-white"
              @click="handleCancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="hideForm w-full pl-8 pt-3 lg:hidden">
      <form class="text-black" v-on:submit.prevent="submitForm">
        <div class="login flex flex-col items-center h-72 mt-2">
          <!--Input for username-->
          <div class="flex flex-col w-3/4">
            <div
              class="username w-full pt-4 border-b border-black flex items-center"
            >
              <font-awesome-icon
                icon="fa-regular fa-user"
                style="color: white"
              />
              <input
                type="text"
                class="ml-3 w-full h-8 text-center rounded-md"
                :placeholder="form.oldName"
                name="fullname"
                v-model="name"
              />
            </div>
            <span v-if="msg.name" class="text-red-500">{{ msg.name }}</span>
          </div>

          <!--Input for phone number-->
          <div class="flex flex-col w-3/4">
            <div
              class="username w-full pt-4 border-b border-black flex items-center"
            >
              <font-awesome-icon
                icon="fa-solid fa-phone"
                style="color: white"
              />
              <input
                type="text"
                class="ml-3 w-full h-8 text-center rounded-md"
                :placeholder="form.oldPhone"
                name="phoneNumber"
                v-model="phone"
                required
              />
            </div>
            <span v-if="msg.phone" class="text-red-500">{{ msg.phone }}</span>
          </div>

          <!--Input for date of birth-->
          <div class="flex flex-col w-3/4">
            <div
              class="username w-full pt-4 border-b border-black flex items-center"
            >
              <font-awesome-icon
                icon="fa-solid fa-cake-candles"
                style="color: white"
              />
              <input
                type="text"
                class="ml-3 w-full h-8 text-center rounded-md"
                :placeholder="form.oldDob"
                name="dob"
                v-model="dob"
                required
              />
            </div>
            <span v-if="msg.dob" class="text-red-500">{{ msg.dob }}</span>
          </div>
          <div class="w-full flex justify-around items-center mt-6">
            <button
              type="submit"
              class="bg-yellow-btn hover:bg-orange-500 mt-3 py-2 px-5 rounded-lg text-white text-sm"
            >
              Save
            </button>
            <button
              type="submit"
              class="bg-red-cancle hover:bg-red-800 mt-3 py-2 px-5 rounded-lg text-white text-sm"
              @click="handleCancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Table add account",
  data() {
    return {
      phone: "",
      name: "",
      dob: "",
      form: {
        oldPhone: "",
        oldName: "",
        oldDob: "",
      },

      warning: false,
      msg: [],
    }
  },
  watch: {
    name: {
      handler: function (newValue, oldValue) {
        console.log("Name: ", newValue, oldValue)
        this.name = newValue
        this.validateName(newValue)
      },
    },
    dob: {
      handler: function (newValue, oldValue) {
        console.log("dob: ", newValue, oldValue)
        this.dob = newValue
        this.validateDob(newValue)
      },
    },
    phone: {
      handler: function (newValue, oldValue) {
        console.log("Phone: ", newValue, oldValue)
        this.phone = newValue
        this.validatePhone(newValue)
      },
    },
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const id = this.$route.query.id
      await axios
        .get(`user/${id}`, { withCredentials: true })
        .then((res) => {
          const form = res.data
          this.form = {
            oldPhone: form.username,
            oldBalance: form.balance,
            oldDob: form.dob,
            oldName: form.name,
          }
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async submitForm() {
      const id = this.$route.query.id
      const form = {
        phone: this.phone,
        name: this.name,
        dob: this.dob,
      }
      await axios
        .put(`user/${id}`, form, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          if (res.data.message == "OK") {
            this.$router.push("/admin/dashboard")
          }
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    handleCancel() {
      this.$router.push("/admin/dashboard")
    },
    validateBalance(value) {
      if (value == "0") {
        this.msg["balance"] = "Balance must > 0"
      } else {
        this.msg["balance"] = ""
      }
    },
    validateDob(value) {
      if (value == null) {
        this.msg["dob"] = "Date of birth is required"
      } else {
        this.msg["dob"] = ""
      }
    },
    validateName(value) {
      if (value.length <= 4) {
        this.msg["name"] = "Name must be at least 4 characters"
      } else {
        this.msg["name"] = ""
      }
    },
    validatePhone(value) {
      if (value.length == 10) {
        this.msg["phone"] = ""
      } else {
        this.msg["phone"] = "Phone must be 10 numbers"
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-family: Open Sans, "Courier New", Courier, monospace;
}

.hideForm {
  margin: 0 2%;
}

.hideForm form {
  width: 50vw;
  height: auto;
  padding: 2%;
}

@media screen and (max-width: 640px) {
  .hideForm {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .hideForm form {
    width: auto;
    margin: 4%;
  }

  .note {
    height: fit-content;
    width: fit-content;
    padding: 0;
    font-size: 11px;
  }

  .option {
    font-size: 10px;
  }
  input {
    background-color: rgba(240, 248, 255, 0.79);
  }
}

@media screen and (min-width: 640px) and (max-width: 1025px) {
  .hideForm {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .hideForm form {
    width: 70%;
    margin: 4%;
  }

  .note {
    height: fit-content;
    width: fit-content;
    padding: 0;
    font-size: 8px;
  }

  .option {
    font-size: 10px;
  }
  input {
    background-color: rgba(240, 248, 255, 0.79);
  }
}
</style>
