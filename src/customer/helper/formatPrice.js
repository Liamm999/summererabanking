export function formatPrice(value) {
  let val = value.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  })
  return val
}
