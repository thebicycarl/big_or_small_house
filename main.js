// main file to run the calculations

// import functions:
import { calculatePayoff } from "./calculate_payoff.js"

// declare the input variables
let expensive_house_price = 700000
let formatted_expensive_price = expensive_house_price.toLocaleString()
let cheaper_house_price = 500000
let formatted_cheaper_price = cheaper_house_price.toLocaleString()
let deposit = 150000
let contribution = 3500
let contribution_frequency = 'monthly'
let interest_rate = 6
let monthly_interest_rate = interest_rate / 12 / 100

// run function performing basic calcs, including converting from weekly to monthly contributions and passing object to calculation functions as required
function runCalcs() {
    if (contribution_frequency === 'weekly') {
        contribution = contribution * 52 / 12
    }
    let expensive_loan_value = expensive_house_price - deposit
    let cheaper_loan_value = cheaper_house_price - deposit

    let payoff_expensive = calculatePayoff(expensive_loan_value, contribution, monthly_interest_rate, contribution)

    let payoff_cheaper = calculatePayoff(cheaper_loan_value, contribution, monthly_interest_rate, contribution)

    let payoff_subsequent_cheaper = calculatePayoff(cheaper_house_price, contribution, monthly_interest_rate, contribution)

    console.log(payoff_expensive)
    console.log(payoff_cheaper)

    let time_to_parity = timeToParity(payoff_expensive, payoff_cheaper, payoff_subsequent_cheaper)

    let same_time_equity = sameTimeEquity(payoff_expensive, payoff_cheaper)


    // console.log(time_to_parity)
    // console.log(same_time_equity)

    // console.log(`If instead of buying a $${formatted_expensive_price} house, you bought a $${formatted_cheaper_price} house, you would reach the same level of equity in ${time_to_parity.years_to_parity} years and ${time_to_parity.months_remainder} months. That is, buying $${formatted_cheaper_price} houses one after the other, you would pay off ${formatted_expensive_price} in ${time_to_parity.years_to_parity} years and ${time_to_parity.months_remainder} months.`)
}

// function to perform the comparison (will be some duplication)
// comparison: 
// how long to payoff the same amount

function timeToParity(payoff_expensive, payoff_cheaper, payoff_subsequent_cheaper) {
    // how long to reach the more expensive value, given buying cheaper houses:
    // first: calculate the whole value:
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
    let days_to_parity = payoff_cheaper.daily_count + whole_times * payoff_subsequent_cheaper.daily_count + payoff_remainder.daily_count

    // then convert to years and months
    let years_to_parity = Math.floor(days_to_parity / 365)
    let months_remainder = Math.round((days_to_parity % 365) / 365 * 12)

    // total interest cost 
    let interest_cost_to_parity = Math.round(whole_times * payoff_cheaper.total_interest_cost + payoff_remainder.total_interest_cost)


    let parity = {
        years_to_parity,
        months_remainder,
        interest_cost_to_parity
    }

    return parity
}

// equity gained in the same amount of time as paying off the expensive loan
function sameTimeEquity(payoff_expensive, payoff_cheaper) {
    // whole number of times the cheaper daily count goes into the expensive one
    let whole_days = Math.floor(payoff_expensive.daily_count / payoff_cheaper.daily_count)
    let whole_equity = whole_days * payoff_cheaper.loan_start_value
    let whole_interest_cost = whole_days * payoff_cheaper.total_interest_cost

    // calculate the remainder and pass it to function calculating how much equity is earned in a set amount of time
    let days_remainder = payoff_expensive.daily_count % payoff_cheaper.daily_count
    let paid_off_remainder = equityGivenDays(days_remainder, payoff_cheaper.loan_start_value, contribution, monthly_interest_rate)
    let equity_remainder = paid_off_remainder.equity
    let interest_cost_remainder = paid_off_remainder.total_interest_cost

    // return the total equity and total interest cost
    let same_time_equity = whole_equity + equity_remainder
    let same_time_interest_cost = whole_interest_cost + interest_cost_remainder
    return {
        same_time_equity,
        same_time_interest_cost
    }
}

// equity given an amount of time in days
function equityGivenDays(number_of_days, loan_value, contribution, monthly_interest_rate) {
    let equity = 0
    let total_interest_cost = 0
    let average_days = 365 / 12
    while (number_of_days > average_days) {
        // calculate the interest cost for one day, based on the current loan value
        let daily_interest_cost = loan_value * monthly_interest_rate

        // calculate the toatal interest cost for the month
        let cost_between_contributions = daily_interest_cost * average_days

        // add the interest cosst to the loan value
        loan_value += cost_between_contributions

        // subtract the contribution
        loan_value -= contribution

        // add the contribution minus the interest cost to the equity
        equity += contribution - cost_between_contributions

        // add interest cost to the total
        total_interest_cost += cost_between_contributions

        // run the loop by subtracting a month from the number of days input 
        number_of_days -= average_days

    }
    // return: loan end value, equity, total interest cost
    return {
        equity,
        loan_end_value: loan_value,
        total_interest_cost
    }

}



runCalcs()