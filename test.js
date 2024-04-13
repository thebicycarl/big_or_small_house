function sameTimeEquity(number_of_days, loan_value, contribution, daily_interest_rate) {
    let equity = 0
    let total_interest_cost = 0
    let average_days = 365 / 12
    while (number_of_days > average_days) {
        // calculate the interest cost for one day, based on the current loan value
        let daily_interest_cost = loan_value * daily_interest_rate

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

let daily_interest_rate = 6/365/100
let result = sameTimeEquity(100, 200000, 3500, daily_interest_rate)
console.log(result)