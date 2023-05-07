<template>
  <Loading :is-hidden="checkHidden" />
  <div class="home">
    <div class="navbar">
      <Navbar />
    </div>
    <div class="mainContent flex flex-row mt-1 mx-10 rounded-2xl">
      <!--Login form for screen greater then 1024px -->
      <div class="left max-lg:hidden">
        <form
          class="border border-black text-black"
          @submit.prevent="submitForm"
        >
          <h4 class="font-bold text-center font-">Welcome to SE Banking</h4>
          <div class="flex justify-center items-center mt-4">
            <div
              class="bg-purple-login py-5 px-16 rounded-3xl w-fit flex justify-center items-center"
            >
              <!--Reminder for customer login-->
              <span class="text-center font-semibold text-xs text-white">
                Username is the phone number <br />
                that registered for service
              </span>
            </div>
          </div>
          <div class="login flex flex-col items-center h-auto mt-7">
            <!--username-->
            <div class="flex flex-col w-3/4">
              <div
                class="username w-full pt-4 border-b border-black flex items-center"
              >
                <font-awesome-icon
                  icon="fa-regular fa-user"
                  style="color: #443c68"
                />
                <input
                  type="username"
                  class="ml-3 w-full h-8"
                  placeholder="Username"
                  name="username"
                  v-model="username"
                  required
                />
              </div>
              <span v-if="message.username" class="text-red-500 mt-2">{{
                message.username
              }}</span>
            </div>

            <!--password-->
            <div class="flex flex-col w-3/4">
              <div
                class="password w-full mt-10 pt-4 border-b border-black flex items-center"
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
              <span v-if="message.password" class="text-red-500 mt-2">{{
                message.password
              }}</span>
            </div>

            <!--Submit button-->
            <button
              v-if="message.password"
              type="submit"
              class="bg-purple-login hover:bg-yellow-600 mt-4 py-2 px-28 rounded-lg text-white"
            >
              Login
            </button>
            <button
              v-else
              type="submit"
              class="bg-purple-login hover:bg-yellow-600 mt-11 py-2 px-28 rounded-lg text-white"
            >
              Login
            </button>

            <div class="flex justify-between w-3/4 mt-5 text-xs font-medium">
              <a href="/404" class="hover:text-orange-700">Forgot Password?</a>
              <a href="/register" class="hover:text-orange-700 mr-1"
                >Online registration</a
              >
            </div>
          </div>
        </form>
      </div>
      <div class="right flex flex-row max-lg:hidden">
        <img src="../assets/images/Business.png" alt="img" class="w-full" />
      </div>
      <!--Login form for screen smaller than 1024px-->
      <div
        class="hideForm w-full pl-8 pt-3 lg:hidden border border-black rounded-2xl"
      >
        <form
          class="border border-black text-black"
          @submit.prevent="submitForm"
        >
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
                Username is the phone number <br />
                that registered for service
              </span>
              <!--display this text with screen that is smaller than 640px-->
              <span
                class="note text-center font-semibold text-xs text-white sm:hidden"
              >
                Username is the phone number that registered for service
              </span>
            </div>
          </div>
          <div class="login flex flex-col items-center h-72 mt-7">
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
                  type="username"
                  class="ml-3 w-full h-8"
                  placeholder="Username"
                  name="username"
                  v-model="username"
                  required
                />
              </div>
              <span v-if="message.username" class="text-red-500 mt-2">{{
                message.username
              }}</span>
            </div>

            <!--Input for password-->
            <div class="flex flex-col w-3/4">
              <div
                class="password w-full mt-10 pt-4 border-b border-black flex items-center"
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
              <span v-if="message.password" class="text-red-500 mt-2">{{
                message.password
              }}</span>
            </div>

            <!--Submit form-->

            <button
              type="submit"
              class="bg-purple-login hover:bg-yellow-600 mt-11 py-2 px-28 rounded-lg text-white max-sm:px-10 max-sm:mt-4"
            >
              Login
            </button>

            <!--More options-->
            <div
              class="option flex justify-between w-3/4 mt-5 text-xs font-medium"
            >
              <a href="/404" class="hover:text-orange-700 text-left"
                >Forgot Password?</a
              >
              <a href="/register" class="hover:text-orange-700 mr-1 text-right"
                >Online registration</a
              >
            </div>
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
  name: "Login",
  components: {
    Navbar,
    Footer,
    Loading,
  },
  data() {
    return {
      username: "",
      password: "",
      message: [],
      checkHidden: true,
    }
  },
  watch: {
    password: {
      handler: function (newValue, oldValue) {
        console.log("Password: ", newValue, oldValue)
        this.dob = newValue
        this.validatePassword(newValue)
      },
    },
    username: {
      handler: function (newValue, oldValue) {
        console.log("Phone: ", newValue, oldValue)
        this.username = newValue
        this.validateUsername(newValue)
      },
    },
  },

  methods: {
    async submitForm(event) {
      this.checkHidden = false
      const form = {
        username: this.username,
        password: this.password,
      }
      await axios
        .post(`${process.env.VUE_APP_ROOT_API}/user/signin`, form)
        .then((res) => {
          console.log(res.data)
          console.log("submit")
          this.$cookies.set("jwt", res.data.jwt)
          localStorage.setItem("token", res.data.jwt)
          localStorage.setItem("loginUser", JSON.stringify(res.data))
          // axios.defaults.headers.common["Authorization"] = token
          event.preventDefault()
          if (res.data.admin == true) {
            this.$router.push("/admin/homepage")
          } else {
            this.$router.push("/customer/homepage")
          }
          this.checkHidden = true
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.checkHidden = true
        })
    },

    validateUsername(value) {
      if (value == "admin") {
        this.message["username"] = ""
      } else if (value.length < 10) {
        this.message["username"] = "Username must have more than 10 characters"
      } else {
        this.message["username"] = ""
      }
    },
    validatePassword(value) {
      if (value.length < 5) {
        this.message["password"] = "Password must have more than 5 characters"
      } else {
        this.message["password"] = ""
      }
    },
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
  height: 82vh;
}
.left {
  width: 60vw;
  @media screen and (min-width: 1025px) {
    display: flex;
    height: fit-content;
    justify-content: flex-start;
  }
}

.hideForm {
  background-image: url(../assets/images/right.jpg);
  background-size: cover;
  margin: 0 2%;
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
    font-size: 8px;
  }

  .option {
    font-size: 10px;
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
  width: 30vw;
  height: auto;
  border-radius: 5%;
  padding: 2%;
  background-color: white;
  margin-left: 6vw;
}

.footer {
  height: 10vh;
}
</style>
