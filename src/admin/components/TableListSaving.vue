<template>
  <div class="z-10 flex flex-col item-center fixed mt-20">
    <SetRate ref="setBalance" :id="this.savingId" v-show="showSetRate" />
  </div>
  <div class="z-10 flex flex-col item-center fixed mt-20">
    <DeletePopUp
      ref="delete"
      :username="this.savingId"
      v-show="confirmDelete"
      :id="this.savingId"
      :url="this.url"
    />
  </div>
  <div
    class="w-2/3 border border-white rounded-2xl max-lg:w-full max-lg:mx-3 z-0"
  >
    <div class="heaeding flex flex-col mt-3">
      <!--Title of the screen-->
      <div class="flex flex-row pl-2 item-center ml-3">
        <button @click="handleCancel">
          <font-awesome-icon
            icon="fa-solid fa-arrow-left"
            style="color: #ffffff"
            class="text-center"
          />
        </button>
        <span class="title text-xl ml-5 font-semibold"
          >Account: {{ this.username }}</span
        >
      </div>
      <hr class="mt-3 w-full" />
    </div>
    <!--create a table for list saving-->
    <div
      class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-4/5 h-5/6 mt-5 mb-5 p-3"
    >
      <table class="w-full text-sm text-left text-white">
        <thead
          class="text-xs text-gray-700 uppercase bg-purple-savings sticky top-0"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3 text-center">Savings</th>
            <th scope="col" class="px-6 py-3 text-center">Rate</th>
            <th scope="col" class="px-6 py-3 text-center">Started at</th>
            <th scope="col" class="px-6 py-3 text-center">Finished at</th>
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
              {{ customer.id }}
            </th>
            <td class="px-6 py-4 text-center">{{ balance[index] }}</td>
            <td class="px-6 py-4 text-center">{{ customer.rate }}%</td>
            <td class="px-6 py-4 text-center">{{ customer.startDate }}</td>
            <td class="px-6 py-4 text-center">{{ customer.nextIncomeDate }}</td>

            <td class="px-6 py-4 flex justify-center">
              <div class="flex flex-row px-1 w-auto h-auto">
                <!--Click edit button to change to edit screen-->
                <button @click="handleEdit(customer) in customerSaving">
                  <font-awesome-icon
                    icon="fa-solid fa-pen"
                    style="color: #3b7ae8"
                    class="icon bg-blue-edit mr-1.5 hover:bg-slate-300"
                  />
                </button>

                <!--Click delete button to delete account-->
                <button
                  data-toggle="modal"
                  @click="getUser(customer) in customerSaving"
                  type="button"
                >
                  <font-awesome-icon
                    icon="fa-regular fa-trash-can"
                    style="color: #f32b81"
                    class="icon bg-pink-trash hover:bg-red-300"
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
import axios from "axios"
import SetRate from "./SetRate.vue"
import DeletePopUp from "./DeletePopUp.vue"
import { formatPrice } from "@/customer/helper/formatPrice"
export default {
  name: "Table add account",
  components: {
    SetRate,
    DeletePopUp,
  },
  created() {
    this.getSavings()
  },
  data() {
    return {
      showSetRate: true,
      confirmDelete: false,
      customerSaving: [],
      balance: [],
      id: "",
      username: "",
      savingId: "",
      url: "/user/savings/delete",
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function (newValue, oldValue) {
        console.log(newValue, oldValue)
      },
    },
  },
  methods: {
    async getSavings() {
      this.showSetRate = false
      const id = this.$route.query.id
      this.username = this.$route.query.acc
      await axios
        .get(`/admin/saving_user/${id}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data)
          this.customerSaving = res.data.allSaving
          for (let i = 0; i < this.customerSaving.length; i++) {
            this.balance[i] = formatPrice(this.customerSaving[i].money).replace(
              "VND",
              ""
            )
          }
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    handleCancel() {
      this.$router.push("/admin/dashboard")
    },
    getUser(customer) {
      console.log(customer.id)
      this.savingId = String(customer.id)
      this.confirmDelete = !this.confirmDelete
      // if (this.confirmDelete == true) {
      //   this.$refs.delete.handleClick()
      // }
      // await axios
      //   .get("user/" + customer.id, { withCredentials: true })
      //   .then((response) => {
      //     console.log(response.data)
      //   })
    },
    handleEdit(customer) {
      console.log(customer.id)
      this.showSetRate = !this.showSetRate
      this.savingId = String(customer.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-family: Open Sans, "Courier New", Courier, monospace;
}

@media screen and (max-width: 640px) {
  .popUp {
    position: absolute;
    top: 40%;
    left: 18%;
  }
}

@media screen and (min-width: 641px) and (max-width: 1280px) {
  .popUp {
    position: absolute;
    top: 20%;
    left: 30%;
  }
}

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
