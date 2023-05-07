import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./shared/router"
import "@/shared/assets/css/style.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
import Vue3Transitions from "vue3-transitions"
import VTextMarquee from "vue-text-marquee"
import axios from "axios"
import VueCookies from "vue3-cookies"
import VueScrollingTable from "vue-scrolling-table"
import "@/shared/helper/routeGuard"
import Userfront from "@userfront/core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

axios.defaults.baseURL = `${process.env.VUE_APP_ROOT_API}`
library.add(fas, fab, far)
const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)
  .use(Vue3Transitions)
  .use(VueCookies)
  .use(Userfront)
  .use(VTextMarquee)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component(VueScrollingTable.name, VueScrollingTable)
  .mount("#app")
