import router from "../router"
import { useCookies } from "vue3-cookies"
// import axios from "axios"

const cookies = useCookies().cookies

router.beforeEach(async (to, from, next) => {
  const jwt = cookies.get("jwt")

  if (jwt && to.path === "/") {
    const currentUser = JSON.parse(localStorage.getItem("login user"))
    console.log(currentUser)
    if (currentUser.admin) {
      next("/admin/homepage")
    } else {
      next("/customer/dashboard")
    }
  }

  if (!jwt) {
    if (to.name !== "Error" && to.name !== "Register") {
      console.log(to.fullPath)
      if (to.path !== "/login") {
        console.log("Please login")
        next("/login")
      } else {
        next()
      }
    } else next()
  } else {
    if (!to.name) {
      next("/404")
    }
    next()
  }
})
