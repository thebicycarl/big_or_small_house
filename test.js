import { calculatePayoff } from "./calculate_payoff.js"

let loan_value = 500000
let payoff_to = 250000
let contribution = 3500
let interest_rate = 6
let monthly_interest_rate = interest_rate / 12 / 100


// console.log(calculatePayoff(loan_value, contribution, monthly_interest_rate, payoff_to))