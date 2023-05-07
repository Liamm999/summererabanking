<template>
  <Loading :is-hidden="checkHidden" />
  <div id="saving" class="h-full">
    <div class="heaeding flex justify-between items-center p-2">
      <!--Title of the screen-->
      <span class="text-xl ml-1 font-semibold">LIST SAVING & LOANS</span>
    </div>
    <hr class="mt-3" />
    <!--Filter table by name, date or balance-->
    <div class="filter flex justify-end mr-2 p-3">
      <select class="p-1 bg-slate-500">
        <FilterVue v-for="type in filterType" :key="type" :data="type" />
      </select>
    </div>
    <div class="flex flex-row justify-center max-lg:flex-col h-4/5">
      <!--create a table for list saving-->
      <div
        class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-3/4 h-5/6"
      >
        <table class="w-full text-sm text-left text-white">
          <thead
            class="text-xs text-gray-700 uppercase bg-purple-savings sticky top-0"
          >
            <tr>
              <th scope="col" class="px-6 py-3">ID</th>
              <th scope="col" class="px-6 py-3 text-center">Phone Number</th>
              <th scope="col" class="px-6 py-3 text-center">Savings</th>
              <th scope="col" class="px-6 py-3 text-center">Type</th>
              <th scope="col" class="px-6 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b"
              v-for="(customer, index) in customerSaving"
              :key="index"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ index + 1 }}
              </th>
              <td class="px-6 py-4 text-center">{{ customer.username }}</td>
              <td class="px-6 py-4 text-center">{{ customer.savingNum }}</td>

              <!--If type is false -> return red button-->
              <td class="px-6 py-4 text-center" v-if="customer.savingNum <= 2">
                <div class="bg-gray-400 py-2 px-6 rounded-lg">Silver</div>
              </td>

              <!--If type is true -> return green button-->
              <td class="px-6 py-4 text-center" v-else>
                <div class="bg-yellow-400 py-2 px-4 rounded-lg">Gold</div>
              </td>

              <!--Create delete and edit button -->
              <td class="px-6 py-4 text-center">
                <!--Click edit button to change to edit screen-->
                <button @click="handleSaving(customer) in customerSaving">
                  <font-awesome-icon
                    icon="fa-solid fa-pen"
                    style="color: #3b7ae8"
                    class="icon bg-blue-edit mr-1.5 hover:bg-slate-300"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--create table for List Loan-->
      <div
        class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-2/3 ml-4 max-lg:ml-0 max-lg:mt-2 h-5/6"
      >
        <table class="w-full text-sm text-left text-white">
          <thead
            class="text-xs text-gray-700 uppercase bg-yellow-loans sticky top-0"
          >
            <tr>
              <th scope="col" class="px-6 py-3">ID</th>
              <th scope="col" class="px-6 py-3 text-center">Phone Number</th>
              <th scope="col" class="px-6 py-3 text-center">Rate</th>
              <th scope="col" class="px-6 py-3 text-center">Loans</th>
              <th scope="col" class="px-6 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b"
              v-for="(customer, index) in customerLoans"
              :key="index"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ index + 1 }}
              </th>
              <td class="px-6 py-4 text-center">{{ customer.username }}</td>
              <td class="px-6 py-4 text-center">{{ customer.rate }}</td>
              <td class="px-6 py-4 text-center">{{ this.loans[index] }}</td>

              <!--Create delete and edit button -->
              <td class="px-6 py-4 text-center">
                <!--Click edit button to change to edit screen-->
                <button @click="handleLoans(customer)">
                  <font-awesome-icon
                    icon="fa-solid fa-pen"
                    style="color: #3b7ae8"
                    class="icon bg-blue-edit mr-1.5 hover:bg-slate-300"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import FilterVue from "../components/Filter.vue"
import { formatPrice } from "@/customer/helper/formatPrice"
import Loading from "@/shared/components/Loading.vue"
export default {
  name: "Saving",
  components: {
    FilterVue,
    Loading,
  },
  data() {
    return {
      checkHidden: true,
      customerSaving: [],
      customerLoans: [],
      filterType: ["Filter by", "Type", "Savings", "Loans"],
      loans: [],
    }
  },
  created() {
    this.getAllLoans()
    this.getAllSaving()
  },
  methods: {
    handleLoans: function (customer) {
      console.log("details loans")
      this.$router.push(`/admin/loans/details?id=${customer.id}`)
    },
    handleSaving: function (customer) {
      console.log("details saving")
      console.log(customer.id)
      this.$router.push(
        `/admin/saving/details?id=${customer.id}&acc=${customer.username}`
      )
    },
    async getAllLoans() {
      await axios
        .get("/user/all_loan", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data)
          this.customerLoans = res.data.allLoan
          for (let i = 0; i < this.customerLoans.length; i++) {
            this.loans[i] = formatPrice(this.customerLoans[i].totalMoney)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async getAllSaving() {
      this.checkHidden = false
      await axios
        .get("/admin/saving_user", { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          this.customerSaving = res.data.allHasUser
          console.log("saving", this.customerSaving)
          this.checkHidden = true
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  line-height: 100px;
  vertical-align: middle;
  padding: 10px;

  @media screen and (max-width: 1015px) {
    padding: 5px;
  }
}
</style>
