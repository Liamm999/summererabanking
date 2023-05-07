<template>
  <!--Show list account screen-->
  <div id="account" class="relative z-0">
    <div class="heaeding flex justify-between items-center">
      <!--Title of the screen-->
      <span class="text-xl ml-1 font-semibold">LIST ACCOUNT</span>
      <div class="right mr-1">
        <!--Click button to change to Add account screen -->
        <button
          class="btn p-2 bg-yellow-500 rounded-lg hover:bg-yellow-400 max-sm:text-xs"
          @click="handleClick"
        >
          <font-awesome-icon icon="fa-solid fa-plus" style="color: #ffffff" />
          Add account
        </button>
      </div>
    </div>
    <hr class="mt-3" />

    <!--Filter table by name, date or balance-->
    <div class="filter flex justify-end mr-2 p-3">
      <select class="p-1 bg-slate-500">
        <Filter v-for="type in filterType" :key="type" :data="type" />
      </select>
    </div>

    <!--create a table for account list-->
    <div
      class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-5/6 h-full"
    >
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-center">ID</th>
            <th scope="col" class="px-6 py-3 text-center">Name</th>
            <th scope="col" class="px-6 py-3 text-center">Phone Number</th>
            <th scope="col" class="px-6 py-3 text-center">Date of Birth</th>
            <th scope="col" class="px-6 py-3 text-center">Type</th>
            <th scope="col" class="px-6 py-3 text-center">
              Initial Balance
              <br />
              <span class="text-center">VND</span>
            </th>
            <th scope="col" class="px-6 py-3 text-center">Starting Date</th>
            <th scope="col" class="px-6 py-3 text-center">More</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            v-for="(customer, index) in customers"
            :key="index"
          >
            <!--Id column-->
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4 text-center">{{ customer.name }}</td>
            <td class="px-6 py-4 text-center">{{ customer.username }}</td>
            <td class="px-6 py-4 text-center">{{ customer.dob }}</td>

            <!--If type is false -> return red button-->
            <td class="px-6 py-4 text-center" v-if="customer.new == true">
              <button
                class="bg-red-500 py-2 px-6 rounded-lg"
                @click="setBalance(customer)"
              >
                Wait
              </button>
            </td>

            <!--If type is true -> return green button-->
            <td class="px-6 py-4 text-center" v-else>
              <button class="bg-green-400 py-2 px-4 rounded-lg">Confirm</button>
            </td>
            <td class="px-6 py-4 text-center">
              {{ this.balance[index] }}
            </td>
            <td class="px-6 py-4 text-center">{{ customer.startingDate }}</td>

            <!--Create delete and edit button -->
            <td class="px-6 py-4">
              <div class="flex flex-row px-1 w-auto h-auto">
                <!--Click edit button to change to edit screen-->
                <button @click="handleEdit(customer) in customers">
                  <font-awesome-icon
                    icon="fa-solid fa-pen"
                    style="color: #3b7ae8"
                    class="icon bg-blue-edit mr-1.5"
                  />
                </button>

                <!--Click delete button to delete account-->
                <button
                  data-toggle="modal"
                  @click="getUser(customer) in customers"
                  type="button"
                >
                  <font-awesome-icon
                    icon="fa-regular fa-trash-can"
                    style="color: #f32b81"
                    class="icon bg-pink-trash"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="absolute top-1/2 left-1/3 max-sm:left-12">
      <DeleteAccount
        ref="delete"
        :username="this.username"
        v-show="confirmDelete"
        :id="newId"
        :url="url"
      />
    </div>
    <div class="absolute top-1/2 left-1/3 max-sm:left-12">
      <SetBalance
        ref="setBalance"
        :username="this.username"
        v-show="showSetBalance"
        :id="newId"
      />
    </div>
    <Loading :is-hidden="checkHidden" />
  </div>
</template>

<script>
import Filter from "../components/Filter.vue"
import DeleteAccount from "../components/DeleteAccount.vue"
import axios from "axios"
import SetBalance from "../components/SetBalance.vue"
import { formatPrice } from "@/customer/helper/formatPrice"
export default {
  name: "Account",
  data() {
    return {
      filterType: ["Filter by", "Name", "Date", "Balance"],
      customers: [],
      confirmDelete: false,
      showSetBalance: false,
      username: "",
      id: "",
      balance: [],
      newId: "",
      localTime: " ",
      checkHidden: true,
      url: "/user",
    }
  },
  components: { Filter, DeleteAccount, SetBalance },
  created() {
    this.fetchAllCustomer()
  },
  methods: {
    async fetchAllCustomer() {
      console.log(this.$cookies.get("jwt"))
      await axios
        .get(`user/`, {
          withCredentials: true,
        })
        .then((res) => {
          this.customers = res.data.allUser

          for (let i = 0; i < this.customers.length; i++) {
            this.balance[i] = formatPrice(this.customers[i].balance).replace(
              "VND",
              ""
            )
          }
          console.log(res.data)
        })
        .catch((err) => {
          console.log("error", err)
        })
    },
    getUser(customer) {
      console.log(customer.id)
      this.username = customer.username
      this.confirmDelete = !this.confirmDelete
      this.newId = String(customer.id)

      // if (this.confirmDelete == true) {
      //   this.$refs.delete.handleClick(event)
      // }
      // await axios
      //   .get("user/" + customer.id, { withCredentials: true })
      //   .then((response) => {
      //     console.log(response.data)
      //   })
    },
    handleClick() {
      this.checkHidden = false
      this.$router.push("/admin/add")
    },
    handleEdit(customer) {
      console.log(customer.id)
      this.$router.push(`/admin/edit?id=${customer.id}`)
    },
    setBalance(customer) {
      console.log(customer.id)
      this.showSetBalance = !this.showSetBalance
      this.username = customer.username
      this.newId = customer.id
      if (this.showSetBalance == true) {
        this.$refs.setBalance.handleClick()
      }
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
