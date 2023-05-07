<template>
  <Loading :is-hidden="checkHidden" />
  <div id="transaction" class="h-full">
    <div class="heaeding flex justify-between items-center p-2">
      <!--Title of the screen-->
      <span class="text-xl ml-1 font-semibold">TRANSACTION LOGS</span>
    </div>
    <hr class="mt-3" />
    <div class="filter flex justify-end mr-2 p-3">
      <select class="p-1 bg-slate-500">
        <FilterVue v-for="type in filterType" :key="type" :data="type" />
      </select>
    </div>
    <!--create a table for account list-->
    <div
      class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-5/6 h-2/3"
    >
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-center">ID</th>
            <th scope="col" class="px-6 py-3 text-center">Phone Number</th>
            <th scope="col" class="px-6 py-3 text-center">
              Balance
              <br />
              <span class="text-center">VND</span>
            </th>
            <th scope="col" class="px-6 py-3 text-center">Starting Date</th>
            <th scope="col" class="px-6 py-3 text-center">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            v-for="(customer, index) in customers"
            :key="index"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4 text-center">{{ customer.username }}</td>
            <td class="px-6 py-4 text-center">{{ this.balance[index] }}</td>
            <td class="px-6 py-4 text-center">{{ customer.startingDate }}</td>

            <!--Create delete and edit button -->
            <td class="px-6 py-4">
              <div class="px-6 py-4 text-center">
                <!--Click edit button to change to edit screen-->
                <button @click="handleEdit(customer) in customerSaving">
                  <font-awesome-icon
                    icon="fa-solid fa-pen"
                    style="color: #3b7ae8"
                    class="icon bg-blue-edit mr-1.5 hover:bg-slate-300"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FilterVue from "../components/Filter.vue"
import axios from "axios"
import { formatPrice } from "@/customer/helper/formatPrice"
import Loading from "@/shared/components/Loading.vue"
export default {
  name: "Transaction Log",
  components: {
    FilterVue,
    Loading,
  },
  data() {
    return {
      filterType: ["Filter by", "Type", "Savings", "Loans"],
      customers: [],
      balance: [],
      checkHidden: true,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      this.checkHidden = false
      await axios
        .get(`user/`, {
          withCredentials: true,
        })
        .then((res) => {
          this.customers = res.data.allUser
          console.log("user" + this.customers)
          for (let i = 0; i < this.customers.length; i++) {
            this.balance[i] = formatPrice(this.customers[i].balance).replace(
              "VND",
              ""
            )
          }
          console.log(res.data)
          this.checkHidden = true
        })
        .catch((err) => {
          console.log("error", err)
        })
    },
    handleEdit(customer) {
      console.log(customer.id)
      this.$router.push(`/admin/logs/edit?id=${customer.id}`)
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
