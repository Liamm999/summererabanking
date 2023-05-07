export function formatRate(rate) {
  if (rate > 10) {
    rate = rate / 10
  }
  return rate
}
