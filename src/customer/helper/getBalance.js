import axios from "axios"

let currentLoan = 0
let allDeposit = 0
let allSaving = 0
let availableBalance = 0

async function getCurrentLoan() {
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/loan/my_loan`,
      withCredentials: true,
    })

    let data = res.data
    currentLoan = data.inMoney
    return currentLoan
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}

async function getAllDeposit() {
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/deposits`,
      withCredentials: true,
    })
    let data = res.data
    data.allDeposit.forEach((element) => {
      allDeposit += element.money
    })
    return allDeposit
  } catch (error) {
    console.log(error)
  }
}

async function getAllSaving() {
  try {
    let res = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_ROOT_API}/user/savings`,
      withCredentials: true,
    })

    let data = res.data
    data.allSaving.forEach((element) => {
      if (element.money > 0) allSaving += element.money
    })
    return allSaving
  } catch (error) {
    return error.response
  }
}

async function getAvailableBalance() {
  const currentUserId = Number(JSON.parse(localStorage.getItem("loginUser")).id)
  try {
    let res = await axios({
      method: "get",
      url: `${process.env.VUE_APP_ROOT_API}/user/${currentUserId}`,
      withCredentials: true,
    })

    let data = res.data
    availableBalance = data.balance
    return availableBalance
  } catch (error) {
    console.log(error.response)
    return error.response
  }
}

getAllSaving()
getCurrentLoan()
getAvailableBalance()
getAllDeposit()

function getTotalBalance() {
  if (availableBalance > 0) return allDeposit + allSaving + availableBalance
}

export { currentLoan, allDeposit, allSaving, availableBalance, getTotalBalance }
