<template>
  <div id="app" class="bg-purple-200">
    <div class="navbar">
      <!--Hide this navbar when the screen is smaller than 640px-->
      <Navbar class="max-sm:hidden" />

      <!--Show this navbar when the screen is smaller than 640px-->
      <nav class="bg-purple-100 rounded-2xl sm:hidden" id="navbar">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center">
              <!--Handle click event to show/hide menu-->

              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none opacity-50"
                aria-controls="mobile-menu"
                aria-expanded="false"
                @click="hiddenNav = !hiddenNav"
              >
                <span class="sr-only">Open main menu</span>
                <!--
            Icon when menu is closed. 
            Menu open: "hidden", Menu closed: "block"
          -->
                <svg
                  class="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <!--
            Icon when menu is open.
            Menu open: "block", Menu closed: "hidden"
          -->
                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <!--Show logo-->

            <div
              class="flex items-center justify-center sm:items-stretch sm:justify-start h-full max-sm:h-2"
            >
              <div class="flex flex-shrink-0 items-center justify-center">
                <img
                  class="block h-16 w-auto lg:hidden"
                  src="../assets/image/Logo_bank.png"
                  alt="Bank logo"
                />
                <img
                  class="hidden h-full w-auto lg:block"
                  src="../assets/image/Logo_bank.png"
                  alt="Bank logo"
                />
              </div>
              <div class="hidden sm:ml-6 sm:block mt-1">
                <div class="flex space-x-4"></div>
              </div>
            </div>
            <div
              class="absolute w-full max-sm:w-auto inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <button
                type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">View notifications</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <div>
                  <button
                    type="button"
                    class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    @click="hiddenSetting = !hiddenSetting"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
                <div
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                  v-show="hiddenSetting"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                    >Your Profile</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                    >Settings</a
                  >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                    >Sign out</a
                  >
                </div>
              </div>
              <div class="flex justify-end flex-col w-auto ml-1">
                <span class="sm:text-xs text-xs pl-2 text-white font-thin"
                  >Hello</span
                >
                <div
                  class="sm:text-base text-base pl-2 w-20 text-white font-normal"
                >
                  Giáng Vân
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:hidden" id="mobile-menu" v-show="hiddenNav">
          <div class="space-y-1 px-2 pt-2 pb-3">
            <div
              class="text-gray-300 hover:bg-orange-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-100%"
              v-for="tab in tabContents"
              :key="tab"
              @click="component = tab"
            >
              {{ tab }}
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!--Using breadcrum to navigate current page-->
    <div class="breadcrum">
      <Breadcrum :title="component" />
    </div>
    <!--Hide this left navbar when the screen is smaller than 640px-->
    <!--Use this navbar to change page-->
    <div class="main">
      <div class="left-navbar">
        <div
          id="left-navbar"
          class="flex flex-col justify-start items-start text-cyan-100 p-2 w-auto bg-purple-100 rounded-xl"
        >
          <!--The title for navbar-->
          <div class="flex flex-col text-xs font-semibold">
            <span class="text-cyan-100 pt-2 pb-2 pl-2.5">
              Admin dashboard
            </span>
            <!-- using v-for to handle click event when changing screen -->
          </div>
          <hr class="bg-white" />
          <div class="flex flex-col justify-start text-xs pt-1 pb-2">
            <div
              class="title text-gray-300 hover:bg-orange-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-auto"
              v-for="tab in tabContents"
              :key="tab"
              @click="component = tab"
            >
              {{ tab }}
            </div>
          </div>
        </div>
      </div>
      <!--using v-bind to keep alive page and change page-->
      <div class="content rounded-xl p-2 mr-2 ml-2">
        <component :is="component" class="h-4/6 max-lg:h-5/6" />
      </div>
    </div>
    <div class="footer flex justify-center">
      <Footer />
    </div>
  </div>
</template>

<script>
import { SlideInOut } from "vue3-transitions"
import Navbar from "../components/Navbar/NavbarAdmin.vue"
import LeftNavbar from "../components/Navbar/LeftNavbar.vue"
import Footer from "../components/Footer.vue"
import Account from "./Account.vue"
import Breadcrum from "../components/Breadcrum.vue"
import Saving from "./SavingAndLoans.vue"
import Transaction from "./Transaction.vue"
export default {
  name: "dashboard",
  components: {
    Navbar,
    LeftNavbar,
    Footer,
    Account,
    Breadcrum,
    Saving,
    Transaction,
    SlideInOut,
  },
  data() {
    return {
      tabContents: ["Account", "Transaction", "Saving"],
      component: "Account",
      tasks: false,
      hiddenNav: false,
      hiddenSetting: false,
    }
  },
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  width: 100vw;
}
.navbar {
  margin-top: 0.25%;
  height: 10vh;
  padding: 0 2%;
  @media screen and (max-width: 640px) {
    height: auto;
  }
}

.main {
  height: 78vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    height: 80vh;
    padding: 0;
  }
  margin-top: 1vh;
}

.breadcrum {
  margin: 0.25rem 0 0.25rem 14vw;
  @media screen and (max-width: 640px) {
    margin-left: 8vw;
  }
}

.left-navbar {
  width: 13vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 640px) {
    display: none;
    height: 10vh;
  }
  @media not all and (min-width: 768px) {
    .title {
      font-size: x-small;
    }
  }
}

.content {
  width: 84vw;
  border: 1px solid white;
  @media screen and (max-width: 640px) {
    height: 100%;
    margin-bottom: 1vh;
  }
}
hr {
  border: 1px solid white;
  width: 100%;
  margin: 2px 0;
}

.footer {
  height: 5vh;
}
</style>
