<template>
  <nav class="bg-purple-100 rounded-2xl" id="navbar">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex items-center justify-center sm:items-stretch sm:justify-start h-full max-sm:h-2"
        >
          <div class="flex flex-shrink-0 items-center justify-center">
            <img
              class="block h-16 w-auto lg:hidden"
              src="../../assets/image/Logo_bank.png"
              alt="Bank logo"
            />
            <img
              class="hidden h-full w-auto lg:block"
              src="../../assets/image/Logo_bank.png"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block mt-1">
            <div class="flex space-x-4"></div>
          </div>
        </div>
        <div
          class="absolute w-full max-sm:w-auto inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- search bar-->
          <div class="w-full relative mr-3 max-sm:hidden">
            <img
              src="../../assets/image/search.png"
              class="w-5 absolute top-1.5 left-2 opacity-40"
            />

            <input
              type="search"
              class="w-full mr-3 rounded-xl pl-8 pt-1 pb-1 text-black"
              placeholder="Search"
            />
          </div>

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

            <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
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
                href="/login"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                @click="handleLogout"
              >
                Logout
              </a>
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

    <!-- Mobile menu, show/hide based on menu state. -->
    <!-- <div class="sm:hidden" id="mobile-menu" v-show="hiddenNav">
      <div class="space-y-1 px-2 pt-2 pb-3">
        

        <div
          class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-100%"
        >
          Dashboard
        </div>

        <RouterLink to="/admin/account">
          <div
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-100%"
          >
            Accounts
          </div>
        </RouterLink>

        <RouterLink to="/admin/transaction">
          <div
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-100%"
          >
            Transaction Log
          </div>
        </RouterLink>

        <RouterLink to="/admin/saving">
          <div
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-100%"
          >
            Saving Loans
          </div>
        </RouterLink>
      </div>
    </div> -->
  </nav>
</template>

<script>
import { logout } from "@/shared/helper/Logout"

export default {
  name: "navbar",
  el: "#navbar",
  data() {
    return {
      hiddenNav: false,
      hiddenSetting: false,
      component: "Account",
    }
  },
  methods: {
    handleLogout: function () {
      console.log("click")
      logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
