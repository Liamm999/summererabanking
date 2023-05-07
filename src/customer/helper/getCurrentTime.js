export function getCurrentTime() {
  let today = new Date()

  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  const thisTime = `${formatDate(today)} ${time}`
  return thisTime
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0")
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/")
}
