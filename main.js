// main file to run the calculations

// import functions:
import { calculatePayoff } from "./calculate_payoff.js"
import { equityGivenMonths } from "./equity_given_months.js"

// declare the input variables
const expensive_house_price = 750000
const formatted_expensive_price = expensive_house_price.toLocaleString()
const cheaper_house_price = 500000
const formatted_cheaper_price = cheaper_house_price.toLocaleString()
const deposit = 150000
const contribution = 3500
const contribution_frequency = 'monthly'
const interest_rate = 6
const monthly_interest_rate = interest_rate / 12 / 100

// run function performing basic calcs, including converting from weekly to monthly contributions and passing object to calculation functions as required
function runCalcs() {
    if (contribution_frequency === 'weekly') {
        contribution = contribution * 52 / 12
    }
    let expensive_loan_value = expensive_house_price - deposit
    let cheaper_loan_value = cheaper_house_price - deposit

    let payoff_expensive = calculatePayoff(expensive_loan_value, contribution, monthly_interest_rate, contribution)
    console.log(payoff_expensive)

    let payoff_cheaper = calculatePayoff(cheaper_loan_value, contribution, monthly_interest_rate, contribution)
    console.log(payoff_cheaper)

    let payoff_subsequent_cheaper = calculatePayoff(cheaper_house_price, contribution, monthly_interest_rate, contribution)
    console.log(payoff_subsequent_cheaper)
    
    let time_to_parity = timeToParity(payoff_expensive, payoff_cheaper, payoff_subsequent_cheaper)
    console.log(time_to_parity)

    let same_time_equity = sameTimeEquity(payoff_expensive, payoff_cheaper, payoff_subsequent_cheaper)
    console.log(same_time_equity)

}

// function to perform the comparison (will be some duplication)
// comparison: 
// how long to payoff the same amount
function timeToParity(payoff_expensive, payoff_cheaper, payoff_subsequent_cheaper) {
    // how long to reach the more expensive value, given buying cheaper houses:
    // the first time the cheaper house is bought, the loan value includes the deposit. All subsequent loan payoffs are the whole cheaper house price
    // therefore subtract the first loan value off the expensive loan value: 
    let value_after_one = payoff_expensive.loan_start_value - payoff_cheaper.loan_start_value

    // calculate the number of whole times the cheaper house price goes into the rest: 
    let whole_times = Math.floor(value_after_one / cheaper_house_price)

    // then calculate the remainder: 
    let remainder = value_after_one % cheaper_house_price

    // payoff_to is the cheaper house price amount minus the remainder, this is passed to calculatePayoff to determine the time and interest cost to payoff the remainder.
    let payoff_to = cheaper_house_price - remainder
    
    let payoff_remainder = calculatePayoff(cheaper_house_price, contribution, monthly_interest_rate, payoff_to)

    // the first cheaper loan daily count, plus the whole times multiplyed by the cheaper loan full cost daily count, plus the payoff remainder daily count gives the number of days to reach the same level of equity as the expensive loan.
    let months_to_parity = payoff_cheaper.months + whole_times * payoff_subsequent_cheaper.months + payoff_remainder.months
    
    // then convert to years and months
    let years_to_parity = Math.floor(months_to_parity / 12)
    let months_remainder = Math.round(months_to_parity % 12)
    
    // total interest cost 
    let interest_cost_to_parity = Math.round(payoff_cheaper.total_interest_cost + whole_times * payoff_subsequent_cheaper.total_interest_cost + payoff_remainder.total_interest_cost)


    let parity = {
        years_to_parity,
        months_remainder,
        interest_cost_to_parity
    }

    return parity
}

// equity gained in the same amount of time as paying off the expensive loan
function sameTimeEquity(payoff_expensive, payoff_cheaper, payoff_subsequent_cheaper) {
    // first take the number of months to buy the first cheaper house off the months to buy the expensive one
    let subsequent_remainder = payoff_expensive.months - payoff_cheaper.months
    
    // then calculate the whole number of times the number of months to buy subsequent cheaper houses goes into the remaining number of months
    let whole_months = Math.floor(subsequent_remainder / payoff_subsequent_cheaper.months)

    // multiply that whole number by the equity gained from subsequent cheaper houses
    let subsequent_equity = whole_months * payoff_subsequent_cheaper.loan_start_value

    // and find the subsequent interest cost
    let subsequent_interest = whole_months * payoff_subsequent_cheaper.total_interest_cost

    // calculate remainder months
    let months_remainder = subsequent_remainder % payoff_subsequent_cheaper.months

    // then calculate how much equity would have been gained with the remaining months
    let equity_given_months = equityGivenMonths(months_remainder, payoff_subsequent_cheaper.loan_start_value, contribution, monthly_interest_rate)

    // then sum up the equity
    let total_equity = deposit + payoff_cheaper.loan_start_value + subsequent_equity + equity_given_months.equity

    // and total interest cost
    let total_interest_cost = payoff_cheaper.total_interest_cost + subsequent_interest + equity_given_months.total_interest_cost

    return {
        total_equity,
        total_interest_cost
    }
}

runCalcs()