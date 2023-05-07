const { useCookies } = require("vue3-cookies")

exports.logout = function () {
  const cookies = useCookies().cookies
  cookies.remove("jwt")
  localStorage.clear()
}
