<template>
  <Loading :is-hidden="checkHidden" />
  <div class="w-2/3 border border-white rounded-2xl max-lg:w-full max-lg:mx-3">
    <div class="heaeding flex flex-col mt-3">
      <!--Title of the screen-->
      <span class="title text-xl ml-5 font-semibold">ADD ACCOUNT</span>
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
              <span class="text-sm max-sm1:text-sx">Full name: </span>
              <input
                type="text"
                class="w-3/5 h-10 text-black rounded-md text-center"
                placeholder="Nguyen Van A"
                name="fullname"
                v-model="this.name"
                required
              />
            </div>
            <span v-if="msg.name" class="text-red-500 mt-2">{{
              msg.name
            }}</span>
          </div>

          <!--Customer phone number-->
          <div class="flex flex-col w-1/2">
            <div
              class="fullname mt-3 w-full pt-1 flex justify-between items-center"
            >
              <span class="text-sm">Phone number:</span>
              <input
                type="text"
                class="w-3/5 h-10 text-black rounded-md text-center"
                placeholder="0982067865"
                name="phoneNumber"
                v-model="username"
                required
              />
            </div>
            <span v-if="msg.phone" class="text-red-500 mt-2">{{
              msg.phone
            }}</span>
          </div>

          <!--Customer password-->
          <div class="flex flex-col w-1/2">
            <div
              class="fullname mt-3 w-full pt-1 flex justify-between items-center"
            >
              <span class="text-sm">Date of birth: </span>
              <input
                type="text"
                class="w-3/5 h-10 text-black rounded-md text-center"
                name="fullname"
                placeholder="12/11/2002"
                v-model="dob"
                required
              />
            </div>
            <span v-if="msg.dob" class="text-red-500 mt-2">{{ msg.dob }}</span>
          </div>

          <!--Customer password-->
          <div class="flex flex-col w-1/2">
            <div
              class="fullname mt-3 w-full pt-1 flex justify-between items-center"
            >
              <span class="text-sm">Password: </span>
              <input
                type="password"
                class="w-3/5 h-10 text-black rounded-md text-center"
                placeholder="********"
                name="password"
                v-model="password"
                required
              />
            </div>
            <span v-if="msg.password" class="text-red-500 mt-2">{{
              msg.password
            }}</span>
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
                placeholder="Nguyen Van A"
                name="fullname"
                v-model="name"
                required
              />
            </div>
            <span v-if="msg.name" class="text-red-500 mt-2">{{
              msg.name
            }}</span>
          </div>

          <!--Input for phone number-->
          <div class="flex flex-col w-3/4">
            <div
              class="username w-full pt-3 border-b border-black flex items-center"
            >
              <font-awesome-icon
                icon="fa-solid fa-phone"
                style="color: white"
              />
              <input
                type="text"
                class="ml-3 w-full h-8 text-center rounded-md"
                placeholder="0982117652"
                name="phoneNumber"
                v-model="username"
                required
              />
            </div>
            <span v-if="msg.phone" class="text-red-500 mt-2">{{
              msg.phone
            }}</span>
          </div>

          <!--Input for date of birth-->
          <div class="flex flex-col w-3/4">
            <div
              class="username w-full pt-3 border-b border-black flex items-center"
            >
              <font-awesome-icon
                icon="fa-solid fa-cake-candles"
                style="color: white"
              />
              <input
                type="text"
                class="ml-3 w-full h-8 text-center rounded-md"
                placeholder="12/11/2002"
                name="dob"
                v-model="dob"
                required
              />
            </div>
            <span v-if="msg.dob" class="text-red-500 mt-2">{{ msg.dob }}</span>
          </div>

          <!--Input for password-->
          <div class="flex flex-col w-3/4">
            <div
              class="password w-full pt-3 border-b border-black flex items-center"
            >
              <font-awesome-icon icon="fa-solid fa-lock" style="color: white" />
              <input
                type="password"
                class="ml-3 w-full h-8 text-center rounded-md"
                placeholder="*******"
                name="password"
                v-model="password"
                required
              />
            </div>
            <span v-if="msg.password" class="text-red-500 mt-2">{{
              msg.password
            }}</span>
          </div>

          <div class="w-full flex justify-around items-center mt-3">
            <button
              type="submit"
              class="bg-yellow-btn hover:bg-orange-500 py-2 px-5 rounded-lg text-white text-sm"
            >
              Save
            </button>
            <button
              type="submit"
              class="bg-red-cancle hover:bg-red-800 py-2 px-5 rounded-lg text-white text-sm"
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
import Loading from "@/shared/components/Loading.vue"
import axios from "axios"

export default {
  name: "Table add account",
  data() {
    return {
      checkHidden: true,
      username: "",
      name: "",
      password: "",
      dob: "",
      msg: [],
    }
  },
  watch: {
    password: {
      handler: function (newValue, oldValue) {
        console.log("Password: ", newValue, oldValue)
        this.password = newValue
        this.validatePassword(newValue)
      },
    },
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
    username: {
      handler: function (newValue, oldValue) {
        console.log("Phone: ", newValue, oldValue)
        this.username = newValue
        this.validatePhone(newValue)
      },
    },
  },
  methods: {
    async submitForm() {
      const form = {
        username: this.username,
        name: this.name,
        password: this.password,
        dob: this.dob,
      }
      this.checkHidden = false
      await axios
        .post("user/signup", form)
        .then((response) => {
          console.log(response.data)
          this.$router.push("/admin/dashboard")
          this.checkHidden = true
        })
        .catch((err) => {
          console.log("error:" + err.message)
          alert(err.response.data.message)
        })
    },
    handleCancel() {
      this.$router.push("/admin/dashboard")
    },
    validatePassword(value) {
      if (value.length < 5) {
        this.msg["password"] = "Password must be longer than 5 characters"
      } else {
        this.msg["password"] = ""
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
  components: { Loading },
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
    width: 100%;
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

  .error {
    border: 2px solid red;
  }
}
</style>
