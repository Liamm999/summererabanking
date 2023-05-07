<template>
  <div class="w-2/3 border border-white rounded-2xl max-lg:w-full max-lg:mx-3">
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
          >Account: {{ title }}</span
        >
      </div>
      <hr class="mt-3 w-full" />
    </div>
    <!--create a table for list loans-->
    <div
      class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-4/5 h-5/6 mt-5 mb-2 p-3"
    >
      <table class="w-full text-sm text-left text-white">
        <thead
          class="text-xs text-gray-700 uppercase bg-purple-savings sticky top-0"
        >
          <tr>
            <th scope="col" class="px-6 py-3 text-center">ID</th>
            <th scope="col" class="px-6 py-3 text-center">Loan</th>
            <th scope="col" class="px-6 py-3 text-center">Rate</th>
            <th scope="col" class="px-6 py-3 text-center">Started at</th>
            <th scope="col" class="px-6 py-3 text-center">Duration</th>
            <th scope="col" class="px-6 py-3 text-center">Total money</th>
            <th scope="col" class="px-6 py-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
            >
              {{ customer.id }}
            </th>
            <td class="px-6 py-4 text-center">{{ balance }}</td>
            <td class="px-6 py-4 text-center">{{ customer.rate }} %</td>
            <td class="px-6 py-4 text-center">{{ customer.startDate }}</td>
            <td class="px-6 py-4 text-center">{{ customer.duration }}</td>
            <td class="px-6 py-4 text-center">{{ total }}</td>

            <td class="px-6 py-4 flex justify-center">
              <div class="flex flex-row px-1 w-auto h-auto">
                <!--Click delete button to delete account-->
                <button
                  data-toggle="modal"
                  @click="deleteUser(customer)"
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
      <div class="bg flex flex-col pt-3 px-10 mt-5">
        <div class="flex flex-row">
          <div>Rate:</div>
          <select v-model="selected" class="ml-3 text-black">
            <option disabled value="Please select one">
              Please select one
            </option>
            <option value="1">1%</option>
            <option value="2">2%</option>
            <option value="3">3%</option>
            <option value="4">4%</option>
            <option value="5">5%</option>
            <option value="6">6%</option>
            <option value="7">7%</option>
            <option value="8">8%</option>
          </select>
        </div>
        <div
          class="flex flex-row justify-evenly items-center text-black mt-8 font-medium"
        >
          <button
            @click="updateRate"
            type="button"
            value="Save"
            class="py-1 px-8 bg-yellow-btn mr-5 hover:bg-green-300 rounded-md"
            :id="id"
          >
            Save
          </button>
          <button
            type="button"
            class="py-1 px-7 bg-red-cancle hover:bg-red-400 rounded-md"
            value="Cancel"
            @click="handleCancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="popUp absolute max-sm:left-12">
      <DeletePopUp
        ref="delete"
        :username="this.title"
        v-show="confirmDelete"
        :id="this.id"
        :url="this.url"
      />
    </div>
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
      v-show="alert"
    >
      <strong class="font-bold">Holy smokes!</strong>
      <span class="block sm:inline">Something seriously bad happened.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="this.alert = !this.alert"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import DeletePopUp from "./DeletePopUp.vue"
import { formatPrice } from "@/customer/helper/formatPrice"
export default {
  name: "Table list loan",
  components: {
    DeletePopUp,
  },
  data() {
    return {
      showSetRate: false,
      confirmDelete: false,
      customer: {},
      title: "",
      balance: "",
      total: "",
      url: "",
      id: "",
      selected: "",
      alert: false,
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function (newValue, oldValue) {
        console.log(newValue, oldValue)
      },
    },
    selected: {
      handler: function (newValue, oldValue) {
        console.log(newValue, oldValue)
      },
    },
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const id = this.$route.query.id
      await axios
        .get(`/user/loan/${id}`, { withCredentials: true })
        .then((response) => {
          this.customer = response.data
          console.log(response.data)
          this.title = this.customer.username
          this.balance = formatPrice(this.customer.inMoney)
          this.total = formatPrice(this.customer.totalMoney)
        })
        .catch((err) => {
          console.log("error:" + err.message)
        })
    },
    handleCancel() {
      this.$router.push("/admin/dashboard")
    },
    deleteUser(customer) {
      this.id = customer.id
      console.log(customer.id)
      this.url = "/user/loan/delete"
      this.confirmDelete = !this.confirmDelete
      if (this.confirmDelete == true) {
        this.$refs.delete.handleClick(event)
      }
      if (this.title == "") {
        this.$router.push("/admin/dashboard")
      }
    },
    handleEdit() {
      this.showSetRate = !this.showSetRate
    },
    async updateRate() {
      const id = this.$route.query.id

      await axios
        .post(
          `user/loan/edit/${id}`,
          { rate: this.selected },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
          this.alert = !this.alert
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-family: Open Sans, "Courier New", Courier, monospace;
}

.popUp {
  top: 40%;
  left: 40%;
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
    top: 40%;
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
