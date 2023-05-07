<template>
  <Loading :is-hidden="checkHidden" />
  <div class="home">
    <div class="navbar">
      <Navbar />
    </div>
    <div></div>
    <div class="mainContent flex flex-row mt-1 mx-10 rounded-2xl">
      <!--Register form for screen greater then 1024px -->
      <div class="left max-lg:hidden h-auto">
        <form
          class="border border-black text-black"
          v-on:submit.prevent="submitForm"
        >
          <button @click="handleCancel" class="ml-2">
            <font-awesome-icon icon="fa-solid fa-x" />
          </button>
          <h4 class="font-bold text-center font-">Welcome to SE Banking</h4>
          <div class="flex justify-center items-center mt-4">
            <div
              class="bg-purple-login py-5 px-5 rounded-3xl w-3/4 flex justify-center items-center"
            >
              <!--Reminder for customer register-->
              <span class="text-center font-semibold text-xs text-white">
                Create a new account to have the best <br />
                service from us
              </span>
            </div>
          </div>
          <div class="login flex flex-col items-center h-auto mt-4">
            <!--Customer full name-->
            <div class="flex flex-col w-3/4">
              <div
                class="fullname w-full pt-1 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-regular fa-user"
                  style="color: #443c68"
                />
                <input
                  type="text"
                  class="ml-3 w-full h-8"
                  placeholder="Fullname"
                  name="fullname"
                  v-model="name"
                  required
                />
              </div>
              <span v-if="msg.name" class="text-red-500">{{ msg.name }}</span>
            </div>

            <!--Customer phone number-->
            <div class="flex flex-col w-3/4">
              <div
                class="phoneNumber w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-phone"
                  style="color: #5e5389"
                />
                <input
                  type="text"
                  class="ml-3 w-full h-8"
                  placeholder="Phone number"
                  name="phoneNumber"
                  v-model="username"
                  required
                />
              </div>
              <span v-if="msg.username" class="text-red-500">{{
                msg.username
              }}</span>
            </div>

            <!--Customer date of birth-->
            <div class="flex flex-col w-3/4">
              <div
                class="dob w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-cake-candles"
                  style="color: #5e5389"
                />
                <input
                  type="text"
                  class="ml-3 w-full h-8"
                  placeholder="Date of Birth"
                  name="dob"
                  v-model="dob"
                  required
                />
              </div>
              <span v-if="msg.dob" class="text-red-500">{{ msg.dob }}</span>
            </div>

            <!--Customer password-->
            <div class="flex flex-col w-3/4">
              <div
                class="password w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-lock"
                  style="color: #443c68"
                />
                <input
                  type="password"
                  class="ml-3 w-full h-8"
                  placeholder="Password"
                  name="password"
                  v-model="password"
                  required
                />
              </div>
              <span v-if="msg.password" class="text-red-500">{{
                msg.password
              }}</span>
            </div>

            <!--Terms and conditions-->
            <div class="info flex w-3/4 justify-between items-center pt-3">
              <input type="checkbox" class="ml-2" v-model="checked" required />
              <span class="ml-2 font-medium"
                >By clicking button, you agree to our Terms, Privacy Policy and
                Cookies Policy. You may receive SMS notifications from us and
                can opt out at any time.</span
              >
            </div>
            <!--Submit button-->
            <button
              type="submit"
              class="bg-purple-login hover:bg-yellow-600 mt-3 py-2 px-5 rounded-lg text-white"
              required
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div class="right flex flex-row max-lg:hidden">
        <img src="../assets/images/Business.png" alt="img" class="w-full" />
      </div>
      <!--Login form for screen smaller than 1024px-->
      <div
        class="hideForm w-full pl-8 pt-3 lg:hidden border border-black rounded-2xl h-auto"
      >
        <form
          class="border border-black text-black h-auto"
          v-on:submit.prevent="submitForm"
        >
          <button @click="handleCancel" class="ml-2">
            <font-awesome-icon icon="fa-solid fa-x" />
          </button>
          <h4 class="font-bold text-center font-">Welcome to SE Banking</h4>
          <div class="flex justify-center items-center mt-4">
            <div
              class="bg-purple-login max-sm:px-4 py-5 px-16 rounded-3xl w-fit flex justify-center items-center"
            >
              <!--Reminder for customer login-->
              <!--display this text with screen that is greater than 640px-->
              <span
                class="text-center font-semibold text-xs text-white max-sm:hidden"
              >
                Create a new account to have the best <br />
                service from us
              </span>
              <!--display this text with screen that is smaller than 640px-->
              <span
                class="note text-center font-semibold text-xs text-white sm:hidden"
              >
                Create a new account to have the best service from us
              </span>
            </div>
          </div>
          <div class="login flex flex-col items-center mt-2 h-auto">
            <!--Input for username-->
            <div class="flex flex-col w-3/4">
              <div
                class="username w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-regular fa-user"
                  style="color: #443c68"
                />
                <input
                  type="text"
                  class="ml-3 w-full h-8"
                  placeholder="Fullname"
                  name="fullname"
                  v-model="name"
                  required
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
                  style="color: #443c68"
                />
                <input
                  type="text"
                  class="ml-3 w-full h-8"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  v-model="username"
                  required
                />
              </div>
              <span v-if="msg.username" class="text-red-500">{{
                msg.username
              }}</span>
            </div>

            <!--Input for date of birth-->
            <div class="flex flex-col w-3/4">
              <div
                class="username w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-cake-candles"
                  style="color: #443c68"
                />
                <input
                  type="text"
                  class="ml-3 w-full h-8"
                  placeholder="Date of Birth"
                  name="dob"
                  v-model="dob"
                  required
                />
              </div>
              <span v-if="msg.dob" class="text-red-500">{{ msg.dob }}</span>
            </div>

            <!--Input for password-->
            <div class="flex flex-col w-3/4">
              <div
                class="password w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-lock"
                  style="color: #443c68"
                />
                <input
                  type="password"
                  class="ml-3 w-full h-8"
                  placeholder="Password"
                  name="password"
                  v-model="password"
                  required
                />
              </div>
              <span v-if="msg.password" class="text-red-500">{{
                msg.password
              }}</span>
            </div>

            <!--Terms and contiditions-->
            <div class="info w-3/4 flex justify-center items-center pt-3">
              <input type="checkbox" class="ml-2" v-model="checked" required />
              <span class="ml-2 font-medium"
                >By clicking button, you agree to our Terms, Privacy Policy and
                Cookies Policy. You may receive SMS notifications from us and
                can opt out at any time.</span
              >
            </div>
            <!--Submit button-->
            <button
              type="submit"
              class="bg-purple-login hover:bg-yellow-600 mt-3 py-2 px-7 rounded-lg text-white max-sm:px-5 max-sm:mt-1 max-sm:text-sm"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Navbar from "../components/Navbar.vue"
import Footer from "@/admin/components/Footer.vue"
import Loading from "../components/Loading.vue"
export default {
  name: "Register",
  data() {
    return {
      errors: [],
      checkHidden: true,
      username: "",
      password: "",
      name: "",
      dob: "",
      msg: [],
      checked: false,
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
        console.log("Username: ", newValue, oldValue)
        this.username = newValue
        this.validateUsername(newValue)
      },
    },
  },
  methods: {
    async submitForm() {
      this.checkHidden = false
      const form = {
        username: this.username,
        password: this.password,
        name: this.name,
        dob: this.dob,
      }
      await axios
        .post("user/signup", form)
        .then((response) => {
          this.$router.push("/login")
          this.checkHidden = true
          console.log(response.data)
        })
        .catch((err) => {
          console.log("error:" + err.message)
          alert(err.response.data.message)
        })
    },
    handleCancel() {
      this.$router.push("/login")
    },
    validateUsername(value) {
      if (value.length < 10) {
        this.msg["username"] = "Phone number must have more than 10 characters"
      } else {
        this.msg["username"] = ""
      }
    },
    validatePassword(value) {
      if (value.length < 5) {
        this.msg["password"] = "Password must have more than 5 characters"
      } else {
        this.msg["password"] = ""
      }
    },
    validateName(value) {
      let firstLetter = String(value).charAt(0)
      console.log(firstLetter)
      if (firstLetter != firstLetter.toUpperCase()) {
        this.msg["name"] = "Name must be stated in upper case"
      } else if (value.length < 4) {
        this.msg["name"] = "Name must be at least 4 characters"
      } else {
        this.msg["name"] = ""
      }
    },
  },
  components: {
    Navbar,
    Footer,
    Loading,
  },
}
</script>

<style scoped>
.home {
  height: 100vh;
}
.navbar {
  margin-top: 0.25%;

  padding: 0 2%;
  @media screen and (max-width: 640px) {
    height: auto;
  }
}
.mainContent {
  height: auto;
}
.left {
  width: 60vw;
}

.hideForm {
  background-image: url(../assets/images/right.jpg);
  background-size: cover;
  margin: 0 2%;
  height: auto;
}

.hideForm form {
  width: 40vw;
  height: auto;
  border-radius: 5%;
  padding: 2%;
  background-color: rgba(240, 248, 255, 0.79);
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
    width: auto;
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

.left form {
  width: 35vw;
  height: auto;
  border-radius: 5%;
  padding: 2%;
  background-color: white;
  margin-left: 6vw;
  margin-top: 6vh;
}
.info {
  font-size: xx-small;
}
.footer {
  height: 10vh;
}

.error {
  border: 3px solid red;
}
</style>
