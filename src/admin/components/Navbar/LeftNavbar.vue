<template>
  <div
    id="left-navbar"
    class="flex flex-col justify-start items-start text-cyan-100 p-2 w-auto bg-purple-100 rounded-xl"
  >
    <div class="flex flex-col text-xs font-semibold">
      <span class="text-cyan-100 pt-2 pb-2 pl-2.5"> Admin dashboard </span>
      <!-- <font-awesome-icon icon="fa-angle-left" /> -->
    </div>
    <hr class="bg-white" />
    <div class="flex flex-col justify-start text-xs pt-1 pb-2">
      <button
        class="text-gray-300 hover:bg-orange-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-auto"
      >
        Accounts
      </button>

      <button
        class="text-gray-300 hover:bg-orange-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-auto"
      >
        Transaction Logs
      </button>

      <button
        class="text-gray-300 hover:bg-orange-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium w-auto"
      >
        Saving Loan
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      choose: false,
    }
  },
}
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid white;
  width: 100%;
  margin: 2px 0;
}
@media not all and (min-width: 768px) {
  #left-navbar {
    font-size: smaller;
  }
}
</style>
