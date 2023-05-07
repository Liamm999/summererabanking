import { formatPrice } from "@/customer/helper/formatPrice"

export function formatTransaction(user, sender, money) {
  let newMoney = formatPrice(money).replace("VND", "")
  if (user == sender) {
    console.log("true")
    return "- " + newMoney
  }
  return "+ " + newMoney
}
