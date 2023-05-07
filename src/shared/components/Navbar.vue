<template>
  <nav class="rounded-2xl" id="navbar">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!--Show logo-->
        <div
          class="flex items-center justify-center sm:items-stretch sm:justify-start h-full max-sm:h-2"
        >
          <div class="flex flex-shrink-0 items-center justify-center">
            <!--Set the height of logo for screen that is greater than 1024px-->
            <img
              class="block h-16 w-auto lg:hidden"
              src="../assets/images/Logo_bank.png"
              alt="Bank logo"
            />
            <img
              class="hidden h-full w-auto lg:block"
              src="../assets/images/Logo_bank.png"
              alt="Bank logo"
            />
          </div>
        </div>
        <!--Show languages and contact-->
        <div
          class="absolute max-sm:w-auto inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="right flex justify-between items-center">
            <!--Change color when hover-->
            <div
              class="mr-10 hover:text-slate-200 max-sm:text-xs max-sm:mr-5 sm:mr-7"
            >
              Contact
            </div>
            <button
              type="button"
              class="dark:bg-purple-300 hover:bg-slate-400 font-semibold text-slate-200 hover:text-white py-2 px-3 border border-white hover:border-transparent rounded max-sm:p-0.5 max-md:px-5"
            >
              <div class="flex flex-row item-center justify-center">
                <div class="span flex justify-center items-center mr-1/2">
                  <span class="font-normal max-sm:text-xs">English</span>
                </div>
                <!--Hide this flag for screen that is smaller than 768px-->
                <img
                  src="../assets/images/usa_flag.png"
                  alt="america flag"
                  class="w-6 h-6 max-md:hidden"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  components: {},
}
</script>

<style lang="scss" scoped>
.span {
  font-size: small;
  text-align: center;
}
@media not all and (min-width: 540px) {
  .right button {
    font-size: 10px;
  }
  .right img {
    width: 19px;
    height: 19px;
  }
}
</style>
