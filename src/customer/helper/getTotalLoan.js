export function getTotalLoan(loanAmount, rate, duration) {
  let totalPayment = 0

  // principal money to pay per month
  let principalPayPerMonth = loanAmount / duration
  // first interest
  let firstInterest = (loanAmount * (rate / 100)) / duration
  // interest from 2nd month
  let totalInterest = firstInterest
  let currentLoan = loanAmount - principalPayPerMonth
  for (let i = 1; i < duration; i++) {
    totalInterest += (currentLoan * (rate / 100)) / duration
    currentLoan -= principalPayPerMonth
  }
  // return total payment amount
  totalPayment = loanAmount + totalInterest
  return totalPayment
}
