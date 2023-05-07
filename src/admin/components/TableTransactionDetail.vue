<template>
  <Loading :is-hidden="checkHidden" />
  <div class="w-5/6 border border-white rounded-2xl max-lg:w-full max-lg:mx-3">
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
      class="relative overflow-x-auto shadow-md sm:rounded-lg max-lg:h-4/5 h-5/6 mt-5 mb-2 px-3"
    >
      <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-gray-700 uppercase bg-white sticky top-0">
          <tr>
            <th scope="col" class="px-6 py-3 text-center">ID</th>
            <th scope="col" class="px-6 py-3 text-center">From user</th>
            <th scope="col" class="px-6 py-3 text-center">To user</th>
            <th scope="col" class="px-6 py-3 text-center">
              Balance fluctuations
            </th>
            <th scope="col" class="px-6 py-3 text-center">Type</th>
            <th scope="col" class="px-6 py-3 text-center">Rate</th>
            <th scope="col" class="px-6 py-3 text-center">Date</th>
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
              v-if="customer.transactionId != null"
            >
              {{ customer.transactionId }}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
              v-else-if="customer.depositId != null"
            >
              {{ customer.depositId }}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
              v-else-if="customer.loanId != null"
            >
              {{ customer.loanId }}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
              v-else-if="customer.savingId != null"
            >
              {{ customer.savingId }}
            </th>
            <td class="px-6 py-4 text-center">
              {{ senderId[index] }}
            </td>

            <td class="px-6 py-4 text-center">
              {{ receiverId[index] }}
            </td>

            <td class="px-6 py-4 text-center">
              {{ fluctuations[index] }}
            </td>
            <td
              class="px-10 py-4 text-center font-semibold"
              v-if="customer.type == 'LOAN'"
            >
              <div class="bg-yellow-loans text-black rounded-lg py-2 px-1">
                {{ customer.type }}
              </div>
            </td>
            <td
              class="px-10 py-4 text-center font-semibold"
              v-else-if="customer.type == 'SAVING'"
            >
              <div class="bg-purple-savings text-black rounded-lg py-2 px-1">
                {{ customer.type }}
              </div>
            </td>
            <td
              class="px-10 py-4 text-center font-semibold"
              v-else-if="customer.type == 'TRANSFER'"
            >
              <div class="bg-green-300 text-black rounded-lg py-2 px-1">
                {{ customer.type }}
              </div>
            </td>
            <td class="px-10 py-4 text-center font-semibold" v-else>
              <div class="bg-yellow-btn text-black rounded-lg py-2 px-1">
                {{ customer.type }}
              </div>
            </td>

            <td
              class="px-6 py-4 text-center"
              v-if="customer.rate != null && customer.type == 'SAVING'"
            >
              {{ formatRate[index] }}%
            </td>
            <td
              class="px-6 py-4 text-center"
              v-else-if="customer.rate != null && customer.type != 'SAVING'"
            >
              {{ customer.rate }}%
            </td>

            <td class="px-6 py-4 text-center" v-else>-</td>

            <td class="px-6 py-4 text-center">{{ customer.date }}</td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script>
import axios from "axios"
import DeletePopUp from "./DeletePopUp.vue"
import { formatPrice } from "@/customer/helper/formatPrice"
import { formatRate } from "@/admin/helper/formatRate"
import { formatTransaction } from "@/admin/helper/formatTransaction"
import Loading from "@/shared/components/Loading.vue"
export default {
  name: "Table list loan",
  components: {
    DeletePopUp,
    Loading,
  },
  data() {
    return {
      checkHidden: true,
      showSetRate: false,
      confirmDelete: false,
      customers: [],
      title: "",
      balance: "",
      total: "",
      url: "",
      id: "",
      fromUserArray: [],
      senderId: [],
      receiverIdArray: [],
      receiverId: [],
      selected: "",
      fluctuations: [],
      alert: false,
      formatRate: [],
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
    this.getTransaction()
  },
  methods: {
    async getTransaction() {
      this.checkHidden = false
      const id = this.$route.query.id
      await axios
        .get(`/transaction/log/user/${id}`, { withCredentials: true })
        .then((response) => {
          this.customers = response.data.allTransactionLog
          this.checkHidden = true
          console.log(this.customers)
          for (let i = 0; i < this.customers.length; i++) {
            //get receiver id
            if (
              this.customers[i].toUserId != null &&
              this.customers[i].toUserId != 0
            ) {
              this.receiverIdArray.push(this.customers[i].fromUserId)
            } else {
              this.receiverIdArray.push("-")
            }

            //get sender id
            if (
              this.customers[i].fromUserId != null &&
              this.customers[i].fromUserId != 0
            ) {
              this.fromUserArray.push(this.customers[i].toUserId)
            } else {
              this.fromUserArray.push("-")
            }

            //format money
            if (
              //for Saving
              this.customers[i].money != null &&
              this.customers[i].money != 0
            ) {
              this.fluctuations.push(
                formatPrice(this.customers[i].money).replace("VND", "")
              )
            } else if (
              //for Transfer
              this.customers[i].amount != null &&
              this.customers[i].amount != 0
            ) {
              // this.fluctuations.push(
              //   formatPrice(this.customers[i].amount).replace("VND", "")
              // )
              console.log(typeof this.title)

              //format type of transfer money
              let money = formatTransaction(
                id,
                this.customers[i].toUserId,
                this.customers[i].amount
              )
              this.fluctuations.push(money)
            } else if (
              //for Loans
              this.customers[i].inMoney != null &&
              this.customers[i].inMoney != 0
            ) {
              this.fluctuations.push(
                formatPrice(this.customers[i].inMoney).replace("VND", "")
              )
            } else {
              //for Deposit
              this.fluctuations.push("-")
            }
          }

          //format rate for Saving
          for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].type == "SAVING") {
              if (
                this.customers[i].rate != null &&
                this.customers[i].rate != 0
              ) {
                this.formatRate[i] = formatRate(this.customers[i].rate)
              }
            }
          }

          //get username from receiver id
          for (let i = 0; i < this.receiverIdArray.length; i++) {
            console.log("a")
            if (this.receiverIdArray[i] != "-") {
              let id = this.receiverIdArray[i]
              axios
                .get(`user/${id}`, { withCredentials: true })
                .then((res) => {
                  this.receiverId[i] = res.data.username
                })
                .catch((err) => {
                  console.log(err)
                  alert(err.response.data.message)
                })
            } else {
              this.receiverId[i] = "-"
            }
          }

          //get username from sender id
          for (let i = 0; i < this.fromUserArray.length; i++) {
            console.log("a")
            if (this.fromUserArray[i] != "-") {
              let id = this.fromUserArray[i]
              axios
                .get(`user/${id}`, { withCredentials: true })
                .then((res) => {
                  this.senderId[i] = res.data.username
                })
                .catch((err) => {
                  console.log(err)
                  alert(err.response.data.message)
                })
            } else {
              this.senderId[i] = "-"
            }
          }
        })
        .catch((err) => {
          console.log("error:" + err.message)
        })
    },
    async getUser() {
      const id = this.$route.query.id
      await axios
        .get(`user/${id}`, { withCredentials: true })
        .then((res) => {
          // console.log(res.data)
          this.title = res.data.username
        })
        .catch((err) => {
          console.log(err)
        })
    },

    newRate(x) {
      if (x.length == 2) {
        return x.charAt(0) + "," + x.charAt(1)
      }
      return x
    },

    handleCancel() {
      this.$router.push("/admin/dashboard")
    },
    deleteUser(customer) {
      this.id = customer.id
      // console.log(customer.id)
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
